
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Upload, FileText, X, Download } from 'lucide-react';

const UploadDocuments = () => {
  // State for selected course and uploaded files
  const [selectedCourse, setSelectedCourse] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({
    vision: null,
    students: null,
    timetable: null,
    syllabus: null,
    policy: null
  });

  // Mock courses data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  // Document types with descriptions
  const documentTypes = [
    {
      key: 'vision',
      title: 'Vision & Mission',
      description: 'Department vision and mission statements',
      acceptedFormats: '.pdf, .doc, .docx'
    },
    {
      key: 'students',
      title: 'Student List',
      description: 'Complete student enrollment list',
      acceptedFormats: '.xlsx, .csv, .pdf'
    },
    {
      key: 'timetable',
      title: 'Timetables',
      description: 'Class and lab timetables',
      acceptedFormats: '.pdf, .jpg, .png'
    },
    {
      key: 'syllabus',
      title: 'Syllabus',
      description: 'Complete course syllabus',
      acceptedFormats: '.pdf, .doc, .docx'
    },
    {
      key: 'policy',
      title: 'Course Policy',
      description: 'Course policies and guidelines',
      acceptedFormats: '.pdf, .doc, .docx'
    }
  ];

  // Handle file upload
  const handleFileUpload = (documentType: string, file: File) => {
    console.log(`Uploading ${file.name} for ${documentType}`);
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
    alert(`${file.name} uploaded successfully!`);
  };

  // Handle file removal
  const handleFileRemove = (documentType: string) => {
    console.log(`Removing file for ${documentType}`);
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: null
    }));
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, documentType: string) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(documentType, files[0]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Upload Documents</h1>
            <p className="text-gray-600 mt-1">Upload course-related documents and files</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Course</h2>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id.toString()}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Cards */}
          {selectedCourse && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((docType) => (
                <div key={docType.key} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {docType.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {docType.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Accepted formats: {docType.acceptedFormats}
                  </p>

                  {/* Upload Area */}
                  {!uploadedFiles[docType.key] ? (
                    <div
                      className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, docType.key)}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = docType.acceptedFormats.replace(/\s/g, '');
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) handleFileUpload(docType.key, file);
                        };
                        input.click();
                      }}
                    >
                      <Upload className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop your file here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">or</p>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                        Browse Files
                      </button>
                    </div>
                  ) : (
                    /* File Preview */
                    <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {uploadedFiles[docType.key]?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(uploadedFiles[docType.key]?.size || 0 / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => console.log('Download file')}
                            className="text-blue-600 hover:text-blue-800"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleFileRemove(docType.key)}
                            className="text-red-600 hover:text-red-800"
                            title="Remove"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Replace Button */}
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = docType.acceptedFormats.replace(/\s/g, '');
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) handleFileUpload(docType.key, file);
                          };
                          input.click();
                        }}
                        className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Replace File
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload Summary */}
          {selectedCourse && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {documentTypes.map((docType) => (
                  <div key={docType.key} className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                      uploadedFiles[docType.key] ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <FileText className={`h-6 w-6 ${
                        uploadedFiles[docType.key] ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <p className="text-xs text-gray-600">{docType.title}</p>
                    <p className={`text-xs font-medium ${
                      uploadedFiles[docType.key] ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {uploadedFiles[docType.key] ? 'Uploaded' : 'Pending'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
