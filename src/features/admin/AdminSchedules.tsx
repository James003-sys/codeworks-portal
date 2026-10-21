import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { LessonSchedule, GradeLevel, LessonStatus } from '../../types';
import { formatDate } from '../../lib/utils';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  Building2,
  AlertTriangle,
  CheckCircle,
  FileText,
  Trash2,
} from 'lucide-react';

export const AdminSchedules: React.FC = () => {
  const { schedules, schools, tutors, addSchedule, updateSchedule, deleteSchedule } = useApp();

  const [schoolFilter, setSchoolFilter] = useState('all');
  const [tutorFilter, setTutorFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'timetable'>('timetable');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonSchedule | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    schoolId: schools[0]?.id || '',
    tutorId: tutors[0]?.id || '',
    grade: 'Grade 9' as GradeLevel,
    date: '2026-10-24',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Lab 2 (Lanet Block)',
    curriculumTopic: 'CSS Flexbox Navigation & Responsive Grids',
    expectedStudentCount: 18,
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredSchedules = schedules.filter(s => {
    const matchesSchool = schoolFilter === 'all' || s.schoolId === schoolFilter;
    const matchesTutor = tutorFilter === 'all' || s.tutorId === tutorFilter;
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSchool && matchesTutor && matchesGrade && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      schoolId: schools[0]?.id || '',
      tutorId: tutors[0]?.id || '',
      grade: 'Grade 9',
      date: '2026-10-24',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Computer Lab 2',
      curriculumTopic: 'JavaScript DOM Events & Form Interactivity',
      expectedStudentCount: 18,
      notes: '',
    });
    setFormErrors({});
    setConflictError(null);
    setIsAddModalOpen(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = 'Lesson title is required';
    if (!formData.date.trim()) errors.date = 'Date is required';
    if (!formData.curriculumTopic.trim()) errors.curriculumTopic = 'Topic is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const school = schools.find(s => s.id === formData.schoolId);
    const tutor = tutors.find(t => t.id === formData.tutorId);

    const result = addSchedule({
      title: formData.title,
      schoolId: formData.schoolId,
      schoolName: school ? school.name : 'Partner School',
      tutorId: formData.tutorId,
      tutorName: tutor ? tutor.name : 'Lead Tutor',
      grade: formData.grade,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      status: 'scheduled',
      curriculumTopic: formData.curriculumTopic,
      expectedStudentCount: Number(formData.expectedStudentCount) || 16,
      notes: formData.notes,
    });

    if (!result.success) {
      setConflictError(result.conflictMessage || 'Scheduling conflict detected.');
      return;
    }

    setIsAddModalOpen(false);
  };

  const handleUpdateStatus = (status: LessonStatus) => {
    if (selectedLesson) {
      updateSchedule(selectedLesson.id, { status });
      setSelectedLesson({ ...selectedLesson, status });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum Schedules & Timetable"
        description="Cross-school master calendar, room allocations, instructor conflict resolution, and lesson tracking."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-surface-border bg-white p-0.5">
              <button
                onClick={() => setViewMode('timetable')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  viewMode === 'timetable'
                    ? 'bg-forest-700 text-white'
                    : 'text-content-body hover:text-forest-800'
                }`}
              >
                Timetable Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-forest-700 text-white'
                    : 'text-content-body hover:text-forest-800'
                }`}
              >
                Table View
              </button>
            </div>
            <Button onClick={handleOpenAddModal} leftIcon={<Plus className="h-4 w-4" />}>
              Schedule Lesson
            </Button>
          </div>
        }
      />

      <FilterBar
        isFiltered={schoolFilter !== 'all' || tutorFilter !== 'all' || gradeFilter !== 'all' || statusFilter !== 'all'}
        onReset={() => {
          setSchoolFilter('all');
          setTutorFilter('all');
          setGradeFilter('all');
          setStatusFilter('all');
        }}
      >
        <div className="w-44">
          <Select value={schoolFilter} onChange={e => setSchoolFilter(e.target.value)}>
            <option value="all">All Schools</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Select>
        </div>

        <div className="w-44">
          <Select value={tutorFilter} onChange={e => setTutorFilter(e.target.value)}>
            <option value="all">All Tutors</option>
            {tutors.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Select>
        </div>

        <div className="w-32">
          <Select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
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
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>
      </FilterBar>

      {/* Timetable View */}
      {viewMode === 'timetable' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedules.map(lesson => (
            <div
              key={lesson.id}
              onClick={() => {
                setSelectedLesson(lesson);
                setIsDetailModalOpen(true);
              }}
              className="rounded-lg border border-surface-border bg-white p-4 shadow-subtle hover:border-forest-300 hover:shadow-card cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                    {lesson.grade}
                  </span>
                  <StatusBadge status={lesson.status} size="sm" />
                </div>

                <h3 className="font-bold text-sm text-content-heading line-clamp-1">{lesson.title}</h3>
                <p className="text-xs text-content-muted">{lesson.curriculumTopic}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border space-y-1.5 text-xs text-content-muted">
                <div className="flex items-center gap-1.5 text-content-heading font-medium">
                  <Building2 className="h-3.5 w-3.5 text-forest-700" />
                  <span className="truncate">{lesson.schoolName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatDate(lesson.date)} • {lesson.startTime} - {lesson.endTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="font-medium text-forest-800">Tutor: {lesson.tutorName}</span>
                  <span className="text-content-subtle">{lesson.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredSchedules}
          keyExtractor={s => s.id}
          onRowClick={s => {
            setSelectedLesson(s);
            setIsDetailModalOpen(true);
          }}
          columns={[
            {
              header: 'Lesson & Topic',
              cell: s => (
                <div>
                  <p className="font-semibold text-content-heading">{s.title}</p>
                  <p className="text-xs text-content-muted">{s.curriculumTopic}</p>
                </div>
              ),
            },
            {
              header: 'School & Grade',
              cell: s => (
                <div className="text-xs">
                  <p className="font-medium text-content-heading">{s.schoolName}</p>
                  <p className="text-content-muted">{s.grade} • {s.location}</p>
                </div>
              ),
            },
            {
              header: 'Tutor',
              cell: s => <span className="text-xs font-medium text-content-body">{s.tutorName}</span>,
            },
            {
              header: 'Time',
              cell: s => (
                <div className="text-xs text-content-muted">
                  <p>{formatDate(s.date)}</p>
                  <p>{s.startTime} - {s.endTime}</p>
                </div>
              ),
            },
            {
              header: 'Status',
              cell: s => <StatusBadge status={s.status} size="sm" />,
            },
            {
              header: 'Report',
              cell: s => (
                <span className="text-xs">
                  {s.hasReportSubmitted ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Filed
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">Pending</span>
                  )}
                </span>
              ),
            },
          ]}
        />
      )}

      {/* Lesson Details Modal */}
      {selectedLesson && (
        <Dialog
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedLesson.title}
          description={`${selectedLesson.schoolName} • ${selectedLesson.grade} • ${selectedLesson.location}`}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus('completed')}
                  disabled={selectedLesson.status === 'completed'}
                >
                  Mark Completed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleUpdateStatus('cancelled')}
                  disabled={selectedLesson.status === 'cancelled'}
                >
                  Cancel Session
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                  onClick={() => {
                    deleteSchedule(selectedLesson.id);
                    setIsDetailModalOpen(false);
                  }}
                  leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                >
                  Delete
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
              <div>
                <span className="text-xs text-content-muted">Session Date & Window</span>
                <p className="text-sm font-bold text-content-heading mt-0.5">
                  {formatDate(selectedLesson.date)} from {selectedLesson.startTime} to {selectedLesson.endTime}
                </p>
              </div>
              <StatusBadge status={selectedLesson.status} size="md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg border border-surface-border bg-white space-y-1">
                <span className="font-semibold text-content-muted uppercase tracking-wider">Assigned Instructor</span>
                <p className="text-sm font-bold text-forest-800">{selectedLesson.tutorName}</p>
                <p className="text-content-muted">Expected Students: {selectedLesson.expectedStudentCount}</p>
              </div>

              <div className="p-3 rounded-lg border border-surface-border bg-white space-y-1">
                <span className="font-semibold text-content-muted uppercase tracking-wider">Campus & Room</span>
                <p className="text-sm font-bold text-content-heading">{selectedLesson.schoolName}</p>
                <p className="text-content-muted">Location: {selectedLesson.location}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1">
                Curriculum Topic
              </h4>
              <p className="text-sm text-content-body bg-white p-3 rounded-md border border-surface-border font-medium">
                {selectedLesson.curriculumTopic}
              </p>
            </div>

            {selectedLesson.notes && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1">
                  Preparation Notes
                </h4>
                <p className="text-xs text-content-body bg-white p-3 rounded-md border border-surface-border">
                  {selectedLesson.notes}
                </p>
              </div>
            )}
          </div>
        </Dialog>
      )}

      {/* Schedule Lesson Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Coding Lesson"
        description="Book classroom session with automated instructor conflict validation."
        size="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveLesson}>
              Confirm Session
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveLesson} className="space-y-4">
          {conflictError && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-red-200 bg-red-50 text-red-800 text-xs">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <span className="font-bold">Conflict Warning: </span>
                {conflictError}
              </div>
            </div>
          )}

          <FormField label="Session Title" required error={formErrors.title}>
            <Input
              placeholder="e.g. Intro to Data Structures & Dictionaries"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="School Campus">
              <Select
                value={formData.schoolId}
                onChange={e => setFormData({ ...formData, schoolId: e.target.value })}
              >
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="Assigned Tutor">
              <Select
                value={formData.tutorId}
                onChange={e => setFormData({ ...formData, tutorId: e.target.value })}
              >
                {tutors.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="Grade Level">
              <Select
                value={formData.grade}
                onChange={e => setFormData({ ...formData, grade: e.target.value as GradeLevel })}
              >
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Date (YYYY-MM-DD)" required error={formErrors.date}>
              <Input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </FormField>

            <FormField label="Start Time">
              <Input
                type="time"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              />
            </FormField>

            <FormField label="End Time">
              <Input
                type="time"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Classroom / Lab Location">
              <Input
                placeholder="e.g. Computer Lab 2B"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
            </FormField>

            <FormField label="Curriculum Topic" required error={formErrors.curriculumTopic}>
              <Input
                placeholder="e.g. Recursive Algorithms"
                value={formData.curriculumTopic}
                onChange={e => setFormData({ ...formData, curriculumTopic: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Preparation Notes for School">
            <Input
              placeholder="e.g. Ensure browser permits GitHub and Replit access."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </FormField>
        </form>
      </Dialog>
    </div>
  );
};
