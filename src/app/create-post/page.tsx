import Link from "next/link"
import { ChevronLeft, Film, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="ml-4 text-xl font-bold">Criar Post</h1>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto max-w-2xl">
        <div className="p-6 bg-white rounded-lg shadow">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="movie-search">Buscar filme</Label>
                <div className="relative">
                  <Input id="movie-search" placeholder="Digite o nome do filme..." />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <Film className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Filme selecionado</Label>
                <div className="flex items-start p-3 border rounded-lg">
                  <div className="w-16 h-24 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Duna: Parte 2</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">2024 • Ficção científica • Denis Villeneuve</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rating">Avaliação</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma avaliação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 estrela</SelectItem>
                    <SelectItem value="2">2 estrelas</SelectItem>
                    <SelectItem value="3">3 estrelas</SelectItem>
                    <SelectItem value="4">4 estrelas</SelectItem>
                    <SelectItem value="5">5 estrelas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Sua opinião sobre o filme</Label>
                <Textarea id="content" placeholder="Compartilhe seus pensamentos sobre o filme..." rows={6} />
              </div>

              <div className="grid gap-2">
                <Label>Adicionar imagem (opcional)</Label>
                <div className="border border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Arraste uma imagem ou clique para fazer upload</p>
                    <Button variant="outline" size="sm">
                      Escolher arquivo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" asChild>
                <Link href="/">Cancelar</Link>
              </Button>
              <Button className="bg-rose-500 hover:bg-rose-600 cursor-pointer">Publicar</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
