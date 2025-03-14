import { AlertProvider } from "@/hooks/useAlert";
import { SessionProvider } from "@/hooks/useSession";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
  weight: "400",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Going 2 Tech",
  description: "Controle de Usuários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppinsFont.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AlertProvider>
          <SessionProvider>{children}</SessionProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
