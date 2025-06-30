export const GENERIC_HEADERS = {
  'Content-Type': 'application/json'
}
export const HEADERS_WITH_AUTH = (authToken: string) => {
    return {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`
}}