import "./globals.css";

export const metadata = {
  title: "Innersolv.",
  description:
    "Innovating minds and brands for global relevance and positive impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
