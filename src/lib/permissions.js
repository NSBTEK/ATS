// Default permissions per role
export const ROLE_DEFAULTS = {
  admin: {
    jobs: 'edit', candidates: 'edit', submissions: 'edit', interviews: 'edit',
    placements: 'edit', clients: 'edit', contacts: 'edit', activities: 'edit',
    timesheets: 'edit', expenses: 'edit', contracts: 'edit', onboarding: 'edit'
  },
  manager: {
    jobs: 'edit', candidates: 'edit', submissions: 'edit', interviews: 'edit',
    placements: 'edit', clients: 'edit', contacts: 'edit', activities: 'edit',
    timesheets: 'edit', expenses: 'edit', contracts: 'view', onboarding: 'edit'
  },
  recruiter: {
    jobs: 'edit', candidates: 'edit', submissions: 'edit', interviews: 'edit',
    placements: 'view', clients: 'view', contacts: 'view', activities: 'edit',
    timesheets: 'none', expenses: 'none', contracts: 'none', onboarding: 'none'
  },
  sales: {
    jobs: 'view', candidates: 'view', submissions: 'view', interviews: 'none',
    placements: 'none', clients: 'edit', contacts: 'edit', activities: 'edit',
    timesheets: 'none', expenses: 'none', contracts: 'none', onboarding: 'none'
  },
  workforce_manager: {
    jobs: 'none', candidates: 'view', submissions: 'none', interviews: 'none',
    placements: 'view', clients: 'view', contacts: 'none', activities: 'none',
    timesheets: 'edit', expenses: 'edit', contracts: 'edit', onboarding: 'edit'
  },
  // Employee: can only submit their own timesheets/expenses — data filtered server-side by email
  employee: {
    jobs: 'none', candidates: 'none', submissions: 'none', interviews: 'none',
    placements: 'none', clients: 'none', contacts: 'none', activities: 'none',
    timesheets: 'own', expenses: 'own', contracts: 'view_own', onboarding: 'view_own'
  },
  viewer: {
    jobs: 'view', candidates: 'view', submissions: 'view', interviews: 'view',
    placements: 'view', clients: 'view', contacts: 'view', activities: 'view',
    timesheets: 'view', expenses: 'view', contracts: 'view', onboarding: 'view'
  }
};

export function getEffectivePermissions(user) {
  if (!user) return ROLE_DEFAULTS.viewer;
  if (user.role === 'admin') return ROLE_DEFAULTS.admin;
  const roleDefaults = ROLE_DEFAULTS[user.role] || ROLE_DEFAULTS.viewer;
  return { ...roleDefaults, ...(user.permissions || {}) };
}

export function canView(user, module) {
  if (!user) return false;
  if (user.status === 'deactivated') return false;
  const p = getEffectivePermissions(user);
  return ['view', 'edit', 'own', 'view_own'].includes(p[module]);
}

export function isDeactivated(user) {
  return user?.status === 'deactivated';
}

export function canEdit(user, module) {
  if (!user) return false;
  if (user.status === 'deactivated') return false;
  const p = getEffectivePermissions(user);
  return p[module] === 'edit' || p[module] === 'own';
}

// True if this user can only see their own records (employee role)
export function isOwnOnly(user, module) {
  if (!user) return false;
  const p = getEffectivePermissions(user);
  return p[module] === 'own' || p[module] === 'view_own';
}

// True if user can see ALL records (admin, manager, workforce_manager)
export function canViewAll(user, module) {
  if (!user) return false;
  return !isOwnOnly(user, module) && canView(user, module);
}

export const MODULES = [
  { key: 'jobs', label: 'Jobs', section: 'ATS' },
  { key: 'candidates', label: 'Candidates', section: 'ATS' },
  { key: 'submissions', label: 'Submissions', section: 'ATS' },
  { key: 'interviews', label: 'Interviews', section: 'ATS' },
  { key: 'placements', label: 'Placements', section: 'ATS' },
  { key: 'clients', label: 'Clients', section: 'CRM' },
  { key: 'contacts', label: 'Contacts', section: 'CRM' },
  { key: 'activities', label: 'Activities', section: 'CRM' },
  { key: 'timesheets', label: 'Timesheets', section: 'Workforce' },
  { key: 'expenses', label: 'Expenses', section: 'Workforce' },
  { key: 'contracts', label: 'Contracts', section: 'Workforce' },
  { key: 'onboarding', label: 'Onboarding', section: 'Workforce' },
];

export const ROLES = [
  { value: 'admin', label: 'Admin', desc: 'Full access to everything' },
  { value: 'manager', label: 'Manager', desc: 'Full ATS + CRM + Workforce (all employees)' },
  { value: 'recruiter', label: 'Recruiter', desc: 'ATS modules only' },
  { value: 'sales', label: 'Sales', desc: 'CRM modules only' },
  { value: 'workforce_manager', label: 'Workforce Manager', desc: 'Workforce + Placements (all employees)' },
  { value: 'employee', label: 'Employee', desc: 'Submit own timesheets & expenses only' },
  { value: 'viewer', label: 'Viewer', desc: 'Read-only access to all modules' },
];