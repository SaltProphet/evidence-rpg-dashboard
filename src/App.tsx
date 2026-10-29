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
  Square,
  CheckSquare,
  Layers,
  Activity
} from 'lucide-react';
import { campaignData } from './data/campaign';

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
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center shadow-2xl relative overflow-hidden shrink-0">
              <Terminal size={32} className="text-blue-400 relative z-10" />
              <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white tracking-tight">{campaignData.profile.name}</h1>
                <span className="text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Shield size={12} /> {campaignData.profile.version}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1.5">
                <div className="text-xs font-mono text-neutral-300">
                  Primary Class: <strong className="text-white">{campaignData.profile.primaryClass}</strong>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Secondary Class: {campaignData.profile.secondaryClass}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-1.5 bg-neutral-900/80 border border-neutral-800 p-3.5 rounded-xl">
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Campaign Objective</div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-neutral-300">{campaignData.profile.objective.from}</span>
              <ChevronRight size={14} className="text-neutral-600" />
              <span className="text-emerald-400 font-bold">{campaignData.profile.objective.to}</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
              Phase: <span className="text-purple-400 font-bold">{campaignData.profile.objective.phase}</span> ({campaignData.profile.objective.timeframe})
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
        </div>
      </div>

      <main className="max-w-7xl mx-auto">
        
        {/* TAB 1: MASTER DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionCard title="Master Core Stats" icon={Network}>
                <div className="space-y-4">
                  {campaignData.masterCoreStats.map((stat, idx) => (
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
                      {campaignData.worldState.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-neutral-500">{item.label}:</span> 
                          <span className={item.color}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-xs font-bold uppercase text-neutral-400 mb-3">Revenue Progression</div>
                    <div className="space-y-2 text-xs font-mono">
                      {campaignData.revenueStages.map((stage, idx) => (
                        <div key={idx} className={`flex justify-between items-center ${stage.active ? '' : 'text-neutral-600'}`}>
                          <span className={stage.active ? "text-emerald-400 font-bold" : ""}>{stage.label}</span> 
                          {stage.active ? (
                            <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">{stage.status}</span>
                          ) : (
                            <span>{stage.status}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <SectionCard title="Active Main Quest" icon={Scroll} className="border-blue-900/40 bg-blue-950/10">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-blue-100">{campaignData.quests.mainQuest1.title}</h3>
                    <span className="text-[10px] text-blue-400 font-mono border border-blue-900/60 px-2 py-0.5 rounded bg-blue-950/80">
                      {campaignData.quests.mainQuest1.tag}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {campaignData.quests.mainQuest1.desc}
                  </p>
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
                  {campaignData.workstationGates.map((gate, i) => (
                    <div key={i} className="bg-neutral-950 p-2.5 rounded border border-neutral-800 text-neutral-400">
                      [ ] {gate.gate}
                    </div>
                  ))}
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
              {Object.entries(campaignData.skillTrees).map(([category, skills]) => (
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
              <SectionCard title={`${campaignData.quests.mainQuest1.tag}: ${campaignData.quests.mainQuest1.title}`} icon={Target} className="border-blue-900/50 bg-blue-950/10">
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  {campaignData.quests.mainQuest1.desc}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase text-neutral-400 mb-2">Completion Gates</div>
                  {campaignData.quests.mainQuest1.gates.map((gate, i) => (
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
                  Reward: {campaignData.quests.mainQuest1.reward}
                </div>
              </SectionCard>

              <SectionCard title={`${campaignData.quests.mainQuest2.tag}: ${campaignData.quests.mainQuest2.title}`} icon={Swords} className="border-purple-900/50 bg-purple-950/10">
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  {campaignData.quests.mainQuest2.desc}
                </p>
                <div className="text-xs font-mono text-purple-300 bg-purple-950/60 p-3 rounded-lg border border-purple-900/50 mb-4">
                  Entry Requirements: {campaignData.quests.mainQuest2.prereqs}
                </div>
                <div className="p-3.5 rounded-lg bg-purple-900/20 border border-blue-500/30 text-xs text-purple-300 font-mono">
                  Boss Reward: {campaignData.quests.mainQuest2.reward}
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <SectionCard title="Psychological Inversion: Failure Encounters" icon={AlertTriangle} className="border-amber-900/40 bg-amber-950/5">
                <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                  Failures are not punishments. They are evidence-generating encounters. When an agent destroys an implementation, it generates debugging evidence and failure-analysis artifacts.
                </p>
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
                  {campaignData.workstationGates.map((eq, i) => (
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
                  {campaignData.financialStability.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-center justify-between">
                      <span className="text-neutral-300">{item.label}</span>
                      <span className={item.color}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

      </main>
      
      <footer className="max-w-7xl mx-auto mt-16 text-center text-xs text-neutral-600 font-mono pb-8 flex flex-col gap-2 border-t border-neutral-800/60 pt-6">
        <span>{campaignData.profile.primaryClass} Campaign Dashboard v1.0</span>
        <span>Progression strictly bounded by verifiable evidence state transitions.</span>
      </footer>

    </div>
  );
}

