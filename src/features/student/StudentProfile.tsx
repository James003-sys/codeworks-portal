import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Building2, GraduationCap, CheckCircle, Mail, Phone, BookOpen } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentUser, students, updateStudent } = useApp();

  const currentStudent =
    students.find(s => s.userId === currentUser.id) ||
    students.find(s => s.id === 'stu-1') ||
    students[0];

  const [formData, setFormData] = useState({
    name: currentStudent.name,
    email: currentStudent.email,
    guardianName: currentStudent.guardianName,
    guardianEmail: currentStudent.guardianEmail,
    guardianPhone: currentStudent.guardianPhone,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent(currentStudent.id, {
      name: formData.name,
      email: formData.email,
      guardianName: formData.guardianName,
      guardianEmail: formData.guardianEmail,
      guardianPhone: formData.guardianPhone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Student Profile & Enrollment"
        description="Your academic records, enrolled course, and parent/guardian contact info."
      />

      {isSaved && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Profile changes updated successfully.</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle flex flex-col sm:flex-row items-center gap-5">
        <Avatar name={currentStudent.name} src={currentStudent.avatarUrl} size="xl" />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-content-heading">{currentStudent.name}</h2>
            <StatusBadge status={currentStudent.enrollmentStatus} size="sm" />
          </div>
          <p className="text-xs text-content-muted">
            {currentStudent.schoolName} • {currentStudent.grade} • Enrolled {currentStudent.enrollmentDate}
          </p>
          <div className="pt-1">
            <Badge variant="forest" size="md">
              Current Course: {currentStudent.currentCourse}
            </Badge>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="rounded-lg border border-surface-border bg-white p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-content-heading border-b border-surface-border pb-3">
          Contact & Enrollment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name">
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </FormField>

          <FormField label="Student Email">
            <Input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>
        </div>

        <div className="border-t border-surface-border pt-3 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-content-heading">
            Parent / Emergency Guardian Contact
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Guardian Name">
              <Input
                value={formData.guardianName}
                onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
              />
            </FormField>

            <FormField label="Guardian Email">
              <Input
                type="email"
                value={formData.guardianEmail}
                onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })}
              />
            </FormField>

            <FormField label="Guardian Phone">
              <Input
                value={formData.guardianPhone}
                onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
              />
            </FormField>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};
