"use client";

import { useState } from "react";

// Kartların görsel ve anlam verileri
const tarotCards = [
  { name: "The Fool", img: "https://th.bing.com/th/id/OIP.MxGHAPwsJLBCJ7P7-h1-oAHaL-?rs=1&pid=ImgDetMain", description: "Yeni başlangıçlar, cesaret." },
  { name: "The Magician", img: "https://ih1.redbubble.net/image.620866792.7425/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg", description: "Yaratıcılık, beceri." },
  { name: "The High Priestess", img: "https://th.bing.com/th/id/OIP.zuy3odkN55AuwwUj7NR1EAHaMD?rs=1&pid=ImgDetMain", description: "İçsel bilgelik, sezgi." },
  { name: "The Empress", img: "https://th.bing.com/th/id/OIP.mgDzJq8-alIEPsZ7LIpGnQAAAA?rs=1&pid=ImgDetMain", description: "Annelik, yaratıcılık." },
  { name: "The Emperor", img: "https://th.bing.com/th/id/R.b0315a2f44a65951aa2722e6df0bc8d3?rik=xBIzKiFxxD0%2fSA&pid=ImgRaw&r=0", description: "Otorite, düzen." },
  { name: "The Lovers", img: "https://i.pinimg.com/736x/5a/50/ab/5a50abccf9bec180a3f186d3da4bf320.jpg", description: "Aşk, ilişkiler." },
  { name: "The Chariot", img: "https://th.bing.com/th/id/R.42a6ad72f15e083262d6e509cdb5a887?rik=D8qM07UTvS%2f%2b6g&pid=ImgRaw&r=0", description: "Zafer, irade gücü." },
  { name: "Strength", img: "https://th.bing.com/th/id/R.adcbd2cbb0ffe63f2bfe6ff939f41e59?rik=r12%2fgExhX%2fixPQ&riu=http%3a%2f%2fwww.tarotcardmeanings.net%2fimages%2ftarotcards-large%2ftarot-strength.jpg&ehk=tUagUBjkVJqUxZ09q6f5%2bGdAe6R6SH0lvpvDC7B7rGg%3d&risl=&pid=ImgRaw&r=0", description: "İçsel güç, cesaret." },
  { name: "The Hermit", img: "https://th.bing.com/th/id/R.a3cae6cc2888564e9d6fbd108aa32bf3?rik=%2f9W0qBP0kG%2fSJg&riu=http%3a%2f%2fwww.tarotcardmeanings.net%2fimages%2ftarotcards-large%2ftarot-hermit.jpg&ehk=4hqFQAJEKDXlpFgrEmToebLpNpiD8LzA9yr61AINaMk%3d&risl=&pid=ImgRaw&r=0", description: "İçsel keşif, yalnızlık." },
  { name: "Wheel of Fortune", img: "https://th.bing.com/th/id/OIP.juilg8KjttKiV1cixGQwfwHaM4?rs=1&pid=ImgDetMain", description: "Şans, değişim, kader." },
  { name: "Justice", img: "https://th.bing.com/th/id/R.c84795a6cbaced8a16f5ed2858c3c12b?rik=3jezcor%2ftgorXw&riu=http%3a%2f%2fastrotarot.net%2fwp-content%2fuploads%2f2021%2f03%2f11-The-Justice.jpg&ehk=lKI99L1FeULO17T%2ffPOoPUOO65K2M79rdtnqDTD0DHU%3d&risl=&pid=ImgRaw&r=0", description: "Adalet, denge, dürüstlük." },
  { name: "The Hanged Man", img: "https://th.bing.com/th/id/R.84540686476d678441db19a50e338301?rik=n5g4YgrgdL%2bTBQ&pid=ImgRaw&r=0", description: "Fedakarlık, farklı bakış açısı." },
  { name: "Death", img: "https://th.bing.com/th/id/R.94be688d02a9661526905914a7cff9b0?rik=Gr7RwhXouExjhA&riu=http%3a%2f%2fastrotarot.net%2fwp-content%2fuploads%2f2021%2f03%2f13-The-Death.jpg&ehk=czyr2j5HM8FTNEcLxGZPd0o%2f7D12PT1dmSpiGt7fRVs%3d&risl=&pid=ImgRaw&r=0", description: "Sonlanma, dönüşüm, yeniden doğuş." },
  { name: "Temperance", img: "https://th.bing.com/th/id/R.511ea8264a94d1fba67c91352a3d5144?rik=BmsaX7eHwBuK%2bw&pid=ImgRaw&r=0", description: "Denge, uyum, sabır." },
  { name: "The Devil", img: "https://th.bing.com/th/id/R.1a3c578b870c7f15a4979c06d704cd1c?rik=IGHQX90XM1jLhA&pid=ImgRaw&r=0", description: "Bağımlılıklar, sınırlamalar." },
  { name: "The Tower", img: "https://th.bing.com/th/id/OIP.e4zzavDWXh7jlxO_1j3YXQHaMM?rs=1&pid=ImgDetMain", description: "Ani değişim, çöküş." },
  { name: "The Star", img: "https://th.bing.com/th/id/R.afffbd779fe8e0b7f0c384030a317c8e?rik=EXwnbheDPkl6AA&pid=ImgRaw&r=0", description: "Umut, iyileşme, ilham." },
  { name: "The Moon", img: "https://th.bing.com/th/id/R.22762bb5dd63dba125bb1eeb77be8565?rik=39do8F6rDmK%2fAw&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20140209072604%2ftarotcardmeanings%2fimages%2f9%2f99%2f18-The_Moon.jpg&ehk=O0RBedj%2fD5rF3%2bsXXk5hCXD8I21hcr3INJ4FBMy29es%3d&risl=&pid=ImgRaw&r=0", description: "Gizem, yanılsamalar, bilinçaltı." },
  { name: "The Sun", img: "https://th.bing.com/th/id/R.d8ab75e9328bfc942d8ad3bba89d5cf2?rik=6pLMGKUMTraKeA&pid=ImgRaw&r=0", description: "Mutluluk, başarı, güven." },
  { name: "Judgment", img: "https://th.bing.com/th/id/R.302ddca486a7419efb257b9ffb0b7d9a?rik=BFTZyEZpHQNmrw&pid=ImgRaw&r=0", description: "Yeniden doğuş, karar verme." },
  { name: "The World", img: "https://th.bing.com/th/id/OIP.qWceIkCXaLpHHvn0e7RdPQAAAA?w=356&h=595&rs=1&pid=ImgDetMain", description: "Tamamlama, başarı, tatmin." },
];

