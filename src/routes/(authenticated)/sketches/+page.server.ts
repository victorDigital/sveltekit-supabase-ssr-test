import type { Tables } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	const userId = session?.user.id;
	let sketches: Tables<"sketches">[];
	//filter by date created
	const { data, error } = await supabase
		.from("sketches")
		.select("*")
		.eq("owned_by", userId)
		.order("created_at", { ascending: false });
	if (error) return redirect(500, "/explore");
	if (!data) return redirect(500, "/explore");
	if (data instanceof Array && !data.length) return redirect(307, "/explore");

	sketches = data;

	return { session, sketches }; // Add the 'supabase' property here
};

export const actions = {
	delete: async ({ request, locals: { supabase, getSession } }) => {
		console.log("delete action");
		const session = await getSession();
		const formData = await request.formData();
		const sketchId = formData.get("sketch_id");
		if (!sketchId) return redirect(500, "/explore");
		if (!session) return redirect(500, "/explore");

		const { data, error } = await supabase.from("sketches").delete().eq("id", sketchId).eq("owned_by", session.user.id);
	},
};
