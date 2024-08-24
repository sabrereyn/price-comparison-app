CREATE TABLE tag(
	tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag_name VARCHAR(255) UNIQUE NOT NULL
);

ALTER TABLE tag
	ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everybody can see insert new tag if it doesn't already exist."
ON tag
FOR INSERT
WITH CHECK (TRUE);

CREATE POLICY "Everybody can see all associated tag names."
ON tag
FOR SELECT
USING(TRUE);

CREATE TABLE folder (
	folder_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID REFERENCES auth.users,
	folder_name VARCHAR(255) NOT NULL,
	note TEXT DEFAULT '',
	created_date TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
	modified_date TIMESTAMP WITH TIME ZONE NOT NULL
);

ALTER TABLE folder
	ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own folders."
ON folder FOR SELECT
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create a folder."
ON folder FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own folders."
ON folder FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete a folder."
ON folder FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE TABLE item (
	item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID REFERENCES auth.users,
	folder_id UUID REFERENCES folder ON DELETE CASCADE,
	item_name VARCHAR(255) NOT NULL,
	item_note TEXT DEFAULT '',
	created_date TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
	modified_date TIMESTAMP WITH TIME ZONE NOT NULL
);

ALTER TABLE item
	ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own items."
ON item FOR SELECT
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create an item."
ON item FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own items."
ON item FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete an item."
ON item FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE TABLE item_tag(
	item_tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	item_id UUID REFERENCES item ON DELETE CASCADE,
	tag_id UUID REFERENCES tag
);

ALTER TABLE item_tag
	ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see tags associated with an item."
ON item_tag FOR SELECT
USING(
	EXISTS(
		SELECT 1
		FROM item
		WHERE item.item_id = item_tag.item_id
			AND item.user_id = (SELECT auth.uid())
	)
);

CREATE POLICY "Users can add a tag for an item."
ON item_tag FOR INSERT
WITH CHECK(
	EXISTS(
		SELECT 1
		FROM item
		WHERE item.item_id = item_tag.item_id
			AND item.user_id = (SELECT auth.uid())
	)
);

CREATE POLICY "Users can delete an item."
ON item_tag FOR DELETE
USING (
	EXISTS (
		SELECT 1
		FROM item
		WHERE item.item_id = item_tag.item_id
			AND item.user_id = (SELECT auth.uid())
	)
);