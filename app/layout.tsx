import type { Metadata } from "next";
import '../styles/globals.css';

export const metadata: Metadata = {
  title: "Did you see it too?",
  description: "Created by Poyraz Avsever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
