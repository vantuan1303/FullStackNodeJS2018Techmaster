/**
 Khoá học FullStackNodejs 2018 - Techmaster Vietnam
 Instructor: Nguyễn Đức Hoàng
 File này chứa các Models, Schemas, hàm kết nối CSDL MongoDB
 */
const mongoose = require('mongoose')
const {Schema} = mongoose //Kỹ thuật "destructuring" trong JS
const {ObjectId} = Schema
//Kết nối CSDL MongoDB
const connectDatabase = async () => {
    try {
        let uri = 'mongodb://hoangnd:123456@127.0.0.1:27018/fullstackNodejs2018'
        let options = {
            connectTimeoutMS: 10000,// 10 giây
			useNewUrlParser: true,
			useCreateIndex: true,
        }
        await mongoose.connect(uri, options)
        console.log('Connect Mongo Database successfully')
    } catch(error) {
        console.log(`Cannot connect Mongo. Error: ${error}`)
    }
}
connectDatabase()
const UserSchema = new Schema({
    //schema: cấu trúc của 1 collection 
    name: {type: String, default: 'unknown'},
    age: {type: Number, min: 18, index: true},
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
    //Trường tham chiếu, một user viết nhiều blogpost
    blogPosts:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogPost'}]
})
const BlogPostSchema = new Schema({
    title: {type: String, default: 'Haha'},
    content: {type: String, default: ''},
    date: {type: Date, default: Date.now},
    //Trường tham chiếu, 1 blogpost do 1 người viết
    author:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
})
//Bảng Comment => Một user comment, lúc thì lên BlogPost, lúc lên Product?
//Trường tham chiếu đó gọi là "dynamic ref"
const CommentSchema = new Schema({
    body: {type: String, require: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //Dynamic ref
    commentOn: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel'
    }, 
    onModel: {
        type: String,
        required: true,
        enum: ['BlogPost', 'Product']
    }
})
const ProductSchema = new Schema({
    name: {type: String, default: ''},
    yearOfProduction: {type: Number, min: 2000},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
})
//Chuyển từ Schema sang Model
const User = mongoose.model('User', UserSchema)
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
const Comment = mongoose.model('Comment', CommentSchema)
const Product = mongoose.model('Product', ProductSchema)

//export để các file khác có thể sử dụng
module.exports = { User,BlogPost,Comment,Product }

