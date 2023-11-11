/**
 * Decodes a base64 string to a string
 *
 * @param value - a base64 string
 * @returns a string
 */
export function decodeBase64(value: string) {
  let result = ''

  for (const char of atob(value).split('')) {
    result += '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
  }

  return decodeURIComponent(result)
}

/**
 * Encodes a string to a base64 string
 *
 * @param value - a string
 * @returns a base64 string
 */
export function encodeBase64(value: string): string {
  return btoa(
    encodeURIComponent(value).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16)),
    ),
  )
}
