export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.DDw3qHDJ.js","app":"_app/immutable/entry/app.x0MIonw4.js","imports":["_app/immutable/entry/start.DDw3qHDJ.js","_app/immutable/chunks/entry.CgDoXvOH.js","_app/immutable/chunks/runtime.DOfOf6MH.js","_app/immutable/entry/app.x0MIonw4.js","_app/immutable/chunks/runtime.DOfOf6MH.js","_app/immutable/chunks/render.BS5Zx4HV.js","_app/immutable/chunks/disclose-version.C8yWjxTa.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
