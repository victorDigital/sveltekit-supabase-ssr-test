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
		return redirect(307, "/app");
	}

	if (!data) {
		return fail(500, error);
	}

	if (session?.user.id !== data[0].owned_by) {
		return redirect(307, "/app");
	}

	sketch = data[0];

	return { session, id, sketch };
};

//define save action
export const actions = {
	save: async ({ params, request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const formData = await request.formData();
		//get the pagedata from the formdata
		const encodedSketch = formData.get("sketch");
		const sketchVisibility = formData.get("is_public");
		const sketchTitle = formData.get("sketch_title");
		const sketchId = params.id;
		const userId = session?.user.id;

		//save the sketch to the database
		const { data, error } = await supabase
			.from("sketches")
			.update({
				sketch_b64: encodedSketch,
				title: sketchTitle,
				is_public: sketchVisibility === "public" ? true : false,
			})
			.eq("id", sketchId)
			.eq("owned_by", userId);

		//if there is an error, return the error
		if (error) {
			return fail(500, error);
		}
		//return the encoded sketch
		return { returnEncodedSketch: encodedSketch };

		console.log(encodedSketch);
	},
} satisfies Actions;
