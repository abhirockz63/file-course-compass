
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import UploadDocuments from "./pages/UploadDocuments";
import COPOMapping from "./pages/COPOMapping";
import AssessmentTools from "./pages/AssessmentTools";
import TestManagement from "./pages/TestManagement";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseDetails />} />
          <Route path="/upload" element={<UploadDocuments />} />
          <Route path="/mapping" element={<COPOMapping />} />
          <Route path="/tools" element={<AssessmentTools />} />
          <Route path="/tests" element={<TestManagement />} />
          <Route path="/analysis" element={<Analysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
