import './globals.css';
import { Inter } from 'next/font/google';
import Search from './components/Search';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CinePWeb',
  description: 'Projeto de PWeb com Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <nav className="p-4 bg-black border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:opacity-80 transition">
              CinePWeb
            </a>
            <div className="flex items-center gap-6">
              <Link 
                href="/wishlist" 
                className="flex items-center gap-2 text-gray-300 hover:text-red-500 font-bold transition-colors group"
              >
                <span className="group-hover:scale-110 transition-transform">❤️</span> 
                Minha Lista
              </Link>

              <Search />
            </div>

          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}