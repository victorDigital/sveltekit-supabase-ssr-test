<script lang="ts">
	import type { PageData } from "./$types";
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Switch } from "$lib/components/ui/switch/index.js";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Play, Stop, Update, Upload } from "svelte-radix";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import { onDestroy, onMount } from "svelte";
	import LayoutIcons from "$lib/components/LayoutIcons.svelte";
	import type { PaneAPI } from "paneforge";
	import { mode } from "mode-watcher";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/ui/input/input.svelte";
	import SketchViewer from "$lib/components/SketchViewer.svelte";

	export let data: PageData;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	const decodedSketch = atob(data.sketch?.sketch_b64 ?? "");
	let sketch = decodedSketch;
	let sketchTitle = data.sketch?.title ?? "";
	let sketchIsPublic = data.sketch?.is_public;

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import("./monaco")).default;

		// Your monaco instance is ready, let's display some code!
		const editor = monaco.editor.create(editorContainer, {
			value: sketch,
			automaticLayout: true,
			theme: $mode == "dark" ? "myCustomTheme" : "vs",
			wrappingStrategy: "advanced",
			wordWrap: "on",
		});
		const model = monaco.editor.createModel(sketch, "java");
		editor.onDidChangeModelContent(() => {
			sketch = editor.getValue();
		});
		editor.setModel(model);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

	let layoutState = 2;
	let savingState = false;
	let sketchState: "playing" | "stopped" = "stopped";
	let editorPane: PaneAPI;
	let viewerPane: PaneAPI;

	function updateLayout(state: number) {
		layoutState = state;

		if (!editorPane || !viewerPane) return;

		if (layoutState === 1) {
			editorPane.collapse();
			viewerPane.expand();
		} else if (layoutState === 2) {
			editorPane.expand();
			viewerPane.expand();
		} else if (layoutState === 3) {
			editorPane.expand();
			viewerPane.collapse();
		}
	}

	function isInMiddle() {
		editorPane.isExpanded() && viewerPane.isExpanded() ? (layoutState = 2) : null;
	}

	async function handleSave() {
		const form = new FormData();
		let encodedSketch = btoa(sketch);
		form.append("sketch", encodedSketch);
		form.append("is_public", sketchIsPublic ? "public" : "private");
		form.append("sketch_title", sketchTitle);
		form.append("sketch_id", data.sketch?.id ?? "");
		savingState = true;
		const res = await fetch("?/save", {
			method: "POST",
			body: form,
		});
		//get the encoded sketch from the response
		const test = await res.json();
		sketch = atob(JSON.parse(test.data)[1]);
		console.log(sketch);
		const pos = monaco.editor.getModels()[0].getPositionAt(0);
		monaco.editor.getModels()[0].setValue(sketch);
		savingState = false;
	}

	function onKeyDown({ key, ctrlKey, repeat }: { key: string; ctrlKey: boolean; repeat: boolean }) {
		if (repeat) return;
		if (ctrlKey && key === "s") {
			if (!event) return;
			event.preventDefault();
			handleSave();
		}
	}
</script>

<div class="flex gap-4 p-4">
	<Button
		on:click={() => {
			sketchState = "playing";
		}}
		size="lg"
		class="px-4"
		variant={sketchState == "playing" ? "default" : "secondary"}><Play /></Button>
	<Button
		on:click={() => {
			sketchState = "stopped";
		}}
		size="lg"
		class="px-4"
		variant={sketchState == "stopped" ? "default" : "secondary"}><Stop /></Button>
	<!-- <div class="flex items-center space-x-2">
		<Switch id="auto-save" />
		<Label for="auto-save">Auto Save</Label>
	</div> -->
	<div class="flex items-center space-x-2">
		<Switch bind:checked={sketchIsPublic} />
		<Label for="auto-save">Public</Label>
	</div>
	<Input type="text" class="max-w-36" bind:value={sketchTitle} />
	<div class="flex flex-1 items-center space-x-2 justify-end">
		<form action="?/save" method="post" on:submit|preventDefault={handleSave}>
			<Button type="submit" size="icon" variant="outline">
				{#if savingState}
					<Update class="animate-spin" />
				{:else}
					<Upload />
				{/if}
			</Button>
		</form>
		<div class="border-border border-[1px] space-x-1 flex items-center p-1 rounded-2xl">
			<Button
				variant={layoutState == 1 ? "secondary" : "ghost"}
				size="sm"
				class="p-1.5"
				on:click={() => {
					updateLayout(1);
				}}>
				<LayoutIcons variant={0} />
			</Button>
			<Button
				variant={layoutState == 2 ? "secondary" : "ghost"}
				size="sm"
				class="p-1.5"
				on:click={() => {
					updateLayout(2);
				}}>
				<LayoutIcons variant={1} />
			</Button>
			<Button
				variant={layoutState == 3 ? "secondary" : "ghost"}
				size="sm"
				class="p-1.5"
				on:click={() => {
					updateLayout(3);
				}}>
				<LayoutIcons variant={2} />
			</Button>
		</div>
	</div>
</div>

<Resizable.PaneGroup
	direction="horizontal"
	class="h-[calc(100vh-136px)]"
	autoSaveId={data.sketch?.id}
	onLayoutChange={isInMiddle}>
	<Resizable.Pane
		collapsible={true}
		minSize={40}
		collapsedSize={10}
		bind:pane={editorPane}
		onCollapse={() => (layoutState = 1)}>
		<div class="h-[calc(100vh-136px)] border-border border-[1px]" bind:this={editorContainer} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane
		minSize={10}
		collapsible={true}
		collapsedSize={5}
		bind:pane={viewerPane}
		onCollapse={() => (layoutState = 3)}>
		{#if sketchState == "playing"}
			<SketchViewer {sketch} showCanvas={sketchState == "playing"} />
		{/if}
	</Resizable.Pane>
</Resizable.PaneGroup>

<svelte:window on:keydown={onKeyDown} />
