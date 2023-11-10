import { decodeBase64url, encodeBase64url } from '../src/base64url.ts'
import { assertEquals } from 'https://deno.land/std@0.205.0/assert/assert_equals.ts'

Deno.test('encodeBase64url should correctly encode a string', () => {
  const text = 'Hello, World!'
  const encoded = encodeBase64url(text)
  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ', 'String encoding failed')
})

Deno.test('decodeBase64url should correctly decode a base64url string', () => {
  const base64url = 'SGVsbG8sIFdvcmxkIQ'
  const decoded = decodeBase64url(base64url)
  assertEquals(decoded, 'SGVsbG8sIFdvcmxkIQ==', 'String decoding failed')
})

Deno.test('encodeBase64url should correctly encode a Uint8Array', () => {
  const uint8Array = new TextEncoder().encode('Hello, World!')
  const encoded = encodeBase64url(uint8Array)
  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ', 'Uint8Array encoding failed')
})

Deno.test('decodeBase64url should handle padded and unpadded input equally', () => {
  const padded = 'SGVsbG8sIFdvcmxkIQ=='
  const unpadded = 'SGVsbG8sIFdvcmxkIQ'
  const decodedPadded = decodeBase64url(padded)
  const decodedUnpadded = decodeBase64url(unpadded)
  assertEquals(decodedPadded, decodedUnpadded, 'Padding handling failed')
})
