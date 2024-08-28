"use client";
import Popup from "reactjs-popup";
import styles from "../page.module.css";
import Folderform from "./components/FolderForm";
import { FolderList } from "./components/FolderList";
import { Suspense, useState } from "react";
import Button from "../../_components/components/Button";

export default function Homepage() {
	const [openForm, setOpenForm] = useState(false);
	const [id, setId] = useState<string | null>(null);

	return (
		<main className={styles.main}>
			<Suspense
				fallback={
					<div>
						<p>Loading...</p>
					</div>
				}>
				<FolderList
					setOpenForm={setOpenForm}
					setId={setId}
				/>
			</Suspense>
			<Button
				label='Add Item'
				onClick={() => setOpenForm(true)}
			/>
			<Popup
				open={openForm}
				onClose={() => setOpenForm(false)}
				closeOnDocumentClick={false}
				modal>
				<Folderform
					close={() => setOpenForm(false)}
					id={id}
				/>
			</Popup>
		</main>
	);
}
