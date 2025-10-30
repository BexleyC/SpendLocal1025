import { useState } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

interface UploadProgress {
  [key: string]: {
    progress: number;
    url: string | null;
    error: string | null;
  };
}

export function useStorage() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  const uploadFile = async (file: File, path: string): Promise<string> => {
    // Generate a unique ID for the file to prevent naming conflicts
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const fileId = file.name; // Use original filename as the key for tracking progress
    const storageRef = ref(storage, `${path}/${uniqueFileName}`);

    // Initialize progress tracking for this file
    setUploadProgress(prev => ({
      ...prev,
      [fileId]: { progress: 0, url: null, error: null }
    }));

    try {
      // Create upload task with custom metadata and increased chunk size
      const metadata = {
        contentType: file.type,
        customMetadata: {
          originalName: file.name,
          size: file.size.toString(),
        }
      };

      // Use a larger chunk size for better performance with large files
      const chunkSize = 2 * 1024 * 1024; // 2MB chunks
      const uploadTask = uploadBytesResumable(storageRef, file, {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          chunkSize: chunkSize.toString()
        }
      });

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Update progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(prev => ({
              ...prev,
              [fileId]: { ...prev[fileId], progress }
            }));
          },
          (error) => {
            // Handle errors
            console.error('Upload error:', error);
            setUploadProgress(prev => ({
              ...prev,
              [fileId]: { ...prev[fileId], error: error.message }
            }));
            reject(error);
          },
          async () => {
            try {
              // Upload completed successfully
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUploadProgress(prev => ({
                ...prev,
                [fileId]: { ...prev[fileId], url: downloadURL, progress: 100 }
              }));
              resolve(downloadURL);
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const uploadFiles = async (files: File[], path: string): Promise<string[]> => {
    try {
      // Upload files in parallel with a concurrency limit of 3
      const concurrencyLimit = 3;
      const results: string[] = [];
      
      for (let i = 0; i < files.length; i += concurrencyLimit) {
        const batch = files.slice(i, i + concurrencyLimit);
        const batchPromises = batch.map(file => uploadFile(file, path));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      }

      return results;
    } catch (error) {
      console.error('Batch upload error:', error);
      throw error;
    }
  };

  return {
    uploadFiles,
    uploadProgress
  };
}