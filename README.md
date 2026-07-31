# @stark/stylelint-config

Private reusable Stylelint 17 configuration for CSS and SCSS only. It can be
installed directly from Git without publishing it to a package registry.

## What it enforces

- the standard SCSS rules and `postcss-scss` syntax;
- a consistent property order;
- logical CSS properties;
- double-quoted strings;
- four-space indentation;
- a 140-character line limit;
- no `!important`.

It intentionally defines no selector naming, BEM, CSS Modules, or legacy
compatibility exceptions. Add those in the consuming project if needed.

Stylelint owns only CSS and SCSS. ESLint Stylistic remains responsible for
formatting JavaScript, TypeScript, JSX, and TSX.

## Requirements

- Node.js 20.19 or newer;
- Stylelint 17.6 or newer within the Stylelint 17 major.

## Install from Git

Install Stylelint as the consumer-owned peer and this package from the
repository. Pin a reviewed commit or tag for reproducible installs:

```sh
npm install --save-dev stylelint@^17.6.0 \
  "git+ssh://git@github.com/<owner>/stark-stylelint-config.git#<commit-or-tag>"
```

The dependency appears in `package.json` under its declared package name:

```json
{
  "devDependencies": {
    "@stark/stylelint-config": "git+ssh://git@github.com/<owner>/stark-stylelint-config.git#<commit-or-tag>",
    "stylelint": "^17.6.0"
  }
}
```

Replace the example host, owner, and revision with the eventual repository
location. The package remains marked `private` to prevent accidental registry
publication; this does not prevent installation from Git.

## Consumer configuration

Create `stylelint.config.mjs`:

```js
/** @type {import("stylelint").Config} */
export default {
	extends: ["@stark/stylelint-config"]
};
```

Target only stylesheet extensions in consumer scripts:

```json
{
  "scripts": {
    "lint:css": "stylelint \"**/*.{css,scss}\"",
    "lint:css:fix": "stylelint \"**/*.{css,scss}\" --fix"
  }
}
```

Project-specific rules can be layered on top:

```js
/** @type {import("stylelint").Config} */
export default {
	extends: ["@stark/stylelint-config"],
	ignoreFiles: ["vendor/**/*.scss"],
	rules: {
		"selector-class-pattern": "^[a-z][a-z0-9-]*$"
	}
};
```

## Package development

```sh
npm install
npm run check
```

`npm run check` lints known-good CSS/SCSS fixtures, runs the configuration
tests, and verifies the Git-installable package contents with a dry-run pack.
