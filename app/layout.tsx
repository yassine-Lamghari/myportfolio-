import "./globals.css";
import "./motion.css";
import "./refined.css";
import "./ilyass.css";
import "./readability.css";
import "./responsive-fix.css";
import "./type-scale.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
