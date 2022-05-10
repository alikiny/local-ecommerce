import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios';
import { ProductType } from '../../types';

const SingleProduct = () => {
    const {id} = useParams()
    // const [edit, setEdit] = useState(false)
    const [productData, setProductData] = useState<ProductType>()

    const {handleSubmit, reset, control } = useForm({
        defaultValues: {
            image:productData?.image ?? '',
            name: productData?.name ?? '',
            SKU: productData?.SKU ?? '',
            price: productData?.price ?? '',
            sex: productData?.sex ?? '',
            category: productData?.category ?? '',

        }
    })

    useEffect(()=> {

        const fetchProduct = async()=> {
            try {
             const response = await axios.get(`/product/${id}`)
                setProductData(response.data)
            } catch (error: any) {
                console.log("error while fetching", error.response.data.message)
            }
            }
        fetchProduct();
    }, [setProductData])

    console.log("product data: ", productData)
    return (
        <div>
            
        </div>
    );
};

export default SingleProduct;