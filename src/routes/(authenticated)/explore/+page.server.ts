import type { Tables } from "$lib/database.js";
import { fail } from "@sveltejs/kit";

export const prerender = true;

export const load = async ({ locals: { supabase } }) => {
	//get all the sketches tha are public
	let sketches: Tables<"sketches">[] = [];
	const sketchesQuery = await supabase.from("sketches").select("*").eq("is_public", true);
	const { data, error } = sketchesQuery;
	if (error) {
		return fail(500, error);
	}
	if (data) {
		sketches = data;
	}

	return { sketches };
};
