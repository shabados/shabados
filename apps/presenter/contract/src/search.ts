export type SearchQuery = {
  type: 'first-letter' | 'full-word',
  query: string,
  options?: {
    translations?: boolean,
    transliterations?: boolean,
    citations?: boolean,
  },
}
