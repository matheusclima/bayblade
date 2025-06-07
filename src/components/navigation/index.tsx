import Link from "next/link";
import { Button } from "../ui/button";
import Menu from "./menu";

export default async function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="text-xl font-bold text-rose-600">
          NextFilm
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Início</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/explorar">Explorar</Link>
          </Button>
          <Menu />
        </div>
      </div>
    </header>
  );
}
