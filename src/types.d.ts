export type ArticleProps = {
	id: number;
	posttitle: string;
	postcontent: string;
	postcategory: string;
	postcreater: string;
	postdate: Date;
	postimage?: string;
};

export type HomeProps = {
	posts: {
		id: number;
		title: string;
		content: string;
		category: string;
		creater: string;
		date: Date;
		cover?: string;
	}[];
};

export type DetailProps = {
	posts: {
		id: number;
		title: string;
		content: string;
		category: string;
		creater: string;
		date: Date;
		cover?: String;
	}[];

	deletHandler: (x: number) => void;
};
export type UserprofileProps = {
	posts: {
		id: number;
		title: string;
		content: string;
		category: string;
		creater: string;
		date: Date;
		cover?: String;
	}[];
	user_data: {
		user_id: number;
		username: string;
	};
	deletHandler: (x: number) => void;
	deletUserHandler: (x: number) => void;
};

export interface PostProps {
	onSubmitnewPost: (x: FormData) => void;
}

export interface Comment_data {
	content: string;
}
export interface CommentProps {
	onSubmitComment: (content: comment_data) => void;
}
export interface Login_Data {
	username: string;
	password: String;
}
export interface LoginProps {
	onSubmitLogin: (x: Login_Data) => void;
}
export interface Form_data {
	username: string;
	password?: string;
	password2?: string;
	email: string;
	is_poster: boolean;
	is_reader: boolean;
}
export interface SignupformProps {
	onSubmitSignup: (form_data: form_data) => void;
}
