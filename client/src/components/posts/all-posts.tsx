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
import { getToken } from '@/lib/getToken';
import Score from './add-score';

export default async function Post({ type }: { type: string }) {
	let posts;

	if (type === 'new') {
		posts = await fetchAllNewPosts();
	} else if (type === 'desc') {
		posts = await fetchAllPostsDesc();
	} else {
		posts = await fetchAllTypePosts(type);
	}

	const token = await getToken();

	const renderItems = posts?.data.data.map((post: PostType, i: number) => {
		return (
			<div
				key={post.id}
				className="border-gray-700 w-full h-auto border-b-2 flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-4"
			>
				<div className="flex items-center mb-2 md:mb-0">
					<span className="text-sm mr-2">{i + 1}. </span>
					{token ? (
						<Score token={token} postId={post.id.toString()} />
					) : (
						<Link href={`/login`}>
							<Triangle size={15} className="cursor-pointer" />
						</Link>
					)}
					<span className="text-sm ml-2">{post.score}</span>
					<Link
						href={token ? `/post/${post.id}` : '/login'}
						className="text-sm ml-4"
					>
						{post.title}
					</Link>
				</div>
				<div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-5">
					<div className="flex gap-1">
						<User size={15} />
						<span className="text-xs">{post.by}</span>
					</div>
					{post.url ? (
						<Link href={post.url} target="_blank" className="flex gap-1">
							<SquareArrowOutUpRight size={15} />
							<span className="text-xs truncate max-w-[200px] md:max-w-none">
								{post.url}
							</span>
						</Link>
					) : null}
					<Link
						href={token ? `/post/${post.id}` : '/login'}
						className="flex gap-1"
					>
						<MessageCircle size={15} />
						<span className="text-xs">{post.descendants}</span>
					</Link>
				</div>
			</div>
		);
	});

	return <div>{renderItems}</div>;
}
