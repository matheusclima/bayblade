import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex items-center justify-center flex-1 p-6 bg-white md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-rose-600">NextFilm</h1>
            <p className="text-gray-500">Sua rede social para amantes de cinema</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="seu@email.com" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/recuperar-senha" className="text-sm text-rose-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Lembrar de mim
              </Label>
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Entrar</Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-rose-600 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden flex-1 md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-rose-700/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
          <h2 className="mb-6 text-3xl font-bold text-center">Compartilhe sua paixão por filmes</h2>
          <ul className="space-y-4 text-center">
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🎬</span> Descubra novos filmes
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">💬</span> Compartilhe suas opiniões
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">👥</span> Conecte-se com outros cinéfilos
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
