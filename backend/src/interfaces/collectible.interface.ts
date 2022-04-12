import mongoose from "mongoose";
import { IUserDocument } from "./user.interface";

export interface ICollectibleBid {
	userId: IUserDocument;
	price: number;
	date: Date;
}

export interface ICollectibleDocument extends mongoose.Document {
	title: string;
	description: string;
	startPrice: number;
	userId: IUserDocument;
	winnerUserId: IUserDocument;
	dateEnd: Date;
	imagePath: string;
	status: string;
	bids: Array<ICollectibleBid> | any;
};