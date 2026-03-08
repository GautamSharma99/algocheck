export function decodeAlgorandProgram(encodedString: string): Uint8Array | null {
    try {
      // Use Node.js's built-in Buffer to handle the conversion
      const buffer = Buffer.from(encodedString, 'base64');
      // Return the result as a standard Uint8Array
      return new Uint8Array(buffer);
    } catch (e) {
      console.error("Failed to decode Base64 string:", e);
      return null;
    }
  }