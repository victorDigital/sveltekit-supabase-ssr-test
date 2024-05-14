<script lang="ts">
	import type { PageData } from "./$types";
	import * as Table from "$lib/components/ui/table";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Play, Trash } from "svelte-radix";
	import { enhance } from "$app/forms";

	export let data: PageData;
	console.log(data);
</script>

<div class="container mx-auto mt-20">
	<div class="flex justify-between md:px-10 items-center">
		<h1 class="text-3xl font-bold">Your sketches</h1>
		<Button href="/newsketch">New sketch</Button>
	</div>
</div>

<div class="container mx-auto mt-20">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head><span class="sr-only">open sketch</span></Table.Head>
				<Table.Head>Sketch title</Table.Head>
				<Table.Head>Created at</Table.Head>
				<Table.Head>Updated at</Table.Head>
				<Table.Head>Visibility</Table.Head>
				<!-- <Table.Head class="w-10">Views</Table.Head> -->
				<Table.Head class="w-10">Likes</Table.Head>
				<Table.Head><span class="sr-only">Actions</span></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.sketches as sketch}
				<Table.Row>
					<Table.Cell>
						<Button variant="ghost" size="sm" href="/sketch/{sketch.id}">
							<Play class="size-4" />
						</Button>
					</Table.Cell>
					<Table.Cell>{sketch.title}</Table.Cell>
					<Table.Cell>{new Date(sketch.created_at).toDateString()}</Table.Cell>
					<Table.Cell>{new Date(sketch.last_saved).toDateString()}</Table.Cell>
					<Table.Cell>{sketch.is_public ? "Public" : "Private"}</Table.Cell>
					<!-- <Table.Cell>{sketch.views}</Table.Cell> -->
					<Table.Cell>{sketch.likes}</Table.Cell>
					<Table.Cell>
						<Dialog.Root>
							<Dialog.Trigger><Button variant="destructive" size="sm"><Trash class="size-4" /></Button></Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
									<Dialog.Description>
										This action cannot be undone. This will permanently delete your sketch from our servers. This cannot
										be undone.
									</Dialog.Description>
									<Dialog.Footer>
										<Dialog.Close>
											<form action="?/delete" method="post" use:enhance>
												<input type="hidden" name="sketch_id" value={sketch.id} />
												<Button type="submit" variant="destructive">Yes, delete!</Button>
											</form>
										</Dialog.Close>
										<Dialog.Close>
											<Button>Keep</Button>
										</Dialog.Close>
									</Dialog.Footer>
								</Dialog.Header>
							</Dialog.Content>
						</Dialog.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
