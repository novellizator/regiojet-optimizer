export interface SearchInput {
  cityFromSearch: string
  cityToSearch: string
  date: string | number | undefined
}

export function isSearchInput(test: unknown): test is SearchInput {
  const typed = test as SearchInput
  return typeof typed.cityFromSearch == 'string' && typeof typed.cityToSearch == 'string' && typeof typed.date in ['string', 'number', 'undefined']
}

export interface SearchOutput {
  cityFrom: string
  cityTo: string
  routes: {
      currency: string
      route: String[]
      price: number
  }[]
}
export interface SearchOutputResponse {
  result: SearchOutput
}

export function isSearchOutputResponse(test: unknown): test is SearchOutputResponse {
  const typed = test as SearchOutputResponse
  const {result} = typed

  return !!result && !!result.cityFrom && !!result.cityTo && Array.isArray(result.routes)
}
