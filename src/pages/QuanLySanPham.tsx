// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useProducts } from "../hooks/useProducts";

// const ProductTable = () => {
//      const { products, loading, error } = useProducts();

//   if (loading) return <p>Đang tải sản phẩm...</p>;
//   if (error) return <p>{error}</p>;
//   return (
//     <div className="w-full p-6 bg-gradient-to-br shadow-xl overflow-hidden shadow-gray-500/50 from-cyan-500 to-cyan-200 min-h-screen">
//       <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Quản Lý Sản Phẩm</h2>

//       <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
//         <h3 className="text-lg text-gray-900 font-semibold mb-4">Danh sách sản phẩm</h3>

//         <table className="w-full border-collapse rounded-2xl overflow-hidden">
//           <thead>
//             <tr className="bg-gray-100 text-gray-800">
//               <th className="p-4 text-left">Sản phẩm</th>
//               <th className="p-4 text-left">Giá</th>
//               <th className="p-4 text-left">Danh mục</th>
//               <th className="p-4 text-left">Trạng thái</th>
//               <th className="p-4 text-left">Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-200 text-gray-900">
//                 <td className="p-3 flex items-center gap-3">
//                   <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg" />
//                   {product.name}
//                 </td>
//                 <td className="p-3">{product.price} VNĐ</td>
//                 <td className="p-3">{product.category}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       product.status === "Còn Hàng" ? "bg-yellow-300 text-gray-900" : "bg-red-500 text-gray-900"
//                     }`}
//                   >
//                     {product.status}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <div className="flex items-center gap-2">
//                     <button className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
//                       <FaEdit className="w-3.5 h-3.5" />
//                     </button>
//                     <button className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
//                       <FaTrash className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// import { useState } from "react";
// import { useProducts } from "../hooks/useProducts";

// interface Product {
//   _id: number;
//   name: string;
//   image: File | null;
//   price: number;
//   category: string;
//   status: string;
//   description: string; // 🆕 Thêm mô tả
//   stock: number; // 🆕 Thêm số lượng tồn kho
// }

// interface ProductModalProps {
//   formData: Omit<Product, "_id">;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   closeModal: () => void;
// }

// const ProductTable = () => {
//   const { products, createProduct } = useProducts();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState<Omit<Product, "_id">>({
//     name: "",
//     price: 0,
//     category: "",
//     status: "Còn Hàng",
//     image: null,
//     description: "", 
//     stock: 0, 
//   });

//   const openModal = () => {
//     setIsModalOpen(true);
//     setFormData({ name: "", price: 0, category: "", status: "Còn Hàng", image: null, description: "", stock: 0 });
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
//   };

//  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0] || null;
  
//   if (!file) {
//     console.error("❌ Không có file ảnh được chọn!");
//     return;
//   }

//   console.log(`✅ Ảnh đã chọn: ${file.name} - ${file.size} bytes`);

//   setFormData((prev) => ({ ...prev, image: file }));
// };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formData.image) {
//       alert("Vui lòng chọn ảnh sản phẩm!");
//       return;
//     }

//    if (!formData.image) {
//   alert("Vui lòng chọn ảnh sản phẩm!");
//   return;
// }
// createProduct({ 
//   ...formData, 
//   price: formData.price, 
//   image: formData.image 
// });
//     closeModal();
//   };
//   console.log("📤 Ảnh gửi đi:", formData.image);
//   return (
//     <div className="p-6 min-h-screen">
//       <h2 className="text-3xl font-bold mb-4">Quản Lý Sản Phẩm</h2>
//       <button onClick={openModal} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
//         + Thêm Sản Phẩm
//       </button>

//       <table className="w-full border-collapse border">
//         <thead>
//   <tr className="bg-gray-200">
//     <th className="border p-2">Tên</th><th className="border p-2">Giá</th><th className="border p-2">Danh mục</th>
//     <th className="border p-2">Trạng thái</th><th className="border p-2">Mô tả</th><th className="border p-2">Tồn kho</th>
//     <th className="border p-2">Ảnh</th>
//   </tr>
// </thead>
//             <tbody>
//         {products
//             .filter((product) => product) 
//             .map((product, index) => (
//             <tr key={product._id || index} className="border hover:bg-gray-100">
//                 <td className="p-2">{product.name}</td>
//                 <td className="p-2">{product.price} VNĐ</td>
//                 <td className="p-2">{product.category}</td>
//                 <td className={`p-2 px-3 rounded ${product.status === "Còn Hàng" ? "bg-green-300" : "bg-red-300"}`}>
//                 {product.status || "Không rõ"}
//                 </td>
//                 <td className="p-2">{product.description || "Không có mô tả"}</td>
//                 <td className="p-2">{product.stock || "Không có dữ liệu"}</td>
//                 <td className="p-2">
//                 {product.image ? (
//                     <img
//                     src={product.image.startsWith("http") ? product.image : `http://localhost:5000/images/${product.image}`}
//                     alt={product.name}
//                     className="w-12 h-12 rounded-lg"
//                     />
//                 ) : (
//                     <span>Không có ảnh</span>
//                 )}
//                 </td>
//             </tr>
//             ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <ProductModal
//           formData={formData}
//           handleChange={handleChange}
//           handleFileChange={handleFileChange}
//           handleSubmit={handleSubmit}
//           closeModal={closeModal}
//         />
//       )}
//     </div>
//   );
// };

