'use client';

import { UploadIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
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
import api from '@/api/api';
import { useParams } from 'next/navigation';

export default function CreatePost({ ...props }: DialogProps) {
	const [title, setTitle] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [rating, setRating] = useState<number>(0);
	const [review, setReview] = useState<string>('');
	const { id: movieId } = useParams<{ id: string }>();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!movieId) return;

		const formData = new FormData(e.currentTarget);
		formData.append('descricao', review);
		formData.append('avaliacao', rating.toString());
		formData.append('curtidas', '0'); // valor inicial, ajuste se necessário
		formData.append('user_id', 'e7ce4deb-b347-4131-b537-c2a6edbc5f85'); // substitua pelo valor real
		formData.append('filme_id', movieId);
		
		try {
			const response = await api.post('/posts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status !== 201) {
				throw new Error('Erro ao enviar post');
			}

			alert('Avaliação publicada com sucesso!');
			props.onOpenChange?.(false);
		} catch (error) {
			console.error(error);
			alert('Erro ao publicar avaliação');
		}
	};

	return (
		<Dialog {...props}>
			<DialogTrigger asChild>
				<Button>Escrever avaliação</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova avaliação</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-6">
					<div className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="title">Título da avaliação</Label>
							<Input
								id="title"
								name="titulo"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="content">Descreva sua opinião</Label>
							<TextEditor
								name="descricao"
								onChange={(value) => setReview(value)}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Adicionar imagem (opcional)</Label>
							<div className="h-[200px] my-4 relative border border-dashed rounded-md">
								<Input
									type="file"
									accept="image/*"
									name="image"
									className="relative z-10 cursor-pointer h-full opacity-0"
									onChange={(e) => setFile(e.target.files?.[0] || null)}
								/>
								<div className="flex flex-col items-center text-center gap-2 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none p-2">
									<UploadIcon className="w-8 h-8 opacity-50 mb-4" />
									<p className="text-sm">
										{file ? `Selecionado: ${file.name}` : 'Importar imagem'}
									</p>
									<span className="text-sm">
										{file
											? `Confirme se o arquivo está correto e clique em publicar.`
											: 'Arraste ou clique aqui para importar uma imagem. O arquivo deve ter no máximo 5MB'}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-2 place-self-center">
						<Label htmlFor="rating">Qual sua nota para o filme?</Label>
						<Rating
							value={rating}
							onChange={(value) => setRating(value)}
							size="lg"
						/>
					</div>

					<div className="flex justify-end space-x-2">
						<DialogClose asChild>
							<Button
								type="button"
								variant="outline"
								onClick={() => props.onOpenChange?.(false)}
							>
								Cancelar
							</Button>
						</DialogClose>
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
