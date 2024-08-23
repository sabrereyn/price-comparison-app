"use client";
import Popup from "reactjs-popup";
import styles from "../page.module.css";
import ItemForm from "../../_components/forms/ItemForm";
import ItemList from "../../_components/lists/ItemList";
import { useState } from "react";
import Button from "../../_components/components/Button";

export default function ItemHomepage() {
	const [openForm, setOpenForm] = useState(false);
	const [id, setId] = useState(null);

	return (
		<main className={styles.main}>
			<ItemList
				setOpenForm={setOpenForm}
				setId={setId}
			/>
			<Button
				label='Add Item'
				onClick={() => setOpenForm(true)}
			/>
			<Popup
				open={openForm}
				onClose={() => setOpenForm(false)}
				closeOnDocumentClick={false}
				modal>
				<ItemForm
					close={() => setOpenForm(false)}
					id={id}
				/>
			</Popup>
		</main>
	);
}
