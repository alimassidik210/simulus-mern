import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailfure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailfure,
  signoutUserStart,
  signoutUserSuccess,
  updateUserFailfure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import moment from "moment";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [country, setCountry] = useState("id");
  const [number, setNumber] = useState("");
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  // allow read ;
  // allow write : if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches("image/.*")
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    setFormData({ ...formData, whatsup: parseInt(number) });
  }, [number]);

  const handleFileUpload = (photo) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + photo.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progess));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((donlowdURL) => {
          setFormData({ ...formData, avatar: donlowdURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailfure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdatedSuccess(true);
    } catch (error) {
      dispatch(updateUserFailfure(error.message));
    }
  };

  const hanldeClickDelete = async (id) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailfure(data.message));
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailfure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailfure(data.message));
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailfure(error.message));
    }
  };

  const handleShowListings = async (e) => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = (listingId) => {
    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  };

  return (
    <div className="max-w-screen  flex flex-col md:flex-row mx-auto ">
      <div className="basis-1/3 min-h-svh p-5 bg-gradient-to-r from-sky-100 via-blue-200 to-indigo-300 border-r-2  border-indigo-300">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            onClick={() => fileRef.current.click()}
            className="w-24 h-24 rounded-full object-cover self-center"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Gagal Mengupload Gambar (gambar harus kurang dari 2mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Gambar berhasil diupload</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="p-3 rounded-lg border"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="p-3 rounded-lg border"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="p-3 rounded-lg border"
          />
          {/* <input
          type="number"
          placeholder="Masukan No Handphone"
          id="whatsup"
          onChange={handleChange}
          defaultValue={currentUser.whatsup}
          className="p-3 rounded-lg border"
        /> */}

          <PhoneInput
            country={country}
            placeholder="Masukan no telpon"
            onChange={(value) => {
              setNumber(value);
            }}
            countryCodeEditable={false}
            inputStyle={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              width: "100%",
              height: "47px",
            }}
            autoFormat={true}
          />

          <button className="text-white uppercase bg-indigo-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
            {loading ? "loading..." : "update"}
          </button>
          <Link
            to={"/create-listing"}
            className="bg-green-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-3 text-red-700 font-semibold cursor-pointer ">
          <p
            className="hover:text-red-900 "
            onClick={() => hanldeClickDelete(currentUser._id)}
          >
            Delete Account
          </p>
          <p className="hover:text-red-900" onClick={handleSignOut}>
            Sign Out
          </p>
        </div>
        <p className="text-green-700">
          {updatedSuccess ? "Data berhasil di update" : ""}
        </p>
        <p
          className="text-green-700 text-center cursor-pointer hover:underline "
          onClick={handleShowListings}
        >
          Show Listings
        </p>
        <p className="text-red-700 p-3">
          {showListingsError && "Postingan error"}
        </p>
      </div>
      <div
        className="basis-2/3 p-6  bg-gradient-to-tr from-gray-500 via-gray-400 to-gray-300   "
        // style={{
        //   backgroundImage: "url('/src/assets/kopi.png')",
        //   backgroundSize: "400px",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center center",
        //   backgroundBlendMode: "darken",
        // }}
      >
        {userListings && userListings.length > 0 ? (
          <h1 className="mt-6 text-2xl font-semibold px-4 ">
            Daftar Listing :
          </h1>
        ) : (
          <div
            className="min-h-svh "
            style={{
              backgroundImage: "url('/src/assets/kopi.png')",
              backgroundSize: "400px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundBlendMode: "darken",
              opacity: 0.3,
            }}
          >
            <h1 className="text-xl mt-10 text-center p-3">
              Klik tombol{" "}
              <span className="font-semibold text-green-600">Show Listing</span>{" "}
              untuk menampilkan listingmu
            </h1>
          </div>
        )}
        <div className="max-w-6xl mx-auto  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-3 gap-4">
            {userListings &&
              userListings.length > 0 &&
              userListings.map((listing, index) => (
                <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imagesUrl[0]}
                      alt="listing photo"
                      className="w-full h-48 object-cover "
                    />
                  </Link>
                  <div className="mt-2 flex flex-col gap-2 ">
                    <Link to={`/listing/${listing._id}`}>
                      <p className="text-indigo-700 flex-1 truncate hover:underline font-semibold">
                        {listing.name}
                      </p>
                    </Link>
                    <p>{formatCurrency(listing.price)}</p>
                  </div>
                  <div className="mt-2 flex justify-between  font-semibold items-center">
                    <p className="text-xs">
                      Diposting Tanggal : <br />
                      <span className="text-green-700 text-md text-center">
                        {moment(listing.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="uppercase text-red-700 hover:opacity-90"
                        onClick={() => handleDeleteListing(listing._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="uppercase text-green-700 hover:opacity-90">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
