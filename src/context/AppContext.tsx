import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  School,
  Tutor,
  Student,
  LessonSchedule,
  LessonReport,
  PerformanceRecord,
  TutorRating,
  Project,
  ProjectSubmission,
  CodeReview,
  AppNotification,
  ActivityLog,
} from '../types';
import {
  mockUsers,
  mockSchools,
  mockTutors,
  mockStudents,
  mockSchedules,
  mockLessonReports,
  mockPerformanceRecords,
  mockTutorRatings,
  mockProjects,
  mockProjectSubmissions,
  mockNotifications,
  mockActivityLogs,
} from '../mocks/data';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  users: User[];
  schools: School[];
  tutors: Tutor[];
  students: Student[];
  schedules: LessonSchedule[];
  reports: LessonReport[];
  performanceRecords: PerformanceRecord[];
  tutorRatings: TutorRating[];
  projects: Project[];
  submissions: ProjectSubmission[];
  notifications: AppNotification[];
  activityLogs: ActivityLog[];

  // Mutations
  addTutor: (tutor: Omit<Tutor, 'id' | 'totalLessonsDelivered' | 'rating' | 'hireDate'>) => void;
  updateTutor: (id: string, updates: Partial<Tutor>) => void;
  deactivateTutor: (id: string) => void;

  addSchool: (school: Omit<School, 'id' | 'createdAt' | 'enrolledStudentsCount'>) => void;
  updateSchool: (id: string, updates: Partial<School>) => void;

  addStudent: (student: Omit<Student, 'id' | 'enrollmentDate' | 'overallProgress' | 'attendanceRate' | 'completedProjectsCount'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  updateStudentStatus: (id: string, status: Student['enrollmentStatus']) => void;

  addSchedule: (lesson: Omit<LessonSchedule, 'id' | 'hasReportSubmitted'>) => { success: boolean; conflictMessage?: string };
  updateSchedule: (id: string, updates: Partial<LessonSchedule>) => void;
  deleteSchedule: (id: string) => void;

  submitLessonReport: (report: Omit<LessonReport, 'id' | 'submittedAt'>) => void;
  updateLessonReport: (id: string, updates: Partial<LessonReport>) => void;

  submitProjectCode: (projectId: string, codeContent: string, notes?: string, liveDemoUrl?: string) => void;
  reviewSubmission: (submissionId: string, review: Omit<CodeReview, 'id' | 'submissionId' | 'reviewDate' | 'tutorId' | 'tutorName'>) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Sarah Jenkins (Admin)
  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem('cw_schools');
    return saved ? JSON.parse(saved) : mockSchools;
  });
  const [tutors, setTutors] = useState<Tutor[]>(() => {
    const saved = localStorage.getItem('cw_tutors');
    return saved ? JSON.parse(saved) : mockTutors;
  });
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('cw_students');
    return saved ? JSON.parse(saved) : mockStudents;
  });
  const [schedules, setSchedules] = useState<LessonSchedule[]>(() => {
    const saved = localStorage.getItem('cw_schedules');
    return saved ? JSON.parse(saved) : mockSchedules;
  });
  const [reports, setReports] = useState<LessonReport[]>(() => {
    const saved = localStorage.getItem('cw_reports');
    return saved ? JSON.parse(saved) : mockLessonReports;
  });
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>(() => {
    const saved = localStorage.getItem('cw_performance');
    return saved ? JSON.parse(saved) : mockPerformanceRecords;
  });
  const [tutorRatings] = useState<TutorRating[]>(mockTutorRatings);
  const [projects] = useState<Project[]>(mockProjects);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem('cw_submissions');
    return saved ? JSON.parse(saved) : mockProjectSubmissions;
  });
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(mockActivityLogs);

  // Sync state to localStorage for persistence across reloads during evaluation
  useEffect(() => {
    localStorage.setItem('cw_schools', JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem('cw_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('cw_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cw_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('cw_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('cw_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const switchRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(mockUsers[0]); // Sarah Jenkins
    } else if (role === 'tutor') {
      setCurrentUser(mockUsers[1]); // Marcus Vance
    } else if (role === 'student') {
      setCurrentUser(mockUsers[5]); // Leo Chen
    }
  };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addTutor = (newTutorData: Omit<Tutor, 'id' | 'totalLessonsDelivered' | 'rating' | 'hireDate'>) => {
    const newTutor: Tutor = {
      ...newTutorData,
      id: `tut-${Date.now()}`,
      rating: 5.0,
      totalLessonsDelivered: 0,
      hireDate: new Date().toISOString().split('T')[0],
    };
    setTutors(prev => [newTutor, ...prev]);
    logActivity('Tutor Onboarded', `Added ${newTutor.name} to tutor registry.`);
  };

  const updateTutor = (id: string, updates: Partial<Tutor>) => {
    setTutors(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    logActivity('Tutor Updated', `Modified profile details for tutor #${id}.`);
  };

  const deactivateTutor = (id: string) => {
    setTutors(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'inactive' } : t))
    );
    logActivity('Tutor Deactivated', `Marked tutor #${id} as inactive.`);
  };

  const addSchool = (schoolData: Omit<School, 'id' | 'createdAt' | 'enrolledStudentsCount'>) => {
    const newSchool: School = {
      ...schoolData,
      id: `sch-${Date.now()}`,
      enrolledStudentsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSchools(prev => [newSchool, ...prev]);
    logActivity('School Partner Added', `Registered partner school: ${newSchool.name}.`);
  };

  const updateSchool = (id: string, updates: Partial<School>) => {
    setSchools(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    logActivity('School Updated', `Updated records for school #${id}.`);
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'enrollmentDate' | 'overallProgress' | 'attendanceRate' | 'completedProjectsCount'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      enrollmentDate: new Date().toISOString().split('T')[0],
      overallProgress: 0,
      attendanceRate: 100,
      completedProjectsCount: 0,
    };
    setStudents(prev => [newStudent, ...prev]);
    // update school student count
    setSchools(prev =>
      prev.map(s =>
        s.id === newStudent.schoolId
          ? { ...s, enrolledStudentsCount: s.enrolledStudentsCount + 1 }
          : s
      )
    );
    logActivity('Student Enrolled', `Enrolled ${newStudent.name} at ${newStudent.schoolName}.`);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    logActivity('Student Updated', `Updated profile of student #${id}.`);
  };

  const updateStudentStatus = (id: string, status: Student['enrollmentStatus']) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, enrollmentStatus: status } : s)));
    logActivity('Student Status Changed', `Set student #${id} status to ${status}.`);
  };

  const addSchedule = (lessonData: Omit<LessonSchedule, 'id' | 'hasReportSubmitted'>) => {
    // Check for room/tutor conflict on the same date and time
    const conflict = schedules.find(
      s =>
        s.date === lessonData.date &&
        s.status !== 'cancelled' &&
        ((s.tutorId === lessonData.tutorId && s.startTime === lessonData.startTime) ||
          (s.schoolId === lessonData.schoolId && s.location === lessonData.location && s.startTime === lessonData.startTime))
    );

    if (conflict) {
      return {
        success: false,
        conflictMessage: `Schedule conflict: ${
          conflict.tutorId === lessonData.tutorId
            ? `${lessonData.tutorName} already has a lesson at ${conflict.schoolName}`
            : `Room ${lessonData.location} is already booked`
        } at ${conflict.startTime} on ${conflict.date}.`,
      };
    }

    const newSchedule: LessonSchedule = {
      ...lessonData,
      id: `les-${Date.now()}`,
      hasReportSubmitted: false,
    };
    setSchedules(prev => [newSchedule, ...prev]);
    logActivity('Lesson Scheduled', `Booked ${newSchedule.title} at ${newSchedule.schoolName}.`);
    return { success: true };
  };

  const updateSchedule = (id: string, updates: Partial<LessonSchedule>) => {
    setSchedules(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    logActivity('Schedule Updated', `Updated lesson session #${id}.`);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    logActivity('Schedule Removed', `Removed lesson session #${id}.`);
  };

  const submitLessonReport = (reportData: Omit<LessonReport, 'id' | 'submittedAt'>) => {
    const newReport: LessonReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);
    // Mark schedule as having report submitted
    setSchedules(prev =>
      prev.map(s => (s.id === reportData.lessonId ? { ...s, hasReportSubmitted: true, status: 'completed' } : s))
    );
    // Notification for admin
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'admin',
      title: 'New Lesson Report Filed',
      message: `${reportData.tutorName} submitted report for ${reportData.schoolName} (${reportData.grade})`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'report',
      actionUrl: '/admin/reports',
    };
    setNotifications(prev => [newNotif, ...prev]);
    logActivity('Report Submitted', `Filed lesson report for ${reportData.lessonTitle}.`);
  };

  const updateLessonReport = (id: string, updates: Partial<LessonReport>) => {
    setReports(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
    logActivity('Report Status Updated', `Updated status on report #${id}.`);
  };

  const submitProjectCode = (projectId: string, codeContent: string, notes?: string, liveDemoUrl?: string) => {
    const project = projects.find(p => p.id === projectId);
    const existingIndex = submissions.findIndex(s => s.projectId === projectId && s.studentId === currentUser.id);

    const submissionData: ProjectSubmission = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub-${Date.now()}`,
      projectId,
      projectTitle: project ? project.title : 'Coding Project',
      studentId: currentUser.id === 'user-student-1' ? 'stu-1' : currentUser.id,
      studentName: currentUser.name,
      schoolId: 'sch-1',
      schoolName: 'Nakuru High School',
      grade: 'Grade 9',
      submissionDate: new Date().toISOString(),
      status: 'submitted',
      codeContent,
      notes,
      liveDemoUrl,
    };

    if (existingIndex >= 0) {
      setSubmissions(prev => prev.map((s, idx) => (idx === existingIndex ? submissionData : s)));
    } else {
      setSubmissions(prev => [submissionData, ...prev]);
    }

    // Tutor notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'tutor',
      title: 'New Code Submission',
      message: `${currentUser.name} submitted code for "${submissionData.projectTitle}".`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'submission',
      actionUrl: '/tutor/projects-reviews',
    };
    setNotifications(prev => [newNotif, ...prev]);
    logActivity('Project Submitted', `${currentUser.name} submitted ${submissionData.projectTitle}.`);
  };

  const reviewSubmission = (
    submissionId: string,
    reviewData: Omit<CodeReview, 'id' | 'submissionId' | 'reviewDate' | 'tutorId' | 'tutorName'>
  ) => {
    const fullReview: CodeReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      submissionId,
      tutorId: currentUser.id === 'user-tutor-1' ? 'tut-1' : currentUser.id,
      tutorName: currentUser.name,
      reviewDate: new Date().toISOString(),
    };

    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, status: 'reviewed', review: fullReview }
          : sub
      )
    );

    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      // Student notification
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        targetRole: 'student',
        targetUserId: submission.studentId,
        title: 'Project Reviewed',
        message: `${currentUser.name} reviewed your submission for "${submission.projectTitle}" (Score: ${fullReview.totalScore}/${fullReview.maxScore}).`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'review',
        actionUrl: '/student/code-reviews',
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    logActivity('Code Review Saved', `Graded project submission #${submissionId}.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        switchRole,
        users: mockUsers,
        schools,
        tutors,
        students,
        schedules,
        reports,
        performanceRecords,
        tutorRatings,
        projects,
        submissions,
        notifications,
        activityLogs,

        addTutor,
        updateTutor,
        deactivateTutor,

        addSchool,
        updateSchool,

        addStudent,
        updateStudent,
        updateStudentStatus,

        addSchedule,
        updateSchedule,
        deleteSchedule,

        submitLessonReport,
        updateLessonReport,

        submitProjectCode,
        reviewSubmission,

        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
