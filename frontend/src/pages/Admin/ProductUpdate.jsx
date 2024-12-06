import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useUpdateProductMutation,useDeleteProductMutation,useGetProductByIdQuery,useUploadProductImageMutation} from '../../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from '../../redux/api/categorySliceApi.js'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu.jsx'


const ProductUpdate = () => {
    const params = useParams()
    const {data: productData} = useGetProductByIdQuery(params._id)
    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.countInStock || "")

    const navigate = useNavigate()

    const {data: categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(()=> {
      if(productData && productData._id){}
      setName(productData?.name)
      setDescription(productData?.description)
      setPrice(productData?.price)
      setQuantity(productData?.quantity)
      setBrand(productData?.brand)
      setCategory(productData?.category)
      setStock(productData?.stock)
      setImage(productData?.image)
    }, [productData]);

    const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData }).unwrap();

      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`Product successfully updated`)
        navigate("/admin/allproduct");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.")
      };
    }

  const handleDelete = async () => {
    try {
      let question = window.confirm("Are you sure, you want to delete it?")
      if(!question) return;

      const {data} = await deleteProduct(params._id);

      toast.success(`${data.name} deleted`);
      navigate("/admin/allproduct");

    } catch (error) {
      console.log(error)
      toast.error("Deletion failed. Try again")
    }
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
        <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">Update Product</div>

                {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

                <div className="p-3">
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name">Name:</label><br />
                            <input type='text' className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="two ml-4">
                            <label htmlFor="name block">Price:</label><br />
                            <input type='number' className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={price} onChange={e => setPrice(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="flex flex-wrap">
                        <div className="three">
                            <label htmlFor="name block">Quantity:</label><br />
                            <input type='number' className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={quantity} onChange={e => setQuantity(e.target.value)}/>
                        </div>
                        <div className="two ml-4">
                            <label htmlFor="name block">Brand:</label><br />
                            <input type='text' className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={brand} onChange={e => setBrand(e.target.value)}/>
                        </div>
                    </div>
                    <label htmlFor="" className="my-5">Description:</label>
                    <textarea type="text" className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" value={description}
                    onChange={e => setDescription(e.target.value)}
                    > </textarea>

                    <div className="flex justify-between">
                        <div className="">
                            <label htmlFor="name block">Count In Stock</label> <br/>
                            <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={stock} onChange={e => setStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Category:</label> <br />
                            <select placeholder="Chhose Category" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' onChange={e => setCategory(e.target.value)}>
                                {categories?.map((c) =>
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                                )}
                            </select>
                        </div>
                    </div>

                  <div className="gap-5">
                    <button
                     onClick={handleUpdate}
                     className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-500 mr-9">Update</button>
                    <button
                     onClick={handleDelete}
                     className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-[#e11d48]">Delete</button>
                    
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductUpdate