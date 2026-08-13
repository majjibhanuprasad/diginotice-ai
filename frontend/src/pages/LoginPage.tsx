import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ArrowRight, Lock, Mail, HelpCircle, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Read role from query param to highlight corresponding demo login options
  const defaultRole = searchParams.get('role') || 'student';

  const studentDemoAccounts = [
    { name: 'Abhinav Sharma (CSE 4th Yr)', email: 'student1@college.edu', password: 'password123' },
    { name: 'Bhavana Reddy (CSE 3rd Yr)', email: 'student2@college.edu', password: 'password123' },
    { name: 'Chaitanya Kumar (ECE 4th Yr)', email: 'student3@college.edu', password: 'password123' },
    { name: 'Divya Patel (EEE 2nd Yr)', email: 'student4@college.edu', password: 'password123' },
    { name: 'Eshwar Prasad (Civil 1st Yr)', email: 'student5@college.edu', password: 'password123' },
    { name: 'Aditya Sen (CSM 3rd Yr)', email: 'student.csm@college.edu', password: 'password123' },
    { name: 'Kavya Nair (CSD 4th Yr)', email: 'student.csd@college.edu', password: 'password123' },
    { name: 'Rahul Varma (IT 3rd Yr)', email: 'student.it@college.edu', password: 'password123' },
    { name: 'Siddharth Roy (Robotics 2nd Yr)', email: 'student.robotics@college.edu', password: 'password123' },
    { name: 'Ananya Goel (Chemical 3rd Yr)', email: 'student.chemical@college.edu', password: 'password123' },
    { name: 'Vikram Malhotra (Cyber Sec 4th Yr)', email: 'student.cyber@college.edu', password: 'password123' },
    { name: 'Priyanka Das (Biotech 2nd Yr)', email: 'student.biotech@college.edu', password: 'password123' },
    { name: 'Rohan Mehra (Aerospace 3rd Yr)', email: 'student.aerospace@college.edu', password: 'password123' },
    { name: 'Harish Rao (Agri 1st Yr)', email: 'student.agri@college.edu', password: 'password123' },
    { name: 'Pranav Joshi (Mining 4th Yr)', email: 'student.mining@college.edu', password: 'password123' },
    { name: 'Varun Dhawan (Mech 3rd Yr)', email: 'student.mech@college.edu', password: 'password123' }
  ];

  const facultyDemoAccounts = [
    { name: 'Prof. Ramesh K. (HOD, CSE)', email: 'cse.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Srinivas Rao (HOD, CSM)', email: 'csm.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Anirudh Sen (HOD, CSD)', email: 'csd.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Sunita Rao (HOD, ECE)', email: 'ece.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Vijay Kumar (HOD, EEE)', email: 'eee.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Balaji Naidu (HOD, Mech)', email: 'mech.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Madhavan Pillai (HOD, Civil)', email: 'civil.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Swati Sharma (HOD, IT)', email: 'it.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Arjun Mehta (HOD, Robotics)', email: 'robotics.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. K. R. Das (HOD, Chemical)', email: 'chemical.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Neha Gupta (HOD, Cyber Security)', email: 'cyber.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Shalini Varma (HOD, Biotech)', email: 'biotech.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. Vivek Agnihotri (HOD, Aerospace)', email: 'aerospace.faculty@college.edu', password: 'admin123' },
    { name: 'Prof. Ramchandra Rao (HOD, Agri)', email: 'agri.faculty@college.edu', password: 'admin123' },
    { name: 'Dr. S. K. Bose (HOD, Mining)', email: 'mining.faculty@college.edu', password: 'admin123' }
  ];

  const handleDemoClick = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setAuthLoading(true);
    setError('');

    try {
      const loggedUser = await login(email, password);
      // Redirect based on user role
      if (loggedUser.role === 'SUPER_ADMIN') {
        navigate('/super-admin/dashboard');
      } else if (loggedUser.role === 'DEPARTMENT_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        
        {/* Branding header */}
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-md shadow-indigo-200 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            DigiNotice <span className="text-indigo-600">AI</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Smart Digital Notice Board for College Campuses
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium animate-shake">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
              College Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl text-slate-900 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl text-slate-900 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-800">
            <span className="cursor-pointer">Forgot Password?</span>
            <span className="text-slate-400 font-normal">Contact IT Helpdesk</span>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-500/10 flex items-center justify-center gap-2 transition"
          >
            {authLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* SSO login placeholders */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 w-full" />
          <span className="absolute bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Or connect with SSO
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => alert('Google Workspace login configured. Will link with college domain.')}
            className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.67 0 3.19.57 4.38 1.69l3.27-3.27C17.67 1.61 14.98 1 12 1 7.35 1 3.4 3.65 1.49 7.54l3.85 2.99C6.26 7.42 8.91 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z" />
              <path fill="#FBBC05" d="M5.34 14.53c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.49 6.98C.54 8.89 0 11.02 0 13.25c0 2.23.54 4.36 1.49 6.27l3.85-2.99z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.11.75-2.53 1.19-4.2 1.19-3.09 0-5.74-2.38-6.66-5.49L1.49 15.87C3.4 19.76 7.35 23 12 23z" />
            </svg>
            Google Workspace
          </button>
          <button
            type="button"
            onClick={() => alert('Microsoft 365 login configured. Will link with student email registry.')}
            className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 23 23" fill="none">
              <path d="M0 0h11v11H0z" fill="#F25022"/>
              <path d="M12 0h11v11H12z" fill="#7FBA00"/>
              <path d="M0 12h11v11H0z" fill="#00A4EF"/>
              <path d="M12 12h11v11H12z" fill="#FFB900"/>
            </svg>
            Microsoft 365
          </button>
        </div>

        {/* Demo login shortcuts */}
        <div className="border-t border-slate-100 pt-6 mt-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            Demo Accounts (One-Click Fill)
          </div>
          <div className="space-y-3">
            {/* Quick Fill Super Admin */}
            <button
              type="button"
              onClick={() => handleDemoClick('superadmin@college.edu', 'admin123')}
              className="w-full py-2 px-3 rounded-lg text-left bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold transition flex items-center justify-between"
            >
              <span>Super Admin (Principal)</span>
              <span className="font-mono opacity-80 text-[10px]">superadmin@college.edu</span>
            </button>

            {/* Dropdown for Students */}
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Student Select (All 15 Branches)</label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const [email, pass] = val.split('|');
                    handleDemoClick(email, pass);
                  }
                }}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                defaultValue=""
              >
                <option value="" disabled>-- Select a Student Account --</option>
                {studentDemoAccounts.map((acc, idx) => (
                  <option key={idx} value={`${acc.email}|${acc.password}`}>{acc.name}</option>
                ))}
              </select>
            </div>

            {/* Dropdown for Faculty */}
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Faculty/HOD Select (All 15 Branches)</label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const [email, pass] = val.split('|');
                    handleDemoClick(email, pass);
                  }
                }}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                defaultValue=""
              >
                <option value="" disabled>-- Select a HOD/Faculty Account --</option>
                {facultyDemoAccounts.map((acc, idx) => (
                  <option key={idx} value={`${acc.email}|${acc.password}`}>{acc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
