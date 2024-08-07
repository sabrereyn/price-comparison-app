"use client";
import Popup from "reactjs-popup";
import styles from "../page.module.css";
import AddItemForm from "../../../_components/AddItemForm";
import ItemList from "../../../_components/ItemList";
import { useState } from "react";
import Button from "../../../_components/button/Button";

export default function ItemHomepage() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <main className={styles.main}>
      <ItemList />
      <Button label="Open Form" onClick={() => setOpenForm(true)} />
      <Popup
        open={openForm}
        onClose={() => setOpenForm(false)}
        closeOnDocumentClick={false}
        modal
      >
        <AddItemForm close={() => setOpenForm(false)} />
      </Popup>
    </main>
  );
}
