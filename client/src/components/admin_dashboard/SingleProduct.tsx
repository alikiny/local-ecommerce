import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios';
import { ProductType } from '../../types';
import { Button, Card, CardActions, CardMedia, TextField } from '@mui/material';

const SingleProduct = () => {
    const {id} = useParams()
    let navigate = useNavigate()
    // const [edit, setEdit] = useState(false)
    const [productData, setProductData] = useState<ProductType>()

    const {handleSubmit, reset, control } = useForm<ProductType>({
        defaultValues: {
            image:productData?.image ?? '',
            name: productData?.name ?? '',
            SKU: productData?.SKU ?? '',
            price: productData?.price ?? 0,
            sex: productData?.sex ?? '',
            category: {category: productData?.category.category ?? ''},
            // color: [{color: productData[]?.color ?? ''}]
            

        }
    })

    useEffect(()=> {

        const fetchProduct = async()=> {
            try {
             const response = await axios.get(`/product/${id}`)
                setProductData(response.data)
                reset(response.data)
            } catch (error: any) {
                console.log("error while fetching", error.response.data.message)
            }
            }
        fetchProduct();
    }, [setProductData, reset,  id])

    const onSubmit = async() => {
        console.log("not yet configured")
    }
    // deleting product
   async function handleDelete  (id: any)  {
        const res = await axios.delete(`/product/${id}`)
        if (res.status === 204){
            alert(`Successifully deleted ${productData?.name}`)
            navigate('/admin/dashboard')

        }
        
    }
    const handleClick = ()=> {
        navigate('/admin/dashboard')
    }
    return (
        <Card 
            sx={{
                width:'40%',
                display:'flex',
                justifyContent:"space-around",
                flexDirection:"column",
                margin: '2rem auto',
                padding:'1rem',
                borderRadius:'10px',
                '&:hover': {borderShadow: 5}
            }}
            >
            <CardMedia 
            component='img'
            sx={{}}
            alt='product'
            src={productData?.image}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller 
                        name='name'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Product Name'
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name='image'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Image link'
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name='SKU'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='SKU'
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name= 'price'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Price'
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name='sex'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Gender'
                                {...field}
                            />
                        )}
                    />
                    <Controller 
                        name='category.category'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Category'
                                {...field}
                            />
                        )}
                    />
                    {/* <Controller 
                        name='color'
                        control={control}
                        render={({field}) => (
                            <TextField 
                                id='outlined-helperText'
                                label='Color'
                                {...field}
                            />
                        )}
                    /> */}
                </div>
                <CardActions>
                    <Button type='submit'>Edit</Button>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={() => handleDelete(productData?._id)}>Delete</Button>
                </CardActions>
                <CardActions><Button onClick={handleClick}>Back</Button></CardActions>
            </form>

        </Card>
    );
};

export default SingleProduct;