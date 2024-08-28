import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "../../../_utils/supabase/client";

interface FolderListParams {
	setOpenForm: Dispatch<SetStateAction<boolean>>;
	setId: Dispatch<SetStateAction<string | null>>;
}

interface Folder {
	folder_id: string;
	folder_name: string;
	note: string;
	created_date: Date;
	modified_date: Date;
}

export function FolderList({ setOpenForm, setId }: FolderListParams) {
	const supabase = createClient();
	const [loading, setLoading] = useState<boolean>(true);
	const [folders, setFolders] = useState([]);

	useEffect(() => {
		async function getFolders() {
			try {
				const {
					data: { user },
					error: userError,
				} = await supabase.auth.getUser();
				if (userError) throw userError;

				if (user) {
					const response = await fetch(`/api/homepage?userId=${user?.id}`).then((res) => {
						console.log(res);
						return res.json();
					});
					setFolders(response);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				throw error;
			}
		}

		getFolders();
	}, []);

	return (
		<Fragment>
			<h1>List of Items</h1>
			<div className='w-full md:w-3/4 grid gap-y-4'>
				{loading ? (
					<div>
						<p>Loading...</p>
					</div>
				) : folders ? (
					folders.map((folder: Folder) => (
						<div
							key={folder.folder_id}
							className='flex flex-row gap-x-4'>
							{/* () => deleteItem(product.productId) */}
							<button>
								<FontAwesomeIcon
									icon={faTrash}
									size='lg'
								/>
							</button>
							<div className='basis-3/4'>
								<div className='flex gap-x-2'>
									<Link
										href={{
											pathname: `homepage/${folder.folder_name}`,
											query: {
												id: folder.folder_id,
											},
										}}>
										{folder.folder_name}
									</Link>
									<button
										onClick={() => {
											setOpenForm(true);
											setId(folder.folder_id);
										}}>
										<FontAwesomeIcon icon={faPencil} />
									</button>
								</div>
								<p>{folder.note}</p>
							</div>
						</div>
					))
				) : (
					<div>
						<p>No Data...</p>
					</div>
				)}
			</div>
		</Fragment>
	);
}
