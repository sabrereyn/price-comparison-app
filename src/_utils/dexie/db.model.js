import Dexie from 'dexie';

export const db = new Dexie('PriceComparison');
db.version(1).stores({
	product: '++productId, productName',
	entry: '++entryId, entryProductId, entryLocationId, entryPrice, entryDate',
});

db.version(2).stores({
	tag: '++tagId, tagName',
	location: null,
});
