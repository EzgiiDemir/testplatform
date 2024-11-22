'use client';
import React from 'react';

interface SiteData {
  theme: string;
  title: string;
  message: string;
  image: string;
}

const PreviewSite: React.FC = () => {
  const siteData: SiteData | null = JSON.parse(localStorage.getItem('siteData') || 'null');

  if (!siteData) {
    return <p>Web sitesi verisi bulunamadı!</p>;
  }

  return (
    <div className={`theme-${siteData.theme} p-6`}>
      <h1 className="text-4xl font-bold mb-4">{siteData.title}</h1>
      <p className="mb-4">{siteData.message}</p>
      <img src={siteData.image} alt="Site Resmi" className="w-full h-60 object-cover" />
    </div>
  );
};

export default PreviewSite;
