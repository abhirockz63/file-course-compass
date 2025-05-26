
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Upload, FileText, Plus, Trash2 } from 'lucide-react';

const TestManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState('mtt1');

  // Mock courses data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  // Question structure state
  const [questionStructure, setQuestionStructure] = useState([
    { id: 1, questionNo: 'Q1', marks: 2, targetedCO: 'CO1', type: 'MCQ' },
    { id: 2, questionNo: 'Q2', marks: 3, targetedCO: 'CO2', type: 'Short Answer' },
    { id: 3, questionNo: 'Q3', marks: 5, targetedCO: 'CO3', type: 'Long Answer' },
  ]);

  // File uploads state
  const [uploadedFiles, setUploadedFiles] = useState({
    mtt1: {
      questionPaper: null as File | null,
      answerKey: null as File | null,
      markingScheme: null as File | null,
    },
    mtt2: {
      questionPaper: null as File | null,
      answerKey: null as File | null,
      markingScheme: null as File | null,
    }
  });

  // Student marks state
  const [studentMarks, setStudentMarks] = useState([
    { id: 1, rollNo: '101', name: 'John Smith', q1: 2, q2: 3, q3: 4, total: 9 },
    { id: 2, rollNo: '102', name: 'Jane Doe', q1: 1, q2: 2, q3: 5, total: 8 },
    { id: 3, rollNo: '103', name: 'Bob Johnson', q1: 2, q2: 3, q3: 3, total: 8 },
  ]);

  // Handle file upload
  const handleFileUpload = (testType: string, fileType: string, file: File) => {
    console.log(`Uploading ${file.name} for ${testType} - ${fileType}`);
    setUploadedFiles(prev => ({
      ...prev,
      [testType]: {
        ...prev[testType as keyof typeof prev],
        [fileType]: file
      }
    }));
    alert(`${file.name} uploaded successfully!`);
  };

  // Add new question
  const addQuestion = () => {
    const newQuestion = {
      id: questionStructure.length + 1,
      questionNo: `Q${questionStructure.length + 1}`,
      marks: 0,
      targetedCO: '',
      type: 'MCQ'
    };
    setQuestionStructure(prev => [...prev, newQuestion]);
  };

  // Update question structure
  const updateQuestion = (id: number, field: string, value: string | number) => {
    setQuestionStructure(prev =>
      prev.map(q => q.id === id ? { ...q, [field]: value } : q)
    );
  };

  // Delete question
  const deleteQuestion = (id: number) => {
    setQuestionStructure(prev => prev.filter(q => q.id !== id));
  };

  // Update student marks
  const updateStudentMarks = (studentId: number, field: string, value: number) => {
    setStudentMarks(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          const updated = { ...student, [field]: value };
          // Recalculate total
          if (field !== 'total') {
            updated.total = updated.q1 + updated.q2 + updated.q3;
          }
          return updated;
        }
        return student;
      })
    );
  };

  const currentFiles = uploadedFiles[activeTab as keyof typeof uploadedFiles];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Test Management</h1>
            <p className="text-gray-600 mt-1">Manage mid-term tests and student assessments</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Course</h2>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full sm:w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id.toString()}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <>
              {/* Test Tabs */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('mtt1')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'mtt1'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      MTT-1 (Mid Term Test 1)
                    </button>
                    <button
                      onClick={() => setActiveTab('mtt2')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'mtt2'
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      MTT-2 (Mid Term Test 2)
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Question Structure Section */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Question Structure</h3>
                      <button
                        onClick={addQuestion}
                        className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 text-sm"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Question
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Question No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Marks</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Targeted CO</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Question Type</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {questionStructure.map((question) => (
                            <tr key={question.id}>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="text"
                                  value={question.questionNo}
                                  onChange={(e) => updateQuestion(question.id, 'questionNo', e.target.value)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="number"
                                  value={question.marks}
                                  onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  min="0"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <select
                                  value={question.targetedCO}
                                  onChange={(e) => updateQuestion(question.id, 'targetedCO', e.target.value)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                >
                                  <option value="">Select CO</option>
                                  <option value="CO1">CO1</option>
                                  <option value="CO2">CO2</option>
                                  <option value="CO3">CO3</option>
                                  <option value="CO4">CO4</option>
                                  <option value="CO5">CO5</option>
                                </select>
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <select
                                  value={question.type}
                                  onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                >
                                  <option value="MCQ">MCQ</option>
                                  <option value="Short Answer">Short Answer</option>
                                  <option value="Long Answer">Long Answer</option>
                                  <option value="Numerical">Numerical</option>
                                </select>
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                  onClick={() => deleteQuestion(question.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Files</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { key: 'questionPaper', title: 'Question Paper', accept: '.pdf,.doc,.docx' },
                        { key: 'answerKey', title: 'Answer Key', accept: '.pdf,.doc,.docx' },
                        { key: 'markingScheme', title: 'Marking Scheme', accept: '.pdf,.doc,.docx' }
                      ].map((fileType) => (
                        <div key={fileType.key} className="border border-gray-300 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-3">{fileType.title}</h4>
                          
                          {!currentFiles[fileType.key as keyof typeof currentFiles] ? (
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 transition-colors"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = fileType.accept;
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0];
                                  if (file) handleFileUpload(activeTab, fileType.key, file);
                                };
                                input.click();
                              }}
                            >
                              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Click to upload</p>
                              <p className="text-xs text-gray-500 mt-1">{fileType.accept}</p>
                            </div>
                          ) : (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-green-600 mr-2" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-800">
                                    {currentFiles[fileType.key as keyof typeof currentFiles]?.name}
                                  </p>
                                  <p className="text-xs text-green-600">Uploaded successfully</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marks Entry Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Marks Entry</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Roll No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Student Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Q1 (2M)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Q2 (3M)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Q3 (5M)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Total (10M)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentMarks.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 text-sm">{student.rollNo}</td>
                              <td className="border border-gray-300 px-4 py-2 text-sm">{student.name}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="number"
                                  value={student.q1}
                                  onChange={(e) => updateStudentMarks(student.id, 'q1', parseInt(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  min="0"
                                  max="2"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="number"
                                  value={student.q2}
                                  onChange={(e) => updateStudentMarks(student.id, 'q2', parseInt(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  min="0"
                                  max="3"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="number"
                                  value={student.q3}
                                  onChange={(e) => updateStudentMarks(student.id, 'q3', parseInt(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  min="0"
                                  max="5"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-sm font-medium">{student.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestManagement;
