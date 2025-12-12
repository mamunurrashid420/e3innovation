import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Team from './pages/Team';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminSliders from './pages/admin/Sliders';
import AdminServices from './pages/admin/Services';
import AdminProjects from './pages/admin/Projects';
import AdminTeamMembers from './pages/admin/TeamMembers';
import AdminMessages from './pages/admin/Messages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/sliders" element={
            <ProtectedRoute>
              <AdminSliders />
            </ProtectedRoute>
          } />

          <Route path="/admin/services" element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          } />

          <Route path="/admin/projects" element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          } />

          <Route path="/admin/team" element={
            <ProtectedRoute>
              <AdminTeamMembers />
            </ProtectedRoute>
          } />

          <Route path="/admin/messages" element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          } />

          <Route path="/*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetails />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetails />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
