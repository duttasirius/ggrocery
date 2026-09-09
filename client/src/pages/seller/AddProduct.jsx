import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    if (files.filter(Boolean).length !== 4) {
      toast.error("Please select exactly 4 product images.");
      return;
    }

    try {
      setIsLoading(true);
      const productData = { name, description, category, price, offerPrice };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong while adding the product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[95vh] flex-1 flex-col overflow-y-scroll no-scrollbar">
      <form onSubmit={onSubmitHandler} className="max-w-lg space-y-5 p-4 md:p-10">
        <div>
          <p className="text-base font-medium">Product Images <span className="text-xs text-gray-500">(4 required)</span></p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updateFiles = [...files];
                    updateFiles[index] = e.target.files[0];
                    setFiles(updateFiles);
                  }}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                  disabled={isLoading}
                />
                <img
                  className={`max-w-24 rounded-lg ${isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt={`Product image ${index + 1}`}
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Upload 4 different views so customers can inspect the product.</p>
        </div>

        <div className="flex max-w-md flex-col gap-1"><label className="text-base font-medium">Product Name</label><input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type here" className="rounded border border-gray-500/40 px-3 py-2.5 outline-none" required disabled={isLoading} /></div>
        <div className="flex max-w-md flex-col gap-1"><label className="text-base font-medium">Product Description</label><textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={4} className="resize-none rounded border border-gray-500/40 px-3 py-2.5 outline-none" placeholder="Type here" disabled={isLoading} /></div>

        <div className="flex w-full flex-col gap-1"><label className="text-base font-medium">Category</label><select onChange={(e) => setCategory(e.target.value)} value={category} className="rounded border border-gray-500/40 px-3 py-2.5 outline-none" disabled={isLoading}><option value="">Select Category</option>{categories.map((item, index) => <option key={index} value={item.path}>{item.text}</option>)}</select></div>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex w-32 flex-1 flex-col gap-1"><label className="text-base font-medium">Product Price</label><input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="0" className="rounded border border-gray-500/40 px-3 py-2.5 outline-none" required disabled={isLoading} /></div>
          <div className="flex w-32 flex-1 flex-col gap-1"><label className="text-base font-medium">Offer Price</label><input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice} type="number" placeholder="0" className="rounded border border-gray-500/40 px-3 py-2.5 outline-none" required disabled={isLoading} /></div>
        </div>

        <button type="submit" disabled={isLoading} className="flex min-w-[170px] items-center justify-center gap-2 rounded bg-indigo-500 px-8 py-2.5 font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? <><Loader2 size={18} className="animate-spin" /> Adding...</> : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
