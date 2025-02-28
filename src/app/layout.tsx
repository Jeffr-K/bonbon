// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/shared/components/header/header.component";
import Footer from "@/shared/components/footer/footer.component";
import BottomNavigator from "@/shared/components/bottom/bottom.component";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          
          {/* 모바일 내비게이션 바 */}
          <BottomNavigator />
          
          {/* 모바일에서 푸터 아래 내비게이션 바 공간 확보 */}
          <div className="h-16 md:h-0 block md:hidden"></div>
        </div>
      </body>
    </html>
  );
}