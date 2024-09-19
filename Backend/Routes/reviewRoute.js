import express from 'express'
import { addreview ,fetchReview,fetchuser,deletereview} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/auth.js';
const reviewRouter=express.Router();


reviewRouter.post('/addreview',authMiddleware,addreview);
reviewRouter.get('/getreview',fetchReview);
reviewRouter.get('/getuser',authMiddleware,fetchuser);
reviewRouter.post('/delreview',deletereview)

export default reviewRouter;