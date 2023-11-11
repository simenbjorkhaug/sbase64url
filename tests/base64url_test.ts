import {
  decodeBase64,
  decodeBase64url,
  encodeBase64,
  encodeBase64url,
} from '../mod.ts'
import { assertEquals } from 'https://deno.land/std@0.205.0/assert/assert_equals.ts'

Deno.test('encodeBase64url should correctly encode a string', () => {
  const text = 'Hello, World!'
  const encoded = encodeBase64url(encodeBase64(text))
  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ', 'String encoding failed')
})

Deno.test('decodeBase64url should correctly decode a base64url string', () => {
  const base64url = 'SGVsbG8sIFdvcmxkIQ'
  const decoded = decodeBase64url(base64url)
  assertEquals(decoded, 'SGVsbG8sIFdvcmxkIQ==', 'String decoding failed')
})

Deno.test('decodeBase64url should handle padded and unpadded input equally', () => {
  const padded = 'SGVsbG8sIFdvcmxkIQ=='
  const unpadded = 'SGVsbG8sIFdvcmxkIQ'
  const decodedPadded = decodeBase64url(padded)
  const decodedUnpadded = decodeBase64url(unpadded)
  assertEquals(decodedPadded, decodedUnpadded, 'Padding handling failed')
})

Deno.test('encodeBase64 should correctly encode a string', () => {
  const text = 'Hello, World!'
  const encoded = encodeBase64(text)
  assertEquals(encoded, 'SGVsbG8sIFdvcmxkIQ==', 'String encoding failed')
})

Deno.test('decodeBase64 should correctly decode a base64 string', () => {
  const base64 = 'SGVsbG8sIFdvcmxkIQ=='
  const decoded = decodeBase64(base64)
  assertEquals(decoded, 'Hello, World!', 'String decoding failed')
})

Deno.test('An encodedbase64 to base64url and back should be equal', () => {
  const base64 = 'SGVsbG8sIFdvcmxkIQ=='
  const base64url = encodeBase64url(base64)
  const decoded = decodeBase64url(base64url)
  assertEquals(base64, decoded, 'Encoding and decoding failed')
})

Deno.test('A string to base64 to base64url to base64 to string should be equal', () => {
  const text = 'Hello, World!'
  const base64 = encodeBase64(text)
  const base64url = encodeBase64url(base64)
  const decodedBase64 = decodeBase64url(base64url)
  const decodedText = decodeBase64(decodedBase64)
  assertEquals(text, decodedText, 'Encoding and decoding failed')
})
