import {
  User,
  School,
  Tutor,
  Student,
  LessonSchedule,
  LessonReport,
  PerformanceRecord,
  TutorRating,
  Project,
  ProjectSubmission,
  AppNotification,
  ActivityLog,
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-admin-1',
    name: 'Faith Muthoni',
    email: 'faith.muthoni@codeworks.co.ke',
    role: 'admin',
    phone: '+254 722 450 123',
    createdAt: '2025-08-10',
  },
  {
    id: 'user-tutor-1',
    name: 'Dennis Kiprono',
    email: 'dennis.kiprono@codeworks.co.ke',
    role: 'tutor',
    phone: '+254 711 345 678',
    createdAt: '2025-09-01',
  },
  {
    id: 'user-tutor-2',
    name: 'Mercy Jepkemoi',
    email: 'mercy.jepkemoi@codeworks.co.ke',
    role: 'tutor',
    phone: '+254 733 567 890',
    createdAt: '2025-09-15',
  },
  {
    id: 'user-tutor-3',
    name: 'Brian Ochieng',
    email: 'brian.ochieng@codeworks.co.ke',
    role: 'tutor',
    phone: '+254 720 789 012',
    createdAt: '2025-10-01',
  },
  {
    id: 'user-tutor-4',
    name: 'Wanjiku Kamau',
    email: 'wanjiku.kamau@codeworks.co.ke',
    role: 'tutor',
    phone: '+254 715 890 123',
    createdAt: '2025-10-15',
  },
  {
    id: 'user-student-1',
    name: 'Kevin Ochieng',
    email: 'kevin.ochieng@nakuruhigh.ac.ke',
    role: 'student',
    phone: '+254 701 445 678',
    createdAt: '2026-01-10',
  },
  {
    id: 'user-student-2',
    name: 'Brenda Cherono',
    email: 'brenda.cherono@nakuruhigh.ac.ke',
    role: 'student',
    phone: '+254 702 556 789',
    createdAt: '2026-01-10',
  },
];

export const mockSchools: School[] = [
  {
    id: 'sch-1',
    name: 'Nakuru High School (CBC Junior & Senior Wing)',
    code: 'NHS-01',
    address: 'Lanet Road, Nakuru City, Nakuru County',
    contactPerson: 'Esther Chebet (HOD Computer Studies)',
    contactEmail: 'e.chebet@nakuruhigh.ac.ke',
    contactPhone: '+254 722 550 199',
    gradesOffered: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'],
    activeStatus: 'active',
    enrolledStudentsCount: 84,
    assignedTutorIds: ['tut-1', 'tut-2'],
    createdAt: '2025-08-15',
  },
  {
    id: 'sch-2',
    name: 'Moi High School Kabarak',
    code: 'KAB-02',
    address: 'Nakuru - Eldama Ravine Rd, Kabarak, Nakuru County',
    contactPerson: 'Mwalimu Peter Kamau (Director of Digital Learning)',
    contactEmail: 'p.kamau@kabarak.ac.ke',
    contactPhone: '+254 711 550 144',
    gradesOffered: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    activeStatus: 'active',
    enrolledStudentsCount: 120,
    assignedTutorIds: ['tut-1', 'tut-3'],
    createdAt: '2025-08-20',
  },
  {
    id: 'sch-3',
    name: 'Menengai High School',
    code: 'MHS-03',
    address: 'Near Menengai Crater View, Nakuru West, Nakuru County',
    contactPerson: 'David Kiprono (Academic Dean)',
    contactEmail: 'd.kiprono@menengaihigh.ac.ke',
    contactPhone: '+254 720 550 822',
    gradesOffered: ['Grade 7', 'Grade 8', 'Grade 9'],
    activeStatus: 'active',
    enrolledStudentsCount: 65,
    assignedTutorIds: ['tut-2', 'tut-4'],
    createdAt: '2025-09-01',
  },
  {
    id: 'sch-4',
    name: 'Greensteds International School Nakuru',
    code: 'GRN-04',
    address: 'Nakuru - Nairobi Highway, Mbaruk, Nakuru County',
    contactPerson: 'Faith Wanjiru (Head of ICT & Computing)',
    contactEmail: 'f.wanjiru@greensteds.ac.ke',
    contactPhone: '+254 733 550 310',
    gradesOffered: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    activeStatus: 'active',
    enrolledStudentsCount: 95,
    assignedTutorIds: ['tut-3', 'tut-4'],
    createdAt: '2025-09-10',
  },
];

