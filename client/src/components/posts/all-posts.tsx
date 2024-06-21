import React from 'react';
import PostComponent from './post';
import { ItemInterface } from '@/types';
import PaginationControl from './pagination-control';

export default async function Post({
	type,
	page,
}: {
	type: string;
	page: number;
}) {
	const URL = 'https://hacker-news.firebaseio.com/v0';

	let posts: ItemInterface[] = [];

	let response;

	response = await fetch(`${URL}/${type}.json`, {
		cache: 'no-store',
	});

	let totalStories = 0;

	if (response.ok) {
		const stories = await response.json();

		totalStories = stories.length;

		const startIndex = (page - 1) * 15;
		const endIndex = startIndex + 15;

		const paginatedStories = stories.slice(startIndex, endIndex);

		const detailedStories = await Promise.all(
			paginatedStories.map(async (storyId: number) => {
				const storyResponse = await fetch(`${URL}/item/${storyId}.json`, {
					cache: 'no-store',
				});

				if (storyResponse.ok) {
					return await storyResponse.json();
				} else {
					console.error(
						'Failed to fetch story details:',
						storyResponse.status,
						storyResponse.statusText
					);
					return null;
				}
			})
		);

		posts = detailedStories.filter((story) => story !== null);
	} else {
		console.error(
			'Failed to fetch top stories:',
			response.status,
			response.statusText
		);
	}

	return (
		<div className="mt-6">
			{posts.map((post: ItemInterface) => {
				return (
					<PostComponent
						key={post?.id}
						id={post?.id}
						score={post?.score}
						title={post?.title}
						url={post?.url}
						by={post?.by}
						descendants={post?.descendants}
					/>
				);
			})}
			<div className="mt-10">
				<PaginationControl
					type={type}
					currentPage={page}
					total={totalStories}
				/>
			</div>
		</div>
	);
}
