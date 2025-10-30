import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

export const adminDb = getFirestore();
export const adminStorage = getStorage();

// Firestore Triggers
export const onSubscriptionCreate = adminDb
  .collection('subscriptions')
  .onSnapshot(async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const subscription = change.doc.data();
        
        // Create invoice for new subscription
        await adminDb.collection('invoices').add({
          subscription_id: change.doc.id,
          profile_id: subscription.profile_id,
          amount: subscription.price,
          status: 'pending',
          due_date: new Date(),
          invoice_number: `INV-${Date.now()}`,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    });
  });

// Storage Triggers
export const onAdImageUpload = adminStorage
  .bucket()
  .object()
  .onFinalize(async (object) => {
    if (!object.name) return;

    // Update ad_images collection with metadata
    const imageId = object.name.split('/').pop();
    if (!imageId) return;

    await adminDb.collection('ad_images').doc(imageId).update({
      status: 'pending',
      url: `https://storage.googleapis.com/${object.bucket}/${object.name}`,
      size_bytes: parseInt(object.size || '0'),
      mime_type: object.contentType || '',
      updated_at: new Date()
    });
  });