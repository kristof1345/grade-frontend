import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Github Rater",
  description:
    "Rates your github repo based on the number of stars, forks, ...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
