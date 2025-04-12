import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserManagement } from "../hooks/useUserManagement";

const UserTable = () => {
  const {
    user,
    loading,
    error,
    isModalOpen,
    isSubmitting,
    register,
    handleSubmit,
    errors,
    openModal,
    closeModal,
    onSubmit,
    handleDeleteUser
  } = useUserManagement();
  if (loading) return <div className="text-center py-8">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden from-cyan-500 to-purple-200 min-h-screen ">
      <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Quản Lý Người Dùng</h2>
      
      <button 
        onClick={openModal} 
        className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        + Thêm Người Dùng
      </button>

      <div className="bg-white p-6 shadow-xl border border-gray-200">
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 text-left">Tên đăng nhập</th>
              <th className="p-4 text-left">Ảnh đại diện</th>
              <th className="p-4 text-left">Họ tên</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Vai trò</th>
              <th className="p-4 text-left">SĐT</th>
              <th className="p-4 text-left">Địa chỉ</th>
              <th className="p-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {user?.length > 0 ? (
             user.map((userItem, index) =>(
                <tr key={userItem._id || index} className="border-b border-gray-100 hover:bg-gray-50 text-gray-900">
                  <td className="p-3">{userItem.username}</td>
                  <td className="p-2">
                    <img
                      src={`http://localhost:5000/images/${userItem.avatar}`}
                      alt={`${userItem.username}'s avatar`}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-3">{userItem.fullName}</td>
                  <td className="p-3">{userItem.email}</td>
                  <td className={`px-2 py-1 text-xs font-semibold text-center rounded-lg ${
                    userItem.role === "admin" ? " text-purple-800" : " text-blue-800"
                  }`}>
                    {userItem.role}
                  </td>
                  <td className="p-3">{userItem.phoneNumber}</td>
                  <td className="p-3 max-w-xs truncate">{userItem.address}</td>
                  <td className="p-10 flex gap-2">
                    <Link
                    to={`/editUser/${userItem._id}`}
                    className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                    <button
                    onClick={()=>{
                      if(userItem._id){
                        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
                      if(confirmDelete){
                        handleDeleteUser(userItem._id)
                       alert(`Xóa thành công: ${userItem.fullName}`);
                      }
                      }
                    }}
                      className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">Không có người dùng nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm người dùng</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <input 
                  {...register("username", { required: "Tên đăng nhập là bắt buộc" })} 
                  type="text" 
                  placeholder="Tên đăng nhập*" 
                  className="w-full border p-2 rounded"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
              </div>
             <input 
                {...register("email", { 
                  required: "Email không được để trống", 
                  pattern: { 
                    value: /^\S+@\S+$/i, 
                    message: "Email không hợp lệ" 
                  } 
                })} 
                type="email" 
                placeholder="Email*" 
                className="w-full border p-2 mb-2"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <div className="mb-2">
                <input 
                  {...register("password", { required: "Mật Khẩu là bắt buộc" })} 
                  type="password" 
                  placeholder="Mật Khẩu " 
                  className="w-full border p-2 rounded"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div className="mb-2">
                <input 
                  {...register("fullName", { required: "Tên Họ là bắt buộc" })} 
                  type="text" 
                  placeholder="Họ và tên" 
                  className="w-full border p-2 rounded"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <select
                  {...register("role", { required: "Vui lòng chọn vai trò" })}
                  className="w-full border p-2 mb-2"
              >
                  <option value="">Chọn vai trò*</option>
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
               <div className="mb-2">
                <input 
                  {...register("phoneNumber", { required: "Số Điện Thoại là bắt buộc" })} 
                  type="tel" 
                  placeholder="Số điện thoại" 
                  className="w-full border p-2 rounded"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <input 
                {...register("address",{required:"Bạn Cần thêm Địa Chỉ Vào Đây"})} 
                type="text" 
                placeholder="Địa chỉ" 
                className="w-full border p-2 mb-2" 
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Ảnh đại diện*
                </label>
                <input 
                  {...register("avatar", { required: "Ảnh đại diện là bắt buộc" })} 
                  type="file" 
                  accept="image/*" 
                  className="w-full border p-2 rounded"
                />
                {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="mr-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
 