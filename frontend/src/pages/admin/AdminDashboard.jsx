const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Bảng điều khiển Admin</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700 text-lg mb-2">
            Chào mừng bạn đến với trang quản trị Hệ thống Quản lý Khóa học & Giảng viên.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Điều hướng ở thanh menu bên trái để quản lý <strong>Khóa học</strong>.</li>
            <li>Điều hướng ở thanh menu bên trái để quản lý <strong>Giảng viên</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
