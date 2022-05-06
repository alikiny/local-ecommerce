import React, {useEffect, useState} from 'react';
import { SubmitHandler, useForm} from 'react-hook-form'
import './CreateProduct.css'
import axios from 'axios';
import {  Category, Color, Inputs } from '../../types';
import { fetchProducts } from '../../redux/products/action';
import { useDispatch } from 'react-redux';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const [colors, setColors] = useState<Color>()
    const [categories, setCategories] = useState<Category>()
    const [productData] = useState({
        name: "",
        SKU: "",
        image: "",
        price: undefined,
        size: "",
        sex: "",
        color:  "",
        category: ""
    })

    const {register, handleSubmit, reset} = useForm({
        defaultValues: productData
    })

    useEffect (() => {
        const fetch = async() => {
            try {
                const color = await axios.get('/color')
                const  category = await axios.get('/category')
                
                setColors(color.data)
                setCategories(category.data)
            } catch (error) {
                console.log("fetching color error", error)
            }
        }
        fetch();
        
    }, [setColors, setCategories])

    
    const onSubmit: SubmitHandler<any> = async( data, e) => {
        // prevent form reloading page after onSubmit
        e?.preventDefault();
        let value;
        if (data.category !== "") {
          value = categories?.find((category) => 
          (category.category === data.category) 
            )
            // set id of category
            data.category = value?._id
        }
        if (data.color !== "") {
            value = colors?.find((color) => 
            (color.color === data.color) 
              )
              // set id of color
              data.color = value?._id
          }
          // create new product object 
          const newProduct = {
              name: data.name,
              SKU: data.SKU,
              image: data.image,
              price: Number (data.price),
              size: data.size,
              sex: data.sex,
              color: [data.color],
              category: data.category,
          }
          const response = await axios.post('/product', newProduct)
          if (response.status === 200) {
            alert('Product added')
            // clear input field text
            reset() 
            // after adding product fetch product from db (not working)
            dispatch(fetchProducts) 
            console.log("dispatch action")
        }
    }

    return (
        <div className="container">
           <h1>create product</h1> 
           <form onSubmit={handleSubmit(onSubmit)}>
            <label>Product Name</label>
            <input type='text'  {...register('name')} />
            <label>SKU</label>
            <input type='text'  {...register('SKU')} />
            <label>Image</label>
            <input type='text' {...register('image')}  placeholder='Give url for image'/>
            <label>Price</label>
            <input type='number' {...register('price') } />
            <label>Size</label>
            <input type='text' {...register('size')} />
            <label>Gender</label>
            <select {...register('sex')}>
                <option >Man</option>
                <option>Women</option>
            </select>
            <label>Color</label>
            <select {...register('color')}>
                <option></option>
                {colors?.map((opt)=> {
                    return <option key={opt.color}>{opt.color}</option>
                })}
                <option >Blue</option>
                <option>Red</option>
            </select>
            <label>Category</label>
            <select {...register('category')}>
                <option ></option>
                {categories?.map((opt)=> {
                    return <option key={opt.category}>{opt.category}</option>
                })}
            </select>
            <button type="submit">Submit</button>
            
           </form>
        </div>
    );
};

export default CreateProduct;