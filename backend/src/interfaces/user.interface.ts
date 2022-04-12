import * as mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isCorrectPassword?(password: string): void;
};
