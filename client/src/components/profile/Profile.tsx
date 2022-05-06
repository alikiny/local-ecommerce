import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { loginSuccess } from '../../redux/auth/action';
import { InitialState } from '../../redux/store';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, TextField,  CardActions } from '@mui/material';


type FormDataType = {
    firstName: string
    lastName: string
    email: string
    profile:{address: string, phone: string}
    
}


const schema = yup
  .object({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    
  })
  .required()
 
const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(true)
    const Data = useSelector((state: InitialState)=> state.auth)
    const orderList = useSelector((state:InitialState) => state.auth?.user?.order)
    const userData = Data.user;

    const {handleSubmit, reset, control, formState: {errors}} = useForm<FormDataType>({
        defaultValues: {
            firstName: userData?.firstName ?? '',
            lastName: userData?.lastName ?? '',
            email: userData?.email ?? '',
            profile: {
                address: userData?.profile?.address ?? '', 
                phone: userData?.profile.phone ?? ''
            }
            
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if(!localStorage.getItem('auth')) {
            navigate('/')     
        }

       const fetchProfile = async () => {
        
           try {
               const response = await axios.get('/user/profile')
                dispatch(loginSuccess(response.data))
                reset(response.data)
                } catch (error) {
                    console.log("profile page error from fetch profile", error) 
                    // dispatch action that handle error
                }  
    }  
    fetchProfile();
    }, [dispatch, reset, navigate])

    const onSubmit = async (data: FormDataType) => {
        console.log(data)
        const response = await axios.put('/user', data)
        if (response.status === 200) {
            alert('updated')
        }
    }

    return (
        <Card 
            sx={{
                width: '40%',
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                margin: '2rem auto',
                padding: '1rem',
                borderRadius: '10px',
                '&:hover': { boxShadow: 5 },
            }}>
            <CardMedia 
            component='img'
            sx={{
              borderRadius: '10px',
              width:'300px',
              height: '300px',
              margin: '10px auto',
              
            }} 
            alt='profile'
            src={userData?.image}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: "flex", flexDirection: "column", }}>
                    <Controller 
                    name='firstName'
                    control={control}
                    render={({field})=> (
                    <TextField 
                    id='outlined-helperText'
                    label='first Name'
                    sx={{marginBottom: '1rem'}}
                    {...field}
                    disabled={edit}
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.firstName?.message}
                    />
                    )}
                  />
                  <Controller 
                    name='lastName'
                    control={control}
                    render={({field})=> (
                    <TextField 
                    id='outlined-helperText'
                    label='Last Name'
                    sx={{marginBottom: '1rem'}}
                    {...field}
                    disabled={edit}
                    error={Boolean(errors?.lastName)}
                    helperText={errors?.lastName?.message}
                    />
                    )}
                  />
                  <Controller 
                    name='email'
                    control={control}
                    render={({field})=> (
                    <TextField 
                    id='outlined-helperText'
                    label='E-mail'
                    sx={{marginBottom: '1rem'}}
                    {...field}
                    disabled
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                    />
                    )}
                  />
                  <Controller 
                    name='profile.address'
                    control={control}
                    render={({field})=> (
                    <TextField 
                    id='outlined-helperText'
                    label='Address'
                    sx={{marginBottom: '1rem'}}
                    {...field}
                   disabled={edit}
                   error={Boolean(errors?.profile?.address)}
                    helperText={errors?.profile?.address?.message}
                    
                    />
                    )}
                  />
                  <Controller 
                    name='profile.phone'
                    control={control}
                    render={({field})=> (
                    <TextField 
                    id='outlined-helperText'
                    label='Phone- +358-xx-xxx-xxxx'
                    sx={{marginBottom: '1rem'}}
                    {...field}
                   disabled={edit}
                   error={Boolean(errors?.profile?.phone)}
                   helperText={errors?.profile?.phone?.message}
                    />
                    )}
                  />
                </div>
                        <CardActions>
                            <Button onClick={()=> setEdit(!edit)}>Edit</Button>
                            <Button type="submit" disabled={edit}>Submit</Button>
                        </CardActions>
            </form>

           <div style={{display: 'flex', flexDirection:'column'}}>
           <Typography variant="h6" component="h2">You Purchase order history</Typography> 
           {orderList ? orderList.map((order: any)=> {

               return (
                       <Button variant="outlined" key={order} >
                          <Link to={`/profile/${order}`} >{order}</Link>
                        </Button>
                       )
                    }): null}
                    </div>
  
        </Card>
    );
};

export default Profile;