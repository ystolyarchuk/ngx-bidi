# ngx-bidi Workspace

This repository contains the Angular workspace for the ngx-bidi library.

The actual npm package is located in:

```
projects/ngx-bidi
```

---

## Project Structure

```
/ngx-bidi
├── angular.json
├── package.json
├── tsconfig.json
├── projects/
│   └── ngx-bidi
│       ├── src/
│       ├── ng-package.json
│       ├── package.json
│       └── README.md   <-- published to npm
```

---

## Install dependencies

```bash
npm install
```

---

## Build the library

```bash
ng build ngx-bidi
```

---

## Publish to npm

```bash
cd dist/ngx-bidi
npm publish --access public
```

---

## Development

Use Angular CLI for development:

```bash
ng serve
```

---

## Notes

- The npm package README is inside `projects/ngx-bidi/README.md`
- Only files from `dist/ngx-bidi` are published
- Versioning is controlled via `projects/ngx-bidi/package.json`

---

## License

MIT
