'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { ChakraProvider, Box, Portal, useDisclosure, Button } from '@chakra-ui/react';
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

export default function RootLayout({
  children,
  showProcessDocumentsButton = false, // Destructure the prop with a default value
}: {
  children: ReactNode;
  showProcessDocumentsButton?: boolean;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { onOpen } = useDisclosure();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

                  {/* Render the button only if the current route is /userhome */}
                  {showProcessDocumentsButton && (
                    <Button
                      onClick={() => router.push('/processdocuments')}
                      color="white"
                      bg="linear-gradient(90deg, #4A25E1, #7B5AFF)"
                      borderRadius="45px"
                      _hover={{
                        boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
                        bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                      }}
                      mt="200px"
                    >
                      Process Documents
                    </Button>
                  )}
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
