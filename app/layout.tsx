export const dynamic = "force-dynamic";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Nunito } from 'next/font/google';
import { ClientOnly } from "@/components/ClientOnly";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { RentModal } from "@/components/modals/RentModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { AppProvider } from "./AppProvider";
// import { Provider } from "react-redux";
// import store from "@/lib/store";

export const metadata = {
  title: "Airbnb clone website",
  description: "Airbnb app for vacation rentals",
  icons: "https://www.seekpng.com/png/full/957-9571167_airbnb-png.png"
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body suppressHydrationWarning className={font.className}>
        <ClientOnly>
          <AppProvider>
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <Navbar currentUser={currentUser}/>
            <div className="pb-20 pt-28">{children}</div>
            <Footer />
          </AppProvider>
        </ClientOnly>
      </body>
    </html>

  );
}
