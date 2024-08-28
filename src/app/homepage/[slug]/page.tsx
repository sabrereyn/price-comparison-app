"use client";
import styles from "../../page.module.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../../_components/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";

export default function Page({ params: { slug } }: { params: { slug: string } }) {
	const [openForm, setOpenForm] = useState(false);
	const productId = useSearchParams().get("id");
	const name = decodeURI(slug);

	return (
		<main className={styles.main}>
			<div className='flex flex-row gap-x-2'>
				<Link href={"/homepage"}>
					<button>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
				</Link>
				<h1>{name}</h1>
			</div>
			<EntryList />
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
