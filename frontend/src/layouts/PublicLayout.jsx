import { Outlet, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[60px]">
      <nav className="bg-white shadow-md w-full fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Course Manger Edu
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Course Manager System - Created by MERN Developer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
