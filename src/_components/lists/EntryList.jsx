import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../_utils/dexie/db.model";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function EntryList({ productId }) {
	const [selectedEntries, setSelectedEntries] = useState(null);
	const entries =
		useLiveQuery(async () => {
			const entries = await db.entry.where({ entryProductId: productId }).toArray();

			return entries;
		}) ?? [];
	useEffect(() => {
		// console.log(selectedEntries);
		console.log(entries);
	}, [selectedEntries]);

	const columns = [
		{
			name: "Date",
			selector: (row) => row.entryDate,
		},
		{
			name: "Price",
			selector: (row) => row.entryPrice,
		},
	];

	return (
		<div className='w-full md:w-3/4 grid gap-y-4'>
			<DataTable
				columns={columns}
				data={entries}
			/>
		</div>
	);
}
