import { decodeBinary, encodeBinary } from './binary.ts'

/**
 * Decodes a base64 string to a string
 *
 * @param value - a base64 string
 * @returns a string
 */
export function decodeBase64(value: string) {
  const binary = atob(value)

  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return decodeBinary(bytes)
}

/**
 * Encodes a string to a base64 string
 *
 * @param value - a string
 * @returns a base64 string
 */
export function encodeBase64(value: string): string {
  const bytes = encodeBinary(value)

  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary)
}
