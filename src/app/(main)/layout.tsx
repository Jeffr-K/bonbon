import Header from "@/shared/components/header/header.component";
import Footer from "@/shared/components/footer/footer.component";
import BottomNavigator from "@/shared/components/bottom/bottom.component";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BottomNavigator />
      <div className="h-16 md:h-0 block md:hidden"></div>
    </div>
  );
} 