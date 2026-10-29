# EvidenceRPG

EvidenceRPG is an evidence-governed professional-development system.

Instead of treating activity, time spent, or self-assessment as proof
of capability, EvidenceRPG models progression around inspectable evidence.

## Governing rule

> XP measures activity. Evidence determines level.

## Evidence states

1. **Practiced** - capability has been exercised.
2. **Documented** - inspectable documentation exists.
3. **Validated** - work has been evaluated against defined criteria.
4. **Verified** - outside review, reproduction, evaluation, or equivalent external evidence exists.

## Repository role

This repository contains the public EvidenceRPG dashboard and only
material intentionally approved for public disclosure.

It is not the canonical operational repository.

The canonical EvidenceRPG system is maintained privately. Material is
promoted to this repository only after explicit disclosure review.

See: `docs/PUBLICATION_POLICY.md`

## Architecture

The interface and campaign state are separated:

```text
React UI
   |
   +-- src/App.tsx
   |
   +-- src/data/campaign.ts
```

This boundary allows separate public and private disclosure profiles
without embedding campaign state directly inside the interface.

## Development

```powershell
npm install
npm run dev
```

Production build:

```powershell
npm run build
```

## Deployment

Public dashboard: https://rpg.secpriva.com

## Version

Current infrastructure baseline: **v0.1.0**
