import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { LessonSchedule } from '../../types';
import { formatDate } from '../../lib/utils';
import { Calendar, Clock, MapPin, Building2, User, BookOpen } from 'lucide-react';

export const StudentSchedule: React.FC = () => {
  const { currentUser, students, schedules } = useApp();

  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  const [selectedLesson, setSelectedLesson] = useState<LessonSchedule | null>(null);

  // Filter lessons specifically for this student's school and grade
  const myLessons = schedules.filter(
    s => s.schoolId === currentStudent.schoolId && s.grade === currentStudent.grade
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Class Timetable"
        description={`Scheduled coding sessions for ${currentStudent.grade} at ${currentStudent.schoolName}.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myLessons.map(lesson => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className="rounded-lg border border-surface-border bg-white p-5 shadow-subtle hover:border-forest-300 hover:shadow-card cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                  {lesson.grade}
                </span>
                <StatusBadge status={lesson.status} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-content-heading">{lesson.title}</h3>
                <p className="text-xs text-content-muted mt-0.5">{lesson.curriculumTopic}</p>
              </div>

              <div className="rounded bg-surface-subtle p-3 text-xs text-content-muted space-y-1.5 border border-surface-border">
                <p className="font-semibold text-content-heading flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-forest-700" />
                  <span>{formatDate(lesson.date)} • {lesson.startTime} - {lesson.endTime}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-forest-700" />
                  <span>{lesson.location}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-forest-700" />
                  <span>Instructor: {lesson.tutorName}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-border flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedLesson(lesson);
                }}
              >
                View Session Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedLesson && (
        <Dialog
          isOpen={Boolean(selectedLesson)}
          onClose={() => setSelectedLesson(null)}
          title={selectedLesson.title}
          description={`Classroom Session • ${selectedLesson.schoolName} (${selectedLesson.grade})`}
          size="md"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedLesson(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface-subtle rounded-lg border border-surface-border space-y-1">
              <span className="font-bold uppercase tracking-wider text-content-muted">Date & Time</span>
              <p className="text-sm font-bold text-content-heading">
                {formatDate(selectedLesson.date)} at {selectedLesson.startTime} - {selectedLesson.endTime}
              </p>
              <p className="text-content-muted">Room: {selectedLesson.location}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted">Curriculum Topic</span>
              <p className="text-sm text-content-body font-medium mt-0.5">{selectedLesson.curriculumTopic}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted">Lead Instructor</span>
              <p className="text-sm text-forest-800 font-semibold mt-0.5">{selectedLesson.tutorName}</p>
            </div>

            {selectedLesson.notes && (
              <div>
                <span className="font-bold uppercase tracking-wider text-content-muted">Lab Instructions & Preparation</span>
                <p className="text-xs text-content-body mt-0.5 p-2 rounded bg-surface-subtle border border-surface-border">
                  {selectedLesson.notes}
                </p>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};
