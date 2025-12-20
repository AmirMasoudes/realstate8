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
            gutter={12}
            containerClassName="!top-20"
            containerStyle={{
              top: "80px", // More distance from top
            }}
            toastOptions={{
              // Default options
              className: "!rounded-xl !shadow-xl",
              duration: 4000,
              style: {
                background: "#fff",
                color: "#363636",
                fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
                direction: "rtl",
                textAlign: "right",
                borderRadius: "12px",
                padding: "16px 20px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              },
              // Success options - Beautiful gradient
              success: {
                duration: 3000,
                style: {
                  background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                  color: "#065f46",
                  border: "2px solid #6ee7b7",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
                  fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
                  direction: "rtl",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "600",
                },
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              // Error options - Beautiful gradient
              error: {
                duration: 5000,
                style: {
                  background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                  color: "#991b1b",
                  border: "2px solid #fca5a5",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
                  fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
                  direction: "rtl",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "600",
                },
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
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
