'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { ChakraProvider, Box, Portal, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import theme from '@/theme/theme';
import routes from '@/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import AppWrappers from './AppWrappers';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
//import Login from '@/components/login/login';

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  const { onOpen } = useDisclosure();

  useEffect(() => {
    setIsClient(true); // Ensure this is client-rendered
  }, []);

  // useEffect(() => {
  //   if (isClient) {
  //     const username = localStorage.getItem('username');
  //     const password = localStorage.getItem('password');

  //     if ((!username || !password) && router.asPath !== '/login') {
  //       router.push('/login');
  //     }
  //   }
  // }, [isClient, router]);

  // if (!isClient) {
  //   return null; // Ensure no SSR issues
  // }

  // if (router.asPath === '/login') {
  //   return (
  //     <html lang="en">
  //       <body id="root">
  //         <Login />
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <html lang="en">
      <body id="root">
        <ChakraProvider theme={theme}>
          <AppWrappers>
            <Box>
              <Sidebar routes={routes} />
              <Box
                float="right"
                minHeight="50vh"
                height="100%"
                position="relative"
                maxHeight="100%"
                w={{ base: '100%', xl: 'calc(100% - 290px)' }}
                maxWidth={{ base: '100%', xl: 'calc(100% - 290px)' }}
              >
                <Portal>
                  <Navbar
                    onOpen={onOpen}
                    logoText="ChatBot-Rag"
                    brandText={getActiveRoute(routes, router.asPath)}
                    secondary={getActiveNavbar(routes, router.asPath)}
                  />
                </Portal>
                <Box mx="auto" pe="20px" minH="70vh">
                  {children}
                </Box>
                <Footer />
              </Box>
            </Box>
          </AppWrappers>
        </ChakraProvider>
      </body>
    </html>
  );
}
