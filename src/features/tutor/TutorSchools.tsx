import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { School } from '../../types';
import { Building2, MapPin, Mail, Phone, Users, Calendar, BookOpen } from 'lucide-react';

export const TutorSchools: React.FC = () => {
  const { currentUser, tutors, schools, schedules, students } = useApp();

  const currentTutor =
    tutors.find(t => t.userId === currentUser.id) ||
    tutors.find(t => t.id === 'tut-1') ||
    tutors[0];

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const myAssignments = currentTutor.assignedSchools;
  const myAssignedSchools = schools.filter(s =>
    myAssignments.some(as => as.schoolId === s.id)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Assigned Partner Schools"
        description="Partner institutions where you deliver coding instruction, campus contacts, and assigned grade levels."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myAssignedSchools.map(school => {
          const assignment = myAssignments.find(as => as.schoolId === school.id);
          const schoolStudents = students.filter(s => s.schoolId === school.id);
          const schoolLessons = schedules.filter(s => s.schoolId === school.id && s.tutorId === currentTutor.id);

          return (
            <div
              key={school.id}
              className="rounded-lg border border-surface-border bg-surface-card p-6 shadow-subtle hover:border-forest-200 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700 border border-forest-100">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-content-heading">{school.name}</h3>
                      <p className="text-xs text-content-muted font-mono">{school.code}</p>
                    </div>
                  </div>
                  <Badge variant="forest" size="sm">
                    Active Assignment
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-content-muted border-t border-b border-surface-border py-3">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                    <span>{school.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                    <span>Primary Contact: {school.contactPerson}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                    <span>{school.contactEmail}</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
                    Your Assigned Grades & Focus
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {assignment?.grades.map(g => (
                      <Badge key={g} variant="default" size="sm">
                        {g}
                      </Badge>
                    ))}
                    {assignment?.subjectFocus.map(sub => (
                      <Badge key={sub} variant="forest" size="sm">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded bg-surface-subtle border border-surface-border text-center">
                    <span className="text-[11px] text-content-muted">Enrolled in Cohort</span>
                    <p className="text-lg font-bold text-content-heading">{schoolStudents.length}</p>
                  </div>
                  <div className="p-2.5 rounded bg-surface-subtle border border-surface-border text-center">
                    <span className="text-[11px] text-content-muted">Scheduled Sessions</span>
                    <p className="text-lg font-bold text-forest-800">{schoolLessons.length}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-surface-border flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSchool(school)}
                >
                  View Campus Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedSchool && (
        <Dialog
          isOpen={Boolean(selectedSchool)}
          onClose={() => setSelectedSchool(null)}
          title={selectedSchool.name}
          description={`Campus Administration & Lab Specifications`}
          size="md"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedSchool(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg border border-surface-border bg-surface-subtle space-y-1">
              <span className="font-bold uppercase tracking-wider text-content-muted">Classroom Facilities</span>
              <p className="text-sm font-semibold text-content-heading">Computer Lab 3B & Innovation Hub</p>
              <p className="text-content-muted">VS Code installed, Chrome 120+, Python 3.12 runtime configured.</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-content-muted">Primary Liaison</span>
              <p className="text-content-body font-semibold">{selectedSchool.contactPerson}</p>
              <p className="text-content-muted">Email: {selectedSchool.contactEmail}</p>
              <p className="text-content-muted">Direct Phone: {selectedSchool.contactPhone}</p>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
