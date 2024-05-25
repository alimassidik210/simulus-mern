import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { formatCurrency } from "../utils/formatCurrency";
import { useSelector } from "react-redux";
import Slideshow from "../components/Slideshow";
import { FaShare, FaTag, FaWhatsapp } from "react-icons/fa";
import ListingItem from "../components/ListingItem";

export default function Listing() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [listings, setListings] = useState(null);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // console.log(currentUser);

  SwiperCore.use([Navigation]);

  const params = useParams();
  console.log(listing);
  useEffect(() => {
    setLoading(true);
    try {
      const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success == false) {
          setError(true);
          setListing(false);
          return;
        }
        setLoading(false);
        setListing(data);
      };
      fetchListing();
    } catch (error) {
      setError(true);
    }
  }, [params.listingId]);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchListings = async () => {
        const res = await fetch(`/api/listing/get`);
        const data = await res.json();
        if (data.success == false) {
          setError(true);
          setListing(false);
          return;
        }
        setLoading(false);
        setListings(data);
      };
      fetchListings();
    } catch (error) {
      setError(true);
    }
  }, []);

  return (
    <main className="bg-gradient-to-tr from-gray-100 via-gray-50 to-white">
      {loading && <p className="text-2xl my-7 text-center">Loading...</p>}
      {error && (
        <p className="text-2xl my-7 text-center">
          terjadi kesalahan fecth data...
        </p>
      )}
      {listing && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center  gap-2 p-5">
          <div className="bg-white w-full overflow-hidden  rounded-lg shadow-md hover:shadow-lg">
            <Swiper navigation>
              {listing.imagesUrl.map((url) => (
                <SwiperSlide key={url}>
                  <img
                    src={url}
                    alt="photo listing"
                    className="h-[320px] sm:h-[500px] w-full object-cover hover:scale-105  duration-300"
                  />
                  <p class="text-gray-700 text-xl absolute bottom-3 left-3 p-2 rounded-md bg-gray-300 flex items-center gap-2 hover:scale-105 duration-300 cursor-pointer">
                    <FaTag className="text-green-700" />
                    {formatCurrency(listing.price)}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-4 max-w-4xl  relative ">
            <div className="bg-gray-100 p-3 text-xl font-semibold rounded-lg flex justify-between truncate">
              <p className="ml-5">{listing.name}</p>
              <p className="mr-5">{listing.address}</p>
            </div>

            <Slideshow listing={listing} />

            <div className=" p-2 flex gap-4">
              <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 basis-1/2  rounded-lg shadotw-md p-4 overflow-hidden ">
                <div className="flex justify-center">
                  <img
                    src={listing.userRef.avatar}
                    alt="poto penjual"
                    className="rounded-full w-20 h-20 border-2 border-indigo-700 shadow-lg "
                  />
                </div>
                <div className="text-sm mt-4  gap-2 flex flex-col ">
                  <p>Nama Penjual :</p>
                  <b>
                    <p className="capitalize">{listing.userRef.username}</p>
                  </b>
                  <p>Email Penjual :</p>
                  <b>
                    <p className="truncate">{listing.userRef.email}</p>
                  </b>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 basis-1/2  rounded-lg w-full p-3 truncate">
                <p className="truncate mb-2">
                  <span className="font-bold">Deskripsi : </span>
                  <span>{listing.name}</span>
                </p>
                <p className="whitespace-pre-line"> {listing.description}</p>
              </div>
            </div>
            <div className="p-2 flex gap-2 mb-5 mx-auto">
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${listing.userRef.whatsup}?text=assalamualaikum ${listing.userRef.username} saya ingin menanyakan terkait ${listing.name}`,
                    "_blank",
                    "noopener noreferrer"
                  )
                }
                className="bg-green-700 mt-2 p-2 w-full rounded-lg text-white hover:opacity-90 relative"
              >
                <span className="absolute left-2">
                  <FaWhatsapp className="text-white text-xl" />
                </span>
                Hubungi Penjual
              </button>
              <button
                className="bg-gray-700 mt-2 p-2 w-full rounded-lg text-white hover:opacity-90 relative"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              >
                <span className="absolute left-2">
                  <FaShare className="text-white text-xl" />
                </span>
                Share Halaman
              </button>
            </div>
            {copied && (
              <p className="bg-indigo-100 p-2 text-center z-50 absolute right-5 bottom-10 rounded-md">
                Link Halaman telah tercopy
              </p>
            )}
          </div>
        </div>
      )}
      <div className="bg-gray-200 max-w-7xl p-3 mx-auto">
        <h1 className="text-2xl ml-3 font-semibold my-3 text-indigo-900">
          Lihat Kendaraan Lainnya
        </h1>
        <div className="flex flex-wrap gap-4 ">
          {listings &&
            listings.length > 0 &&
            listings.map((listing, index) => (
              <ListingItem listing={listing} key={index} />
            ))}
        </div>
      </div>
    </main>
  );
}
