# @presenter/schemas

Schema definitions for presenter. Includes client and server schemas, default values, and migration logic.

## Features

- Type-safe settings schemas using Valibot
- Versioned settings with automatic migration
- Separate client and server settings
- Default values for all settings

## Usage

### Parsing Settings

The `parse` function validates and parses settings data against a schema:

```typescript
import { parse, definitions } from '@presenter/schemas'

const settings = parse(definitions.clientSettings, rawData)
```

### Migrating Settings

The migrate function handles upgrading settings data from previous versions:

```typescript
import { migrate, definitions } from '@presenter/schemas'

const { version, ...settings } = migrate(definitions.clientSettings, data, dataVersion)
```

**The migration system will automatically chain migrations when upgrading across multiple versions.** So, if you have a user on v1, and the latest schema is on v6, the user will be upgraded through v2, v3, v4, and v5, ending on v6.

## Creating New Schema Versions

1. Create a new schema file (e.g. `v2.ts`)
2. Use `defineSchema` to define the new schema structure, the version, and the previous version
3. Provide an `up` function that maps old settings to the new format
4. Reference the new schema in the `index.ts` file

Example schema definition:

```typescript
import { fallback, object, string, boolean } from 'valibot'
import { defineSchema } from '@presenter/schemas'

import v1 from './v1'

export default defineSchema({
  version: 2,
  previous: v1,
  schema: object({
    // New schema definition
    newSetting: fallback(boolean(), false),
    existingSetting: fallback(string(), 'test'),
  }),
  up: (from) => ({
    // Map previous settings to new format defined in schema
    newSetting: false,
    existingSetting: from.existingSetting,
  }),
})
```

Key points:

- Use `fallback()` to provide default values
- Define type-safe schemas using Valibot
- Include an `up()` function to handle migration from previous version
- Set `previous` to link to the prior schema version