export default function TarotApp() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]); // Seçilen kartları tutuyor
  const [showResult, setShowResult] = useState(false); // Sonuçları göstermek için

  const handleCardSelect = (cardName: string) => {
    // Kart seçildiğinde seçilen kartları güncelle
    if (selectedCards.length < 3 && !selectedCards.includes(cardName)) {
      setSelectedCards((prevSelected) => [...prevSelected, cardName]);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const getCardDetails = (cardName: string) => {
    return tarotCards.find((card) => card.name === cardName);
  };

  const getPersonalizedComment = (cardName: string) => {
    // Kullanıcıya özel yorumlar
    switch (cardName) {
      case "The Fool":
        return "Yeni bir başlangıç yapma zamanın geldi. Cesaretini topla, hayatının yeni bir aşamasına adım atabilirsin!";
      case "The Magician":
        return "Yaratıcılığını kullanarak kendi kaderini yaratabileceksin. Elindeki güçleri doğru şekilde kullanmalısın.";
      case "The High Priestess":
        return "İçsel sezgilerine güven. Bilinçaltı sana rehberlik edebilir, ruhsal bir yolculuğa çıkabilirsin.";
      case "The Empress":
        return "Duygusal açıdan çok verici bir dönemdesin. Yaratıcı projelere başlamak için mükemmel bir zaman!";
      case "The Emperor":
        return "Hayatındaki düzeni sağlamak ve otoriteyi elinde tutmak için doğru bir zaman. Gücünü kullan!";
      case "The Lovers":
        return "Aşk ve ilişkilerle ilgili önemli bir karar verebilirsin. Kalbinin sesini dinle ve doğru seçim yap!";
      case "The Chariot":
        return "Zafer seninle. Karşına çıkan engelleri aşmak için azim ve irade gücün yeterli!";
      case "Strength":
        return "İçsel gücün ve cesaretinle her türlü zorluğun üstesinden gelebilirsin. Kendine güven!";
      case "The Hermit":
        return "Biraz yalnız kalmak, içsel yolculuğunu yapmak ve kendini keşfetmek için iyi bir zaman. Sessizlik sana cevap verebilir.";
      case "Wheel of Fortune":
        return "Kaderin seni önemli bir değişime götürüyor. Şansın dönüyor, değişim seni bekliyor.";
      case "Justice":
        return "Adalet ve dengeyi sağlamak için doğru kararlar alman gerekebilir. Dürüst ol ve doğruyu yap!";
      case "The Hanged Man":
        return "Bazı fedakarlıklar yapman gerekebilir. Durumları farklı açılardan görmek, sana fayda sağlayabilir.";
      case "Death":
        return "Bu bir son değil, bir başlangıç. Eskiyi geride bırakıp yeni bir yolculuğa çıkma zamanı.";
      case "Temperance":
        return "Dengeyi bulmak ve sabırlı olmak seni başarıya götürecek. Aşırılıklardan kaçın ve sakin kal.";
      case "The Devil":
        return "Bağımlılıklar ve sınırlamalar seni engelliyor olabilir. Zincirlerini kırıp özgürleşmek için cesaretini topla.";
      case "The Tower":
        return "Ani değişimler seni şaşırtabilir, ancak her yıkımın ardında yeni bir fırsat var. Korkma, yeniden inşa edebilirsin.";
      case "The Star":
        return "Umut ve iyileşme seni bekliyor. Hayatının en parlak dönemlerinden birine adım atabilirsin.";
      case "The Moon":
        return "Bilinçaltındaki gizemlere dalmak seni doğru yola yönlendirebilir. Yanılsamalara dikkat et.";
      case "The Sun":
        return "Başarı, mutluluk ve güven seni bekliyor. Hayatında aydınlık bir dönem başlıyor!";
      case "Judgment":
        return "Büyük bir karar verme zamanın geldi. Geçmişle yüzleşmek, seni yeni bir başlangıca götürebilir.";
      case "The World":
        return "Her şeyin tam ve eksiksiz olduğunu hissedeceksin. Tamamlanma ve başarı seni bekliyor.";
      default:
        return "Kart yorumlanamıyor.";
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
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

      <div className="mt-10">
        <h2 className="text-xl mb-4">Kartlarınızı Seçin 🔮 </h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {tarotCards.map((card) => (
            <div
              key={card.name}
              className={`cursor-pointer p-2 rounded-lg border-2 ${
                selectedCards.includes(card.name) ? "border-green-500" : "border-gray-700"
              }`}
              onClick={() => handleCardSelect(card.name)}
              style={{
                backgroundImage: `url('https://i.etsystatic.com/38886743/r/il/0674fa/4539607518/il_fullxfull.4539607518_fhmu.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
                width: "150px",
              }}
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-full object-cover rounded-lg opacity-0" // Kartın arkasında görsel gizlendi
              />
            </div>
          ))}
        </div>

        <button
          className="bg-purple-600 text-white py-2 px-6 rounded-lg"
          onClick={handleShowResult}
          disabled={selectedCards.length < 3}
        >
          Sonuçları Göster
        </button>

        {showResult && (
          <div className="mt-10 text-center">
            <h3 className="text-2xl mb-4">Seçtiğiniz Kartlar</h3>
            {selectedCards.map((cardName) => {
              const cardDetails = getCardDetails(cardName);
              return (
                <div key={cardName} className="mb-4">
                  <img src={cardDetails?.img} alt={cardName} className="w-32 mx-auto" />
                  <h4 className="text-xl">{cardName}</h4>
                  <p>{cardDetails?.description}</p>
                  <p className="italic mt-2">{getPersonalizedComment(cardName)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
