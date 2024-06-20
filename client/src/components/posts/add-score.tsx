'use client';

import { Loader2, Triangle } from 'lucide-react';
import { AddScoreMethod } from '@/actions';
import { useState } from 'react';

export default function Score({ postId }: { token: string; postId: string }) {
	const [pending, setPending] = useState(false);

	const increase = async () => {
		setPending(true);
		await AddScoreMethod(postId);
		setPending(false);
	};

	return (
		<>
			{pending ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Triangle size={15} className="cursor-pointer" onClick={increase} />
			)}
		</>
	);
}
