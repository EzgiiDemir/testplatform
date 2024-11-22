"use client";

import { useState } from "react";

export default function Anket() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    question11: "",
    question12: "",
    question13: "",
    question14: "",
    question15: "",
    question16: "",
    question17: "",
    question18: "",
    question19: "",
    question20: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeResults = (answers: Record<string, string>) => {
    const categories = {
      Engineering: 0,
      Teaching: 0,
      Healthcare: 0,
      Sports: 0,
      Arts: 0,
      Business: 0,
      Law: 0,
      Others: 0,
    };

    // Buradaki weights nesnesinin sorulara göre doğru değerleri içerdiğinden emin olun
    const weights = {
      question1: { Engineering: 1, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question2: { Engineering: 1, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question3: { Engineering: 0, Teaching: 1, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question4: { Engineering: 0, Teaching: 1, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question5: { Engineering: 0, Teaching: 0, Healthcare: 1, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question6: { Engineering: 0, Teaching: 0, Healthcare: 1, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question7: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 1, Arts: 0, Business: 0, Law: 0 },
      question8: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 1, Arts: 0, Business: 0, Law: 0 },
      question9: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 1, Business: 0, Law: 0 },
      question10: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 1, Business: 0, Law: 0 },
      question11: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 1, Law: 0 },
      question12: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 1, Law: 0 },
      question13: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 1 },
      question14: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 1 },
      question15: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 1, Law: 0 },
      question16: { Engineering: 1, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question17: { Engineering: 0, Teaching: 1, Healthcare: 0, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question18: { Engineering: 0, Teaching: 0, Healthcare: 1, Sports: 0, Arts: 0, Business: 0, Law: 0 },
      question19: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 0, Arts: 1, Business: 0, Law: 0 },
      question20: { Engineering: 0, Teaching: 0, Healthcare: 0, Sports: 1, Arts: 0, Business: 0, Law: 0 },
    };

    Object.keys(answers).forEach((question) => {
      const answerValue = parseInt(answers[question] || '0');
      // Sadece `weights[question]` tanımlandığında işlem yapılacak
      if (weights[question]) {
        Object.keys(categories).forEach((category) => {
          categories[category] += (answerValue * (weights[question][category] || 0));
        });
      }
    });

    const maxCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b
    );

    switch (maxCategory) {
      case "Engineering":
        return "Mühendislik alanında güçlü bir profile sahipsiniz. Bu alanda yazılım, inşaat, makine, elektronik gibi farklı dallarda başarılı olabilirsiniz.";
      case "Teaching":
        return "Öğretmenlik ve eğitim alanında potansiyeliniz yüksek. Eğitim teknolojileri, özel eğitim, çocuk gelişimi gibi alanlarda fırsatlar bulabilirsiniz.";
      case "Healthcare":
        return "Sağlık sektöründe başarılı olabilirsiniz. Doktorluk, hemşirelik, fizyoterapi, diyetisyenlik gibi alanlar ilginizi çekebilir.";
      case "Sports":
        return "Spor ve fiziksel aktivitelere olan ilginiz yüksek. Spor antrenörlüğü, spor yönetimi veya rehabilitasyon gibi kariyer seçenekleri olabilir.";
      case "Arts":
        return "Sanat ve yaratıcılık alanında yetenekleriniz dikkat çekici. Grafik tasarım, moda, müzik, sinema gibi yaratıcı alanlarda başarılı olabilirsiniz.";
      case "Business":
        return "İş dünyasında başarılı olma potansiyeliniz var. Yönetim, girişimcilik, pazarlama veya finans gibi alanlarda başarılı olabilirsiniz.";
      case "Law":
        return "Hukuk ve adalet alanında çalışmak için uygun bir profiliniz var. Avukatlık, hakimlik, danışmanlık gibi alanlarda kendinizi geliştirebilirsiniz.";
      default:
        return "Farklı kariyer alanlarını keşfetmek için daha fazla bilgi toplamanız gerekebilir.";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = analyzeResults(answers);
    setResult(result);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-transparent">
      <nav className="w-full flex justify-between items-center bg-transparent p-4 shadow-lg">
        <div className="text-white text-2xl font-bold">Brand</div>
        <ul className="hidden sm:flex gap-8 text-white">
          <li>
            <a href="/" className="hover:text-gray-300">
              Anasayfa
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Hakkımızda
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-gray-300">
              Servislerimiz
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              İletişim
            </a>
          </li>
        </ul>
        <button className="sm:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div className="bg-[#2b2b2b] text-white rounded-lg p-6 mt-6 max-w-xl w-full ">

        <form onSubmit={handleSubmit}>
          {[
            "Bir mühendislik mesleği ile ilgilenir misiniz?",
            "Öğretmenlik yapmak istiyor musunuz?",
            "Sağlık sektöründe çalışmayı düşünüyor musunuz?",
            "Spor ve fiziksel aktivitelerle ilgileniyor musunuz?",
            "Sanat ve yaratıcı projelere ilgi duyar mısınız?",
            "İş dünyasında yönetim ve liderlik becerileri gösterir misiniz?",
            "Hukuk alanına ilgi duyuyor musunuz?",
          ].map((question, index) => (
            <div key={index} className="mb-6">
              <label className="block">{question}</label>
              <select
                name={`question${index + 1}`}
                value={answers[`question${index + 1}`]}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
                required
              >
                <option value="">Seçiniz</option>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
              </select>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Sonuçları Göster
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Sonuçlar:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
