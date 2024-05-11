import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	/* User is already logged in. */
	if (session) redirect(303, "/app");
};

export const actions = {
	signup: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const userName = formData.get("username") as string;

		if (!email || !password || !userName) {
			return fail(400, {
				error: "Please enter an username, email and password",
				data: {
					email,
					userName,
				},
			});
		}

		//if the username is less than 3 characters or more than 20 characters reject the request
		if (userName.length < 3 || userName.length > 20) {
			return fail(400, {
				error: "Username must be between 3 and 20 characters",
				data: {
					email,
					userName,
				},
			});
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/app`,
				data: { display_name: userName },
			},
		});

		if (error) console.error(error);
		else return { message: "Please check your email to confirm your signup." };
	},

	oauth: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get("provider") as Provider;

		/**
		 * Sign-in will not happen yet, because we're on the server-side,
		 * but we need the returned url.
		 */
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${url.origin}/auth/callback?next=/app`,
			},
		});

		if (error) throw error;

		/* Now authorize sign-in on browser. */
		if (data.url) redirect(303, data.url);
	},
};
