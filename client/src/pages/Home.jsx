import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [listings, setListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/get?limit=10&pajak=true");
        const data = await res.json();
        if (data.success === false) {
          console.log("error fetch data ");
        }
        setListings(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto pt-28 pb-5 px-3 flex flex-col gap-4">
        <h1 className="text-indigo-700 text-3xl lg:text-6xl font-bold">
          Temukan kendaraan <span className="text-green-500">terbaikmu </span>{" "}
          <br /> dengan penuh kenyamanan
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Simulus motors adalah tempat terbaik untuk menemukan kendaraan
          terbaikmu
          <br />
          kami menyediakan berbagai macam kendaraan untuk kamu pilih
        </div>
        <Link
          to={"/search"}
          className="text-blue-700 hover:underline font-bold"
        >
          let's get started...
        </Link>
      </div>
      <Swiper navigation>
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => (
            <SwiperSlide>
              <div className="max-6xl mx-auto bg-white" key={listing._id}>
                <img
                  src={listing.imagesUrl[0]}
                  alt="listing cover"
                  className="w-full h-[500px] object-contain"
                />
                <Link to={"/about"}>
                  <h2 className="text-green-700 font-semibold text-2xl text-center underline cursor-pointer hover:text-green-500">
                    Tentang Kami
                  </h2>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-8xl p-8 mx-auto">
        {listings && listings.length > 0 && (
          <div>
            <div className="my-8 text-center">
              <h2 className="text-indigo-700 font-semibold text-2xl">
                Motors Available
              </h2>
              <Link
                className="text-blue-700 text-sm hover:underline"
                to={"/search"}
              >
                lihat kendaraan lain
              </Link>
            </div>
            <div className="flex justify-center flex-wrap gap-8">
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
