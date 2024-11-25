import { Metadata } from 'next';

import '@/app/globals.css';
import Providers from '@/components/providers/JotaiProvider';
import ReactQueryProviders from '@/components/providers/ReactQueryProvider';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import Freesentation from './fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'white' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <>
      <html lang='ko' suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen w-full bg-background antialiased', Freesentation.className)}>
          <Providers>
            <ReactQueryProviders>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                <div className='relative flex min-h-screen flex-col'>
                  {modal}
                  <SiteHeader />
                  <div className='flex-1 bg-zinc-50 dark:bg-zinc-800'>{children}</div>
                  <Toaster />
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </ReactQueryProviders>
          </Providers>
        </body>
      </html>
    </>
  );
}
