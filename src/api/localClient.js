// Local data layer replacing Base44 SDK
// Uses localStorage for persistence with full CRUD support

const genId = () => `${Date.now()}_${Math.random().toString(36).slice(2,9)}`;

const getStore = (entity) => {
  try {
    return JSON.parse(localStorage.getItem(`nsbtek_${entity}`) || '[]');
  } catch { return []; }
};

const setStore = (entity, data) => {
  localStorage.setItem(`nsbtek_${entity}`, JSON.stringify(data));
};

const seedIfEmpty = (entity, seedData) => {
  const existing = getStore(entity);
  if (existing.length === 0 && seedData.length > 0) {
    setStore(entity, seedData.map(d => ({ ...d, id: d.id || genId(), created_date: d.created_date || new Date().toISOString() })));
  }
};

// Seed demo data on first load
const initSeeds = () => {
  seedIfEmpty('Job', [
    { id:'j1', title:'Senior React Developer', client:'Acme Corp', location:'New York, NY', job_type:'contract', status:'open', priority:'high', positions:3, bill_rate:95, pay_rate:75, skills:'React, TypeScript, Node.js', experience_min:5, created_date:'2025-03-15T10:00:00Z' },
    { id:'j2', title:'Data Engineer', client:'TechFlow Inc', location:'Austin, TX', job_type:'full_time', status:'open', priority:'medium', positions:2, bill_rate:85, pay_rate:70, skills:'Python, Spark, Airflow', experience_min:3, created_date:'2025-03-10T10:00:00Z' },
    { id:'j3', title:'Cybersecurity Analyst', client:'SecureNet', location:'Remote', job_type:'full_time', status:'on_hold', priority:'urgent', positions:1, bill_rate:110, pay_rate:88, skills:'SIEM, Splunk, SOC', experience_min:4, created_date:'2025-03-01T10:00:00Z' },
    { id:'j4', title:'Cloud Architect', client:'FinServ Corp', location:'Chicago, IL', job_type:'contract_to_hire', status:'filled', priority:'medium', positions:1, bill_rate:130, pay_rate:100, skills:'AWS, Azure, Terraform', experience_min:7, created_date:'2025-02-20T10:00:00Z' },
  ]);
  seedIfEmpty('Candidate', [
    { id:'c1', first_name:'Alex', last_name:'Johnson', email:'alex.j@email.com', phone:'555-0101', location:'New York, NY', current_title:'Senior Developer', current_employer:'TechCo', skills:'React, TypeScript, Node.js', experience_years:6, status:'active', source:'linkedin', visa_status:'citizen', availability:'immediate', expected_rate:75, created_date:'2025-03-18T10:00:00Z' },
    { id:'c2', first_name:'Priya', last_name:'Sharma', email:'priya.s@email.com', phone:'555-0102', location:'Austin, TX', current_title:'Data Engineer', current_employer:'DataCorp', skills:'Python, Spark, SQL', experience_years:4, status:'active', source:'referral', visa_status:'h1b', availability:'2_weeks', expected_rate:70, created_date:'2025-03-16T10:00:00Z' },
    { id:'c3', first_name:'Marcus', last_name:'Williams', email:'marcus.w@email.com', phone:'555-0103', location:'Remote', current_title:'Security Analyst', current_employer:'CyberDefense', skills:'SIEM, Splunk, Python', experience_years:5, status:'active', source:'job_board', visa_status:'citizen', availability:'1_month', expected_rate:88, created_date:'2025-03-14T10:00:00Z' },
  ]);
  seedIfEmpty('Client', [
    { id:'cl1', company_name:'Acme Corp', industry:'Technology', website:'acmecorp.com', address:'123 Tech St', city:'New York', state:'NY', country:'USA', status:'active', account_manager:'hr@nsbtek.com', created_date:'2025-01-10T10:00:00Z' },
    { id:'cl2', company_name:'TechFlow Inc', industry:'Software', website:'techflow.io', city:'Austin', state:'TX', status:'active', created_date:'2025-01-15T10:00:00Z' },
    { id:'cl3', company_name:'SecureNet', industry:'Cybersecurity', city:'Remote', status:'active', created_date:'2025-02-01T10:00:00Z' },
    { id:'cl4', company_name:'FinServ Corp', industry:'Finance', city:'Chicago', state:'IL', status:'prospect', created_date:'2025-02-15T10:00:00Z' },
  ]);
  seedIfEmpty('Contact', [
    { id:'co1', first_name:'Sarah', last_name:'Miller', email:'sarah.m@acmecorp.com', phone:'555-0201', title:'HR Director', company:'Acme Corp', status:'active', created_date:'2025-01-12T10:00:00Z' },
    { id:'co2', first_name:'David', last_name:'Chen', email:'david.c@techflow.io', phone:'555-0202', title:'CTO', company:'TechFlow Inc', status:'active', created_date:'2025-01-18T10:00:00Z' },
  ]);
  seedIfEmpty('Submission', [
    { id:'s1', candidate_name:'Alex Johnson', candidate_email:'alex.j@email.com', job_title:'Senior React Developer', job_id:'j1', client_name:'Acme Corp', status:'submitted', created_date:'2025-03-19T10:00:00Z' },
    { id:'s2', candidate_name:'Priya Sharma', candidate_email:'priya.s@email.com', job_title:'Data Engineer', job_id:'j2', client_name:'TechFlow Inc', status:'interview_scheduled', created_date:'2025-03-17T10:00:00Z' },
    { id:'s3', candidate_name:'Marcus Williams', candidate_email:'marcus.w@email.com', job_title:'Cybersecurity Analyst', job_id:'j3', client_name:'SecureNet', status:'offer_extended', created_date:'2025-03-15T10:00:00Z' },
  ]);
  seedIfEmpty('Interview', [
    { id:'i1', candidate_name:'Priya Sharma', candidate_email:'priya.s@email.com', job_title:'Data Engineer', client_name:'TechFlow Inc', interview_date:'2025-04-05T14:00:00Z', interview_type:'video', status:'scheduled', created_date:'2025-03-17T10:00:00Z' },
  ]);
  seedIfEmpty('Placement', [
    { id:'p1', candidate_name:'Alex Johnson', candidate_email:'alex.j@email.com', job_title:'Cloud Architect', client_name:'FinServ Corp', start_date:'2025-03-01', end_date:'2025-09-01', bill_rate:130, pay_rate:100, status:'active', placement_type:'contract', created_date:'2025-02-25T10:00:00Z' },
  ]);
  seedIfEmpty('Activity', [
    { id:'a1', type:'call', subject:'Intro call with Sarah Miller', related_to:'Acme Corp', status:'completed', due_date:'2025-03-20T10:00:00Z', created_date:'2025-03-18T10:00:00Z' },
    { id:'a2', type:'email', subject:'Follow up on Data Engineer role', related_to:'TechFlow Inc', status:'pending', due_date:'2025-04-01T10:00:00Z', created_date:'2025-03-19T10:00:00Z' },
  ]);
  seedIfEmpty('Timesheet', [
    { id:'ts1', employee_name:'Alex Johnson', employee_email:'alex.j@email.com', client_name:'FinServ Corp', job_title:'Cloud Architect', week_start:'2025-03-17', regular_hours:40, overtime_hours:0, bill_rate:130, pay_rate:100, status:'pending', created_date:'2025-03-22T10:00:00Z' },
  ]);
  seedIfEmpty('Expense', [
    { id:'ex1', employee_name:'Alex Johnson', employee_email:'alex.j@email.com', client_name:'FinServ Corp', expense_date:'2025-03-18', category:'travel', amount:250, description:'Client site visit travel', status:'pending', created_date:'2025-03-19T10:00:00Z' },
  ]);
  seedIfEmpty('Contract', [
    { id:'ct1', employee_name:'Alex Johnson', employee_email:'alex.j@email.com', client_name:'FinServ Corp', job_title:'Cloud Architect', contract_type:'w2', start_date:'2025-03-01', end_date:'2025-09-01', bill_rate:130, pay_rate:100, status:'active', created_date:'2025-02-28T10:00:00Z' },
  ]);
  seedIfEmpty('OnboardingTask', [
    { id:'ot1', employee_name:'Alex Johnson', employee_email:'alex.j@email.com', task_name:'Submit I-9 documents', category:'documents', status:'completed', due_date:'2025-03-05', created_date:'2025-02-28T10:00:00Z' },
    { id:'ot2', employee_name:'Alex Johnson', employee_email:'alex.j@email.com', task_name:'Complete background check', category:'compliance', status:'pending', due_date:'2025-04-01', created_date:'2025-02-28T10:00:00Z' },
  ]);
  seedIfEmpty('LeaveRequest', []);
  seedIfEmpty('AccessRequest', []);
  seedIfEmpty('User', [
    { id:'u1', email:'hr@nsbtek.com', full_name:'Admin User', role:'admin', status:'active', created_date:'2025-01-01T10:00:00Z' },
    { id:'u2', email:'recruiter@nsbtek.com', full_name:'Jane Recruiter', role:'recruiter', status:'active', created_date:'2025-01-15T10:00:00Z' },
  ]);
};

