import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import 'leaflet/dist/leaflet.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}