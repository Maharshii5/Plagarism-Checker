import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3001/api';

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('document', file);

  const documentId = uuidv4();
  formData.append('documentId', documentId);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    return { 
      id: documentId,
      name: file.name,
      uploadDate: new Date(),
      status: 'processing' as const
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const checkPlagiarism = async (documentId: string) => {
  try {
    const response = await fetch(`${API_URL}/check/${documentId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to check plagiarism');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking plagiarism:', error);
    throw error;
  }
};

export const getDocumentResult = async (documentId: string) => {
  try {
    const response = await fetch(`${API_URL}/result/${documentId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching result:', error);
    throw error;
  }
};

export const generateReport = async (documentId: string) => {
  try {
    const response = await fetch(`${API_URL}/report/${documentId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};
