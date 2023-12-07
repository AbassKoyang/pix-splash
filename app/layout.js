import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/redux/Providers';
import Provider from '@/components/Provider';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';


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
        <ScrollToTop />
        <Footer />
        </Provider>
        <Toaster/>
        </body>
    </html>
    </Providers>
  )
}
