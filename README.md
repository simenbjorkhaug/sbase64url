# sbase64url

A simple package for encoding and decoding string to base64url representation.

## Usage

```typescript
import { decodeBase64url, encodeBase64url } from '@bjorkhaug/sbase64url'

const encoded = encodeBase64url('Hello world')
const decoded = decodeBase64url(encoded) // === "Hello world"
```
