import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Project, ProjectSubmission } from '../../types';
import { formatDate } from '../../lib/utils';
import {
  Code2,
  Calendar,
  CheckCircle,
  FileCode,
  Sparkles,
  ExternalLink,
  Send,
  BookOpen,
} from 'lucide-react';

export const StudentProjects: React.FC = () => {
  const { currentUser, students, projects, submissions, submitProjectCode } = useApp();

  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submission Form State
  const [codeContent, setCodeContent] = useState('');
  const [notes, setNotes] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const handleOpenSubmit = (project: Project) => {
    setSelectedProject(project);
    const existing = submissions.find(
      s => s.projectId === project.id && (s.studentId === currentStudent.id || s.studentName === currentStudent.name)
    );
    if (existing) {
      setCodeContent(existing.codeContent);
      setNotes(existing.notes || '');
      setLiveDemoUrl(existing.liveDemoUrl || '');
    } else {
      setCodeContent(project.starterCode || '');
      setNotes('Ready for grading! Handled all edge cases.');
      setLiveDemoUrl('');
    }
    setIsSubmitModalOpen(true);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !codeContent.trim()) return;

    submitProjectCode(selectedProject.id, codeContent, notes, liveDemoUrl);
    setIsSubmitModalOpen(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Coding Milestone Projects"
        description="Hands-on software development assignments, rubric criteria, and code submission center."
      />

      {successToast && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Project code submitted successfully! Your instructor has been notified for rubric review.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => {
          const submission = submissions.find(
            s => s.projectId === project.id && (s.studentId === currentStudent.id || s.studentName === currentStudent.name)
          );

          return (
            <div
              key={project.id}
              className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle hover:border-forest-200 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                      {project.course}
                    </span>
                    <h3 className="font-bold text-base text-content-heading">{project.title}</h3>
                  </div>
                  {submission ? (
                    <StatusBadge status={submission.status} size="sm" />
                  ) : (
                    <Badge variant="warning" size="sm">
                      Assigned
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-content-body leading-relaxed">{project.description}</p>

                <div className="rounded bg-surface-subtle p-3 text-xs space-y-1 border border-surface-border">
                  <div className="flex items-center justify-between text-content-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-forest-700" />
                      <span>Due Date: {formatDate(project.dueDate)}</span>
                    </span>
                    <span className="font-semibold text-forest-800">Difficulty: {project.difficulty}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
                    Assignment Instructions
                  </h4>
                  <ul className="space-y-1 text-xs text-content-body">
                    {project.instructions.slice(0, 3).map((inst, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-forest-700 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
                <div>
                  {submission?.review && (
                    <span className="text-xs font-bold text-forest-800">
                      Score: {submission.review.totalScore} / {submission.review.maxScore}
                    </span>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenSubmit(project)}
                  leftIcon={<Send className="h-3.5 w-3.5" />}
                >
                  {submission ? 'Update / Resubmit Code' : 'Submit Code'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Submission Modal */}
      {selectedProject && (
        <Dialog
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title={`Submit Project: ${selectedProject.title}`}
          description={`Course: ${selectedProject.course} • Due: ${formatDate(selectedProject.dueDate)}`}
          size="xl"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSubmitCode} leftIcon={<Send className="h-3.5 w-3.5" />}>
                Submit Code for Review
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmitCode} className="space-y-4 text-xs">
            {/* Rubric Criteria overview */}
            <div className="rounded-lg bg-surface-subtle p-3 border border-surface-border">
              <span className="font-bold uppercase tracking-wider text-content-muted block mb-1">
                Evaluation Rubric (4 Pillars x 25 pts = 100 max)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                {selectedProject.rubricCriteria.map(rc => (
                  <div key={rc.name} className="p-2 bg-white rounded border border-surface-border">
                    <p className="font-semibold text-content-heading">{rc.name}</p>
                    <p className="text-content-muted">{rc.maxPoints} pts</p>
                  </div>
                ))}
              </div>
            </div>

            <FormField
              label="Source Code Implementation (HTML5 / CSS3 / JavaScript)"
              required
              description="Write or paste your code below. Clean indentation and comments recommended."
            >
              <Textarea
                rows={12}
                value={codeContent}
                onChange={e => setCodeContent(e.target.value)}
                className="font-mono text-xs bg-slate-900 text-slate-100 p-3 leading-relaxed"
                placeholder="<!-- Paste or write your HTML5, CSS3, or JavaScript code here -->"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Notes for Instructor">
                <Input
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Completed bonus challenge on line 28."
                />
              </FormField>

              <FormField label="Live Demo URL (Replit, GitHub, CodeSandbox)">
                <Input
                  value={liveDemoUrl}
                  onChange={e => setLiveDemoUrl(e.target.value)}
                  placeholder="https://replit.com/@username/project"
                />
              </FormField>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
};
