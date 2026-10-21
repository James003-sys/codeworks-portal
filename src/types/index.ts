export type UserRole = 'admin' | 'tutor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export type GradeLevel = 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  gradesOffered: GradeLevel[];
  activeStatus: 'active' | 'inactive';
  enrolledStudentsCount: number;
  assignedTutorIds: string[];
  createdAt: string;
}

export interface TutorSchoolAssignment {
  id: string;
  tutorId: string;
  schoolId: string;
  schoolName: string;
  grades: GradeLevel[];
  subjectFocus: string[]; // e.g. ["Python", "Web Dev", "Robotics"]
  assignedDate: string;
  status: 'active' | 'inactive';
}

export interface Tutor {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  status: 'active' | 'on-leave' | 'inactive';
  bio: string;
  specialties: string[];
  assignedSchools: TutorSchoolAssignment[];
  rating: number; // e.g. 4.8
  totalLessonsDelivered: number;
  hireDate: string;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  schoolId: string;
  schoolName: string;
  grade: GradeLevel;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  enrollmentStatus: 'active' | 'graduated' | 'paused' | 'withdrawn';
  enrollmentDate: string;
  currentCourse: string;
  attendanceRate: number; // e.g. 94%
  overallProgress: number; // 0 - 100%
  completedProjectsCount: number;
  primaryTutorId?: string;
  primaryTutorName?: string;
}

export type LessonStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface LessonSchedule {
  id: string;
  title: string;
  schoolId: string;
  schoolName: string;
  tutorId: string;
  tutorName: string;
  grade: GradeLevel;
  date: string; // YYYY-MM-DD
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  location: string; // e.g. "Lab 2" or "Virtual Room A"
  status: LessonStatus;
  curriculumTopic: string;
  expectedStudentCount: number;
  hasReportSubmitted: boolean;
  notes?: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface StudentLessonPerformance {
  studentId: string;
  studentName: string;
  understandingLevel: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  engagementLevel: 1 | 2 | 3 | 4 | 5;
  strengths: string;
  improvementAreas: string;
}

export interface LessonReport {
  id: string;
  lessonId: string;
  lessonTitle: string;
  schoolId: string;
  schoolName: string;
  tutorId: string;
  tutorName: string;
  grade: GradeLevel;
  date: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'approved' | 'needs-revision';
  lessonTopic: string;
  learningObjectives: string[];
  topicsCovered: string;
  attendance: AttendanceRecord[];
  studentPerformances: StudentLessonPerformance[];
  generalNotes: string;
  nextSteps: string;
}

export interface PerformanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  schoolId: string;
  grade: GradeLevel;
  period: string; // e.g. "Term 1 2026"
  codingProficiency: number; // 0 - 100
  problemSolvingScore: number; // 0 - 100
  collaborationScore: number; // 0 - 100
  codeQualityScore: number; // 0 - 100
  attendanceRate: number; // 0 - 100
  overallScore: number; // average
  tutorFeedback: string;
  updatedAt: string;
}

export interface TutorRating {
  id: string;
  tutorId: string;
  tutorName: string;
  schoolId: string;
  schoolName: string;
  ratingScore: number; // 1-5
  feedbackCategory: 'Punctuality' | 'Clarity' | 'Student Engagement' | 'Technical Depth' | 'Classroom Management';
  comment: string;
  source: 'School Admin' | 'Student' | 'Lead Tutor';
  createdAt: string;
}

export type ProjectStatus = 'draft' | 'assigned' | 'in-progress' | 'submitted' | 'under-review' | 'reviewed';

export interface Project {
  id: string;
  title: string;
  description: string;
  grade: GradeLevel;
  course: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  assignedDate: string;
  dueDate: string;
  instructions: string[];
  starterCode?: string;
  rubricCriteria: {
    name: string;
    description: string;
    maxPoints: number;
  }[];
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  schoolId: string;
  schoolName: string;
  grade: GradeLevel;
  submissionDate: string;
  status: 'submitted' | 'reviewed';
  codeContent: string;
  liveDemoUrl?: string;
  notes?: string;
  review?: CodeReview;
}

export interface CodeReview {
  id: string;
  submissionId: string;
  tutorId: string;
  tutorName: string;
  reviewDate: string;
  status: 'approved' | 'changes-requested';
  totalScore: number;
  maxScore: number;
  criteriaScores: {
    criterionName: string;
    pointsAwarded: number;
    maxPoints: number;
    comment: string;
  }[];
  generalComments: string;
  inlineComments?: {
    lineNumber: number;
    comment: string;
    suggestion?: string;
  }[];
  improvementSuggestions: string[];
}

export type NotificationType = 'schedule' | 'submission' | 'report' | 'system' | 'review';

export interface AppNotification {
  id: string;
  targetRole: UserRole | 'all';
  targetUserId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: NotificationType;
  actionUrl?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
}
