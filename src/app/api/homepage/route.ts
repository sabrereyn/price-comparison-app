import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../_utils/supabase/server";

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const userId = new URL(request.url).searchParams.get("userId");
	console.log(userId);

	if (userId) {
		try {
			const { data, error, status } = await supabase
				.from(`folder`)
				.select(`folder_id, folder_name, note, created_date, modified_date`)
				.eq("user_id", userId);

			if (error && status !== 406) {
				console.log(error);
				throw error;
			}

			if (data) {
				data.forEach((folder) => {
					folder.created_date = new Date(folder.created_date);
					folder.modified_date = new Date(folder.modified_date);
				});
				console.log(data);

				return NextResponse.json(data);
			}
		} catch (error) {
			alert("Had a problem loading data!");
		}
	}
	return [];
}
