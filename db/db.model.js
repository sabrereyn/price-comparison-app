import Dexie from "dexie";

export const db = new Dexie("PriceComparison");
db.version(1).stores({
  product: "++productId, productName",
  location: "++locationId, locationName",
  entry: "++entryId, entryProductId, entryLocationId, entryPrice, entryDate",
});
