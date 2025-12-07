import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import Navbar from "../services/components/navbar";
import Footer from "../services/components/footer";
import { Provider } from "jotai";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "املاک - خانه ایده‌آل شما منتظر است",
  description:
    "خانه ایده‌آل خود را با خدمات املاک ما پیدا کنید. از مجموعه منتخب املاک ما دیدن کنید.",
  other: {
    "font-preconnect": "https://cdn.jsdelivr.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="fa" 
      dir="rtl" 
      style={{ fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif' }}
    >
      <body 
        className="font-vazir antialiased"
        style={{ fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif' }}
      >
        <Provider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Default options
              className: "",
              duration: 4000,
              style: {
                background: "#fff",
                color: "#363636",
                fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
                direction: "rtl",
                textAlign: "right",
              },
              // Success options
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              // Error options
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
                style: {
                  background: "#fee2e2",
                  color: "#991b1b",
                },
              },
            }}
          />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
