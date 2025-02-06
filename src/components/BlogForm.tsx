import React, { useState } from 'react';
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
}

const BlogForm: React.FC = () => {
    const [formData, setFormData] = useState<BlogData>({
        metadata: {
            author: { name: '', email: '' },
        },
        content: { title: '', description: '' },
    });

    const [submittedData, setSubmittedData] = useState<BlogData | null>(null);

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
                        [field]: value
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
        setSubmittedData(formData);
    };

    return (
        <div className="w-5/10  mx-auto p-6 bg-blue-900 shadow-md rounded-lg mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Blog Creation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="authorName" className="block  text-white font-medium">Author Name:</label>
                    <input
                        type="text"
                        id="authorName"
                        value={formData.metadata.author.name}
                        onChange={(e) => handleChange(e, 'name')}
                        className="w-full p-2 border  border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="authorEmail" className="block text-white font-medium">Author Email:</label>
                    <input
                        type="email"
                        id="authorEmail"
                        value={formData.metadata.author.email}
                        onChange={(e) => handleChange(e, 'email')}
                        className="w-full p-3  border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="title" className="block text-white  font-medium">Blog Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.content.title}
                        onChange={(e) => handleChange(e, 'title')}
                        className="w-full  p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                <button type="submit" className=" bg-black mt-4 w-full text-white p-2 rounded-lg hover:bg-blue-400 transition-all">Post Blog</button>
            </form>

            {submittedData && (
                <div className="mt-10 p-8 bg-black rounded-md">
                    <p className="text-lg mb-4 font-semibold text-white">Submitted Blog Data:</p>
                    <p><strong>Title:</strong>{submittedData.content.title}</p>
                    <p><strong>Description:</strong>{submittedData.content.description}</p>
                    <p><strong>Author Name:</strong>{submittedData.metadata.author.name}</p>
                    <p><strong>Author Email:</strong>{submittedData.metadata.author.email}</p>
                </div>
            )}
        </div>
    );
};

export default BlogForm;