// const ProductModal: React.FC<ProductModalProps> = ({ formData, handleChange, handleFileChange, handleSubmit, closeModal }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded shadow-lg w-96">
//       <h3 className="text-lg font-semibold mb-4">Thêm sản phẩm</h3>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} className="w-full border p-2 mb-2" />
//         <input type="number" name="price" placeholder="Giá" value={formData.price} onChange={handleChange} className="w-full border p-2 mb-2" />
//         <input type="text" name="category" placeholder="Danh mục" value={formData.category} onChange={handleChange} className="w-full border p-2 mb-2" />
//         <input type="text" name="description" placeholder="Mô tả" value={formData.description} onChange={handleChange} className="w-full border p-2 mb-2" /> {/* 🆕 */}
//         <input type="number" name="stock" placeholder="Tồn kho" value={formData.stock} onChange={handleChange} className="w-full border p-2 mb-2" /> {/* 🆕 */}
//         <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 mb-2">
//           <option value="Còn Hàng">Còn Hàng</option>
//           <option value="Hết Hàng">Hết Hàng</option>
//         </select>
//         <input type="file" name="image" onChange={handleFileChange} className="w-full border p-2 mb-2" />
//         <div className="flex justify-end mt-4">
//           <button type="button" onClick={closeModal} className="mr-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">
//             Hủy
//           </button>
//           <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
//             Thêm
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// export default ProductTable;
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

interface Product {
  _id: number;
  name: string;
  image: File | null;
  price: number;
  category: string;
  status: string;
  description: string;
  stock: number;
}
interface ProductModalProps {
  formData: Omit<Product, "_id">;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
}
const ProductTable = () => {
  const { products, createProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    category: "",
    status: "Còn Hàng",
    image: null,
    description: "",
    stock: 0,
  });

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ name: "", price: 0, category: "", status: "Còn Hàng", image: null, description: "", stock: 0 });
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Vui lòng chọn ảnh sản phẩm!");
      return;
    }
    createProduct({ ...formData, price: formData.price, image: formData.image });
    closeModal();
  };

  return (
    <div className="w-[84%] p-6 bg-gradient-to-br shadow-xl overflow-hidden shadow-gray-500/50 from-cyan-500 to-cyan-200 min-h-screen ml-64">
      <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Quản Lý Sản Phẩm</h2>
      <button onClick={openModal} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        + Thêm Sản Phẩm
      </button>
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 text-left">Tên</th>
              <th className="p-4 text-left">Giá</th>
              <th className="p-4 text-left">Danh mục</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Mô tả</th>
              <th className="p-4 text-left">Tồn kho</th>
              <th className="p-4 text-left">Ảnh</th>
              <th className="p-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-200 text-gray-900">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price} VNĐ</td>
                <td className="p-3">{product.category}</td>
                <td className={`px-2 py-1 w-10 h-6 text-xs font-semibold text-center rounded-lg 
                ${product.status === "Còn Hàng" ? " text-green-700" : " text-red-700"}`}>
                {product.status || "Không rõ"}
                </td>
                <td className="p-3">{product.description || "Không có mô tả"}</td>
                <td className="p-3">{product.stock || "Không có dữ liệu"}</td>
                <td className="p-2">
               {product.image ? (
                    <img
                    src={product.image.startsWith("http") ? product.image : `http://localhost:5000/images/${product.image}`}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg"
                    />
                ) : (
                    <span>Không có ảnh</span>
                )}
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <ProductModal formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} closeModal={closeModal} />}
    </div>
  );
};

const ProductModal: React.FC<ProductModalProps> = ({ formData, handleChange, handleFileChange, handleSubmit, closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h3 className="text-lg font-semibold mb-4">Thêm sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} className="w-full border p-2 mb-2" />
        <input type="number" name="price" placeholder="Giá" value={formData.price} onChange={handleChange} className="w-full border p-2 mb-2" />
        <input type="text" name="category" placeholder="Danh mục" value={formData.category} onChange={handleChange} className="w-full border p-2 mb-2" />
        <input type="text" name="description" placeholder="Mô tả" value={formData.description} onChange={handleChange} className="w-full border p-2 mb-2" />
        <input type="number" name="stock" placeholder="Tồn kho" value={formData.stock} onChange={handleChange} className="w-full border p-2 mb-2" />
        <input type="file" name="image" onChange={handleFileChange} className="w-full border p-2 mb-2" />
        <button type="button" onClick={closeModal} className="mr-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">
           Hủy
         </button>
       <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            Thêm
         </button>
      </form>
    </div>
  </div>
);

export default ProductTable;
