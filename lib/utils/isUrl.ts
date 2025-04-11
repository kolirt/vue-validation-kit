export function isUrl(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const trimmedValue = value.trim()

  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/i

  return urlRegex.test(trimmedValue)
}
