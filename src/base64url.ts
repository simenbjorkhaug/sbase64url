export function encodeBase64url(value: Uint8Array | string): string {
  let binaryString: string

  if (value instanceof Uint8Array) {
    binaryString = String.fromCharCode(...value)
  } else {
    binaryString = value
  }

  const base64 = btoa(binaryString)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeBase64url(value: string): string {
  let base64 = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  base64 += '=='.slice(0, (4 - (base64.length % 4)) % 4)

  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new TextDecoder().decode(bytes)
}
