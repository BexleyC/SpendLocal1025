rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        exists(/databases/$(database)/documents/profiles/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.email == 'admin@example.com';
    }

    // Profiles
    match /profiles/{userId} {
      // Allow profile creation and access
      allow create: if isAuthenticated() && request.auth.uid == userId && 
        request.resource.data.keys().hasAll(['email', 'company_name', 'phone_number', 'created_at', 'updated_at']);
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow update: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow delete: if isAdmin();
    }

    // Subscriptions
    match /subscriptions/{subscriptionId} {
      allow read: if isAuthenticated() && (
        resource.data.profile_id == request.auth.uid || isAdmin()
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        resource.data.profile_id == request.auth.uid || isAdmin()
      );
      allow delete: if isAdmin();
    }

    // Ad Images
    match /ad_images/{imageId} {
      allow read: if isAuthenticated() && (
        exists(/databases/$(database)/documents/subscriptions/$(resource.data.subscription_id)) &&
        get(/databases/$(database)/documents/subscriptions/$(resource.data.subscription_id)).data.profile_id == request.auth.uid
      ) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // Invoices
    match /invoices/{invoiceId} {
      allow read: if isAuthenticated() && (
        resource.data.profile_id == request.auth.uid || isAdmin()
      );
      allow write: if isAdmin();
    }
  }
}