import CollectibleColl from "@src/models/collectible.model"
import { getBestBid } from "@src/utils";

export const checkCollectibles = async (_req, _res, next) => {
  const collectibles = await CollectibleColl.find({ });

  for (const collectible of collectibles) {
    if (new Date() >= new Date(collectible.dateEnd) && collectible.winnerUserId === null) {
      collectible.winnerUserId = getBestBid(collectible.bids).userId;
      collectible.status = '1';
      await collectible.save();
    }
  }

  next();
}