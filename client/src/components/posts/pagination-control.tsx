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
	total,
}: {
	type: string;
	currentPage: number;
	total: number;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const totalPages = Math.floor(total / 15) + 1;

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());
		params.set('type', type);
		router.push(`/?${params.toString()}`);
	};

	const renderPageLinks = () => {
		const pageLinks = [];
		const maxLinks = 2;
		let startPage = currentPage - Math.floor(maxLinks / 2);
		let endPage = currentPage + Math.floor(maxLinks / 2);

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(totalPages, maxLinks);
		}

		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, totalPages - maxLinks + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageLinks.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={() => handlePageChange(i)}
						isActive={i === currentPage}
						className="cursor-pointer"
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		if (startPage > 1) {
			pageLinks.unshift(
				<PaginationItem key="ellipsis-start">
					<PaginationEllipsis />
				</PaginationItem>
			);
			pageLinks.unshift(
				<PaginationItem key={1}>
					<PaginationLink
						onClick={() => handlePageChange(1)}
						isActive={1 === currentPage}
						className="cursor-pointer"
					>
						1
					</PaginationLink>
				</PaginationItem>
			);
		}

		if (endPage < totalPages) {
			pageLinks.push(
				<PaginationItem key="ellipsis-end">
					<PaginationEllipsis />
				</PaginationItem>
			);
			pageLinks.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						onClick={() => handlePageChange(totalPages)}
						isActive={totalPages === currentPage}
						className="cursor-pointer"
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			);
		}

		return pageLinks;
	};

	return (
		<Pagination className="w-[100%] flex justify-center items-center">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer"
						onClick={() => handlePageChange(currentPage - 1)}
					/>
				</PaginationItem>
				{renderPageLinks()}
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
