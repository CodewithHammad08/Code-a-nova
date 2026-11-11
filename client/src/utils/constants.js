export const DOMAINS = [
  {
    id: 'AI / Machine Learning',
    title: 'AI / Machine Learning',
    shortDesc: 'Autonomous agents, foundation model applications, NLP, predictive intelligence, and computer vision.',
    color: '#17243A',
    icon: 'Brain',
    sampleProblems: [
      'Multi-agent workflow orchestration for code verification and vulnerability remediation.',
      'Edge-deployed multimodal models for real-time diagnostic decision support in telemedicine.',
      'Synthetically augmented fraud pattern detection across high-throughput financial rails.',
    ],
    techStack: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'FastAPI', 'ONNX'],
    evalFocus: 'Model latency, algorithmic novelty, dataset rigor, and production serving resilience.',
  },
  {
    id: 'Web Development',
    title: 'Web Development',
    shortDesc: 'Modern cloud-native architectures, real-time collaboration engines, resilient full-stack systems.',
    color: '#17243A',
    icon: 'Globe',
    sampleProblems: [
      'Low-latency CRDT-powered collaborative visual design workspace with offline sync.',
      'Distributed micro-frontend architecture with dynamic edge-rendered caching strategies.',
      'High-accessibility developer toolchain with instant keyboard navigation and screen-reader telemetry.',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'WebSockets', 'Tailwind CSS', 'PostgreSQL / Mongo'],
    evalFocus: 'Core Web Vitals, API latency, fault tolerance, and accessible responsive UX.',
  },
  {
    id: 'Internet of Things',
    title: 'Internet of Things',
    shortDesc: 'Smart sensors, edge computing, smart city instrumentation, and embedded industrial automation.',
    color: '#17243A',
    icon: 'Cpu',
    sampleProblems: [
      'Decentralized environmental sensor network with ultra-low power LoRaWAN mesh communication.',
      'Predictive industrial motor vibration telemetry with on-device anomaly inference.',
      'Smart grid EV charging load balancer with dynamic solar generation feedback.',
    ],
    techStack: ['ESP32', 'Raspberry Pi', 'MQTT', 'FreeRTOS', 'InfluxDB', 'Grafana'],
    evalFocus: 'Hardware reliability, power budget efficiency, telemetry packet recovery, and sensor calibration.',
  },
  {
    id: 'Cyber Security',
    title: 'Cyber Security',
    shortDesc: 'Zero-trust infrastructure, vulnerability discovery, privacy-preserving cryptography, and threat defense.',
    color: '#17243A',
    icon: 'Shield',
    sampleProblems: [
      'Zero-knowledge proof verification pipeline for privacy-first credential attestation.',
      'Automated dynamic API fuzzing harness detecting IDOR and authorization regressions in CI/CD.',
      'Continuous memory safety auditor for compiled WebAssembly binaries and native extensions.',
    ],
    techStack: ['Rust', 'eBPF', 'Wireshark', 'Burp Suite API', 'ZKP (circom)', 'Docker'],
    evalFocus: 'Threat modeling rigor, attack surface minimisation, defense-in-depth, and exploit resilience.',
  },
  {
    id: 'Blockchain',
    title: 'Blockchain',
    shortDesc: 'Decentralized protocols, verifiable computation, smart contract safety, and transparent governance.',
    color: '#17243A',
    icon: 'Layers',
    sampleProblems: [
      'Gas-optimized cross-chain liquidity bridge with automated optimistic challenge proofs.',
      'Verifiable on-chain carbon offset tracking with satellite NDVI verification feeds.',
      'Decentralized identity resolver supporting W3C DID specifications and soulbound credentials.',
    ],
    techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'Rust (Solana)', 'The Graph', 'IPFS'],
    evalFocus: 'Smart contract audit safety, gas economics, protocol decentralization, and state finality.',
  },
];

export const COURSES = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BSc', 'Other'];

export const BRANCHES = ['CSE', 'IT', 'ECE', 'ME', 'CE', 'Other'];

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const POPULAR_COLLEGES = [
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Madras',
  'Indian Institute of Technology (IIT) Kharagpur',
  'Indian Institute of Technology (IIT) Roorkee',
  'Indian Institute of Technology (IIT) Kanpur',
  'National Institute of Technology (NIT) Trichy',
  'National Institute of Technology (NIT) Surathkal',
  'National Institute of Technology (NIT) Warangal',
  'Birla Institute of Technology and Science (BITS) Pilani',
  'Delhi Technological University (DTU)',
  'Netaji Subhas University of Technology (NSUT)',
  'Vellore Institute of Technology (VIT) Vellore',
  'Manipal Institute of Technology (MIT)',
  'SRM Institute of Science and Technology',
  'Jadavpur University',
  'College of Engineering Pune (COEP)',
  'PSG College of Technology',
  'Thapar Institute of Engineering and Technology',
  'Other / Custom College',
];

export const EVENT_TIMELINE = [
  {
    step: '01',
    phase: 'Registrations Open',
    date: 'November 15, 2026',
    desc: 'Participant and team registrations open globally across all 5 tracks.',
    active: true,
    status: 'In Progress',
    deliverables: 'Account creation, OTP verification, and domain selection.',
  },
  {
    step: '02',
    phase: 'Idea & PPT Submission',
    date: 'December 20, 2026',
    desc: 'Submit your project synopsis, presentation deck, and prototype architecture.',
    active: false,
    status: 'Upcoming',
    deliverables: 'Shareable slide deck URL and prototype repo link.',
  },
  {
    step: '03',
    phase: 'Shortlist Announcement',
    date: 'January 05, 2027',
    desc: 'Top 50 finalist teams across tracks announced for the grand stage.',
    active: false,
    status: 'Upcoming',
    deliverables: 'Mentor assignment and technical briefing session.',
  },
  {
    step: '04',
    phase: 'Grand Finale & Demo',
    date: 'January 23-24, 2027',
    desc: '36-hour hackathon, mentor evaluations, live demos, and award ceremony.',
    active: false,
    status: 'Upcoming',
    deliverables: 'Live project presentation and judge Q&A.',
  },
];

export const PRIZE_TIERS = [
  {
    rank: 'Winner',
    title: 'Grand Champion',
    amount: '₹75,000',
    accentColor: '#D6A64F',
    benefits: [
      'Direct seed incubation interview access',
      '₹25,000 Cloud credits package',
      'Winner trophies & verified certificates',
      '1-on-1 engineering advisory sessions',
    ],
  },
  {
    rank: '1st Runner Up',
    title: 'Second Place',
    amount: '₹45,000',
    accentColor: '#243653',
    benefits: [
      '₹15,000 Cloud credits package',
      'Runner-up mementos & verified certificates',
      'Direct interview fast-track with partners',
      'Product architecture review session',
    ],
  },
  {
    rank: 'Category Awards',
    title: 'Track Excellence',
    amount: '₹30,000',
    accentColor: '#21845B',
    benefits: [
      'Best UI/UX Architecture (₹10,000)',
      'Best AI Model Implementation (₹10,000)',
      'Most Secure Defense System (₹10,000)',
      'Special certificates of technical merit',
    ],
  },
];
