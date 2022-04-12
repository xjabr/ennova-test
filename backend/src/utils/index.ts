import { ICollectibleBid } from "@src/interfaces/collectible.interface";

export const getBestBid = (bids: Array<ICollectibleBid>) => {
  let bestBid: any = bids[0];

  for (const bid of bids) {
    if (bestBid.price >= bid.price) {
      bestBid = bid;
    }
  }

  return bestBid;
}

export const canBeAdded = (bestPrice: number, newPrice: number) => {
  return newPrice <= (bestPrice - (bestPrice * 0.02));
}