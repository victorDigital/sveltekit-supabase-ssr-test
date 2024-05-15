<script lang="ts">
	import type { PageData } from "./$types";
	import * as Card from "$lib/components/ui/card";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import Button from "$lib/components/ui/button/button.svelte";

	export let data: PageData;
	let sketches = data.sketches;
	if (!sketches) sketches = [];

	let featuredSketch: (typeof sketches)[0];
	if (sketches?.length > 1) {
		featuredSketch = sketches[0];
		sketches = sketches.slice(1);
	}
	console.log(data);
</script>

<div class="container mx-auto mt-20">
	<div class="flex justify-between md:px-10 items-center">
		<h2 class="text-3xl font-bold">Explore</h2>
	</div>
</div>

{#if featuredSketch}
	<div class="container mx-auto mt-10">
		<Card.Root>
			<Card.Header>
				<Card.Title>Featured Sketch</Card.Title>
				<Card.Description>This week's featured sketch is...</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>{featuredSketch.title}</p>
				<p>by: {featuredSketch.created_by_display_name}</p>
			</Card.Content>
			<Card.Footer>
				<Button href="/sketch/{featuredSketch.id}/view">View Code</Button>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}

{#if sketches.length > 0}
	<div class="container mx-auto mt-10">
		<h2 class="mt-20 mb-6 text-2xl">Recently Uploaded Sketches</h2>
		<Carousel.Root>
			<Carousel.Content>
				{#each sketches as sketch}
					<Carousel.Item class="basis-1/3">
						<Card.Root>
							<Card.Header>
								<Card.Title>{sketch.title}</Card.Title>
								<Card.Description>by: {sketch.created_by_display_name}</Card.Description>
							</Card.Header>
							<Card.Content></Card.Content>
							<Card.Footer>
								<Button href="/sketch/{sketch.id}/view">View Code</Button>
							</Card.Footer>
						</Card.Root>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>
{/if}
