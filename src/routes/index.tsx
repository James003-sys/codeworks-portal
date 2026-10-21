import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppShell } from '../components/layout/AppShell';

// Admin Pages
import { AdminOverview } from '../features/admin/AdminOverview';
import { AdminTutors } from '../features/admin/AdminTutors';
import { AdminSchools } from '../features/admin/AdminSchools';
import { AdminStudents } from '../features/admin/AdminStudents';
import { AdminSchedules } from '../features/admin/AdminSchedules';
import { AdminPerformance } from '../features/admin/AdminPerformance';
import { AdminReports } from '../features/admin/AdminReports';
import { AdminSettings } from '../features/admin/AdminSettings';

// Tutor Pages
import { TutorOverview } from '../features/tutor/TutorOverview';
import { TutorSchools } from '../features/tutor/TutorSchools';
import { TutorStudents } from '../features/tutor/TutorStudents';
import { TutorSchedule } from '../features/tutor/TutorSchedule';
import { TutorLessonReports } from '../features/tutor/TutorLessonReports';
import { TutorStudentPerformance } from '../features/tutor/TutorStudentPerformance';
import { TutorRatings } from '../features/tutor/TutorRatings';
import { TutorProjectsReviews } from '../features/tutor/TutorProjectsReviews';
import { TutorProfile } from '../features/tutor/TutorProfile';

// Student Pages
import { StudentOverview } from '../features/student/StudentOverview';
import { StudentSchedule } from '../features/student/StudentSchedule';
import { StudentPerformance } from '../features/student/StudentPerformance';
import { StudentProjects } from '../features/student/StudentProjects';
import { StudentCodeReviews } from '../features/student/StudentCodeReviews';
import { StudentNotifications } from '../features/student/StudentNotifications';
import { StudentProfile } from '../features/student/StudentProfile';

const RoleRedirect: React.FC = () => {
  const { currentRole } = useApp();
  if (currentRole === 'admin') return <Navigate to="/admin" replace />;
  if (currentRole === 'tutor') return <Navigate to="/tutor" replace />;
  return <Navigate to="/student" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        {/* Index redirects to user's role */}
        <Route index element={<RoleRedirect />} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminOverview />} />
        <Route path="admin/tutors" element={<AdminTutors />} />
        <Route path="admin/schools" element={<AdminSchools />} />
        <Route path="admin/students" element={<AdminStudents />} />
        <Route path="admin/schedules" element={<AdminSchedules />} />
        <Route path="admin/performance" element={<AdminPerformance />} />
        <Route path="admin/reports" element={<AdminReports />} />
        <Route path="admin/settings" element={<AdminSettings />} />

        {/* Tutor Routes */}
        <Route path="tutor" element={<TutorOverview />} />
        <Route path="tutor/schools" element={<TutorSchools />} />
        <Route path="tutor/students" element={<TutorStudents />} />
        <Route path="tutor/schedule" element={<TutorSchedule />} />
        <Route path="tutor/reports" element={<TutorLessonReports />} />
        <Route path="tutor/performance" element={<TutorStudentPerformance />} />
        <Route path="tutor/ratings" element={<TutorRatings />} />
        <Route path="tutor/projects-reviews" element={<TutorProjectsReviews />} />
        <Route path="tutor/profile" element={<TutorProfile />} />

        {/* Student Routes */}
        <Route path="student" element={<StudentOverview />} />
        <Route path="student/schedule" element={<StudentSchedule />} />
        <Route path="student/performance" element={<StudentPerformance />} />
        <Route path="student/projects" element={<StudentProjects />} />
        <Route path="student/code-reviews" element={<StudentCodeReviews />} />
        <Route path="student/notifications" element={<StudentNotifications />} />
        <Route path="student/profile" element={<StudentProfile />} />

        {/* Catch-all */}
        <Route path="*" element={<RoleRedirect />} />
      </Route>
    </Routes>
  );
};
