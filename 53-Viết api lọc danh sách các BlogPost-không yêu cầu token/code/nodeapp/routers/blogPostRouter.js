/**
 Khoá học FullStackNodejs 2018 - Techmaster Vietnam
 Instructor: Nguyễn Đức Hoàng
 Routers for "BlogPost" collection
 */
const express = require('express')
const router = express.Router()
const { 	
    insertBlogPost,	
    queryBlogPosts,
    queryBlogPostsByDateRange,
    getDetailBlogPost
} = require('../database/models/BlogPost')
router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})
router.post('/insertBlogPost', async (req, res) =>{
    let {title, content} = req.body
    //Client phải gửi tokenKey
    let tokenKey = req.headers['x-access-token']
    try {
        let newBlogPost = await insertBlogPost(title, content, tokenKey)
        res.json({
            result: 'ok',
            message: 'Thêm mới BlogPost thành công',
            data: newBlogPost
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể thêm mới BlogPost.Lỗi : ${error}`
        })
	}
})
//VD1: http://127.0.0.1:3000/blogposts/queryBlogPosts?text=kinh nghiệm
//VD2: http://127.0.0.1:3000/blogposts/queryBlogPosts?text=xe
router.get('/queryBlogPosts', async (req, res) =>{	
	let {text} = req.query
    try {    	
        let blogPosts = await queryBlogPosts(text)
        res.json({
            result: 'ok',
            message: 'Query thành công danh sách BlogPost',
            data: blogPosts
        })
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách blogPosts.Lỗi : ${error}`
        })
	}
})
//VD1: http://127.0.0.1:3000/blogposts/queryBlogPostsByDateRange?
//from=01-11-2018&to=05-11-2018
router.get('/queryBlogPostsByDateRange', async (req, res) =>{	
	let {from, to} = req.query	
    try {    	
        let blogPosts = await queryBlogPostsByDateRange(from, to)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công danh sách BlogPost',
	  		data: blogPosts
	  	})	
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Không thể lấy được danh sách blogPosts.Lỗi : ${error}`
        })
	}
})
router.get('/getDetailBlogPost', async (req, res) =>{		
	let {id} = req.query	
    try {    	    
        let blogPost = await getDetailBlogPost(id)
	  	res.json({
	  		result: 'ok',
	  		message: 'Query thành công chi tiết BlogPost',
	  		data: blogPost
	  	})		
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Ko lấy được thông tin chi tiết BlogPost. Error: ${error}`
        })
	}
})
module.exports = router