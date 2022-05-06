export type ProductType = {
    _id: string
    name: string
    SKU: string
    image: string
    price: number
    size: string
    sex: string
    color:{_id: string, color:string}[]
    category: {_id: string, category: string}
}

export type UserType = {
    _id: string
    firstName: string
    lastName: string
    email: string
    image: string
    registeredDate: Date
    order: string[]
    isAdmin: boolean
    profile: {address: string, phone: string}

}

export type Error = {
    error: string   
 }

 export type Category = {
     _id: string,
     category: string
 }[]
 export type Color = {
    _id: string,
    color: string
}[]

 export type Inputs = {
    name: string
    SKU: string
    image: string
    price: number
    size: string
    sex: string
    color: string
    category: string
 }