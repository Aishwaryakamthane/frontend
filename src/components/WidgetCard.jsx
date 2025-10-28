import React from "react";

const WidgetCard = ({ title, value, color = "bg-indigo-600" }) => {
  return (
    <div className={`${color} text-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {value && <p className="text-2xl font-bold mt-2">{value}</p>}
    </div>
  );
};

export default WidgetCard;
