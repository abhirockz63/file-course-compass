
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const CourseDetails = () => {
  // Form state management
  const [formData, setFormData] = useState({
    academicYear: '',
    year: '',
    semester: '',
    subjectName: '',
    subjectCode: '',
    type: 'theory',
    hoursPerWeek: ''
  });

  // Mock existing courses data
  const [courses, setCourses] = useState([
    { id: 1, name: "Data Structures", code: "CS201", year: "SY", semester: "I", type: "Theory", hours: 4 },
    { id: 2, name: "Database Lab", code: "CS301L", year: "TY", semester: "I", type: "Practical", hours: 2 },
    { id: 3, name: "Web Development", code: "CS302", year: "TY", semester: "I", type: "Theory", hours: 3 },
  ]);

  // Dropdown options
  const academicYears = ['2024-25', '2023-24', '2022-23'];
  const years = ['FY', 'SY', 'TY', 'B.Tech', 'M.Tech'];
  const semesters = ['I', 'II', 'Odd', 'Even'];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(`Updated ${name}:`, value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Simple validation
    if (!formData.subjectName || !formData.subjectCode) {
      alert('Subject Name and Code are required!');
      return;
    }

    // Add new course to the list
    const newCourse = {
      id: courses.length + 1,
      name: formData.subjectName,
      code: formData.subjectCode,
      year: formData.year,
      semester: formData.semester,
      type: formData.type === 'theory' ? 'Theory' : 'Practical',
      hours: parseInt(formData.hoursPerWeek) || 0
    };

    setCourses(prev => [...prev, newCourse]);
    
    // Reset form
    setFormData({
      academicYear: '',
      year: '',
      semester: '',
      subjectName: '',
      subjectCode: '',
      type: 'theory',
      hoursPerWeek: ''
    });

    alert('Course added successfully!');
  };

  // Handle delete course
  const handleDeleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== id));
      console.log(`Deleted course with ID: ${id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
            <p className="text-gray-600 mt-1">Add and manage your courses</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Course</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Semester</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {/* Hours per Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours per Week
                </label>
                <input
                  type="number"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter hours per week"
                />
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter subject name"
                  required
                />
              </div>

              {/* Subject Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter subject code"
                  required
                />
              </div>

              {/* Theory/Practical Radio Buttons */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Type
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="theory"
                      checked={formData.type === 'theory'}
                      onChange={handleInputChange}
                      className="mr-2 text-purple-600"
                    />
                    <span className="text-gray-700">Theory</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="practical"
                      checked={formData.type === 'practical'}
                      onChange={handleInputChange}
                      className="mr-2 text-purple-600"
                    />
                    <span className="text-gray-700">Practical</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-purple-600 hover:to-purple-700 transition duration-200 font-medium"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>

          {/* Courses Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Subject Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Year</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Semester</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hours/Week</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{course.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.year}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.semester}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.hours}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => console.log(`Edit course ${course.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
