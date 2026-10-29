export const campaignData = {
  profile: {
    name: "JUSTIN STRANGE",
    version: "Version 0 Character Sheet",
    primaryClass: "Systems Designer / Technical Researcher",
    secondaryClass: "Interdisciplinary Artist / Creative Technologist",
    objective: {
      from: "Profile A (Private)",
      to: "Profile B (Verifiable)",
      phase: "Evidence Production",
      timeframe: "3–6 Month Campaign"
    }
  },
  masterCoreStats: [
    { name: "Systems Design", level: "1 → 3", status: "Requirements, architecture, trade-offs" },
    { name: "Technical Research", level: "1 → 3", status: "Comparative evaluation, feasibility" },
    { name: "Applied AI Systems", level: "2 → 3", status: "Model selection, local inference, orchestration" },
    { name: "AI-Directed Implementation", level: "2 → 3", status: "Agent direction, supervision, attribution" },
    { name: "Validation & Discipline", level: "1 → 3", status: "Test design, failure analysis, reliability" },
    { name: "Infrastructure & Compute", level: "1 → 3", status: "Local hardware profiling, cost reasoning" },
    { name: "External Verification", level: "0 → 4", status: "Peer review, reproduction, user evaluation" }
  ],
  worldState: [
    { label: "Public Evidence", value: "DEVELOPING", color: "text-purple-400" },
    { label: "Peer Review", value: "LOCKED / 0", color: "text-neutral-500" },
    { label: "Collaboration", value: "LIMITED", color: "text-amber-400" },
    { label: "Market Validation", value: "UNVALIDATED", color: "text-neutral-500" },
    { label: "Compute Requirement", value: "MEASURING", color: "text-amber-400" }
  ],
  revenueStages: [
    { label: "Stage 0 ($0/mo)", status: "CURRENT", active: true },
    { label: "Stage 1 ($250/mo)", status: "[ ]", active: false },
    { label: "Stage 2 ($500/mo)", status: "[ ]", active: false },
    { label: "Stage 3 ($1,000/mo)", status: "[ ]", active: false },
    { label: "Stage 4 ($2,000+/mo)", status: "[ ]", active: false }
  ],
  skillTrees: {
    "Systems Design": [
      { name: "Requirements Analysis", level: 1, target: 3, gate: "Requirements + constraints + acceptance criteria", source: "Build 2" },
      { name: "Systems Design", level: 1, target: 3, gate: "Two public design case studies", source: "Builds 2/3" },
      { name: "Systems Architecture", level: 1, target: 3, gate: "Architecture + rationale + trade-offs", source: "Build 2" },
      { name: "Integration", level: 1, target: 3, gate: "Integrated validated prototype", source: "Build 2" },
      { name: "Deployment", level: 1, target: 3, gate: "Reproducible deployed system", source: "Build 2" },
      { name: "Operational Evaluation", level: 0.5, target: 3, gate: "System evaluated under defined conditions", source: "Build 2" }
    ],
    "Technical Research": [
      { name: "Technical Research", level: 1, target: 3, gate: "Three methodological research briefs", source: "Builds 1–3" },
      { name: "Comparative Evaluation", level: 1, target: 3, gate: "Controlled technology comparison", source: "Build 1" },
      { name: "Feasibility Analysis", level: 1, target: 3, gate: "Decision-oriented investigation", source: "Build 1" },
      { name: "Experiment Design", level: 0.5, target: 3, gate: "Defined variables/test conditions", source: "Research report" },
      { name: "Failure Analysis", level: 1, target: 3, gate: "Reproduction → diagnosis → intervention → retest", source: "Build 3" },
      { name: "Reproducibility", level: 0, target: 4, gate: "External reproduction/review", source: "Build 1/2" }
    ],
    "Applied AI": [
      { name: "Applied AI Systems", level: 2, target: 3, gate: "Evaluated AI system", source: "Build 2" },
      { name: "Model Selection", level: 1, target: 3, gate: "Workload-based comparison", source: "Build 1" },
      { name: "Local Inference", level: 2, target: 3, gate: "Measured local workloads", source: "Build 1" },
      { name: "Agentic Workflows", level: 2, target: 3, gate: "Architecture + testing + failure analysis", source: "Builds 2/3" },
      { name: "AI Evaluation", level: 1, target: 3, gate: "Defined tests comparing expected/observed", source: "Builds 1–3" },
      { name: "AI Integration", level: 1, target: 3, gate: "AI integrated into working system", source: "Validated prototype" }
    ],
    "AI-Directed Implementation": [
      { name: "Agent Direction", level: 2, target: 3, gate: "Requirements/prompts/specs used", source: "Project methodology" },
      { name: "Implementation Supervision", level: 2, target: 3, gate: "Generated code inspected and corrected", source: "Decision log" },
      { name: "Acceptance-Criteria Design", level: 1, target: 3, gate: "Criteria established before execution", source: "Test plan" },
      { name: "AI-Output Verification", level: 1, target: 3, gate: "Generated output tested, not assumed", source: "Test results" },
      { name: "Human/AI Attribution", level: 0, target: 3, gate: "Explicitly state decisions vs agents", source: "Every case study" }
    ],
    "Validation & Discipline": [
      { name: "Test Design", level: 1, target: 3, gate: "Defined test cases from requirements", source: "Prototype evaluation" },
      { name: "Benchmark Design", level: 1, target: 3, gate: "Repeatable workload & testing conditions", source: "Build 1" },
      { name: "Failure Diagnosis", level: 1, target: 3, gate: "Reproduction → isolation → hypothesis → retest", source: "T4 report" },
      { name: "Performance Evaluation", level: 1, target: 3, gate: "Latency, resource usage measured", source: "Builds 1–2" },
      { name: "Documentation", level: 1, target: 3, gate: "Independent reader can inspect work", source: "Every artifact" }
    ],
    "Infrastructure & Compute": [
      { name: "Local AI Infrastructure", level: 2, target: 3, gate: "Deploy & operate local inference workloads", source: "Builds 1–2" },
      { name: "Compute Requirement Analysis", level: 1, target: 3, gate: "Correlate workload with hardware", source: "Build 1" },
      { name: "Resource Profiling", level: 1, target: 3, gate: "Record actual bottlenecks", source: "Build ledger" },
      { name: "Cost Reasoning", level: 1, target: 3, gate: "Real workload tied to actual consumption", source: "Compute report" }
    ],
    "Multiplayer & External": [
      { name: "Technical Communication", level: 1, target: 3, gate: "Published reports without context", source: "All" },
      { name: "Public Evidence", level: 1, target: 3, gate: "Structured public briefs", source: "Publishing pipeline" },
      { name: "Peer Review", level: 0, target: 4, gate: "Two substantive technical reviews", source: "Social / External" },
      { name: "Collaboration", level: 1, target: 4, gate: "One shared-responsibility project", source: "External" },
      { name: "User Evaluation", level: 0, target: 4, gate: "Outsider tests prototype", source: "External" },
      { name: "Professional Reference", level: 1, target: 4, gate: "Direct-observation reference", source: "External" }
    ]
  },
  quests: {
    mainQuest1: {
      tag: "MAIN QUEST I",
      title: "The Locality Problem",
      desc: "Determine when a bounded AI workload should execute locally versus externally across task success, latency, VRAM, reliability, privacy exposure, cost, operational complexity, and failure modes.",
      gates: [
        "Reproducible evaluation exists",
        "Findings documented in research brief",
        "Limitations and failure modes disclosed",
        "Decision supported by rigorous evidence"
      ],
      reward: "Several competencies become eligible for Lv 2 or Lv 3 promotion."
    },
    mainQuest2: {
      tag: "MAIN QUEST II",
      title: "The Validated System (Boss Fight)",
      desc: "Combine requirements, architecture, agent direction, integration, and testing into one functioning system and evaluate against acceptance criteria.",
      prereqs: "Research Lv 2 • Requirements Lv 2 • Architecture Lv 2 • Testing Lv 2",
      reward: "Validated Prototype Artifact & T1 Systems Design Case Study."
    }
  },
  workstationGates: [
    { gate: "Cash Flow Gate", desc: "Payment comfortable without projected revenue" },
    { gate: "Credit Gate", desc: "Financing economics acceptable" },
    { gate: "Workload Gate", desc: "48 GB vs 96 GB experimentally determined" },
    { gate: "Utilization Gate", desc: "Evidence of substantial intended use" },
    { gate: "Replacement Value", desc: "Expenses actually displaced are known" },
    { gate: "Revenue Evidence", desc: "Tracked, survivable at $0 baseline" }
  ],
  financialStability: [
    { label: "Subscriptions reduced", status: "COMPLETED", color: "text-emerald-400" },
    { label: "Spending categorized", status: "COMPLETED", color: "text-emerald-400" },
    { label: "LLC finances separated", status: "COMPLETED", color: "text-emerald-400" },
    { label: "Compute spending measured", status: "IN PROGRESS", color: "text-blue-400" },
    { label: "Project economics understood", status: "PENDING", color: "text-neutral-500" }
  ]
};
