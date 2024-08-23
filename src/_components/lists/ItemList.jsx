import { useLiveQuery } from "dexie-react-hooks";
import { Fragment } from "react";
import { db } from "../../_utils/dexie/db.model";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ItemList({ setOpenForm, setId }) {
	const products = useLiveQuery(() => db.product.toArray());
	async function deleteItem(productId) {
		try {
			db.product.delete(productId);
		} catch (error) {
			setError("root.serverError", {
				type: "400",
			});
		}
	}

	return (
		<Fragment>
			<h1>List of Items</h1>
			<div className='w-full md:w-3/4 grid gap-y-4'>
				{products?.map((product) => (
					<div
						key={product.productId}
						className='flex flex-row gap-x-4'>
						<button onClick={() => deleteItem(product.productId)}>
							<FontAwesomeIcon
								icon={faTrash}
								size='lg'
							/>
						</button>
						<div className='basis-3/4'>
							<div className='flex gap-x-2'>
								<Link
									href={{
										pathname: `tracking/${product.name}`,
										query: {
											id: product.productId,
										},
									}}>
									{product.name}
								</Link>
								<button
									onClick={() => {
										setOpenForm(true);
										setId(product.productId);
									}}>
									<FontAwesomeIcon icon={faPencil} />
								</button>
							</div>
							<p>{product.description}</p>
						</div>
					</div>
				))}
			</div>
		</Fragment>
	);
}
