import { ApolloWrapper } from '@/lib/apollo-client';
import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import { Grommet } from 'grommet';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <ApolloWrapper>
            <Grommet>{children}</Grommet>
          </ApolloWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
