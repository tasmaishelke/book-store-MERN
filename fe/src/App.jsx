import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowAllBooks from './pages/books/ShowAllBooks'
import CreateBook from './pages/books/CreateBook'
import ShowBook from './pages/books/ShowBook'
import EditBook from './pages/books/EditBook'
import DeleteBook from './pages/books/DeleteBook'

import ShowUser from './pages/user/ShowUser'
import EditUser from './pages/user/EditUser'
import DeleteUser from './pages/user/DeleteUser'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/show' element={<ShowAllBooks />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />

      <Route path='/user/show' element={<ShowUser />} />
      <Route path='/user/edit/' element={<EditUser />} />
      <Route path='/user/delete/' element={<DeleteUser />} />

    </Routes>
    
  )
}

export default App