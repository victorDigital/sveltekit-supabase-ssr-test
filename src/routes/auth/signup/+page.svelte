<script lang="ts">
	export let form;
</script>

<form method="POST" action="?/signin">
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
{/if}
