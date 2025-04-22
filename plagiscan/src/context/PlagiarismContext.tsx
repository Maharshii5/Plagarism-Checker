import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'failed';
  similarity?: number;
}

interface PlagiarismResult {
  documentId: string;
  similarity: number;
  matchedSegments: {
    text: string;
    similarity: number;
    matchedWith: string;
  }[];
}

interface PlagiarismContextType {
  documents: Document[];
  results: Record<string, PlagiarismResult>;
  addDocument: (doc: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  addResult: (result: PlagiarismResult) => void;
  getResult: (documentId: string) => PlagiarismResult | undefined;
}

const PlagiarismContext = createContext<PlagiarismContextType | undefined>(undefined);

export const PlagiarismProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [results, setResults] = useState<Record<string, PlagiarismResult>>({});

  const addDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments((prev) => 
      prev.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setResults((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const addResult = (result: PlagiarismResult) => {
    setResults((prev) => ({
      ...prev,
      [result.documentId]: result,
    }));
    
    // Update document with similarity score
    updateDocument(result.documentId, { 
      status: 'completed',
      similarity: result.similarity 
    });
  };

  const getResult = (documentId: string) => {
    return results[documentId];
  };

  return (
    <PlagiarismContext.Provider
      value={{
        documents,
        results,
        addDocument,
        updateDocument,
        deleteDocument,
        addResult,
        getResult,
      }}
    >
      {children}
    </PlagiarismContext.Provider>
  );
};

export const usePlagiarism = () => {
  const context = useContext(PlagiarismContext);
  if (context === undefined) {
    throw new Error('usePlagiarism must be used within a PlagiarismProvider');
  }
  return context;
};