import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: {
    template: "%s | the wild oasis",
  },
  description: "reserve cabins",
};

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-50 min-h-screen flex flex-col ${josefin.className}`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="w-full mx-auto max-w-7xl">
            <NextTopLoader color="#2299DD" showSpinner={false} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
