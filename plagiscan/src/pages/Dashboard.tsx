import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import DocumentList from '../components/DocumentList';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Document Dashboard
            </h2>
            <p className="mt-1 text-gray-500">
              Manage your documents and check their plagiarism results
            </p>
          </div>
          
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              New Document
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white shadow-md rounded-lg mb-8 p-6"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Upload New Document
        </h3>
        <FileUpload />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Your Documents
        </h3>
        <DocumentList />
      </motion.div>
    </div>
  );
};

export default Dashboard;