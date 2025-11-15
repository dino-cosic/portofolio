// Portfolio Data - Extracted for better performance and maintainability

export const experiences = [
  {
    company: 'Symphony',
    role: 'Senior Software Engineer',
    period: 'Aug 2024 – Present',
    duration: '1+ year',
    location: 'Remote (symphony.is)',
    summary: 'Leading monolith-to-microservices modernization using latest versions of .NET, Azure Functions, and Service Bus.',
    achievements: [
      'Leading monolith-to-microservices migration using .NET 8, Azure Functions, and Service Bus',
      'Reduced technical debt and accelerated MVP delivery',
      'Mentoring juniors in Backend engineering and Cloud architecture',
    ],
    technologies: ['.NET', 'Azure', 'Azure Functions', 'Service Bus', 'Microservices', 'C#'],
  },
  {
    company: 'HTEC Group',
    role: 'Senior Software Engineer',
    period: 'May 2022 – Aug 2024',
    duration: '2 years 4 months',
    location: 'Remote',
    summary: 'Spearheaded CMS migration to microservices on .NET and Azure.',
    achievements: [
      'Migrated legacy CMS to microservices — cut maintenance by 25%',
      'Achieved 99.9% CI/CD success across 50+ releases',
      'Built custom Azure Data Factory testing framework → 50% less testing effort',
    ],
    technologies: ['.NET', 'Azure', 'Azure Functions', 'Microservices', 'CI/CD', 'Docker'],
  },
  {
    company: 'Authority Partners',
    role: 'Software Developer → Team Lead',
    period: 'Jun 2019 – May 2022',
    duration: '3 years',
    location: 'Remote',
    summary: 'Promoted to Team Lead within 20 months. Directed 6-person team delivering Fortune client apps.',
    achievements: [
      'Promoted in 20 months to lead 6-engineer team',
      'Delivered apps handling 20,000+ concurrent orders',
      'Improved team velocity 25% via Agile refinement',
    ],
    technologies: ['.NET Core', 'Angular', 'Azure DevOps', 'CI/CD', 'Agile'],
  },
  {
    company: 'University of Sarajevo',
    role: 'Teaching Assistant',
    period: 'Mar 2022 – Present',
    duration: '3+ years (part-time)',
    location: 'Sarajevo, Bosnia and Herzegovina',
    summary: 'Mentoring 100+ students annually in .NET, Azure DevOps, and Software Project Management.',
    achievements: [
      'Mentor 100+ students annually in .NET and Azure DevOps',
      'Achieved 95% course satisfaction',
      'Designed hands-on labs on architecture and design patterns',
    ],
    technologies: ['Teaching', '.NET', 'Azure DevOps', 'Architecture', 'Agile'],
  },
];

export const education = [
  {
    degree: 'Master of Engineering',
    field: 'Computer Science',
    institution: 'Faculty of Electrical Engineering University of Sarajevo',
    period: '2018 - 2021',
    description: 'Advanced studies in software engineering, system design, and modern development practices.',
  },
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    institution: 'Faculty of Electrical Engineering University of Sarajevo',
    period: '2014 - 2018',
    description: 'Comprehensive foundation in computer science and software development.',
  },
];

export const certifications = [
  { 
    name: 'AP Lab Cloud Masters', 
    issuer: 'AP Lab',
    period: 'Oct 2019 - Feb 2020',
    description: '16-week intensive training program covering the full software development lifecycle from planning and design to testing and deployment, with hands-on technical challenges and industry mentorship.'
  },
  { 
    name: 'Microsoft Certified: Azure Fundamentals', 
    issuer: 'Microsoft',
    description: 'Foundational certification demonstrating knowledge of cloud concepts and Azure services including compute, networking, storage, security, and governance.'
  },
];

export const projects = [
  {
    title: 'CryptoDesk – Real-time Crypto Trading Platform',
    description: 'Built a real-time trading platform integrating multiple crypto exchanges using .NET and Azure.',
    achievements: [
      'Integrated multiple exchanges with real-time synchronization',
      'Designed bot-driven asset protection engine',
      'Implemented asynchronous transaction processing',
    ],
    technologies: ['.NET', 'Azure', 'Azure Functions', 'Event-Driven', 'Trading Algorithms'],
    impact: 'Platform stability led client to expand project scope significantly',
  },
  {
    title: 'Karter.ba – Online Event Ticketing Platform',
    description: 'Founding backend developer for Bosnian startup disrupting offline ticket sales.',
    achievements: [
      'Architected scalable .NET and PostgreSQL backend',
      'Handled 5,000+ concurrent users post-launch',
      'Built automated deployments with Docker',
    ],
    technologies: ['.NET', 'PostgreSQL', 'Docker', 'Azure DevOps', 'Payment Integration'],
    impact: '70% revenue boost and 40% increase in event attendance',
  },
  {
    title: 'Government Application Migration',
    description: 'Led migration of government application from Azure cloud to on-premise infrastructure.',
    achievements: [
      'Migrated entire system from Azure to on-prem servers',
      'Refactored codebase to remove cloud dependencies',
      'Implemented new CI/CD workflows for on-prem',
    ],
    technologies: ['.NET', 'Angular', 'SQL Server', 'On-Prem', 'CI/CD'],
    impact: 'Ensured operational continuity and improved data control for government stakeholders',
  },
  {
    title: 'Technical Writing – Medium Blog',
    description: 'Started writing technical articles to share lessons from real-world engineering work.',
    achievements: [
      'Published comprehensive technical articles',
      'Covered emerging topics: LLMs, Azure Functions, Docker',
      'Articles referenced internally for onboarding',
    ],
    technologies: ['Technical Writing', 'Azure Functions', 'Docker', 'LLM', '.NET'],
    impact: 'Articles referenced by peers for engineering guidance',
  },
];

export const services = [
  {
    title: 'Legacy Modernization & Migration',
    description: 'From assessment to execution powered by AI. Leading modernization of legacy monoliths into modern, scalable architectures.',
    icon: '🚀',
  },
  {
    title: 'SaaS & Startup Backend Development',
    description: 'Founding-level engineering to take ideas from MVP to scalable platforms handling thousands of concurrent users.',
    icon: '⚡',
  },
  {
    title: 'Technical Leadership & Consulting',
    description: 'On-demand leadership to elevate teams through technical consulting, mentorship, and optimized workflows.',
    icon: '🎯',
  },
];

export const skillsData = [
  {
    category: 'Backend & Cloud',
    skills: ['.NET Core/8', 'C#', 'Azure', 'Microservices', 'Azure Functions', 'REST APIs', 'PostgreSQL', 'SQL Server'],
  },
  {
    category: 'Architecture & DevOps',
    skills: ['System Design', 'Cloud Architecture', 'CI/CD', 'Docker', 'Azure DevOps', 'Git', 'Event-Driven Architecture'],
  },
  {
    category: 'Data & Testing',
    skills: ['Azure Data Factory', 'ETL Pipelines', 'Unit Testing', 'Integration Testing', 'Performance Testing'],
  },
  {
    category: 'Frontend & Leadership',
    skills: ['Angular', 'React', 'TypeScript', 'Team Leadership', 'Agile/Scrum', 'Technical Mentoring'],
  },
];
