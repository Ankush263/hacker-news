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
import { signupMethod } from '@/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Signup() {
	const [formStatus, setFormStatus] = useState('success');
	const [errMsg, setErrMsg] = useState('');
	const [pending, setPending] = useState(false);

	const SignupSchema = z.object({
		username: z
			.string()
			.min(4, { message: 'username must be at least 4 characters long.' })
			.trim(),
		email: z.string().email({ message: 'Please enter the valid email' }).trim(),
		password: z
			.string()
			.min(6, { message: 'Password must be atleast 6 characters long' })
			.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
			.regex(/[0-9]/, { message: 'Contain at least one number.' })
			.trim(),
	});

	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof SignupSchema>) {
		setPending(true);
		setFormStatus('success');
		const signup = await signupMethod(
			values.username,
			values.email,
			values.password
		);
		setPending(false);

		if (signup && !signup?.success) {
			setPending(false);
			setFormStatus('error');
			setErrMsg(signup?.error?.message);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[85%] mt-5 flex flex-col justify-center items-start space-y-8"
				>
					<span className="text-2xl font-semibold">Signup</span>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>username: </FormLabel>
								<FormControl>
									<Input placeholder="Enter Username" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

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
						Signup
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

export default Signup;
