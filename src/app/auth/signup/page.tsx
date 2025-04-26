import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function CadastroPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex items-center justify-center flex-1 p-6 bg-background border py-10 px-4 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-rose-600">NextFilm</h1>
            <p className="text-gray-500">Crie sua conta e comece a compartilhar</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Nome</Label>
                <Input id="first-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Sobrenome</Label>
                <Input id="last-name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input id="username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                Eu concordo com os{" "}
                <Link href="/termos" className="text-rose-600 hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-rose-600 hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Criar conta</Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-rose-600 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden flex-1 md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-rose-700/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
          <h2 className="mb-6 text-3xl font-bold text-center">Junte-se à comunidade de cinéfilos</h2>
          <ul className="space-y-4 text-center">
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🎥</span> Crie seu perfil personalizado
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🌟</span> Avalie e resenhe seus filmes favoritos
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🔍</span> Descubra recomendações personalizadas
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}