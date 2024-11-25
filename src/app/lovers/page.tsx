'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Customization {
  title: string;
  subtitle: string;
  image: string;
  backgroundColor: string;
}

const SiteCreator: React.FC = () => {
  const [, setSelectedTheme] = useState<string | null>(null);
  const [customization, setCustomization] = useState<Customization>({
    title: '',
    subtitle: '',
    image: '',
    backgroundColor: '#ffffff',
  });
  const [step, setStep] = useState<number>(1);

  const handleThemeSelection = (theme: string) => {
    setSelectedTheme(theme);
    setStep(2);
  };

  const handleCustomizationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomization((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization((prev) => ({ ...prev, backgroundColor: e.target.value }));
  };

  const handleSubmit = () => {
    setStep(3);
  };

  // HTML Dosyasını İndirme
  const downloadSite = () => {
    const element = document.createElement('a');
    const siteHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${customization.title}</title>
        <style>
          body {
            background-color: ${customization.backgroundColor};
            font-family: Roboto, sans-serif;
            text-align: center;
            padding: 20px;
            color:white;
          }
          img {
            max-width: 300px;
            height: auto;
            margin: 20px auto;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>${customization.title}</h1>
        <h2>${customization.subtitle}</h2>
        ${customization.image ? `<img src="${customization.image}" alt="Custom Image">` : ''}
      </body>
      </html>
    `;
    const file = new Blob([siteHTML], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'website.html';
    document.body.appendChild(element);
    element.click();
  };

  // Paylaşılabilir Link Simülasyonu
  const getShareableLink = () => {
    const simulatedLink = `https://example.com/shared-site?title=${encodeURIComponent(
      customization.title
    )}&subtitle=${encodeURIComponent(customization.subtitle)}`;
    alert(`Paylaşılabilir Link: ${simulatedLink}`);
  };

  return (
    <div className="container mx-auto p-6">
      <nav className="w-full flex justify-between items-center bg-transparent p-4 shadow-lg">
        <div className="text-white text-2xl font-bold">Brand</div>
        <ul className="hidden sm:flex gap-8 text-white">
          <li><a href="/" className="hover:text-gray-300">Anasayfa</a></li>
          <li><a href="#" className="hover:text-gray-300">Hakkımızda</a></li>
          <li><a href="/" className="hover:text-gray-300">Servislerimiz</a></li>
          <li><a href="#" className="hover:text-gray-300">İletişim</a></li>
        </ul>
        <button className="sm:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {step === 1 && (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center py-5">Bir Tema Seçin</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              className="p-4 border rounded-lg cursor-pointer"
              onClick={() => handleThemeSelection('Romantik')}
            >
              Romantik Tema
            </button>
            <button
              className="p-4 border rounded-lg cursor-pointer"
              onClick={() => handleThemeSelection('Minimalist')}
            >
              Minimalist Tema
            </button>
            <button
              className="p-4 border rounded-lg cursor-pointer"
              onClick={() => handleThemeSelection('Eğlenceli')}
            >
              Eğlenceli Tema
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center py-5">Kişiselleştirme</h2>
          <div className="mb-4">
            <label className="block font-medium">Başlık</label>
            <input
              type="text"
              name="title"
              value={customization.title}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Alt Başlık</label>
            <textarea
              name="subtitle"
              value={customization.subtitle}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Resim Linki</label>
            <input
              type="text"
              name="image"
              value={customization.image}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Resim Yükleyin</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-200 p-2 border rounded"
            />
            {customization.image && (
              <div className="flex justify-center mt-4">
                <Image src={customization.image} alt="Uploaded" width={300} height={300} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium">Arka Plan Rengi</label>
            <input
              type="color"
              value={customization.backgroundColor}
              onChange={handleColorChange}
              className="w-200 p-2 border rounded"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg"
          >
            Analizi Göster
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Sonuç</h2>
          <div
            style={{ backgroundColor: customization.backgroundColor }}
            className="p-6 rounded-lg text-center"
          >
            <h1 className="text-4xl font-bold">{customization.title}</h1>
            <p className="text-xl">{customization.subtitle}</p>
            {customization.image && (
              <div className="mt-4">
                <Image src={customization.image} alt="Custom" width={300} height={300} />
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={downloadSite}
              className="px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              Web Sitesini İndir
            </button>
            {/* <button
              onClick={getShareableLink}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Paylaşılabilir Link Al
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteCreator;
