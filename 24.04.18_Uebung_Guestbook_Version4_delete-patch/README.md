# Plan

1. Datenmodell
2. Endpoints
3. Server aufsetzen
4. Frontend aufsetzen

## Datenmodell

Gästebucheintrags-Formular:

- name
- surname
- email
- message

## Endpoints

- POST /api/v1/entries/
- GET /api/v1/entries/
- POST /api/v1/files/upload
- PATCH /api/v1/emtries/:id
- DELETE /api/v1/emtries/:id

## 4. Frontend

- HomePage.jsx mit Fetch
  - AddNewEntry.jsx mit Upload/POST-Fetch
  - RenderEntries.jsx
