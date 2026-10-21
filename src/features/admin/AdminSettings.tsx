import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/ui/FormField';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { CheckCircle, Shield, Bell, Building, Database } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { currentUser } = useApp();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [orgData, setOrgData] = useState({
    orgName: 'Codeworks Academy Kenya (Nakuru Hub)',
    orgEmail: 'ops@codeworks.co.ke',
    activeTerm: 'Term 3 2026 (CBC)',
    maxTutorLoad: '25',
    currency: 'KES (KSh)',
  });

  const [notifPreferences, setNotifPreferences] = useState({
    emailOnReport: true,
    emailOnSubmission: true,
    weeklyDigest: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Organization & Regional Settings"
        description="Configure academic terms, regional office contact, notification rules, and database connection."
      />

      {saveSuccess && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Platform settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Information */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-surface-border pb-3">
            <Building className="h-4 w-4 text-forest-700" />
            <h3 className="text-sm font-bold text-content-heading">Organization Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Organization Name">
              <Input
                value={orgData.orgName}
                onChange={e => setOrgData({ ...orgData, orgName: e.target.value })}
              />
            </FormField>

            <FormField label="Operational Contact Email">
              <Input
                type="email"
                value={orgData.orgEmail}
                onChange={e => setOrgData({ ...orgData, orgEmail: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Active Academic Term">
              <Select
                value={orgData.activeTerm}
                onChange={e => setOrgData({ ...orgData, activeTerm: e.target.value })}
              >
                <option value="Term 3 2026 (CBC)">Term 3 2026 (CBC: Sep - Nov)</option>
                <option value="Term 1 2027 (CBC)">Term 1 2027 (CBC: Jan - Apr)</option>
                <option value="Term 2 2027 (CBC)">Term 2 2027 (CBC: May - Aug)</option>
              </Select>
            </FormField>

            <FormField label="Weekly Session Cap Per Tutor">
              <Input
                type="number"
                value={orgData.maxTutorLoad}
                onChange={e => setOrgData({ ...orgData, maxTutorLoad: e.target.value })}
              />
            </FormField>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-surface-border pb-3">
            <Bell className="h-4 w-4 text-forest-700" />
            <h3 className="text-sm font-bold text-content-heading">Notification Dispatch Rules</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={notifPreferences.emailOnReport}
                onChange={e => setNotifPreferences({ ...notifPreferences, emailOnReport: e.target.checked })}
                className="h-4 w-4 rounded border-surface-border text-forest-700 focus:ring-forest-600"
              />
              <span className="text-content-body font-medium">
                Dispatch instant alert when a tutor files a lesson report
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={notifPreferences.emailOnSubmission}
                onChange={e => setNotifPreferences({ ...notifPreferences, emailOnSubmission: e.target.checked })}
                className="h-4 w-4 rounded border-surface-border text-forest-700 focus:ring-forest-600"
              />
              <span className="text-content-body font-medium">
                Dispatch notifications when a student submits a coding milestone project
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={notifPreferences.weeklyDigest}
                onChange={e => setNotifPreferences({ ...notifPreferences, weeklyDigest: e.target.checked })}
                className="h-4 w-4 rounded border-surface-border text-forest-700 focus:ring-forest-600"
              />
              <span className="text-content-body font-medium">
                Send weekly cross-school executive attendance and progress summary
              </span>
            </label>
          </div>
        </div>

        {/* Database & API Configuration Info */}
        <div className="rounded-lg border border-surface-border bg-surface-card p-5 shadow-subtle space-y-3">
          <div className="flex items-center gap-2 border-b border-surface-border pb-3">
            <Database className="h-4 w-4 text-forest-700" />
            <h3 className="text-sm font-bold text-content-heading">API & Database Connection Configuration</h3>
          </div>

          <p className="text-xs text-content-muted leading-relaxed">
            Service interfaces are isolated in <code className="text-forest-800 bg-forest-50 px-1 py-0.5 rounded font-mono">src/services/*</code> for environment configuration:
          </p>

          <div className="rounded-md bg-surface-subtle p-3 text-xs font-mono text-content-heading border border-surface-border space-y-1">
            <p>VITE_API_URL=http://localhost:5000/api/v1</p>
            <p>DATABASE_URL=postgresql://codeworks_ke:secret@localhost:5432/codeworks_nakuru_db</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
