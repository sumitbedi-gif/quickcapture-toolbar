import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, CheckSquare, Bell, Search, Plus, ChevronRight, ArrowUpRight } from 'lucide-react';

const contacts = [
  { id: 'contact-row-1', name: 'Emily Watson', initials: 'EW', company: 'Acme Corp', status: 'Active' as const, value: '$12,400', lastActivity: '2h ago', color: 'bg-slate-700' },
  { id: 'contact-row-2', name: 'James Rivera', initials: 'JR', company: 'TechFlow Inc', status: 'Prospect' as const, value: '$8,200', lastActivity: '1d ago', color: 'bg-slate-600' },
  { id: 'contact-row-3', name: 'Sarah Chen', initials: 'SC', company: 'Blue Ocean Ltd', status: 'Active' as const, value: '$31,500', lastActivity: '4h ago', color: 'bg-slate-800' },
  { id: 'contact-row-4', name: 'Michael Park', initials: 'MP', company: 'Nexus Partners', status: 'Prospect' as const, value: '$5,700', lastActivity: '3d ago', color: 'bg-slate-600' },
  { id: 'contact-row-5', name: 'Laura Knight', initials: 'LK', company: 'Summit Ventures', status: 'Inactive' as const, value: '$0', lastActivity: '2w ago', color: 'bg-slate-400' },
];

const pipelineStages = [
  { id: 'pipeline-prospecting', label: 'Prospecting', count: 12, value: '$48,000', widthPct: 100, color: 'bg-slate-800' },
  { id: 'pipeline-proposal', label: 'Proposal', count: 8, value: '$62,000', widthPct: 67, color: 'bg-slate-800' },
  { id: 'pipeline-negotiation', label: 'Negotiation', count: 5, value: '$37,500', widthPct: 42, color: 'bg-slate-800' },
  { id: 'pipeline-closed', label: 'Closed Won', count: 3, value: '$28,400', widthPct: 25, color: 'bg-slate-800' },
];

const activities = [
  { id: 'activity-item-1', text: 'Emily Watson signed contract', time: '2m ago', dotColor: 'bg-slate-400' },
  { id: 'activity-item-2', text: 'New lead from TechFlow Inc', time: '1h ago', dotColor: 'bg-slate-400' },
  { id: 'activity-item-3', text: 'Follow-up reminder: James Rivera', time: '3h ago', dotColor: 'bg-slate-300' },
  { id: 'activity-item-4', text: 'Invoice #1047 paid — $12,400', time: 'Yesterday', dotColor: 'bg-slate-400' },
];

