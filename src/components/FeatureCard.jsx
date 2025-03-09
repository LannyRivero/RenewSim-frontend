
import React from "react";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
    <div className="text-4xl">{icon}</div>
    <h3 className="text-xl font-bold mt-2">{title}</h3>
    <p className="mt-2 text-gray-700">{description}</p>
  </div>
);

export default FeatureCard;
