import './globals.css';
import { Inter } from 'next/font/google';

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
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              CinePWeb
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}