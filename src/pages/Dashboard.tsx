
import Sidebar from '../components/Sidebar';
import { TrendingUp, Clock, FileText, Users, ArrowRight, Calendar } from 'lucide-react';

const Dashboard = () => {
  const facultyName = "Dr. Sarah Johnson";
  const stats = {
    totalCourses: 6,
    pendingUploads: 3,
    deadlines: 2
  };

  const recentCourses = [
    { id: 1, name: "Data Structures & Algorithms", code: "CS201", year: "SY", semester: "I", progress: 85 },
    { id: 2, name: "Database Management Systems", code: "CS301", year: "TY", semester: "I", progress: 92 },
    { id: 3, name: "Web Development", code: "CS302", year: "TY", semester: "I", progress: 78 },
  ];

  const actionCards = [
    {
      title: "Manage Courses",
      description: "Add, edit, or view course details",
      icon: FileText,
      bgColor: "bg-indigo-600",
      action: () => console.log("Navigate to courses")
    },
    {
      title: "Upload Documents",
      description: "Upload course files and documents",
      icon: TrendingUp,
      bgColor: "bg-blue-600",
      action: () => console.log("Navigate to upload")
    },
    {
      title: "CO-PO Mapping",
      description: "Manage course outcome mappings",
      icon: Users,
      bgColor: "bg-purple-600",
      action: () => console.log("Navigate to mapping")
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      
      <div className="flex-1 lg:ml-0 ml-0">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-200/50 p-8 ml-0 lg:ml-0">
          <div className="ml-16 lg:ml-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SJ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Welcome back, {facultyName}
                </h1>
                <p className="text-slate-600 mt-1 flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 ml-16 lg:ml-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalCourses}</p>
                  <p className="text-slate-600 font-medium">Total Courses</p>
                  <p className="text-sm text-slate-500 mt-1">This semester</p>
                </div>
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <FileText className="h-7 w-7 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.pendingUploads}</p>
                  <p className="text-slate-600 font-medium">Pending Uploads</p>
                  <p className="text-sm text-slate-500 mt-1">Documents needed</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.deadlines}</p>
                  <p className="text-slate-600 font-medium">Upcoming Deadlines</p>
                  <p className="text-sm text-slate-500 mt-1">This week</p>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Clock className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {actionCards.map((card, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 cursor-pointer card-hover group"
                onClick={card.action}
              >
                <div className={`w-14 h-14 ${card.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                  <card.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {card.description}
                </p>
                <div className="flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                  Get started
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Courses */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Courses</h2>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-slate-200/50 hover:bg-white/70 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                      <span className="text-slate-700 font-bold text-sm">{course.code}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{course.name}</h3>
                      <p className="text-sm text-slate-500">{course.year} • Semester {course.semester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-600">{course.progress}% Complete</p>
                      <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-indigo-600 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => console.log(`View details for ${course.name}`)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
