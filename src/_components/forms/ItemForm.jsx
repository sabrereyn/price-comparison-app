import { useForm } from "react-hook-form";
import ModalContent from "../modal/ModalContent";
import ModalFooter from "../modal/ModalFooter";
import Modal from "../modal/Modal";
import { db } from "../../_utils/dexie/db.model";
import ModalHeader from "../modal/ModalHeader";
import Input from "../components/Input";
import TextAreaInput from "../components/TextAreaInput";
import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

export default function ItemForm({ id, close }) {
	const data = id ? useLiveQuery(() => db.product.get(id)) : {};
	const {
		reset,
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		let defaultValues = {};
		if (data) {
			defaultValues.name = data.name;
			defaultValues.description = data.description;
			reset({ ...defaultValues });
		}
	}, [data]);

	async function addItem({ name, description }) {
		try {
			if (id) {
				await db.product.update(id, {
					name: name,
					description: description,
				});
			} else {
				id = await db.product.add({
					name: name,
					description: description,
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
		<form onSubmit={handleSubmit(addItem)}>
			<Modal>
				<ModalHeader close={close}>
					<h2>Add A Product</h2>
				</ModalHeader>
				<ModalContent>
					<Input
						label='Name:'
						name={"name"}
						register={register}
						required
					/>
					{errors.name && <p style={{ color: "red" }}>Please enter a name</p>}
					<TextAreaInput
						label='Description:'
						name={"description"}
						register={register}
					/>
				</ModalContent>
				<ModalFooter />
			</Modal>
		</form>
	);
}
