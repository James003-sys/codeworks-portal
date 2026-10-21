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
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Student, GradeLevel } from '../../types';
import { Plus, GraduationCap, Building2, User, Mail, Phone, BookOpen, CheckCircle } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const { students, schools, tutors, addStudent, updateStudent, updateStudentStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    schoolId: schools[0]?.id || '',
    grade: 'Grade 9' as GradeLevel,
    currentCourse: 'Web Development Fundamentals',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    primaryTutorId: tutors[0]?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.currentCourse.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSchool = schoolFilter === 'all' || s.schoolId === schoolFilter;
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesStatus = statusFilter === 'all' || s.enrollmentStatus === statusFilter;

    return matchesSearch && matchesSchool && matchesGrade && matchesStatus;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      schoolId: schools[0]?.id || '',
      grade: 'Grade 9',
      currentCourse: 'Web Development Fundamentals',
      guardianName: '',
      guardianEmail: '',
      guardianPhone: '',
      primaryTutorId: tutors[0]?.id || '',
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Student full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid student email required';
    if (!formData.guardianName.trim()) errors.guardianName = 'Parent/Guardian name required';
    if (!formData.guardianEmail.trim() || !formData.guardianEmail.includes('@'))
      errors.guardianEmail = 'Valid guardian email required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const school = schools.find(sc => sc.id === formData.schoolId);
    const tutor = tutors.find(t => t.id === formData.primaryTutorId);

    addStudent({
      userId: `user-stu-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      schoolId: formData.schoolId,
      schoolName: school ? school.name : 'Partner School',
      grade: formData.grade,
      guardianName: formData.guardianName,
      guardianEmail: formData.guardianEmail,
      guardianPhone: formData.guardianPhone || '+1 (555) 000-0000',
      enrollmentStatus: 'active',
      currentCourse: formData.currentCourse,
      primaryTutorId: tutor?.id,
      primaryTutorName: tutor?.name,
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Roster & Enrollments"
        description="Monitor student progress, attendance rates, grade levels, and assigned cohort instructors."
        actions={
          <Button onClick={handleOpenAddModal} leftIcon={<Plus className="h-4 w-4" />}>
            Enroll New Student
          </Button>
        }
      />

      <FilterBar
        isFiltered={
          searchQuery !== '' ||
          schoolFilter !== 'all' ||
          gradeFilter !== 'all' ||
          statusFilter !== 'all'
        }
        onReset={() => {
          setSearchQuery('');
          setSchoolFilter('all');
          setGradeFilter('all');
          setStatusFilter('all');
          setCurrentPage(1);
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={val => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search student name, email, course..."
        />

        <div className="w-44">
          <Select
            value={schoolFilter}
            onChange={e => {
              setSchoolFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Schools</option>
            {schools.map(sc => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
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
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </Select>
        </div>

        <div className="w-36">
          <Select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="graduated">Graduated</option>
            <option value="withdrawn">Withdrawn</option>
          </Select>
        </div>
      </FilterBar>

      <DataTable
        data={paginatedStudents}
        keyExtractor={s => s.id}
        onRowClick={s => {
          setSelectedStudent(s);
          setIsDetailModalOpen(true);
        }}
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
            header: 'Enrolled Course',
            cell: s => (
              <span className="text-xs font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                {s.currentCourse}
              </span>
            ),
          },
          {
            header: 'Progress & Attendance',
            cell: s => (
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-content-muted">Progress:</span>
                  <span className="font-bold text-content-heading">{s.overallProgress}%</span>
                </div>
                <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-forest-600 h-full rounded-full"
                    style={{ width: `${s.overallProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-content-muted">Att: {s.attendanceRate}%</p>
              </div>
            ),
          },
          {
            header: 'Status',
            cell: s => <StatusBadge status={s.enrollmentStatus} size="sm" />,
          },
          {
            header: 'Actions',
            className: 'text-right',
            cell: s => (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedStudent(s);
                  setIsDetailModalOpen(true);
                }}
              >
                Profile
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

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <Dialog
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedStudent.name}
          description={`Student ID #${selectedStudent.id} • Enrolled ${selectedStudent.enrollmentDate}`}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs text-content-muted">Status:</span>
                <select
                  value={selectedStudent.enrollmentStatus}
                  onChange={e => {
                    const newStatus = e.target.value as Student['enrollmentStatus'];
                    updateStudentStatus(selectedStudent.id, newStatus);
                    setSelectedStudent({ ...selectedStudent, enrollmentStatus: newStatus });
                  }}
                  className="text-xs rounded border border-surface-border bg-white px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="graduated">Graduated</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-subtle border border-surface-border">
              <Avatar name={selectedStudent.name} src={selectedStudent.avatarUrl} size="xl" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-content-heading">{selectedStudent.name}</h3>
                  <StatusBadge status={selectedStudent.enrollmentStatus} size="sm" />
                </div>
                <p className="text-xs text-content-muted">
                  {selectedStudent.schoolName} • {selectedStudent.grade}
                </p>
                <p className="text-xs font-medium text-forest-800">
                  Course: {selectedStudent.currentCourse}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-surface-border p-3 text-center bg-white">
                <span className="text-xs text-content-muted">Overall Progress</span>
                <p className="text-xl font-bold text-forest-800 mt-1">{selectedStudent.overallProgress}%</p>
              </div>
              <div className="rounded-lg border border-surface-border p-3 text-center bg-white">
                <span className="text-xs text-content-muted">Attendance Rate</span>
                <p className="text-xl font-bold text-emerald-800 mt-1">{selectedStudent.attendanceRate}%</p>
              </div>
              <div className="rounded-lg border border-surface-border p-3 text-center bg-white">
                <span className="text-xs text-content-muted">Completed Projects</span>
                <p className="text-xl font-bold text-content-heading mt-1">{selectedStudent.completedProjectsCount}</p>
              </div>
            </div>

            <div className="rounded-lg border border-surface-border bg-surface-subtle p-3.5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                Guardian / Emergency Contact
              </span>
              <div className="text-xs space-y-1">
                <p className="font-semibold text-content-heading">{selectedStudent.guardianName}</p>
                <p className="text-content-muted flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {selectedStudent.guardianEmail}
                </p>
                <p className="text-content-muted flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {selectedStudent.guardianPhone}
                </p>
              </div>
            </div>

            {selectedStudent.primaryTutorName && (
              <div className="flex items-center justify-between p-3 rounded-lg border border-surface-border bg-white text-xs">
                <span className="text-content-muted">Assigned Primary Tutor:</span>
                <span className="font-bold text-forest-800">{selectedStudent.primaryTutorName}</span>
              </div>
            )}
          </div>
        </Dialog>
      )}

      {/* Enroll Student Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Student"
        description="Register a student into partner school cohort and assign curriculum."
        size="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveStudent}>
              Complete Enrollment
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Student Full Name" required error={formErrors.name}>
              <Input
                placeholder="e.g. Kevin Ochieng"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </FormField>

            <FormField label="Student School Email" required error={formErrors.email}>
              <Input
                type="email"
                placeholder="kevin.ochieng@nakuruhigh.ac.ke"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Partner School">
              <Select
                value={formData.schoolId}
                onChange={e => setFormData({ ...formData, schoolId: e.target.value })}
              >
                {schools.map(sc => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Grade Level (CBC)">
              <Select
                value={formData.grade}
                onChange={e => setFormData({ ...formData, grade: e.target.value as GradeLevel })}
              >
                <option value="Grade 7">Grade 7 (Junior Secondary)</option>
                <option value="Grade 8">Grade 8 (Junior Secondary)</option>
                <option value="Grade 9">Grade 9 (Junior Secondary)</option>
                <option value="Grade 10">Grade 10 (Senior Secondary)</option>
                <option value="Grade 11">Grade 11 (Senior Secondary)</option>
                <option value="Grade 12">Grade 12 (Senior Secondary)</option>
              </Select>
            </FormField>

            <FormField label="Initial Web Course">
              <Select
                value={formData.currentCourse}
                onChange={e => setFormData({ ...formData, currentCourse: e.target.value })}
              >
                <option value="Web Development Fundamentals">Web Development Fundamentals</option>
                <option value="Interactive Web Scripting">Interactive Web Scripting</option>
                <option value="Frontend UI Systems">Frontend UI Systems</option>
                <option value="Fullstack Web Applications">Fullstack Web Applications</option>
              </Select>
            </FormField>
          </div>

          <div className="border-t border-surface-border pt-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-content-heading">
              Parent or Guardian Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Guardian Name" required error={formErrors.guardianName}>
                <Input
                  placeholder="e.g. Samuel Ochieng"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                />
              </FormField>

              <FormField label="Guardian Email" required error={formErrors.guardianEmail}>
                <Input
                  type="email"
                  placeholder="samuel.ochieng@gmail.com"
                  value={formData.guardianEmail}
                  onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })}
                />
              </FormField>

              <FormField label="Guardian Phone">
                <Input
                  placeholder="+254 722 883 140"
                  value={formData.guardianPhone}
                  onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                />
              </FormField>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
