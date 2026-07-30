#!/usr/bin/env node
/**
 * Keep the public one-line product description aligned with the monorepo positioning.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const EN_BLURB_FRAGMENTS = [
  "Self-hosted, single-user",
  "private records",
  "grounded",
];

// README and English catalog must keep the monorepo positioning phrase family.
for (const rel of ["README.md", "src/i18n/messages.ts"]) {
  const path = resolve(root, rel);
  if (!existsSync(path)) {
    failures.push(`missing ${rel}`);
    continue;
  }
  const text = readFileSync(path, "utf8");
  for (const fragment of EN_BLURB_FRAGMENTS) {
    if (!text.includes(fragment) && rel === "src/i18n/messages.ts") {
      // README may paraphrase; require full fragment set in the locale source of truth.
      failures.push(`${rel}: missing product positioning fragment: ${fragment}`);
    }
  }
  if (rel === "README.md" && !/Self-hosted|self-hosted/.test(text)) {
    failures.push(`${rel}: missing self-hosted positioning`);
  }
  if (rel === "README.md" && !/single-user|single user/i.test(text)) {
    failures.push(`${rel}: missing single-user positioning`);
  }
}

// Chinese marketing copy should keep single-user / no official hosting claims honest.
const messagesPath = resolve(root, "src/i18n/messages.ts");
if (existsSync(messagesPath)) {
  const messages = readFileSync(messagesPath, "utf8");
  if (!/single-user|单人|单用户/.test(messages)) {
    failures.push("src/i18n/messages.ts: expected single-user positioning in locale catalogs");
  }
  // Do not claim official hosting as a product feature (negation lines are fine).
  for (const line of messages.split(/\r?\n/)) {
    if (/不提供|不属于|不是|并非|无官方|non-hosted|no official|not provide|outside/i.test(line)) {
      continue;
    }
    if (/官方托管/.test(line)) {
      failures.push(`possible official-hosting claim: ${line.trim().slice(0, 100)}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Product blurb checks passed.");
