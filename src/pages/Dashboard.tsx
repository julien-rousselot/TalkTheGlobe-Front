import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Material } from '../types/types';
import { materialsCache } from '../utils/materialsCache';
import { getImageUrl } from '../config/storage';

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
  const [selectedResource, setSelectedResource] = useState<'free' | 'paid'>('free');

  // New state for edit mode and materials management
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showMaterialsList, setShowMaterialsList] = useState(false);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const savedToken = localStorage.getItem('token');

  const navigate = useNavigate();
  const allImages = cover ? [cover, ...pictures] : pictures;

  useEffect(() => {
    if (!savedToken) {
      navigate('/');
    } else {
      setToken(savedToken);
      fetchMaterials(savedToken);
    }
  }, [navigate]);

  // Set initial publish date when component mounts
  useEffect(() => {
    if (!publishAt) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      setPublishAt(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, []);

  // Fetch all materials
  const fetchMaterials = async (savedToken: string) => {
    try {
      const response = await api.get('/materials', {
        headers: {
          'Authorization': `Bearer ${savedToken}`,
        },
      });
      setMaterials(response.data);
    } catch (err: any) {
      setError(err);
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch materials:', err);
      }
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setCover(null);
    setPictures([]);
    setCurrentIndex(0);
    setIsDraft(false);
    setPublishAt(formatDateForInput(new Date())); // Set current date as default
    setPDF(null);
    setSelectedResource('free');
    // Don't clear success message here - let it persist
    setError('');
    setIsEditMode(false);
    setEditingMaterialId(null);
  };

  // Helper function to format date for datetime-local input
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Load material data for editing
  const loadMaterialForEdit = (material: Material) => {
    
    setTitle(material.title || '');
    setDescription(material.description || '');
    
    // Fix price handling - check material.price to determine if it's free or paid
    const priceValue = material.price?.toString() || '';
    const priceNumber = parseFloat(priceValue) || 0;
    const isActuallyFree = priceNumber === 0 || priceValue === '' || priceValue === '0' || priceValue === '0.00';
    
    if (isActuallyFree) {
      setPrice('');
      setSelectedResource('free');
    } else {
      setPrice(priceValue);
      setSelectedResource('paid');
    }
        
    // Prefill draft status
    const isDraftValue = material.isDraft === true || material.isDraft === 'true' || material.isDraft === 1 || material.isDraft === '1';
    setIsDraft(isDraftValue);
    
    // Prefill publish date - check publishAt first since that's what your backend uses
    const publishAtValue = (material as any).publishAt || material.publish_at || (material as any).published_at || (material as any).publishedAt;
    
    if (publishAtValue) {
      try {
        const publishDate = new Date(publishAtValue);
        if (!isNaN(publishDate.getTime())) {
          setPublishAt(formatDateForInput(publishDate));
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Invalid date received for publish date:', publishAtValue);
          }
          setPublishAt(formatDateForInput(new Date()));
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error parsing publish date:', publishAtValue, error);
        }
        setPublishAt(formatDateForInput(new Date()));
      }
    } else {
      setPublishAt(formatDateForInput(new Date()));
    }
    
    setIsEditMode(true);
    setEditingMaterialId(material.id);
    setShowMaterialsList(false);
    setCover(null);
    setPictures([]);
    setPDF(null);
    setSuccess(''); // Clear success message when starting to edit
    setError('');
  };

  // Delete material
  const deleteMaterial = async (materialId: string) => {
    if (!confirm('Are you sure you want to delete this material? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/material/${materialId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setMaterials(prev => prev.filter(m => m.id !== materialId));
      setSuccess('Material deleted successfully!');
      
      // Clear cache to ensure users see updated content immediately
      materialsCache.clearCache();
      
      // If we're editing this material, reset the form
      if (editingMaterialId === materialId) {
        resetForm();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete material');
    }
  };

  const submitForm = async () => {
    if (!title || !description || (selectedResource === 'paid' && !price)) {
      let errorMsg = 'Title and description are required';
      if (selectedResource === 'paid' && !price) {
        errorMsg = 'Price is required for paid materials';
      }
      setError(errorMsg);
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
        // Send both field names to ensure compatibility
        formData.append('publish_at', publishAt);
        formData.append('publishAt', publishAt);
      }

      let response;
      if (isEditMode && editingMaterialId) {
        // Update existing material
        response = await api.put(`/material/${editingMaterialId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        // Create new material
        response = await api.post('/material/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        const successMessage = isEditMode ? 'Material updated successfully!' : 'Material created successfully!';
        
        // Reset form first, then set success message so it persists
        resetForm();
        setSuccess(successMessage);
        
        // Clear cache to ensure users see updated content immediately
        materialsCache.clearCache();
        
        // Refresh materials list
        if (token) {
          fetchMaterials(token);
        }
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setSuccess('');
        }, 5000);
      }
    } catch (err: any) {
      const errorMessage = isEditMode ? 'Failed to update material' : 'Failed to create material';
      setError(err.response.data.error || errorMessage);
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
              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowMaterialsList(false);
                    if (isEditMode) resetForm();
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !showMaterialsList
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={isEditMode ? "edit" : "plus"} className="mr-2" />
                  {isEditMode ? 'Edit Material' : 'Create Material'}
                </button>
                <button
                  onClick={() => setShowMaterialsList(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showMaterialsList
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon="list" className="mr-2" />
                  Manage Materials
                </button>
              </div>
              
              <span className="text-sm text-gray-500">Welcome back, Admin</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon="user" className="text-white text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showMaterialsList ? (
          /* Materials List Section */
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon="list" className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">All Materials</h2>
                  <p className="text-sm text-gray-500">Manage your educational content ({materials.length} items)</p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowMaterialsList(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon icon="plus" className="mr-2" />
                Add New Material
              </button>
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

            {/* Materials Grid */}
            {materials.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FontAwesomeIcon icon="file-alt" className="text-4xl mb-4" />
                <p className="text-lg">No materials found</p>
                <p className="text-sm">Create your first material to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                  <div key={material.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Material Cover */}
                    {material.cover && (
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                        <img
                          src={getImageUrl(material.cover)}
                          alt={material.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Material Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{material.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{material.description}</p>
                      
                      {/* Resource Type & Price */}
                      <div className="flex items-center justify-between">
                        {(() => {
                          const priceNumber = parseFloat(material.price?.toString() || '0');
                          const isPaid = priceNumber > 0;
                          return (
                            <>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isPaid ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}>
                                <FontAwesomeIcon 
                                  icon={isPaid ? 'shopping-cart' : 'gift'} 
                                  className="mr-1" 
                                />
                                {isPaid ? 'Shop Item' : 'Free Resource'}
                              </span>
                              {isPaid && (
                                <span className="font-bold text-gray-900">{material.price}€</span>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => loadMaterialForEdit(material)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <FontAwesomeIcon icon="edit" className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMaterial(material.id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <FontAwesomeIcon icon="trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Form Section - Keep the existing grid layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={isEditMode ? "edit" : "plus"} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditMode ? 'Edit Material' : 'Create New Material'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isEditMode ? 'Update your educational content' : 'Add educational content to your resources'}
                </p>
              </div>
            </div>

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
                    <FontAwesomeIcon icon="euro-sign" className="mr-2" />
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
                {selectedResource === 'paid' && (
                  <>
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
                  </>
                )}

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
                      onChange={(e) => setIsDraft(e.target.checked)}
                      checked={isDraft}
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
                    Want to schedule?
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
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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

              {/* Alert Messages - Placed after buttons */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <FontAwesomeIcon icon="exclamation-triangle" className="text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <FontAwesomeIcon icon="check-circle" className="text-green-500" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}
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
                      <span className="text-xl font-bold text-gray-900">{price}€</span>
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
