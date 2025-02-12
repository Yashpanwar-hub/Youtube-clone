import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadVideo } from '../services/api';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError('');
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setError('Please select a valid video file');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(file);
      setError('');
    } else {
      setError('Please select a valid image file for thumbnail');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnail || !title || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('thumbnail', thumbnail);
      formData.append('title', title);
      formData.append('description', description);

      const response = await uploadVideo(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(progress);
      });

      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Reset form
      setVideoFile(null);
      setThumbnail(null);
      setTitle('');
      setDescription('');
      setProgress(0);
      setPreviewUrl('');

      // Navigate to the video page
      // navigate(`/video/${response._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pl-64 pt-14 bg-[#f9f9f9] min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-medium mb-6">Upload Video</h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a video</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="video/*"
                        onChange={handleVideoChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">MP4, WebM up to 2GB</p>
                </div>
              </div>
              {videoFile && (
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-500">{videoFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setVideoFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a thumbnail</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
              {thumbnail && (
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-500">{thumbnail.name}</span>
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter video title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter video description"
              />
            </div>

            {/* Upload Progress */}
            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload; 