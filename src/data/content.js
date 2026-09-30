/*
  All copy comes from Flovian_Personal_Website_Content.docx, structured per the
  design brief. Section order follows the brief, which puts Skills before Work.

  Real links and email live in `profile` below.
  ⚠️  Remaining placeholders: the CV path, and the project / article URLs.
      Search for TODO.
*/

export const profile = {
  name: 'Flovian',
  roles: 'Technical Project Manager · Software Developer · Engineering Leader',
  location: 'Kisumu, Kenya',
  availability: "Let's build something meaningful.",

  email: 'odhiambo.flovi@gmail.com',
  // TODO: add the CV PDF at public/flovian-cv.pdf
  cv: '/flovian-cv.pdf',
  heroImage: '/hero.jpeg',
  aboutImage: '/about.jpeg',
  links: {
    linkedin: 'https://www.linkedin.com/in/flovian-owiti/',
    // note: GitHub given as https://github/flovian, corrected to a real URL
    github: 'https://github.com/flovian',
    devto: 'https://dev.to/atieno_thedvev',
  },
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export const socials = [
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
  { label: 'Dev.to', href: profile.links.devto },
  { label: 'Email', href: `mailto:${profile.email}` },
]

export const hero = {
  headline: ['I Lead Teams.', 'I Build Systems.', 'I Ship Products.'],
  // 'highlight' marks which line renders in the gold accent
  highlight: 1,
  supporting:
    'Technical Project Manager and Software Developer bridging people, product, and engineering to turn complex ideas into working solutions.',
  paragraph:
    'I lead software teams, coordinate technical delivery, solve engineering problems, and build digital products with real-world impact.',
  actions: [
    { label: 'View My Work', href: '#work', variant: 'primary' },
    { label: 'Download My CV', href: profile.cv, variant: 'ghost', download: true },
  ],
}

export const about = {
  eyebrow: 'About',
  heading: 'About Me',
  lead: 'Building products. Leading people. Solving problems.',
  paragraphs: [
    "I'm a Technical Project Manager and Software Developer with a passion for building digital products and helping teams do their best work.",
    'My work sits at the intersection of technology, product, and people. I coordinate software development teams, translate ideas into actionable plans, manage stakeholders, and stay involved in the technical side of projects.',
    'I enjoy working through complex problems — from designing software systems and APIs to improving engineering workflows, coordinating stakeholders, and helping teams move from an idea to a working product.',
    "I'm particularly interested in engineering leadership, software development, AI, open-source technology, product development, and creating opportunities for people to grow through technology.",
  ],
}

export const skills = {
  eyebrow: 'What I Do',
  heading: 'What I Do',
  cards: [
    {
      icon: 'leadership',
      title: 'Technical Leadership',
      description:
        'Leading cross-functional software teams, coordinating execution, removing blockers, and creating effective engineering workflows.',
    },
    {
      icon: 'code',
      title: 'Software Development',
      description:
        'Building web applications, APIs, and backend systems with modern development tools and technologies.',
    },
    {
      icon: 'management',
      title: 'Project Management',
      description:
        'Turning ideas into structured plans, managing stakeholders, tracking delivery, and driving projects from discovery to deployment.',
    },
    {
      icon: 'product',
      title: 'Product & Problem Solving',
      description:
        'Understanding user problems, defining solutions, validating ideas, and connecting product decisions with technical execution.',
    },
  ],
}

export const projects = {
  eyebrow: 'Featured Work',
  heading: 'Featured Work',
  subtitle: 'Projects where technology, product thinking, and execution come together.',
  items: [
    {
      id: 'victoria-maler',
      index: '01',
      name: 'Victoria-Maler',
      category: 'Community & Environmental Technology',
      role: 'Software Developer',
      tagline:
        'Technology for environmental action, transparent funding, and measurable community impact.',
      description:
        'A community-driven platform focused on restoring Lake Victoria through community action, transparent funding, and verifiable impact tracking.',
      contribution:
        'Designed and developed a platform connecting communities, volunteers, environmental organizations, and funders while exploring Bitcoin-based technology for transparent and tamper-evident impact records.',
      tech: ['Go', 'REST API', 'SQLite', 'JavaScript', 'HTML/CSS', 'JWT', 'Bitcoin Core', 'Git'],
      cta: 'View Project',
      // TODO: replace with the real project URL
      href: '#',
    },
    {
      id: 'local-leaders-fund',
      index: '02',
      name: 'Local Leaders Fund',
      category: 'Nonprofit Digital Platform',
      role: 'Project Manager',
      tagline:
        'Leading people, process, and delivery to turn a stakeholder vision into a working digital platform.',
      description:
        "A digital platform built to communicate LLF's mission, programs, partnerships, governance, and impact to its stakeholders and wider audience.",
      contribution:
        'Led the project from coordination through delivery, working across design, development, content, SEO, stakeholder reviews, staging, deployment, and final handover.',
      responsibilities: [
        'Coordinated the development team',
        'Managed stakeholder communication and feedback',
        'Coordinated page-by-page design approvals',
        'Tracked deliverables and action items',
        'Coordinated content and digital assets',
        'Managed staging, deployment and handover',
      ],
      tech: [
        'Project Management',
        'Stakeholder Management',
        'Web Development',
        'Content Coordination',
        'SEO',
        'Deployment',
      ],
      cta: 'View Case Study',
      // TODO: replace with the real project URL
      href: '#',
    },
    {
      id: 'safe-haven',
      index: '03',
      name: 'Safe Haven',
      category: 'AI Decision Support Agent',
      role: 'Project Manager / Product Lead',
      tagline:
        "An AI decision-support agent that doesn't just tell you where to go — it helps you understand what you're choosing between.",
      description:
        'An AI-powered decision support agent that helps users make informed decisions about locations by presenting the key trade-offs associated with each option.',
      concept:
        "Safe Haven doesn't simply tell users where to go. It helps them understand the trade-offs behind different location choices so they can make decisions that fit their priorities.",
      contribution:
        'Led the project from concept to execution, helping translate the decision-making problem into a practical AI product. Coordinated the team around product requirements, user needs, technical implementation, and delivery.',
      tech: [
        'AI',
        'Decision Support',
        'LLM',
        'Data Analysis',
        'Location Intelligence',
        'Product Management',
      ],
      cta: 'View Case Study',
      // TODO: replace with the real project URL
      href: '#',
    },
  ],
}

export const stack = {
  eyebrow: 'Toolkit',
  heading: 'My Tools & Stack',
  groups: [
    {
      label: 'Development',
      icon: 'code',
      items: ['Python', 'JavaScript', 'Go', 'HTML', 'CSS', 'React', 'FastAPI'],
    },
    {
      label: 'Engineering & Infrastructure',
      icon: 'infrastructure',
      items: ['Git', 'GitHub', 'Linux', 'Docker', 'REST APIs', 'SQLite', 'CI/CD'],
    },
    {
      label: 'AI & Data',
      icon: 'ai',
      items: ['Gemini API', 'AI Applications', 'Semantic Search', 'Vector Databases', 'FAISS'],
    },
    {
      label: 'Product & Collaboration',
      icon: 'product',
      items: ['Figma', 'GitHub Projects', 'Project Planning', 'Stakeholder Management'],
    },
  ],
}

export const writing = {
  eyebrow: 'Writing',
  heading: 'Writing & Ideas',
  subtitle: "What I'm building, learning, and thinking about.",
  posts: [
    {
      title: 'We All Became Architects',
      excerpt:
        "Lessons from Zone01 Kisumu's AI & Software Engineering session and what it means to think beyond writing code.",
      href: '#',
    },
    {
      title: 'What I Learned Managing a Software Team',
      excerpt:
        'Lessons from coordinating developers, designers, QA, and stakeholders while keeping a product moving.',
      href: '#',
    },
    {
      title: 'Building Technology for Real-World Impact',
      excerpt:
        'Exploring how software, community participation, and emerging technologies can work together to solve meaningful problems.',
      href: '#',
    },
    {
      title: 'From Idea to Working Product',
      excerpt: 'What happens between having an idea and actually shipping a digital product.',
      href: '#',
    },
  ],
}

export const beyondCode = {
  eyebrow: 'Beyond the Code',
  heading: 'Beyond the Code',
  subtitle: 'The things that shape how I think, build, and lead.',
  items: [
    {
      title: 'Tech Communities',
      description: 'Creating spaces where young people can learn, connect, and explore technology.',
    },
    {
      title: 'Learning',
      description:
        'Exploring software engineering, AI, product development, and emerging technologies.',
    },
    {
      title: 'Building',
      description: 'Turning ideas into experiments, prototypes, and useful digital products.',
    },
    {
      title: 'Mentoring',
      description:
        'Helping aspiring professionals develop practical skills and navigate technology careers.',
    },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  heading: "Let's Build Something",
  subtitle:
    'Have an idea, a technical challenge, or a project that needs someone who can connect the product, people, and engineering?',
  channels: [
    { label: 'Email', value: "Let's talk", href: `mailto:${profile.email}`, external: true },
    {
      label: 'LinkedIn',
      value: 'Connect with me',
      href: profile.links.linkedin,
      external: true,
    },
    { label: 'GitHub', value: 'See my code', href: profile.links.github, external: true },
    { label: 'Location', value: profile.location },
  ],
  form: {
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Tell me about your project...',
    submitLabel: 'Send Message',
    // Leave empty and the form opens the visitor's mail client with the
    // message pre-filled, straight to profile.email. Set a Formspree /
    // Basin / Web3Forms URL to POST instead — if that request fails, the
    // form still falls back to the mail client.
    endpoint: '',
    successMessage: "Opening your mail app — I'll get back to you soon.",
  },
}

export const footer = {
  links: socials,
  copyright: '© 2026 Flovian. Built with purpose.',
}
