
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, Upload, Save, Plus, Trash2 } from 'lucide-react';

const COPOMapping = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  
  // Mock courses data
  const courses = [
    { id: 1, name: "Data Structures - CS201" },
    { id: 2, name: "Database Management - CS301" },
    { id: 3, name: "Web Development - CS302" },
  ];

  // Dynamic Course Outcomes and Program Outcomes
  const [courseOutcomes, setCourseOutcomes] = useState(['CO1', 'CO2', 'CO3']);
  const [programOutcomes, setProgramOutcomes] = useState(['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6']);
  
  // Mapping options
  const mappingOptions = ['', 'Low', 'Medium', 'High'];
  
  // State to store mapping values
  const [mappingData, setMappingData] = useState<{[key: string]: string}>({});

  // Add new CO
  const addCourseOutcome = () => {
    const newCO = `CO${courseOutcomes.length + 1}`;
    setCourseOutcomes([...courseOutcomes, newCO]);
  };

  // Remove CO
  const removeCourseOutcome = (index: number) => {
    if (courseOutcomes.length > 1) {
      const newCOs = courseOutcomes.filter((_, i) => i !== index);
      setCourseOutcomes(newCOs);
      
      // Clean up mapping data for removed CO
      const coToRemove = courseOutcomes[index];
      const newMappingData = { ...mappingData };
      Object.keys(newMappingData).forEach(key => {
        if (key.startsWith(`${coToRemove}-`)) {
          delete newMappingData[key];
        }
      });
      setMappingData(newMappingData);
    }
  };

  // Add new PO
  const addProgramOutcome = () => {
    const newPO = `PO${programOutcomes.length + 1}`;
    setProgramOutcomes([...programOutcomes, newPO]);
  };

  // Remove PO
  const removeProgramOutcome = (index: number) => {
    if (programOutcomes.length > 1) {
      const newPOs = programOutcomes.filter((_, i) => i !== index);
      setProgramOutcomes(newPOs);
      
      // Clean up mapping data for removed PO
      const poToRemove = programOutcomes[index];
      const newMappingData = { ...mappingData };
      Object.keys(newMappingData).forEach(key => {
        if (key.endsWith(`-${poToRemove}`)) {
          delete newMappingData[key];
        }
      });
      setMappingData(newMappingData);
    }
  };

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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CO-PO Mapping
            </h1>
            <p className="text-gray-600 mt-1">Course Outcome to Program Outcome mapping</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0 space-y-6">
          {/* Course Selection */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Course</h2>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full sm:w-96 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm"
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
                <div className="flex gap-3">
                  <button
                    onClick={handleImportExcel}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
                  >
                    <Upload size={16} className="mr-2" />
                    Import Excel
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                  >
                    <Download size={16} className="mr-2" />
                    Export Excel
                  </button>
                </div>
              )}
            </div>
          </div>

          {selectedCourse && (
            <>
              {/* Course Outcomes Configuration */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Course Outcomes (CO)</h2>
                  <button
                    onClick={addCourseOutcome}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                  >
                    <Plus size={16} className="mr-1" />
                    Add CO
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {courseOutcomes.map((co, index) => (
                    <div key={co} className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <span className="font-medium text-indigo-700 flex-1">{co}</span>
                      {courseOutcomes.length > 1 && (
                        <button
                          onClick={() => removeCourseOutcome(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Outcomes Configuration */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Program Outcomes (PO)</h2>
                  <button
                    onClick={addProgramOutcome}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                  >
                    <Plus size={16} className="mr-1" />
                    Add PO
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {programOutcomes.map((po, index) => (
                    <div key={po} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="font-medium text-purple-700 flex-1">{po}</span>
                      {programOutcomes.length > 1 && (
                        <button
                          onClick={() => removeProgramOutcome(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CO-PO Mapping Table */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">CO-PO Mapping Matrix</h2>
                  <button
                    onClick={handleSaveMapping}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    <Save size={16} className="mr-2" />
                    Save Mapping
                  </button>
                </div>

                {/* Mapping Instructions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Mapping Instructions:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>High:</strong> Strong correlation between CO and PO</li>
                    <li>• <strong>Medium:</strong> Moderate correlation between CO and PO</li>
                    <li>• <strong>Low:</strong> Weak correlation between CO and PO</li>
                    <li>• Leave blank if no correlation exists</li>
                  </ul>
                </div>

                {/* Responsive Table Container */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-0 bg-gradient-to-r from-gray-50 to-gray-100">
                          CO / PO
                        </th>
                        {programOutcomes.map(po => (
                          <th key={po} className="border border-gray-300 px-3 py-3 text-center text-sm font-medium text-gray-700 min-w-24">
                            {po}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {courseOutcomes.map(co => (
                        <tr key={co} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 sticky left-0">
                            {co}
                          </td>
                          {programOutcomes.map(po => (
                            <td key={`${co}-${po}`} className="border border-gray-300 px-2 py-2 text-center">
                              <select
                                value={getMappingValue(co, po)}
                                onChange={(e) => handleMappingChange(co, po, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
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
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded mr-2"></div>
                    <span>High (3)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded mr-2"></div>
                    <span>Medium (2)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded mr-2"></div>
                    <span>Low (1)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <span>No Mapping (0)</span>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Total Mappings</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {Object.values(mappingData).filter(val => val !== '').length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">High Mappings</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {Object.values(mappingData).filter(val => val === 'High').length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Completion</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((Object.values(mappingData).filter(val => val !== '').length / (courseOutcomes.length * programOutcomes.length)) * 100)}%
                    </p>
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

export default COPOMapping;
