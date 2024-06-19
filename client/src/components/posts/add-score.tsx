'use client';

import { Triangle } from 'lucide-react';
import { AddScoreMethod } from '@/actions';

export default function Score({ postId }: { token: string; postId: string }) {
	const increase = () => {
		AddScoreMethod(postId);
	};

	return <Triangle size={15} className="cursor-pointer" onClick={increase} />;
}
