import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Estatuas Vivas - San Lorenzo',
    description: 'Descubrí la historia viva de San Lorenzo. Escaneá el QR de cada estatua y conocé su legado.',
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="es">
      <body>{children}</body>
    </html>);
}
