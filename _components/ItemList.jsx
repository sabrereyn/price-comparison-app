import { useLiveQuery } from "dexie-react-hooks";
import { Fragment } from "react";
import { db } from "../db/db.model";
import Link from "next/link";

export default function ItemList() {
  const products = useLiveQuery(() => db.product.toArray());

  return (
    <Fragment>
      <h1>List of Items</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.productId}>
            <Link href={`tracking/${product.name}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
