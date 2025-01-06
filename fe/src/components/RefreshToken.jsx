import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';


const RefreshToken = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleRefreshToken = () =>
        { 
            setLoading(true); 
            axios
                .get('http://localhost:3000/auth/signin/refresh')
                .then((res) => 
                    {
                        console.log(res.data);
                        
                        enqueueSnackbar('User Created Successfully', { variant : 'success'})
                        navigate('/');
                    })
                .catch((error) => 
                    {
                        setLoading(false);
                        // alert('An error happened. Please Check console');
                        enqueueSnackbar('Error', { variant : 'error'})
                        console.log(error);
                    });
        };
    

    return (
        <div className='p-4'>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <button className='p-2 bg-sky-300 m-8' onClick={handleRefreshToken}>
                    Refresh token
                </button>           
                
            </div>
    </div>
    )
}

export default RefreshToken