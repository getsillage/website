# Lightweight verification for the marketing site.
# Product engineering gates live in getsillage/sillage.

SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c

.PHONY: help check check-web check-docs

help:
	@printf '%s\n' \
		'Website verification:' \
		'  make check       lint + typecheck + build + product blurb check' \
		'  make check-web   npm ci, lint, typecheck, build' \
		'  make check-docs  product one-liner alignment with monorepo positioning'

check: check-web check-docs

check-web:
	npm ci
	npm run lint
	npm run typecheck
	npm run build

check-docs:
	node scripts/check-product-blurb.mjs
