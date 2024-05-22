import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imagesUrl: [],
    description: "",
    name: "",
    address: "",
    price: 0,
    yearPublish: "",
    tanggalPajak: "",
    stnk: false,
    bpkp: false,
    helm: false,
    pajak: false,
  });

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const params = useParams();

  console.log(formData);

  useEffect(() => {
    const fetchListings = async () => {
      const listingId = params.listingId;
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListings();
  }, []);

  const handleImageUpload = () => {
    if (files.length > 0 && formData.imagesUrl.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imagesUrl: formData.imagesUrl.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Ukuran gambar tidak boleh lebih dari 2MB");
        });
    } else {
      setImageUploadError("Maximal hanya bisa mengupload 6 gambar");
    }
  };

  const storageImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`proses upload gambar ke fire base ${progess}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };

  const hanldeRemoveImage = (index) => {
    setFormData({
      ...formData,
      imagesUrl: formData.imagesUrl.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id == "stnk" ||
      e.target.id == "helm" ||
      e.target.id == "bpkp" ||
      e.target.id == "pajak"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.type == "textarea" ||
      e.target.type == "date"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imagesUrl.length < 1)
        return setImageUploadError("harus memasukan gambar minimal 1");
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success == false) {
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <main className="max-w-4xl p-3  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>

      <form className="flex flex-col gap-6 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border rounded-lg p-3"
            maxLength={"60"}
            minLength={"10"}
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            id="description"
            placeholder="Deskripsi Kendaraan"
            className="border rounded-lg p-3"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Alamat"
            id="address"
            className="p-3 rounded-lg border"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex p-3 flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="stnk"
                className="w-5"
                checked={formData.stnk}
                onChange={handleChange}
              />
              <span>STNK</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="bpkp"
                className="w-5"
                checked={formData.bpkp}
                onChange={handleChange}
              />
              <span>BPKP</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="helm"
                className="w-5"
                checked={formData.helm}
                onChange={handleChange}
              />
              <span>Helm</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="pajak"
                className="w-5"
                checked={formData.pajak}
                onChange={handleChange}
              />
              <span>Pajak Hidup</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold border p-3 rounded-sm  w-40 bg-gray-100">
              Pajak Kendaraan
            </span>
            <input
              type="date"
              id="tanggalPajak"
              className="border p-3 rounded-lg flex-1"
              value={formData.tanggalPajak}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <p className="font-semibold border bg-gray-100 p-3 rounded-sm w-40">
              Tahun Kendaraan
            </p>
            <input
              type="date"
              id="yearPublish"
              className="p-3 rounded-lg border flex-1"
              value={formData.yearPublish}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <p className="font-semibold border bg-gray-100 p-3 rounded-sm flex-2 w-40">
              Harga Kendaraan
            </p>
            <input
              type="number"
              id="price"
              placeholder="Rp.10.000.000"
              className="p-3 rounded-lg border flex-1"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:{" "}
            <span className="text-gray-700 font-normal ml-2">
              gambar awal akan menjadi cover (max 6 )
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="p-3 w-full border border-3 border-gray-500 rounded-lg"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleImageUpload}
              className="border border-indigo-700 p-3 rounded-lg shadow-md uppercase disabled:opacity-80 hover:bg-indigo-500 hover:text-white"
              type="button"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-xs text-red-700">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imagesUrl.length > 0 &&
            formData.imagesUrl.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center border p-3"
              >
                <img
                  src={url}
                  alt="gambar review"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  className="text-red-700 uppercase hover:text-red-500"
                  onClick={() => hanldeRemoveImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className="bg-indigo-700 p-3 uppercase text-white rounded-lg mt-2 hover:opacity-90"
            disabled={loading || uploading}
          >
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
}
