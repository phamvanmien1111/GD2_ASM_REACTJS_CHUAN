import { useForm } from "react-hook-form";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
interface ProductForm {
   _id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  image: FileList;
  description: string;
  stock: number;
}

const ProductTable = () => {
  const { products, createProduct ,handleDelete  } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProductForm>();

  const openModal = () => {
    setIsModalOpen(true);
    reset();
  };

  const closeModal = () => setIsModalOpen(false);
  const onSubmit = (data: ProductForm) => {
    if (!data.image || data.image.length === 0) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }
    createProduct({
      ...data,
      image: data.image[0],
      price: Number(data.price),
      stock: Number(data.stock),
    });
    closeModal();
  };

  return (
    <div className="w-[84%] p-6 bg-gradient-to-br shadow-xl overflow-hidden from-cyan-500 to-cyan-200 min-h-screen ml-64">
      <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Quản Lý Sản Phẩm</h2>
      <button onClick={openModal} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        + Thêm Sản Phẩm
      </button>
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 text-left">Tên</th>
              <th className="p-4 text-left">Ảnh</th>
              <th className="p-4 text-left">Giá</th>
              <th className="p-4 text-left">Danh mục</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Mô tả</th>
              <th className="p-4 text-left">Tồn kho</th>
              <th className="p-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-200 text-gray-900">
                <td className="p-3">{product.name}</td>
                <td className="p-2">
                  <img
                    src={
                      typeof product.image === "string" ? product.image.includes("http")
                        ? product.image
                        : `http://localhost:5000/images/${product.image}`
                        : ""
                    }
                    alt={product.name}
                    className="w-24 h-24 rounded-lg"
                  />
                </td>
                <td className="p-3">{product.price} VNĐ</td>
                <td className="p-3">{product.category}</td>
                <td className={`px-2 py-1 text-xs font-semibold text-center rounded-lg ${product.status === "Còn Hàng" ? "text-green-700" : "text-red-700"}`}>{product.status || "Không rõ"}</td>
                <td className="p-3">{product.description || "Không có mô tả"}</td>
                <td className="p-3">{product.stock || "Không có dữ liệu"}</td>
                <td className="p-4 mt-6 flex gap-2">
                   <Link
                    to={`/edit/${product._id}`}
                    className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      if (product._id) {
                        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
                        if (confirmDelete) {
                          handleDelete(product._id);
                        }
                      } else {
                        console.error("ID sản phẩm không hợp lệ!");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                  >
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm sản phẩm</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("name")} type="text" placeholder="Tên sản phẩm" className="w-full border p-2 mb-2" />
              <input {...register("price")} type="number" placeholder="Giá" className="w-full border p-2 mb-2" />
              <input {...register("category")} type="text" placeholder="Danh mục" className="w-full border p-2 mb-2" />
              <input {...register("description")} type="text" placeholder="Mô tả" className="w-full border p-2 mb-2" />
              <input {...register("stock")} type="number" placeholder="Tồn kho" className="w-full border p-2 mb-2" />
              <select {...register("status")} className="w-full border p-2 mb-2">
              <option value="Còn Hàng">Còn Hàng</option>
              <option value="Hết Hàng">Hết Hàng</option>
              </select>
              <input {...register("image")} type="file" className="w-full border p-2 mb-2" />
              <button type="button" onClick={closeModal} className="mr-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">Hủy</button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Thêm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
