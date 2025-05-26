
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const AssessmentTools = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState<any>(null);

  // Form state for new/edit tool
  const [toolForm, setToolForm] = useState({
    name: '',
    targetedCOs: '',
    description: '',
    maxMarks: '',
    weightage: ''
  });

  // Mock courses data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  // Mock assessment tools data
  const [assessmentTools, setAssessmentTools] = useState([
    { id: 1, name: "Mid Term Test 1", targetedCOs: "CO1, CO2", description: "First mid-term examination", maxMarks: 20, weightage: 30 },
    { id: 2, name: "Assignment 1", targetedCOs: "CO1, CO3", description: "Programming assignment", maxMarks: 10, weightage: 10 },
    { id: 3, name: "Lab Test 1", targetedCOs: "CO2, CO4", description: "Practical examination", maxMarks: 25, weightage: 20 },
    { id: 4, name: "Project", targetedCOs: "CO3, CO4, CO5", description: "Final project submission", maxMarks: 50, weightage: 40 },
  ]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToolForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add new tool
  const handleAddTool = () => {
    setEditingTool(null);
    setToolForm({
      name: '',
      targetedCOs: '',
      description: '',
      maxMarks: '',
      weightage: ''
    });
    setShowModal(true);
  };

  // Handle edit tool
  const handleEditTool = (tool: any) => {
    setEditingTool(tool);
    setToolForm({
      name: tool.name,
      targetedCOs: tool.targetedCOs,
      description: tool.description,
      maxMarks: tool.maxMarks.toString(),
      weightage: tool.weightage.toString()
    });
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', toolForm);

    if (!toolForm.name || !toolForm.targetedCOs) {
      alert('Tool name and targeted COs are required!');
      return;
    }

    const toolData = {
      id: editingTool ? editingTool.id : assessmentTools.length + 1,
      name: toolForm.name,
      targetedCOs: toolForm.targetedCOs,
      description: toolForm.description,
      maxMarks: parseInt(toolForm.maxMarks) || 0,
      weightage: parseInt(toolForm.weightage) || 0
    };

    if (editingTool) {
      // Update existing tool
      setAssessmentTools(prev => 
        prev.map(tool => tool.id === editingTool.id ? toolData : tool)
      );
      alert('Assessment tool updated successfully!');
    } else {
      // Add new tool
      setAssessmentTools(prev => [...prev, toolData]);
      alert('Assessment tool added successfully!');
    }

    setShowModal(false);
    setEditingTool(null);
  };

  // Handle delete tool
  const handleDeleteTool = (id: number) => {
    if (confirm('Are you sure you want to delete this assessment tool?')) {
      setAssessmentTools(prev => prev.filter(tool => tool.id !== id));
      console.log(`Deleted assessment tool with ID: ${id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Assessment Tools</h1>
            <p className="text-gray-600 mt-1">Manage assessment tools and their CO mappings</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
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
                <button
                  onClick={handleAddTool}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-purple-700 transition duration-200"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Tool
                </button>
              )}
            </div>
          </div>

          {/* Assessment Tools Table */}
          {selectedCourse && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Assessment Tools</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tool Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Targeted COs</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Max Marks</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Weightage (%)</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {assessmentTools.map((tool) => (
                      <tr key={tool.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{tool.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tool.targetedCOs}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{tool.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tool.maxMarks}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{tool.weightage}%</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => handleEditTool(tool)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTool(tool.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {assessmentTools.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No assessment tools found. Click "Add New Tool" to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Tool */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingTool ? 'Edit Assessment Tool' : 'Add New Assessment Tool'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Tool Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={toolForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Mid Term Test 1"
                  required
                />
              </div>

              {/* Targeted COs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Targeted COs <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="targetedCOs"
                  value={toolForm.targetedCOs}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., CO1, CO2, CO3"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={toolForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief description of the assessment tool"
                />
              </div>

              {/* Max Marks and Weightage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Marks
                  </label>
                  <input
                    type="number"
                    name="maxMarks"
                    value={toolForm.maxMarks}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weightage (%)
                  </label>
                  <input
                    type="number"
                    name="weightage"
                    value={toolForm.weightage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-purple-700 transition duration-200"
                >
                  {editingTool ? 'Update Tool' : 'Add Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentTools;
