<script>
	import { onDestroy, onMount } from "svelte";
	import * as Alert from "$lib/components/ui/alert";

	export let sketch;
	$: if (sketch) startProgram();
	export let showCanvas = false;
	// @ts-ignore
	let p5;
	let showError = false;
	let errorMessage = "";

	// @ts-ignore
	const compile = () => {
		try {
			// @ts-ignore
			var compiled = Processing.compile(sketch);
			// @ts-ignore
			p5 = new Processing(document.getElementById("processing"), compiled);
			showError = false;
		} catch (error) {
			showError = true;
			// @ts-ignore
			errorMessage = error.message;
			console.log(error);
		}
	};

	const startProgram = () => {
		if (showCanvas) {
			stopProgram();
		}
		compile();
		showCanvas = true;
	};

	// @ts-ignore
	const stopProgram = () => {
		// @ts-ignore
		if (!p5) {
			return;
		}

		p5.exit();
		//clear the canvas
		var canvas = document.getElementById("processing");
		if (!canvas) return;
		// @ts-ignore
		var context = canvas.getContext("2d");
		// @ts-ignore
		context.clearRect(0, 0, canvas.width, canvas.height);
		showCanvas = false;

		//when the program is stopped, we need to look for and delete the following elements
		//<span style="position: absolute; left: 0px; opacity: 0; font-family: PjsEmptyFont, fantasy;">AAAAAAAA</span>
		//<div class="pjsconsole"><div class="dragger"></div><div class="console">hi <br></div><div class="closer">✖</div></div>

		let elements = document.querySelectorAll(
			"span[style='position: absolute; left: 0px; opacity: 0; font-family: PjsEmptyFont, fantasy;']"
		);
		elements.forEach((element) => {
			element.remove();
		});
		let console = document.querySelector(".pjsconsole");
		if (console) {
			console.remove();
		}
	};

	onMount(() => {
		startProgram();
	});

	onDestroy(() => {
		stopProgram();
	});
</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.0/processing.js"></script>
</svelte:head>

<div class="p-2 overflow-hidden w-full">
	<canvas id="processing" class="rounded-lg" />
</div>

{#if showError}
	<Alert.Root class="m-2 w-52" variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{errorMessage}</Alert.Description>
	</Alert.Root>
{/if}