// Entity CRUD factory
const createEntityClient = (entityName) => ({
  list: (sort) => {
    let data = getStore(entityName);
    if (sort) {
      const desc = sort.startsWith('-');
      const key = desc ? sort.slice(1) : sort;
      data = [...data].sort((a, b) => {
        const av = a[key] || '';
        const bv = b[key] || '';
        return desc ? (bv > av ? 1 : -1) : (av > bv ? 1 : -1);
      });
    }
    return Promise.resolve(data);
  },
  get: (id) => {
    const data = getStore(entityName);
    return Promise.resolve(data.find(d => d.id === id) || null);
  },
  create: (payload) => {
    const data = getStore(entityName);
    const newItem = { ...payload, id: genId(), created_date: new Date().toISOString() };
    setStore(entityName, [...data, newItem]);
    return Promise.resolve(newItem);
  },
  update: (id, payload) => {
    const data = getStore(entityName);
    const updated = data.map(d => d.id === id ? { ...d, ...payload, id } : d);
    setStore(entityName, updated);
    return Promise.resolve(updated.find(d => d.id === id));
  },
  delete: (id) => {
    const data = getStore(entityName);
    setStore(entityName, data.filter(d => d.id !== id));
    return Promise.resolve({ id });
  },
  filter: (filters) => {
    let data = getStore(entityName);
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          data = data.filter(d => d[k] === v);
        }
      });
    }
    return Promise.resolve(data);
  }
});