export const mockTutors: Tutor[] = [
  {
    id: 'tut-1',
    userId: 'user-tutor-1',
    name: 'Dennis Kiprono',
    email: 'dennis.kiprono@codeworks.co.ke',
    phone: '+254 711 345 678',
    status: 'active',
    bio: 'Lead Web Development instructor with 6+ years training secondary school students in modern HTML5, responsive CSS, JavaScript DOM scripting, and web standards.',
    specialties: ['Semantic HTML5', 'Responsive CSS & Flexbox', 'JavaScript DOM', 'Web Accessibility'],
    rating: 4.9,
    totalLessonsDelivered: 142,
    hireDate: '2025-09-01',
    assignedSchools: [
      {
        id: 'tsa-1',
        tutorId: 'tut-1',
        schoolId: 'sch-1',
        schoolName: 'Nakuru High School',
        grades: ['Grade 8', 'Grade 9', 'Grade 10'],
        subjectFocus: ['Web Development Fundamentals', 'Interactive DOM Scripting'],
        assignedDate: '2025-09-05',
        status: 'active',
      },
      {
        id: 'tsa-2',
        tutorId: 'tut-1',
        schoolId: 'sch-2',
        schoolName: 'Moi High School Kabarak',
        grades: ['Grade 9', 'Grade 10'],
        subjectFocus: ['CSS Grid & Flexbox Systems', 'JavaScript Web Apps'],
        assignedDate: '2025-09-10',
        status: 'active',
      },
    ],
  },
  {
    id: 'tut-2',
    userId: 'user-tutor-2',
    name: 'Mercy Jepkemoi',
    email: 'mercy.jepkemoi@codeworks.co.ke',
    phone: '+254 733 567 890',
    status: 'active',
    bio: 'Frontend specialist focusing on responsive web layout systems, typography hierarchy, and student web design portfolios for CBC Junior Secondary learners.',
    specialties: ['Modern CSS', 'Responsive Web Design', 'HTML5 Architecture', 'UI Prototyping'],
    rating: 4.8,
    totalLessonsDelivered: 118,
    hireDate: '2025-09-15',
    assignedSchools: [
      {
        id: 'tsa-3',
        tutorId: 'tut-2',
        schoolId: 'sch-1',
        schoolName: 'Nakuru High School',
        grades: ['Grade 7', 'Grade 8'],
        subjectFocus: ['Web Development Fundamentals'],
        assignedDate: '2025-09-18',
        status: 'active',
      },
      {
        id: 'tsa-4',
        tutorId: 'tut-2',
        schoolId: 'sch-3',
        schoolName: 'Menengai High School',
        grades: ['Grade 7', 'Grade 8'],
        subjectFocus: ['Intro to Web Design & HTML5'],
        assignedDate: '2025-09-20',
        status: 'active',
      },
    ],
  },
  {
    id: 'tut-3',
    userId: 'user-tutor-3',
    name: 'Brian Ochieng',
    email: 'brian.ochieng@codeworks.co.ke',
    phone: '+254 720 789 012',
    status: 'active',
    bio: 'Software engineer and web mentor training Senior Secondary learners in asynchronous JavaScript, web API integration, and clean frontend engineering.',
    specialties: ['JavaScript ES6+', 'Asynchronous Web APIs', 'Frontend Architecture', 'Web Performance'],
    rating: 4.7,
    totalLessonsDelivered: 98,
    hireDate: '2025-10-01',
    assignedSchools: [
      {
        id: 'tsa-5',
        tutorId: 'tut-3',
        schoolId: 'sch-2',
        schoolName: 'Moi High School Kabarak',
        grades: ['Grade 11', 'Grade 12'],
        subjectFocus: ['Asynchronous JavaScript & Web APIs'],
        assignedDate: '2025-10-05',
        status: 'active',
      },
      {
        id: 'tsa-6',
        tutorId: 'tut-3',
        schoolId: 'sch-4',
        schoolName: 'Greensteds International School',
        grades: ['Grade 11', 'Grade 12'],
        subjectFocus: ['Fullstack Web Applications'],
        assignedDate: '2025-10-10',
        status: 'active',
      },
    ],
  },
  {
    id: 'tut-4',
    userId: 'user-tutor-4',
    name: 'Wanjiku Kamau',
    email: 'wanjiku.kamau@codeworks.co.ke',
    phone: '+254 715 890 123',
    status: 'active',
    bio: 'Web accessibility and client-side web application instructor teaching students how to build accessible web forms and dynamic browser interfaces.',
    specialties: ['Web Accessibility (WCAG)', 'Form Validation', 'CSS Flexbox & Grid', 'Client-Side Scripting'],
    rating: 4.9,
    totalLessonsDelivered: 134,
    hireDate: '2025-10-15',
    assignedSchools: [
      {
        id: 'tsa-7',
        tutorId: 'tut-4',
        schoolId: 'sch-3',
        schoolName: 'Menengai High School',
        grades: ['Grade 8', 'Grade 9'],
        subjectFocus: ['Interactive Web Scripting'],
        assignedDate: '2025-10-20',
        status: 'active',
      },
      {
        id: 'tsa-8',
        tutorId: 'tut-4',
        schoolId: 'sch-4',
        schoolName: 'Greensteds International School',
        grades: ['Grade 9', 'Grade 10'],
        subjectFocus: ['Responsive Web Portfolios'],
        assignedDate: '2025-10-22',
        status: 'active',
      },
    ],
  },
];

