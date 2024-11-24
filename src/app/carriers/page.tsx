"use client";

import { useState } from "react";

export default function Anket() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");

  const questions = [
    "Teknik problemleri çözmekten hoşlanır mısınız?",
    "İnsanlara bilgi öğretmek veya yönlendirmek size keyif verir mi?",
    "Sağlık alanında başkalarına yardım etmeyi sever misiniz?",
    "Takım sporlarına katılmaktan veya fiziksel aktivitelerden hoşlanır mısınız?",
    "Sanatsal aktivitelerle ilgilenir misiniz (resim, müzik, yazarlık)?",
    "Liderlik rollerinde kendinizi rahat hisseder misiniz?",
    "Analitik düşünme veya karmaşık problemlere çözüm bulmak sizin için çekici mi?",
    "Doğa veya çevre ile ilgili çalışmalar yapmak hoşunuza gider mi?",
    "İnsanlarla iletişim kurmayı ve onların problemlerine çözümler sunmayı sever misiniz?",
    "Yeni teknolojiler veya yazılımlar keşfetmek ilginizi çeker mi?",
    "Tasarım ve estetik üzerine çalışmayı sever misiniz?",
    "Finansal analiz veya işletme yönetimi ile ilgilenir misiniz?",
    "Yaratıcılık gerektiren bir projede yer almak sizi mutlu eder mi?",
    "Hukuki problemlerle ilgilenmek veya adalet için çalışmak ilginizi çeker mi?",
    "Bilimsel araştırmalar veya deneyler yapmak sizin için ilgi çekici mi?",
    "Bağımsız çalışmayı mı, yoksa ekip çalışmalarını mı tercih edersiniz?",
    "Zihinsel olarak karmaşık oyunlar veya bulmacalar çözmekten keyif alır mısınız?",
    "Kendi başınıza proje veya iş geliştirmek sizin için motive edici mi?",
    "Sosyal sorumluluk projelerine katılmayı sever misiniz?",
    "Seyahat ederek farklı kültürler ve insanlar tanımaktan hoşlanır mısınız?",
  ];

  const categories = {
    Engineering: 0,
    Teaching: 0,
    Healthcare: 0,
    Sports: 0,
    Arts: 0,
    Business: 0,
    Law: 0,
    Science: 0,
    Social: 0,
    Technology: 0,
  };

  type CategoryKeys = keyof typeof categories;

  // Typing 'weights' as Record<string, Partial<Record<CategoryKeys, number>>> ensures that
  // we can safely index 'weights' with a string key, and the values will be partial objects with category names as keys.
  const weights: Record<string, Partial<Record<CategoryKeys, number>>> = {
    question1: { Engineering: 1, Technology: 1 },
    question2: { Teaching: 1 },
    question3: { Healthcare: 1, Social: 1 },
    question4: { Sports: 1 },
    question5: { Arts: 1 },
    question6: { Business: 1, Social: 1 },
    question7: { Engineering: 1, Science: 1 },
    question8: { Science: 1, Social: 1 },
    question9: { Social: 1 },
    question10: { Technology: 1, Engineering: 1 },
    question11: { Arts: 1, Technology: 1 },
    question12: { Business: 1 },
    question13: { Arts: 1 },
    question14: { Law: 1 },
    question15: { Science: 1 },
    question16: { Social: 1, Arts: 1 },
    question17: { Engineering: 1, Technology: 1 },
    question18: { Business: 1, Social: 1 },
    question19: { Social: 1 },
    question20: { Social: 1, Arts: 1 },
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeResults = (answers: Record<string, string>) => {
    const categoryScores = { ...categories };

    Object.keys(answers).forEach((question) => {
      const value = parseInt(answers[question] || "0");
      if (weights[question]) {
        Object.keys(weights[question]!).forEach((category) => {
          categoryScores[category as CategoryKeys] += value * (weights[question]![category as CategoryKeys] || 0);
        });
      }
    });

    const maxCategory = Object.keys(categoryScores).reduce((a, b) =>
      categoryScores[a as CategoryKeys] > categoryScores[b as CategoryKeys] ? a : b
    );

    const recommendations: Record<string, string> = {
      Engineering:
        "Mühendislik alanında başarılı olabilirsiniz. Özellikle yazılım, elektronik, inşaat gibi alanlar size uygun olabilir.",
      Teaching:
        "Eğitim alanında başarılı olabilirsiniz. Öğretmenlik, eğitmenlik veya özel eğitim gibi kariyerler sizin için ideal.",
      Healthcare:
        "Sağlık sektöründe çalışmayı düşünebilirsiniz. Doktorluk, hemşirelik veya diyetisyenlik alanlarında başarı sağlayabilirsiniz.",
      Sports:
        "Spor alanında kariyer yapabilirsiniz. Spor koçluğu, rehabilitasyon veya yönetim gibi roller size uygun olabilir.",
      Arts:
        "Sanat ve yaratıcılık alanında yeteneklisiniz. Tasarım, müzik, sinema gibi sektörlerde başarılı olabilirsiniz.",
      Business:
        "İş dünyasında yönetim veya girişimcilik gibi roller sizin için uygun olabilir.",
      Law:
        "Hukuk alanında çalışmak ilginizi çekebilir. Avukatlık, danışmanlık veya politika size uygun olabilir.",
      Science:
        "Bilimsel araştırmalar veya laboratuvar çalışmaları size uygun. Fizik, biyoloji veya kimya alanlarında çalışabilirsiniz.",
      Social:
        "Sosyal projelerde yer almak sizin için ideal. İnsanlarla çalışmak ve onları yönlendirmekten keyif alabilirsiniz.",
      Technology:
        "Teknoloji alanında başarılı olabilirsiniz. Yazılım geliştirme, yapay zeka veya veri bilimi size uygun olabilir.",
    };

    return recommendations[maxCategory] || "Daha fazla bilgiye ihtiyaç var.";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = analyzeResults(answers);
    setResult(result);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-black-100">
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
      <h1 className="text-2xl font-bold mb-6 py-5">Kariyer Anketi</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-black">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block font-medium">{question}</label>
            <select
              name={`question${index + 1}`}
              value={answers[`question${index + 1}`] || ""}
              onChange={handleChange}
              className="mt-2 w-full p-2 border rounded"
              required
            >
              <option value="">Seçiniz</option>
              <option value="1">Evet</option>
              <option value="0">Hayır</option>
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          Sonuçları Göster
        </button>
      </form>
      <div className="mt-6 text-white font-semibold">{result}</div>
    </div>
  );
}
