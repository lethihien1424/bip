import { useState, useEffect } from 'react';
import { BookOpen, Users } from 'lucide-react';
import api from '../../utils/api';

const Home = () => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Auth logic for hiding secure fields in details (Client Side)
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instRes, courseRes] = await Promise.all([
          api.get('/public/instructors'),
          api.get('/public/courses')
        ]);
        setInstructors(instRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchInstructorDetails = async (id) => {
    try {
      const { data } = await api.get(`/public/instructors/${id}`);
      setSelectedInstructor(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourseDetails = async (id) => {
    try {
      const { data } = await api.get(`/public/courses/${id}`);
      setSelectedCourse(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Chào mừng đến với <span className="text-blue-600">CourseManager Edu</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Nền tảng quản lý khóa học và giảng viên hiện đại, tiện lợi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Courses List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Danh sách khóa học
            </h2>
          </div>
          <div className="p-6">
            {courses.length === 0 ? (
              <p className="text-gray-500">Chưa có khóa học nào.</p>
            ) : (
              <ul className="space-y-4">
                {courses.map((course) => (
                  <li key={course._id} className="border border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-sm transition-shadow">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">Mã: {course.course_code} - {course.credits} Tín chỉ</p>
                      <p className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block bg-green-100 text-green-800 font-medium">
                        {course.status === 1 ? 'Đang giảng dạy' : 'Hoàn thành'}
                      </p>
                    </div>
                    <button
                      onClick={() => fetchCourseDetails(course._id)}
                      className="mt-4 sm:mt-0 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      Xem chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Instructors List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 bg-purple-50 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              Danh sách giảng viên
            </h2>
          </div>
          <div className="p-6">
            {instructors.length === 0 ? (
              <p className="text-gray-500">Chưa có giảng viên nào.</p>
            ) : (
              <ul className="space-y-4">
                {instructors.map((instructor) => (
                  <li key={instructor._id} className="border border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-sm transition-shadow">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{instructor.username}</h3>
                      <p className="text-sm text-gray-500">Thành viên từ: {new Date(instructor.created_at).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <button
                      onClick={() => fetchInstructorDetails(instructor._id)}
                      className="mt-4 sm:mt-0 px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors text-sm font-medium"
                    >
                      Xem chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedCourse(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-xl leading-6 font-semibold text-gray-900" id="modal-title">
                    Chi tiết khóa học
                  </h3>
                  <div className="mt-4 space-y-3 text-left">
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Mã KH:</strong> {selectedCourse.course_code}</p>
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Tên:</strong> {selectedCourse.title}</p>
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Slug:</strong> {selectedCourse.slug}</p>
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Tín chỉ:</strong> {selectedCourse.credits}</p>
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Trạng thái:</strong> {selectedCourse.status === 1 ? 'Đang giảng dạy' : selectedCourse.status === 2 ? 'Hoàn thành' : 'Đã xóa'}</p>
                    {/* Security check requirement */}
                    {isAuthenticated ? (
                       <p className="text-sm text-gray-500"><strong className="text-gray-900">Người tạo:</strong> {selectedCourse.created_by}</p>
                    ) : (
                       <p className="text-sm italic text-red-400">* Ẩn thông tin nhạy cảm vì chưa đăng nhập</p>
                    )}
                    <div className="mt-4 border-t pt-2">
                       <strong className="text-gray-900 text-sm">Summary/Description:</strong>
                       <p className="text-sm text-gray-600 mt-1">{selectedCourse.sumary}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                  onClick={() => setSelectedCourse(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructor Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedInstructor(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-xl leading-6 font-semibold text-gray-900" id="modal-title">
                    Hồ sơ giảng viên
                  </h3>
                  <div className="mt-4 space-y-3 text-left">
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Username:</strong> {selectedInstructor.username}</p>
                    <p className="text-sm text-gray-500"><strong className="text-gray-900">Ngày tham gia:</strong> {new Date(selectedInstructor.created_at).toLocaleString('vi-VN')}</p>
                    
                    {isAuthenticated ? (
                       <>
                         <p className="text-sm text-gray-500"><strong className="text-gray-900">Trạng thái:</strong> {selectedInstructor.is_active ? 'Hoạt động' : 'Đã ẩn'}</p>
                         <p className="text-sm text-gray-500"><strong className="text-gray-900">Quyền hạn:</strong> {selectedInstructor.level === 1 ? 'Admin' : 'Giảng viên'}</p>
                       </>
                    ) : (
                       <p className="text-sm italic text-red-500">* Ẩn các trường bảo mật vì chưa khai báo quyền hạn</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:text-sm"
                  onClick={() => setSelectedInstructor(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
