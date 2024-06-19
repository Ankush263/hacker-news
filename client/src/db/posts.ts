import { cache } from 'react';
import { getAllPostsDesc, getPostById, getTypePosts } from '@/app/api';
import { AxiosResponse } from 'axios';

export type PostType = {
	id: number;
	by: string;
	title: string;
	url: string;
	score: number;
	descendants: number;
	text: string;
	userId?: number;
};

export const fetchAllPostsDesc = cache((): Promise<AxiosResponse> => {
	const posts = getAllPostsDesc();
	return posts;
});

export const fetchAllNewPosts = cache((): Promise<AxiosResponse> => {
	const posts = getAllPostsDesc();
	return posts;
});

export const fetchAllTypePosts = cache(
	(type: string): Promise<AxiosResponse> => {
		const posts = getTypePosts(type);
		return posts;
	}
);

export const fetchPostById = cache(
	(postId: string, token: string): Promise<AxiosResponse> => {
		return getPostById(postId, token);
	}
);
