import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Target, 
  Lock, 
  Coins, 
  Swords, 
  Scroll, 
  Cpu, 
  Network, 
  AlertTriangle,
  ChevronRight,
  Database,
  Square,
  CheckSquare,
  ExternalLink,
  BookOpen,
  Layers,
  Activity,
  Flame
} from 'lucide-react';

const SKILL_TREES = {
  'Systems Design': [
    { name: 'Requirements Analysis', level: 1, target: 3, gate: 'Requirements + constraints + acceptance criteria', source: 'Build 2' },
    { name: 'Systems Design', level: 1, target: 3, gate: 'Two public design case studies', source: 'Builds 2/3' },
    { name: 'Systems Architecture', level: 1, target: 3, gate: 'Architecture + rationale + trade-offs', source: 'Build 2' },
    { name: 'Integration', level: 1, target: 3, gate: 'Integrated validated prototype', source: 'Build 2' },
    { name: 'Deployment', level: 1, target: 3, gate: 'Reproducible deployed system', source: 'Build 2' },
    { name: 'Operational Evaluation', level: 0.5, target: 3, gate: 'System evaluated under defined conditions', source: 'Build 2' },
  ],
  'Technical Research': [
    { name: 'Technical Research', level: 1, target: 3, gate: 'Three methodological research briefs', source: 'Builds 1–3' },
    { name: 'Comparative Evaluation', level: 1, target: 3, gate: 'Controlled technology comparison', source: 'Build 1' },
    { name: 'Feasibility Analysis', level: 1, target: 3, gate: 'Decision-oriented investigation', source: 'Build 1' },
    { name: 'Experiment Design', level: 0.5, target: 3, gate: 'Defined variables/test conditions', source: 'Research report' },
    { name: 'Failure Analysis', level: 1, target: 3, gate: 'Reproduction → diagnosis → intervention → retest', source: 'Build 3' },
    { name: 'Reproducibility', level: 0, target: 4, gate: 'External reproduction/review', source: 'Build 1/2' },
  ],
  'Applied AI': [
    { name: 'Applied AI Systems', level: 2, target: 3, gate: 'Evaluated AI system', source: 'Build 2' },
    { name: 'Model Selection', level: 1, target: 3, gate: 'Workload-based comparison', source: 'Build 1' },
    { name: 'Local Inference', level: 2, target: 3, gate: 'Measured local workloads', source: 'Build 1' },
    { name: 'Agentic Workflows', level: 2, target: 3, gate: 'Architecture + testing + failure analysis', source: 'Builds 2/3' },
    { name: 'AI Evaluation', level: 1, target: 3, gate: 'Defined tests comparing expected/observed', source: 'Builds 1–3' },
    { name: 'AI Integration', level: 1, target: 3, gate: 'AI integrated into working system', source: 'Validated prototype' },
  ],
  'AI-Directed Implementation': [
    { name: 'Agent Direction', level: 2, target: 3, gate: 'Requirements/prompts/specs used', source: 'Project methodology' },
    { name: 'Implementation Supervision', level: 2, target: 3, gate: 'Generated code inspected and corrected', source: 'Decision log' },
    { name: 'Acceptance-Criteria Design', level: 1, target: 3, gate: 'Criteria established before execution', source: 'Test plan' },
    { name: 'AI-Output Verification', level: 1, target: 3, gate: 'Generated output tested, not assumed', source: 'Test results' },
    { name: 'Human/AI Attribution', level: 0, target: 3, gate: 'Explicitly state decisions vs agents', source: 'Every case study' },
  ],
  'Validation & Discipline': [
    { name: 'Test Design', level: 1, target: 3, gate: 'Defined test cases from requirements', source: 'Prototype evaluation' },
    { name: 'Benchmark Design', level: 1, target: 3, gate: 'Repeatable workload & testing conditions', source: 'Build 1' },
    { name: 'Failure Diagnosis', level: 1, target: 3, gate: 'Reproduction → isolation → hypothesis → retest', source: 'T4 report' },
    { name: 'Performance Evaluation', level: 1, target: 3, gate: 'Latency, resource usage measured', source: 'Builds 1–2' },
    { name: 'Documentation', level: 1, target: 3, gate: 'Independent reader can inspect work', source: 'Every artifact' },
  ],
  'Infrastructure & Compute': [
    { name: 'Local AI Infrastructure', level: 2, target: 3, gate: 'Deploy & operate local inference workloads', source: 'Builds 1–2' },
    { name: 'Compute Requirement Analysis', level: 1, target: 3, gate: 'Correlate workload with hardware', source: 'Build 1' },
    { name: 'Resource Profiling', level: 1, target: 3, gate: 'Record actual bottlenecks', source: 'Build ledger' },
    { name: 'Cost Reasoning', level: 1, target: 3, gate: 'Real workload tied to actual consumption', source: 'Compute report' },
  ],
  'Multiplayer & External': [
    { name: 'Technical Communication', level: 1, target: 3, gate: 'Published reports without context', source: 'All' },
    { name: 'Public Evidence', level: 1, target: 3, gate: 'Structured public briefs', source: 'Publishing pipeline' },
    { name: 'Peer Review', level: 0, target: 4, gate: 'Two substantive technical reviews', source: 'Social / External' },
    { name: 'Collaboration', level: 1, target: 4, gate: 'One shared-responsibility project', source: 'External' },
    { name: 'User Evaluation', level: 0, target: 4, gate: 'Outsider tests prototype', source: 'External' },
    { name: 'Professional Reference', level: 1, target: 4, gate: 'Direct-observation reference', source: 'External' },
  ]
};

