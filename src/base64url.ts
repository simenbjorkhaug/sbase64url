/**
 * Accepts a base64 value and creates a base64url value
 *
 * @param value - a base64 value
 *
 * @returns a base64url value
 */
export function encodeBase64url(value: string): string {
  return value
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
export function decodeBase64url(value: string): string {
  let base64 = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const padding = 4 - (base64.length % 4)

  if (padding !== 4) {
    base64 += '='.repeat(padding)
  }

  return base64
}
