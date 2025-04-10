import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const Upload = ({ toggleDrop, onUpload }) => {
  const [files, setFiles] = useState([]);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // Use react-dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [], // Accept any image type (jpeg, png, gif, etc.)
    },
    maxSize: 5 * 1024 * 1024, // Max file size: 5MB
  });

  // Handle upload button click
  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files); // Pass uploaded files to parent component
      setFiles([])
      toggleDrop() // Close the modal
    } else {
      alert("Please select at least one image to upload.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
    >
      {/* Modal Container */}
      <div className="bg-[#1e244a] rounded-lg p-6 w-[400px] max-w-full shadow-lg border border-gray-700">
        {/* Header */}
        <h2 className="text-xl font-bold text-white mb-4">Upload Image</h2>

        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          <input {...getInputProps()} />
          <p className="text-gray-400">
            Drag & drop an image here, or click to select a file
          </p>
          <p className="text-sm text-gray-500 mt-2">(Max size: 5MB)</p>
        </div>

        {/* Preview of Selected Files */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-300">Preview:</h3>
            <div className="flex gap-2 overflow-x-auto">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file.preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {/* Cancel Button */}
          <button
            onClick={()=>{setFiles([]) ;  toggleDrop() }}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;