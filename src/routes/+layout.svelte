<script>
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { ModeWatcher, setMode, userPrefersMode, systemPrefersMode } from "mode-watcher";
	import { ArrowTopRight, ArrowUp } from "svelte-radix";

	//make a function that sets the apropiate mode
	//based on the user's preference
	console.log($userPrefersMode);
	console.log($systemPrefersMode);
	function setModeBasedOnUserPreference() {
		if ($userPrefersMode === "dark" || $systemPrefersMode === "dark") {
			// disabled for testing
			setMode("dark");
		} else {
			setMode("light");
		}
	}

	setModeBasedOnUserPreference();

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<ModeWatcher />

<main class="min-h-svh">
	<slot></slot>
</main>

<footer>
	<div class="justify-center *:text-center items-center gap-4 pt-4">
		<p>This app is not affiliated with the official Processing Foundation or Processing.js</p>
		<p>
			Made with ❤️ by <a href="https://voe.dk" class="inline-flex items-center underline"
				>Victor Østergaard <ArrowTopRight class="size-4 underline"></ArrowTopRight></a> in Denmark
		</p>
	</div>
	<div class="flex justify-center items-center gap-4 p-4">
		<a href="#1" class="text-sm text-gray-500 hover:text-gray-700"> Privacy Policy </a>
		<a href="#2" class="text-sm text-gray-500 hover:text-gray-700"> Terms of Service </a>
		<a href="https://voe.dk" class="text-sm text-gray-500 hover:text-gray-700"> Contact Us </a>
	</div>
</footer>
