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

## Examples

```dbml
Table buildings {
  address varchar(255) [unique, not null, note: 'to include unit number']
  id integer [ pk, unique, default: 123 ]
}
```

## Installation

```bash
npm install prettier-plugin-dbml --save-dev
```

## Usage

```sh
prettier --write *.dbml
```

# Known Issues

- Project Definition will be removed, see: https://github.com/holistics/dbml/issues/285
- All String can't include single quotes
- Comments will be removed

## Related

- [@nice-move/prettier-config](https://github.com/nice-move/nice-move/tree/master/packages/prettier-config)
- [@nice-move/prettier-plugin-package-json](https://github.com/nice-move/prettier-plugin-package-json)
- [@nice-move/prettier-plugin-ssh-config](https://github.com/nice-move/prettier-plugin-ssh-config)
