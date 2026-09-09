import "./globals.css";
import "./motion.css";
import "./refined.css";
import "./ilyass.css";
import "./readability.css";
import "./responsive-fix.css";
import "./type-scale.css";

import { ThemeProvider } from "./theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
