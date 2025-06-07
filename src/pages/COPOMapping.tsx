
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, Upload, Save } from 'lucide-react';

const COPOMapping = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  
  // Mock courses data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  // Course Outcomes (rows) and Program Outcomes (columns)
  const courseOutcomes = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'];
  const programOutcomes = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'];
  
  // Mapping options
  const mappingOptions = ['', 'Low', 'Medium', 'High'];
  
  // State to store mapping values
  const [mappingData, setMappingData] = useState<{[key: string]: string}>({});

  // Handle mapping change
  const handleMappingChange = (co: string, po: string, value: string) => {
    const key = `${co}-${po}`;
    setMappingData(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Updated mapping: ${co} -> ${po} = ${value}`);
  };

  // Get mapping value
  const getMappingValue = (co: string, po: string) => {
    const key = `${co}-${po}`;
    return mappingData[key] || '';
  };

  // Handle save mapping
  const handleSaveMapping = () => {
    console.log('Saving CO-PO mapping:', mappingData);
    alert('CO-PO mapping saved successfully!');
  };

  // Handle import/export
  const handleImportExcel = () => {
    console.log('Import Excel functionality');
    alert('Excel import functionality would be implemented here');
  };

  const handleExportExcel = () => {
    console.log('Export Excel functionality');
    alert('Excel export functionality would be implemented here');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-200/50 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-slate-800">CO-PO Mapping</h1>
            <p className="text-slate-600 mt-1">Course Outcome to Program Outcome mapping</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Selection */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Course</h2>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full sm:w-96 px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id.toString()}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Import/Export Buttons */}
              {selectedCourse && (
                <div className="flex gap-2">
                  <button
                    onClick={handleImportExcel}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-200 shadow-lg"
                  >
                    <Upload size={16} className="mr-2" />
                    Import Excel
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg"
                  >
                    <Download size={16} className="mr-2" />
                    Export Excel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CO-PO Mapping Table */}
          {selectedCourse && (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">CO-PO Mapping Matrix</h2>
                <button
                  onClick={handleSaveMapping}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg"
                >
                  <Save size={16} className="mr-2" />
                  Save Mapping
                </button>
              </div>

              {/* Mapping Instructions */}
              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Mapping Instructions:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>High:</strong> Strong correlation between CO and PO</li>
                  <li>• <strong>Medium:</strong> Moderate correlation between CO and PO</li>
                  <li>• <strong>Low:</strong> Weak correlation between CO and PO</li>
                  <li>• Leave blank if no correlation exists</li>
                </ul>
              </div>

              {/* Responsive Table Container */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-slate-300 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100/80 backdrop-blur-sm">
                      <th className="border border-slate-300 px-4 py-3 text-left text-sm font-medium text-slate-700 sticky left-0 bg-slate-100/80 backdrop-blur-sm">
                        CO / PO
                      </th>
                      {programOutcomes.map(po => (
                        <th key={po} className="border border-slate-300 px-3 py-3 text-center text-sm font-medium text-slate-700 min-w-24">
                          {po}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courseOutcomes.map(co => (
                      <tr key={co} className="hover:bg-slate-50/50 backdrop-blur-sm">
                        <td className="border border-slate-300 px-4 py-3 font-medium text-slate-800 bg-slate-100/80 backdrop-blur-sm sticky left-0">
                          {co}
                        </td>
                        {programOutcomes.map(po => (
                          <td key={`${co}-${po}`} className="border border-slate-300 px-2 py-2 text-center">
                            <select
                              value={getMappingValue(co, po)}
                              onChange={(e) => handleMappingChange(co, po, e.target.value)}
                              className="w-full px-2 py-1 text-sm bg-white/70 backdrop-blur-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            >
                              {mappingOptions.map(option => (
                                <option key={option} value={option}>
                                  {option || '-'}
                                </option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mapping Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>High (3)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span>Medium (2)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Low (1)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-slate-300 rounded mr-2"></div>
                  <span>No Mapping (0)</span>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Total Mappings</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {Object.values(mappingData).filter(val => val !== '').length}
                  </p>
                </div>
                <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">High Mappings</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(mappingData).filter(val => val === 'High').length}
                  </p>
                </div>
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Completion</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((Object.values(mappingData).filter(val => val !== '').length / (courseOutcomes.length * programOutcomes.length)) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default COPOMapping;
