import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import { GlobalContextProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'PropertyPal | Find the Perfect Rental',
  description: 'Discover the perfect rental with PropertyPal, your go-to platform for finding ideal properties.',
  keywords: 'rental, property, housing, accommodation, real estate',
}

const MainLayout = ({ children }) => {
  return (
    <GlobalContextProvider>
      <AuthProvider>
          <html lang="en">
              <head>
                  <title>PropertyPal | Find the Perfect Rental</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
              </head>
              <body>
                  <Navbar />
                  <main>{children}</main>
                  <Footer />
                  <ToastContainer />
              </body>
          </html>
          </AuthProvider>
      </GlobalContextProvider>
  );
};

export default MainLayout;