'use client';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentMethod } from '@/actions';
import { Loader2, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function CommentCreateForm({
	postId,
	parentId,
	refreshComments,
}: {
	postId: string;
	parentId: number | null;
	refreshComments: () => void;
}) {
	const [formStatus, setFormStatus] = useState('success');
	const [errMsg, setErrMsg] = useState('');
	const [pending, setPending] = useState(false);

	const commentSubmitSchema = z.object({
		content: z
			.string()
			.min(5, { message: 'Content must be 5 characters long' })
			.trim(),
	});

	const form = useForm<z.infer<typeof commentSubmitSchema>>({
		resolver: zodResolver(commentSubmitSchema),
		defaultValues: {
			content: '',
		},
	});

	async function onSubmit(values: z.infer<typeof commentSubmitSchema>) {
		setPending(true);
		setFormStatus('success');
		const comment = await createCommentMethod(
			values.content,
			Number(postId),
			parentId
		);
		if (comment && !comment.success) {
			setFormStatus('error');
			setErrMsg(comment.error.message);
		} else {
			form.reset();
			refreshComments();
		}
		setPending(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="mt-5 w-[50%]">
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="w-[100%]">
								<FormControl>
									<Textarea placeholder="Type Comment" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-18 mt-5">
					<Button type="submit" disabled={pending}>
						{pending ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							'Submit'
						)}
					</Button>
				</div>
			</form>
			{formStatus === 'error' ? (
				<Alert variant="destructive">
					<Terminal className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{errMsg}</AlertDescription>
				</Alert>
			) : (
				''
			)}
		</Form>
	);
}
