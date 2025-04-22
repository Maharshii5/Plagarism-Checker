import React from 'react';
import { motion } from 'framer-motion';
import { FileScan, Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            About PlagiScan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500"
          >
            Advanced plagiarism detection for research papers and academic work
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="lg:text-center mb-16">
            <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Mission</p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Promoting Academic Integrity
            </h3>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              PlagiScan was created to help researchers, students, and academics ensure their work is original and properly cited. We believe in the importance of academic integrity and proper attribution in scholarly work.
            </p>
          </div>

          <div className="py-12 bg-gray-50 rounded-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Technology</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  How PlagiScan Works
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {[
                    {
                      name: 'Text Extraction & Processing',
                      description: 'We extract text from uploaded documents using advanced parsing techniques that maintain the semantic structure of your content.',
                      icon: <FileScan className="h-6 w-6 text-white" />,
                    },
                    {
                      name: 'Similarity Detection',
                      description: 'Our algorithms check for both direct matches and semantically similar content, identifying potential plagiarism even when text has been paraphrased.',
                      icon: <Zap className="h-6 w-6 text-white" />,
                    },
                    {
                      name: 'Source Matching',
                      description: 'We compare your document against a vast database of academic papers, journals, books, and web content to identify potential matches.',
                      icon: <Globe className="h-6 w-6 text-white" />,
                    },
                    {
                      name: 'Privacy & Security',
                      description: 'Your documents are processed securely, and we never store the full content of your papers in our database to protect your intellectual property.',
                      icon: <Shield className="h-6 w-6 text-white" />,
                    },
                  ].map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          {feature.icon}
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="lg:text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Team</p>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Created by Academics for Academics
              </h3>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                PlagiScan was developed by a team of researchers and software engineers who understand the challenges of academic writing and research integrity.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Dr. David Reynolds',
                  role: 'Founder & Lead Researcher',
                  bio: 'Former professor with 15 years of experience in academic publishing and research integrity.',
                  image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
                {
                  name: 'Dr. Maria Chen',
                  role: 'Head of Algorithm Development',
                  bio: 'Specialist in natural language processing and text similarity algorithms.',
                  image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
                {
                  name: 'James Wilson',
                  role: 'Lead Software Engineer',
                  bio: 'Expert in scalable web applications and document processing systems.',
                  image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                },
              ].map((person) => (
                <div key={person.name} className="group relative">
                  <div className="aspect-w-3 aspect-h-3 rounded-lg overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="object-cover h-60 w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-900">{person.name}</h4>
                    <p className="text-sm text-blue-600">{person.role}</p>
                    <p className="mt-2 text-sm text-gray-500">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;