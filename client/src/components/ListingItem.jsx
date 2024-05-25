import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { formatCurrency } from "../utils/formatCurrency";
import moment from "moment";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white w-full overflow-hidden sm:w-[300px] rounded-lg shadow-md hover:shadow-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imagesUrl[0]}
          alt="photo listing"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105  duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-xl font-semibold text-indigo-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="font-semibold text-sm text-gray-700 truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2 ">
            {listing.description}
          </p>
          <p className="font-semibold">{formatCurrency(listing.price)}</p>
          <p className="text-xs">
            Posted : {moment(listing.createdAt).format("DD-MM-YYYY")}
          </p>
        </div>
      </Link>
    </div>
  );
}
