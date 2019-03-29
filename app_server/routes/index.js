var express = require('express'); 
var router = express.Router(); 
var ctrlHome = require('../controllers/home.js'); 
var ctrlList = require('../controllers/blog.js'); 
var editEntry = require('../controllers/blog.js'); 
var deleteEntry = require('../controllers/blog.js'); 
/* Setup routes to pages. */ 
router.get('/', ctrlHome.home); 
router.get('/list',ctrlList.list); 
router.get('/add',ctrlList.add); 
router.get('/edit/:blogid',editEntry.edit); 
router.post('/edit/:blogid', editEntry.editBlog); 
router.get('/remove/:blogid',deleteEntry.remove); 
router.post('/add', ctrlList.addBlog); 
router.post('/remove/:blogid', deleteEntry.removeBlog);
module.exports = router;
