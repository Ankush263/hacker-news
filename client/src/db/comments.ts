import { cache } from 'react';
import { getCommentsByPostId } from '@/app/api';
import { AxiosResponse } from 'axios';

export type CommentType = {
	id: number;
	createdAt: string;
	by: string;
	content: string;
	score: number;
	postId: number;
	commentId: number;
	parentId: number;
	children: CommentType[];
};

export const fetchCommentsByPostId = cache(
	(postId: string, token: string): Promise<AxiosResponse> => {
		return getCommentsByPostId(postId, token);
	}
);
