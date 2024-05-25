import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    stnk: false,
    bpkp: false,
    helm: false,
    pajak: false,
    sort: "created_at",
    order: "desc",
  });

  // console.log(sidebarData);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const stnkFormUrl = urlParams.get("stnk");
    const bpkpFormUrl = urlParams.get("bpkp");
    const helmFormUrl = urlParams.get("helm");
    const pajakFormUrl = urlParams.get("pajak");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");
    if (
      searchTermFormUrl ||
      stnkFormUrl ||
      bpkpFormUrl ||
      helmFormUrl ||
      pajakFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFormUrl || "",
        stnk: stnkFormUrl === "true" ? true : false,
        bpkp: bpkpFormUrl === "true" ? true : false,
        helm: helmFormUrl === "true" ? true : false,
        pajak: pajakFormUrl === "true" ? true : false,
        sort: sortFormUrl || "created_at",
        order: orderFormUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log("getListing query error");
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === "stnk" ||
      e.target.id === "bpkp" ||
      e.target.id === "helm" ||
      e.target.id === "pajak"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("stnk", sidebarData.stnk);
    urlParams.set("bpkp", sidebarData.bpkp);
    urlParams.set("helm", sidebarData.helm);
    urlParams.set("pajak", sidebarData.pajak);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 md:w-[500px] border-b-2 md:border-r-2 min-h-screen">
        <form className="border rounded-md " onSubmit={handleSubmit}>
          <table className="table-auto  border-separate border-spacing-4 ">
            <tbody className="">
              <tr>
                <td className="  py-2 ">
                  {" "}
                  <label className="whitespace-nowrap">Cari Nama</label>
                </td>
                <td className="  py-2 ">
                  {" "}
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="perncarian"
                    className="border w-full p-3 rounded-md"
                    onChange={handleChange}
                    value={sidebarData.searchTerm}
                  />
                </td>
              </tr>
              <tr>
                <td className="  py-2 ">
                  {" "}
                  <label className="whitespace-nowarp">Kelengkapan</label>
                </td>
                <td className="  py-2 ">
                  <div className="flex flex-col gap-4 ">
                    <div className="gap-2 flex">
                      <input
                        type="checkbox"
                        id="stnk"
                        className="w-5"
                        onChange={handleChange}
                        checked={sidebarData.stnk}
                      />
                      <span>STNK</span>
                    </div>
                    <div className="gap-2 flex">
                      <input
                        type="checkbox"
                        id="bpkp"
                        className="w-5"
                        onChange={handleChange}
                        checked={sidebarData.bpkp}
                      />
                      <span>BPKP</span>
                    </div>
                    <div className="gap-2 flex">
                      <input
                        type="checkbox"
                        id="pajak"
                        className="w-5"
                        onChange={handleChange}
                        checked={sidebarData.pajak}
                      />
                      <span>PAJAK</span>
                    </div>
                    <div className="gap-2 flex">
                      <input
                        type="checkbox"
                        id="helm"
                        className="w-5"
                        onChange={handleChange}
                        checked={sidebarData.helm}
                      />
                      <span>HELM</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="  py-2 ">
                  {" "}
                  <label className="whitespace-nowrap">Filter </label>
                </td>
                <td className="  py-2 ">
                  {" "}
                  <select
                    id="sort_order"
                    className="w-full p-3  rounded-lg"
                    onChange={handleChange}
                    defaultValue={"created_at_desc"}
                  >
                    <option value="">Saring kendaraan</option>
                    <option value="price_desc">Harga tertinggi</option>
                    <option value="price_asc">Harga terendah</option>
                    <option value="yearPublish_desc">Tahun terbaru</option>
                    <option value="yearPublish_asc">Tahun terlama</option>
                    <option value="tanggalPajak_desc">Pajak terbaru</option>
                    <option value="tanggalPajak_asc">Pajak terlama</option>
                    <option value="created_desc">Postingan Terbaru</option>
                    <option value="created_asc">Postingan Terlama</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-3">
            <button className="p-3 w-full text-white bg-indigo-700 rounded-lg hover:opacity-90">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-indigo-700 p-5 font-semibold mt-5 text-xl border-b">
          Hasil Pencarian
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-indigo-700">Pencarian tidak ditemukan</p>
          )}
          {loading && <p className="text-xl text-indigo-700">Loading ....</p>}
          {!loading &&
            listings.length > 0 &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              className="p-7 text-indigo-700 text-center w-full hover:underline cursor-pointer"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
