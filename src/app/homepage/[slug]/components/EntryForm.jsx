import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../_utils/dexie/db.model";
import Input from "../components/Input";
import Modal from "../modal/Modal";
import ModalContent from "../modal/ModalContent";
import ModalFooter from "../modal/ModalFooter";
import ModalHeader from "../modal/ModalHeader";

export function EntryForm({ name = "", id = null, productId, close }) {
	const [date, setDate] = useState(moment().format("YYYY[-]MM[-]DD"));
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	async function addEntry({ price, date }) {
		try {
			if (id) {
				await db.entry.update(id, { entryPrice: price, entryDate: date });
			} else {
				id = await db.entry.add({
					entryPrice: price,
					entryDate: date,
					entryProductId: productId,
				});
			}

			if (id) {
				close();
			}
		} catch (error) {
			setError("root.serverError", {
				type: "400",
			});
		}
	}

	return (
		<form onSubmit={handleSubmit(addEntry)}>
			<Modal>
				<ModalHeader close={close}>
					<h2>Add An Entry {name && `for ${name}`}</h2>
				</ModalHeader>
				<ModalContent>
					<Input
						label={"Price:"}
						name={"price"}
						register={register}
						required
						type={"number"}
						step={"0.01"}
					/>
					{errors.price && <p style={{ color: "red" }}>Please enter a price</p>}
					<Input
						label={"Date:"}
						name={"date"}
						register={register}
						required
						type={"date"}
						onChange={(e) => setDate(e.target.value)}
						value={date}
					/>
					{errors.date && <p style={{ color: "red" }}>Please enter a date</p>}
				</ModalContent>
				<ModalFooter />
			</Modal>
		</form>
	);
}
