import {
	MessageCircle,
	SquareArrowOutUpRight,
	Triangle,
	User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
	fetchAllNewPosts,
	fetchAllPostsDesc,
	fetchAllTypePosts,
} from '@/db/posts';
import { PostType } from '@/db/posts';

export default async function Post({ type }: { type: string }) {
	let posts;

	if (type === 'new') {
		posts = await fetchAllNewPosts();
	} else if (type === 'desc') {
		posts = await fetchAllPostsDesc();
	} else {
		posts = await fetchAllTypePosts(type);
	}

	const renderItems = posts?.data.data.map((post: PostType, i: number) => {
		return (
			<div
				key={post.id}
				className="border-gray-700 w-[100%] h-16 border-b-2 flex justify-between items-center"
			>
				<div className="flex items-center">
					<span className="text-sm mr-2">{i + 1}. </span>
					<Triangle size={15} />
					<span className="text-sm ml-2">{post.score}</span>
					<Link href={`/post/${post.id}`} className="text-sm ml-4">
						{post.title}
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<div className="flex gap-1">
						<User size={15} />
						<span className="text-xs">{post.by}</span>
					</div>
					{post.url ? (
						<Link href={post.url} target="_blank" className="flex gap-1">
							<SquareArrowOutUpRight size={15} />
							<span className="text-xs">{post.url}</span>
						</Link>
					) : (
						<></>
					)}
					<Link href={`/post/${post.id}`} className="flex gap-1">
						<MessageCircle size={15} />
						<span className="text-xs">{post.descendants}</span>
					</Link>
				</div>
			</div>
		);
	});

	return <div>{renderItems}</div>;
}
