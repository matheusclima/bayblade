'use client';
import { UploadIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { DialogProps } from '@radix-ui/react-dialog';
import TextEditor from './ui/text-editor';
import { useState } from 'react';
import { Rating } from './ui/rating';

export default function CreatePost({ ...props }: DialogProps) {
	const [file, setFile] = useState<File | null>(null);
	const [rating, setRating] = useState<number>(0);
	const [review, setReview] = useState<string>('');

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	return (
		<Dialog {...props}>
			<DialogTrigger asChild>
				<Button>Escrever avaliação</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova avaliação</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-6">
					<div className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="title">Título da avaliação</Label>
							<Input id="title" />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="content">Descreva sua opinião</Label>
							<TextEditor onChange={(value) => setReview(value)}/>
						</div>

						<div className="grid gap-2">
							<Label>Adicionar imagem (opcional)</Label>
							<div className="h-[200px] my-4 relative border border-dashed rounded-md">
								<Input
									type="file"
									accept=".xlsx"
									name="file"
									className=" relative z-10 cursor-pointer h-full opacity-0"
									// onChange={handleFileChange}
									multiple={false}
									required
								/>
								<div className="flex flex-col items-center text-center gap-2 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none p-2">
									<UploadIcon className="w-8 h-8 opacity-50 mb-4" />
									<p className='text-sm'>{file ? `Importar ${file?.name}` : 'Importar imagem'}</p>
									<span className='text-sm'>
										{file
											? `Confirme se o arquivo está correto e clique em importar.`
											: 'Arraste ou clique aqui para importar uma imagem. O arquivo deve ter no máximo 5MB'}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-2 place-self-center">
						<Label htmlFor="rating">Qual sua nota para o filme?</Label>
						<Rating value={rating} onChange={(value) => setRating(value)} size='lg' />
					</div>

					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => props.onOpenChange?.(false)}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="bg-rose-500 hover:bg-rose-600 cursor-pointer"
						>
							Publicar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
