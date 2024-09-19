import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const ReviewItem = ({ review }) => {
  const { deleteReview, user, url } = useContext(StoreContext);

  const handleDelete = async (id) => {
    const res = await axios.post(url + "/api/review/delreview", { reviewid: id });
    if (res.data.success) {
      alert("Review deleted");
    } else {
      alert("Review not deleted");
    }
  };

  return (
    <div className="border p-4 mb-4 rounded shadow-lg">
      <h3 className="text-xl font-bold">{review.rating} Stars</h3>
      <p className="text-gray-600">{review.review}</p>
      
      {/* Check if user exists and has data */}
      {user && user.length > 0 && user[0].name ? (
        <p className="text-sm text-gray-500">Reviewed by: {user[0].name}</p>
      ) : (
        <p className="text-sm text-gray-500">Anonymous</p>
      )}
      
      {/* Check if the user is the one who posted the review */}
      {user && user.length > 0 && review.userId === user[0]._id && (
        <button
          onClick={() => handleDelete(review._id)}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Review
        </button>
      )}
    </div>
  );
};

export default ReviewItem;
