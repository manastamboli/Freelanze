const userController=require('../controllers/userController')
const express= require('express')
const jobController= require('../controllers/jobController')

const app=require('../app')
const router = express.Router();
const {authenticateToken,uploadFile}=require('../middleware/auth.middleware')
const upload=uploadFile();


// user Routes
router.post('/api/addUser',userController.addUserController);
router.post('/api/loginUser',userController.loginUserController);
router.post('/api/getSkills',userController.addUserSkillController)
router.post('/api/getExperience',userController.addUserExperienceController)
router.get('/api/getUser',authenticateToken,userController.getCurrentUser)
router.get('/api/midCheck',authenticateToken,userController.middlewareCheck)
router.post('/api/send-mail',userController.emailSendController)

//Job Routes

router.post('/api/addjob',upload.single('thumnail'),jobController.addJobController)
router.get('/api/getjobs',jobController.displayJobs)

module.exports={router};