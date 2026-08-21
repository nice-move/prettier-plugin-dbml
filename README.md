# prettier-plugin-dbml

A [prettier] plugin for [DBML].

[prettier]: https://prettier.io/
[dbml]: https://www.dbml.org/

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/prettier-plugin-dbml
[npm-badge]: https://img.shields.io/npm/v/prettier-plugin-dbml.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/prettier-plugin-dbml
[github-badge]: https://img.shields.io/npm/l/prettier-plugin-dbml.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/prettier-plugin-dbml.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install prettier-plugin-dbml --save-dev
```

## Usage

```sh
prettier --write *.dbml
```

## Known Issues

- Comments will be removed.

## Compatibility Workarounds

The DBML parser and exporter currently have a few limitations that require
small workarounds in this plugin:

- `@dbml/core` resolves table aliases to their original table names when
  exporting references. The plugin post-processes `Ref` lines to restore the
  aliases without modifying the parsed AST, which could otherwise affect the
  table declarations themselves.
- `ModelExporter` does not include the top-level `Project` block in its DBML
  output. The plugin rebuilds it from the project name, database type, and
  note stored in the AST.
- `ModelExporter` emits quoted identifiers and may omit the space after
  `Ref:`. The plugin removes quotes around identifiers while preserving quoted
  string values, and normalizes `Ref:` spacing to keep the output consistent
  with regular DBML syntax.
- Line comments are discarded by the DBML parser and are therefore not
  available in the AST. They cannot be restored by the plugin and are removed
  during formatting.

## Related

- [@nice-move/prettier-config](https://github.com/nice-move/nice-move/tree/master/packages/prettier-config)
- [@nice-move/prettier-plugin-package-json](https://github.com/nice-move/prettier-plugin-package-json)
- [@nice-move/prettier-plugin-ssh-config](https://github.com/nice-move/prettier-plugin-ssh-config)
