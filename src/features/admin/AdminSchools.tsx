import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchBar } from '../../components/ui/SearchBar';
import { FilterBar } from '../../components/ui/FilterBar';
import { DataTable } from '../../components/ui/DataTable';
import { Pagination } from '../../components/ui/Pagination';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { Dialog } from '../../components/ui/Dialog';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { School, GradeLevel } from '../../types';
import { Plus, Building2, MapPin, Mail, Phone, Users, BookOpen } from 'lucide-react';

export const AdminSchools: React.FC = () => {
  const { schools, tutors, addSchool, updateSchool } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    gradesOffered: 'Grade 8, Grade 9, Grade 10',
    assignedTutorId: tutors[0]?.id || '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredSchools = schools.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.activeStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      code: '',
      address: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      gradesOffered: 'Grade 8, Grade 9, Grade 10',
      assignedTutorId: tutors[0]?.id || '',
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleSaveSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'School name is required';
    if (!formData.code.trim()) errors.code = 'School code is required (e.g. OAK-01)';
    if (!formData.address.trim()) errors.address = 'Campus address is required';
    if (!formData.contactPerson.trim()) errors.contactPerson = 'Primary contact name is required';
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@'))
      errors.contactEmail = 'Valid contact email is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const gradesArray = formData.gradesOffered
      .split(',')
      .map(g => g.trim() as GradeLevel)
      .filter(Boolean);

    addSchool({
      name: formData.name,
      code: formData.code.toUpperCase(),
      address: formData.address,
      contactPerson: formData.contactPerson,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone || '+1 (555) 000-0000',
      gradesOffered: gradesArray,
      activeStatus: 'active',
      assignedTutorIds: formData.assignedTutorId ? [formData.assignedTutorId] : [],
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partner Schools & Campuses"
        description="Partner educational institutions, campus administrators, grade offerings, and tutor allocations."
        actions={
          <Button onClick={handleOpenAddModal} leftIcon={<Plus className="h-4 w-4" />}>
            Add Partner School
          </Button>
        }
      />

      <FilterBar
        isFiltered={searchQuery !== '' || statusFilter !== 'all'}
        onReset={() => {
          setSearchQuery('');
          setStatusFilter('all');
          setCurrentPage(1);
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={val => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search school name, code, contact, address..."
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
            <option value="inactive">Inactive</option>
          </Select>
        </div>
      </FilterBar>

      <DataTable
        data={paginatedSchools}
        keyExtractor={s => s.id}
        onRowClick={s => {
          setSelectedSchool(s);
          setIsDetailModalOpen(true);
        }}
        columns={[
          {
            header: 'School & Code',
            cell: s => (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700 border border-forest-100">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-content-heading">{s.name}</p>
                  <p className="text-xs text-content-muted font-mono">{s.code} • {s.address.split(',')[1] || s.address}</p>
                </div>
              </div>
            ),
          },
          {
            header: 'Enrolled Students',
            cell: s => (
              <div className="text-xs">
                <span className="font-bold text-content-heading">{s.enrolledStudentsCount}</span>
                <span className="text-content-muted ml-1">students</span>
              </div>
            ),
          },
          {
            header: 'Grades Offered',
            cell: s => (
              <div className="flex flex-wrap gap-1 max-w-xs">
                {s.gradesOffered.map(g => (
                  <Badge key={g} variant="default" size="sm">
                    {g}
                  </Badge>
                ))}
              </div>
            ),
          },
          {
            header: 'Assigned Tutors',
            cell: s => {
              const assigned = tutors.filter(t =>
                t.assignedSchools.some(as => as.schoolId === s.id)
              );
              return (
                <div className="text-xs space-y-0.5">
                  {assigned.length > 0 ? (
                    assigned.map(t => (
                      <p key={t.id} className="text-content-body font-medium">
                        {t.name}
                      </p>
                    ))
                  ) : (
                    <span className="text-content-muted italic">None assigned</span>
                  )}
                </div>
              );
            },
          },
          {
            header: 'Status',
            cell: s => <StatusBadge status={s.activeStatus} size="sm" />,
          },
          {
            header: 'Actions',
            className: 'text-right',
            cell: s => (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedSchool(s);
                  setIsDetailModalOpen(true);
                }}
              >
                Inspect
              </Button>
            ),
          },
        ]}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredSchools.length}
        pageSize={pageSize}
        onPageChange={p => setCurrentPage(p)}
      />

      {/* School details modal */}
      {selectedSchool && (
        <Dialog
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedSchool.name}
          description={`Partner Code ${selectedSchool.code} • Registered ${selectedSchool.createdAt}`}
          size="lg"
          footer={
            <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-surface-border bg-surface-subtle p-3.5 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                  Campus Location
                </span>
                <p className="text-sm font-semibold text-content-heading flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-forest-700" />
                  {selectedSchool.address}
                </p>
              </div>

              <div className="rounded-lg border border-surface-border bg-surface-subtle p-3.5 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                  Administrative Contact
                </span>
                <p className="text-sm font-semibold text-content-heading">{selectedSchool.contactPerson}</p>
                <p className="text-xs text-content-muted flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {selectedSchool.contactEmail}
                </p>
                <p className="text-xs text-content-muted flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {selectedSchool.contactPhone}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-2">
                Active Coding Tutors Assigned
              </h4>
              <div className="space-y-2">
                {tutors
                  .filter(t => t.assignedSchools.some(as => as.schoolId === selectedSchool.id))
                  .map(t => {
                    const assignment = t.assignedSchools.find(as => as.schoolId === selectedSchool.id);
                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-surface-border bg-white text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <Users className="h-4 w-4 text-forest-700" />
                          <div>
                            <p className="font-semibold text-content-heading">{t.name}</p>
                            <p className="text-content-muted">
                              {t.specialties.join(', ')} • {t.rating.toFixed(1)} Rating
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100">
                          {assignment?.grades.join(', ')}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* Add School Modal */}
      <Dialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Partner School"
        description="Register a new academic partner institution and define grade levels."
        size="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveSchool}>
              Save School
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveSchool} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="School Name" required error={formErrors.name}>
              <Input
                placeholder="e.g. Shah Lalji Nangpar Academy (SLNA)"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </FormField>

            <FormField label="School Code" required error={formErrors.code}>
              <Input
                placeholder="e.g. SLN-05"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
              />
            </FormField>
          </div>

          <FormField label="Campus Street Address" required error={formErrors.address}>
            <Input
              placeholder="e.g. Section 58, Nakuru City, Nakuru County"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Contact Person" required error={formErrors.contactPerson}>
              <Input
                placeholder="e.g. Mwalimu Peter Kamau"
                value={formData.contactPerson}
                onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </FormField>

            <FormField label="Contact Email" required error={formErrors.contactEmail}>
              <Input
                type="email"
                placeholder="admin@slna.ac.ke"
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </FormField>

            <FormField label="Contact Phone">
              <Input
                placeholder="+254 722 550 123"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-surface-border pt-3">
            <FormField label="Grades Offered (comma-separated)">
              <Input
                placeholder="Grade 8, Grade 9, Grade 10"
                value={formData.gradesOffered}
                onChange={e => setFormData({ ...formData, gradesOffered: e.target.value })}
              />
            </FormField>

            <FormField label="Initial Assigned Lead Tutor">
              <Select
                value={formData.assignedTutorId}
                onChange={e => setFormData({ ...formData, assignedTutorId: e.target.value })}
              >
                {tutors.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.specialties[0]})
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
