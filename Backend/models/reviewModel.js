import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true, required: true },
  userId: { type: String, ref: 'users', required: true },
  productId: { type: String, ref: 'foods', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true }
});

const reviewModel = mongoose.model('review', reviewSchema);

export default reviewModel;
