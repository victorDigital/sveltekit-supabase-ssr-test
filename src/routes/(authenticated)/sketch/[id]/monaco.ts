import * as monaco from "monaco-editor";

// Import the workers in a production-safe way.
// This is different than in Monaco's documentation for Vite,
// but avoids a weird error ("Unexpected usage") at runtime
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

self.MonacoEnvironment = {
	getWorker: function (_: string, label: string) {
		switch (label) {
			case "json":
				return new jsonWorker();
			default:
				return new editorWorker();
		}
	},
};

monaco.editor.defineTheme("myCustomTheme", {
	base: "vs-dark", // can also be vs-dark or hc-black
	inherit: true, // can also be false to completely replace the builtin rules
	rules: [
		{
			token: "comment",
			foreground: "ffa500",
			fontStyle: "italic underline",
		},
		{ token: "comment.js", foreground: "008800", fontStyle: "bold" },
		{ token: "comment.css", foreground: "0000ff" }, // will inherit fontStyle from `comment` above
	],
	colors: {
		"editor.foreground": "#F8F8F2",
		"editor.background": "#020817",
	},
});

export default monaco;
