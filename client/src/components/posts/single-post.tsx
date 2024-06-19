import React from 'react';
import {
	FilePenLine,
	MessageCircle,
	SquareArrowOutUpRight,
	Triangle,
} from 'lucide-react';
import { getToken, getUserId } from '@/lib/getToken';
import { fetchPostById } from '@/db/posts';
import { PostType } from '@/db/posts';
import Link from 'next/link';
import Comment from './comments';
import { DeletePost } from './delete-post';

interface PostShowProps {
	postId: string;
}

export default async function SinglePost({ postId }: PostShowProps) {
	const token = await getToken();
	const userId = await getUserId();

	const response = await fetchPostById(postId, token as unknown as string);

	const post: PostType = response.data.data;

	return (
		<div className="flex flex-col">
			<div className="flex flex-col w-[100%] justify-center items-center mt-5">
				<div className="flex flex-col w-[85%] gap-3">
					<div className="flex gap-3 items-center">
						<Triangle size={15} />
						<span className="text-sm font-semibold">{post.title}</span>
					</div>
					<div className="flex gap-3 items-center">
						<span className="text-xs">
							{post.score} points by {post.by}
						</span>
						<div className="text-xs">|</div>
						<div className="flex gap-1 justify-center items-center">
							<MessageCircle size={15} />
							<span className="text-xs">{post.descendants}</span>
						</div>
						{post.url ? (
							<>
								<div className="text-xs">|</div>
								<Link
									href={post.url}
									target="_blank"
									className="flex gap-1 justify-center items-center"
								>
									<SquareArrowOutUpRight size={15} />
									<span className="text-xs">{post.url}</span>
								</Link>
							</>
						) : (
							<></>
						)}
						{post.userId === userId ? (
							<>
								<div className="text-xs">|</div>
								<Link href={`/post/update/${postId}`}>
									<FilePenLine size={15} />
								</Link>
							</>
						) : (
							''
						)}
						{post.userId === userId ? (
							<>
								<DeletePost postId={postId} />
							</>
						) : (
							''
						)}
					</div>
					<div className="mt-5">
						<span className="text-xs text-gray-500">{post.text}</span>
					</div>

					<Comment postId={postId} />
				</div>
			</div>
		</div>
	);
}
