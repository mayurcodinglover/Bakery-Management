import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import ReviewItem from '../ReviewItem/ReviewItem';

const ReviewList = ({ productid }) => {
  const { token, review, fetchReviews } = useContext(StoreContext);

  useEffect(() => {
    fetchReviews();
  }, [token]);

  const filteredReviews = review ? review.filter(r => r.productId === productid) : [];

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {filteredReviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        filteredReviews.map((review) => <ReviewItem key={review._id} review={review} />)
      )}
    </div>
  );
};

export default ReviewList;
