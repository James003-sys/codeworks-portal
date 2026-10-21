import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  BookOpen,
  Calendar,
  Code2,
  CheckCircle,
  Clock,
  ArrowRight,
  Award,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const StudentOverview: React.FC = () => {
  const { currentUser, students, schedules, submissions, performanceRecords } = useApp();
  const navigate = useNavigate();

  // Find active student record
  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  // Lessons relevant to student's school and grade
  const myLessons = schedules.filter(
    s => s.schoolId === currentStudent.schoolId && s.grade === currentStudent.grade
  );

  const upcomingLessons = myLessons.filter(s => s.status === 'scheduled');
  const completedLessons = myLessons.filter(s => s.status === 'completed');

  // Submissions for this student
  const mySubmissions = submissions.filter(
    s => s.studentId === currentStudent.id || s.studentName === currentStudent.name
  );

  const myPerformance = performanceRecords.find(p => p.studentId === currentStudent.id);

  // Student progress data points
  const progressData = [
    { module: 'M1: HTML5 Semantics', score: 92 },
    { module: 'M2: Modern CSS & Flexbox', score: 88 },
    { module: 'M3: Responsive Grids', score: 95 },
    { module: 'M4: JavaScript DOM', score: 90 },
    { module: 'M5: Interactive Project', score: 94 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Hello, ${currentStudent.name}!`}
        description={`Learning Dashboard • ${currentStudent.schoolName} (${currentStudent.grade}) • Enrolled in ${currentStudent.currentCourse}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student/schedule')}
              leftIcon={<Calendar className="h-4 w-4" />}
            >
              Class Schedule
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/projects')}
              leftIcon={<Code2 className="h-4 w-4" />}
            >
              My Projects & Code
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Course Progress"
          value={`${currentStudent.overallProgress}%`}
          description={currentStudent.currentCourse}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Attendance Rate"
          value={`${currentStudent.attendanceRate}%`}
          description="Lab & workshop presence"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Completed Projects"
          value={currentStudent.completedProjectsCount}
          description="Milestones submitted"
          icon={<Code2 className="h-4 w-4" />}
        />
        <StatCard
          title="Competency Rating"
          value={myPerformance ? `${myPerformance.overallScore}%` : '90%'}
          description="Evaluated by Lead Tutor"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      {/* Progress Chart & Recent Instructor Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Module Mastery Trajectory"
            subtitle="Scores across Web Development curriculum milestones"
            summaryText="You maintain strong scores above 90% across semantic layouts, flexbox, and DOM interaction submissions."
          >
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="studentProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#174C3C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#174C3C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
                <XAxis dataKey="module" tick={{ fontSize: 10, fill: '#647067' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#647067' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  name="Mastery Score"
                  stroke="#174C3C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#studentProgress)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Latest Tutor Feedback Card */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-forest-700" />
              <h3 className="text-sm font-bold text-content-heading">Recent Tutor Evaluation</h3>
            </div>

            {myPerformance ? (
              <div className="space-y-2 text-xs">
                <p className="text-content-body italic bg-surface-subtle p-3 rounded-md border border-surface-border leading-relaxed">
                  "{myPerformance.tutorFeedback}"
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-content-muted">
                  <p>Instructor: <span className="font-semibold text-content-heading">{currentStudent.primaryTutorName || 'Dennis Kiprono'}</span></p>
                  <p>Term: {myPerformance.period}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-content-muted">No evaluation recorded yet for this term.</p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-surface-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate('/student/code-reviews')}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              View Code Reviews
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Lessons and Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-content-heading">My Upcoming Coding Lessons</h3>
              <p className="text-xs text-content-muted">Classes at {currentStudent.schoolName}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student/schedule')}
            >
              Full Schedule
            </Button>
          </div>

          <DataTable
            data={upcomingLessons.slice(0, 3)}
            keyExtractor={l => l.id}
            columns={[
              {
                header: 'Topic',
                cell: l => (
                  <div>
                    <p className="font-semibold text-content-heading text-xs">{l.title}</p>
                    <p className="text-[11px] text-content-muted">{l.location} • Instructor: {l.tutorName}</p>
                  </div>
                ),
              },
              {
                header: 'Date & Time',
                cell: l => (
                  <div className="text-xs text-content-muted flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(l.date)} ({l.startTime})</span>
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

        {/* My Project Submissions */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-content-heading">My Project Submissions</h3>
              <p className="text-xs text-content-muted">Code submitted for evaluation</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/projects')}
            >
              Submit Project
            </Button>
          </div>

          <DataTable
            data={mySubmissions}
            keyExtractor={s => s.id}
            columns={[
              {
                header: 'Project Title',
                cell: s => (
                  <div>
                    <p className="font-semibold text-content-heading text-xs">{s.projectTitle}</p>
                    <p className="text-[11px] text-content-muted">Submitted: {formatDate(s.submissionDate.split('T')[0])}</p>
                  </div>
                ),
              },
              {
                header: 'Status',
                cell: s => <StatusBadge status={s.status} size="sm" />,
              },
              {
                header: 'Score',
                cell: s => (
                  <span className="text-xs font-bold text-forest-800">
                    {s.review ? `${s.review.totalScore} / 100` : 'Pending'}
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
                    onClick={() => navigate('/student/code-reviews')}
                  >
                    View Review
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
