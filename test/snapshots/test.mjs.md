# Snapshot report for `test/test.mjs`

The actual snapshot is saved in `test.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## format by filename

> prettier 3

    `Enum "aas" {␊
      "n" [note: 'sds']␊
    }␊
    ␊
    Table "buildings" {␊
      "address" varchar(255) [unique, not null, note: 'to include "unit" number']␊
      "id" integer [unique, pk, default: 123]␊
      "port" integer [note: 'dsdsds']␊
      Note: '''This is a block string␊
    This string can spans over multiple lines.␊
    '''␊
    }␊
    `

## format by parser

> prettier 3

    `Enum "aas" {␊
      "n" [note: 'sds']␊
    }␊
    ␊
    Table "buildings" {␊
      "address" varchar(255) [unique, not null, note: 'to include "unit" number']␊
      "id" integer [unique, pk, default: 123]␊
      "port" integer [note: 'dsdsds']␊
      Note: '''This is a block string␊
    This string can spans over multiple lines.␊
    '''␊
    }␊
    `

## format in markdown

> prettier 3

    `\`\`\`dbml␊
    Enum "aas" {␊
      "n" [note: 'sds']␊
    }␊
    ␊
    Table "buildings" {␊
      "address" varchar(255) [unique, not null, note: 'to include "unit" number']␊
      "id" integer [unique, pk, default: 123]␊
      "port" integer [note: 'dsdsds']␊
      Note: '''This is a block string␊
    This string can spans over multiple lines.␊
    '''␊
    }␊
    \`\`\`␊
    `
