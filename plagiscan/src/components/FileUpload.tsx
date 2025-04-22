import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadDocument } from '../api/plagiarismService';
import { usePlagiarism } from '../context/PlagiarismContext';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addDocument } = usePlagiarism();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const resetStatus = () => {
    setErrorMessage(null);
    setUploadSuccess(false);
  };

  const validateFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Only PDF and DOCX files are supported');
      return false;
    }
    
    if (file.size > maxSize) {
      setErrorMessage('File size should not exceed 10MB');
      return false;
    }
    
    return true;
  };

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    resetStatus();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    resetStatus();
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;
    
    setIsUploading(true);
    try {
      const document = await uploadDocument(file);
      addDocument(document);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setErrorMessage('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          ref={fileInputRef}
        />
        
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Uploading your document...</p>
            </motion.div>
          ) : errorMessage ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-red-500"
            >
              <AlertCircle className="w-16 h-16 mx-auto" />
              <p>{errorMessage}</p>
              <button
                onClick={() => setErrorMessage(null)}
                className="btn btn-outline mt-4"
              >
                Try Again
              </button>
            </motion.div>
          ) : uploadSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-green-500"
            >
              <Check className="w-16 h-16 mx-auto" />
              <p>Document uploaded successfully!</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
                <Upload className="w-6 h-6 text-blue-500 -ml-4" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-700">
                  Drag and drop your file here
                </p>
                <p className="text-gray-500 mt-1">or</p>
                <button
                  onClick={handleButtonClick}
                  className="btn btn-primary mt-4"
                >
                  Browse Files
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, DOCX (Max size: 10MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileUpload;