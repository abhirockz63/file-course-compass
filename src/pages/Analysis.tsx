
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, FileText, BarChart } from 'lucide-react';

const Analysis = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTest, setSelectedTest] = useState('');

  // Mock data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  const tests = [
    { id: 1, name: "MTT-1" },
    { id: 2, name: "MTT-2" },
    { id: 3, name: "Assignment 1" },
    { id: 4, name: "Lab Test 1" },
  ];

  // Mock CO attainment data
  const coAttainmentData = [
    { co: 'CO1', target: 60, achieved: 75, status: 'Achieved' },
    { co: 'CO2', target: 60, achieved: 58, status: 'Not Achieved' },
    { co: 'CO3', target: 60, achieved: 82, status: 'Achieved' },
    { co: 'CO4', target: 60, achieved: 67, status: 'Achieved' },
    { co: 'CO5', target: 60, achieved: 45, status: 'Not Achieved' },
  ];

  // Mock PO attainment data
  const poAttainmentData = [
    { po: 'PO1', attainment: 2.1, level: 'Medium' },
    { po: 'PO2', attainment: 1.8, level: 'Low' },
    { po: 'PO3', attainment: 2.5, level: 'High' },
    { po: 'PO4', attainment: 2.0, level: 'Medium' },
    { po: 'PO5', attainment: 1.5, level: 'Low' },
    { po: 'PO6', attainment: 2.3, level: 'Medium' },
  ];

  // Mock overall statistics
  const overallStats = {
    totalStudents: 45,
    passPercentage: 82,
    averageScore: 68.5,
    coAchieved: 3,
    coTotal: 5,
    poAttainmentAvg: 2.0
  };

  // Handle export functions
  const handleExportPDF = () => {
    console.log('Exporting PDF report');
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    console.log('Exporting Excel report');
    alert('Excel export functionality would be implemented here');
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'achieved':
        return 'text-green-600 bg-green-100';
      case 'not achieved':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Analysis & Reports</h1>
            <p className="text-gray-600 mt-1">View CO-PO attainment analysis and generate reports</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Selection Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Course and Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id.toString()}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test/Assessment</label>
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!selectedCourse}
                >
                  <option value="">Select a test...</option>
                  {tests.map(test => (
                    <option key={test.id} value={test.id.toString()}>
                      {test.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {selectedCourse && selectedTest && (
            <>
              {/* Overall Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{overallStats.totalStudents}</h3>
                      <p className="text-gray-600 text-sm">Total Students</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <span className="text-lg font-bold text-green-600">{overallStats.passPercentage}%</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Pass Rate</h3>
                      <p className="text-gray-600 text-sm">Success Percentage</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <span className="text-lg font-bold text-purple-600">{overallStats.averageScore}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Average Score</h3>
                      <p className="text-gray-600 text-sm">Class Average</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <span className="text-lg font-bold text-orange-600">{overallStats.coAchieved}/{overallStats.coTotal}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">CO Achieved</h3>
                      <p className="text-gray-600 text-sm">Course Outcomes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CO Attainment Analysis */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">CO Attainment Analysis</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 text-sm"
                    >
                      <FileText size={16} className="mr-2" />
                      Export PDF
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm"
                    >
                      <Download size={16} className="mr-2" />
                      Export Excel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Course Outcome</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Target (%)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Achieved (%)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Progress</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {coAttainmentData.map((item) => (
                        <tr key={item.co} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.co}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.target}%</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.achieved}%</td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  item.achieved >= item.target ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min((item.achieved / item.target) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PO Attainment Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">PO Attainment Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {poAttainmentData.map((item) => (
                    <div key={item.po} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-800">{item.po}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(item.level)}`}>
                          {item.level}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-gray-800">{item.attainment}</div>
                          <div className="text-sm text-gray-600">Attainment Level</div>
                        </div>
                        <div className="w-16 h-16">
                          <svg className="transform -rotate-90 w-16 h-16">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              className="text-gray-300"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 28}`}
                              strokeDashoffset={`${2 * Math.PI * 28 * (1 - item.attainment / 3)}`}
                              className={
                                item.level === 'High' ? 'text-red-500' :
                                item.level === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                              }
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PO Attainment Scale */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Attainment Scale</h4>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span>Low (1.0 - 1.7)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                      <span>Medium (1.8 - 2.4)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      <span>High (2.5 - 3.0)</span>
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

export default Analysis;
