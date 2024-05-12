<script lang="ts">
	export let form;
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { EyeClosed, GithubLogo } from "svelte-radix";
	import { Input } from "$lib/components/ui/input";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Alert from "$lib/components/ui/alert";
	import { Label } from "$lib/components/ui/label";
</script>

<!-- <form method="POST" action="?/signin">
	<input name="username" placeholder="username" type="text" value={form?.data?.userName ?? ""} />
	<input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""} />
	<input name="password" placeholder="password" type="password" />
	<button formaction="?/signup" style="margin-top: 12px;">Signup</button>
</form>
<form method="POST" action="?/oauth">
	<button style="margin-top: 12px;" name="provider" value="github">Login with GitHub</button>
</form>
<form method="POST" action="?/anon">
	<button style="margin-top: 12px;">Login Anonymously</button>
</form>

<a href="/auth">Already have an account? Login</a>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if} -->

<div class="flex w-full flex-col items-center justify-center h-dvh gap-4">
	<Card.Root class="max-w-sm w-full">
		<form method="POST" action="?/signup">
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Create ProcessingWeb account</Card.Title>
				<Card.Description>Enter your email and password to sign in</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid grid-cols-2 gap-6">
					<form method="POST" action="?/oauth" class="w-full">
						<button
							class="p-2 h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
							name="provider"
							value="github">
							<GithubLogo class="mr-2 h-4 w-4" />
							GitHub
						</button>
					</form>
					<form method="POST" action="?/anon" class="w-full">
						<Tooltip.Root openDelay={0}>
							<Tooltip.Trigger>
								<button
									class="p-2 h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
									<EyeClosed class="mr-2 h-4 w-4" />
									Anonymously
								</button>
							</Tooltip.Trigger>
							<Tooltip.Content class="w-44">
								<p>Sign in without creating an account, this limits your access to some features</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</form>
				</div>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input
						name="username"
						placeholder="username"
						type="text"
						value={form?.data?.userName ?? ""}
						autocomplete="nickname" />
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""} autocomplete="email" />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input name="password" placeholder="password" type="password" autocomplete="new-password" />
				</div>
			</Card.Content>
			<Card.Footer class="flex-col gap-4">
				<div class="w-full">
					{#if form?.message}
						<Alert.Root class="w-full">
							<Alert.Title>{form.message}</Alert.Title>
						</Alert.Root>
					{/if}
				</div>
				<div class="w-full">
					{#if form?.error}
						<Alert.Root variant="destructive" class="w-full">
							<Alert.Title>{form.error}</Alert.Title>
						</Alert.Root>
					{/if}
				</div>
				<button
					class="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					>Sign up</button>
			</Card.Footer>
		</form>
	</Card.Root>
	<Card.Root class="max-w-sm w-full">
		<Card.Header>
			<Card.Title>Already have an account?</Card.Title>
			<Card.Description>Log in instead!</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button href="/auth" variant="outline">Log in</Button>
		</Card.Footer>
	</Card.Root>
</div>
