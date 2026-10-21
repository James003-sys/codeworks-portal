import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchBar } from '../../components/ui/SearchBar';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Dialog } from '../../components/ui/Dialog';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Tutor, GradeLevel } from '../../types';
import { Plus, Star, BookOpen, Building2, UserX, UserCheck, Edit3 } from 'lucide-react';

export const AdminTutors: React.FC = () => {
  const { tutors, schools, addTutor, updateTutor, deactivateTutor } = useApp();

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmDeactivateOpen, setIsConfirmDeactivateOpen] = useState(false);
  const [tutorToDeactivate, setTutorToDeactivate] = useState<Tutor | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    specialties: 'Semantic HTML5, CSS Flexbox, JavaScript DOM',
    selectedSchoolId: schools[0]?.id || '',
    selectedGrades: 'Grade 8, Grade 9',
    selectedSubject: 'Web Development Fundamentals',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filtering
  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || tutor.status === statusFilter;
    const matchesSchool =
      schoolFilter === 'all' || tutor.assignedSchools.some(s => s.schoolId === schoolFilter);

    return matchesSearch && matchesStatus && matchesSchool;
  });

  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      bio: '',
      specialties: 'Semantic HTML5, CSS Flexbox, JavaScript DOM',
      selectedSchoolId: schools[0]?.id || '',
      selectedGrades: 'Grade 8, Grade 9',
      selectedSubject: 'Web Development Fundamentals',
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleSaveTutor = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.bio.trim()) errors.bio = 'Bio / teaching credentials are required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const assignedSchoolObj = schools.find(s => s.id === formData.selectedSchoolId);

    const gradesArray = formData.selectedGrades
      .split(',')
      .map(g => g.trim() as GradeLevel)
      .filter(Boolean);

    const specialtiesArray = formData.specialties
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addTutor({
      userId: `user-tut-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      status: 'active',
      specialties: specialtiesArray,
      assignedSchools: assignedSchoolObj
        ? [
            {
              id: `tsa-${Date.now()}`,
              tutorId: '',
              schoolId: assignedSchoolObj.id,
              schoolName: assignedSchoolObj.name,
              grades: gradesArray,
              subjectFocus: [formData.selectedSubject],
              assignedDate: new Date().toISOString().split('T')[0],
              status: 'active',
            },
          ]
        : [],
    });

    setIsAddModalOpen(false);
  };

  const handleConfirmDeactivate = () => {
    if (tutorToDeactivate) {
      deactivateTutor(tutorToDeactivate.id);
      setIsConfirmDeactivateOpen(false);
      setTutorToDeactivate(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tutor Faculty Directory"
        description="Manage instructor assignments across partner schools, review ratings, and track delivery volume."
        actions={
          <Button onClick={handleOpenAddModal} leftIcon={<Plus className="h-4 w-4" />}>
            Onboard New Tutor
          </Button>
        }
      />

      {/* Filter and Search toolbar */}
      <FilterBar
        isFiltered={searchQuery !== '' || statusFilter !== 'all' || schoolFilter !== 'all'}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
          setSchoolFilter('all');
          setCurrentPage(1);
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={val => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search by name, email, specialty..."
        />

        <div className="w-36">
          <Select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>

        <div className="w-48">
          <Select
            value={schoolFilter}
            onChange={e => {
              setSchoolFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Assigned Schools</option>
            {schools.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        </div>
      </FilterBar>

      {/* Tutors Table */}
      <DataTable
        data={paginatedTutors}
        keyExtractor={t => t.id}
        onRowClick={t => {
          setSelectedTutor(t);
          setIsDetailModalOpen(true);
        }}
        columns={[
          {
            header: 'Tutor',
            cell: t => (
              <div className="flex items-center gap-3">
                <Avatar name={t.name} src={t.avatarUrl} size="md" />
                <div>
                  <p className="font-semibold text-content-heading">{t.name}</p>
                  <p className="text-xs text-content-muted">{t.email}</p>
                </div>
              </div>
            ),
          },
          {
            header: 'Assigned Schools & Grades',
            cell: t => (
              <div className="space-y-1">
                {t.assignedSchools.length > 0 ? (
                  t.assignedSchools.map(as => (
                    <div key={as.id} className="text-xs">
                      <span className="font-medium text-content-heading">{as.schoolName}:</span>{' '}
                      <span className="text-content-muted">{as.grades.join(', ')}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-content-muted italic">Unassigned</span>
                )}
              </div>
            ),
          },
          {
            header: 'Specialties',
            cell: t => (
              <div className="flex flex-wrap gap-1 max-w-xs">
                {t.specialties.map(spec => (
                  <Badge key={spec} variant="default" size="sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            ),
          },
          {
            header: 'Rating & Volume',
            cell: t => (
              <div className="text-xs">
                <div className="flex items-center gap-1 text-amber-700 font-semibold">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{t.rating.toFixed(1)} / 5.0</span>
                </div>
                <p className="text-content-muted mt-0.5">{t.totalLessonsDelivered} sessions</p>
              </div>
            ),
          },
          {
            header: 'Status',
            cell: t => <StatusBadge status={t.status} size="sm" />,
          },
          {
            header: 'Actions',
            className: 'text-right',
            cell: t => (
              <div
                className="flex items-center justify-end gap-1.5"
                onClick={e => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTutor(t);
                    setIsDetailModalOpen(true);
                  }}
                >
                  Details
                </Button>
                {t.status === 'active' ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setTutorToDeactivate(t);
                      setIsConfirmDeactivateOpen(true);
                    }}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-700 hover:bg-emerald-50"
                    onClick={() => updateTutor(t.id, { status: 'active' })}
                  >
                    Activate
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredTutors.length}
        pageSize={pageSize}
        onPageChange={p => setCurrentPage(p)}
      />

      {/* Tutor Profile Detail Modal */}
      {selectedTutor && (
        <Dialog
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedTutor.name}
          description={`Faculty ID #${selectedTutor.id} • Joined ${selectedTutor.hireDate}`}
          size="lg"
          footer={
            <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          }
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-subtle border border-surface-border">
              <Avatar name={selectedTutor.name} src={selectedTutor.avatarUrl} size="xl" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-content-heading">{selectedTutor.name}</h3>
                  <StatusBadge status={selectedTutor.status} size="sm" />
                </div>
                <p className="text-xs text-content-muted">{selectedTutor.email} • {selectedTutor.phone}</p>
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {selectedTutor.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-content-subtle">•</span>
                  <span className="text-content-muted">{selectedTutor.totalLessonsDelivered} delivered sessions</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
                Biography & Pedagogy
              </h4>
              <p className="text-sm text-content-body bg-white p-3 rounded-md border border-surface-border">
                {selectedTutor.bio}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
                Curriculum Specialties
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTutor.specialties.map(spec => (
                  <Badge key={spec} variant="forest" size="md">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
                Assigned Schools & Timetable Allocations
              </h4>
              <div className="space-y-2">
                {selectedTutor.assignedSchools.map(as => (
                  <div
                    key={as.id}
                    className="flex items-center justify-between p-3 rounded-md border border-surface-border bg-white text-xs"
                  >
                    <div>
                      <p className="font-semibold text-content-heading flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-forest-700" />
                        {as.schoolName}
                      </p>
                      <p className="text-content-muted mt-0.5">
                        Grades: {as.grades.join(', ')} • Focus: {as.subjectFocus.join(', ')}
                      </p>
                    </div>
                    <StatusBadge status={as.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* Onboard Tutor Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Instructor"
        description="Add a qualified coding tutor to the faculty registry and assign schools."
        size="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveTutor}>
              Register Instructor
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveTutor} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full Name" required error={formErrors.name}>
              <Input
                placeholder="e.g. Dennis Kiprono"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </FormField>

            <FormField label="Email Address" required error={formErrors.email}>
              <Input
                type="email"
                placeholder="dennis.kiprono@codeworks.co.ke"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Phone Number" required error={formErrors.phone}>
              <Input
                placeholder="+254 711 345 678"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormField>

            <FormField label="Specialties (comma-separated)">
              <Input
                placeholder="Semantic HTML5, CSS Flexbox, JavaScript DOM"
                value={formData.specialties}
                onChange={e => setFormData({ ...formData, specialties: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Instructor Bio & Credentials" required error={formErrors.bio}>
            <Textarea
              rows={3}
              placeholder="Teaching experience, computational background, and age group specialties..."
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
            />
          </FormField>

          <div className="border-t border-surface-border pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-content-heading mb-3">
              Initial Partner School Assignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Assign to School">
                <Select
                  value={formData.selectedSchoolId}
                  onChange={e => setFormData({ ...formData, selectedSchoolId: e.target.value })}
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Grades (comma-separated)">
                <Input
                  value={formData.selectedGrades}
                  onChange={e => setFormData({ ...formData, selectedGrades: e.target.value })}
                  placeholder="Grade 8, Grade 9"
                />
              </FormField>
            </div>
          </div>
        </form>
      </Dialog>

      {/* Deactivate confirmation */}
      <ConfirmDialog
        isOpen={isConfirmDeactivateOpen}
        onClose={() => setIsConfirmDeactivateOpen(false)}
        onConfirm={handleConfirmDeactivate}
        title="Deactivate Instructor"
        message={`Are you sure you want to set ${tutorToDeactivate?.name} to inactive? They will no longer be assignable to future timetables.`}
        confirmLabel="Deactivate Tutor"
      />
    </div>
  );
};
