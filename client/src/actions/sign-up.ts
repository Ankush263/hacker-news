'use server';

import { AxiosResponse } from 'axios';
import { signup } from '../app/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signupMethod(
	username: string,
	email: string,
	password: string
) {
	let user: AxiosResponse;

	try {
		user = await signup({
			username,
			email,
			password,
		});

		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		cookies().set('Token', user?.data?.token as string, {
			httpOnly: true,
			secure: true,
			expires: expiresAt,
			sameSite: 'lax',
			path: '/',
		});
	} catch (error: any) {
		return {
			success: false,
			error: {
				message: error?.response?.data?.message,
			},
		};
	}

	redirect('/');
}
