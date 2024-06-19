'use server';

import { cookies } from 'next/headers';
import { getMe } from '@/app/api';

export async function getToken() {
	const token = cookies().get('Token') ? cookies()?.get('Token')?.value : null;
	return token;
}

export async function getUserId() {
	const token = cookies()?.get('Token')?.value as string;
	const response = await getMe(token);
	const userId = response.data.data.id;
	return userId;
}

export async function getUsername() {
	const token = cookies()?.get('Token')?.value as string;
	const response = await getMe(token);
	const name = response.data.data.username;
	return name;
}
