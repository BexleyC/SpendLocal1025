// Storage Rules
export const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        exists(/databases/$(database)/documents/profiles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.email == 'admin@example.com';
    }

    // Ad Images
    match /ad_images/{userId}/{allPaths=**} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow create: if isAuthenticated() && request.auth.uid == userId &&
        request.resource.size < 5 * 1024 * 1024 && // 5MB max
        request.resource.contentType.matches('image/.*');
      allow delete: if isAdmin();
    }
  }
}`;