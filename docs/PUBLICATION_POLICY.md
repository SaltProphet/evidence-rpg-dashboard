# EvidenceRPG Publication Policy

## Purpose

EvidenceRPG maintains a deliberate boundary between its private
operational state and its public representation.

The private repository is canonical.

The public repository contains only information intentionally approved
for public disclosure.

## Default rule

**Private unless deliberately published.**

A file, field, evidence record, project reference, metric, or campaign
state does not become public merely because the application knows it
exists.

## Never publish automatically

The following require explicit review before publication:

- credentials or authentication material
- environment files
- API keys or tokens
- raw evidence records
- personally identifying information
- private project records
- private financial records
- private correspondence
- local databases
- unpublished evidence artifacts
- machine-local configuration

## Public-safe material

The public edition may contain:

- EvidenceRPG methodology
- competency definitions
- evidence-state definitions
- intentionally published evidence gates
- sanitized campaign information
- public case studies
- deliberately released evidence
- system architecture intended for public inspection

## Promotion procedure

Private-to-public promotion is manual in v0.1.x.

Before publication:

1. Identify the exact material being promoted.
2. Review it for personal, financial, security, and operational disclosure.
3. Remove or generalize information that isn't intended for publication.
4. Build the public application.
5. Review the resulting public artifact.
6. Commit only the approved representation.

Automatic publication of private campaign data is explicitly out of
scope for v0.1.x.
