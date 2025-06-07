import { User, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gradient">NextFilm</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href={"/"}>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  <span>Início</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <Search className="h-4 w-4" />
                <span>Descobrir</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
