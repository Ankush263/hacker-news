'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginMethod } from '@/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Login() {
	const [formStatus, setFormStatus] = useState('success');
	const [errMsg, setErrMsg] = useState('');
	const [pending, setPending] = useState(false);

	const LoginSchema = z.object({
		email: z.string().email({ message: 'Please enter the valid email' }).trim(),
		password: z
			.string()
			.min(6, { message: 'Password must be atleast 6 characters long' })
			.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
			.regex(/[0-9]/, { message: 'Contain at least one number.' })
			.trim(),
	});

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof LoginSchema>) {
		setPending(true);
		setFormStatus('success');
		const login = await loginMethod(values.email, values.password);
		setPending(false);

		if (login && !login?.success) {
			setPending(false);
			setFormStatus('error');
			setErrMsg(login?.error?.message);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[85%] mt-5 flex flex-col justify-center items-start space-y-8"
				>
					<span className="text-2xl font-semibold">Login</span>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>email: </FormLabel>
								<FormControl>
									<Input placeholder="Enter Email" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>password: </FormLabel>
								<FormControl>
									<Input placeholder="Enter Password" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
						Login
					</Button>

					{formStatus === 'error' ? (
						<Alert variant="destructive">
							<Terminal className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errMsg}</AlertDescription>
						</Alert>
					) : (
						''
					)}
				</form>
			</Form>
		</div>
	);
}

export default Login;
