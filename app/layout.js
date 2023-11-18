import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/redux/Providers';
import Provider from '@/components/Provider';
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PixSplash',
  description: 'The best free stock photos, royalty free images from Unsplash!',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Provider>
        {children}
        </Provider>
        <Toaster/>
        </body>
    </html>
    </Providers>
  )
}
