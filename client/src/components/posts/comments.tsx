import { ChevronRight } from 'lucide-react';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Time from '@/helper/time';
import { CommentInterface } from '@/types';

// Recursive Function
async function fetchComment(commentId: number) {
	const URL = 'https://hacker-news.firebaseio.com/v0';
	const response = await fetch(`${URL}/item/${commentId}.json`, {
		cache: 'no-store',
	});

	if (response.ok) {
		const comment = await response.json();
		if (comment.kids && comment.kids.length > 0) {
			const nestedComments = await Promise.all(
				comment.kids.map(async (childCommentId: number) => {
					return await fetchComment(childCommentId);
				})
			);
			comment.kids = nestedComments;
		}
		return comment;
	} else {
		console.error(
			'Failed to fetch comment:',
			response.status,
			response.statusText
		);
		return null;
	}
}

export default async function Comment({ postId }: { postId: string }) {
	const URL = 'https://hacker-news.firebaseio.com/v0';

	let story;

	const response = await fetch(`${URL}/item/${postId}.json`, {
		cache: 'no-store',
	});

	let allComments = [];

	if (response.ok) {
		story = await response.json();

		if (story?.kids && story?.kids?.length > 0) {
			allComments = await Promise.all(
				story.kids.map(async (commentId: number) => {
					return await fetchComment(commentId);
				})
			);
		}
	}

	const RenderComment = ({
		comment,
		depth,
	}: {
		comment: CommentInterface;
		depth: number;
	}) => {
		return (
			<>
				{!comment.dead || !comment.deleted ? (
					<div
						className="flex flex-col gap-2 items-start mb-5 "
						style={{ paddingLeft: `${depth * 3}px`, width: '100%' }}
					>
						<div className="flex gap-2 items-start w-full">
							<span className="text-sm text-gray-400">
								by {comment.by} <Time time={comment.time} />
							</span>
						</div>
						<div className="flex gap-1 w-full">
							<ChevronRight size={20} />
							<span
								className="text-sm text-gray-300"
								style={{ wordBreak: 'break-word' }}
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(comment.text),
								}}
							/>
						</div>

						{comment.kids && comment.kids.length > 0 && (
							<div className="w-full mt-5">
								{comment.kids.map((childComment: CommentInterface) => (
									<RenderComment
										key={childComment.id}
										comment={childComment}
										depth={depth + 1}
									/>
								))}
							</div>
						)}
					</div>
				) : (
					<></>
				)}
			</>
		);
	};

	return (
		<div className="box-content p-4 w-full overflow-hidden">
			{allComments?.map((comment) => (
				<div key={comment.id} className="w-full">
					<RenderComment comment={comment} depth={0} />
				</div>
			))}
		</div>
	);
}
