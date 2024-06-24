import React, { Suspense } from 'react';
import SinglePost from '@/components/posts/single-post';
import Loading from '@/app/Loading';

interface PostShowPageProps {
	params: {
		postId: string;
	};
}

export default async function PostShowPage({ params }: PostShowPageProps) {
	const { postId } = params;

	return (
		<div className="flex flex-col">
			<Suspense
				fallback={
					<div className="text-white flex w-[100%] justify-center items-center mt-32 mb-32">
						<Loading />
					</div>
				}
			>
				<SinglePost postId={postId} />
			</Suspense>
		</div>
	);
}
