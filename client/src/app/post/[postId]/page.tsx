import React from 'react';
import ServerHeader from '@/components/headers/serverHeader';
import SinglePost from '@/components/posts/single-post';

interface PostShowPageProps {
	params: {
		postId: string;
	};
}

export default async function PostShowPage({ params }: PostShowPageProps) {
	const { postId } = params;

	return (
		<div className="flex flex-col">
			<ServerHeader />
			<SinglePost postId={postId} />
		</div>
	);
}
