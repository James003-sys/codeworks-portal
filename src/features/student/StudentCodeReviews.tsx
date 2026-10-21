import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { ProjectSubmission } from '../../types';
import { formatDate } from '../../lib/utils';
import {
  CheckCircle,
  FileCode,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Award,
  Clock,
} from 'lucide-react';

export const StudentCodeReviews: React.FC = () => {
  const { currentUser, students, submissions } = useApp();

  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  const mySubmissions = submissions.filter(
    s => s.studentId === currentStudent.id || s.studentName === currentStudent.name
  );

  const [selectedSubmission, setSelectedSubmission] = useState<ProjectSubmission | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Instructor Code Reviews & Rubrics"
        description="Detailed feedback, criteria scores, and recommendations from your lead coding instructor."
      />

      <div className="space-y-4">
        {mySubmissions.map(sub => (
          <div
            key={sub.id}
            className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle hover:border-forest-200 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-3">
              <div>
                <span className="text-[11px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                  {sub.grade}
                </span>
                <h3 className="font-bold text-base text-content-heading mt-1">{sub.projectTitle}</h3>
                <p className="text-xs text-content-muted">
                  Submitted {formatDate(sub.submissionDate.split('T')[0])} • {sub.schoolName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={sub.status} size="md" />
                {sub.review && (
                  <div className="text-right">
                    <span className="text-xs text-content-muted block">Score</span>
                    <span className="text-lg font-bold text-forest-800">
                      {sub.review.totalScore} / {sub.review.maxScore}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {sub.review ? (
              <div className="space-y-4 text-xs">
                {/* General praise */}
                <div className="p-3.5 rounded-lg bg-forest-50/60 border border-forest-100 text-forest-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles className="h-4 w-4 text-forest-700" />
                    <span>Instructor Assessment ({sub.review.tutorName})</span>
                  </div>
                  <p className="leading-relaxed text-content-body">{sub.review.generalComments}</p>
                </div>

                {/* Criteria breakdown */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-content-muted mb-2">
                    Rubric Criteria Evaluation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sub.review.criteriaScores.map(cs => (
                      <div key={cs.criterionName} className="p-3 rounded-lg border border-surface-border bg-surface-subtle space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-content-heading">{cs.criterionName}</span>
                          <span className="font-bold text-forest-800">{cs.pointsAwarded} / {cs.maxPoints}</span>
                        </div>
                        <p className="text-[11px] text-content-muted">{cs.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvement suggestions */}
                {sub.review.improvementSuggestions.length > 0 && (
                  <div className="p-3 rounded-lg bg-surface-subtle border border-surface-border space-y-1">
                    <span className="font-bold uppercase tracking-wider text-content-muted">
                      Recommended Next Challenges
                    </span>
                    <ul className="space-y-1 pt-1">
                      {sub.review.improvementSuggestions.map((sug, i) => (
                        <li key={i} className="flex items-center gap-2 text-content-body">
                          <CheckCircle className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSubmission(sub)}
                    leftIcon={<FileCode className="h-3.5 w-3.5" />}
                  >
                    Inspect Submitted Code & Inline Notes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50/60 border border-amber-200 text-amber-900 text-xs">
                <Clock className="h-4 w-4 text-amber-700 shrink-0" />
                <div>
                  <p className="font-bold">Awaiting Instructor Review</p>
                  <p className="text-amber-800 mt-0.5">
                    Your code is in the instructor queue. You will receive an alert once evaluated.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Code Inspector Dialog */}
      {selectedSubmission && (
        <Dialog
          isOpen={Boolean(selectedSubmission)}
          onClose={() => setSelectedSubmission(null)}
          title={`Reviewed Code: ${selectedSubmission.projectTitle}`}
          description={`Instructor: ${selectedSubmission.review?.tutorName || 'Dennis Kiprono'} • Evaluated on ${formatDate(selectedSubmission.review?.reviewDate.split('T')[0] || '')}`}
          size="xl"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Inline comments if any */}
            {selectedSubmission.review?.inlineComments && (
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-content-muted">
                  Inline Tutor Annotations
                </span>
                {selectedSubmission.review.inlineComments.map((inline, i) => (
                  <div key={i} className="p-3 rounded-lg border border-forest-200 bg-forest-50/70 text-forest-900 space-y-1">
                    <p className="font-bold">Line {inline.lineNumber}: {inline.comment}</p>
                    {inline.suggestion && (
                      <p className="text-content-muted text-[11px]">Tip: {inline.suggestion}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Code Window */}
            <div className="rounded-lg border border-surface-border bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto p-4 max-h-80">
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
        </Dialog>
      )}
    </div>
  );
};