export const mockStudents: Student[] = [
  {
    id: 'stu-1',
    userId: 'user-student-1',
    name: 'Kevin Ochieng',
    email: 'kevin.ochieng@nakuruhigh.ac.ke',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    guardianName: 'Samuel Ochieng',
    guardianEmail: 'samuel.ochieng@gmail.com',
    guardianPhone: '+254 722 883 140',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-10',
    currentCourse: 'Web Development Fundamentals',
    attendanceRate: 94,
    overallProgress: 88,
    completedProjectsCount: 4,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
  {
    id: 'stu-2',
    userId: 'user-student-2',
    name: 'Brenda Cherono',
    email: 'brenda.cherono@nakuruhigh.ac.ke',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    guardianName: 'Beatrice Cherono',
    guardianEmail: 'b.cherono@safari.co.ke',
    guardianPhone: '+254 721 442 211',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-10',
    currentCourse: 'Web Development Fundamentals',
    attendanceRate: 98,
    overallProgress: 94,
    completedProjectsCount: 5,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
  {
    id: 'stu-3',
    userId: 'user-student-3',
    name: 'Emmanuel Kipkorir',
    email: 'e.kipkorir@nakuruhigh.ac.ke',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    guardianName: 'Joseph Kipkorir',
    guardianEmail: 'jkipkorir@gmail.com',
    guardianPhone: '+254 723 918 200',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-10',
    currentCourse: 'Web Development Fundamentals',
    attendanceRate: 82,
    overallProgress: 72,
    completedProjectsCount: 3,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
  {
    id: 'stu-4',
    userId: 'user-student-4',
    name: 'Amina Hassan',
    email: 'amina.h@kabarak.ac.ke',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    grade: 'Grade 8',
    guardianName: 'Hassan Omar',
    guardianEmail: 'homar@nakuruhealth.go.ke',
    guardianPhone: '+254 712 223 188',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-15',
    currentCourse: 'Interactive Web Scripting',
    attendanceRate: 96,
    overallProgress: 90,
    completedProjectsCount: 4,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
  {
    id: 'stu-5',
    userId: 'user-student-5',
    name: 'Collins Bett',
    email: 'c.bett@kabarak.ac.ke',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    grade: 'Grade 10',
    guardianName: 'Wilson Bett',
    guardianEmail: 'wbett@riftvalley.co.ke',
    guardianPhone: '+254 724 776 102',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-12',
    currentCourse: 'Frontend UI Systems',
    attendanceRate: 90,
    overallProgress: 85,
    completedProjectsCount: 4,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
  {
    id: 'stu-6',
    userId: 'user-student-6',
    name: 'Grace Nyambura',
    email: 'g.nyambura@menengaihigh.ac.ke',
    schoolId: 'sch-3',
    schoolName: 'Menengai High School',
    grade: 'Grade 7',
    guardianName: 'Miriam Nyambura',
    guardianEmail: 'mnyambura@egerton.ac.ke',
    guardianPhone: '+254 715 339 011',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-18',
    currentCourse: 'Web Development Fundamentals',
    attendanceRate: 95,
    overallProgress: 89,
    completedProjectsCount: 3,
    primaryTutorId: 'tut-2',
    primaryTutorName: 'Mercy Jepkemoi',
  },
  {
    id: 'stu-7',
    userId: 'user-student-7',
    name: 'Ian Mwangi',
    email: 'i.mwangi@greensteds.ac.ke',
    schoolId: 'sch-4',
    schoolName: 'Greensteds International School',
    grade: 'Grade 11',
    guardianName: 'George Mwangi',
    guardianEmail: 'gmwangi@nakuruhotels.co.ke',
    guardianPhone: '+254 722 901 155',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-08',
    currentCourse: 'Fullstack Web Applications',
    attendanceRate: 88,
    overallProgress: 82,
    completedProjectsCount: 4,
    primaryTutorId: 'tut-3',
    primaryTutorName: 'Brian Ochieng',
  },
  {
    id: 'stu-8',
    userId: 'user-student-8',
    name: 'Joy Wambui',
    email: 'joy.wambui@nakuruhigh.ac.ke',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 10',
    guardianName: 'Patrick Wambui',
    guardianEmail: 'pwambui@lawkenya.co.ke',
    guardianPhone: '+254 713 667 799',
    enrollmentStatus: 'active',
    enrollmentDate: '2026-01-14',
    currentCourse: 'Frontend UI Systems',
    attendanceRate: 92,
    overallProgress: 87,
    completedProjectsCount: 4,
    primaryTutorId: 'tut-1',
    primaryTutorName: 'Dennis Kiprono',
  },
];

export const mockSchedules: LessonSchedule[] = [
  {
    id: 'les-1',
    title: 'CSS Flexbox Navigation & Layout Systems',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 9',
    date: '2026-10-22',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Computer Lab 2 (Lanet Block)',
    status: 'scheduled',
    curriculumTopic: 'Flexbox Containers, Alignment & Media Queries',
    expectedStudentCount: 18,
    hasReportSubmitted: false,
    notes: 'Students should have Chrome browser and VS Code ready.',
  },
  {
    id: 'les-2',
    title: 'JavaScript DOM Event Listeners & Interactive Cards',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 10',
    date: '2026-10-22',
    startTime: '13:00',
    endTime: '14:30',
    location: 'Main Science & ICT Lab',
    status: 'scheduled',
    curriculumTopic: 'QuerySelector, Click Events & Class Toggling',
    expectedStudentCount: 22,
    hasReportSubmitted: false,
    notes: 'Focus on building an interactive school events gallery.',
  },
  {
    id: 'les-3',
    title: 'Asynchronous JavaScript & REST API Integration',
    schoolId: 'sch-4',
    schoolName: 'Greensteds International School',
    tutorId: 'tut-3',
    tutorName: 'Brian Ochieng',
    grade: 'Grade 12',
    date: '2026-10-22',
    startTime: '11:00',
    endTime: '12:30',
    location: 'Senior ICT Studio',
    status: 'scheduled',
    curriculumTopic: 'Fetch API, Promises & JSON Rendering',
    expectedStudentCount: 15,
    hasReportSubmitted: false,
  },
  {
    id: 'les-4',
    title: 'Semantic HTML5 Architecture & Document Flow',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    tutorId: 'tut-2',
    tutorName: 'Mercy Jepkemoi',
    grade: 'Grade 8',
    date: '2026-10-23',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Computer Lab 1',
    status: 'scheduled',
    curriculumTopic: 'Landmark Elements (<header>, <main>, <section>, <nav>)',
    expectedStudentCount: 20,
    hasReportSubmitted: false,
  },
  {
    id: 'les-5',
    title: 'Client-Side Form Validation & RegEx in JavaScript',
    schoolId: 'sch-3',
    schoolName: 'Menengai High School',
    tutorId: 'tut-4',
    tutorName: 'Wanjiku Kamau',
    grade: 'Grade 8',
    date: '2026-10-23',
    startTime: '14:00',
    endTime: '15:30',
    location: 'Computer Studies Room',
    status: 'scheduled',
    curriculumTopic: 'Form Submit Interception & Real-Time Input Checking',
    expectedStudentCount: 16,
    hasReportSubmitted: false,
  },
  {
    id: 'les-6',
    title: 'HTML Tables, Media Embedding & Accessible Alt Text',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 9',
    date: '2026-10-20',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Computer Lab 2 (Lanet Block)',
    status: 'completed',
    curriculumTopic: 'Accessible Tables, Captions & Responsive Images',
    expectedStudentCount: 18,
    hasReportSubmitted: true,
    notes: 'All 18 students coded accessible web pages with WCAG compliance.',
  },
  {
    id: 'les-7',
    title: 'Modern CSS Grid: Building Multi-Column Catalogs',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 9',
    date: '2026-10-20',
    startTime: '13:00',
    endTime: '14:30',
    location: 'Main Science & ICT Lab',
    status: 'completed',
    curriculumTopic: 'Grid Template Columns, Gap & Responsive Breakpoints',
    expectedStudentCount: 20,
    hasReportSubmitted: true,
  },
];

export const mockLessonReports: LessonReport[] = [
  {
    id: 'rep-1',
    lessonId: 'les-6',
    lessonTitle: 'HTML Tables, Media Embedding & Accessible Alt Text',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 9',
    date: '2026-10-20',
    submittedAt: '2026-10-20T11:45:00Z',
    status: 'approved',
    lessonTopic: 'Semantic Tables, <thead>, <tbody>, Descriptive Alt Tags, and WCAG AA Standards',
    learningObjectives: [
      'Structure tabular data with semantic table landmarks and captions',
      'Implement responsive table overflow scroll containers',
      'Write meaningful descriptive alt text for educational images',
      'Verify keyboard navigation and focus outlines on links',
    ],
    topicsCovered: 'Demonstrated tabular data structure using Nakuru meteorological statistics. Students created clean HTML tables with scope attributes and styled zebra stripes with modern CSS pseudo-classes.',
    attendance: [
      { studentId: 'stu-1', studentName: 'Kevin Ochieng', status: 'present', notes: 'Very attentive, assisted classmate.' },
      { studentId: 'stu-2', studentName: 'Brenda Cherono', status: 'present', notes: 'Completed extra responsive styling challenge.' },
      { studentId: 'stu-3', studentName: 'Emmanuel Kipkorir', status: 'present', notes: 'Needed help with colspan syntax.' },
    ],
    studentPerformances: [
      {
        studentId: 'stu-1',
        studentName: 'Kevin Ochieng',
        understandingLevel: 5,
        engagementLevel: 5,
        strengths: 'Understands semantic markup hierarchy and wrote clean HTML with no syntax errors.',
        improvementAreas: 'Can explore adding ARIA labels for complex widgets.',
      },
      {
        studentId: 'stu-2',
        studentName: 'Brenda Cherono',
        understandingLevel: 5,
        engagementLevel: 5,
        strengths: 'Rapid implementation of CSS variables for consistent typography and spacing.',
        improvementAreas: 'Ready for CSS Grid and complex responsive layouts.',
      },
      {
        studentId: 'stu-3',
        studentName: 'Emmanuel Kipkorir',
        understandingLevel: 3,
        engagementLevel: 4,
        strengths: 'Persistent with debugging CSS rules.',
        improvementAreas: 'Review table nesting and parent-child container box model.',
      },
    ],
    generalNotes: 'Great class session. Computer Lab 2 network connectivity was stable throughout.',
    nextSteps: 'Next class will introduce CSS Flexbox for navigation headers and card grids.',
  },
  {
    id: 'rep-2',
    lessonId: 'les-7',
    lessonTitle: 'Modern CSS Grid: Building Multi-Column Catalogs',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    grade: 'Grade 9',
    date: '2026-10-20',
    submittedAt: '2026-10-20T16:10:00Z',
    status: 'submitted',
    lessonTopic: 'CSS Grid repeat(), auto-fit, minmax(), and responsive column wrapping without media queries',
    learningObjectives: [
      'Master grid-template-columns with minmax()',
      'Create responsive product card grids',
      'Apply CSS gap and align-items properties',
    ],
    topicsCovered: 'Built a responsive digital catalog for Nakuru agricultural produce with cards that naturally adapt from 1 column on mobile to 4 columns on desktop.',
    attendance: [
      { studentId: 'stu-4', studentName: 'Amina Hassan', status: 'present' },
      { studentId: 'stu-5', studentName: 'Collins Bett', status: 'present' },
    ],
    studentPerformances: [
      {
        studentId: 'stu-4',
        studentName: 'Amina Hassan',
        understandingLevel: 5,
        engagementLevel: 5,
        strengths: 'Exceptional visual polish and clean CSS class naming.',
        improvementAreas: 'Watch out for card image aspect-ratio stretching.',
      },
      {
        studentId: 'stu-5',
        studentName: 'Collins Bett',
        understandingLevel: 4,
        engagementLevel: 4,
        strengths: 'Logical structure and good semantic markup.',
        improvementAreas: 'Practice using auto-fill vs auto-fit in CSS Grid.',
      },
    ],
    generalNotes: 'Students enjoyed seeing their card grids adapt smoothly when resizing the browser window.',
    nextSteps: 'Transition into JavaScript DOM event listeners to filter cards dynamically.',
  },
];

export const mockPerformanceRecords: PerformanceRecord[] = [
  {
    id: 'perf-1',
    studentId: 'stu-1',
    studentName: 'Kevin Ochieng',
    schoolId: 'sch-1',
    grade: 'Grade 9',
    period: 'Term 3 2026',
    codingProficiency: 91,
    problemSolvingScore: 88,
    collaborationScore: 92,
    codeQualityScore: 86,
    attendanceRate: 94,
    overallScore: 90,
    tutorFeedback: 'Kevin consistently produces clean, valid HTML5 and CSS. His DOM manipulation logic in JavaScript is maturing nicely.',
    updatedAt: '2026-10-20',
  },
  {
    id: 'perf-2',
    studentId: 'stu-2',
    studentName: 'Brenda Cherono',
    schoolId: 'sch-1',
    grade: 'Grade 9',
    period: 'Term 3 2026',
    codingProficiency: 96,
    problemSolvingScore: 95,
    collaborationScore: 94,
    codeQualityScore: 95,
    attendanceRate: 98,
    overallScore: 96,
    tutorFeedback: 'Brenda demonstrates outstanding attention to UI/UX standards, responsive design, and accessible markup. Top performer in the Grade 9 cohort.',
    updatedAt: '2026-10-20',
  },
  {
    id: 'perf-3',
    studentId: 'stu-3',
    studentName: 'Emmanuel Kipkorir',
    schoolId: 'sch-1',
    grade: 'Grade 9',
    period: 'Term 3 2026',
    codingProficiency: 72,
    problemSolvingScore: 74,
    collaborationScore: 80,
    codeQualityScore: 70,
    attendanceRate: 82,
    overallScore: 76,
    tutorFeedback: 'Emmanuel is making steady progress with CSS layout concepts. Extra practice on Flexbox container properties will build his confidence.',
    updatedAt: '2026-10-20',
  },
  {
    id: 'perf-4',
    studentId: 'stu-4',
    studentName: 'Amina Hassan',
    schoolId: 'sch-2',
    grade: 'Grade 8',
    period: 'Term 3 2026',
    codingProficiency: 92,
    problemSolvingScore: 90,
    collaborationScore: 95,
    codeQualityScore: 91,
    attendanceRate: 96,
    overallScore: 93,
    tutorFeedback: 'Amina has an eye for aesthetic typography and clean CSS architecture. Her JavaScript event listeners are well-structured.',
    updatedAt: '2026-10-20',
  },
  {
    id: 'perf-5',
    studentId: 'stu-5',
    studentName: 'Collins Bett',
    schoolId: 'sch-2',
    grade: 'Grade 10',
    period: 'Term 3 2026',
    codingProficiency: 86,
    problemSolvingScore: 84,
    collaborationScore: 87,
    codeQualityScore: 85,
    attendanceRate: 90,
    overallScore: 86,
    tutorFeedback: 'Collins builds reliable web forms and understands DOM manipulation and client-side validation logic well.',
    updatedAt: '2026-10-20',
  },
];

export const mockTutorRatings: TutorRating[] = [
  {
    id: 'tr-1',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    ratingScore: 5,
    feedbackCategory: 'Student Engagement',
    comment: 'Dennis makes web development approachable and exciting. Our Grade 9 learners look forward to his practical lab sessions each week.',
    source: 'School Admin',
    createdAt: '2026-10-14',
  },
  {
    id: 'tr-2',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    ratingScore: 5,
    feedbackCategory: 'Clarity',
    comment: 'Mr. Kiprono breaks down CSS Flexbox and JavaScript events with practical analogies. His debugging tips helped me fix my project layout.',
    source: 'Student',
    createdAt: '2026-10-18',
  },
  {
    id: 'tr-3',
    tutorId: 'tut-1',
    tutorName: 'Dennis Kiprono',
    schoolId: 'sch-2',
    schoolName: 'Moi High School Kabarak',
    ratingScore: 4.8,
    feedbackCategory: 'Punctuality',
    comment: 'Extremely dependable instructor. Detailed post-lesson reports and seamless collaboration with our school IT lab technicians.',
    source: 'School Admin',
    createdAt: '2026-10-10',
  },
  {
    id: 'tr-4',
    tutorId: 'tut-2',
    tutorName: 'Mercy Jepkemoi',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    ratingScore: 4.9,
    feedbackCategory: 'Classroom Management',
    comment: 'Mercy handles the junior secondary learners with great patience. The web design portfolio project has received commendations from parents.',
    source: 'School Admin',
    createdAt: '2026-10-12',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Nakuru Community & Tourism Web Portal',
    description: 'Design and build a responsive web portal featuring attractions in Nakuru County (Menengai Crater, Lake Nakuru National Park, Hyrax Hill) with accessible navigation, responsive cards, and an interactive visitor enquiry form.',
    grade: 'Grade 9',
    course: 'Web Development Fundamentals',
    difficulty: 'Intermediate',
    assignedDate: '2026-10-10',
    dueDate: '2026-10-25',
    instructions: [
      'Structure the document with semantic HTML5 landmarks: <header>, <nav>, <main>, <section>, <article>, and <footer>.',
      'Implement a responsive layout using CSS Flexbox for the navigation bar and CSS Grid for attraction cards.',
      'Ensure WCAG AA color contrast and descriptive alt text for all landmark photography.',
      'Add JavaScript client-side form validation for the visitor feedback form (name, email, message length).',
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Explore Nakuru County</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="logo">Nakuru Explorer</div>
      <ul class="nav-links">
        <li><a href="#attractions">Attractions</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero">
      <h1>Discover the Pearl of the Rift Valley</h1>
      <p>Explore wildlife, hiking trails, and historical landmarks in Nakuru, Kenya.</p>
    </section>

    <section id="attractions" class="cards-grid">
      <!-- TODO: Add attraction cards with CSS Grid -->
    </section>
  </main>

  <script src="app.js"></script>
</body>
</html>`,
    rubricCriteria: [
      { name: 'Semantic Structure & Accessibility', description: 'Semantic HTML5 elements, heading order (h1-h3), and WCAG AA contrast.', maxPoints: 25 },
      { name: 'Responsive CSS Grid & Flexbox', description: 'Fluid layout that adapts seamlessly across mobile (360px) and desktop (1280px).', maxPoints: 25 },
      { name: 'Interactive JavaScript Functionality', description: 'DOM event listeners, card filtering, or form validation executing without console errors.', maxPoints: 25 },
      { name: 'Code Quality & Formatting', description: 'Clean indentation, descriptive class names, modular CSS, and commented logic.', maxPoints: 25 },
    ],
  },
  {
    id: 'proj-2',
    title: 'School Club Activities & Timetable Web App',
    description: 'Create an interactive web application that displays extracurricular clubs, meeting timetables, and allows students to filter clubs by category (STEM, Arts, Sports, Leadership).',
    grade: 'Grade 9',
    course: 'Web Development Fundamentals',
    difficulty: 'Intermediate',
    assignedDate: '2026-10-15',
    dueDate: '2026-10-30',
    instructions: [
      'Write modular HTML and CSS using CSS Custom Properties (CSS variables) for theme colors.',
      'Store club data in a JavaScript array of objects and render cards dynamically into the DOM.',
      'Add filter buttons that filter visible cards by category without page reloads.',
      'Include an accessible modal dialog showing full club details when a card is clicked.',
    ],
    starterCode: `<!-- Club Activities Web App -->
<div class="container">
  <h1>Nakuru High School Clubs</h1>
  <div class="filter-buttons">
    <button class="filter-btn active" data-category="all">All</button>
    <button class="filter-btn" data-category="stem">STEM</button>
    <button class="filter-btn" data-category="arts">Arts</button>
  </div>
  <div id="clubs-grid" class="grid"></div>
</div>`,
    rubricCriteria: [
      { name: 'Dynamic DOM Rendering', description: 'Proper creation and injection of HTML elements using JavaScript.', maxPoints: 30 },
      { name: 'Responsive Component Styling', description: 'Polished CSS styling with hover effects and responsive columns.', maxPoints: 30 },
      { name: 'Event Handling & Filter Logic', description: 'Clean Array.filter() and event listener implementation.', maxPoints: 20 },
      { name: 'Code Organization', description: 'Separation of data, business logic, and presentation styles.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-3',
    title: 'Nakuru Agri-Trade Farmer Product Showcase',
    description: 'Develop an e-commerce showcase website for local Nakuru dairy and horticulture farmers with product search, price range filter, and an interactive shopping cart summary.',
    grade: 'Grade 10',
    course: 'Frontend UI Systems',
    difficulty: 'Advanced',
    assignedDate: '2026-10-05',
    dueDate: '2026-10-24',
    instructions: [
      'Implement real-time search input filtering products by name and category.',
      'Build an interactive cart counter using JavaScript localStorage for persistence across browser tabs.',
      'Design clean mobile-friendly card components with responsive badge indicators.',
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nakuru Agri-Trade Showcase</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="main.js"></script>
</body>
</html>`,
    rubricCriteria: [
      { name: 'State Management & LocalStorage', description: 'Persistent cart items across browser sessions.', maxPoints: 40 },
      { name: 'Search & Filter Efficiency', description: 'Instant input filtering without sluggishness.', maxPoints: 30 },
      { name: 'UI Typography & Styling', description: 'Harmonious color palette with legible text contrast.', maxPoints: 30 },
    ],
  },
];

export const mockProjectSubmissions: ProjectSubmission[] = [
  {
    id: 'sub-1',
    projectId: 'proj-1',
    projectTitle: 'Nakuru Community & Tourism Web Portal',
    studentId: 'stu-1',
    studentName: 'Kevin Ochieng',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    submissionDate: '2026-10-18T14:32:00Z',
    status: 'reviewed',
    liveDemoUrl: 'https://kevin-nakuru-portal.vercel.app',
    notes: 'Implemented responsive grid for Menengai Crater, Lake Nakuru and Hyrax Hill with interactive mobile hamburger menu and client-side contact form validation.',
    codeContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nakuru County Tourism & Heritage Portal</title>
  <style>
    :root {
      --primary: #174C3C;
      --primary-light: #287052;
      --bg: #F5F7F5;
      --card-bg: #FFFFFF;
      --text: #202923;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    
    /* Responsive Navbar */
    .header { background: var(--primary); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
    .nav-links { display: flex; list-style: none; gap: 1.5rem; }
    .nav-links a { color: white; text-decoration: none; font-weight: 500; }
    .nav-links a:hover { text-decoration: underline; }
    
    /* Hero Section */
    .hero { text-align: center; padding: 3rem 1rem; background: #E8F2EC; }
    .hero h1 { font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--primary); }
    
    /* CSS Grid Attractions */
    .grid-container { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .card { background: var(--card-bg); border-radius: 8px; border: 1px solid #E4E9E5; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .card h3 { color: var(--primary); margin-bottom: 0.5rem; }
    .card .tag { display: inline-block; background: #E8F2EC; color: #174C3C; font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; margin-bottom: 0.5rem; }
    
    /* Interactive Enquiry Form */
    .form-section { max-width: 600px; margin: 3rem auto; background: white; padding: 2rem; border-radius: 8px; border: 1px solid #E4E9E5; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.25rem; font-size: 0.9rem; }
    .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border: 1px solid #CBD5CE; border-radius: 4px; }
    .btn-submit { background: var(--primary); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
    .btn-submit:hover { background: var(--primary-light); }
  </style>
</head>
<body>
  <header class="header">
    <h2>Nakuru Explorer</h2>
    <ul class="nav-links">
      <li><a href="#attractions">Destinations</a></li>
      <li><a href="#enquiry">Plan Visit</a></li>
    </ul>
  </header>

  <main>
    <section class="hero">
      <h1>Karibu Nakuru County</h1>
      <p>Home of the Great Rift Valley, flamingo sanctuaries, and Menengai caldera.</p>
    </section>

    <section id="attractions" class="grid-container">
      <article class="card">
        <span class="tag">Wildlife & Birdwatching</span>
        <h3>Lake Nakuru National Park</h3>
        <p>World-famous sanctuary renowned for flamingo flocks, black rhinos, and scenic baboon cliffs view.</p>
      </article>

      <article class="card">
        <span class="tag">Geological Landmark</span>
        <h3>Menengai Crater Caldera</h3>
        <p>One of the largest volcanic calderas in Africa offering panoramic hiking trails and geothermal views.</p>
      </article>

      <article class="card">
        <span class="tag">Archaeological Site</span>
        <h3>Hyrax Hill Prehistoric Site</h3>
        <p>Prominent Stone Age and Iron Age archaeological museum overlooking Nakuru town.</p>
      </article>
    </section>

    <section id="enquiry" class="form-section">
      <h3>Visitor Contact Form</h3>
      <form id="contactForm">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" required placeholder="e.g. Wanjiku Mwangi">
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" required placeholder="wanjiku@domain.co.ke">
        </div>
        <div class="form-group">
          <label for="message">Tour Inquiry</label>
          <textarea id="message" rows="4" required placeholder="Tell us your planned dates..."></textarea>
        </div>
        <button type="submit" class="btn-submit">Send Message</button>
      </form>
    </section>
  </main>

  <script>
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      alert('Asante sana ' + name + '! Your inquiry for Nakuru tourism has been received.');
      this.reset();
    });
  </script>
</body>
</html>`,
    review: {
      id: 'rev-1',
      submissionId: 'sub-1',
      tutorId: 'tut-1',
      tutorName: 'Dennis Kiprono',
      reviewDate: '2026-10-19T10:15:00Z',
      status: 'approved',
      totalScore: 94,
      maxScore: 100,
      criteriaScores: [
        {
          criterionName: 'Semantic Structure & Accessibility',
          pointsAwarded: 24,
          maxPoints: 25,
          comment: 'Excellent use of landmark tags (<header>, <main>, <article>, <section>) and accessible form labels.',
        },
        {
          criterionName: 'Responsive CSS Grid & Flexbox',
          pointsAwarded: 24,
          maxPoints: 25,
          comment: 'The CSS Grid repeat(auto-fit, minmax(300px, 1fr)) works smoothly on mobile and widescreen.',
        },
        {
          criterionName: 'Interactive JavaScript Functionality',
          pointsAwarded: 23,
          maxPoints: 25,
          comment: 'Event handler works reliably. Consider adding real-time validation before submit.',
        },
        {
          criterionName: 'Code Quality & Formatting',
          pointsAwarded: 23,
          maxPoints: 25,
          comment: 'Clean CSS variables and organized structure. Minor note: separate CSS into a styles.css file.',
        },
      ],
      generalComments: 'Hongera sana, Kevin! Outstanding web project demonstrating thorough mastery of semantic HTML5, responsive CSS Grid, and JavaScript DOM interaction. The local Nakuru theme is well executed.',
      inlineComments: [
        {
          lineNumber: 26,
          comment: 'Great use of repeat(auto-fit, minmax(300px, 1fr)) for responsive columns without complex breakpoints.',
        },
        {
          lineNumber: 94,
          comment: 'Good practice preventing default form submit behavior using e.preventDefault().',
        },
      ],
      improvementSuggestions: [
        'Separate CSS and JS into standalone files (style.css and script.js) to practice external asset linking.',
        'Add a dark mode toggle using CSS variables and a JavaScript click listener.',
      ],
    },
  },
  {
    id: 'sub-2',
    projectId: 'proj-1',
    projectTitle: 'Nakuru Community & Tourism Web Portal',
    studentId: 'stu-2',
    studentName: 'Brenda Cherono',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    submissionDate: '2026-10-17T18:20:00Z',
    status: 'reviewed',
    notes: 'Added interactive search filter so visitors can search attractions dynamically in real-time.',
    codeContent: `<!DOCTYPE html>
<html>
<head><title>Brenda - Nakuru Explorer</title></head>
<body>
  <h1>Nakuru Attractions Guide</h1>
  <!-- Full responsive CSS Grid implementation with JS search -->
</body>
</html>`,
    review: {
      id: 'rev-2',
      submissionId: 'sub-2',
      tutorId: 'tut-1',
      tutorName: 'Dennis Kiprono',
      reviewDate: '2026-10-18T09:30:00Z',
      status: 'approved',
      totalScore: 98,
      maxScore: 100,
      criteriaScores: [
        { criterionName: 'Semantic Structure & Accessibility', pointsAwarded: 25, maxPoints: 25, comment: 'Flawless semantic markup.' },
        { criterionName: 'Responsive CSS Grid & Flexbox', pointsAwarded: 25, maxPoints: 25, comment: 'Exemplary responsive layout.' },
        { criterionName: 'Interactive JavaScript Functionality', pointsAwarded: 24, maxPoints: 25, comment: 'Dynamic search filter works very fast.' },
        { criterionName: 'Code Quality & Formatting', pointsAwarded: 24, maxPoints: 25, comment: 'Very clean CSS architecture.' },
      ],
      generalComments: 'Superb project, Brenda! The real-time search filtering demonstrated advanced JavaScript DOM understanding.',
      improvementSuggestions: ['Ready to learn CSS animations and keyframes in our upcoming unit.'],
    },
  },
  {
    id: 'sub-3',
    projectId: 'proj-1',
    projectTitle: 'Nakuru Community & Tourism Web Portal',
    studentId: 'stu-3',
    studentName: 'Emmanuel Kipkorir',
    schoolId: 'sch-1',
    schoolName: 'Nakuru High School',
    grade: 'Grade 9',
    submissionDate: '2026-10-21T08:15:00Z',
    status: 'submitted',
    notes: 'Draft submission. Completed basic HTML structure and styling Lake Nakuru card.',
    codeContent: `<!DOCTYPE html>
<html>
<head>
  <title>Nakuru Tourism</title>
</head>
<body>
  <h1>Explore Nakuru</h1>
  <div class="card">
    <h3>Lake Nakuru</h3>
    <p>Flamingos and wildlife.</p>
  </div>
</body>
</html>`,
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    targetRole: 'all',
    title: 'Term 3 CBC Curriculum Timetables Finalized',
    message: 'Timetables for Nakuru partner schools (Nakuru High, Kabarak, Menengai, Greensteds) are synchronized for Term 3.',
    timestamp: '2026-10-21T09:00:00Z',
    read: false,
    type: 'schedule',
  },
  {
    id: 'notif-2',
    targetRole: 'tutor',
    targetUserId: 'user-tutor-1',
    title: 'New Web Project Submission',
    message: 'Emmanuel Kipkorir submitted "Nakuru Community & Tourism Web Portal" for review.',
    timestamp: '2026-10-21T08:15:00Z',
    read: false,
    type: 'submission',
    actionUrl: '/tutor/projects-reviews',
  },
  {
    id: 'notif-3',
    targetRole: 'student',
    targetUserId: 'user-student-1',
    title: 'Code Review Approved',
    message: 'Dennis Kiprono approved your web portal code with a score of 94/100.',
    timestamp: '2026-10-19T10:15:00Z',
    read: true,
    type: 'review',
    actionUrl: '/student/code-reviews',
  },
  {
    id: 'notif-4',
    targetRole: 'admin',
    title: 'Lesson Report Submitted: Nakuru High School',
    message: 'Dennis Kiprono filed report for Grade 9 Web Development session (18 students attended).',
    timestamp: '2026-10-20T11:45:00Z',
    read: false,
    type: 'report',
    actionUrl: '/admin/reports',
  },
  {
    id: 'notif-5',
    targetRole: 'student',
    targetUserId: 'user-student-1',
    title: 'Upcoming Web Development Class',
    message: 'CSS Flexbox Navigation & Layout scheduled for tomorrow 09:00 AM at Computer Lab 2.',
    timestamp: '2026-10-21T14:00:00Z',
    read: false,
    type: 'schedule',
    actionUrl: '/student/schedule',
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    userId: 'user-tutor-1',
    userName: 'Dennis Kiprono',
    userRole: 'tutor',
    action: 'Code Review Completed',
    details: 'Graded Kevin Ochieng\'s Nakuru Web Portal (94/100)',
    timestamp: '2026-10-19T10:15:00Z',
  },
  {
    id: 'act-2',
    userId: 'user-tutor-1',
    userName: 'Dennis Kiprono',
    userRole: 'tutor',
    action: 'Lesson Report Submitted',
    details: 'Submitted report for Grade 9 Web Development at Nakuru High School',
    timestamp: '2026-10-20T11:45:00Z',
  },
  {
    id: 'act-3',
    userId: 'user-student-3',
    userName: 'Emmanuel Kipkorir',
    userRole: 'student',
    action: 'Project Submitted',
    details: 'Submitted Nakuru Community Web Portal for evaluation',
    timestamp: '2026-10-21T08:15:00Z',
  },
  {
    id: 'act-4',
    userId: 'user-admin-1',
    userName: 'Faith Muthoni',
    userRole: 'admin',
    action: 'Timetable Published',
    details: 'Updated Week 43 Web Development schedule across 4 Nakuru schools',
    timestamp: '2026-10-21T09:30:00Z',
  },
];
