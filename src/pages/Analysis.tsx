import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, FileText, BarChart, AlertTriangle, CheckCircle, Target, Lightbulb, TrendingUp, Users, BookOpen } from 'lucide-react';

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

  // Analysis insights
  const analysisInsights = [
    {
      type: 'strength',
      title: 'Strong Performance in CO3',
      description: 'Students showed excellent understanding of advanced data structures with 82% attainment.',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      type: 'concern',
      title: 'CO2 Below Target',
      description: 'Algorithm analysis concepts need reinforcement. Only 58% attainment achieved.',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    },
    {
      type: 'opportunity',
      title: 'PO3 High Attainment',
      description: 'Problem-solving skills are well developed across the cohort.',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  // Recommendations
  const recommendations = [
    {
      priority: 'High',
      category: 'Teaching Strategy',
      title: 'Enhance Algorithm Visualization',
      description: 'Implement interactive algorithm visualization tools to improve CO2 understanding.',
      impact: 'Expected 15-20% improvement in algorithm analysis skills',
      timeframe: '2-3 weeks',
      resources: ['Interactive coding platforms', 'Visual algorithm simulators']
    },
    {
      priority: 'Medium',
      category: 'Assessment Method',
      title: 'Add Practical Lab Components',
      description: 'Include more hands-on coding exercises in assessments for CO5.',
      impact: 'Better practical application of theoretical concepts',
      timeframe: '1 month',
      resources: ['Lab infrastructure', 'Coding platforms']
    },
    {
      priority: 'Low',
      category: 'Curriculum Enhancement',
      title: 'Industry Case Studies',
      description: 'Integrate real-world case studies to strengthen PO1 and PO2 attainment.',
      impact: 'Improved industry readiness and problem-solving skills',
      timeframe: '3-4 weeks',
      resources: ['Industry partnerships', 'Guest lectures']
    }
  ];

  // Action plan
  const actionPlan = [
    {
      week: 'Week 1-2',
      actions: [
        'Introduce algorithm visualization tools in lectures',
        'Conduct remedial sessions for CO2 concepts',
        'Create additional practice problems for weak areas'
      ],
      responsible: 'Course Instructor',
      status: 'planned'
    },
    {
      week: 'Week 3-4',
      actions: [
        'Implement peer learning groups',
        'Deploy coding practice sessions',
        'Monitor student progress through quizzes'
      ],
      responsible: 'Teaching Assistants',
      status: 'planned'
    },
    {
      week: 'Week 5-6',
      actions: [
        'Conduct mid-course assessment',
        'Analyze improvement in CO attainment',
        'Adjust teaching methods based on feedback'
      ],
      responsible: 'Course Committee',
      status: 'planned'
    }
  ];

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

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-200/50 p-6">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-slate-800">Analysis & Reports</h1>
            <p className="text-slate-600 mt-1">View CO-PO attainment analysis and generate reports</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Selection Controls */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Course and Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Test/Assessment</label>
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
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
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-2xl">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-800">{overallStats.totalStudents}</h3>
                      <p className="text-slate-600 text-sm">Total Students</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-2xl">
                      <span className="text-lg font-bold text-green-600">{overallStats.passPercentage}%</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-800">Pass Rate</h3>
                      <p className="text-slate-600 text-sm">Success Percentage</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-2xl">
                      <span className="text-lg font-bold text-purple-600">{overallStats.averageScore}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-800">Average Score</h3>
                      <p className="text-slate-600 text-sm">Class Average</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-100 rounded-2xl">
                      <span className="text-lg font-bold text-indigo-600">{overallStats.coAchieved}/{overallStats.coTotal}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-800">CO Achieved</h3>
                      <p className="text-slate-600 text-sm">Course Outcomes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Section */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Performance Analysis</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysisInsights.map((insight, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white/30">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${insight.color}`}>
                          <insight.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1">{insight.title}</h3>
                          <p className="text-sm text-slate-600">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CO Attainment Analysis */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">CO Attainment Analysis</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium"
                    >
                      <FileText size={16} className="mr-2" />
                      Export PDF
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium"
                    >
                      <Download size={16} className="mr-2" />
                      Export Excel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50/80">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Course Outcome</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Target (%)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Achieved (%)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Progress</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {coAttainmentData.map((item) => (
                        <tr key={item.co} className="hover:bg-slate-50/30">
                          <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.co}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{item.target}%</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{item.achieved}%</td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  item.achieved >= item.target ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
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

              {/* Recommendations Section */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Recommendations</h2>
                </div>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-6 bg-white/30">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                            {rec.category}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">{rec.timeframe}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{rec.title}</h3>
                      <p className="text-slate-600 mb-3">{rec.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Expected Impact:</span>
                          <p className="text-slate-600 mt-1">{rec.impact}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Required Resources:</span>
                          <ul className="text-slate-600 mt-1 list-disc list-inside">
                            {rec.resources.map((resource, idx) => (
                              <li key={idx}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan Section */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Action Plan</h2>
                </div>
                
                <div className="space-y-6">
                  {actionPlan.map((plan, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          {index < actionPlan.length - 1 && (
                            <div className="w-0.5 h-16 bg-slate-300 ml-5 mt-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 bg-white/30 rounded-xl p-4 border border-slate-200">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-slate-800">{plan.week}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-600">Responsible: {plan.responsible}</span>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                {plan.status}
                              </span>
                            </div>
                          </div>
                          
                          <ul className="space-y-2">
                            {plan.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PO Attainment Summary */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">PO Attainment Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {poAttainmentData.map((item) => (
                    <div key={item.po} className="border border-slate-200 rounded-xl p-4 bg-white/30">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-slate-800">{item.po}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(item.level)}`}>
                          {item.level}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-slate-800">{item.attainment}</div>
                          <div className="text-sm text-slate-600">Attainment Level</div>
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
                              className="text-slate-300"
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
                                item.level === 'Medium' ? 'text-orange-500' : 'text-green-500'
                              }
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PO Attainment Scale */}
                <div className="bg-slate-50/80 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Attainment Scale</h4>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span>Low (1.0 - 1.7)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
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
