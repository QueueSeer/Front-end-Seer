import React from "react";
import Images from "../../assets"; // ไอคอน User, StarColor

const ReviewList = () => {
  const reviews = [
    {
      id: 1,
      name: "หมูชอบชอบ",
      date: "9 กันยายน 2567, 09:30",
      package: "แพคเกจดูดวงรายเดือน",
      text: "ทักแรง แม่นจนขนลุก!",
      stars: 5,
    },
    {
      id: 2,
      name: "หมูนลุกเลย",
      date: "9 กันยายน 2567, 09:30",
      package: "แพคเกจดูดวงรายเดือน",
      text: "นี่ล่ะขนลุกเลยยยยยยย",
      stars: 4,
    },
    // เพิ่มข้อมูลรีวิวที่เหลือ...
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <img
              src={Images.member1}
              alt={review.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{review.name}</h2>
              <p className="text-sm text-gray-500">
                {review.date} | {review.package}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{review.text}</p>
          <div className="mt-2 flex">
            {[...Array(review.stars)].map((_, index) => (
              <img
                key={index}
                src={Images.StarColor}
                alt="Star"
                className="w-5 h-5"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
