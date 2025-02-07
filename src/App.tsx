import React from 'react';
import BlogForm from './components/BlogForm'; const App: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-grey-700 via-blue-400 to-grey-700 p-6'>
      <h1 className="text-3xl font-bold text-black mb-6">Blog Creation Application</h1> <BlogForm />
    </div>
  );
};

export default App;