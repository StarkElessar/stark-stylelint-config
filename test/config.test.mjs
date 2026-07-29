import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";

import stylelint from "stylelint";

import config from "@stark/stylelint-config";

const fixture = (path) => fileURLToPath(new URL(`./fixtures/${path}`, import.meta.url));
const consumerConfig = fileURLToPath(
  new URL("../fixtures/consumer/stylelint.config.mjs", import.meta.url)
);

test("exports the reusable stylesheet policy", () => {
  assert.equal(config.rules["@stylistic/string-quotes"], "double");
  assert.equal(config.rules["@stylistic/indentation"], 4);
  assert.equal(config.rules["@stylistic/max-line-length"], 140);
  assert.equal(config.rules["csstools/use-logical"], true);
  assert.equal(config.rules["declaration-no-important"], true);
  assert.equal(Object.hasOwn(config.rules, "selector-class-pattern"), false);
  assert.equal(Object.hasOwn(config.rules, "selector-id-pattern"), false);
});

test("loads as a Stylelint config for CSS and SCSS", async () => {
  for (const filename of [fixture("valid/example.css"), fixture("valid/example.scss")]) {
    const resolvedConfig = await stylelint.resolveConfig(filename);

    assert.ok(resolvedConfig);
    assert.deepEqual(resolvedConfig.rules["@stylistic/indentation"], [4]);
    assert.deepEqual(resolvedConfig.rules["declaration-no-important"], [true]);
  }
});

test("accepts representative valid CSS and SCSS", async () => {
  const result = await stylelint.lint({
    files: [fixture("valid/example.css"), fixture("valid/example.scss")]
  });

  assert.equal(result.errored, false, result.report);
});

test("can be extended by its package name", async () => {
  const result = await stylelint.lint({
    configFile: consumerConfig,
    files: [fixture("valid/example.scss")]
  });

  assert.equal(result.errored, false, result.report);
});

test("reports the package's key rules and property ordering", async () => {
  const result = await stylelint.lint({
    files: [fixture("invalid/example.scss")]
  });
  const reportedRules = new Set(
    result.results.flatMap(({ warnings }) => warnings.map(({ rule }) => rule))
  );

  assert.equal(result.errored, true);
  for (const rule of [
    "@stylistic/indentation",
    "@stylistic/max-line-length",
    "@stylistic/string-quotes",
    "csstools/use-logical",
    "declaration-no-important",
    "order/properties-order"
  ]) {
    assert.ok(reportedRules.has(rule), `Expected ${rule}; received ${[...reportedRules].join(", ")}`);
  }
});
