import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import moment from "moment";
import { formatCurrency } from "../utils/formatCurrency";
import { useSelector } from "react-redux";
import Slideshow from "../components/Slideshow";
import { FaShare, FaWhatsapp } from "react-icons/fa";

export default function Listing() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [listings, setListings] = useState(null);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  SwiperCore.use([Navigation]);

  const params = useParams();
  console.log(listing);
  useEffect(() => {
    setLoading(true);
    try {
      const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
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
          <div className="bg-indigo-200 flex items-center  sm:mt-4 sm:mb-6 p-1 rounded-lg">
            <Swiper navigation>
              {listing.imagesUrl.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="w-full h-[490px]  bg-gray-500 p-3"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div class="absolute inset-0  bg-black opacity-20"></div>
                    <div class="relative flex font-semibold  gap-2 z-10">
                      <h1 class="text-white text-xl">Harga</h1>
                      <p class="text-white text-xl">
                        {formatCurrency(listing.price)}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-4 max-w-4xl  relative ">
            <div className="bg-gray-100 p-2 rounded-lg">
              <h1 className="px-3 text-xl   text-indigo-900 ">
                <span className="mr-2  font-semibold">
                  {moment(listing.yearPublish).format("yyyy")}
                </span>
                <span>{listing.name}</span>
              </h1>
            </div>

            <Slideshow listing={listing} />

            <div className=" p-2 flex gap-4">
              <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 basis-1/2 sm:basis-1/4 rounded-lg shadotw-md p-4 overflow-hidden ">
                <div className="flex justify-center">
                  <img
                    src={currentUser.avatar}
                    alt="poto penjual"
                    className="rounded-full w-20 h-20 border-2 border-indigo-700 shadow-lg "
                  />
                </div>
                <div className="text-sm mt-2 flex flex-col ">
                  <p>Nama : {currentUser.username}</p>
                  <p>Email : {currentUser.email}</p>
                  <p>Alamat : {listing.address}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 basis-1/2 sm:basis-3/4 rounded-lg w-full p-3">
                <h1>
                  Deskripsi :{" "}
                  <span className="font-semibold">{listing.name}</span>
                </h1>
                <p> {listing.description}</p>
              </div>
            </div>
            <div className="p-2 flex gap-2 mb-5 mx-auto">
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${currentUser.whatsup}?text=assalamualaikum ${currentUser.username} saya ingin menanyakan terkait ${listing.name}`,
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7  gap-4">
          {listings &&
            listings.length > 0 &&
            listings.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
              >
                <div className="flex items-center justify-center">
                  <Link to={`/listing/${item._id}`}>
                    <img
                      src={item.imagesUrl[0]}
                      alt="listing photo"
                      className="w-32 h-32 "
                    />
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-2 ">
                  <Link to={`/listing/${item._id}`}>
                    <p className="text-indigo-700 flex-1 truncate hover:underline font-semibold">
                      {item.name}
                    </p>
                  </Link>
                  <p>{formatCurrency(item.price)}</p>
                </div>
                <div className="mt-2 flex justify-between  font-semibold items-center">
                  <p className="text-xs">
                    Diposting Tanggal : <br />
                    <span className="text-green-700 text-md text-center">
                      {moment(item.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
