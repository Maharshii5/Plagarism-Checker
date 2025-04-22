import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import ResultSummary from '../components/ResultSummary';
import MatchedSegments from '../components/MatchedSegments';
import { usePlagiarism } from '../context/PlagiarismContext';
import { getDocumentResult, generateReport } from '../api/plagiarismService';

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const { documents, getResult, addResult } = usePlagiarism();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Find the document in our context
  const document = documents.find(doc => doc.id === id);
  // Get the result from context if available
  const result = id ? getResult(id) : undefined;
  
  useEffect(() => {
    const fetchResult = async () => {
      if (!id) return;
      
      // If we already have the result, no need to fetch
      if (result) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getDocumentResult(id);
        addResult(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load plagiarism results. Please try again.');
        setLoading(false);
      }
    };
    
    fetchResult();
  }, [id, result, addResult]);
  
  const handleDownloadReport = async () => {
    if (!id) return;
    
    try {
      const blob = await generateReport(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plagiarism-report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading results...</p>
      </div>
    );
  }
  
  if (error || !document || !result) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="mt-2 text-red-700">
            {error || 'Document or results not found. Please try again.'}
          </p>
          <div className="mt-4">
            <Link to="/dashboard" className="text-red-600 hover:text-red-800 font-medium">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Plagiarism Results
          </h2>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Download
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Printer className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Print
          </button>
        </div>
      </motion.div>
      
      <div className="space-y-10">
        <ResultSummary 
          similarity={result.similarity} 
          matchCount={result.matchedSegments.length}
          documentName={document.name}
        />
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Matched Segments
          </h3>
          <MatchedSegments segments={result.matchedSegments} />
        </div>
      </div>
    </div>
  );
};

export default Result;