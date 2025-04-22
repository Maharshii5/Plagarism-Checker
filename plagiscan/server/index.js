import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import cors from 'cors';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import stringSimilarity from 'string-similarity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const documentId = req.body.documentId || Date.now().toString();
    const originalExt = file.originalname.split('.').pop();
    cb(null, `${documentId}.${originalExt}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

const documentStore = {};
const resultsStore = {};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(join(__dirname, '../dist')));

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

async function extractTextFromDOCX(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw error;
  }
}

async function detectPlagiarism(text) {
  const corpus = [
    {
      text: "The effects of climate change are far-reaching and profound. Rising global temperatures have been linked to changes in precipitation patterns, increasing frequency of extreme weather events, and rising sea levels.",
      source: "https://example.com/climate-research-paper"
    },
    {
      text: "Machine learning algorithms can be categorized as supervised, unsupervised, and reinforcement learning. Each approach has its own strengths and weaknesses depending on the specific application.",
      source: "https://example.com/machine-learning-overview"
    },
    {
      text: "Quantum computing leverages quantum mechanics to process information in ways that classical computers cannot. This involves the use of quantum bits or qubits, which can exist in multiple states simultaneously.",
      source: "https://example.com/quantum-computing-basics"
    },
    {
      text: "The human genome project was completed in 2003, providing a complete map of all human genes. This breakthrough has led to significant advances in our understanding of genetic diseases.",
      source: "https://example.com/human-genome-research"
    }
  ];
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const matchedSegments = [];
  let totalSimilarity = 0;
  
  for (let sentence of sentences) {
    sentence = sentence.trim();
    if (sentence.length < 20) continue;
    
    let highestSimilarity = 0;
    let bestMatch = null;
    
    for (let entry of corpus) {
      const similarity = stringSimilarity.compareTwoStrings(sentence, entry.text);
      if (similarity > highestSimilarity && similarity > 0.3) {
        highestSimilarity = similarity;
        bestMatch = entry;
      }
    }
    
    if (bestMatch) {
      matchedSegments.push({
        text: sentence,
        similarity: Math.round(highestSimilarity * 100),
        matchedWith: bestMatch.source
      });
      totalSimilarity += highestSimilarity;
    }
  }
  
  const overallSimilarity = matchedSegments.length > 0
    ? Math.round((totalSimilarity / matchedSegments.length) * 100)
    : 0;
  
  return {
    similarity: overallSimilarity,
    matchedSegments
  };
}

app.post('/api/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const documentId = req.body.documentId || req.file.filename.split('.')[0];
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    
    documentStore[documentId] = {
      id: documentId,
      name: req.file.originalname,
      path: filePath,
      mimeType,
      uploadDate: new Date(),
      status: 'processing'
    };
    
    (async () => {
      try {
        let text;
        if (mimeType === 'application/pdf') {
          text = await extractTextFromPDF(filePath);
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          text = await extractTextFromDOCX(filePath);
        } else {
          throw new Error('Unsupported file type');
        }
        
        const plagiarismResult = await detectPlagiarism(text);
        
        resultsStore[documentId] = {
          documentId,
          ...plagiarismResult,
          processedAt: new Date()
        };
        
        documentStore[documentId].status = 'completed';
        documentStore[documentId].similarity = plagiarismResult.similarity;
      } catch (error) {
        console.error('Error processing document:', error);
        documentStore[documentId].status = 'failed';
        documentStore[documentId].error = error.message;
      }
    })();
    
    res.status(200).json({ 
      success: true, 
      documentId,
      message: 'Document uploaded and processing started'
    });
  } catch (error) {
    console.error('Error in upload handler:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/check/:documentId', (req, res) => {
  const { documentId } = req.params;
  const document = documentStore[documentId];
  
  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }
  
  res.status(200).json({ 
    documentId,
    status: document.status,
    similarity: document.similarity
  });
});

app.get('/api/result/:documentId', (req, res) => {
  const { documentId } = req.params;
  const result = resultsStore[documentId];
  
  if (!result) {
    return res.status(404).json({ error: 'Result not found' });
  }
  
  res.status(200).json(result);
});

app.get('/api/report/:documentId', (req, res) => {
  const { documentId } = req.params;
  const document = documentStore[documentId];
  const result = resultsStore[documentId];
  
  if (!document || !result) {
    return res.status(404).json({ error: 'Document or result not found' });
  }
  
  res.status(200).json({
    reportTitle: `Plagiarism Report for ${document.name}`,
    generatedAt: new Date(),
    document: {
      name: document.name,
      uploadDate: document.uploadDate
    },
    result
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});