import  Category, { CategoryDocments } from "../models/Category"


const create = async (category: CategoryDocments ): Promise<CategoryDocments>  => {
    return  category.save();
}

const findAll =async (): Promise<CategoryDocments[]> => {
return Category.find();
}

export default {create, findAll}