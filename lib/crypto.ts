/**
 * Client-side End-to-End Encryption using Web Crypto API (AES-GCM-256)
 * Data is encrypted in-browser BEFORE chunking & uploading to Shelby nodes.
 */

export async function generateCryptoKey(passphrase: string, saltStr: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(saltStr),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptChunk(chunk: ArrayBuffer, key: CryptoKey): Promise<{ cipher: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    chunk
  );
  return { cipher, iv };
}
