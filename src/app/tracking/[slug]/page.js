"use client";
import styles from "../../page.module.css";
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../../_components/components/Button";
import EntryForm from "../../../_components/forms/EntryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import EntryList from "../../../_components/lists/EntryList";

export default function Page({ params }) {
	const [openForm, setOpenForm] = useState(false);
	const productId = useSearchParams().get("id");
	const name = decodeURI(params.slug);

	return (
		<main className={styles.main}>
			<div className='flex flex-row gap-x-2'>
				<Link href={"/tracking"}>
					<button>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
				</Link>
				<h1>{name}</h1>
			</div>
			<EntryList productId={productId} />
			<Button
				label={"Add Entry"}
				onClick={() => setOpenForm(true)}
			/>
			<Popup
				open={openForm}
				onClose={() => setOpenForm(false)}
				closeOnDocumentClick={false}
				modal>
				<EntryForm
					name={name}
					productId={productId}
					close={() => setOpenForm(false)}
				/>
			</Popup>
		</main>
	);
}
