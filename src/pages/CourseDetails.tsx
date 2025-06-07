
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
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="glass-card border-none shadow-lg p-6 m-4 mb-0">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-white">Course Management</h1>
            <p className="text-white/80 mt-1">Add and manage your courses</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Form */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Add New Course</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Academic Year
                </label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="glass-select w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="" className="bg-slate-800 text-white">Select Academic Year</option>
                  {academicYears.map(year => (
                    <option key={year} value={year} className="bg-slate-800 text-white">{year}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Year
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="glass-select w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="" className="bg-slate-800 text-white">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800 text-white">{year}</option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="glass-select w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="" className="bg-slate-800 text-white">Select Semester</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem} className="bg-slate-800 text-white">{sem}</option>
                  ))}
                </select>
              </div>

              {/* Hours per Week */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Hours per Week
                </label>
                <input
                  type="number"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="glass-input w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter hours per week"
                />
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Subject Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  className="glass-input w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter subject name"
                  required
                />
              </div>

              {/* Subject Code */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Subject Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleInputChange}
                  className="glass-input w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter subject code"
                  required
                />
              </div>

              {/* Theory/Practical Radio Buttons */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-2">
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
                      className="mr-2 text-indigo-400"
                    />
                    <span className="text-white/90">Theory</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="practical"
                      checked={formData.type === 'practical'}
                      onChange={handleInputChange}
                      className="mr-2 text-indigo-400"
                    />
                    <span className="text-white/90">Practical</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="glass-button-primary px-6 py-2 font-medium"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>

          {/* Courses Table */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="glass-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Subject Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Year</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Semester</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Hours/Week</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-white">{course.name}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{course.code}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{course.year}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{course.semester}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{course.type}</td>
                      <td className="px-4 py-3 text-sm text-white/80">{course.hours}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => console.log(`Edit course ${course.id}`)}
                          className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-300 hover:text-red-200 text-sm font-medium transition-colors"
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