const statusConfig = {
  Active:   { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
  Prospect: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
  Inactive: { bg: 'bg-slate-100', text: 'text-slate-400', dot: 'bg-slate-300' },
};

const navItems = [
  { id: 'contacts', label: 'Contacts' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'reports',  label: 'Reports'  },
  { id: 'settings', label: 'Settings' },
];

interface DummyAppProps {
  onNavigate?: (page: 'main' | 'form') => void;
  currentPage: 'main' | 'form';
  isInteractable: boolean;
  onElementClick?: (elementId: string, elementLabel: string) => void;
  clickedElements?: string[];
}

export function DummyApp({
  onNavigate,
  currentPage,
  isInteractable,
  onElementClick,
  clickedElements = [],
}: DummyAppProps) {
  const [activeNav, setActiveNav] = useState('contacts');

  const handleClick = (id: string, label: string, action?: () => void) => {
    if (!isInteractable) return;
    onElementClick?.(id, label);
    action?.();
  };

  const cur = isInteractable ? 'cursor-pointer' : 'cursor-default';

  // Shared Navbar used on both pages
  const Navbar = () => (
    <nav
      data-element-id="navbar"
      className="bg-slate-900 px-8 flex items-center justify-between shrink-0 h-[56px]"
    >
      <div className="flex items-center gap-8">
        <span
          data-element-id="nav-logo"
          className={`text-white font-bold text-[17px] tracking-tight select-none ${cur}`}
          onClick={() => handleClick('nav-logo', 'Pulse logo')}
        >
          Pulse
        </span>
        <div className="flex gap-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              data-element-id={`nav-${item.id}`}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              } ${cur}`}
              onClick={() => {
                setActiveNav(item.id);
                handleClick(`nav-${item.id}`, `${item.label} nav`);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          data-element-id="search-button"
          className={`p-2 text-slate-400 hover:text-white rounded-md transition-colors ${cur}`}
          onClick={() => handleClick('search-button', 'Search button')}
        >
          <Search className="w-4 h-4" />
        </button>
        <button
          data-element-id="notifications-button"
          className={`relative p-2 text-slate-400 hover:text-white rounded-md transition-colors ${cur}`}
          onClick={() => handleClick('notifications-button', 'Notifications')}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full" />
        </button>
        <button
          data-element-id="new-contact-button"
          className={`flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors ml-1 ${cur}`}
          onClick={() => handleClick('new-contact-button', 'New Contact', () => onNavigate?.('form'))}
        >
          <Plus className="w-3.5 h-3.5" />
          New Contact
        </button>
        <div
          data-element-id="user-avatar"
          className={`w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-semibold text-white ${cur}`}
          onClick={() => handleClick('user-avatar', 'User profile')}
        >
          SB
        </div>
      </div>
    </nav>
  );

  // ─── FORM PAGE ────────────────────────────────────────────────────────────
  if (currentPage === 'form') {
    return (
      <div className="flex flex-col h-full w-full bg-slate-50">
        <Navbar />

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl mx-auto">
            <button
              data-element-id="back-button"
              className={`mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors ${cur}`}
              onClick={() => handleClick('back-button', 'Back to Contacts', () => onNavigate?.('main'))}
            >
              ← Back to Contacts
            </button>

            <div
              data-element-id="form-container"
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div
                data-element-id="form-header"
                className="px-8 py-6 border-b border-slate-100"
              >
                <h1 className="text-xl font-semibold text-slate-900">Add New Contact</h1>
                <p className="text-slate-500 text-sm mt-1">Fill in the details to create a new CRM contact.</p>
              </div>

              <div className="px-8 py-6 space-y-5">
                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      data-element-id="label-firstname"
                      className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                      onClick={() => handleClick('label-firstname', 'First Name label')}
                    >
                      First Name
                    </label>
                    <input
                      data-element-id="field-firstname"
                      type="text"
                      placeholder="e.g. Emily"
                      readOnly
                      className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                      onClick={(e) => { e.stopPropagation(); handleClick('field-firstname', 'First Name field'); }}
                    />
                  </div>
                  <div>
                    <label
                      data-element-id="label-lastname"
                      className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                      onClick={() => handleClick('label-lastname', 'Last Name label')}
                    >
                      Last Name
                    </label>
                    <input
                      data-element-id="field-lastname"
                      type="text"
                      placeholder="e.g. Watson"
                      readOnly
                      className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                      onClick={(e) => { e.stopPropagation(); handleClick('field-lastname', 'Last Name field'); }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    data-element-id="label-email"
                    className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                    onClick={() => handleClick('label-email', 'Email label')}
                  >
                    Email Address
                  </label>
                  <input
                    data-element-id="field-email"
                    type="email"
                    placeholder="you@company.com"
                    readOnly
                    className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                    onClick={(e) => { e.stopPropagation(); handleClick('field-email', 'Email field'); }}
                  />
                </div>

                {/* Company + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      data-element-id="label-company"
                      className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                      onClick={() => handleClick('label-company', 'Company label')}
                    >
                      Company
                    </label>
                    <input
                      data-element-id="field-company"
                      type="text"
                      placeholder="e.g. Acme Corp"
                      readOnly
                      className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                      onClick={(e) => { e.stopPropagation(); handleClick('field-company', 'Company field'); }}
                    />
                  </div>
                  <div>
                    <label
                      data-element-id="label-phone"
                      className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                      onClick={() => handleClick('label-phone', 'Phone label')}
                    >
                      Phone Number
                    </label>
                    <input
                      data-element-id="field-phone"
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      readOnly
                      className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                      onClick={(e) => { e.stopPropagation(); handleClick('field-phone', 'Phone field'); }}
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label
                    data-element-id="label-role"
                    className={`block text-sm font-medium text-slate-700 mb-1.5 ${cur}`}
                    onClick={() => handleClick('label-role', 'Role label')}
                  >
                    Role / Title
                  </label>
                  <input
                    data-element-id="field-role"
                    type="text"
                    placeholder="e.g. VP of Sales"
                    readOnly
                    className={`w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${cur}`}
                    onClick={(e) => { e.stopPropagation(); handleClick('field-role', 'Role field'); }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  data-element-id="cancel-button"
                  className={`px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors ${cur}`}
                  onClick={() => handleClick('cancel-button', 'Cancel button', () => onNavigate?.('main'))}
                >
                  Cancel
                </button>
                <button
                  data-element-id="save-button"
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors ${cur}`}
                  onClick={() => handleClick('save-button', 'Save Contact', () => onNavigate?.('main'))}
                >
                  Save Contact
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD PAGE ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="px-8 py-7 max-w-[1400px] mx-auto">

          {/* Welcome header */}
          <div
            data-element-id="welcome-section"
            className="mb-7 flex items-start justify-between"
          >
            <div>
              <h1
                data-element-id="welcome-heading"
                className={`text-2xl font-semibold text-slate-900 ${cur}`}
                onClick={() => handleClick('welcome-heading', 'Welcome heading')}
              >
                Good morning, Sarah ⚡
              </h1>
              <p
                data-element-id="welcome-subtitle"
                className={`text-slate-500 text-sm mt-1 ${cur}`}
                onClick={() => handleClick('welcome-subtitle', 'Dashboard subtitle')}
              >
                Your pipeline is looking strong — 47 open deals, 8 closing this week.
              </p>
            </div>
            <div
              data-element-id="date-badge"
              className={`text-sm text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg ${cur}`}
              onClick={() => handleClick('date-badge', 'Date badge')}
            >
              Wed, Mar 5, 2026
            </div>
          </div>

          {/* Stats row */}
          <div
            data-element-id="stats-row"
            className="grid grid-cols-4 gap-5 mb-7"
          >
            {[
              { id: 'stat-contacts-card', label: 'Total Contacts', value: '1,284', change: '+24 this week',         changeColor: 'text-slate-500', Icon: Users,       iconBg: 'bg-slate-50', iconColor: 'text-slate-500' },
              { id: 'stat-deals-card',    label: 'Open Deals',     value: '47',   change: '8 closing soon',        changeColor: 'text-slate-500', Icon: TrendingUp,  iconBg: 'bg-slate-50', iconColor: 'text-slate-500' },
              { id: 'stat-revenue-card',  label: 'Revenue MTD',    value: '$128,500', change: '↑ 12.4% vs last month', changeColor: 'text-slate-500', Icon: DollarSign,  iconBg: 'bg-slate-50', iconColor: 'text-slate-500' },
              { id: 'stat-tasks-card',    label: 'Active Tasks',   value: '13',   change: '4 overdue',              changeColor: 'text-slate-400', Icon: CheckSquare, iconBg: 'bg-slate-50', iconColor: 'text-slate-500' },
            ].map(({ id, label, value, change, changeColor, Icon, iconBg, iconColor }) => (
              <div
                key={id}
                data-element-id={id}
                className={`bg-white rounded-xl border border-slate-100 shadow-sm p-5 ${isInteractable ? 'hover:border-slate-200 transition-colors cursor-pointer' : ''}`}
                onClick={() => handleClick(id, `${label} stat card`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-500">{label}</span>
                  <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className={`text-xs ${changeColor} mt-1`}>{change}</div>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-[1fr_360px] gap-5">

            {/* Contacts table */}
            <div
              data-element-id="contacts-section"
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2
                    data-element-id="contacts-title"
                    className={`font-semibold text-slate-900 ${cur}`}
                    onClick={() => handleClick('contacts-title', 'Contacts title')}
                  >
                    Recent Contacts
                  </h2>
                  <p
                    data-element-id="contacts-subtitle"
                    className={`text-xs text-slate-400 mt-0.5 ${cur}`}
                    onClick={() => handleClick('contacts-subtitle', 'Contacts subtitle')}
                  >
                    5 most recent
                  </p>
                </div>
                <button
                  data-element-id="contacts-view-all"
                  className={`text-xs text-indigo-600 font-medium hover:text-indigo-500 flex items-center gap-1 ${cur}`}
                  onClick={() => handleClick('contacts-view-all', 'View all contacts')}
                >
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Table header */}
              <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 grid grid-cols-[2fr_1.5fr_110px_90px] gap-4">
                {[
                  { id: 'col-name',    label: 'Name'       },
                  { id: 'col-company', label: 'Company'    },
                  { id: 'col-status',  label: 'Status'     },
                  { id: 'col-value',   label: 'Deal Value' },
                ].map(col => (
                  <div
                    key={col.id}
                    data-element-id={col.id}
                    className={`text-xs font-medium text-slate-500 uppercase tracking-wide ${col.id === 'col-value' ? 'text-right' : ''} ${cur}`}
                    onClick={() => handleClick(col.id, `${col.label} column header`)}
                  >
                    {col.label}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div data-element-id="contacts-table">
                {contacts.map((contact, i) => {
                  const s = statusConfig[contact.status];
                  return (
                    <div
                      key={contact.id}
                      data-element-id={contact.id}
                      className={`px-6 py-4 grid grid-cols-[2fr_1.5fr_110px_90px] gap-4 items-center transition-colors ${
                        i < contacts.length - 1 ? 'border-b border-slate-50' : ''
                      } ${isInteractable ? 'hover:bg-slate-50/70 cursor-pointer' : ''}`}
                      onClick={() => handleClick(contact.id, `${contact.name} contact row`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${contact.color} rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0`}>
                          {contact.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{contact.name}</div>
                          <div className="text-xs text-slate-400">{contact.lastActivity}</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">{contact.company}</div>
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {contact.status}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-700 text-right">{contact.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">

              {/* Pipeline Overview */}
              <div
                data-element-id="pipeline-section"
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-6"
              >
                <h2
                  data-element-id="pipeline-title"
                  className={`font-semibold text-slate-900 mb-0.5 ${cur}`}
                  onClick={() => handleClick('pipeline-title', 'Pipeline title')}
                >
                  Pipeline Overview
                </h2>
                <p
                  data-element-id="pipeline-subtitle"
                  className={`text-xs text-slate-400 mb-5 ${cur}`}
                  onClick={() => handleClick('pipeline-subtitle', 'Pipeline subtitle')}
                >
                  $175,900 total pipeline value
                </p>
                <div className="space-y-4">
                  {pipelineStages.map(stage => (
                    <div
                      key={stage.id}
                      data-element-id={stage.id}
                      className={`group ${cur}`}
                      onClick={() => handleClick(stage.id, `${stage.label} pipeline stage`)}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                          {stage.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {stage.count} · {stage.value}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stage.color} rounded-full`}
                          style={{ width: `${stage.widthPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div
                data-element-id="activity-section"
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex-1"
              >
                <h2
                  data-element-id="activity-title"
                  className={`font-semibold text-slate-900 mb-4 ${cur}`}
                  onClick={() => handleClick('activity-title', 'Activity title')}
                >
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {activities.map(item => (
                    <div
                      key={item.id}
                      data-element-id={item.id}
                      className={`flex items-start gap-3 ${isInteractable ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}`}
                      onClick={() => handleClick(item.id, item.text)}
                    >
                      <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.dotColor}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{item.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
