# Lightweight verification for the marketing site.
# Product engineering gates live in getsillage/sillage.

SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

.PHONY: help check check-web check-docs check-actions

help:
	@printf '%s\n' \
		'Website verification:' \
		'  make check          install + audit + lint + typecheck + tests + build + docs' \
		'  make check-web      npm ci, dependency audit, lint, typecheck, tests, build' \
		'  make check-docs     product one-liner alignment with monorepo positioning' \
		'  make check-actions  verify GitHub Actions use immutable commit SHAs'

check: check-web check-docs

check-web:
	npm ci
	npm audit --audit-level=high
	npm run lint
	npm run typecheck
	npm test
	npm run build

check-docs: check-actions
	node scripts/check-product-blurb.mjs

check-actions:
	node scripts/check-actions-pinned.mjs
