import React from 'react';
import { Link } from 'react-router-dom';
import { File, Trash2, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlagiarism } from '../context/PlagiarismContext';

const DocumentList = () => {
  const { documents, deleteDocument } = usePlagiarism();

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
        <p className="mt-1 text-gray-500">
          Upload your first document to check for plagiarism.
        </p>
      </div>
    );
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
    }
  };

  const getStatusIcon = (status: string, similarity?: number) => {
    if (status === 'processing') return <Clock className="h-5 w-5 text-yellow-500" />;
    if (status === 'failed') return <AlertTriangle className="h-5 w-5 text-red-500" />;
    
    // Completed with similarity score
    if (similarity !== undefined) {
      if (similarity < 15) return <CheckCircle className="h-5 w-5 text-green-500" />;
      if (similarity < 30) return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      return <CheckCircle className="h-5 w-5 text-red-500" />;
    }
    
    return <CheckCircle className="h-5 w-5 text-gray-500" />;
  };

  const getSimilarityBadge = (similarity?: number) => {
    if (similarity === undefined) return null;
    
    let badgeClass = 'badge-green';
    if (similarity >= 15 && similarity < 30) {
      badgeClass = 'badge-yellow';
    } else if (similarity >= 30) {
      badgeClass = 'badge-red';
    }
    
    return (
      <span className={`badge ${badgeClass}`}>
        {similarity}% Similar
      </span>
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <motion.li
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={doc.status === 'completed' ? `/result/${doc.id}` : '#'} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-gray-400 mr-3" />
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {doc.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {getSimilarityBadge(doc.similarity)}
                    <button
                      onClick={(e) => handleDelete(doc.id, e)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex sm:items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      {getStatusIcon(doc.status, doc.similarity)}
                      <p className="ml-1 capitalize">
                        {doc.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Uploaded on {doc.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;