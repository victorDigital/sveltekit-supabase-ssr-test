<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import { Person, Rocket } from "svelte-radix";
</script>

<div class="mt-44 flex justify-center flex-col items-center">
	<h1 class="text-center text-6xl font-black font-space">Processing For The Web!</h1>
	<h2 class="text-center text-2xl font-light font-space max-w-lg opacity-75">
		A place to learn, share, and create with Processing.js. 100% free and open source.
	</h2>
	<p class="text-orange-500 opacity-75 font-space text-xs">
		This app is not affiliated with the official Processing Foundation or Processing.js
	</p>
	<div class="flex gap-4 mt-8">
		<Button href="/auth/signup" variant="default">
			<Rocket class="size-4 mr-2" />
			Sign Up
		</Button>
		<Button href="/auth" variant="secondary">
			<Person class="size-4 mr-2" />
			Log In
		</Button>
	</div>
</div>
