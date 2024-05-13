import type { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

export const load = async ({ locals: { getSession, supabase } }) => {
	/**
	 * Auth validation happens in hooks.server.ts, so there's
	 * no need to check anything here.
	 *
	 * If you have a one-off situation, or you'd rather be
	 * more explicit, check for a session and redirect.
	 *
	 * import { redirect } from '@sveltejs/kit'
	 * if (!session) redirect(307, '/auth')
	 */

	const session = await getSession();

	const sketchesQuery = supabase.from("sketches").select("*").order("created_at", { ascending: false });
	type SketchesQuery = QueryResult<typeof sketchesQuery>;
	const { data: QueryData, error: QueryError } = await sketchesQuery;

	return { session, QueryData, QueryError };
};
