'use server';

import { increasePostScore } from '@/app/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function AddScoreMethod(postId: string) {
	const token = cookies()?.get('Token')?.value;
	try {
		increasePostScore(postId, token as string);
	} catch (error: any) {
		return {
			success: false,
			error: {
				message: error?.response?.data?.message,
			},
		};
	}

	revalidatePath('/');
}
