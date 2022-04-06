export type ProductType = {
    _id: string
    name: string
    SKU: string
    image: string
    price: number
    size: string
    sex: string
    color:[{_id: string, color:string}]
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
    profile: {address: string, phone: string}

}

export type Error = {
    error: string   
 }