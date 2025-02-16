import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Nunito } from 'next/font/google'
import { ClientOnly } from "@/components/ClientOnly";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
// import { Provider } from "react-redux";
// import store from "@/lib/store";

export const metadata = {
  title: "Airbnb clone website",
  description: "Airbnb app for vacation rentals",
  icons: "https://www.seekpng.com/png/full/957-9571167_airbnb-png.png"
};

const font = Nunito({
  subsets: ["latin"],
})

// import dynamic from 'next/dynamic';

// // 使用 dynamic 导入 ClientOnly 组件，禁用 SSR
// const ClientOnly = dynamic(() => import('@/components/ClientOnly').then(mod => mod.ClientOnly), { 
//   ssr: false 
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <Navbar />
          <div className="pb-20 pt-28">{children}</div>
          <Footer />
        </ClientOnly>
      </body>
    </html>

  );
}
