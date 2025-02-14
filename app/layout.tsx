import { AuthProvider } from '@/contexts/AuthContext'; // Your AuthContext provider
import Layout from '@/components/Layout'; // Layout component
// import { ThemeProvider } from '@mui/material/styles'; // Material UI theme provider
// import theme from '@/styles/theme'; // Your Material UI theme
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata for your app
export const metadata = {
  title: "My Interview Management App",
  description: "Manage and track your interviews seamlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add more meta tags or links here if needed */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap everything in ThemeProvider, AuthProvider, and Layout */}
        <AuthProvider>
          {/* <ThemeProvider theme={theme}> */}
            <Layout>
              {children}
            </Layout>
          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
