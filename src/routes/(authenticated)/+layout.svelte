<script lang="ts">
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	import * as Avatar from "$lib/components/ui/avatar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
</script>

<!-- <nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
	<a href="/">Home</a>
	{#if session}
		<a href="/explore">App</a>
		<a href="/self">Self</a>
		<img
			style="width: 32px; height: 32px; border-radius: 9999px;"
			src={session.user.user_metadata.avatar_url}
			alt="person_avatar" />
		<form method="POST" action="auth?/signout">
			<button>Logout</button>
		</form>
	{:else}
		<a href="/auth">Login</a>
	{/if}
</nav> -->
<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 hidden md:flex items-center">
			<a href="/explore" class="text-lg font-bold">ProcessingWeb</a>
			{#if session}
				<a href="/explore" class="ml-4">explore</a>
			{/if}
		</div>
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			{#if session}
				<!-- <Avatar.Root>
					<Avatar.Image
						src={session.user.user_metadata.avatar_url}
						alt={session.user.user_metadata.display_name ? session.user.user_metadata.display_name : "avatar"} />
					<Avatar.Fallback
						>{session.user.user_metadata.display_name
							? session.user.user_metadata.display_name[0]
							: "A"}</Avatar.Fallback>
				</Avatar.Root> -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
							<Avatar.Root>
								<Avatar.Image
									src={session.user.user_metadata.avatar_url}
									alt={session.user.user_metadata.display_name ? session.user.user_metadata.display_name : "avatar"} />
								<Avatar.Fallback
									>{session.user.user_metadata.display_name
										? session.user.user_metadata.display_name
										: "A"}</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">
									{session.user.user_metadata.display_name ? session.user.user_metadata.display_name : "Anonymous"}
								</p>
								<p class="text-xs leading-none text-muted-foreground">
									{session.user.email ? session.user.email : "-"}
								</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#if session.user.is_anonymous === false}
							<DropdownMenu.Group>
								<DropdownMenu.Item href="/sketches">View Sketches</DropdownMenu.Item>
								<DropdownMenu.Item href="/newsketch">New Sketch</DropdownMenu.Item>
								<DropdownMenu.Item>Settings</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
						{/if}
						<DropdownMenu.Item>
							<form method="POST" action="/auth?/signout">
								<button class="w-[198px] h-[20px] text-left">Logout</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</header>

<slot></slot>
