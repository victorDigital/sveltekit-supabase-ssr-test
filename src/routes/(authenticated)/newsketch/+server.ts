import { json, redirect } from "@sveltejs/kit";
import { customAlphabet } from "nanoid";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) return json({ error: "You must be logged in to create a new sketch." });
	const isAnon = session?.user.is_anonymous;
	console.log("isAnon", isAnon);
	if (isAnon) return json({ error: "You must be logged in to create a new sketch." });

	const alphabet = "123456789ABCDEFGHIKLMNPQRSTUWXYZ";
	const nanoid = customAlphabet(alphabet, 8);
	const sketch_id = nanoid();

	const { error, data } = await supabase
		.from("sketches")
		.insert([{ id: sketch_id, owned_by: session.user.id, created_by: session.user.id }]);

	if (error) return json({ error: "Failed to create a new sketch.", data: error });
	return redirect(302, `/sketch/${sketch_id}`);
};
