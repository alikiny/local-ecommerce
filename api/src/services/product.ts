import { NotFoundError } from '../helpers/apiError';
import Product, {ProductDocuments} from '../models/Product'

const create = async (product: ProductDocuments): Promise<ProductDocuments> => {
    return product.save()
  }

const findAll = async (): Promise<ProductDocuments[]> => {
    return Product.find();
  }

const findOne = async (productId: string): Promise<ProductDocuments | null> => {

      const foundProduct =  Product.findById(productId).populate("category color")

      if(!foundProduct){
          throw new NotFoundError(`Product ${productId} not found`)
      }
        return foundProduct;
  }

const deleteProduct = async (productId: string): Promise<ProductDocuments | null> => {
    const foundProduct =  Product.findByIdAndDelete(productId)

    if(!foundProduct){
        throw new NotFoundError(`Product ${productId} not found`)
    }
      return foundProduct;
  }
  
const updateProduct = async(productId: string, update: Partial<ProductDocuments>): Promise<ProductDocuments | null> => {

    const updateProduct =  Product.findByIdAndUpdate(productId, update, {new:true})

    if(!updateProduct){
        throw new NotFoundError(`Product ${productId} not found`)
    }
      return updateProduct;

}

  export default {create, findAll, findOne, deleteProduct, updateProduct}