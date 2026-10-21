import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  Building2,
  Calendar,
  FileEdit,
  ArrowRight,
  Clock,
  Code2,
  AlertCircle,
  Star,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export const TutorOverview: React.FC = () => {
  const { currentUser, tutors, schools, students, schedules, submissions } = useApp();
  const navigate = useNavigate();

  // Find active tutor record
  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const assignedSchoolIds = currentTutor.assignedSchools.map(as => as.schoolId);

  // Students belonging to assigned schools
  const myStudents = students.filter(s => assignedSchoolIds.includes(s.schoolId));
  const mySchedules = schedules.filter(s => s.tutorId === currentTutor.id);

  // Upcoming lessons for this tutor
  const upcomingLessons = mySchedules.filter(s => s.status === 'scheduled').slice(0, 4);

  // Pending lesson reports
  const pendingReports = mySchedules.filter(s => s.status === 'completed' && !s.hasReportSubmitted);

  // Pending code reviews
  const pendingReviews = submissions.filter(s => s.status === 'submitted');

  // Student counts per grade
  const gradeDistribution = [
    { grade: 'Grade 8', count: myStudents.filter(s => s.grade === 'Grade 8').length },
    { grade: 'Grade 9', count: myStudents.filter(s => s.grade === 'Grade 9').length },
    { grade: 'Grade 10', count: myStudents.filter(s => s.grade === 'Grade 10').length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${currentTutor.name}`}
        description={`Lead Tutor Workspace • Assigned to ${currentTutor.assignedSchools.map(as => as.schoolName).join(' & ')}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/tutor/schedule')}
              leftIcon={<Calendar className="h-4 w-4" />}
            >
              My Timetable
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/tutor/reports')}
              leftIcon={<FileEdit className="h-4 w-4" />}
            >
              File Lesson Report
            </Button>
          </div>
        }
      />

      {/* Action alerts */}
      {(pendingReports.length > 0 || pendingReviews.length > 0) && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Tasks Pending Instructor Action
              </h4>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-amber-800">
                {pendingReports.length > 0 && (
                  <button
                    onClick={() => navigate('/tutor/reports')}
                    className="font-semibold underline hover:text-amber-950"
                  >
                    {pendingReports.length} completed session{pendingReports.length > 1 ? 's' : ''} awaiting lesson report submission
                  </button>
                )}
                {pendingReviews.length > 0 && (
                  <button
                    onClick={() => navigate('/tutor/projects-reviews')}
                    className="font-semibold underline hover:text-amber-950"
                  >
                    {pendingReviews.length} student project{pendingReviews.length > 1 ? 's' : ''} awaiting code rubric review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutor Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Students"
          value={myStudents.length}
          description="Across your active cohort schools"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Partner Schools"
          value={currentTutor.assignedSchools.length}
          description={currentTutor.assignedSchools.map(as => as.schoolName).join(', ')}
          icon={<Building2 className="h-4 w-4" />}
        />
        <StatCard
          title="Delivered Lessons"
          value={currentTutor.totalLessonsDelivered}
          description="100% attendance documentation"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Student & School Rating"
          value={`${currentTutor.rating.toFixed(1)} / 5.0`}
          description="Based on authorized feedback"
          icon={<Star className="h-4 w-4 text-amber-600" />}
        />
      </div>

      {/* Grid: Grade Distribution Chart & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade distribution */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Cohort Grade Distribution"
            subtitle="Student count per assigned grade level"
            summaryText="Grade 9 is your largest cohort at Nakuru High School."
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
                <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#647067' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#647067' }} />
                <Tooltip />
                <Bar dataKey="count" name="Enrolled Students" fill="#174C3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Upcoming Teaching Sessions */}
        <div className="lg:col-span-2 rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-content-heading">My Upcoming Teaching Sessions</h3>
                <p className="text-xs text-content-muted">Prepare materials for your upcoming classes</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/tutor/schedule')}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                View Full Timetable
              </Button>
            </div>

            <DataTable
              data={upcomingLessons}
              keyExtractor={l => l.id}
              columns={[
                {
                  header: 'Lesson & Curriculum Topic',
                  cell: l => (
                    <div>
                      <p className="font-semibold text-content-heading text-xs">{l.title}</p>
                      <p className="text-[11px] text-content-muted">{l.curriculumTopic}</p>
                    </div>
                  ),
                },
                {
                  header: 'School & Location',
                  cell: l => (
                    <div className="text-xs">
                      <p className="font-medium text-content-heading">{l.schoolName}</p>
                      <p className="text-content-muted">{l.location} ({l.grade})</p>
                    </div>
                  ),
                },
                {
                  header: 'Time',
                  cell: l => (
                    <div className="text-xs text-content-muted flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(l.date)} • {l.startTime}</span>
                    </div>
                  ),
                },
                {
                  header: 'Status',
                  cell: l => <StatusBadge status={l.status} size="sm" />,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Recent Student Submissions for Review */}
      <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-content-heading">Recent Student Code Submissions</h3>
            <p className="text-xs text-content-muted">Submissions from your assigned students</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/tutor/projects-reviews')}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Review Code Center
          </Button>
        </div>

        <DataTable
          data={submissions.slice(0, 4)}
          keyExtractor={s => s.id}
          columns={[
            {
              header: 'Student & Project',
              cell: s => (
                <div>
                  <p className="font-semibold text-content-heading text-xs">{s.studentName}</p>
                  <p className="text-[11px] text-content-muted">{s.projectTitle}</p>
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
              header: 'Submitted At',
              cell: s => <span className="text-xs text-content-muted">{formatDate(s.submissionDate.split('T')[0])}</span>,
            },
            {
              header: 'Review Status',
              cell: s => <StatusBadge status={s.status} size="sm" />,
            },
            {
              header: 'Score',
              cell: s => (
                <span className="text-xs font-bold text-forest-800">
                  {s.review ? `${s.review.totalScore} / ${s.review.maxScore}` : 'Pending'}
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
                  onClick={() => navigate('/tutor/projects-reviews')}
                >
                  {s.status === 'reviewed' ? 'View Review' : 'Grade Code'}
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
