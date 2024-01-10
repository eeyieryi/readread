import { Config } from "tailwindcss";
import { Config as DaisyUIConfig } from "daisyui";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		logs: false,
		darkTheme: "nord",
		themes: ["nord"],
	},
} satisfies Config & {
	daisyui: DaisyUIConfig;
};
