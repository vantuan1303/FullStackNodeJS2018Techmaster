//show collections
// db.products.insertOne({
//     name: 'iphone X',
//     quantity: 120,
//     size: {width: 2.79, height:5.65,unit:'inch'}
// })
//Kiểu string có chứa ký tự đặc biệt:
// db.products.insertOne({
//     name:'Jonny\'s iphone 6 plus',
//     quantity:112,
//     size: {width: 2.79, height: 5.65, unit: 'inch'}
// })
//Thêm nhiều "documents"
// db.products.insertMany([{
//     name: 'iphone XS',
//     quantity: 130,
//     type: 'A',
//     size: {width: 2.79, height: 5.65, unit: 'inch'}
// },{
//     name: 'track pad',
//     quantity: 80,
//     type: 'B',    
//     size: {width: 16, height: 9, unit: 'cm'}
// },{
//     name: 'Table Lamp',
//     quantity: 30,
//     type: 'C',
//     size: {width: 5, height: 12, unit: 'inch'}
// },{
//     name: 'notebook',
//     quantity: 90,
//     type: 'D',
//     size: {width: 9, height: 11, unit: 'cm'}
// },{
//     name: 'notebook 2',
//     quantity: 100,
//     type: 'D',
//     size: {width: 9, height: 11, unit: 'cm'}
// }
// ]) 

// db.products.find({})
// db.products.count()
// db.products.find({name:'iphone X'})
//Tìm những document có chứa chữ "phone"
// db.products.find({name:/phone/}).count()
//Tìm những document có "name" bắt đầu bằng chữ "note"
// db.products.find({name:/^note/})
//db.products.find({name: /book$/}) //tên kết thúc bằng chữ "book"
//Tìm những product có quantity = 90 VÀ type = 'D'
// db.products.find({quantity: 90, type:'D'}) //AND
//Tìm những product có quantity = 90 HOẶC type = 'D'
db.products.find({$or: [{quantity: 90}, {type:'D'}]}) //or = hoặc
//Nhiều điều kiện hoặc($or) => sử dụng $in
//Tìm những documents có quantity = 130, 90, hoặc 100
db.products.find({quantity: {$in: [130, 90, 100]}})

































