'use client';
import React, { useState } from 'react';

interface Customization {
  title: string;
  subtitle: string;
  image: string;
  backgroundColor: string;
}

const SiteCreator: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
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
        <div className='text-dark'>
          <h2 className="text-2xl font-bold mb-4 text-center py-5">Kişiselleştirme</h2>
          <div className="mb-4">
            <label className="block font-medium">Başlık</label>
            <input
              type="text"
              name="title"
              value={customization.title}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Alt Başlık</label>
            <textarea
              name="subtitle"
              value={customization.subtitle}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Resim Linki</label>
            <input
              type="text"
              name="image"
              value={customization.image}
              onChange={handleCustomizationChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {/* Resim Yükleme Özelliği */}
          <div className="mb-4">
            <label className="block font-medium">Resim Yükleyin</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-500 p-2 border rounded"
            />
            {customization.image && (
              <div className="flex justify-center mt-4">
                <img
                  src={customization.image}
                  alt="Uploaded"
                  className="max-w-[300px] max-h-[300px] object-cover"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Arka Plan Rengi</label>
            <input
              type="color"
              value={customization.backgroundColor}
              onChange={handleColorChange}
              className="w-500 p-2 border rounded"
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
              <div className="mt-4 flex justify-center">
                <img
                  src={customization.image}
                  alt="Custom"
                  className="max-w-[300px] max-h-[300px] object-cover"
                />
              </div>
            )}
          </div>
          <button
            onClick={() => alert('Web sitesi başarıyla kaydedildi!')}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg"
          >
            Web Sitesini Yayınla
          </button>
        </div>
      )}
    </div>
  );
};

export default SiteCreator;
