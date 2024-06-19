import axios from 'axios';

const URL = 'http://localhost:8000';

const AUTH_URL = `${URL}/api/v1/auth`;
const USER_URL = `${URL}/api/v1/user`;
const POST_URL = `${URL}/api/v1/post`;
const COMMENT_URL = `${URL}/api/v1/comment`;

const AUTH_API = axios.create({ baseURL: AUTH_URL });
const USER_API = axios.create({ baseURL: USER_URL });
const POST_API = axios.create({ baseURL: POST_URL });
const COMMENT_API = axios.create({ baseURL: COMMENT_URL });

export const signup = (details: {
	username: string;
	email: string;
	password: string;
}) => AUTH_API.post('/signup', details);

export const login = (details: { email: string; password: string }) =>
	AUTH_API.post('/login', details);

export const createPost = (
	details: {
		title: string;
		url: string;
		text: string;
	},
	token: string
) =>
	POST_API.post('/', details, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const updatePost = (
	postId: number,
	details: {
		title: string;
		url: string;
		text: string;
	},
	token: string
) =>
	POST_API.patch(`/${postId}`, details, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const getAllPostsDesc = () => POST_API.get('/');

export const getAllNewPosts = () => POST_API.get('/new');

export const getTypePosts = (type: string) => POST_API.get(`/type/${type}`);

export const increasePostScore = (postId: string, token: string) =>
	POST_API.patch(
		`/increase/${postId}`,
		{},
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

export const decreasePostScore = (postId: string, token: string) =>
	POST_API.patch(
		`/decrease/${postId}`,
		{},
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

export const getPostById = (id: string, token: string) =>
	POST_API.get(`/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const deletePostById = (id: string, token: string) =>
	POST_API.delete(`/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const getMe = (token: string) =>
	USER_API.get('/me', {
		headers: { Authorization: `Bearer ${token}` },
	});

export const getCommentsByPostId = (postId: string, token: string) =>
	COMMENT_API.get(`/post/${postId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const createComment = (
	details: {
		content: string;
		postId: number;
		parentId: number | null;
	},
	token: string
) =>
	COMMENT_API.post('/', details, {
		headers: { Authorization: `Bearer ${token}` },
	});
