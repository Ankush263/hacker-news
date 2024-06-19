import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

function SubmitHeader() {
	return (
		<div className="w-[100%] h-18 flex justify-center  mt-2">
			<div className="w-[85%] flex justify-between items-center">
				<div>News</div>
				<div>
					<Link href={'/submit'}>
						<Button variant="outline">
							<Plus className="mr-2 h-4 w-4" /> Submit
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SubmitHeader;
