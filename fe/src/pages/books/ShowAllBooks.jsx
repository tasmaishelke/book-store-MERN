import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { SlMenu } from "react-icons/sl";
import BooksTable from '../../components/BooksTable'
import BooksCard from '../../components/BooksCard'

const ShowAllBooks = () => 
{
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('card')

  useEffect(() => 
    {
      setLoading(true)
      axios
        .get('http://localhost:3000/books', 
          {
            headers: 
            {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
        .then((res) => 
          {
            setBooks(res.data.bookData)
            // console.log(res.data.bookData);
            console.log(res.data);
            setLoading(false)
          })
        .catch((error) => 
          {
            console.log(error);
          })
    }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>

        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}>
            Card
        </button>

        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}>
            Table
        </button>
        <Link to='/user/show'>
          <SlMenu />
        </Link>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books list</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        

      </div>
      
      {loading ? (
        <Spinner />
      ) : showType === 'card' ? (<BooksCard books={books}/>) : (<BooksTable books={books} />)}
    </div>
  )
}

export default ShowAllBooks