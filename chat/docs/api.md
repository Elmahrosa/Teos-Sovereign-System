# TEOS Chat Sovereign API Documentation

## Authentication
All requests to the registry must include a TEOS Sovereign JWT in the Authorization header.

## Endpoints
- `GET /api/v1/identity/:handle`: Resolve a public identity.
- `POST /api/v1/registry/keys`: Upload new pre-key bundles (X3DH).
- `POST /api/v1/relay/message`: Relay an encrypted message blob.