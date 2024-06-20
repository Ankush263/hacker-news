'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Header2 from '@/components/headers/header2';
import { PostType } from '@/db/posts';
import { getPostById } from '@/app/api';
import { getToken } from '@/lib/getToken';
import { updatePostMethod } from '@/actions';

interface PostShowPageProps {
	params: {
		postId: string;
	};
}

function Update({ params }: PostShowPageProps) {
	const { postId } = params;
	const [formStatus, setFormStatus] = useState('success');
	const [errMsg, setErrMsg] = useState('');
	const [pending, setPending] = useState(false);
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [text, setText] = useState('');

	const form = useForm();

	async function onSubmit() {
		setPending(true);
		setFormStatus('success');
		const update = await updatePostMethod(Number(postId), title, url, text);
		setPending(false);
		if (update && !update?.success) {
			setPending(false);
			setFormStatus('error');
			setErrMsg(update?.error?.message);
		}
	}

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const token = await getToken();
				const response = await getPostById(postId, token as unknown as string);

				const post: PostType = response.data.data;

				setTitle(post.title);
				setUrl(post.url);
				setText(post.text);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPosts();
	}, [postId]);

	return (
		<div className="flex flex-col justify-center items-center">
			<Header2 />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[85%] mt-5 flex flex-col justify-center items-start space-y-8"
				>
					<span className="text-2xl font-semibold">Update</span>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>Title: </FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Title"
										{...field}
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>Url: </FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Url"
										{...field}
										value={url}
										onChange={(e) => setUrl(e.target.value)}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="text"
						render={({ field }) => (
							<FormItem className="w-[550px]">
								<FormLabel>Text: </FormLabel>
								<FormControl>
									<Textarea
										placeholder="Type your message here."
										{...field}
										value={text}
										onChange={(e) => setText(e.target.value)}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
						Update
					</Button>

					{formStatus === 'error' ? (
						<Alert variant="destructive">
							<Terminal className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{errMsg}</AlertDescription>
						</Alert>
					) : (
						''
					)}
				</form>
			</Form>
		</div>
	);
}

export default Update;
