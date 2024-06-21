export type ListInterface = number[];

export interface CommentInterface {
	by: string;
	kids: CommentInterface[] | [];
	content: string;
	dead: boolean;
	deleted: boolean;
	id: number;
	text: string;
	time: number;
	user: string;
}

export interface ItemInterface {
	comments_count: number;
	descendants: number;
	comments?: CommentInterface[] | null;
	content?: string;
	text?: string;
	dead: boolean;
	deleted: boolean;
	id: number;
	points: number;
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
	user: string;
	by: string;
}

export interface ListItemInterface {
	id: number;
	url: string;
	dead?: boolean;
	deleted?: boolean;
	points: number;
	by: string;
	time: number;
	descendants: number;
	title: string;
	story_id: number;
}
