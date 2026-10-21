import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchBar } from '../../components/ui/SearchBar';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Dialog } from '../../components/ui/Dialog';
import { Select } from '../../components/ui/Select';
import { Student, PerformanceRecord } from '../../types';
import { GraduationCap, Award, BookOpen, MessageSquare, Check } from 'lucide-react';
import { Textarea } from '../../components/ui/Textarea';

export const TutorStudents: React.FC = () => {
  const { currentUser, tutors, students, performanceRecords } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const assignedSchoolIds = currentTutor.assignedSchools.map(as => as.schoolId);

  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  // Filter students by tutor's assigned schools
  const myStudents = students.filter(s => assignedSchoolIds.includes(s.schoolId));

  const filteredStudents = myStudents.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.currentCourse.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSchool = schoolFilter === 'all' || s.schoolId === schoolFilter;
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;

    return matchesSearch && matchesSchool && matchesGrade;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenStudentProfile = (student: Student) => {
    setSelectedStudent(student);
    const existingPerf = performanceRecords.find(p => p.studentId === student.id);
    setFeedbackNote(existingPerf?.tutorFeedback || '');
    setFeedbackSaved(false);
  };

  const handleSaveFeedback = () => {
    setFeedbackSaved(true);
    setTimeout(() => setFeedbackSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Cohort Students"
        description="Track coding mastery, attendance consistency, and provide personalized feedback for your students."
      />

      <FilterBar
        isFiltered={searchQuery !== '' || schoolFilter !== 'all' || gradeFilter !== 'all'}
        onReset={() => {
          setSearchQuery('');
          setSchoolFilter('all');
          setGradeFilter('all');
          setCurrentPage(1);
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={val => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search students in your cohort..."
        />

        <div className="w-48">
          <Select
            value={schoolFilter}
            onChange={e => {
              setSchoolFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All My Schools</option>
            {currentTutor.assignedSchools.map(as => (
              <option key={as.schoolId} value={as.schoolId}>
                {as.schoolName}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-32">
          <Select
            value={gradeFilter}
            onChange={e => {
              setGradeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Grades</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </Select>
        </div>
      </FilterBar>

      <DataTable
        data={paginatedStudents}
        keyExtractor={s => s.id}
        onRowClick={handleOpenStudentProfile}
        columns={[
          {
            header: 'Student',
            cell: s => (
              <div className="flex items-center gap-3">
                <Avatar name={s.name} src={s.avatarUrl} size="md" />
                <div>
                  <p className="font-semibold text-content-heading">{s.name}</p>
                  <p className="text-xs text-content-muted">{s.email}</p>
                </div>
              </div>
            ),
          },
          {
            header: 'School & Grade',
            cell: s => (
              <div className="text-xs">
                <p className="font-medium text-content-heading">{s.schoolName}</p>
                <p className="text-content-muted">{s.grade}</p>
              </div>
            ),
          },
          {
            header: 'Curriculum Course',
            cell: s => (
              <span className="text-xs font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                {s.currentCourse}
              </span>
            ),
          },
          {
            header: 'Progress',
            cell: s => (
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-content-heading">{s.overallProgress}%</span>
                </div>
                <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-forest-600 h-full rounded-full"
                    style={{ width: `${s.overallProgress}%` }}
                  />
                </div>
              </div>
            ),
          },
          {
            header: 'Attendance',
            cell: s => (
              <span className="text-xs font-semibold text-emerald-800">
                {s.attendanceRate}%
              </span>
            ),
          },
          {
            header: 'Action',
            className: 'text-right',
            cell: s => (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  handleOpenStudentProfile(s);
                }}
              >
                Feedback & Scores
              </Button>
            ),
          },
        ]}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredStudents.length}
        pageSize={pageSize}
        onPageChange={p => setCurrentPage(p)}
      />

      {/* Student Profile & Feedback Modal */}
      {selectedStudent && (
        <Dialog
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.name}
          description={`${selectedStudent.schoolName} • ${selectedStudent.grade} • Course: ${selectedStudent.currentCourse}`}
          size="lg"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-subtle border border-surface-border">
              <Avatar name={selectedStudent.name} src={selectedStudent.avatarUrl} size="lg" />
              <div>
                <h4 className="font-bold text-sm text-content-heading">{selectedStudent.name}</h4>
                <p className="text-xs text-content-muted">Email: {selectedStudent.email}</p>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <span className="font-semibold text-forest-800">
                    Attendance: {selectedStudent.attendanceRate}%
                  </span>
                  <span className="text-content-subtle">•</span>
                  <span className="font-semibold text-forest-800">
                    Progress: {selectedStudent.overallProgress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Performance records summary */}
            {(() => {
              const perf = performanceRecords.find(p => p.studentId === selectedStudent.id);
              if (!perf) return null;
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded bg-white border border-surface-border">
                    <span className="text-content-muted">Proficiency</span>
                    <p className="text-base font-bold text-forest-800">{perf.codingProficiency}%</p>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-surface-border">
                    <span className="text-content-muted">Problem Solving</span>
                    <p className="text-base font-bold text-forest-800">{perf.problemSolvingScore}%</p>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-surface-border">
                    <span className="text-content-muted">Collaboration</span>
                    <p className="text-base font-bold text-forest-800">{perf.collaborationScore}%</p>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-surface-border">
                    <span className="text-content-muted">Code Quality</span>
                    <p className="text-base font-bold text-forest-800">{perf.codeQualityScore}%</p>
                  </div>
                </div>
              );
            })()}

            {/* Tutor Feedback area */}
            <div className="space-y-2 border-t border-surface-border pt-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-content-heading flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-forest-700" />
                  <span>Instructor Evaluation & Qualitative Note</span>
                </label>
                {feedbackSaved && (
                  <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Saved!
                  </span>
                )}
              </div>
              <Textarea
                rows={3}
                placeholder="Leave targeted praise, debugging pointers, and concepts for this student to practice..."
                value={feedbackNote}
                onChange={e => setFeedbackNote(e.target.value)}
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={handleSaveFeedback}>
                  Update Feedback
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
