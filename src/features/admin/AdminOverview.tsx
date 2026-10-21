import React, { useState } from 'react';
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
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
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

export const AdminOverview: React.FC = () => {
  const { tutors, schools, students, schedules, reports, submissions, activityLogs } = useApp();
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'term'>('month');
  const navigate = useNavigate();

  // Metrics
  const activeTutorsCount = tutors.filter(t => t.status === 'active').length;
  const activeSchoolsCount = schools.filter(s => s.activeStatus === 'active').length;
  const activeStudentsCount = students.filter(s => s.enrollmentStatus === 'active').length;
  const completedLessons = schedules.filter(s => s.status === 'completed').length;
  const totalLessons = schedules.length;
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Pending Attention Items
  const pendingReports = schedules.filter(s => s.status === 'completed' && !s.hasReportSubmitted);
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');

  // Chart datasets
  const progressTrendData = [
    { period: 'Week 1', avgProgress: 42, activeAttendance: 92 },
    { period: 'Week 2', avgProgress: 55, activeAttendance: 94 },
    { period: 'Week 3', avgProgress: 68, activeAttendance: 91 },
    { period: 'Week 4', avgProgress: 76, activeAttendance: 95 },
    { period: 'Week 5', avgProgress: 84, activeAttendance: 93 },
    { period: 'Week 6', avgProgress: 88, activeAttendance: 96 },
  ];

  const tutorComparisonData = tutors.map(t => ({
    name: t.name.split(' ')[0],
    rating: t.rating,
    lessons: t.totalLessonsDelivered,
  }));

  const upcomingLessons = schedules
    .filter(s => s.status === 'scheduled')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Overview — Nakuru Region"
        description="Cross-school CBC Web Development operations, tutor allocations, and student outcomes across Nakuru County partner institutions."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-content-muted font-medium">Reporting Window:</span>
            <div className="flex rounded-md border border-surface-border bg-white p-0.5">
              {(['week', 'month', 'term'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded capitalize transition-colors ${
                    dateRange === range
                      ? 'bg-forest-700 text-white'
                      : 'text-content-body hover:text-forest-800'
                  }`}
                >
                  {range === 'term' ? 'Term 3 (CBC)' : `This ${range}`}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Tutors"
          value={activeTutorsCount}
          description="Assigned across 4 Nakuru schools"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Partner Schools"
          value={activeSchoolsCount}
          description="364 CBC learners enrolled"
          icon={<Building2 className="h-4 w-4" />}
        />
        <StatCard
          title="Enrolled Students"
          value={activeStudentsCount}
          description="Avg 93% session attendance"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <StatCard
          title="Lesson Completion Rate"
          value={`${completionRate}%`}
          description={`${completedLessons} completed / ${totalLessons} sessions`}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      {/* Attention Callouts */}
      {(pendingReports.length > 0 || pendingSubmissions.length > 0) && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Action Items Needing Operational Attention
              </h4>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-amber-800">
                {pendingReports.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold underline cursor-pointer" onClick={() => navigate('/admin/schedules')}>
                      {pendingReports.length} completed session{pendingReports.length > 1 ? 's' : ''} pending lesson report
                    </span>
                  </div>
                )}
                {pendingSubmissions.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold underline cursor-pointer" onClick={() => navigate('/admin/reports')}>
                      {pendingSubmissions.length} project submission{pendingSubmissions.length > 1 ? 's' : ''} awaiting code review
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Curriculum Mastery & Attendance Trajectory"
          subtitle="Cohort average progress (%) across weekly project checkpoints"
          summaryText="Students show consistent 88% overall progress with above 93% weekly session attendance."
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={progressTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#174C3C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#174C3C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#647067' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#647067' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E4E9E5',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="avgProgress"
                name="Average Progress %"
                stroke="#174C3C"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProgress)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Tutor Session Volume & Quality Benchmark"
          subtitle="Total delivered web development sessions per lead instructor"
          summaryText="Dennis Kiprono and Mercy Jepkemoi lead delivered session volume (142 and 118 sessions)."
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={tutorComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#647067' }} />
              <YAxis tick={{ fontSize: 11, fill: '#647067' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E4E9E5',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="lessons" name="Total Lessons" fill="#287052" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Grid: Upcoming Lessons and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Lessons (2 cols) */}
        <div className="lg:col-span-2 rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-content-heading">Upcoming Scheduled Lessons</h3>
              <p className="text-xs text-content-muted">Cross-school sessions planned for this week</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/schedules')}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              View Timetable
            </Button>
          </div>

          <DataTable
            data={upcomingLessons}
            keyExtractor={l => l.id}
            onRowClick={() => navigate('/admin/schedules')}
            columns={[
              {
                header: 'Topic & School',
                cell: l => (
                  <div>
                    <p className="font-semibold text-content-heading text-xs">{l.title}</p>
                    <p className="text-[11px] text-content-muted">{l.schoolName} • {l.grade}</p>
                  </div>
                ),
              },
              {
                header: 'Tutor',
                cell: l => <span className="text-xs font-medium text-content-body">{l.tutorName}</span>,
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

        {/* Audit Activity Log (1 col) */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-content-heading">Recent Platform Activity</h3>
            <span className="text-[11px] text-content-muted">Live sync</span>
          </div>

          <div className="divide-y divide-surface-border text-xs">
            {activityLogs.slice(0, 5).map(log => (
              <div key={log.id} className="py-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-content-heading">{log.action}</span>
                  <span className="text-[10px] text-content-muted">
                    {formatDate(log.timestamp.split('T')[0])}
                  </span>
                </div>
                <p className="text-content-muted text-[11px]">{log.details}</p>
                <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-forest-700">
                  <span className="font-medium">{log.userName}</span>
                  <span className="text-content-subtle">•</span>
                  <span className="uppercase">{log.userRole}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