// Auth layer - simple localStorage auth
const CURRENT_USER_KEY = 'nsbtek_current_user';

const auth = {
  me: () => {
    const u = localStorage.getItem(CURRENT_USER_KEY);
    if (u) return Promise.resolve(JSON.parse(u));
    // Default to admin for demo
    const admin = { id: 'u1', email: 'hr@nsbtek.com', full_name: 'Admin User', role: 'admin', status: 'active' };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(admin));
    return Promise.resolve(admin);
  },
  login: (email) => {
    const users = getStore('User');
    const user = users.find(u => u.email === email) || { id: genId(), email, full_name: email.split('@')[0], role: 'viewer', status: 'active' };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return Promise.resolve(user);
  },
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = '/';
    return Promise.resolve();
  },
  isLoggedIn: () => !!localStorage.getItem(CURRENT_USER_KEY),
};

// Initialize seeds
initSeeds();

// Export the full client
export const localClient = {
  auth,
  entities: {
    Job: createEntityClient('Job'),
    Candidate: createEntityClient('Candidate'),
    Client: createEntityClient('Client'),
    Contact: createEntityClient('Contact'),
    Submission: createEntityClient('Submission'),
    Interview: createEntityClient('Interview'),
    Placement: createEntityClient('Placement'),
    Activity: createEntityClient('Activity'),
    Timesheet: createEntityClient('Timesheet'),
    Expense: createEntityClient('Expense'),
    Contract: createEntityClient('Contract'),
    OnboardingTask: createEntityClient('OnboardingTask'),
    LeaveRequest: createEntityClient('LeaveRequest'),
    AccessRequest: createEntityClient('AccessRequest'),
    ATSColumnConfig: createEntityClient('ATSColumnConfig'),
    DashboardPreference: createEntityClient('DashboardPreference'),
    User: createEntityClient('User'),
  }
};
