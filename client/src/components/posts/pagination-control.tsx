'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationControl = ({
	type,
	currentPage,
}: {
	type: string;
	currentPage: number;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const totalPages = 25;

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());
		params.set('type', type);
		router.push(`/?${params.toString()}`);
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer"
						onClick={() => handlePageChange(currentPage - 1)}
					/>
				</PaginationItem>

				<PaginationItem>
					<PaginationLink
						onClick={() => handlePageChange(1)}
						isActive={1 === currentPage ? true : false}
						className="cursor-pointer"
					>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						onClick={() => handlePageChange(2)}
						isActive={2 === currentPage ? true : false}
					>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						onClick={() => handlePageChange(3)}
						isActive={3 === currentPage ? true : false}
						className="cursor-pointer"
					>
						3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						onClick={() => handlePageChange(totalPages)}
						isActive={totalPages === currentPage ? true : false}
						className="cursor-pointer"
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						onClick={() => handlePageChange(currentPage + 1)}
						className="cursor-pointer"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationControl;
