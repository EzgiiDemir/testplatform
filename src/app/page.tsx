import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full">
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

      {/* Main content */}
      <div className="relative flex w-full sm:w-3/4 lg:w-2/3 mx-auto">
        <main className="flex flex-col gap-8 w-full">
          {/* First Content: Sevgiline Web Sitesi Yap */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/001/864/734/non_2x/the-lovers-on-the-beach-free-photo.jpg"
              alt="Sevgiline Web Sitesi Yap"
              width={600}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Sevgiline Web Sitesi Yap</h2>
              <p className="text-gray-700 mt-2">
                Sevgilinize özel, onunla ilgili fotoğraflar, anılar ve kişisel dokunuşlar içeren bir web sitesi yaparak onu şaşırtın!
              </p>
              <a href="lovers" className="text-blue-500 hover:underline mt-4 block">
                Nasıl Yapılır?
              </a>
            </div>
          </div>

          {/* Second Content: Hangi Alanda İyisin? */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Hangi Alanda İyisin?"
              width={600}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Hangi Alanda İyisin? Hangi Kariyer Senin İçin Daha Uygun?</h2>
              <p className="text-gray-700 mt-2">
                Kariyer yolculuğunuzda hangi alanlarda başarılı olduğunuzu öğrenmek ve sizin için en uygun kariyer yolunu keşfetmek ister misiniz?
              </p>
              <a href="carriers" className="text-blue-500 hover:underline mt-4 block">
                Kariyer Testini Keşfet
              </a>
            </div>
          </div>

          {/* Third Content: Ortak Filminizi Bulun */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="https://th.bing.com/th/id/R.212a4b92380aa6aa7d2ad39d49138fd8?rik=qTP%2bQyy%2fMOrhCw&riu=http%3a%2f%2fww1.prweb.com%2fprfiles%2f2014%2f01%2f19%2f11503155%2fmovie-night_t_nv.jpg&ehk=fOPGxRC2EK2b5%2bQQ1lIGmqDbxgdtwV1odlRXYDmo3Hs%3d&risl=&pid=ImgRaw&r=0"
              alt="Ortak Film Bulun"
              width={600}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Film Zevkinizi Birleştirin ve Ortak Filminizi Bulun</h2>
              <p className="text-gray-700 mt-2">
                Sizin ve partnerinizin film zevklerini bir araya getirip, ortak bir film bulma konusunda zorlanıyorsanız, doğru yerdesiniz!
              </p>
              <a href="movies" className="text-blue-500 hover:underline mt-4 block">
                Ortak Filminizi Keşfedin
              </a>
            </div>
          </div>

          {/* Fourth Content: Tarot */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="https://spiritual-medium-caroline.com/wp-content/uploads/2023/03/81jRz3roesL._AC_UF8941000_QL80_.jpg"
              alt="Tarot Falı"
              width={600}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Geçmiş, Şimdi ve Gelecek: Tarot Yolculuğunuz Başlasın</h2>
              <p className="text-gray-700 mt-2">
                Tarot kartları, geçmişiniz, şimdiki durumunuz ve geleceğiniz hakkında rehberlik eder. Geçmiş kartınız size etkenleri, şimdi kartınız mevcut durumu ve gelecek kartınız ise potansiyel yolunuzu gösterecek.
              </p>
              <a href="tarot" className="text-blue-500 hover:underline mt-4 block">
                Şimdi Kartlarınızı Keşfedin!
              </a>
            </div>
          </div>
        </main>

        {/* Right section: Fixed Advertisement */}
        <aside className="hidden lg:block w-1/4 sticky top-8 ml-8">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Reklam Alanı</h3>
            <div className="bg-gray-300 h-64 flex items-center justify-center">
              <span className="text-gray-600">Reklam İçeriği</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer içeriği buraya */}
      </footer>
    </div>
  );
}
