import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check } from 'lucide-react';

interface ResultSummaryProps {
  similarity: number;
  matchCount: number;
  documentName: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ similarity, matchCount, documentName }) => {
  // Determine severity level based on similarity percentage
  const getSeverityLevel = () => {
    if (similarity < 15) return { level: 'Low', color: 'green' };
    if (similarity < 30) return { level: 'Moderate', color: 'yellow' };
    return { level: 'High', color: 'red' };
  };

  const severity = getSeverityLevel();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Plagiarism Detection Results
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Document: {documentName}
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 10,
                delay: 0.3
              }}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-${severity.color}-100 text-${severity.color}-800`}
            >
              {severity.level} Similarity
            </motion.div>
          </div>
        </div>
        
        <div className="mt-5">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-700">Similarity Score</span>
            <span className="text-sm font-medium text-gray-700">{similarity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${similarity}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-2.5 rounded-full bg-${severity.color}-500`}
            ></motion.div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Original Content
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {Math.round(100 - similarity)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Similar Content
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {similarity}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <div className="h-6 w-6 text-white flex items-center justify-center font-bold">
                    #
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Matched Segments
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {matchCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultSummary;