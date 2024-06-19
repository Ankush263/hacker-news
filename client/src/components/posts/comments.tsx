'use client';

import { MessageCircle, Triangle } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchCommentsByPostId } from '@/db/comments';
import { getToken } from '@/lib/getToken';
import { CommentType } from '@/db/comments';
import CommentCreateForm from './comment-create-form';

interface PostShowProps {
	postId: string;
}

const nestComments = (comments: CommentType[]) => {
	const commentMap: {
		[key: number]: CommentType & { children: CommentType[] };
	} = {};
	const nestedComments: (CommentType & { children: CommentType[] })[] = [];

	comments.forEach((comment) => {
		commentMap[comment.id] = { ...comment, children: [] };
	});

	comments.forEach((comment) => {
		if (comment.parentId) {
			if (commentMap[comment.parentId]) {
				commentMap[comment.parentId].children.push(commentMap[comment.id]);
			}
		} else {
			nestedComments.push(commentMap[comment.id]);
		}
	});

	return nestedComments;
};

const RenderComment = ({
	comment,
	refreshComments,
}: {
	comment: CommentType & { children: CommentType[] };
	refreshComments: () => void;
}) => {
	const [showCommentBox, setShowCommentBox] = useState(false);

	return (
		<div
			className={`min-w-[70%] flex flex-col gap-2 items-start mb-5 ml-${
				comment.parentId ? 10 : 0
			}`}
		>
			<div className="flex gap-2 items-start">
				<Triangle size={13} />
				<span className="text-xs">{comment.score}</span>
				<span className="text-xs text-gray-500">
					by {comment.by} {new Date(comment.createdAt).toLocaleString()}
				</span>
			</div>
			<span className="text-xs text-gray-400">{comment.content}</span>

			<div className="w-[100%] flex flex-col justify-start">
				<MessageCircle
					className="cursor-pointer"
					size={15}
					onClick={() => {
						setShowCommentBox((prev) => !prev);
					}}
				/>

				{showCommentBox ? (
					<CommentCreateForm
						postId={comment.postId.toString()}
						refreshComments={refreshComments}
						parentId={comment.id}
					/>
				) : (
					<></>
				)}
			</div>

			{comment.children.length > 0 && (
				<div className="w-[100%] ml-5 mt-5">
					{comment.children.map((childComment) => (
						<RenderComment
							key={childComment.id}
							comment={childComment}
							refreshComments={refreshComments}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const Comment = ({ postId }: PostShowProps) => {
	const [comments, setComments] = useState<
		(CommentType & { children: CommentType[] })[]
	>([]);

	const fetchData = useCallback(async () => {
		const token = getToken();
		const response = await fetchCommentsByPostId(postId, token as any);
		const nestedComments = nestComments(response.data.data);
		setComments(nestedComments);
	}, [postId]);

	useEffect(() => {
		fetchData();
	}, [fetchData, postId]);

	return (
		<div className="w-[100%] flex flex-col gap-2 items-start mb-5">
			<div className="w-[100%]">
				<CommentCreateForm
					postId={postId}
					parentId={null}
					refreshComments={fetchData}
				/>
			</div>
			<div className="w-[100%] border-b-2 border-gray-700 mt-7 mb-10"></div>

			{comments.map((comment) => (
				<RenderComment
					key={comment.id}
					comment={comment}
					refreshComments={fetchData}
				/>
			))}
		</div>
	);
};

export default Comment;
