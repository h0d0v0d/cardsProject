import { packsInstanse } from "./packs.instanse"

export const packsApi = {
  getPacks: (args: GetPacksArgs) => {
    return packsInstanse.get<GetPacksResponse>("", { params: args })
  },
  createPack: (args: CreatePackArgs) => {
    return packsInstanse.post<CreatePackResponse>("", { cardsPack: args })
  },
  deletePack: (args: DeletePackArgs) => {
    return packsInstanse.delete<DeleteTypeResponse>("", { params: args })
  },
  updatePack: (args: UpdatePackArgs) => {
    return packsInstanse.put<UpdatePackResponse>("", { cardsPack: args })
  },
}

type Pack = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

// Get Packs
type GetPacksArgs = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

type GetPacksResponse = {
  cardPacks: Pack[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

// Create Pack
type CreatePackArgs = {
  name?: string // если не отправить будет таким
  deckCover?: string // не обязателен
  private?: boolean
}

type CreatePackResponse = {
  newCardsPack: Pack
}

// Delete Pack
type DeletePackArgs = {
  id: string
}

type DeleteTypeResponse = {
  deletedCardsPack: Pack
}

// Ne Name Pack
type UpdatePackArgs = {
  _id: string
  name: string
}

type UpdatePackResponse = {
  updatedCardsPack: Pack
  token: string
  tokenDeathTime: string
}
