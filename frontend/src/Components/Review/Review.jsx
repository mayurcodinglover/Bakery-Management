import React, { useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import ReviewList from '../ReviewList/ReviewList';

const ReviewForm = ({ productId }) => {
  const { addReview ,fetchReview} = useContext(StoreContext);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addReview({ productId, rating, review });
    setRating('');
    setReview('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
          Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Post Review
      </button>
    </form>
    <ReviewList productid={productId}/>
    </>
  );
};

export default ReviewForm;
