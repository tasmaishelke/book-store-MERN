const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const Book = require('../model/bookModel')

router.use((req, res, next) => 
    {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (!authHeader?.startsWith('Bearer ')) 
            {
                return res.status(401).json({ message: 'Unauthorized' })
            }
    
        const token = authHeader.split(' ')[1]
    
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => 
                {
                    if (err)
                        {
                            return res.status(403).json({ message: 'Forbidden from verify jwt' })
                        }
                    req.uid = decoded.uid

                    next()
                })
    })

router.get('/', asyncHandler(async(req, res) =>
    {
        const uid = req.uid
        const getAllBooks = await Book.find({ createdBy : uid })
        if(getAllBooks.length === 0)
            {   
                return res.status(400).json({ Message : "No books found"})
            }
        res.status(200).json({count : getAllBooks.length, bookData : getAllBooks})

    }))

router.post('/', asyncHandler(async(req, res) =>
    {
        const { title, author, publishYear } = req.body
        const uid = req.uid
        if(!title || !author || !publishYear)
            {
                return res.status(400).json({ Message : "title, author, publishYear, uid are required"})
            }
        const bookObject = { title, author, publishYear, createdBy : uid }
        const createBook = await Book.create(bookObject)
        res.status(201).json({ createBook })

    }))

router.get('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const  uid  = req.uid
        const getBook = await Book.findOne({_id : id , createdBy : uid})
        if(!getBook)
            {   
                return res.status(400).json({ Message : "No books found with that id"})
            }
        res.status(200).json(getBook)

    }))

router.patch('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const { title, author, publishYear } = req.body
        const  uid  = req.uid
        if(!title || !author || !publishYear)
            {
                return res.status(400).json({ Message : "title, author, publishYear, uid are required"})
            }
        const getBook = await Book.findOne({_id : id, createdBy : uid})
        if(!getBook)
            {   
                return res.status(400).json({ Message : "No books found with that id"})
            }
        const bookObject = { title, author, publishYear }
        await Book.findByIdAndUpdate(id, bookObject)
        res.status(201).json({ Message : "The book is updated"})
    }))

router.delete('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const  uid  = req.uid
        const deleteBook = await Book.findOneAndDelete({_id : id, createdBy : uid})
        if(!deleteBook)
            {   
                return res.status(400).json({ Message : "No books found with that id to delete"})
            }
        res.status(201).json({ Message : "The book deleted"})
    }))

module.exports = router