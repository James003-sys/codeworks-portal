import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { FormField } from '../../components/ui/FormField';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ProjectSubmission, CodeReview } from '../../types';
import { formatDate } from '../../lib/utils';
import {
  Code2,
  CheckCircle,
  FileCode,
  Check,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const TutorProjectsReviews: React.FC = () => {
  const { submissions, projects, reviewSubmission } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ProjectSubmission | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Review Form State
  const [generalComments, setGeneralComments] = useState('');
  const [improvementSuggestion, setImprovementSuggestion] = useState('');
  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>({
    'Semantic HTML Structure & Accessibility': 24,
    'CSS Grid & Responsive Layout': 23,
    'JavaScript DOM Interaction & Events': 24,
    'Code Quality & Clean Formatting': 24,
  });
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'changes-requested'>('approved');

  const filteredSubmissions = submissions.filter(s => {
    return statusFilter === 'all' || s.status === statusFilter;
  });

  const handleOpenReview = (submission: ProjectSubmission) => {
    setSelectedSubmission(submission);
    if (submission.review) {
      setGeneralComments(submission.review.generalComments);
      setReviewStatus(submission.review.status);
      const scoreMap: Record<string, number> = {};
      submission.review.criteriaScores.forEach(c => {
        scoreMap[c.criterionName] = c.pointsAwarded;
      });
      setCriteriaScores(scoreMap);
      setImprovementSuggestion(submission.review.improvementSuggestions[0] || '');
    } else {
      setGeneralComments('Clean semantic layout with responsive CSS grid and smooth DOM event handling.');
      setReviewStatus('approved');
      setImprovementSuggestion('Consider adding CSS transitions or saving state to localStorage.');
      setCriteriaScores({
        'Semantic HTML Structure & Accessibility': 24,
        'CSS Grid & Responsive Layout': 23,
        'JavaScript DOM Interaction & Events': 24,
        'Code Quality & Clean Formatting': 24,
      });
    }
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = () => {
    if (!selectedSubmission) return;

    const criteriaList = Object.entries(criteriaScores).map(([name, points]) => ({
      criterionName: name,
      pointsAwarded: points,
      maxPoints: 25,
      comment: points >= 24 ? 'Demonstrates advanced mastery.' : 'Competent implementation.',
    }));

    const totalScore = Object.values(criteriaScores).reduce((a, b) => a + b, 0);

    reviewSubmission(selectedSubmission.id, {
      status: reviewStatus,
      totalScore,
      maxScore: 100,
      criteriaScores: criteriaList,
      generalComments,
      improvementSuggestions: improvementSuggestion ? [improvementSuggestion] : [],
    });

    setIsReviewModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Code Review & Grading Center"
        description="Inspect student code repositories, test against rubric criteria, provide inline feedback, and record marks."
      />

      {saveSuccess && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Code review and rubric marks saved! Student notification dispatched.</span>
        </div>
      )}

      <FilterBar
        isFiltered={statusFilter !== 'all'}
        onReset={() => setStatusFilter('all')}
      >
        <div className="w-48">
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Submission Statuses</option>
            <option value="submitted">Awaiting Review</option>
            <option value="reviewed">Graded & Reviewed</option>
          </Select>
        </div>
      </FilterBar>

      <DataTable
        data={filteredSubmissions}
        keyExtractor={s => s.id}
        onRowClick={handleOpenReview}
        columns={[
          {
            header: 'Student & Project',
            cell: s => (
              <div>
                <p className="font-semibold text-content-heading">{s.studentName}</p>
                <p className="text-xs text-content-muted">{s.projectTitle}</p>
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
            header: 'Submission Date',
            cell: s => (
              <span className="text-xs text-content-muted">
                {formatDate(s.submissionDate.split('T')[0])}
              </span>
            ),
          },
          {
            header: 'Status',
            cell: s => <StatusBadge status={s.status} size="sm" />,
          },
          {
            header: 'Rubric Score',
            cell: s => (
              <span className="text-xs font-bold text-forest-800">
                {s.review ? `${s.review.totalScore} / ${s.review.maxScore}` : 'Ungraded'}
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
                onClick={e => {
                  e.stopPropagation();
                  handleOpenReview(s);
                }}
              >
                {s.status === 'reviewed' ? 'Inspect Review' : 'Grade Submission'}
              </Button>
            ),
          },
        ]}
      />

      {/* Code Review Workbench Dialog */}
      {selectedSubmission && (
        <Dialog
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title={`Code Review: ${selectedSubmission.projectTitle}`}
          description={`Student: ${selectedSubmission.studentName} (${selectedSubmission.schoolName} • ${selectedSubmission.grade})`}
          size="xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs text-content-muted font-medium">Review Decision:</span>
                <Select
                  value={reviewStatus}
                  onChange={e => setReviewStatus(e.target.value as 'approved' | 'changes-requested')}
                  className="w-44 text-xs"
                >
                  <option value="approved">Approve Project</option>
                  <option value="changes-requested">Request Changes</option>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsReviewModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveReview}>
                  Save & Publish Review
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-5 text-xs">
            {/* Student Submission notes */}
            {selectedSubmission.notes && (
              <div className="rounded-lg bg-surface-subtle p-3 border border-surface-border space-y-1">
                <span className="font-bold uppercase tracking-wider text-content-muted">
                  Student Submission Note
                </span>
                <p className="text-xs text-content-body italic">"{selectedSubmission.notes}"</p>
                {selectedSubmission.liveDemoUrl && (
                  <a
                    href={selectedSubmission.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-forest-700 hover:underline pt-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>View Student Demo Preview</span>
                  </a>
                )}
              </div>
            )}

            {/* Code Window with line numbers */}
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="font-bold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <FileCode className="h-3.5 w-3.5 text-forest-700" />
                  <span>Submitted Source Code (Inspect Line by Line)</span>
                </span>
                <span className="text-[11px] text-content-subtle font-mono">
                  {selectedSubmission.codeContent.split('\n').length} lines
                </span>
              </div>

              <div className="rounded-lg border border-surface-border bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto p-4 max-h-72">
                <pre className="space-y-0.5">
                  {selectedSubmission.codeContent.split('\n').map((line, idx) => (
                    <div key={idx} className="flex">
                      <span className="w-8 shrink-0 text-slate-500 select-none text-right pr-3">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200">{line || ' '}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Rubric Evaluation Form */}
            <div className="border-t border-surface-border pt-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-heading flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-forest-700" />
                <span>Rubric Criteria Scoring (25 Points Each = 100 Max)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(criteriaScores).map(([name, score]) => (
                  <div key={name} className="p-3 rounded-lg border border-surface-border bg-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-content-heading">{name}</span>
                      <span className="font-bold text-forest-800">{score} / 25 pts</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={25}
                      value={score}
                      onChange={e =>
                        setCriteriaScores({ ...criteriaScores, [name]: Number(e.target.value) })
                      }
                      className="w-full accent-forest-700 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end text-xs font-bold text-forest-900 pt-1">
                Calculated Total: {Object.values(criteriaScores).reduce((a, b) => a + b, 0)} / 100
              </div>
            </div>

            {/* Qualitative Feedback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-surface-border pt-3">
              <FormField label="Instructor Evaluation & Praise" required>
                <Textarea
                  rows={3}
                  value={generalComments}
                  onChange={e => setGeneralComments(e.target.value)}
                  placeholder="What did the student do well? Mention architecture and clean code..."
                />
              </FormField>

              <FormField label="Targeted Improvement Suggestion">
                <Textarea
                  rows={3}
                  value={improvementSuggestion}
                  onChange={e => setImprovementSuggestion(e.target.value)}
                  placeholder="Provide concrete next steps, advanced challenges, or refactoring advice..."
                />
              </FormField>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
