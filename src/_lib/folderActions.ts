import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";

interface Folder {
	folder_id: string | null;
	user_id: string | null;
	folder_name: string;
	note: string;
}

export async function addFolder(formData: Folder): Promise<void> {
	"use server";
	const supabase = createClient();

	const { data, error } = await supabase.from("folder").insert(formData).select("folder_id");
	if (error) {
		console.error("Error adding folder:", error);
		return;
	}

	revalidatePath("/homepage");
}

export async function updateFolder(folder_id: string, formData: Folder) {
	"use server";
	const supabase = createClient();

	const { data, error } = await supabase.from("folder").update(formData).eq("id", folder_id).single();

	if (error) {
		console.error("Error updating folder:", error);
		return;
	}

	revalidatePath("/homepage");
}
