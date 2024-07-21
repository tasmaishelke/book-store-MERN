const express = require('express')
const router = express.Router()

const Book = require('../model/bookModel')

const asyncHandler = require('express-async-handler')




router.get('/', asyncHandler(async(req, res) =>
    {

        const getAllBooks = await Book.find()
        if(getAllBooks.length === 0)
            {   
                return res.status(400).json({ Message : "No books found"})
            }
        res.status(200).json({count : getAllBooks.length, bookData : getAllBooks})

    }
))

router.post('/', asyncHandler(async(req, res) =>
    {
        const { title, author, publishYear } = req.body
        if(!title || !author || !publishYear)
            {
                return res.status(400).json({ Message : "title, author, publishYear all are required"})
            }
        const bookObject = { title, author, publishYear }
        const createBook = await Book.create(bookObject)
        res.status(201).json({ createBook })

    }
))

router.get('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const getBook = await Book.findById(id)
        if(!getBook)
            {   
                return res.status(400).json({ Message : "No books found with that id"})
            }
        res.status(200).json(getBook)

    }
))

router.patch('/:id', asyncHandler(async(req, res) =>
    {
        const { title, author, publishYear } = req.body
        if(!title || !author || !publishYear)
            {
                return res.status(400).json({ Message : "title, author, publishYear all are required"})
            }
        const { id } = req.params
        const getBook = await Book.findById(id)
        if(!getBook)
            {   
                return res.status(400).json({ Message : "No books found with that id"})
            }
        const bookObject = { title, author, publishYear }
        await Book.findByIdAndUpdate(id, bookObject)
        res.status(201).json({ Message : "The book is updated"})

    }
))

router.delete('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const deleteBook = await Book.findByIdAndDelete(id)
        if(!deleteBook)
            {   
                return res.status(400).json({ Message : "No books found with that id to delete"})
            }
        res.status(201).json({ Message : "The book deleted"})

    }
))

module.exports = router