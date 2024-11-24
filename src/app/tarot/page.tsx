"use client";


import React, { useState, useEffect } from 'react';

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
 // Kılıçlar
 { name: "Ace of Swords", img: "https://th.bing.com/th/id/R.8dc949b54dfdf4356c0fa88312f60456?rik=OWpaO9YK2uaRog&pid=ImgRaw&r=0", description: "Yeni başlangıçlar, fikirler." },
 { name: "Two of Swords", img: "https://th.bing.com/th/id/OIP._eF-7s1VT-c5Sm1KC7581AHaMM?rs=1&pid=ImgDetMain", description: "Karar verme, çatışma." },
 { name: "Three of Swords", img: "https://th.bing.com/th/id/R.98a8ea44fea51879c7b1e2084bf7cf21?rik=tXz3lIOhWkWGoA&riu=http%3a%2f%2fwww.tarotreadinglondon.com%2fwp-content%2fuploads%2f2020%2f04%2f3-of-Swords.jpg&ehk=hHcarve2T5phZb5D0ANTpY3PKuls1w97r9uskcE%2bnAg%3d&risl=&pid=ImgRaw&r=0", description: "Ayrılık, acı." },
 { name: "Four of Swords", img: "https://th.bing.com/th/id/R.d0f32e31c2757dbfce70d0f5d568aac2?rik=lA7lWRYfc8gxxg&pid=ImgRaw&r=0", description: "Dinlenme, iyileşme." },
 { name: "Five of Swords", img: "https://th.bing.com/th/id/OIP.yEz6vpSgVP7kzMJtJuW92gAAAA?w=204&h=350&rs=1&pid=ImgDetMain", description: "Zafer, ama kayıplar." },
 { name: "Six of Swords", img: "https://th.bing.com/th/id/R.52e86f2c2a2fccb1e2f04f8f527a566e?rik=yc5V4MYfaRsFkg&pid=ImgRaw&r=0", description: "Geçiş, huzur." },
 { name: "Seven of Swords", img: "https://secretserendipity.com/wp-content/uploads/2019/10/tarot-swords-07.jpg", description: "Strateji, gizlilik." },
 { name: "Eight of Swords", img: "https://th.bing.com/th/id/R.c2175f665640c9f4eb3250f69b2ff1e4?rik=zVUNqOBdcG%2b2nQ&pid=ImgRaw&r=0", description: "Sınırlamalar, korku." },
 { name: "Nine of Swords", img: "https://th.bing.com/th/id/R.296bc648de9063f08308c0349c709a5c?rik=PmDLAvIXu0q8mg&pid=ImgRaw&r=0", description: "Gece karanlık, endişe." },
 { name: "Ten of Swords", img: "https://th.bing.com/th/id/OIP.WVGtg6j-K5Bn1GkNtQfCjwHaMM?rs=1&pid=ImgDetMain", description: "Bitiş, felaket." },
 { name: "Page of Swords", img: "https://th.bing.com/th/id/R.bc928e403ccf01cf1dc2f4b96ec07e18?rik=hVyLvTfk%2fokrPg&pid=ImgRaw&r=0", description: "Araştırma, yenilik." },
 { name: "Knight of Swords", img: "https://th.bing.com/th/id/R.706d74b4e20966493b4bd2d6309268be?rik=y1MB9OTH%2fL5T2A&pid=ImgRaw&r=0", description: "Hızlı hareket, aksiyon." },
 { name: "Queen of Swords", img: "https://th.bing.com/th/id/OIP.NANcCoR9jEEBTfclqZp6kwHaM4?rs=1&pid=ImgDetMain", description: "Bilinçli, kararlı." },
 { name: "King of Swords", img: "https://th.bing.com/th/id/OIP.OCalMzFxEMa8RPOSmc9N4AHaMt?rs=1&pid=ImgDetMain", description: "Zeka, liderlik." },

 // Değnekler
 { name: "Ace of Wands", img: "https://th.bing.com/th/id/OIP.oxVG1x_FATLwnL_3OyM5fQHaMA?rs=1&pid=ImgDetMain", description: "Yeni başlangıç, tutku." },
 { name: "Two of Wands", img: "https://th.bing.com/th/id/OIP.2FiqTzIB_k2sqjAA2tAArQHaMM?rs=1&pid=ImgDetMain", description: "Karar verme, keşif." },
 { name: "Three of Wands", img: "https://th.bing.com/th/id/R.55c25b35d2f7d7721997dd651a9b68a5?rik=wTdxAsEz%2bXcqtg&riu=http%3a%2f%2fwww.esotericmeanings.com%2fwp-content%2fuploads%2f2016%2f01%2f3-of-wands-waite-tarot.jpg&ehk=MMaR%2biNT%2fOHWZLivA8Mxl1Khwfd%2fGjYezyGnLfcx56k%3d&risl=&pid=ImgRaw&r=0", description: "İlerleme, başarı." },
 { name: "Four of Wands", img: "https://th.bing.com/th/id/R.9836536197498b78704ab7b43f6e7458?rik=2RmOCPLd5F6zLw&riu=http%3a%2f%2fwww.tarotcardmeanings.net%2fimages%2ftarotcards-large%2ftarot-wands-04.jpg&ehk=AVPn9aDa1VtGnGQwWeUMhuPxpI2dTsQF9%2b95pS1NiWA%3d&risl=&pid=ImgRaw&r=0", description: "Kutlama, huzur." },
 { name: "Five of Wands", img: "https://th.bing.com/th/id/OIP.zL-Uu2f2V2BPxnmhNzsxfgHaMl?w=1031&h=1753&rs=1&pid=ImgDetMain", description: "Rekabet, zorluk." },
 { name: "Six of Wands", img: "https://th.bing.com/th/id/OIP.HSC4TDW_TIf7tALsxJjsRAHaMM?rs=1&pid=ImgDetMain", description: "Zafer, tanınma." },
 { name: "Seven of Wands", img: "https://th.bing.com/th/id/OIP.GRYLr1xRj6nPWDA82jSS4AHaMM?rs=1&pid=ImgDetMain", description: "Savunma, kararlılık." },
 { name: "Eight of Wands", img: "https://th.bing.com/th/id/OIP.e4sLGB4V7C0nu_8a1kvphgHaMM?rs=1&pid=ImgDetMain", description: "Hız, ilerleme." },
 { name: "Nine of Wands", img: "https://th.bing.com/th/id/R.32b89e6a5b3b20f1e9fa9230f003da6e?rik=8Kmi3VRYTg%2fuZw&pid=ImgRaw&r=0", description: "Direnç, savunma." },
 { name: "Ten of Wands", img: "https://th.bing.com/th/id/OIP.nzFeHxDxro_KkZR8Vbp5LQHaMM?rs=1&pid=ImgDetMain", description: "Yük, sorumluluk." },
 { name: "Page of Wands", img: "https://th.bing.com/th/id/OIP._li_y4WnSNrpHr-V5Y3fhAHaMM?rs=1&pid=ImgDetMain", description: "Keşif, yenilik." },
 { name: "Knight of Wands", img: "https://th.bing.com/th/id/OIP.qUMrSqhkTHsMhBxSLTOTDQHaMM?rs=1&pid=ImgDetMain", description: "Cesaret, aksiyon." },
 { name: "Queen of Wands", img: "https://th.bing.com/th/id/R.b7a3584d9e3f7bab953a9b96bab61e57?rik=eXYoM4ysoGcpxg&pid=ImgRaw&r=0", description: "Yaratıcılık, güven." },
 { name: "King of Wands", img: "https://th.bing.com/th/id/R.0b8a03127b892ec21dbaa2f09f274eb8?rik=3JD9es32AztT5g&riu=http%3a%2f%2fwww.tarot-card.net%2ftarot-cards%2fimages%2fkingofwands.jpg&ehk=esn1%2blZHf4cqH6gUWgMoMBibMgisVUMo8OGESJUaPGQ%3d&risl=&pid=ImgRaw&r=0", description: "Liderlik, tutku." },

 // Kupa
 { name: "Ace of Cups", img: "https://th.bing.com/th/id/OIP.tR_fNz2DyVztmvOCOc6BAAAAAA?rs=1&pid=ImgDetMain", description: "Duygusal başlangıç, aşk." },
 { name: "Two of Cups", img: "https://th.bing.com/th/id/R.b51eeaeace943a7ae4bb886b64e0eaa2?rik=eEuaPHkV4iv%2frQ&pid=ImgRaw&r=0", description: "Bağ, ilişki." },
 { name: "Three of Cups", img: "https://th.bing.com/th/id/OIP.4-aFRUPHaMnZSeawMNqxNwHaMY?rs=1&pid=ImgDetMain", description: "Kutlama, dostluk." },
 { name: "Four of Cups", img: "https://th.bing.com/th/id/OIP.rk_HpCqg92oghpS5IdD8JQHaMM?rs=1&pid=ImgDetMain", description: "Bıkkınlık, içe dönme." },
 { name: "Five of Cups", img: "https://th.bing.com/th/id/R.656a595755e6f049addf89e1ad581359?rik=FGK1o2k42RbjGg&riu=http%3a%2f%2fwww.tarotreadinglondon.com%2fwp-content%2fuploads%2f2020%2f04%2f5-of-Cups.jpg&ehk=y0exq9ZKD8ZAhtVyrUfkmdPYGWJQoxNNR9bURyCl4nk%3d&risl=&pid=ImgRaw&r=0", description: "Kaybın acısı, yas." },
 { name: "Six of Cups", img: "https://th.bing.com/th/id/R.75eac0d11ccd394c9e5aba5bbeda9c68?rik=Id5fQCnspB%2f4YQ&pid=ImgRaw&r=0", description: "Geçmiş, nostalji." },
 { name: "Seven of Cups", img: "https://th.bing.com/th/id/R.fd96499c1ca4b9b6ecf802351f958c65?rik=LvRN2rxX9LY3lQ&pid=ImgRaw&r=0", description: "Seçim, illüzyon." },
 { name: "Eight of Cups", img: "https://th.bing.com/th/id/OIP.9dzQq_t1-jVkw8u2cU9HjgHaMn?w=646&h=1100&rs=1&pid=ImgDetMain", description: "Ayrılık, arayış." },
 { name: "Nine of Cups", img: "https://th.bing.com/th/id/OIP.FudoZBpe_sW-LH75Kt7DXAAAAA?rs=1&pid=ImgDetMain", description: "Duygusal tatmin, mutluluk." },
 { name: "Ten of Cups", img: "https://th.bing.com/th/id/R.99cb664085c34ad780ded0fe1fa48a2a?rik=UGDTj6vrFhDCVQ&pid=ImgRaw&r=0", description: "Aile, huzur." },
 { name: "Page of Cups", img: "https://th.bing.com/th/id/OIP.iXOHXRurRam-GIAf3T0F8QHaMM?rs=1&pid=ImgDetMain", description: "Hayal gücü, yenilik." },
 { name: "Knight of Cups", img: "https://th.bing.com/th/id/R.2f226fb3e960b7ce5a398e5a5bc69308?rik=ZzSFdz3JUd48Rg&pid=ImgRaw&r=0", description: "Romantizm, arayış." },
 { name: "Queen of Cups", img: "https://th.bing.com/th/id/OIP.m0Zk8HOQbquKtSU_perGuAHaMw?rs=1&pid=ImgDetMain", description: "Empati, duygu." },
 { name: "King of Cups", img: "https://s-media-cache-ak0.pinimg.com/736x/cf/47/6e/cf476e74a071cd15bad56c6b0b1650c8.jpg", description: "Duygusal denge, bilgelik." },

 //tilsim
{ name: "Ace of Pentacles", img: "https://th.bing.com/th/id/R.c5dd24f5749a32a90cfbccb3c8ffa10f?rik=CyV2G%2fSwp11tnQ&pid=ImgRaw&r=0", description: "Yeni fırsatlar, maddi kazanç." },
{ name: "Two of Pentacles", img: "https://th.bing.com/th/id/OIP.zlaqt4ChMuM9kWZ475-pNwAAAA?rs=1&pid=ImgDetMain", description: "Denge, esneklik." },
{ name: "Three of Pentacles", img: "https://th.bing.com/th/id/OIP.VFS4_T2XM80NdH57I38yYgHaM6?rs=1&pid=ImgDetMain", description: "İşbirliği, başarı." },
{ name: "Four of Pentacles", img: "https://cdn.shopify.com/s/files/1/1325/0879/files/four-of-pentacles-meaning-rider-waite-tarot_large.jpg?v=1491961901", description: "Güven, tutumluluk." },
{ name: "Five of Pentacles", img: "https://www.alittlesparkofjoy.com/wp-content/uploads/2021/03/five-of-pentacles-tarot-card.jpg", description: "Zorluk, kayıp." },
{ name: "Six of Pentacles", img: "https://th.bing.com/th/id/R.2b2928c8c9893d875f9bf30f9cbe58ec?rik=FzXEFIEOiKbV1g&pid=ImgRaw&r=0", description: "Paylaşım, denge." },
{ name: "Seven of Pentacles", img: "https://th.bing.com/th/id/R.26172c20dff5dbb5b8e5a9ef29646c9f?rik=qRbz8KEpKo%2bwVg&riu=http%3a%2f%2fwww.learntarot.com%2fbigjpgs%2fpents07.jpg&ehk=mhCIUv8NvGipw5jhYp3XoLS%2bhrpqBAgYP0zLjpE8RK0%3d&risl=&pid=ImgRaw&r=0", description: "Sabır, uzun vadeli başarı." },
{ name: "Eight of Pentacles", img: "https://th.bing.com/th/id/OIP.Uav6Z6LIcdvkprjJLIb1ZwAAAA?rs=1&pid=ImgDetMain", description: "Çalışma, beceri geliştirme." },
{ name: "Nine of Pentacles", img: "https://th.bing.com/th/id/OIP.lu_RWdUZZngFWcBKBdQZRgHaNA?rs=1&pid=ImgDetMain", description: "Bağımsızlık, başarı." },
{ name: "Ten of Pentacles", img: "https://th.bing.com/th/id/OIP.Vz0X3f3IdQeBl3cSIYJjPgHaMM?rs=1&pid=ImgDetMain", description: "Aile, uzun vadeli zenginlik." },
{ name: "Page of Pentacles", img: "https://th.bing.com/th/id/R.dceea3c8bfa7167534f9e8f14ac3841c?rik=HXZRql6v4LCRPw&riu=http%3a%2f%2fwww.tarot-card.net%2ftarot-cards%2fimages%2fpageofpents.jpg&ehk=I%2bJ1Bx0%2fLKDb54hOsM%2bfevP1uK6DXb6RqOD%2fo0a0mbY%3d&risl=&pid=ImgRaw&r=0", description: "Öğrenme, fırsatlar." },
{ name: "Knight of Pentacles", img: "https://calmingcosmos.com/wp-content/uploads/2020/07/20200717_190304.jpg", description: "Kararlılık, sorumluluk." },
{ name: "Queen of Pentacles", img: "https://th.bing.com/th/id/R.d818e7f559481a969b235346761defbf?rik=OoIft1V%2bPZU28g&riu=http%3a%2f%2f1.bp.blogspot.com%2f_Dr3q8HgL6JU%2fTScN3V_sH2I%2fAAAAAAAAAPA%2fFhtyzB3YyEU%2fs1600%2fqueen%2bof%2bpentacles.jpg&ehk=Sy95ykRaqdpkrmFHBH%2ft7mohSG3s8%2fzQQhRYiUaJixY%3d&risl=&pid=ImgRaw&r=0", description: "Ev, doğa, güven." },
{ name: "King of Pentacles", img: "https://th.bing.com/th/id/OIP.ZHuUGRa8-CwqL98UDE7yVwHaMM?rs=1&pid=ImgDetMain", description: "Başarı, zenginlik." }
];

