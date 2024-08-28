import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../_utils/supabase/server";

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const folderId = new URL(request.url).searchParams.get("folderId");

	if (folderId) {
		try {
			const { data, error, status } = await supabase.from("item").select().eq("folder_id", folderId);

			if (error && status !== 406) {
				console.log(error);
				throw error;
			}

			data?.forEach((item) => {
				item.created_date = new Date(item.created_date);
				item.modified_date = new Date(item.modified_date);
			}) || [];

			return NextResponse.json(data);
		} catch (error) {
			return NextResponse.error();
		}
	}
}
