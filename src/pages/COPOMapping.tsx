
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
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="glass-card border-none shadow-lg p-6 m-4 mb-0">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-white">CO-PO Mapping</h1>
            <p className="text-white/80 mt-1">Course Outcome to Program Outcome mapping</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Course Selection */}
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-4">Select Course</h2>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="glass-select w-full sm:w-96 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="" className="bg-slate-800 text-white">Select a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id.toString()} className="bg-slate-800 text-white">
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
                    className="glass-button flex items-center px-4 py-2 hover:bg-green-500/30 transition duration-200"
                  >
                    <Upload size={16} className="mr-2" />
                    Import Excel
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="glass-button flex items-center px-4 py-2 hover:bg-blue-500/30 transition duration-200"
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
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">CO-PO Mapping Matrix</h2>
                <button
                  onClick={handleSaveMapping}
                  className="glass-button-primary flex items-center px-4 py-2"
                >
                  <Save size={16} className="mr-2" />
                  Save Mapping
                </button>
              </div>

              {/* Mapping Instructions */}
              <div className="glass-secondary border border-blue-300/30 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-200 mb-2">Mapping Instructions:</h3>
                <ul className="text-sm text-blue-100/80 space-y-1">
                  <li>• <strong>High:</strong> Strong correlation between CO and PO</li>
                  <li>• <strong>Medium:</strong> Moderate correlation between CO and PO</li>
                  <li>• <strong>Low:</strong> Weak correlation between CO and PO</li>
                  <li>• Leave blank if no correlation exists</li>
                </ul>
              </div>

              {/* Responsive Table Container */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-white/20 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white/10 backdrop-blur-md">
                      <th className="border border-white/20 px-4 py-3 text-left text-sm font-medium text-white sticky left-0 bg-white/10 backdrop-blur-md">
                        CO / PO
                      </th>
                      {programOutcomes.map(po => (
                        <th key={po} className="border border-white/20 px-3 py-3 text-center text-sm font-medium text-white min-w-24">
                          {po}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courseOutcomes.map(co => (
                      <tr key={co} className="hover:bg-white/5 transition-colors">
                        <td className="border border-white/20 px-4 py-3 font-medium text-white bg-white/5 backdrop-blur-md sticky left-0">
                          {co}
                        </td>
                        {programOutcomes.map(po => (
                          <td key={`${co}-${po}`} className="border border-white/20 px-2 py-2 text-center">
                            <select
                              value={getMappingValue(co, po)}
                              onChange={(e) => handleMappingChange(co, po, e.target.value)}
                              className="glass-select w-full px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                            >
                              {mappingOptions.map(option => (
                                <option key={option} value={option} className="bg-slate-800 text-white">
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
                  <div className="w-4 h-4 bg-red-500/80 rounded mr-2"></div>
                  <span className="text-white/80">High (3)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500/80 rounded mr-2"></div>
                  <span className="text-white/80">Medium (2)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500/80 rounded mr-2"></div>
                  <span className="text-white/80">Low (1)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500/80 rounded mr-2"></div>
                  <span className="text-white/80">No Mapping (0)</span>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-secondary rounded-lg p-4 border border-purple-300/20">
                  <h4 className="font-semibold text-purple-200 mb-2">Total Mappings</h4>
                  <p className="text-2xl font-bold text-purple-100">
                    {Object.values(mappingData).filter(val => val !== '').length}
                  </p>
                </div>
                <div className="glass-secondary rounded-lg p-4 border border-green-300/20">
                  <h4 className="font-semibold text-green-200 mb-2">High Mappings</h4>
                  <p className="text-2xl font-bold text-green-100">
                    {Object.values(mappingData).filter(val => val === 'High').length}
                  </p>
                </div>
                <div className="glass-secondary rounded-lg p-4 border border-blue-300/20">
                  <h4 className="font-semibold text-blue-200 mb-2">Completion</h4>
                  <p className="text-2xl font-bold text-blue-100">
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
