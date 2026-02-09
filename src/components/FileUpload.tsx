import { useState, useRef, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { laravelApi } from '../services/laravelApi';

interface FileUploadProps {
  onUploadSuccess: (fileUrl: string, filePath: string) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  autoUpload?: boolean;
}

const FileUpload = ({
  onUploadSuccess,
  onUploadError,
  folder = 'uploads',
  label = 'Upload Image',
  accept = 'image/jpeg,image/png,image/gif,image/webp',
  maxSize = 2, // 2MB default
  autoUpload = true,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (file && autoUpload) {
      handleUpload();
    }
  }, [file]);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    setSuccess(false);

    // Validate file type
    const validTypes = accept.split(',').map(t => t.trim());
    if (!validTypes.includes(selectedFile.type)) {
      const errorMsg = `Invalid file type. Accepted types: ${accept}`;
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      const errorMsg = `File size exceeds ${maxSize}MB limit`;
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // If autoUpload is on, file is selected, so we can proceed.
    // If not, button click calls this.
    if (!file) {
      if (!autoUpload) setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await laravelApi.upload.file(file, folder);
      setSuccess(true);
      onUploadSuccess(response.url, response.path);

      // Reset after 2 seconds
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Upload failed';
      setError(errorMsg);
      onUploadError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">
            Drag and drop your image here, or click to select
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Supported formats: JPG, PNG, GIF, WebP (Max {maxSize}MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative inline-block w-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            {!success && !loading && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X size={20} />
              </button>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-white text-sm font-medium flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </div>
              </div>
            )}
          </div>

          {/* File Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>File:</strong> {file?.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {((file?.size || 0) / 1024 / 1024).toFixed(2)}MB
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 bg-red-50 p-4 rounded-lg border border-red-200">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 bg-green-50 p-4 rounded-lg border border-green-200">
              <CheckCircle className="text-green-600" size={20} />
              <p className="text-green-700 text-sm">Upload successful!</p>
            </div>
          )}

          {/* Upload Button - Only show if autoUpload is false */}
          {!success && !autoUpload && (
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={18} />
                  <span>Upload Image</span>
                </>
              )}
            </button>
          )}

          {/* Change File Button */}
          {!loading && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Choose Different File
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
