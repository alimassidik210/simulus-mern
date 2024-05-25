import React from "react";
import {
  FaCalendarCheck,
  FaFileInvoice,
  FaMoneyCheck,
  FaRegIdCard,
  FaRegistered,
} from "react-icons/fa";
import { GiHelmet } from "react-icons/gi";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ listing }) => {
  const slideElements = [
    <div className="flex justify-strach gap-2 p-2">
      <div className=" w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <FaCalendarCheck className="text-xl text-blue-700 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            Tahun Kendaraan
          </h3>
          <p className=" text-gray-600">{listing.yearPublish}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <FaMoneyCheck className="text-xl text-blue-700 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            Pajak Kendaraan
          </h3>
          <p className=" text-gray-600">{listing.tanggalPajak}</p>
        </div>
      </div>
    </div>,
    <div className="flex justify-strach gap-2 p-2">
      <div className=" w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <FaRegIdCard className="text-xl text-yellow-500 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            STNK Kendaraan
          </h3>
          <p className=" text-gray-600">
            {listing.stnk ? "Tersedia" : "Tidak Ada"}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <FaRegistered className="text-xl text-yellow-500 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            BPKB Kendaraan
          </h3>
          <p className=" text-gray-600">
            {listing.bpkp ? "Tersedia" : "Tidak Ada"}
          </p>
        </div>
      </div>
    </div>,
    <div className="flex justify-strach gap-2 p-2">
      <div className=" w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <GiHelmet className="text-xl text-red-500 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            Bonus Attribut
          </h3>
          <p className=" text-gray-600">
            {listing.helm ? "Dapat 1 Helm" : "Tidak Ada"}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center ">
          <div className="flex  justify-center">
            <FaFileInvoice className="text-xl text-red-500 " />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mt-3">
            Keaktifan Pajak
          </h3>
          <p className=" text-gray-600">
            {listing.pajak ? "Aktif" : "Tidak Aktif"}
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="slide-container ">
      <Slide autoplay={false} duration={10000} transitionDuration={500}>
        {slideElements.map((each, index) => (
          <div key={index} className="each-slide">
            {each}
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
