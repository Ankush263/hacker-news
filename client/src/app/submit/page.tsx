'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSubmitMethod } from '@/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Header2 from '@/components/headers/header2';

function Submit() {
	const [formStatus, setFormStatus] = useState('success');
	const [errMsg, setErrMsg] = useState('');
	const [pending, setPending] = useState(false);

	const textSubmitSchema = z.object({
		title: z
			.string()
			.min(5, { message: 'Title must be 5 characters long' })
			.trim(),
		url: z.string(),
		text: z.string(),
	});

	const form = useForm<z.infer<typeof textSubmitSchema>>({
		resolver: zodResolver(textSubmitSchema),
		defaultValues: {
			title: '',
			url: '',
			text: '',
		},
	});

	async function onSubmit(values: z.infer<typeof textSubmitSchema>) {
		setPending(true);
		setFormStatus('success');
		const post = await postSubmitMethod(values.title, values.url, values.text);
		setPending(false);
		if (post && !post?.success) {
			setPending(false);
			setFormStatus('error');
			setErrMsg(post?.error?.message);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<Header2 />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[85%] mt-5 flex flex-col justify-center items-start space-y-8"
				>
					<span className="text-2xl font-semibold">Submit</span>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-[350px]">
								<FormLabel>Title: </FormLabel>
								<FormControl>
									<Input placeholder="Enter Title" {...field} />
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
									<Input placeholder="Enter Url" {...field} />
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
									<Textarea placeholder="Type your message here." {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
						Submit
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

export default Submit;
