import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface MatchedSegment {
  text: string;
  similarity: number;
  matchedWith: string;
}

interface MatchedSegmentsProps {
  segments: MatchedSegment[];
}

const MatchedSegments: React.FC<MatchedSegmentsProps> = ({ segments }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getHighlightColor = (similarity: number) => {
    if (similarity < 30) return 'bg-yellow-200';
    if (similarity < 50) return 'bg-orange-200';
    return 'bg-red-200';
  };

  if (segments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No matched segments found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {segments.map((segment, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="cursor-pointer hover:bg-gray-50"
          >
            <div 
              className="px-4 py-4 sm:px-6"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={`w-2 h-2 rounded-full mr-3 ${
                      segment.similarity < 30 
                        ? 'bg-yellow-400' 
                        : segment.similarity < 50 
                          ? 'bg-orange-400' 
                          : 'bg-red-400'
                    }`}
                  ></div>
                  <p className="text-sm font-medium text-blue-600 truncate max-w-md">
                    {segment.text.length > 100 
                      ? `${segment.text.substring(0, 100)}...` 
                      : segment.text}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    segment.similarity < 30 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : segment.similarity < 50 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {segment.similarity}% similar
                  </span>
                  <ChevronDown 
                    className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${
                      expandedIndex === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className={`p-3 rounded ${getHighlightColor(segment.similarity)}`}>
                      <p className="text-sm text-gray-800">
                        {segment.text}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Matched with source
                      </span>
                      <a
                        href={segment.matchedWith}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Source <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default MatchedSegments;