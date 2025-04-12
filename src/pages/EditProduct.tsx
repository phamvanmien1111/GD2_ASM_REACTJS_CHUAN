import { useParams } from "react-router-dom";
import { useProductForm } from "../hooks/useProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, onSubmit, handleFileChange, preview } = useProductForm(id);

  return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden from-cyan-500 to-cyan-200 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Chỉnh sửa sản phẩm</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tên sản phẩm</label>
              <input {...register("name")} placeholder="Nhập tên sản phẩm..." className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Giá</label>
              <input type="number" {...register("price")} placeholder="Nhập giá sản phẩm..." className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Danh mục</label>
              <input {...register("category")} placeholder="Nhập danh mục..." className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Trạng thái</label>
              <select {...register("status")} className="w-full p-3 border rounded-lg bg-white">
                <option value="Còn Hàng">Còn Hàng</option>
                <option value="Hết Hàng">Hết Hàng</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
              <textarea {...register("description")} placeholder="Nhập mô tả sản phẩm..." className="w-full p-3 border rounded-lg resize-none h-24" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Số lượng</label>
              <input type="number" {...register("stock")} placeholder="Nhập số lượng..." className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Ảnh sản phẩm</label>
              <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer" />
              {preview && <img src={preview} alt="Ảnh sản phẩm" className="w-full h-40 object-cover rounded-lg mt-3 shadow-md" />}
            </div>
          </div>

          <div className="col-span-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300">
              Cập nhật sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
