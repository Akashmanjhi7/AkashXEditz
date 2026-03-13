import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Akash Manjhi | Suspense Engineer',
  description: 'Specializing in high-retention video editing for micro-dramas, thrillers, and psychological trailers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}