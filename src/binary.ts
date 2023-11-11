/**
 * Decodes a binary representation to a String
 *
 * @param value - an Uint8Array
 * @returns a String
 */
export function decodeBinary(value: Uint8Array): string {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(value)
}

/**
 * Encodes a string to a binary representation
 *
 * @param value - a String
 * @returns - an Uint8Array
 */
export function encodeBinary(value: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(value)
}
