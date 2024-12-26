import React from 'react';
import Navbar from "../../components/navbar";
import Images from "../../assets";

const FollowerPage = () => {
  const followers = [
    { id: 1, name: "แมมผู้ชอบดูดวง", username: "Mamkmit64", image: Images.member1 },
    { id: 2, name: "หมูชอบชอบ", username: "Maria64", image: Images.member2 },
    { id: 3, name: "พี่ชอบฟ้า", username: "Dias75", image: Images.member3 },
    { id: 4, name: "แมมผู้ชอบดูดวง", username: "Mamkmit64", image: Images.member4 },
    { id: 5, name: "หมูชอบชอบ", username: "Maria64", image: Images.member5 },
    { id: 6, name: "พี่ชอบฟ้า", username: "Dias75", image: Images.member6 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 flex">
        <div className="flex flex-1 justify-end p-4">
        <div
            className="bg-white w-full md:w-3/4 rounded-lg shadow-lg p-6 border-2"
            style={{ borderColor: '#D1D5DB' }}
          >
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <img src={Images.membericon} alt="Follower Icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold" style={{ color: '#65558F' }}>ผู้ติดตาม</h1>
            </div>
            <hr className="border-gray-300 mb-4" />
            <p className="text-lg mb-6">
              <span className="font-bold" style={{ color: '#420F75', fontSize: '1.25rem' }}>
                จำนวนผู้ติดตาม - 256
              </span>
            </p>

            {/* Follower List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {followers.map((follower) => (
                <div key={follower.id} className="flex items-center space-x-4">
                  <img
                    src={follower.image}
                    alt={follower.name}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{follower.name}</h2>
                    <p className="text-sm text-gray-600">{follower.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerPage;
