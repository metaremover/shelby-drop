import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShelbyDrop — Cloud-Grade Hot Storage Protocol',
  description: 'Decentralized AirDrop and streaming protocol for multi-GB AI datasets and 4K media built on Shelby.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050508] text-white antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
