import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boop Org — Digital Marketing Discovery Form',
  description: 'Fill out this short form so our team can understand your business and recommend the best digital marketing strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
