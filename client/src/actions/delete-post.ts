'use server';

import { deletePostById } from '@/app/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deletePostMethod(postId: string) {
	const token = cookies()?.get('Token')?.value;
	try {
		await deletePostById(postId, token as string);
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
