export function encodeBase64url(value: Uint8Array | string): string {
  let binaryString: string

  if (value instanceof Uint8Array) {
    binaryString = String.fromCharCode(...value)
  } else {
    binaryString = value
  }

  return btoa(binaryString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

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
