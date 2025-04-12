import { useEditUser } from "../hooks/useEditUser";
const EditUser = () => {
  const { register, handleSubmit, onSubmit, handleFileChange, preview } = useEditUser();
   return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden from-cyan-500 to-purple-200 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Chỉnh sửa người dùng</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
              <input
                {...register("username", { required: true })}
                placeholder="Nhập tên đăng nhập..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Nhập email..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
              <input
                {...register("fullName", { required: true })}
                placeholder="Nhập họ và tên..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Vai trò</label>
              <select
                {...register("role", { required: true })}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="Nhập số điện thoại..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Địa chỉ</label>
              <input
                {...register("address")}
                placeholder="Nhập địa chỉ..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Mật khẩu mới (để trống nếu không đổi)</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Nhập mật khẩu mới..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
           <div>
            <label className="block text-gray-700 font-medium mb-1">Ảnh sản phẩm</label>
            <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer" />
            {preview && (
              <img src={preview} alt="Ảnh sản phẩm" className="w-full h-40 object-cover rounded-lg mt-3 shadow-md" />
            )}
          </div>
          </div>
          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Cập nhật người dùng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
