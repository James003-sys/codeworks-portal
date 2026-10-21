import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../lib/utils';
import { Star, Award, Shield, MessageSquare, CheckCircle, ThumbsUp } from 'lucide-react';

export const TutorRatings: React.FC = () => {
  const { currentUser, tutors, tutorRatings } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const myRatings = tutorRatings.filter(r => r.tutorId === currentTutor.id);

  const categories = [
    { name: 'Student Engagement', score: 5.0, count: 8 },
    { name: 'Clarity & Pedagogy', score: 4.9, count: 12 },
    { name: 'Punctuality & Reliability', score: 4.9, count: 10 },
    { name: 'Technical Depth', score: 4.8, count: 6 },
    { name: 'Classroom Management', score: 4.9, count: 7 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Authorized Faculty Ratings & School Feedback"
        description="Formal feedback submitted by school administrators and verified student evaluations."
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-surface-border bg-white p-5 shadow-subtle flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Star className="h-6 w-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
              Overall Faculty Rating
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-content-heading">{currentTutor.rating.toFixed(1)}</span>
              <span className="text-xs text-content-muted">/ 5.0</span>
            </div>
            <p className="text-[11px] text-content-muted">Top 5% across Nakuru County faculty</p>
          </div>
        </div>

        <StatCard
          title="Verified Reviews"
          value={myRatings.length}
          description="Direct from Partner Schools & Students"
          icon={<Shield className="h-4 w-4" />}
        />

        <StatCard
          title="Curriculum Completion"
          value="98.5%"
          description="Syllabus pacing adherence"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      {/* Category breakdown */}
      <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
        <h3 className="text-sm font-bold text-content-heading">Pedagogical Competency Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {categories.map(cat => (
            <div key={cat.name} className="p-3.5 rounded-lg border border-surface-border bg-surface-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-content-heading">{cat.name}</span>
                <span className="font-bold text-forest-800">{cat.score.toFixed(1)} / 5.0</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-forest-600 h-full rounded-full"
                  style={{ width: `${(cat.score / 5) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-content-muted">{cat.count} verified submissions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified feedback reviews */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-content-heading">Authorized Review Testimonials</h3>
        <div className="space-y-3">
          {myRatings.map(rating => (
            <div
              key={rating.id}
              className="rounded-lg border border-surface-border bg-white p-5 shadow-subtle space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-content-heading">{rating.schoolName}</span>
                    <Badge variant="forest" size="sm">
                      {rating.feedbackCategory}
                    </Badge>
                  </div>
                  <p className="text-xs text-content-muted mt-0.5">
                    Source: <span className="font-medium text-content-heading">{rating.source}</span> • {formatDate(rating.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-1 font-bold text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{rating.ratingScore.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs text-content-body italic bg-surface-subtle p-3 rounded border border-surface-border leading-relaxed">
                "{rating.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
