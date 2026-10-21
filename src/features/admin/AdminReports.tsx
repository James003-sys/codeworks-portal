import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { Select } from '../../components/ui/Select';
import { LessonReport } from '../../types';
import { formatDate } from '../../lib/utils';
import { FileDown, Printer, FileText, CheckCircle, Users, Check, Clock } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { reports, schools, tutors, updateLessonReport } = useApp();

  const [schoolFilter, setSchoolFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<LessonReport | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filteredReports = reports.filter(r => {
    const matchesSchool = schoolFilter === 'all' || r.schoolId === schoolFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSchool && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['Report ID', 'Lesson Title', 'School', 'Tutor', 'Grade', 'Date', 'Status', 'Topic'];
    const rows = filteredReports.map(r => [
      r.id,
      `"${r.lessonTitle}"`,
      `"${r.schoolName}"`,
      `"${r.tutorName}"`,
      r.grade,
      r.date,
      r.status,
      `"${r.lessonTopic.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `codeworks_nakuru_reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('CSV report successfully generated and downloaded.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleSimulatePDF = () => {
    window.print();
  };

  const handleApproveReport = (reportId: string) => {
    updateLessonReport(reportId, { status: 'approved' });
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: 'approved' });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Instructional Lesson Reports & Compliance"
        description="Formal post-lesson documentation submitted by tutors covering learning objectives, attendance, and student performance."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulatePDF}
              leftIcon={<Printer className="h-4 w-4" />}
            >
              Print / Save PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<FileDown className="h-4 w-4" />}
            >
              Export CSV
            </Button>
          </div>
        }
      />

      {exportNotice && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      <FilterBar
        isFiltered={schoolFilter !== 'all' || statusFilter !== 'all'}
        onReset={() => {
          setSchoolFilter('all');
          setStatusFilter('all');
        }}
      >
        <div className="w-48">
          <Select value={schoolFilter} onChange={e => setSchoolFilter(e.target.value)}>
            <option value="all">All Schools</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Select>
        </div>

        <div className="w-36">
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="needs-revision">Needs Revision</option>
          </Select>
        </div>
      </FilterBar>

      <DataTable
        data={filteredReports}
        keyExtractor={r => r.id}
        onRowClick={r => {
          setSelectedReport(r);
          setIsDetailModalOpen(true);
        }}
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
            header: 'Tutor',
            cell: r => <span className="text-xs font-medium text-content-body">{r.tutorName}</span>,
          },
          {
            header: 'Delivered Date',
            cell: r => (
              <div className="text-xs text-content-muted">
                <p>{formatDate(r.date)}</p>
                <p className="text-[11px] text-content-subtle">
                  Filed: {formatDate(r.submittedAt.split('T')[0])}
                </p>
              </div>
            ),
          },
          {
            header: 'Attendance',
            cell: r => (
              <span className="text-xs font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                {r.attendance.filter(a => a.status === 'present').length} / {r.attendance.length} present
              </span>
            ),
          },
          {
            header: 'Status',
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
                  setIsDetailModalOpen(true);
                }}
              >
                Inspect Report
              </Button>
            ),
          },
        ]}
      />

      {/* Inspect Report Dialog */}
      {selectedReport && (
        <Dialog
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Lesson Report: ${selectedReport.lessonTitle}`}
          description={`${selectedReport.schoolName} (${selectedReport.grade}) • Instructor: ${selectedReport.tutorName}`}
          size="xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {selectedReport.status !== 'approved' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveReport(selectedReport.id)}
                    leftIcon={<Check className="h-4 w-4" />}
                  >
                    Approve Report
                  </Button>
                )}
                {selectedReport.status === 'submitted' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-amber-800"
                    onClick={() => {
                      updateLessonReport(selectedReport.id, { status: 'needs-revision' });
                      setSelectedReport({ ...selectedReport, status: 'needs-revision' });
                    }}
                  >
                    Request Revision
                  </Button>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-5 text-sm">
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
              <div>
                <span className="text-xs text-content-muted">Delivered Session</span>
                <p className="font-bold text-content-heading">{selectedReport.lessonTopic}</p>
                <p className="text-xs text-content-muted">Date: {formatDate(selectedReport.date)}</p>
              </div>
              <StatusBadge status={selectedReport.status} size="md" />
            </div>

            {/* Learning Objectives */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
                Learning Objectives Evaluated
              </h4>
              <ul className="space-y-1.5 bg-white p-3.5 rounded-lg border border-surface-border">
                {selectedReport.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-content-body">
                    <CheckCircle className="h-3.5 w-3.5 text-forest-700 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics Covered */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
                Curriculum Covered & Lab Highlights
              </h4>
              <p className="text-xs text-content-body bg-white p-3 rounded-md border border-surface-border leading-relaxed">
                {selectedReport.topicsCovered}
              </p>
            </div>

            {/* Student Performance Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
                Student Attendance & Formative Evaluations
              </h4>
              <div className="rounded-lg border border-surface-border overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-surface-subtle border-b border-surface-border text-content-muted uppercase">
                    <tr>
                      <th className="p-2.5">Student</th>
                      <th className="p-2.5">Attendance</th>
                      <th className="p-2.5">Understanding</th>
                      <th className="p-2.5">Engagement</th>
                      <th className="p-2.5">Observed Strengths</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border bg-white">
                    {selectedReport.studentPerformances.map((sp, idx) => {
                      const att = selectedReport.attendance.find(a => a.studentId === sp.studentId);
                      return (
                        <tr key={idx}>
                          <td className="p-2.5 font-semibold text-content-heading">{sp.studentName}</td>
                          <td className="p-2.5">
                            <StatusBadge status={att?.status || 'present'} size="sm" />
                          </td>
                          <td className="p-2.5 font-bold text-forest-800">{sp.understandingLevel} / 5</td>
                          <td className="p-2.5 font-bold text-forest-800">{sp.engagementLevel} / 5</td>
                          <td className="p-2.5 text-content-muted">{sp.strengths}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border border-surface-border bg-surface-subtle">
                <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                  Tutor General Notes
                </span>
                <p className="text-xs text-content-body mt-1">{selectedReport.generalNotes}</p>
              </div>

              <div className="p-3 rounded-lg border border-surface-border bg-surface-subtle">
                <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                  Planned Next Steps
                </span>
                <p className="text-xs text-content-body mt-1">{selectedReport.nextSteps}</p>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
