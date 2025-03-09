/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, errors } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Login tem de ter ao menos 2 caracteres.',
		}),
	password: z.string()
		.min(2, {
			message: 'Campo senha não pode ser vazio.',
		}),
});

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	async function onSubmit({ username, password }: z.infer<typeof formSchema>) {
		const response = await signIn('credentials', { username, password, redirect: false });
		if (response && response.error) toast.error(errors(response.error));
		if (response && response.ok) {
			toast.success('Login efetuado com sucesso.');
			router.push('/');
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className='dark:bg-muted bg-background'>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Entre com as suas credenciais
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="flex flex-col gap-2">
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Usuário</FormLabel>
												<FormControl>
													<Input
														{...field}
														className='dark:bg-background bg-muted'
													/>
												</FormControl>
												<FormDescription />
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Senha</FormLabel>
												<FormControl>
													<Input
														{...field}
														type='password'
														className='dark:bg-background bg-muted'
													/>
												</FormControl>
												<FormDescription />
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="submit" className="w-full">
									Entrar
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
