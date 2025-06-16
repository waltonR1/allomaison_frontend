# allomaison\_frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

---

## JSON Server Setup (Mock Backend)

⚠️ Since the real backend is not yet implemented, this project uses [json-server](https://github.com/typicode/json-server) to simulate API requests using a `db.json` file.

### Install JSON Server

Install globally with:

```bash
npm install -g json-server
```

### Start JSON Server

From the root directory of the project, run:

```bash
json-server --watch db.json
```

This will launch a local mock API based on the content of `db.json`.

---

## Admin Login and Test Accounts

The login feature uses hardcoded user data from `db.json`. Use the following credentials to test different user roles:

### Admin Login URL

```
http://localhost:5173/adminLogin
```

### Test Accounts(if you use json-server)

| Role     | Email                                               | Password |
| -------- | --------------------------------------------------- | -------- |
| Admin    | [admin@example.com](mailto:admin@example.com)       | 123456   |
| Provider | [provider@example.com](mailto:provider@example.com) | 123456   |
| Customer | [customer@example.com](mailto:customer@example.com) | 123456   |
