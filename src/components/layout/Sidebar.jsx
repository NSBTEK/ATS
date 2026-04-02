import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Briefcase, Users, Building2, UserCircle,
  Send, Calendar, Award, Activity as ActivityIcon, ChevronLeft, ChevronRight,
  Clock, DollarSign, FileText, UserCheck, ShieldCheck, LogOut, Columns3, Plug,
  Sparkles, ScanText, Globe, KeyRound
} from 'lucide-react';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { canView } from '@/lib/permissions';
import { localClient } from '@/api/localClient';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navSections = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', module: null },
    ]
  },
  {
    label: 'ATS',
    items: [
      { icon: Briefcase, label: 'Jobs', path: '/jobs', module: 'jobs' },
      { icon: Users, label: 'Candidates', path: '/candidates', module: 'candidates' },
      { icon: Send, label: 'Submissions', path: '/submissions', module: 'submissions' },
      { icon: Calendar, label: 'Interviews', path: '/interviews', module: 'interviews' },
      { icon: Award, label: 'Placements', path: '/placements', module: 'placements' },
    ]
  },
  {
    label: 'CRM',
    items: [
      { icon: Building2, label: 'Clients', path: '/clients', module: 'clients' },
      { icon: UserCircle, label: 'Contacts', path: '/contacts', module: 'contacts' },
      { icon: ActivityIcon, label: 'Activities', path: '/activities', module: 'activities' },
    ]
  },
  {
    label: 'Workforce',
    items: [
      { icon: Clock, label: 'Timesheets', path: '/workforce/timesheets', module: 'timesheets' },
      { icon: DollarSign, label: 'Expenses', path: '/workforce/expenses', module: 'expenses' },
      { icon: FileText, label: 'Contracts', path: '/workforce/contracts', module: 'contracts' },
      { icon: UserCheck, label: 'Onboarding', path: '/workforce/onboarding', module: 'onboarding' },
      { icon: DollarSign, label: 'Payroll', path: '/workforce/payroll', module: 'contracts' },
    ]
  },
  {
    label: 'AI & Tools',
    items: [
      { icon: Sparkles, label: 'AI Assistant', path: '/ai-assistant', module: null },
      { icon: ScanText, label: 'Resume Parser', path: '/resume-parser', module: 'candidates' },
      { icon: Building2, label: 'Client Billing', path: '/client-billing', module: 'clients' },
      { icon: KeyRound, label: 'Request Access', path: '/request-access', module: null },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useCurrentUser();

  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';

  return (
    <aside className={cn(
      "h-screen flex flex-col transition-all duration-300 sticky top-0 shrink-0",
      "border-r",
      collapsed ? "w-[64px]" : "w-[236px]"
    )}
      style={{ background: 'hsl(228, 40%, 13%)', borderColor: 'hsl(228, 30%, 20%)' }}
    >
      {/* Logo */}
      <div className="h-[58px] flex items-center px-4 gap-3 shrink-0"
        style={{ borderBottom: '1px solid hsl(228, 30%, 20%)' }}>
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, hsl(238,85%,70%), hsl(238,75%,52%))' }}>
          {/* Abstract S logo */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14 5.5C14 4.12 12.88 3 11.5 3H7.5C6.12 3 5 4.12 5 5.5C5 6.88 6.12 8 7.5 8H12.5C13.88 8 15 9.12 15 10.5C15 11.88 13.88 13 12.5 13H7C5.9 13 5 12.1 5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M10 13V17" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
            <path d="M10 3V1" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white">NSBTEK StaffFlow</span>
            <p className="text-[9px] tracking-widest uppercase font-medium" style={{ color: 'hsl(238,60%,75%)' }}>Workforce Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1" style={{ padding: collapsed ? '16px 8px' : '16px 10px' }}>
        {navSections.map((section) => {
          const visibleItems = section.items.filter(item =>
            item.module === null || canView(user, item.module)
          );
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.label} className="mb-2">
              {!collapsed && (
                <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] mb-1.5 px-2.5"
                  style={{ color: 'hsl(220,20%,42%)' }}>
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150 group",
                        collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2",
                        isActive
                          ? "text-white shadow-sm"
                          : "hover:text-white"
                      )}
                      style={isActive
                        ? { background: 'linear-gradient(90deg, hsl(238,75%,60%), hsl(238,75%,54%))', boxShadow: '0 2px 8px hsla(238,75%,56%,0.35)' }
                        : { color: 'hsl(220,20%,72%)' }
                      }
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'hsl(228,30%,20%)'; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = ''; }}
                    >
                      <item.icon className={cn("shrink-0 transition-colors", collapsed ? "w-5 h-5" : "w-4 h-4")}
                        style={isActive ? { color: 'white' } : { color: 'hsl(220,20%,60%)' }} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Landing page link */}
        <div className="mb-2">
          <Link to="/" title={collapsed ? 'Public Site' : undefined}
            className={cn("flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150",
              collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2")}
            style={{ color: 'hsl(220,20%,60%)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'hsl(228,30%,20%)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'hsl(220,20%,60%)'; }}>
            <Globe className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} style={{ color: 'hsl(220,20%,60%)' }} />
            {!collapsed && <span>Public Website</span>}
          </Link>
        </div>

        {user?.role === 'admin' && (
          <div className="mb-2">
            {!collapsed && (
              <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] mb-1.5 px-2.5"
                style={{ color: 'hsl(220,20%,42%)' }}>
                Admin
              </p>
            )}
            {[
              { to: '/admin/users', label: 'Users & Permissions', icon: ShieldCheck },
              { to: '/admin/columns', label: 'Column Settings', icon: Columns3 },
              { to: '/admin/integrations', label: 'Integrations', icon: Plug },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5",
                  collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2",
                  location.pathname === to ? "text-white shadow-sm" : "hover:text-white"
                )}
                style={location.pathname === to
                  ? { background: 'linear-gradient(90deg, hsl(238,75%,60%), hsl(238,75%,54%))', boxShadow: '0 2px 8px hsla(238,75%,56%,0.35)' }
                  : { color: 'hsl(220,20%,72%)' }
                }
                onMouseEnter={e => { if (location.pathname !== to) e.currentTarget.style.background = 'hsl(228,30%,20%)'; }}
                onMouseLeave={e => { if (location.pathname !== to) e.currentTarget.style.background = ''; }}
              >
                <Icon className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")}
                  style={{ color: location.pathname === to ? 'white' : 'hsl(220,20%,60%)' }} />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="shrink-0 p-2 space-y-1" style={{ borderTop: '1px solid hsl(228,30%,20%)' }}>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg" style={{ background: 'hsl(228,35%,17%)' }}>
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="text-[10px] font-bold" style={{ background: 'hsl(238,60%,36%)', color: 'hsl(238,100%,88%)' }}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-white">{user.full_name || 'User'}</p>
              <p className="text-[10px] truncate capitalize" style={{ color: 'hsl(220,20%,50%)' }}>{user.role || 'viewer'}</p>
            </div>
            <button
              onClick={() => localClient.auth.logout()}
              className="p-1.5 rounded-md transition-colors"
              style={{ color: 'hsl(220,20%,50%)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'hsl(228,30%,24%)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'hsl(220,20%,50%)'; }}
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-1.5 rounded-lg transition-colors"
          style={{ color: 'hsl(220,20%,45%)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'hsl(228,30%,20%)'; e.currentTarget.style.color = 'hsl(220,20%,75%)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'hsl(220,20%,45%)'; }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}