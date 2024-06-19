'use server';

import { redirect } from 'next/navigation';
import { createPost } from '@/app/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function postSubmitMethod(
	title: string,
	url: string,
	text: string
) {
	const token = cookies()?.get('Token')?.value;
	try {
		await createPost(
			{
				title,
				url,
				text,
			},
			token as string
		);
	} catch (error: any) {
		return {
			success: false,
			error: {
				message: error?.response?.data?.message,
			},
		};
	}

	revalidatePath('/');
	redirect('/');
}