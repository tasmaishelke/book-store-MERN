import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => 
{
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => 
    {
      setLoading(true)
      axios
        .get('http://localhost:3000/books')
        .then((res) => 
          {
            setBooks(res.data.bookData)
            // console.log(res.data.bookData);
            // console.log(res.data.count);
            // console.log(res.data);
            setLoading(false)
          })
        .catch((error) => 
          {
            console.log(error);
          })
    }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books list</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Sr.No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) =>
            (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{books.indexOf(book) + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='border border-slate-700 rounded-md text-center'>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-800' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home