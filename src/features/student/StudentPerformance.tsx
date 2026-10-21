import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { Award, Code, CheckCircle, Brain, Users, Sparkles } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export const StudentPerformance: React.FC = () => {
  const { currentUser, students, performanceRecords } = useApp();

  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  const myPerformance = performanceRecords.find(p => p.studentId === currentStudent.id);

  const radarData = [
    { subject: 'Coding Proficiency', score: myPerformance?.codingProficiency || 90 },
    { subject: 'Problem Solving', score: myPerformance?.problemSolvingScore || 88 },
    { subject: 'Collaboration', score: myPerformance?.collaborationScore || 92 },
    { subject: 'Code Quality', score: myPerformance?.codeQualityScore || 86 },
    { subject: 'Attendance', score: currentStudent.attendanceRate || 94 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Learning Performance & Rubric Mastery"
        description="Comprehensive evaluation across algorithmic problem solving, code quality, and computational fluency."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Coding Proficiency"
          value={`${myPerformance?.codingProficiency || 91}%`}
          description="Syntax, logic, and debugging"
          icon={<Code className="h-4 w-4" />}
        />
        <StatCard
          title="Problem Solving"
          value={`${myPerformance?.problemSolvingScore || 88}%`}
          description="Algorithm breakdown & tests"
          icon={<Brain className="h-4 w-4" />}
        />
        <StatCard
          title="Collaboration"
          value={`${myPerformance?.collaborationScore || 92}%`}
          description="Pair coding & peer discussions"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Code Quality"
          value={`${myPerformance?.codeQualityScore || 86}%`}
          description="Naming conventions & structure"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Competency Chart */}
        <ChartCard
          title="Competency Radar Assessment"
          subtitle="Evaluation across 5 key computer science learning dimensions"
          summaryText="High performance in coding proficiency and attendance consistency."
        >
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#E4E9E5" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#3A473E', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Your Score"
                dataKey="score"
                stroke="#174C3C"
                fill="#287052"
                fillOpacity={0.4}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Detailed Tutor Assessment Notes */}
        <div className="rounded-lg border border-surface-border bg-white p-5 shadow-subtle flex flex-col justify-between">
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-surface-border pb-3">
              <Sparkles className="h-4 w-4 text-forest-700" />
              <h3 className="text-sm font-bold text-content-heading">Instructor Feedback & Guidance</h3>
            </div>

            <p className="text-content-body italic bg-surface-subtle p-3.5 rounded-lg border border-surface-border leading-relaxed">
              "{myPerformance?.tutorFeedback}"
            </p>

            <div className="space-y-1.5 pt-2">
              <span className="font-bold uppercase tracking-wider text-content-muted">
                Key Learning Strengths
              </span>
              <ul className="space-y-1 text-content-body">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Strong grasp of semantic HTML5, CSS Grid, and responsive flex layouts.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Clean DOM event handling and structured JavaScript modular design.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-border text-xs text-content-muted flex items-center justify-between">
            <span>Evaluating Instructor: <strong className="text-forest-800">{currentStudent.primaryTutorName || 'Dennis Kiprono'}</strong></span>
            <span>Term: Term 3 2026 (CBC)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
