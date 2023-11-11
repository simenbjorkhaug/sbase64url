const Alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '_',
  '-',
]

const base64codes = {
  'A': 0,
  'B': 1,
  'C': 2,
  'D': 3,
  'E': 4,
  'F': 5,
  'G': 6,
  'H': 7,
  'I': 8,
  'J': 9,
  'K': 10,
  'L': 11,
  'M': 12,
  'N': 13,
  'O': 14,
  'P': 15,
  'Q': 16,
  'R': 17,
  'S': 18,
  'T': 19,
  'U': 20,
  'V': 21,
  'W': 22,
  'X': 23,
  'Y': 24,
  'Z': 25,
  'a': 26,
  'b': 27,
  'c': 28,
  'd': 29,
  'e': 30,
  'f': 31,
  'g': 32,
  'h': 33,
  'i': 34,
  'j': 35,
  'k': 36,
  'l': 37,
  'm': 38,
  'n': 39,
  'o': 40,
  'p': 41,
  'q': 42,
  'r': 43,
  's': 44,
  't': 45,
  'u': 46,
  'v': 47,
  'w': 48,
  'x': 49,
  'y': 50,
  'z': 51,
  '0': 52,
  '1': 53,
  '2': 54,
  '3': 55,
  '4': 56,
  '5': 57,
  '6': 58,
  '7': 59,
  '8': 60,
  '9': 61,
  '+': 62,
  '/': 63,
}

function toUint8Array(value: string | Uint8Array | ArrayBuffer): Uint8Array {
  if (typeof value === 'string') {
    return new TextEncoder().encode(value)
  } else if (value instanceof Uint8Array) {
    return value
  } else {
    return new Uint8Array(value)
  }
}

/**
 * Encodes a string to a base64 string
 *
 * @param value - a string or an Uint8Array
 * @returns a base64 string
 */
export function encodeBase64(data: string | Uint8Array | ArrayBuffer): string {
  const bytes = toUint8Array(data)

  let binary_string = ''
  let i = 2

  for (; i < bytes.length; i += 3) {
    const byte1 = bytes[i - 2]
    const byte2 = bytes[i - 1]
    const byte3 = bytes[i]

    binary_string += Alphabet[byte1 >> 2]
    binary_string += Alphabet[((byte1 & 0x03) << 4) | (byte2 >> 4)]
    binary_string += Alphabet[((byte2 & 0x0f) << 2) | (byte3 >> 6)]
    binary_string += Alphabet[byte3 & 0x3f]
  }

  if (i === bytes.length) {
    const byte1 = bytes[bytes.length - 2]
    const byte2 = bytes[bytes.length - 1]

    binary_string += Alphabet[byte1 >> 2]
    binary_string += Alphabet[((byte1 & 0x03) << 4) | (byte2 >> 4)]
    binary_string += Alphabet[(byte2 & 0x0f) << 2]
    binary_string += '='
  }

  if (i === bytes.length + 1) {
    const byte1 = bytes[bytes.length - 1]

    binary_string += Alphabet[byte1 >> 2]
    binary_string += Alphabet[(byte1 & 0x03) << 4]
    binary_string += '=='
  }

  return binary_string
}

/**
 * Decodes a base64 string to a string
 *
 * @param value - a base64 string
 * @returns an Uint8Array
 */
export function decodeBase64(data: string): Uint8Array {
  if (data.length % 4 !== 0) {
    throw new Error('Invalid base64 string')
  }

  const paddingIndex = data.indexOf('=')

  let adjustment = 0

  if (paddingIndex !== 1 && paddingIndex < data.length - 2) {
    throw new Error('Invalid base64 string')
  } else if (paddingIndex !== -1) {
    adjustment = data.length - paddingIndex
  }

  const bytes = new Uint8Array(3 * (data.length / 4))

  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    const byte_sequence =
      base64codes[data.charAt(i) as keyof typeof base64codes] << 18 |
      base64codes[data.charAt(i + 1) as keyof typeof base64codes] << 12 |
      base64codes[data.charAt(i + 2) as keyof typeof base64codes] << 6 |
      base64codes[data.charAt(i + 3) as keyof typeof base64codes]

    bytes[j] = byte_sequence >> 16
    bytes[j + 1] = (byte_sequence >> 8) & 0xff
    bytes[j + 2] = byte_sequence & 0xff
  }

  return bytes.subarray(0, bytes.length - adjustment)
}
