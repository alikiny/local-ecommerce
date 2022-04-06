import {GET_CATEGORY} from '../../constant'

export const selectcategory = (category: string) => {
return {
    type: GET_CATEGORY,
    payload: category
}
}

type GetCategoryType = {
    type: typeof GET_CATEGORY,
    payload: string
}

export type Actiontype = GetCategoryType