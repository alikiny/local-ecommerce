import Color, { ColorDocments } from "../models/Color"

const create = async (color: ColorDocments): Promise<ColorDocments> => {
return color.save();
}

const findAll =async(): Promise<ColorDocments[]> => {
    return Color.find()
}

export default {create, findAll}