export default function TarotApp() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]); // Seçilen kartları tutuyor
  const [showResult, setShowResult] = useState(false); // Sonuçları göstermek için
  const [shuffledCards, setShuffledCards] = useState(tarotCards); // Kartları rastgele sıralamak için

  // Kartları rastgele sıralamak için kullanacağımız fonksiyon
  const shuffleCards = (cards: typeof tarotCards) => {
    return cards.sort(() => Math.random() - 0.5); // Kartları rastgele sıralar
  };

  useEffect(() => {
    // Kartları başlangıçta rastgele sıraya koy
    setShuffledCards(shuffleCards([...tarotCards]));
  }, []);

  const handleCardSelect = (cardName: string) => {
    // Kart seçildiğinde seçilen kartları güncelle
    if (selectedCards.length < 3 && !selectedCards.includes(cardName)) {
      setSelectedCards((prevSelected) => [...prevSelected, cardName]);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  // Kart detaylarını almak için fonksiyon
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
      // Yeni kartlar ve yorumları kilic
      case "Ace of Swords":
        return "Yeni fikirler ve başlangıçlar için doğru zaman. Zihinsel olarak keskinleşebilir ve hayalindeki hedeflere ulaşabilirsin.";
      case "Two of Swords":
        return "Bir karar vermen gerekebilir. İki zıt yön arasında kalmışken, içsel sezgilerine güvenmek işini kolaylaştırabilir.";
      case "Three of Swords":
        return "Bir ayrılık veya kalp kırıklığı seni zorlayabilir. Ancak bu, sana önemli dersler sunacak bir süreç olabilir.";
      case "Four of Swords":
        return "Dinlenmeye ve iyileşmeye ihtiyacın var. Kendini yenilemek, ruhsal gücünü toparlamak için mükemmel bir zaman.";
      case "Five of Swords":
        return "Zafer kazanmış olabilirsin ama kayıplar da yaşandı. Bu deneyimi, daha dengeli bir şekilde değerlendir.";
      case "Six of Swords":
        return "Bir geçiş dönemi içindesin. Zihinsel huzura ve dinginliğe adım atabilir, daha sakin bir yolda ilerleyebilirsin.";
      case "Seven of Swords":
        return "Stratejik hareket etmen gerekebilir. Gizlilik ve planlı bir yaklaşım seni hedeflerine götürebilir.";
      case "Eight of Swords":
        return "Korkular ve sınırlamalar seni zorlayabilir. Ancak cesaretini toplayarak bu engelleri aşabilirsin.";
      case "Nine of Swords":
        return "Endişeler seni sarabilir. Gece karanlıkları seni korkutabilir, ama sabah ışığı her zaman gelir.";
      case "Ten of Swords":
        return "Bir şey sona eriyor, ama bu bir felaket değil. Yeni bir başlangıca yol açacak bir son.";
      case "Page of Swords":
        return "Yeniliklere açık olmalısın. Araştırma ve bilgi toplamak seni doğru yolda tutacak.";
      case "Knight of Swords":
        return "Hızlı hareket ve cesaret gerektiren bir durumdasın. Aksiyon alırken, stratejini unutmamalısın.";
      case "Queen of Swords":
        return "Bilinçli ve kararlı bir dönemde olabilirsin. Mantıklı düşünme ve net bir şekilde iletişim kurma zamanı.";
      case "King of Swords":
        return "Zeka ve liderlik özelliklerin ön plana çıkacak. Bu dönemde karar verme gücün oldukça güçlü olacak.";

         // Kupa
      case "Ace of Cups":
        return "Yeni duygusal başlangıçlar, kalp açma zamanı. Sevgiyi kabul etmeye hazır ol.";
      case "Two of Cups":
        return "Aşk ve birliktelik seni bekliyor. İki insan arasında güçlü bir bağ gelişiyor.";
      case "Three of Cups":
        return "Kutlama, arkadaşlık. Hayatındaki önemli insanlarla kutlamalar yapabilirsin.";
      case "Four of Cups":
        return "Duygusal memnuniyetsizlik. Yeni fırsatlara odaklanman gerekebilir.";
      case "Five of Cups":
        return "Kaybın acısını yaşıyorsun. Ancak unutma, yeni fırsatlar da seni bekliyor.";
      case "Six of Cups":
        return "Geçmişten gelen anılar. Eski zamanların getirdiği huzur ve nostalji seni sarabilir.";
      case "Seven of Cups":
        return "Hayal ve seçenekler. Karar vermekte zorlanabilirsin.";
      case "Eight of Cups":
        return "Yolculuk, terk etme. Yeni bir yola adım atabilirsin.";
      case "Nine of Cups":
        return "Mutluluk, memnuniyet. Duygusal tatmin seni bekliyor.";
      case "Ten of Cups":
        return "Aile ve mutluluk. Hayatındaki dengeyi bulduğunda, mutluluğun seni saracak.";
      case "Page of Cups":
        return "Yaratıcılık, hayal gücü. Duygusal olarak olgunlaşacak ve yeni fırsatlar keşfedeceksin.";
      case "Knight of Cups":
        return "Aşk ve duygusal bağlılık. Aşk peşinden gelecek ve seni büyüleyecek.";
      case "Queen of Cups":
        return "Empati ve anlayış. Duygusal zekanı kullanarak insanlara yardımcı olabilirsin.";
      case "King of Cups":
        return "Duygusal denge ve olgunluk. Kendini iyi tanıyorsun ve başkalarına rehberlik edebilirsin.";

      // Değnekler
      case "Ace of Wands":
        return "Yeni bir başlangıç ve tutku dolu bir dönemdesin. Yaratıcı projelere adım atmak için mükemmel bir zaman.";
      case "Two of Wands":
        return "Karar vermek ve yeni fırsatları keşfetmek için doğru zaman. Hedeflerin ve vizyonun genişliyor.";
      case "Three of Wands":
        return "İlerleme ve başarı seni bekliyor. Yaptığın işler meyve vermeye başlıyor.";
      case "Four of Wands":
        return "Kutlama ve huzur dolu bir zaman. Başarılarınla keyifli bir anı kutlayabilirsin.";
      case "Five of Wands":
        return "Rekabet ve zorluklarla karşı karşıya kalabilirsin. Ancak bu, seni güçlendirecek bir deneyim olacak.";
      case "Six of Wands":
        return "Zafer ve tanınma seni bekliyor. Çabaların sonuçlarını alacak ve başkalarından takdir göreceksin.";
      case "Seven of Wands":
        return "Savunma ve kararlılık gerektiren bir dönemde olabilirsin. Her engeli aşacak güce sahipsin.";
      case "Eight of Wands":
        return "Hızlı hareket etmen gerekebilir. Durumun ilerlemesi beklenenden çok daha hızlı olabilir.";
      case "Nine of Wands":
        return "Direnç ve savunma zamanı. Zorlu bir süreçten geçiyor olsan da, azimle yoluna devam etmelisin.";
      case "Ten of Wands":
        return "Sorumluluklar seni zorluyor. Yüklerini hafifletmek için yardım almayı düşünebilirsin.";
      case "Page of Wands":
        return "Keşif ve yenilik zamanı. Heyecan verici bir yolculuğa çıkmaya hazır olabilirsin.";
      case "Knight of Wands":
        return "Cesaret ve aksiyon dolu bir dönemdesin. Hedeflerine ulaşmak için hızlı hareket edebilirsin.";
      case "Queen of Wands":
        return "Yaratıcılığını ve güvenini kullanarak, etrafındaki insanlara ilham verebilirsin.";
      case "King of Wands":
        return "Liderlik ve tutku ön plana çıkıyor. Kararlı bir şekilde hedeflerine yönelerek başarıya ulaşabilirsin.";
 case "Ace of Pentacles":
        return "Maddi kazanç ve yeni başlangıç fırsatları seni bekliyor. Bu fırsatı değerlendirmelisin.";
      case "Two of Pentacles":
        return "İş ve maddi sorumluluklar arasında denge kurman gerekiyor. İyi bir zamanlama gerekecek.";
      case "Three of Pentacles":
        return "Ekip çalışması ve işbirliği sana başarı getirecek. Başkalarıyla uyum içinde çalışabilirsin.";
      case "Four of Pentacles":
        return "Maddi güvenlik ve sabırlı birikimler yapman gerekiyor. Dikkatli ve temkinli bir yaklaşım işine yarayacaktır.";
      case "Five of Pentacles":
        return "Maddi kayıplar yaşanabilir. Duygusal ve finansal desteğe ihtiyacın olabilir.";
      case "Six of Pentacles":
        return "Paylaşım ve denge zamanı. Hem alacak hem de verecek durumu seni dengeye getirecek.";
      case "Seven of Pentacles":
        return "Yaptığın yatırımların karşılığını almak için sabırlı olman gerekiyor. Sonuçlar zamanla gelecektir.";
      case "Eight of Pentacles":
        return "Çalışmaların meyvesini verecek. Sabır ve özveriyle emeklerini artırabilirsin.";
      case "Nine of Pentacles":
        return "Maddi bağımsızlık ve konforlu bir yaşam seni bekliyor. Çalışmalarının karşılığını alacaksın.";
      case "Ten of Pentacles":
        return "Aile ve mirasla ilgili mutluluk, uzun vadeli başarılar seni bekliyor. Kalıcı değerler oluşturma zamanı.";
      case "Page of Pentacles":
        return "Yeni maddi fırsatlar ve öğrenme süreci seni bekliyor. Yatırımların ve finansal kararların üzerinde düşünmelisin.";
      case "Knight of Pentacles":
        return "Çalışkanlık ve güven üzerine kurulu bir döneme giriyorsun. Sabırlı ve kararlı olman gereken bir dönemdesin.";
      case "Queen of Pentacles":
        return "Maddi güvenlik ve ailevi huzur arasındaki dengeyi bulabilirsin. Hem kendine hem başkalarına bakabilirsin.";
      case "King of Pentacles":
        return "Finansal güvenlik ve liderlik zamanı. Maddi açıdan güçlü bir pozisyona gelebilirsin.";

        //tilsim
        case "Ace of Pentacles":
          return "Maddi kazanç ve yeni başlangıç fırsatları seni bekliyor. Bu fırsatı değerlendirmelisin.";
        case "Two of Pentacles":
          return "İş ve maddi sorumluluklar arasında denge kurman gerekiyor. İyi bir zamanlama gerekecek.";
        case "Three of Pentacles":
          return "Ekip çalışması ve işbirliği sana başarı getirecek. Başkalarıyla uyum içinde çalışabilirsin.";
        case "Four of Pentacles":
          return "Maddi güvenlik ve sabırlı birikimler yapman gerekiyor. Dikkatli ve temkinli bir yaklaşım işine yarayacaktır.";
        case "Five of Pentacles":
          return "Maddi kayıplar yaşanabilir. Duygusal ve finansal desteğe ihtiyacın olabilir.";
        case "Six of Pentacles":
          return "Paylaşım ve denge zamanı. Hem alacak hem de verecek durumu seni dengeye getirecek.";
        case "Seven of Pentacles":
          return "Yaptığın yatırımların karşılığını almak için sabırlı olman gerekiyor. Sonuçlar zamanla gelecektir.";
        case "Eight of Pentacles":
          return "Çalışmaların meyvesini verecek. Sabır ve özveriyle emeklerini artırabilirsin.";
        case "Nine of Pentacles":
          return "Maddi bağımsızlık ve konforlu bir yaşam seni bekliyor. Çalışmalarının karşılığını alacaksın.";
        case "Ten of Pentacles":
          return "Aile ve mirasla ilgili mutluluk, uzun vadeli başarılar seni bekliyor. Kalıcı değerler oluşturma zamanı.";
        case "Page of Pentacles":
          return "Yeni maddi fırsatlar ve öğrenme süreci seni bekliyor. Yatırımların ve finansal kararların üzerinde düşünmelisin.";
        case "Knight of Pentacles":
          return "Çalışkanlık ve güven üzerine kurulu bir döneme giriyorsun. Sabırlı ve kararlı olman gereken bir dönemdesin.";
        case "Queen of Pentacles":
          return "Maddi güvenlik ve ailevi huzur arasındaki dengeyi bulabilirsin. Hem kendine hem başkalarına bakabilirsin.";
        case "King of Pentacles":
          return "Finansal güvenlik ve liderlik zamanı. Maddi açıdan güçlü bir pozisyona gelebilirsin.";
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
        <h2 className="text-xl mb-4">Kartlarınızı Seçin 🔮</h2>
        <div className="grid grid-cols-10 gap-3 mb-8">
          {shuffledCards.map((card) => (
            <div
              key={card.name}
              className={`cursor-pointer p-1 rounded-lg border-2 ${
                selectedCards.includes(card.name) ? "border-green-500" : "border-gray-700"
              }`}
              onClick={() => handleCardSelect(card.name)}
              style={{
                backgroundImage: `url('https://i.etsystatic.com/38886743/r/il/0674fa/4539607518/il_fullxfull.4539607518_fhmu.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "140px",
                width: "90px",
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