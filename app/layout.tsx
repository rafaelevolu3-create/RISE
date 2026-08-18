import type { Metadata } from "next";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const sideName = process.env.NEXT_PUBLIC_SIDE_NAME || "RISE";

export const metadata: Metadata = {
  title: `${sideName} Stats`,
  description: `Estatisticas da side ${sideName} - ranking de CP, players e distribuicao de epics.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-body antialiased">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <NavBar />
          <main className="flex-1 pb-16 pt-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
