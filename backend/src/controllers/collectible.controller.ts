import * as path from 'path';

import CollectibleColl from "@models/collectible.model";
import { ICollectibleBid } from "@src/interfaces/collectible.interface";
import { assertExposable } from "@src/modules/errors";
import { canBeAdded, getBestBid } from "@src/utils";
import mongoose from 'mongoose';

const collectibleAggregations = [
	{
		$addFields: {
			lower: {
				$reduce: {
					input: "$bids",
					initialValue: {
						price: "$startPrice",
						user: null
					},
					in: { $cond: [{ $lte: ["$$this.price", "$$value.price"] }, "$$this", "$$value"] }
				}
			},
		}
	},
	{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
	{ $lookup: { from: 'users', localField: 'winnerUserId', foreignField: '_id', as: 'winnerUser' } },
];

export const CollectibleController = {
	create: async (body, file) => {
		const collectible = new CollectibleColl({
			...body,
			status: '0'
		});

		try {
			const filePath = path.join(__dirname, '..', 'storage', `${collectible._id}.${file.name.split('.').pop()}`);
			await file.mv(filePath);
			collectible.imagePath = filePath;
		} catch (err) { console.log(err); }

		const result = await collectible.save();
		return { collectible: result };
	},

	getSingleCollectible: async (id: string) => {
		const result = await CollectibleColl.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			...collectibleAggregations
		]);
		await assertExposable(result[0], 'collectible_not_found', 404);

		return result[0];
	},

	list: async (data = null) => {
		console.log(data)
		const result = await CollectibleColl.aggregate([
			{ $match: { ...data } },
			...collectibleAggregations
		]);

		return result;
	},

	makeBid: async (id: string, data: ICollectibleBid) => {
		const collectible = await CollectibleColl.findOne({ _id: id });

		await assertExposable(new Date().getTime() < new Date(collectible.dateEnd).getTime(), 'mab_expired');
		await assertExposable(collectible.userId.toString() != data.userId.toString(), 'mab_sameuser');

		if (collectible.bids.length === 0) {
			await assertExposable(canBeAdded(collectible.startPrice, data.price), 'mab_pricetoohigh');

			collectible.bids = [{ ...data }, ...collectible.bids];
		} else {
			const bestBid = getBestBid(collectible.bids);

			await assertExposable(bestBid.userId.toString() != data.userId.toString(), 'mab_lastuser');
			await assertExposable(canBeAdded(bestBid.price, data.price), 'mab_pricetoohigh');

			collectible.bids = [{ ...data }, ...collectible.bids];
		}

		const result = collectible.save();
		return result;
	}
}