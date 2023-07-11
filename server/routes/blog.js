const router = require('express').Router()
const {verifyAccessToken , isAdmin} = require("../middlewares/verifyToken")
const ctrls = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')

router.get('/' , ctrls.getBlog)
router.get('/one/:bid' , ctrls.getBlogs)
router.put('/like/:bid' ,verifyAccessToken, ctrls.likeBlog)
router.put('/dislike/:bid' ,verifyAccessToken, ctrls.dislikeBlog)
router.put('/image/:bid' ,[verifyAccessToken , isAdmin], uploader.single('image'),ctrls.uploadImageBlog)
router.post('/' , [verifyAccessToken , isAdmin] , ctrls.createNewBlog)
router.put('/:bid' , [verifyAccessToken , isAdmin] , ctrls.updateBlog)
router.delete('/:bid' , [verifyAccessToken , isAdmin] , ctrls.deleteBlog)

module.exports = router