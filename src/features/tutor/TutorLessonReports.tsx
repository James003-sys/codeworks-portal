import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { LessonReport, AttendanceRecord, StudentLessonPerformance } from '../../types';
import { formatDate } from '../../lib/utils';
import { Plus, CheckCircle, FileText, Check } from 'lucide-react';

export const TutorLessonReports: React.FC = () => {
  const { currentUser, tutors, schedules, students, reports, submitLessonReport } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const myReports = reports.filter(r => r.tutorId === currentTutor.id);
  const mySchedules = schedules.filter(s => s.tutorId === currentTutor.id);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<LessonReport | null>(null);

  // Form State
  const [selectedLessonId, setSelectedLessonId] = useState(mySchedules[0]?.id || '');
  const [lessonTopic, setLessonTopic] = useState('');
  const [learningObjectives, setLearningObjectives] = useState(
    'Construct responsive navigation with CSS Flexbox\nImplement semantic HTML5 landmark tags\nAttach JavaScript click listeners to interactive cards'
  );
  const [topicsCovered, setTopicsCovered] = useState('');
  const [generalNotes, setGeneralNotes] = useState('Excellent overall engagement.');
  const [nextSteps, setNextSteps] = useState('Introduce CSS Grid layout systems and auto-fit columns next session.');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successToast, setSuccessToast] = useState(false);

  // Student specific evaluation state for the form
  const activeLesson = mySchedules.find(s => s.id === selectedLessonId);
  const cohortStudents = students.filter(s => s.schoolId === activeLesson?.schoolId);

  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [understandingState, setUnderstandingState] = useState<Record<string, number>>({});
  const [engagementState, setEngagementState] = useState<Record<string, number>>({});
  const [strengthsState, setStrengthsState] = useState<Record<string, string>>({});
  const [improvementState, setImprovementState] = useState<Record<string, string>>({});

  const handleOpenCreateModal = () => {
    const targetLesson = mySchedules.find(s => !s.hasReportSubmitted) || mySchedules[0];
    if (targetLesson) {
      setSelectedLessonId(targetLesson.id);
      setLessonTopic(targetLesson.curriculumTopic);
    }
    setTopicsCovered('Guided students through hands-on coding exercises with live debugging.');
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!lessonTopic.trim()) errors.lessonTopic = 'Lesson topic is required';
    if (!topicsCovered.trim()) errors.topicsCovered = 'Topics covered description is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const lesson = mySchedules.find(s => s.id === selectedLessonId);
    if (!lesson) return;

    const objectivesList = learningObjectives
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean);

    const attendanceRecords: AttendanceRecord[] = cohortStudents.map(st => ({
      studentId: st.id,
      studentName: st.name,
      status: attendanceState[st.id] || 'present',
    }));

    const performances: StudentLessonPerformance[] = cohortStudents.map(st => ({
      studentId: st.id,
      studentName: st.name,
      understandingLevel: (understandingState[st.id] || 4) as 1 | 2 | 3 | 4 | 5,
      engagementLevel: (engagementState[st.id] || 5) as 1 | 2 | 3 | 4 | 5,
      strengths: strengthsState[st.id] || 'Completed core lab challenge cleanly.',
      improvementAreas: improvementState[st.id] || 'Refine edge case checks.',
    }));

    submitLessonReport({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      schoolId: lesson.schoolId,
      schoolName: lesson.schoolName,
      tutorId: currentTutor.id,
      tutorName: currentTutor.name,
      grade: lesson.grade,
      date: lesson.date,
      status: 'submitted',
      lessonTopic,
      learningObjectives: objectivesList,
      topicsCovered,
      attendance: attendanceRecords,
      studentPerformances: performances,
      generalNotes,
      nextSteps,
    });

    setIsCreateModalOpen(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lesson Reports & Pedagogical Documentation"
        description="Submit structured lesson summaries covering learning objectives, individual student attendance, and mastery ratings."
        actions={
          <Button onClick={handleOpenCreateModal} leftIcon={<Plus className="h-4 w-4" />}>
            File New Lesson Report
          </Button>
        }
      />

      {successToast && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Lesson report filed successfully! Admin has been notified for compliance review.</span>
        </div>
      )}

      <DataTable
        data={myReports}
        keyExtractor={r => r.id}
        onRowClick={r => setSelectedReport(r)}
        columns={[
          {
            header: 'Lesson & Topic',
            cell: r => (
              <div>
                <p className="font-semibold text-content-heading">{r.lessonTitle}</p>
                <p className="text-xs text-content-muted">{r.lessonTopic}</p>
              </div>
            ),
          },
          {
            header: 'School & Grade',
            cell: r => (
              <div className="text-xs">
                <p className="font-medium text-content-heading">{r.schoolName}</p>
                <p className="text-content-muted">{r.grade}</p>
              </div>
            ),
          },
          {
            header: 'Session Date',
            cell: r => <span className="text-xs text-content-muted">{formatDate(r.date)}</span>,
          },
          {
            header: 'Attendance',
            cell: r => (
              <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                {r.attendance.filter(a => a.status === 'present').length} / {r.attendance.length} Present
              </span>
            ),
          },
          {
            header: 'Review Status',
            cell: r => <StatusBadge status={r.status} size="sm" />,
          },
          {
            header: 'Action',
            className: 'text-right',
            cell: r => (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedReport(r);
                }}
              >
                Inspect
              </Button>
            ),
          },
        ]}
      />

      {/* Inspect Report Modal */}
      {selectedReport && (
        <Dialog
          isOpen={Boolean(selectedReport)}
          onClose={() => setSelectedReport(null)}
          title={`Lesson Report: ${selectedReport.lessonTitle}`}
          description={`${selectedReport.schoolName} (${selectedReport.grade}) • Delivered: ${formatDate(selectedReport.date)}`}
          size="lg"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedReport(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-surface-subtle rounded-lg border border-surface-border">
              <span className="font-bold uppercase tracking-wider text-content-muted">Topic</span>
              <p className="text-sm font-semibold text-content-heading mt-0.5">{selectedReport.lessonTopic}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted">Learning Objectives</span>
              <ul className="mt-1 space-y-1">
                {selectedReport.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-content-body">
                    <CheckCircle className="h-3 w-3 text-forest-700" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted">Topics Covered</span>
              <p className="mt-1 p-2.5 rounded bg-white border border-surface-border text-content-body leading-relaxed">
                {selectedReport.topicsCovered}
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-content-muted mb-1 block">
                Student Formative Feedback
              </span>
              <div className="rounded border border-surface-border overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-subtle border-b border-surface-border text-[11px] uppercase">
                    <tr>
                      <th className="p-2">Student</th>
                      <th className="p-2">Mastery</th>
                      <th className="p-2">Engagement</th>
                      <th className="p-2">Strengths</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {selectedReport.studentPerformances.map((sp, i) => (
                      <tr key={i}>
                        <td className="p-2 font-semibold text-content-heading">{sp.studentName}</td>
                        <td className="p-2 font-bold text-forest-800">{sp.understandingLevel} / 5</td>
                        <td className="p-2 font-bold text-forest-800">{sp.engagementLevel} / 5</td>
                        <td className="p-2 text-content-muted">{sp.strengths}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* File Lesson Report Modal */}
      <Dialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="File Post-Lesson Report"
        description="Record curriculum objectives, attendance, and student mastery for compliance."
        size="xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Submit Lesson Report
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Delivered Lesson Session" required>
              <Select
                value={selectedLessonId}
                onChange={e => {
                  setSelectedLessonId(e.target.value);
                  const l = mySchedules.find(s => s.id === e.target.value);
                  if (l) setLessonTopic(l.curriculumTopic);
                }}
              >
                {mySchedules.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.schoolName} - {formatDate(s.date)})
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Curriculum Topic Covered" required error={formErrors.lessonTopic}>
              <Input
                value={lessonTopic}
                onChange={e => setLessonTopic(e.target.value)}
                placeholder="e.g. Iteration & While Loops"
              />
            </FormField>
          </div>

          <FormField
            label="Learning Objectives (one per line)"
            description="Specific, observable competencies students practiced"
          >
            <Textarea
              rows={3}
              value={learningObjectives}
              onChange={e => setLearningObjectives(e.target.value)}
            />
          </FormField>

          <FormField label="Detailed Session Summary & Topics Covered" required error={formErrors.topicsCovered}>
            <Textarea
              rows={3}
              value={topicsCovered}
              onChange={e => setTopicsCovered(e.target.value)}
              placeholder="Explain how concepts were introduced, live coding demos, and student lab activities..."
            />
          </FormField>

          {/* Student attendance & mastery table */}
          {cohortStudents.length > 0 && (
            <div className="border-t border-surface-border pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-heading mb-2">
                Student Attendance & Formative Ratings ({cohortStudents.length} Students)
              </h4>
              <div className="rounded-lg border border-surface-border overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-surface-subtle border-b border-surface-border text-[11px] font-semibold uppercase text-content-muted">
                    <tr>
                      <th className="p-2.5">Student</th>
                      <th className="p-2.5">Attendance</th>
                      <th className="p-2.5">Understanding (1-5)</th>
                      <th className="p-2.5">Engagement (1-5)</th>
                      <th className="p-2.5">Observed Strengths</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {cohortStudents.map(student => (
                      <tr key={student.id}>
                        <td className="p-2.5 font-semibold text-content-heading">{student.name}</td>
                        <td className="p-2.5">
                          <select
                            value={attendanceState[student.id] || 'present'}
                            onChange={e =>
                              setAttendanceState({
                                ...attendanceState,
                                [student.id]: e.target.value as 'present' | 'absent' | 'late',
                              })
                            }
                            className="text-xs rounded border border-surface-border bg-white px-2 py-1"
                          >
                            <option value="present">Present</option>
                            <option value="late">Late</option>
                            <option value="absent">Absent</option>
                          </select>
                        </td>
                        <td className="p-2.5">
                          <select
                            value={understandingState[student.id] || 4}
                            onChange={e =>
                              setUnderstandingState({
                                ...understandingState,
                                [student.id]: Number(e.target.value),
                              })
                            }
                            className="text-xs rounded border border-surface-border bg-white px-2 py-1"
                          >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Proficient</option>
                            <option value={3}>3 - Developing</option>
                            <option value={2}>2 - Struggling</option>
                            <option value={1}>1 - Needs Remediation</option>
                          </select>
                        </td>
                        <td className="p-2.5">
                          <select
                            value={engagementState[student.id] || 5}
                            onChange={e =>
                              setEngagementState({
                                ...engagementState,
                                [student.id]: Number(e.target.value),
                              })
                            }
                            className="text-xs rounded border border-surface-border bg-white px-2 py-1"
                          >
                            <option value={5}>5 - High</option>
                            <option value={4}>4 - Active</option>
                            <option value={3}>3 - Moderate</option>
                            <option value={2}>2 - Passive</option>
                          </select>
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            placeholder="e.g. Grasped syntax quickly"
                            value={strengthsState[student.id] || ''}
                            onChange={e =>
                              setStrengthsState({ ...strengthsState, [student.id]: e.target.value })
                            }
                            className="w-full text-xs rounded border border-surface-border px-2 py-1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-surface-border pt-3">
            <FormField label="General Classroom Notes">
              <Input
                value={generalNotes}
                onChange={e => setGeneralNotes(e.target.value)}
              />
            </FormField>

            <FormField label="Recommended Next Steps">
              <Input
                value={nextSteps}
                onChange={e => setNextSteps(e.target.value)}
              />
            </FormField>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
