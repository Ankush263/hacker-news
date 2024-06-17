'use server';

import { AxiosResponse } from 'axios';
import { z } from 'zod';
import { signup } from '../api';
import { redirect } from 'next/navigation';

interface SignUpFormState {
	errors?: {
		username?: string[];
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	success?: boolean;
	data?: string;
}

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

export async function signupMethod(
	formState: SignUpFormState,
	formData: FormData
): Promise<SignUpFormState> {
	console.log('validatedFields');

	const validatedFields = SignupSchema.safeParse({
		username: formData.get('username'),
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		console.log('error: ', validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	let user: AxiosResponse;

	try {
		await signup({
			username: validatedFields.data.username,
			email: validatedFields.data.email,
			password: validatedFields.data.password,
		});
	} catch (error: any) {
		return {
			success: false,
			errors: {
				_form: error?.response?.data?.message,
			},
		};
	}

	redirect('/');
}
