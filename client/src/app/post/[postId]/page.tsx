import React, { Suspense } from 'react';
import Header from '@/components/headers/header';
import SinglePost from '@/components/posts/single-post';
import { Loader2 } from 'lucide-react';

interface PostShowPageProps {
	params: {
		postId: string;
	};
}

export default async function PostShowPage({ params }: PostShowPageProps) {
	const { postId } = params;

	return (
		<div className="flex flex-col">
			<Header />
			<Suspense
				fallback={
					<div className="text-white flex w-[100%] justify-center items-center mt-32 mb-32">
						<Loader2 className="mr-2 animate-spin" size={50} />
					</div>
				}
			>
				<SinglePost postId={postId} />
			</Suspense>
		</div>
	);
}
