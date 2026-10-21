import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FilterBar } from '../../components/ui/FilterBar';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { Select } from '../../components/ui/Select';
import { LessonSchedule } from '../../types';
import { formatDate } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Building2, FileEdit, CheckCircle } from 'lucide-react';

export const TutorSchedule: React.FC = () => {
  const { currentUser, tutors, schedules } = useApp();
  const navigate = useNavigate();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const [schoolFilter, setSchoolFilter] = useState('all');
  const [selectedLesson, setSelectedLesson] = useState<LessonSchedule | null>(null);

  const mySchedules = schedules.filter(s => s.tutorId === currentTutor.id);

  const filtered = mySchedules.filter(s => {
    return schoolFilter === 'all' || s.schoolId === schoolFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Teaching Schedule"
        description="Daily and weekly classroom session times, lab assignments, and post-lesson reporting status."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/tutor/reports')}
            leftIcon={<FileEdit className="h-4 w-4" />}
          >
            File Lesson Report
          </Button>
        }
      />

      <FilterBar
        isFiltered={schoolFilter !== 'all'}
        onReset={() => setSchoolFilter('all')}
      >
        <div className="w-52">
          <Select value={schoolFilter} onChange={e => setSchoolFilter(e.target.value)}>
            <option value="all">All Assigned Schools</option>
            {currentTutor.assignedSchools.map(as => (
              <option key={as.schoolId} value={as.schoolId}>
                {as.schoolName}
              </option>
            ))}
          </Select>
        </div>
      </FilterBar>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lesson => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className="rounded-lg border border-surface-border bg-white p-4 shadow-subtle hover:border-forest-300 hover:shadow-card cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                  {lesson.grade}
                </span>
                <StatusBadge status={lesson.status} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-content-heading line-clamp-1">{lesson.title}</h3>
                <p className="text-xs text-content-muted mt-0.5">{lesson.curriculumTopic}</p>
              </div>

              <div className="rounded bg-surface-subtle p-2.5 text-xs text-content-muted space-y-1">
                <p className="font-semibold text-content-heading flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-forest-700" />
                  {lesson.schoolName}
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(lesson.date)} • {lesson.startTime} - {lesson.endTime}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {lesson.location}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
              <span className="text-content-muted">
                {lesson.hasReportSubmitted ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Report Filed
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold">Report Pending</span>
                )}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedLesson(lesson);
                }}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson details modal */}
      {selectedLesson && (
        <Dialog
          isOpen={Boolean(selectedLesson)}
          onClose={() => setSelectedLesson(null)}
          title={selectedLesson.title}
          description={`${selectedLesson.schoolName} • ${selectedLesson.grade} • ${selectedLesson.location}`}
          size="md"
          footer={
            <div className="flex items-center justify-between w-full">
              {!selectedLesson.hasReportSubmitted ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedLesson(null);
                    navigate('/tutor/reports');
                  }}
                  leftIcon={<FileEdit className="h-4 w-4" />}
                >
                  File Lesson Report Now
                </Button>
              ) : (
                <span className="text-xs text-emerald-800 font-medium">Report already completed</span>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedLesson(null)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-surface-border bg-surface-subtle space-y-1">
              <span className="font-bold uppercase tracking-wider text-content-muted">Timing & Room</span>
              <p className="text-sm font-bold text-content-heading">
                {formatDate(selectedLesson.date)} from {selectedLesson.startTime} to {selectedLesson.endTime}
              </p>
              <p className="text-content-muted">{selectedLesson.location}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted">Topic</span>
              <p className="text-sm text-content-body font-medium mt-0.5">{selectedLesson.curriculumTopic}</p>
            </div>

            {selectedLesson.notes && (
              <div>
                <span className="font-bold uppercase tracking-wider text-content-muted">Lab Notes</span>
                <p className="text-xs text-content-muted mt-0.5">{selectedLesson.notes}</p>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};
