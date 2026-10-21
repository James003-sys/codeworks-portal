import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { Star, Building2, CheckCircle, Mail, Phone, Award } from 'lucide-react';

export const TutorProfile: React.FC = () => {
  const { currentUser, tutors, updateTutor } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const [formData, setFormData] = useState({
    name: currentTutor.name,
    email: currentTutor.email,
    phone: currentTutor.phone,
    bio: currentTutor.bio,
    specialties: currentTutor.specialties.join(', '),
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTutor(currentTutor.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Instructor Faculty Profile"
        description="Your pedagogical bio, credentials, school assignments, and contact preferences."
      />

      {isSaved && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle flex flex-col sm:flex-row items-center gap-5">
        <Avatar name={currentTutor.name} src={currentTutor.avatarUrl} size="xl" />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-content-heading">{currentTutor.name}</h2>
            <StatusBadge status={currentTutor.status} size="sm" />
          </div>
          <p className="text-xs text-content-muted">
            Lead Coding Instructor • Joined {currentTutor.hireDate}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
            <span className="flex items-center gap-1 font-bold text-amber-700">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              {currentTutor.rating.toFixed(1)} / 5.0 Rating
            </span>
            <span className="text-content-subtle">•</span>
            <span className="text-content-muted font-medium">
              {currentTutor.totalLessonsDelivered} Delivered Sessions
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-content-heading border-b border-surface-border pb-3">
          Personal Information & Teaching Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name">
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </FormField>

          <FormField label="Email Address">
            <Input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Phone Number">
            <Input
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormField>

          <FormField label="Curriculum Specialties (comma-separated)">
            <Input
              value={formData.specialties}
              onChange={e => setFormData({ ...formData, specialties: e.target.value })}
            />
          </FormField>
        </div>

        <FormField label="Biography & Pedagogical Philosophy">
          <Textarea
            rows={4}
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
          />
        </FormField>

        {/* Assigned Schools Display */}
        <div className="border-t border-surface-border pt-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
            Active School Timetable Assignments
          </h4>
          <div className="space-y-2">
            {currentTutor.assignedSchools.map(as => (
              <div
                key={as.id}
                className="flex items-center justify-between p-3 rounded-md border border-surface-border bg-surface-subtle text-xs"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-forest-700" />
                  <span className="font-semibold text-content-heading">{as.schoolName}</span>
                </div>
                <div className="text-content-muted">
                  Grades: <span className="font-medium text-forest-800">{as.grades.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
