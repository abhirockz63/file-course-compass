
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  // Mock data for demonstration
  const facultyName = "Dr. John Smith";
  const stats = {
    totalCourses: 6,
    pendingUploads: 3,
    deadlines: 2
  };

  // Sample recent courses
  const recentCourses = [
    { id: 1, name: "Data Structures", code: "CS201", year: "SY", semester: "I" },
    { id: 2, name: "Database Management", code: "CS301", year: "TY", semester: "I" },
    { id: 3, name: "Web Development", code: "CS302", year: "TY", semester: "I" },
  ];

  // Action cards data
  const actionCards = [
    {
      title: "Manage Courses",
      description: "Add, edit, or view course details",
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-white",
      action: () => console.log("Navigate to courses")
    },
    {
      title: "Upload Documents",
      description: "Upload course files and documents",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      action: () => console.log("Navigate to upload")
    },
    {
      title: "CO-PO Mapping",
      description: "Manage course outcome mappings",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      action: () => console.log("Navigate to mapping")
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0 ml-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6 ml-0 lg:ml-0">
          <div className="ml-16 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">
              Hello, {facultyName}!
            </h1>
            <p className="text-gray-600 mt-1">Welcome back to your dashboard</p>
          </div>
        </div>

        <div className="p-6 ml-16 lg:ml-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl font-bold text-purple-600">{stats.totalCourses}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Total Courses</h3>
                  <p className="text-gray-600">This semester</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <span className="text-2xl font-bold text-orange-600">{stats.pendingUploads}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Pending Uploads</h3>
                  <p className="text-gray-600">Documents needed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <span className="text-2xl font-bold text-red-600">{stats.deadlines}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h3>
                  <p className="text-gray-600">This week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {actionCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200`}
                onClick={card.action}
              >
                <h3 className={`text-xl font-semibold ${card.textColor} mb-2`}>
                  {card.title}
                </h3>
                <p className={`${card.textColor} opacity-90`}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Course Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Year</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Semester</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{course.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.year}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{course.semester}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => console.log(`View details for ${course.name}`)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          View Details
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

export default Dashboard;
