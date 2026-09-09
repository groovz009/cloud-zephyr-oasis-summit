//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-COie41_3.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: ["/", "/read"],
		preloads: ["/assets/index-0RduecKj.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-0RduecKj.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-BtRBskVn.js"]
	},
	"/read": {
		filePath: "/workspace/src/routes/read.tsx",
		children: ["/read/$id"],
		preloads: ["/assets/read-D_I-2B80.js", "/assets/print-reader-B59Cfn2U.js"]
	},
	"/read/$id": {
		filePath: "/workspace/src/routes/read.$id.tsx",
		children: void 0,
		preloads: ["/assets/read._id-CopT_0ni.js"]
	}
} });
//#endregion
export { tsrStartManifest };
