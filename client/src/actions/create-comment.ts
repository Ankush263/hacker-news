'use server';

import { createComment } from '@/app/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createCommentMethod(
	content: string,
	postId: number,
	parentId: number | null
) {
	const token = cookies()?.get('Token')?.value;
	try {
		await createComment(
			{
				content,
				postId,
				parentId,
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
	revalidatePath(`/post/${postId}`);
}
