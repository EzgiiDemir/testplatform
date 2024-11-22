'use client';
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const CustomizeSite: React.FC = () => {
  const router = useRouter();
  const { theme } = router.query as { theme: string };

  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Önizleme için
    }
  };

  const handleFinish = () => {
    if (title && message && image) {
      const siteData = { theme, title, message, image };
      localStorage.setItem('siteData', JSON.stringify(siteData));
      router.push('/preview-site');
    } else {
      alert('Lütfen tüm alanları doldurun!');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Tema: {theme}</h1>
      <p className="mb-6">Web sitenize bir başlık ve mesaj ekleyin!</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Başlık:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Mesaj:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Fotoğraf Yükle:</label>
        <input type="file" onChange={handleImageUpload} />
        {image && <img src={image} alt="Önizleme" className="mt-4 w-40 h-40 object-cover" />}
      </div>

      <button
        onClick={handleFinish}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Bitir ve Önizle
      </button>
    </div>
  );
};

export default CustomizeSite;
