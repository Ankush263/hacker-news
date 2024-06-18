'use server';

import { AxiosResponse } from 'axios';
import { login } from '../app/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginMethod(email: string, password: string) {
	let user: AxiosResponse;

	try {
		user = await login({
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
