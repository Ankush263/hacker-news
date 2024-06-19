'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function PostLoading() {
	return (
		<div className="flex flex-col">
			<Skeleton className="h-4 w-[900px] mb-10" />
			<Skeleton className="h-4 w-[900px] mb-10" />
			<Skeleton className="h-4 w-[900px] mb-10" />
			<Skeleton className="h-4 w-[900px] mb-10" />
		</div>
	);
}
