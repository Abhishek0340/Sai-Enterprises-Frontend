import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    comment: "Great product! Highly recommended.",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    comment: "Good quality, but delivery was a bit late.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4.5,
    comment: "Affordable and worth the price!",
  },
];

const Reviews = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="card shadow-xl bg-base-100 p-4">
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <div className="rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <input
                      key={index}
                      type="radio"
                      className="mask mask-star-2 bg-yellow-400"
                      checked={index + 1 <= review.rating}
                      readOnly
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
