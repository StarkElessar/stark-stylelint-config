/** @type {import("stylelint").Config} */
export default {
	extends: [
		"stylelint-config-standard-scss",
		"stylelint-config-clean-order",
		"@stylistic/stylelint-config"
	],
	ignoreFiles: [
		"**/node_modules/**",
		"**/dist/**",
		"**/build/**",
		"**/coverage/**"
	],
	overrides: [
		{
			files: ["**/*.scss"],
			customSyntax: "postcss-scss"
		}
	],
	plugins: ["stylelint-use-logical"],
	rules: {
		"@stylistic/string-quotes": "double",
		"@stylistic/indentation": 4,
		"@stylistic/max-line-length": 140,
		"csstools/use-logical": true,
		"declaration-no-important": true
	}
};
