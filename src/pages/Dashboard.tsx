import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../api';

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [pictures, setPictures] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [publishAt, setPublishAt] = useState<string | null>(null);
  const [pdf, setPDF] = useState<File | null>(null);
  const [selectedResource, setSelectedResource] = useState<'free' | 'paid' | null>('free');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const allImages = cover ? [cover, ...pictures] : pictures;

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      navigate('/');
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setCover(null);
    setPictures([]);
    setCurrentIndex(0);
    setIsDraft(false);
    setPublishAt(null);
    setPDF(null);
    setSelectedResource('free');
    setSuccess('');
    setError('');
  };

  const submitForm = async () => {
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price || '0');
      formData.append('selectedResource', selectedResource || 'free');
      
      if (cover) {
        formData.append('cover', cover);
      }
      
      pictures.forEach((picture) => {
        formData.append(`pictures`, picture);
      });
      
      if (pdf) {
        formData.append('pdf', pdf);
      }
      
      formData.append('isDraft', isDraft ? 'true' : 'false');
      if (publishAt) {
        formData.append('publish_at', publishAt);
      }
      const response = await api.post('/material/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess('Material created successfully!');
        resetForm();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create material');
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover(file);
    }
  };

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPDF(file);
    }
  };

  const removePicture = (indexToRemove: number) => {
    setPictures(prev => prev.filter((_, index) => index !== indexToRemove));
    if (currentIndex >= indexToRemove && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const removeCover = () => {
    setCover(null);
  };

  const removePDF = () => {
    setPDF(null);
  };

  const nextImage = () => {
    if (allImages.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const handleAddPictures = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setPictures(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Create and manage your educational materials</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Welcome back, Admin</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon="user" className="text-white text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="plus" className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create New Material</h2>
                <p className="text-sm text-gray-500">Add educational content to your resources</p>
              </div>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <FontAwesomeIcon icon="exclamation-triangle" className="text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <FontAwesomeIcon icon="check-circle" className="text-green-500" />
                <span className="text-green-700">{success}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon="heading" className="mr-2" />
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter material title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon="align-left" className="mr-2" />
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your material..."
                />
              </div>

              {/* Resource Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon="tags" className="mr-2" />
                  Resource Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="free"
                      checked={selectedResource === 'free'}
                      onChange={(e) => setSelectedResource(e.target.value as 'free' | 'paid')}
                      className="mr-2"
                    />
                    <span className="text-green-600">
                      <FontAwesomeIcon icon="gift" className="mr-1" />
                      Free Resource
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="paid"
                      checked={selectedResource === 'paid'}
                      onChange={(e) => setSelectedResource(e.target.value as 'free' | 'paid')}
                      className="mr-2"
                    />
                    <span className="text-blue-600">
                      <FontAwesomeIcon icon="shopping-cart" className="mr-1" />
                      Shop Item
                    </span>
                  </label>
                </div>
              </div>

              {/* Price (only for paid resources) */}
              {selectedResource === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              )}

              {/* File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon="image" className="mr-2" />
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer">
                      {cover ? (
                        <div className="relative">
                          <img 
                            src={URL.createObjectURL(cover)} 
                            alt="Cover preview" 
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={removeCover}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <FontAwesomeIcon icon="cloud-upload-alt" className="text-2xl mb-2" />
                          <p className="text-sm">Click to upload cover</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon="file-pdf" className="mr-2" />
                    PDF Material
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePDFUpload}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      {pdf ? (
                        <div className="relative">
                          <div className="bg-red-100 p-4 rounded-md">
                            <FontAwesomeIcon icon="file-pdf" className="text-red-500 text-2xl mb-2" />
                            <p className="text-sm text-gray-700 truncate">{pdf.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={removePDF}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <FontAwesomeIcon icon="file-pdf" className="text-2xl mb-2" />
                          <p className="text-sm">Click to upload PDF</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Pictures */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon="images" className="mr-2" />
                  Additional Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddPictures}
                    className="hidden"
                    id="pictures-upload"
                  />
                  <label htmlFor="pictures-upload" className="cursor-pointer">
                    <div className="text-gray-400">
                      <FontAwesomeIcon icon="images" className="text-2xl mb-2" />
                      <p className="text-sm">Click to upload multiple images</p>
                      <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple files</p>
                    </div>
                  </label>
                </div>

                {/* Display uploaded pictures */}
                {pictures.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {pictures.map((picture, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(picture)} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removePicture(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Publishing Options */}
              <div className="border-t pt-6 space-y-4">
                {/* Draft Option */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isDraft}
                      onChange={(e) => setIsDraft(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      <FontAwesomeIcon icon="file-alt" className="mr-1" />
                      Save as draft
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 ml-6 mt-1">
                    Drafts are saved but not published to users
                  </p>
                </div>

                {/* Publish Date Option */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon="calendar" className="mr-2" />
                    Publish Date (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={publishAt || ''}
                    onChange={(e) => setPublishAt(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Schedule when this material should be published. Leave empty to publish immediately.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    loading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <FontAwesomeIcon icon="spinner" className="animate-spin mr-2" />
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FontAwesomeIcon icon="save" className="mr-2" />
                      {isDraft ? 'Save Draft' : 'Publish Material'}
                    </span>
                  )}
                </button>

                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon="undo" className="mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="eye" className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                <p className="text-sm text-gray-500">See how your material will look</p>
              </div>
            </div>

            {/* Preview Content */}
            <div className="border rounded-lg p-6 bg-gray-50">
              {title || description || allImages.length > 0 ? (
                <div className="space-y-4">
                  {/* Title Preview */}
                  {title && (
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                  )}

                  {/* Image Carousel Preview */}
                  {allImages.length > 0 && (
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(allImages[currentIndex])}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
                          >
                            <FontAwesomeIcon icon="chevron-left" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
                          >
                            <FontAwesomeIcon icon="chevron-right" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {allImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Description Preview */}
                  {description && (
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                  )}

                  {/* Resource Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon 
                        icon={selectedResource === 'free' ? 'gift' : 'shopping-cart'} 
                        className={selectedResource === 'free' ? 'text-green-500' : 'text-blue-500'} 
                      />
                      <span className={`font-medium ${selectedResource === 'free' ? 'text-green-600' : 'text-blue-600'}`}>
                        {selectedResource === 'free' ? 'Free Resource' : 'Shop Item'}
                      </span>
                    </div>
                    
                    {selectedResource === 'paid' && price && (
                      <span className="text-xl font-bold text-gray-900">${price}</span>
                    )}
                  </div>

                  {/* PDF Preview */}
                  {pdf && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                      <FontAwesomeIcon icon="file-pdf" className="text-red-500 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">PDF Material</p>
                        <p className="text-sm text-gray-600">{pdf.name}</p>
                      </div>
                    </div>
                  )}

                  {/* Status Preview */}
                  <div className="flex items-center gap-2 text-sm">
                    <FontAwesomeIcon 
                      icon={isDraft ? 'file-alt' : 'check-circle'} 
                      className={isDraft ? 'text-yellow-500' : 'text-green-500'} 
                    />
                    <span className={isDraft ? 'text-yellow-600' : 'text-green-600'}>
                      {isDraft ? 'Draft' : 'Ready to Publish'}
                    </span>
                    {publishAt && (
                      <>
                        <span className="text-gray-400">•</span>
                        <FontAwesomeIcon icon="calendar" className="text-blue-500" />
                        <span className="text-blue-600">
                          Scheduled for {new Date(publishAt).toLocaleDateString()} at {new Date(publishAt).toLocaleTimeString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <FontAwesomeIcon icon="file-alt" className="text-4xl mb-4" />
                  <p>Start filling the form to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
