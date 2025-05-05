'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/api/api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';

const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export default function LoginPage() {
	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			senha: '',
		},
	});

	const loginHandler = async (values: z.infer<typeof loginSchema>) => {
    try {
			await api.post('/auth/signin', values);
			router.push('/');
		} catch (error) {
			console.error('Erro ao fazer login:', error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen md:flex-row">
			<div className="flex items-center justify-center flex-1 p-6 bg-gradient-to-br from-secodary/90 to-secondary/80 md:p-10">
				<div className="w-full max-w-md space-y-6 border rounded-md py-10 px-6">
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-bold text-rose-600">NextFilm</h1>
						<p className="text-foreground">
							Sua rede social para amantes de cinema
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(loginHandler)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													placeholder="seu@email.com"
													type="email"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="senha"
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor="password">Senha</FormLabel>
											<FormControl>
												<Input id="password" type="password" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-center justify-between space-x-2">
								<div className="flex items-center gap-2">
									<Checkbox id="remember" />
									<Label htmlFor="remember" className="text-sm">
										Lembrar de mim
									</Label>
								</div>
								<Link
									href="/recuperar-senha"
									className="text-sm text-rose-600 hover:underline"
								>
									Esqueceu a senha?
								</Link>
							</div>
							<Button className="w-full bg-rose-600 hover:bg-rose-700">
								Entrar
							</Button>
						</form>
					</Form>
					<div className="text-center">
						<p className="text-sm text-foreground">
							Não tem uma conta?{' '}
							<Link
								href="/cadastro"
								className="text-muted-foreground hover:underline"
							>
								Cadastre-se
							</Link>
						</p>
					</div>
				</div>
			</div>
			<div className="relative hidden flex-1 md:block">
				<div className="absolute inset-0 bg-gradient-to-bl from-rose-500/80 to-rose-700/90" />
				<div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
					<h2 className="mb-6 text-3xl font-bold text-center">
						Compartilhe sua paixão por filmes
					</h2>
					<ul className="space-y-4 text-center">
						<li className="flex items-center gap-2 text-lg">
							<span className="text-2xl">🎬</span> Descubra novos filmes
						</li>
						<li className="flex items-center gap-2 text-lg">
							<span className="text-2xl">💬</span> Compartilhe suas opiniões
						</li>
						<li className="flex items-center gap-2 text-lg">
							<span className="text-2xl">👥</span> Conecte-se com outros
							cinéfilos
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
