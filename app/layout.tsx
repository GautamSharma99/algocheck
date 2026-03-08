import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ActiveLink } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const publicSans = Public_Sans({ subsets: ["latin"] });

const Logo = () => (
  <img
    src="/images/algoraudit-favicon.ico"
    alt="Algoraudit logo"
    className="h-8 w-8 flex-shrink-0 self-start"
  />
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Algoraudit — Algorand Smart Contract Auditor</title>
        <link rel="shortcut icon" href="/images/algoraudit-favicon.ico" />
        <meta
          name="description"
          content="Algoraudit: AI-powered auditing for Algorand smart contracts (TEAL/AVM)."
        />
        <meta property="og:title" content="Algoraudit — Algorand Smart Contract Auditor" />
        <meta
          property="og:description"
          content="Algoraudit: AI-powered auditing for Algorand smart contracts (TEAL/AVM)."
        />
        <meta property="og:image" content="/images/algoraudit-og.png?v=2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Algoraudit — Algorand Smart Contract Auditor" />
        <meta
          name="twitter:description"
          content="Algoraudit: AI-powered auditing for Algorand smart contracts (TEAL/AVM)."
        />
        <meta name="twitter:image" content="/images/algoraudit-og.png?v=2" />
      </head>
      <body className={publicSans.className}>
        <NuqsAdapter>
          <div className="bg-secondary grid grid-rows-[auto,1fr] h-[100dvh]">
            <div className="grid grid-cols-[1fr,auto] gap-2 p-4">
              <div className="flex gap-4 flex-col md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  <Logo />
                  <span className="text-sm font-semibold">Algoraudit</span>
                </div>
               
              </div>

              <div className="flex justify-center">
                <Button asChild variant="outline" size="default">
                  <a href="https://github.com/ejevichka/Algoraudit" target="_blank">
                    <GithubIcon className="size-3" />
                    <span>GitHub</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="bg-background mx-4 relative grid rounded-t-2xl border border-input border-b-0">
              <div className="absolute inset-0">{children}</div>
            </div>
          </div>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
