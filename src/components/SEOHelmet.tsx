import React from 'react';
import { Town } from '../App';

interface SEOHelmetProps {
  town: Town;
  pageTitle?: string;
  pageDescription?: string;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({ 
  town, 
  pageTitle, 
  pageDescription 
}) => {
  // Default values
  const defaultTitle = "SPENDLOCAL - Collaborative Local Advertising";
  const defaultDescription = "Affordable local advertising delivered to thousands of households monthly. Premium visibility at competitive rates.";
  
  // Town-specific data
  const townData: Record<string, { 
    households: string; 
    title: string; 
    description: string;
    keywords: string;
  }> = {
    wilmington: {
      households: "8,500+",
      title: "Wilmington Local Advertising | SPENDLOCAL",
      description: "Reach over 8,500 Wilmington households with affordable direct mail advertising. Premium visibility at less than $.11 per contact.",
      keywords: "Wilmington MA advertising, local marketing Wilmington, direct mail Wilmington MA, small business advertising Wilmington"
    },
    tewksbury: {
      households: "10,000+",
      title: "Tewksbury Local Advertising | SPENDLOCAL",
      description: "Reach over 10,000 Tewksbury households with affordable direct mail advertising. Premium visibility at less than $.09 per contact.",
      keywords: "Tewksbury MA advertising, local marketing Tewksbury, direct mail Tewksbury MA, small business advertising Tewksbury"
    },
    billerica: {
      households: "15,000+",
      title: "Billerica Local Advertising | SPENDLOCAL",
      description: "Reach over 15,000 Billerica households with affordable direct mail advertising. Premium visibility at less than $.06 per contact.",
      keywords: "Billerica MA advertising, local marketing Billerica, direct mail Billerica MA, small business advertising Billerica"
    },
    andover: {
      households: "12,500+",
      title: "Andover Local Advertising | SPENDLOCAL",
      description: "Reach over 12,500 Andover households with affordable direct mail advertising. Premium visibility at less than $.07 per contact.",
      keywords: "Andover MA advertising, local marketing Andover, direct mail Andover MA, small business advertising Andover"
    },
    northandover: {
      households: "11,000+",
      title: "North Andover Local Advertising | SPENDLOCAL",
      description: "Reach over 11,000 North Andover households with affordable direct mail advertising. Premium visibility at less than $.08 per contact.",
      keywords: "North Andover MA advertising, local marketing North Andover, direct mail North Andover MA, small business advertising North Andover"
    }
  };

  // Determine which data to use
  const title = pageTitle || (town ? townData[town]?.title : defaultTitle);
  const description = pageDescription || (town ? townData[town]?.description : defaultDescription);
  const keywords = town ? townData[town]?.keywords : "local advertising, direct mail advertising, small business marketing, Massachusetts advertising";
  
  // Generate canonical URL
  const baseUrl = "https://spendlocal.net";
  const canonicalUrl = town ? `${baseUrl}/${town}` : baseUrl;
  
  // Update document title and meta tags
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', keywords);
      document.head.appendChild(metaKeywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    
    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', canonicalUrl);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:url', canonicalUrl);
    
  }, [town, title, description, keywords, canonicalUrl]);
  
  // Helper function to update meta tags
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (metaTag) {
      metaTag.setAttribute('content', content);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};