import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileScan, CheckCircle, Shield, FileText } from 'lucide-react';
import FileUpload from '../components/FileUpload';

const Home = () => {
  const features = [
    {
      icon: <FileScan className="h-6 w-6 text-blue-500" />,
      title: 'Advanced Similarity Detection',
      description: 'Our algorithm checks for both exact matches and paraphrased content to provide comprehensive results.',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: 'Multiple Document Formats',
      description: 'Upload research papers in PDF or DOCX formats for thorough plagiarism detection.',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: 'Secure Processing',
      description: 'All documents are processed securely, respecting your privacy and intellectual property.',
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      title: 'Detailed Reports',
      description: 'Get comprehensive reports with highlighted sections and similarity scores for each segment.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <motion.h1 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="block">Ensure Your Research is</span>
              <span className="block text-blue-200">100% Original</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-blue-100"
            >
              Our advanced plagiarism detection tool helps researchers, students, and academics ensure the originality of their work.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <Link 
                to="/dashboard" 
                className="btn btn-primary text-lg px-8 py-3 rounded-lg bg-white text-blue-700 hover:bg-blue-50"
              >
                Check Your Paper Now
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Upload Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Start Checking Your Document
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Upload your research paper or document to analyze for plagiarism
            </p>
          </div>
          
          <FileUpload />
          
          <div className="text-center mt-8">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              View all your documents →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Features Designed for Academic Excellence
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Our plagiarism checker provides the tools you need to maintain academic integrity
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-2 inline-block bg-blue-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by Scholars Worldwide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote: "This tool saved my dissertation. It found similarities I had completely missed during my literature review.",
                author: "Prof. Sarah Johnson",
                role: "Stanford University"
              },
              {
                quote: "The detailed reports helped me ensure my research paper was completely original before submission.",
                author: "Michael Chen",
                role: "PhD Candidate, MIT"
              },
              {
                quote: "As a journal editor, I recommend this tool to all authors. It's thorough and easy to use.",
                author: "Dr. Emily Rodriguez",
                role: "Editor, Research Journal"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold">
            Ready to check your research for originality?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Start using our powerful plagiarism detection tool today and ensure your academic work is completely original.
          </p>
          <div className="mt-8">
            <Link 
              to="/dashboard" 
              className="btn btn-primary text-lg px-8 py-3 rounded-lg bg-white text-blue-700 hover:bg-blue-50"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;