const LEVEL_MAP = {
  0: { label: 'Unexplored', color: 'bg-neutral-800', text: 'text-neutral-500', border: 'border-neutral-800' },
  1: { label: 'Practiced', color: 'bg-slate-400', shadow: 'shadow-[0_0_10px_rgba(148,163,184,0.3)]', text: 'text-slate-300', border: 'border-slate-500' },
  2: { label: 'Documented', color: 'bg-emerald-400', shadow: 'shadow-[0_0_10px_rgba(52,211,153,0.4)]', text: 'text-emerald-400', border: 'border-emerald-500' },
  3: { label: 'Validated', color: 'bg-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]', text: 'text-blue-500', border: 'border-blue-500' },
  4: { label: 'Verified', color: 'bg-purple-500', shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.6)]', text: 'text-purple-500', border: 'border-purple-500' },
};

const SectionCard = ({ title, icon: Icon, children, className = '' }: any) => (
  <div className={`bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden backdrop-blur-md shadow-xl ${className}`}>
    <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-800 bg-neutral-900/90">
      <Icon size={18} className="text-blue-400" />
      <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{title}</h2>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

const EvidenceBar = ({ level, target = 3 }: { level: number; target?: number }) => {
  return (
    <div className="flex gap-1 w-24">
      {[1, 2, 3, 4].map((tier) => {
        const isReached = level >= tier;
        const isTarget = tier <= target;
        const tierData = (LEVEL_MAP as any)[tier];
        
        let classNames = 'h-2 flex-1 rounded-sm transition-all duration-300 ';
        if (isReached) {
          classNames += `${tierData.color} ${tierData.shadow} border border-transparent`;
        } else if (isTarget) {
          classNames += `border border-dashed ${tierData.border} bg-transparent opacity-60`;
        } else {
          classNames += 'border border-neutral-800 bg-neutral-950/50';
        }

        return (
          <div 
            key={tier}
            title={`${tierData.label} Gate`}
            className={classNames}
          />
        );
      })}
    </div>
  );
};

const SkillRow = ({ name, level, target, gate, source }: any) => {
  const currentData = (LEVEL_MAP as any)[Math.floor(level)] || LEVEL_MAP[0];
  return (
    <div className="flex flex-col py-2.5 px-2 hover:bg-neutral-800/40 rounded-lg transition-colors -mx-2 border-b border-neutral-800/30 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-200">{name}</span>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${currentData.text}`}>
              {level === 0.5 ? 'Exposure' : currentData.label}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">({source})</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-neutral-400">
            {level} → {target}
          </span>
          <EvidenceBar level={level} target={target} />
        </div>
      </div>
      <div className="text-[10px] text-neutral-400 font-mono mt-1 bg-neutral-950/60 p-1.5 rounded border border-neutral-800/80">
        <span className="text-blue-400 font-semibold">Evidence Gate:</span> {gate}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});

  const toggleQuestItem = (item: string) => {
    setCompletedQuests(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 font-sans selection:bg-blue-500/30 p-4 md:p-8">
      
      {/* HEADER / CHARACTER PROFILE */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center shadow-2xl relative overflow-hidden shrink-0">
              <Terminal size={32} className="text-blue-400 relative z-10" />
              <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white tracking-tight">JUSTIN STRANGE</h1>
                <span className="text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Shield size={12} /> Version 0 Character Sheet
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1.5">
                <div className="text-xs font-mono text-neutral-300">
                  Primary Class: <strong className="text-white">Systems Designer / Technical Researcher</strong>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Secondary Class: Interdisciplinary Artist / Creative Technologist
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-1.5 bg-neutral-900/80 border border-neutral-800 p-3.5 rounded-xl">
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Campaign Objective</div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-neutral-300">Profile A (Private)</span>
              <ChevronRight size={14} className="text-neutral-600" />
              <span className="text-emerald-400 font-bold">Profile B (Verifiable)</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
              Phase: <span className="text-purple-400 font-bold">Evidence Production</span> (3–6 Month Campaign)
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 border-b border-neutral-800/60">
          {[
            { id: 'overview', label: 'Master Dashboard', icon: Activity },
            { id: 'skills', label: 'Competency Matrices', icon: Layers },
            { id: 'quests', label: 'Quests & Encounters', icon: Scroll },
            { id: 'equipment', label: 'Equipment & Economy', icon: Cpu }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* CORE RULE BANNER */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-950/30 via-neutral-900 to-neutral-900 border border-red-900/40 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg">
          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div className="flex-1">
            <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-1">Governing Control Rule</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              XP measures activity. <strong className="text-white font-semibold">Evidence determines level.</strong> No amount of simulated XP or simulated time spent substitutes for the inspectable evidence gate.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-neutral-400 bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800">
            <span>Profile A → Evidence → Verified Profile B</span>
          </div>
        </div>
      </div>

      {/* MAIN DYNAMIC CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto">
        
        {/* TAB 1: MASTER DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionCard title="Master Core Stats" icon={Network}>
                <div className="space-y-4">
                  {[
                    { name: 'Systems Design', level: '1 → 3', status: 'Requirements, architecture, trade-offs' },
                    { name: 'Technical Research', level: '1 → 3', status: 'Comparative evaluation, feasibility' },
                    { name: 'Applied AI Systems', level: '2 → 3', status: 'Model selection, local inference, orchestration' },
                    { name: 'AI-Directed Implementation', level: '2 → 3', status: 'Agent direction, supervision, attribution' },
                    { name: 'Validation & Discipline', level: '1 → 3', status: 'Test design, failure analysis, reliability' },
                    { name: 'Infrastructure & Compute', level: '1 → 3', status: 'Local hardware profiling, cost reasoning' },
                    { name: 'External Verification', level: '0 → 4', status: 'Peer review, reproduction, user evaluation' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/60 hover:bg-neutral-800/30 transition-colors">
                      <div>
                        <div className="text-sm font-bold text-neutral-200">{stat.name}</div>
                        <div className="text-xs text-neutral-500 font-mono mt-0.5">{stat.status}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded">
                        {stat.level}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="World State & Economic Standing" icon={Coins}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-xs font-bold uppercase text-neutral-400 mb-3">World State Register</div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between"><span className="text-neutral-500">Public Evidence:</span> <span className="text-purple-400">DEVELOPING</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Peer Review:</span> <span className="text-neutral-500">LOCKED / 0</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Collaboration:</span> <span className="text-amber-400">LIMITED</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Market Validation:</span> <span className="text-neutral-500">UNVALIDATED</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Compute Requirement:</span> <span className="text-amber-400">MEASURING</span></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-xs font-bold uppercase text-neutral-400 mb-3">Revenue Progression</div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-center"><span className="text-emerald-400 font-bold">Stage 0 ($0/mo)</span> <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">CURRENT</span></div>
                      <div className="flex justify-between text-neutral-600"><span>Stage 1 ($250/mo)</span> <span>[ ]</span></div>
                      <div className="flex justify-between text-neutral-600"><span>Stage 2 ($500/mo)</span> <span>[ ]</span></div>
                      <div className="flex justify-between text-neutral-600"><span>Stage 3 ($1,000/mo)</span> <span>[ ]</span></div>
                      <div className="flex justify-between text-neutral-600"><span>Stage 4 ($2,000+/mo)</span> <span>[ ]</span></div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <SectionCard title="Active Main Quest" icon={Scroll} className="border-blue-900/40 bg-blue-950/10">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-blue-100">The Locality Problem</h3>
                    <span className="text-[10px] text-blue-400 font-mono border border-blue-900/60 px-2 py-0.5 rounded bg-blue-950/80">MAIN QUEST I</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Determine when a bounded AI workload should execute locally versus externally across task success, latency, VRAM, reliability, privacy, and cost.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs bg-neutral-950/70 p-3 rounded-lg border border-neutral-800 mb-4">
                  <div className="flex justify-between text-neutral-300"><span>Comparative Research</span> <span className="text-blue-400">IN PROGRESS</span></div>
                  <div className="flex justify-between text-neutral-500"><span>Benchmark Harness</span> <span>PENDING</span></div>
                  <div className="flex justify-between text-neutral-500"><span>Compute Dataset</span> <span>PENDING</span></div>
                </div>

                <button 
                  onClick={() => setActiveTab('quests')}
                  className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  Inspect Full Quest Log <ChevronRight size={14} />
                </button>
              </SectionCard>

              <SectionCard title="Legendary Equipment Status" icon={Cpu} className="border-purple-900/40 bg-purple-950/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-purple-200 text-sm">Local AI Workstation</span>
                  <span className="text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock size={10} /> LOCKED
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Unlocks only when real-world financial and workload prerequisites are experimentally proven.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Cash Flow Gate</div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Credit Gate</div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Workload Req</div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Utilization</div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Replacement</div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">[ ] Revenue Tracked</div>
                </div>
              </SectionCard>
            </div>

          </div>
        )}

        {/* TAB 2: COMPETENCY MATRICES */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-sm text-neutral-200 uppercase tracking-wider">Competency-to-Evidence Matrix</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Every competency is governed by explicit evidence requirements rather than arbitrary time spent.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block"></span> 1: Practiced</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block"></span> 2: Documented</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"></span> 3: Validated</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block"></span> 4: Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SKILL_TREES).map(([category, skills]) => (
                <SectionCard key={category} title={category} icon={Layers}>
                  <div className="space-y-3">
                    {skills.map((skill: any) => (
                      <SkillRow 
                        key={skill.name} 
                        name={skill.name} 
                        level={skill.level} 
                        target={skill.target} 
                        gate={skill.gate} 
                        source={skill.source} 
                      />
                    ))}
                  </div>
                </SectionCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUESTS & ENCOUNTERS */}
        {activeTab === 'quests' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionCard title="Main Quest I: The Locality Problem" icon={Target} className="border-blue-900/50 bg-blue-950/10">
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  Determine when a bounded AI workload should execute locally versus externally across task success, latency, VRAM, reliability, privacy exposure, cost, operational complexity, and failure modes.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase text-neutral-400 mb-2">Completion Gates</div>
                  {[
                    'Reproducible evaluation exists',
                    'Findings documented in research brief',
                    'Limitations and failure modes disclosed',
                    'Decision supported by rigorous evidence'
                  ].map((gate, i) => (
                    <button 
                      key={i} 
                      onClick={() => toggleQuestItem(`mq1_${i}`)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800 text-left hover:bg-neutral-800/40 transition-colors"
                    >
                      {completedQuests[`mq1_${i}`] ? (
                        <CheckSquare size={16} className="text-blue-400 shrink-0" />
                      ) : (
                        <Square size={16} className="text-neutral-600 shrink-0" />
                      )}
                      <span className={`text-xs font-mono ${completedQuests[`mq1_${i}`] ? 'line-through text-neutral-500' : 'text-neutral-300'}`}>
                        {gate}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-blue-900/20 border border-blue-500/30 text-xs text-blue-300 font-mono">
                  Reward: Several competencies become eligible for Lv 2 or Lv 3 promotion.
                </div>
              </SectionCard>

              <SectionCard title="Main Quest II: The Validated System (Boss Fight)" icon={Swords} className="border-purple-900/50 bg-purple-950/10">
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  Combine requirements, architecture, agent direction, integration, and testing into one functioning system and evaluate against acceptance criteria.
                </p>
                <div className="text-xs font-mono text-purple-300 bg-purple-950/60 p-3 rounded-lg border border-purple-900/50 mb-4">
                  Entry Requirements: Research Lv 2 • Requirements Lv 2 • Architecture Lv 2 • Testing Lv 2
                </div>
                <div className="p-3.5 rounded-lg bg-purple-900/20 border border-purple-500/30 text-xs text-purple-300 font-mono">
                  Boss Reward: Validated Prototype Artifact & T1 Systems Design Case Study.
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <SectionCard title="Psychological Inversion: Failure Encounters" icon={AlertTriangle} className="border-amber-900/40 bg-amber-950/5">
                <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                  Failures are not punishments. They are evidence-generating encounters. When an agent destroys an implementation, it generates debugging evidence and failure-analysis artifacts.
                </p>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400">Active Encounter: Agent Specification Ambiguity</div>
                  <p className="text-[11px] text-neutral-400">Diagnose the cause, apply mitigation, retest, and report residual limitations to earn T4 failure analysis evidence.</p>
                </div>
              </SectionCard>

              <SectionCard title="Side Quest Board" icon={Scroll}>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800 text-neutral-300 flex items-center justify-between">
                    <span>Convert unknown into documented finding</span>
                    <span className="text-blue-400">[Research]</span>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800 text-neutral-300 flex items-center justify-between">
                    <span>Publish architecture decision record</span>
                    <span className="text-emerald-400">[Evidence]</span>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800 text-neutral-300 flex items-center justify-between">
                    <span>Obtain technical peer review</span>
                    <span className="text-purple-400">[Multiplayer]</span>
                  </div>
                </div>
              </SectionCard>
            </div>

          </div>
        )}

        {/* TAB 4: EQUIPMENT & ECONOMY */}
        {activeTab === 'equipment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionCard title="Legendary Equipment: Local AI Workstation" icon={Cpu} className="border-purple-900/50 bg-purple-950/10">
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  The workstation is not a reward for accumulating arbitrary points. It is literal endgame equipment unlocked only when real-world financial and technical prerequisites are proven true.
                </p>

                <div className="space-y-3">
                  {[
                    { gate: 'Cash Flow Gate', desc: 'Payment comfortable without projected revenue' },
                    { gate: 'Credit Gate', desc: 'Financing economics acceptable' },
                    { gate: 'Workload Gate', desc: '48 GB vs 96 GB experimentally determined' },
                    { gate: 'Utilization Gate', desc: 'Evidence of substantial intended use' },
                    { gate: 'Replacement Value', desc: 'Expenses actually displaced are known' },
                    { gate: 'Revenue Evidence', desc: 'Tracked, survivable at $0 baseline' },
                  ].map((eq, i) => (
                    <div key={i} className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                      <span className="font-mono text-neutral-500">[ ]</span>
                      <div>
                        <div className="text-xs font-bold text-neutral-200">{eq.gate}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{eq.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <SectionCard title="Financial Stability & Economic Tree" icon={Coins}>
                <p className="text-sm text-neutral-300 mb-4">
                  Financial stats are kept strictly separate from competency XP. Being better at AI does not magically mean finances are healthier.
                </p>

                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Subscriptions reduced</span>
                    <span className="text-emerald-400">COMPLETED</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Spending categorized</span>
                    <span className="text-emerald-400">COMPLETED</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">LLC finances separated</span>
                    <span className="text-emerald-400">COMPLETED</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Compute spending measured</span>
                    <span className="text-blue-400">IN PROGRESS</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-300">Project economics understood</span>
                    <span className="text-neutral-500">PENDING</span>
                  </div>
                </div>
              </SectionCard>
            </div>

          </div>
        )}

      </main>
      
      <footer className="max-w-7xl mx-auto mt-16 text-center text-xs text-neutral-600 font-mono pb-8 flex flex-col gap-2 border-t border-neutral-800/60 pt-6">
        <span>System Designer / Technical Researcher Campaign Dashboard v1.0</span>
        <span>Progression strictly bounded by verifiable evidence state transitions.</span>
      </footer>

    </div>
  );
}
