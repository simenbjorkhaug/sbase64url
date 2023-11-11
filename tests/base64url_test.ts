import {
  decodeBase64,
  decodeBase64url,
  encodeBase64,
  encodeBase64url,
} from '../mod.ts'
import { assertEquals } from 'https://deno.land/std@0.205.0/assert/assert_equals.ts'

Deno.test('encodeBase64url should correctly encode a string', () => {
  const text = 'Hello, World!'
  const encoded = encodeBase64url(text)
  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ', 'String encoding failed')
})

Deno.test('decodeBase64url should correctly decode a base64url string', () => {
  const base64url = 'SGVsbG8sIFdvcmxkIQ'
  const decoded = decodeBase64url(base64url)

  assertEquals(
    new TextDecoder().decode(decoded),
    'Hello, World!',
    'String decoding failed',
  )
})

Deno.test('encodeBase64 should correctly encode a string', () => {
  const text = 'Hello, World!'
  const encoded = encodeBase64(text)

  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ==', 'String encoding failed')
})

Deno.test('decodeBase64 should correctly decode a base64 string', () => {
  const base64 = 'SGVsbG8sIFdvcmxkIQ=='
  const decoded = decodeBase64(base64)

  assertEquals(
    new TextDecoder().decode(decoded),
    'Hello, World!',
    'String decoding failed',
  )
})
