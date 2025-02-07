import React, { useState, useEffect } from 'react';

interface Author {
    name: string;
    email: string;
}

interface Content {
    title: string;
    description: string;
}

interface BlogData {
    metadata: {
        author: Author;
    };
    content: Content;
    views: number;
}

const BlogForm: React.FC = () => {
    const storedFormData = localStorage.getItem('formData');
    const initialFormData: BlogData = storedFormData ? JSON.parse(storedFormData) : {
        metadata: {
            author: { name: '', email: '' },
        },
        content: { title: '', description: '' },
        views: 0,
    };

    const [formData, setFormData] = useState<BlogData>(initialFormData);
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [viewingBlog, setViewingBlog] = useState<BlogData | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: string
    ) => {
        const { value, id } = e.target;
        if (id.includes('author')) {
            setFormData({
                ...formData,
                metadata: {
                    ...formData.metadata,
                    author: {
                        ...formData.metadata.author,
                        [field]: value,
                    },
                },
            });
        } else {
            setFormData({
                ...formData,
                content: { ...formData.content, [field]: value },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBlog: BlogData = {
            ...formData,
            views: 0, 
        };

        const updatedBlogs = [...blogs, newBlog];
        setBlogs(updatedBlogs);

        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

        setFormData({
            metadata: { author: { name: '', email: '' } },
            content: { title: '', description: '' },
            views: 0,
        });
    };

    const handleDelete = (index: number) => {
        const updatedBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(updatedBlogs);

        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    };

    const handleViewBlog = (index: number) => {
        const updatedBlogs = [...blogs];
        const blogToView = updatedBlogs[index];

        blogToView.views += 1;

        updatedBlogs[index] = blogToView;
        setBlogs(updatedBlogs);

        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

        setViewingBlog(blogToView);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setViewingBlog(null); 
    };

    useEffect(() => {
        const storedBlogs = localStorage.getItem('blogs');
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs));
        }
    }, []);

    return (
        <div className="w-5/10 mx-auto p-6 bg-blue-900 shadow-md rounded-lg mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Blog Creation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="authorName" className="block text-white font-medium">Author Name:</label>
                    <input
                        type="text"
                        id="authorName"
                        value={formData.metadata.author.name}
                        onChange={(e) => handleChange(e, 'name')}
                        className="w-full p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="authorEmail" className="block text-white font-medium">Author Email:</label>
                    <input
                        type="email"
                        id="authorEmail"
                        value={formData.metadata.author.email}
                        onChange={(e) => handleChange(e, 'email')}
                        className="w-full p-3 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="title" className="block text-white font-medium">Blog Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.content.title}
                        onChange={(e) => handleChange(e, 'title')}
                        className="w-full p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block p-2 text-white font-medium">Blog Description:</label>
                    <textarea
                        id="description"
                        value={formData.content.description}
                        onChange={(e) => handleChange(e, 'description')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button type="submit" className="bg-black mt-4 w-full text-white p-2 rounded-lg hover:bg-blue-400 transition-all">Post Blog</button>
            </form>

            <div className="mt-6">
                <h3 className="text-2xl text-white mb-4">All Blog Posts</h3>
                {blogs.length === 0 ? (
                    <p className="text-white">No blogs posted yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {blogs.map((blog, index) => (
                            <li key={index} className="p-4 bg-gray-800 rounded-md">
                                <h4 className="text-lg font-semibold text-white">{blog.content.title}</h4>
                                <p className="text-white">{blog.content.description}</p>
                                <p className="text-white"><strong>Author:</strong> {blog.metadata.author.name}</p>
                                <p className="text-white"><strong>Views:</strong> {blog.views}</p>
                                <button
                                    onClick={() => handleViewBlog(index)}
                                    className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 transition-all"
                                >
                                    View Blog
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="mt-2 ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-400 transition-all"
                                >
                                    Delete Blog
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isModalOpen && viewingBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md max-w-md w-full">
                        <h3 className="text-2xl text-black font-semibold mb-4">{viewingBlog.content.title}</h3>
                        <p className="text-2xl text-black" ><strong>Author:</strong> {viewingBlog.metadata.author.name}</p>
                        <p className="text-2xl text-black"><strong>Description:</strong> {viewingBlog.content.description}</p>
                        <p className="text-2xl text-black"><strong>Views:</strong> {viewingBlog.views}</p>
                        <div className="mt-4 text-right">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogForm;
