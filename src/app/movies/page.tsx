'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
// TMDb API anahtarınızı buraya ekleyin
const API_KEY = 'bfe71cb56fab1a9f089cfae3304faf9f';
// Define the type for the movie object
interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}

const FilmRecommendation: React.FC = () => {
  const [user1Selection, setUser1Selection] = useState<number[]>([]); // Kullanıcı 1 seçimi
  const [user2Selection, setUser2Selection] = useState<number[]>([]); // Kullanıcı 2 seçimi
  const [movies, setMovies] = useState<Movie[]>([]); // Film verileri, type is now Movie[]

  const categories = [
    { id: 28, name: 'Aksiyon' },
    { id: 12, name: 'Macera' },
    { id: 16, name: 'Animasyon' },
    { id: 35, name: 'Komedi' },
    { id: 80, name: 'Suç' },
    { id: 99, name: 'Belgesel' },
    { id: 18, name: 'Dram' },
    { id: 10751, name: 'Aile' },
    { id: 14, name: 'Fantezi' },
    { id: 36, name: 'Tarih' },
    { id: 27, name: 'Korku' },
    { id: 10402, name: 'Müzik' },
    { id: 9648, name: 'Gizem' },
    { id: 10749, name: 'Romantik' },
    { id: 878, name: 'Bilim Kurgu' },
    { id: 10770, name: 'TV Filmi' },
    { id: 53, name: 'Gerilim' },
    { id: 37, name: 'Western' },
    { id: 10752, name: 'Savaş' }
  ];

  // Kategori seçim işlemi
  const handleSelectionChange = (categoryId: number, user: number) => {
    if (user === 1) {
      setUser1Selection((prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId)
          : [...prevSelected, categoryId]
      );
    } else {
      setUser2Selection((prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId)
          : [...prevSelected, categoryId]
      );
    }
  };

  // API'den filmleri çekme
  useEffect(() => {
    if (user1Selection.length > 0 && user2Selection.length > 0) {
      const fetchMovies = async () => {
        const genreIds = [...user1Selection, ...user2Selection].join(',');
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}`
          );
          const filteredMovies = response.data.results.filter(
            (movie: Movie) => movie.vote_average > 6
          ); // 6.5 üzerindeki filmleri filtrele
          setMovies(filteredMovies.slice(0, 21)); // İlk 9 filmi al
        } catch (error) {
          console.error('Film verileri alınırken hata oluştu:', error);
        }
      };
      fetchMovies();
    }
  }, [user1Selection, user2Selection]);

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
      <h1 className="text-3xl font-bold mb-4 text-center py-5">Film Kategorileri Seçin</h1>

      {/* Kullanıcı 1'in Kategori Seçimi */}
      <h2 className="text-xl font-semibold mb-4">Kullanıcı 1 Kategorileri Seçsin</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelectionChange(category.id, 1)}
            className={`px-4 py-2 border rounded ${user1Selection.includes(category.id) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Kullanıcı 2'nin Kategori Seçimi */}
      <h2 className="text-xl font-semibold mb-4">Kullanıcı 2 Kategorileri Seçsin</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelectionChange(category.id, 2)}
            className={`px-4 py-2 border rounded ${user2Selection.includes(category.id) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filmleri Göster */}
      <h2 className="text-2xl font-semibold mb-4">Ortak Film Önerileri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {movies.map((movie) => (
          <div key={movie.id} className="rounded-lg shadow-lg bg-white overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.overview.slice(0, 150)}...</p>
              <p className="text-sm text-gray-500 mt-2">Puan: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmRecommendation;
