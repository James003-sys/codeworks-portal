import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { ChartCard } from '../../components/ui/ChartCard';
import { StatCard } from '../../components/ui/StatCard';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Award, Code, CheckCircle, Brain, Users } from 'lucide-react';

export const AdminPerformance: React.FC = () => {
  const { performanceRecords, schools } = useApp();
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  const filteredRecords = performanceRecords.filter(r => {
    const matchesSchool = selectedSchool === 'all' || r.schoolId === selectedSchool;
    const matchesGrade = selectedGrade === 'all' || r.grade === selectedGrade;
    return matchesSchool && matchesGrade;
  });

  // Calculate aggregates
  const total = filteredRecords.length || 1;
  const avgProficiency = Math.round(filteredRecords.reduce((acc, r) => acc + r.codingProficiency, 0) / total);
  const avgProblemSolving = Math.round(filteredRecords.reduce((acc, r) => acc + r.problemSolvingScore, 0) / total);
  const avgCollaboration = Math.round(filteredRecords.reduce((acc, r) => acc + r.collaborationScore, 0) / total);
  const avgCodeQuality = Math.round(filteredRecords.reduce((acc, r) => acc + r.codeQualityScore, 0) / total);

  const radarData = [
    { subject: 'Coding Proficiency', A: avgProficiency, fullMark: 100 },
    { subject: 'Problem Solving', A: avgProblemSolving, fullMark: 100 },
    { subject: 'Collaboration', A: avgCollaboration, fullMark: 100 },
    { subject: 'Code Quality', A: avgCodeQuality, fullMark: 100 },
    { subject: 'Attendance', A: 92, fullMark: 100 },
  ];

  const comparisonData = filteredRecords.map(r => ({
    name: r.studentName.split(' ')[0],
    proficiency: r.codingProficiency,
    problemSolving: r.problemSolvingScore,
    codeQuality: r.codeQualityScore,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Learning Outcomes & Competency Analytics"
        description="Quantifiable metrics across coding fluency, algorithmic problem solving, collaboration, and code hygiene."
      />

      <FilterBar
        isFiltered={selectedSchool !== 'all' || selectedGrade !== 'all'}
        onReset={() => {
          setSelectedSchool('all');
          setSelectedGrade('all');
        }}
      >
        <div className="w-48">
          <Select value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)}>
            <option value="all">All Partner Schools</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Select>
        </div>

        <div className="w-36">
          <Select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}>
            <option value="all">All Grades</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </Select>
        </div>

        <span className="text-xs text-content-muted ml-auto font-medium">
          Sample size: <span className="font-bold text-content-heading">{filteredRecords.length} evaluated students</span>
        </span>
      </FilterBar>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Coding Proficiency"
          value={`${avgProficiency}%`}
          description="Syntax, logic, and debugging fluency"
          icon={<Code className="h-4 w-4" />}
        />
        <StatCard
          title="Problem Solving"
          value={`${avgProblemSolving}%`}
          description="Algorithm breakdown & edge cases"
          icon={<Brain className="h-4 w-4" />}
        />
        <StatCard
          title="Collaboration Score"
          value={`${avgCollaboration}%`}
          description="Pair programming & peer code review"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Code Quality & Style"
          value={`${avgCodeQuality}%`}
          description="Clean structure, naming & documentation"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Student Competency Comparison"
          subtitle="Direct comparison across coding proficiency, problem solving and code quality"
          summaryText="Students excel at coding proficiency with code quality showing steady positive growth."
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E5" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#647067' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#647067' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E4E9E5',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="proficiency" name="Proficiency" fill="#174C3C" radius={[3, 3, 0, 0]} />
              <Bar dataKey="problemSolving" name="Problem Solving" fill="#287052" radius={[3, 3, 0, 0]} />
              <Bar dataKey="codeQuality" name="Code Quality" fill="#5C9E82" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Curriculum Competency Radar"
          subtitle="Cohort average across 5 core pedagogical dimensions"
          summaryText="Cohort displays well-rounded capability with collaboration and attendance reaching top percentiles."
        >
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#E4E9E5" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#3A473E', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Cohort Average"
                dataKey="A"
                stroke="#174C3C"
                fill="#287052"
                fillOpacity={0.4}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detailed Records Table */}
      <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
        <h3 className="text-sm font-bold text-content-heading">Detailed Student Performance Logs</h3>
        <DataTable
          data={filteredRecords}
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
              cell: r => (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-forest-800">{r.codingProficiency}%</span>
                </div>
              ),
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
              header: 'Instructor Evaluation',
              cell: r => <p className="text-xs text-content-muted line-clamp-2 max-w-sm">{r.tutorFeedback}</p>,
            },
          ]}
        />
      </div>
    </div>
  );
};
