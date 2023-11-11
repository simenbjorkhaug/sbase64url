import { decodeBase64, encodeBase64 } from './base64.ts'

/**
 * Accepts a string value and creates a base64url value
 *
 * @param value - a base64 value
 *
 * @returns a base64url value
 */
export function encodeBase64url(
  data: string | ArrayBuffer | Uint8Array,
): string {
  return encodeBase64(data)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Accepts a base64url and converts it to base64 representation
 *
 * @param value - a base64url value
 *
 * @returns a base64 value
 */
export function decodeBase64url(value: string): Uint8Array {
  let base64url = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const padding = 4 - (base64url.length % 4)

  if (padding !== 4) {
    base64url += '='.repeat(padding)
  }

  return decodeBase64(base64url)
}
