
export interface IProject {
	_id: string;
	title: string;
	description: string;
}


export interface IProjectCreate {
	title: string;
	description: string;
}


export interface IProjectUpdate {
	title?: string;
	description?: string;
}