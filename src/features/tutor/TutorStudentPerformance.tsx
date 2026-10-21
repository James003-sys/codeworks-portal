import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { Code, Brain, Users, Award } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const TutorStudentPerformance: React.FC = () => {
  const { currentUser, tutors, students, performanceRecords } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const assignedSchoolIds = currentTutor.assignedSchools.map(as => as.schoolId);

  const cohortRecords = performanceRecords.filter(p =>
    assignedSchoolIds.includes(p.schoolId)
  );

  const comparisonData = cohortRecords.map(r => ({
    name: r.studentName.split(' ')[0],
    proficiency: r.codingProficiency,
    problemSolving: r.problemSolvingScore,
    codeQuality: r.codeQualityScore,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Student Performance & Mastery"
        description="Detailed competency evaluations for students enrolled in your partner schools."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg Coding Proficiency"
          value="89%"
          description="Syntactic fluency & logic"
          icon={<Code className="h-4 w-4" />}
        />
        <StatCard
          title="Avg Problem Solving"
          value="87%"
          description="Algorithm formulation"
          icon={<Brain className="h-4 w-4" />}
        />
        <StatCard
          title="Avg Collaboration"
          value="91%"
          description="Pair coding engagement"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Avg Code Quality"
          value="85%"
          description="Naming & modular design"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <ChartCard
        title="Cohort Competency Breakdown"
        subtitle="Comparing student performance across key coding pillars"
        summaryText="Students show strong proficiency in logic and debugging."
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#647067' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#647067' }} />
            <Tooltip />
            <Bar dataKey="proficiency" name="Proficiency" fill="#174C3C" radius={[3, 3, 0, 0]} />
            <Bar dataKey="problemSolving" name="Problem Solving" fill="#287052" radius={[3, 3, 0, 0]} />
            <Bar dataKey="codeQuality" name="Code Quality" fill="#5C9E82" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="rounded-lg border border-surface-border bg-white p-5 shadow-subtle space-y-3">
        <h3 className="text-sm font-bold text-content-heading">Evaluated Student Performance Records</h3>
        <DataTable
          data={cohortRecords}
          keyExtractor={r => r.id}
          columns={[
            {
              header: 'Student & Grade',
              cell: r => (
                <div>
                  <p className="font-semibold text-content-heading">{r.studentName}</p>
                  <p className="text-xs text-content-muted">{r.grade} • {r.period}</p>
                </div>
              ),
            },
            {
              header: 'Coding Proficiency',
              cell: r => <span className="font-bold text-xs text-forest-800">{r.codingProficiency}%</span>,
            },
            {
              header: 'Problem Solving',
              cell: r => <span className="font-bold text-xs text-forest-700">{r.problemSolvingScore}%</span>,
            },
            {
              header: 'Collaboration',
              cell: r => <span className="font-bold text-xs text-forest-700">{r.collaborationScore}%</span>,
            },
            {
              header: 'Overall Score',
              cell: r => (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {r.overallScore}%
                </span>
              ),
            },
            {
              header: 'Your Written Feedback',
              cell: r => <p className="text-xs text-content-muted line-clamp-2 max-w-sm">{r.tutorFeedback}</p>,
            },
          ]}
        />
      </div>
    </div>
  );
};
