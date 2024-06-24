import React, { Suspense } from 'react';
import { MessageCircle, SquareArrowOutUpRight, Triangle } from 'lucide-react';
import Loading from '@/app/Loading';
import Link from 'next/link';
import Comment from './comments';
import urlFormat from '@/helper/urlFormat';
import sanitizeHtml from 'sanitize-html';

interface PostShowProps {
	postId: string;
}

export default async function SinglePost({ postId }: PostShowProps) {
	const URL = 'https://hacker-news.firebaseio.com/v0';

	let story;

	const response = await fetch(`${URL}/item/${postId}.json`, {
		cache: 'no-store',
	});

	if (response.ok) {
		story = await response.json();
	}

	return (
		<div className="flex flex-col mt-16 md:mt-0">
			<div className="flex flex-col w-[100%] justify-center items-center mt-5">
				<div className="flex flex-col w-[85%] gap-3">
					<div className="flex gap-3 items-center">
						<Triangle size={15} className="hidden md:flex" />
						<span className="text-sm font-semibold">
							<span
								className="text-sm text-gray-300"
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(story?.title),
								}}
							/>
						</span>
					</div>
					<div className="flex gap-3 items-center">
						<span className="text-xs">
							{story?.score} points by {story?.by}
						</span>
						<div className="text-xs">|</div>
						<div className="flex gap-1 justify-center items-center">
							<MessageCircle size={15} />
							<span className="text-xs">{story?.descendants}</span>
						</div>
						{story?.url ? (
							<>
								<div className="text-xs">|</div>
								<Link
									href={story?.url}
									target="_blank"
									className="flex gap-1 justify-center items-center"
								>
									<SquareArrowOutUpRight size={15} />
									<span className="text-xs">{urlFormat(story?.url)}</span>
								</Link>
							</>
						) : (
							<></>
						)}
					</div>
					<div className="mt-5">
						<span className="text-xs text-gray-500">
							<span
								className="text-sm text-gray-300"
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(story?.text),
								}}
							/>
						</span>
					</div>

					<h4>comments</h4>
					<div className="w-[100%] border-b-2 border-gray-700 mt-7 mb-10"></div>

					<Suspense
						fallback={
							<div className="text-white w-[100%] flex justify-center items-center mt-32 mb-32">
								<Loading />
							</div>
						}
					>
						<Comment postId={postId} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
