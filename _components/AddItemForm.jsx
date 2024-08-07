import { useForm } from "react-hook-form";
import ModalContent from "./modal/ModalContent";
import FullField from "./form/FullField";
import ModalFooter from "./modal/ModalFooter";
import Modal from "./modal/Modal";
import { db } from "../db/db.model";
import ModalHeader from "./modal/ModalHeader";

export default function AddItemForm({ close }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function addItem({ name }) {
    try {
      const id = await db.product.add({
        name: name,
      });

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
          <FullField label="Name:" name={"name"} register={register} required />
          {errors.name && <p style={{ color: "red" }}>Please add a name</p>}
        </ModalContent>
        <ModalFooter />
      </Modal>
    </form>
  );
}
