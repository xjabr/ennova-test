import * as mongoose from 'mongoose';

import { ICollectibleDocument } from '@src/interfaces/collectible.interface';

const CollectibleSchema = new mongoose.Schema<ICollectibleDocument>({
	title: { type: String, required: true },
	description: { type: String, required: false, default: '' },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
	winnerUserId: { type: String, default: null, required: false },
	startPrice: { type: Number, required: true },
	bids: { type: Array, default: [], required: false },
	imagePath: { type: String, required: true },
	dateEnd: { type: Date, required: true },
	status: { type: String, required: true, default: '0' } // 0 = active / 1 = expired
}, { timestamps: true });

const CollectibleColl = mongoose.model<ICollectibleDocument>('collectibles', CollectibleSchema);
export default CollectibleColl;