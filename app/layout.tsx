import "./globals.css";
import "./motion.css";
import "./refined.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
