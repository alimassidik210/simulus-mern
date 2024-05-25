import React from "react";
import { FaBookOpen } from "react-icons/fa";

export default function About() {
  const falsafah = [
    { id: 1, name: "Mentaati sang Pencipta Allah Subhanahu wa ta'ala" },
    { id: 2, name: "Memanusiakan Manusia" },
    { id: 3, name: "Menjaga Kesehatan Jiwa dan Raga" },
    { id: 4, name: "Bersinergi dengan alam dan lingkungan sekitar" },
    { id: 5, name: "Berkhidmat dan berkarya untuk kehidupan yang lebih baik" },
  ];

  const FalsafahList = () => {
    return (
      <ul className="max-w-md mx-auto mt-8 space-y-4">
        {falsafah.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
          >
            <FaBookOpen className="text-green-500 mr-4" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 mt-5">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          Falsafah Kehidupan Kami
        </h1>
      </header>
      <FalsafahList />
    </div>
  );
}
