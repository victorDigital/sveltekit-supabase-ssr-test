import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import type { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import type { Database, Tables, Enums } from "$lib/database";

export const load = async ({ locals: { getSession, supabase }, params }) => {
	const { id } = params;
	const session = await getSession();
	const sketchesQuery = supabase.from("sketches").select("*").eq("id", id);

	let sketch: Tables<"sketches">;
	const { data, error } = await sketchesQuery;

	console.log(data);
	if (data instanceof Array && !data.length) {
		return redirect(307, "/explore");
	}

	if (!data) {
		return fail(500, error);
	}

	sketch = data[0];

	return { session, id, sketch };
};
