"use client";

import input from "./components/inputs";
import notification from "./components/notification";
import container from "./components/container";
import title from "./components/title";
import text from "./components/text";

import {
	Autocomplete,
	Badge,
	Button,
	CSSVariablesResolver,
	Container,
	Divider,
	NavLink,
	Notification,
	NumberInput,
	PasswordInput,
	Select,
	Text,
	TextInput,
	Textarea,
	Title,
	createTheme,
	rem,
} from "@mantine/core";
import divider from "./components/divider";
import navlink from "./components/navlink";

const projectName = createTheme({
	focusRing: "auto",
	focusClassName: "focus",
	activeClassName: "active",
	colors: {
		pri: [
			"#e1ffe1",
			"#b4fcb4",
			"#85f885",
			"#56f556",
			"#2af228",
			"#14d911",
			"#0aa90a",
			"#037905",
			"#004800",
			"#001900",
		],
	},
	primaryColor: "pri",
	primaryShade: { light: 6, dark: 6 },
	defaultGradient: {
		from: "pri",
		to: "sec",
		deg: 45,
	},
	defaultRadius: "md",
	autoContrast: true,
	luminanceThreshold: 0.3,
	// fontFamily: "Arial, sans-serif",
	// fontFamilyMonospace: "Courier New, monospace",
	fontSmoothing: true,
	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),

		// additional
		xxl: "2rem",
	},
	lineHeights: {
		xs: "1.4",
		sm: "1.45",
		md: "1.55",
		lg: "1.6",
		xl: "1.65",
	},
	headings: {
		// properties for all headings
		fontWeight: "bold",
		fontFamily: "Roboto",

		// properties for individual headings, all of them are optional
		sizes: {
			h1: {
				fontSize: "2rem",
				lineHeight: "1.5",
			},
			h2: {
				fontSize: "1.5rem",
				lineHeight: "1.6",
			},
		},
	},
	spacing: {
		xs: rem(10),
		sm: rem(12),
		md: rem(16),
		lg: rem(20),
		xl: rem(32),
	},
	cursorType: "pointer",
	components: {
		PasswordInput: PasswordInput.extend(input.password),
		Select: Select.extend(input.select),
		Autocomplete: Autocomplete.extend(input.autocomplete),
		TextInput: TextInput.extend(input.text),
		NumberInput: NumberInput.extend(input.number),
		Textarea: Textarea.extend(input.textarea),
		Title: Title.extend(title),
		Divider: Divider.extend(divider),
		Text: Text.extend(text),
		Container: Container.extend(container),
		Notification: Notification.extend(notification),
		NavLink: NavLink.extend(navlink),
	},

	// other: {
	// 	priDark: "#004800",
	// 	bodyDark: "#001900",
	// },
});

// override mantine css variable defaults
export const resolver: CSSVariablesResolver = theme => ({
	variables: {},
	light: {
		// "--mantine-color-default-border": theme.other.deepOrangeLight,
	},
	dark: {
		// "--mantine-color-body": theme.other.bodyDark,
		// "--mantine-color-default-border": theme.other.priDark,
	},
});

export default projectName;
