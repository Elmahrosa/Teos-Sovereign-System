
import React, { useState } from 'react';
import { Download, Copy, Check, Github, FileCode, Server, Database } from 'lucide-react';

const LICENSE_DOC_CONTENT = `
# ⚖️ PolyForm Noncommercial License 1.0.0 + TESL Sovereign Overlay

SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0

Copyright © 2025 Elmahrosa International  
All Rights Reserved.  

---

## Grant of Rights

Permission is hereby granted to any person obtaining a copy of this software and associated documentation files (the “Software”) to **view, use, copy, and modify** the Software **for NONCOMMERCIAL PURPOSES ONLY**, subject to the conditions below.

---

## 1. Noncommercial Use Only

You may use the Software **only for noncommercial purposes**, including:

- Personal use  
- Educational use  
- Academic research  
- Evaluation or testing  

**Any use for commercial advantage, financial gain, monetization, resale, SaaS deployment, paid services, token launches, enterprise use, or production systems is STRICTLY PROHIBITED without prior written permission from the Licensor.**

---

## 2. No Commercial Rights Granted

This license **DOES NOT** grant you the right to:

- Sell the Software  
- License or sublicense the Software  
- Offer the Software as a service (SaaS)  
- Deploy it in commercial or governmental production environments  
- Use it as part of a paid product, protocol, or platform  
- Use it for fundraising, token sales, or revenue-generating activity  

**Written approval from Elmahrosa International is mandatory for any commercial use.**

---

## Sovereign Overlay (TESL)

This repository is additionally governed by the **TESL Sovereign Overlay**, designating Egypt as the founding sovereign anchor and co‑owner of Teos Bankchain.  
See: [TESL.md](https://github.com/Elmahrosa/Teos-Pharaoh-Portal/blob/main/TESL.md)

---

## Licensor

**Elmahrosa International**  
Founder: **Ayman Seif**

📩 Commercial licensing & written permissions:  
**legal@teosegypt.com**

---

## 📜 License & Governance

This repository is governed by the [Elmahrosa International Civic Blockchain Constitution](https://github.com/Elmahrosa/International-Civic-Blockchain-Constitution/blob/main/LICENSE-Community.md)

Additional overlays:  
- **TESL Sovereign Overlay** — Egypt anchor license  
- **PolyForm Noncommercial 1.0.0** — compliance enforcement  

---

This repository is **SOURCE-AVAILABLE, NOT OPEN SOURCE**
`;

const REPOS = {
  'teos-ai-guard': {
    name: 'AI-Native-Civic-Guard',
    url: 'https://github.com/Elmahrosa/TEOS-AI-Guard',
    content: `# AI-Native Civic Guard | TEOS-AI-Guard
**Compliance-first, AI-powered security & governance layer for trusted civic blockchain innovation**

![License](https://img.shields.io/badge/license-PolyForm%20NC%20%2B%20TESL-red?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-blue?style=for-the-badge)
![Governance](https://img.shields.io/badge/governance-Sovereign%20Overlay-gold?style=for-the-badge)

---

## 📂 Repository Structure
\`\`\`text
ai-native-civic-guard/
├── docs/
│   ├── LICENSE.md
│   ├── NDA.md
│   ├── GOVERNANCE.md
│   ├── AUP.md
│   └── COMPLIANCE_MAP.md
├── identity/
│   └── identity.sol
├── ai-gateway/
│   ├── gateway.ts
│   ├── prompt_filters.ts
│   ├── model_router.ts
│   └── explainability.ts
├── data-governance/
...
\`\`\`

---

## 🔹 Core Starter Code

### identity/identity.sol
\`\`\`solidity
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
pragma solidity ^0.8.20;

contract IdentityRegistry {
    // ... code ...
}
\`\`\`

### ai-gateway/gateway.ts
\`\`\`ts
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
import express from "express";
// ... code ...
\`\`\`

---

## 📜 docs/LICENSE.md
${LICENSE_DOC_CONTENT}

---

## 📜 License Block
This repository is governed by the **PolyForm Noncommercial License 1.0.0 + TESL Sovereign Overlay**.  
Source‑available, not open source.  
Commercial or sovereign deployments require written authorization from Elmahrosa International.  
See [LICENSE.md](./docs/LICENSE.md).
`
  },
  'teos-blockchain': {
    name: 'TEOS-Blockchain',
    url: 'https://github.com/Elmahrosa/TEOS-Blockchain',
    content: `# 📂 TEOS‑Blockchain Repository

![License](https://img.shields.io/badge/license-PolyForm%20NC%20%2B%20TESL-red?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-blue?style=for-the-badge)
![Governance](https://img.shields.io/badge/governance-Sovereign%20Overlay-gold?style=for-the-badge)

---

## 📜 contracts/teosToken.sol
\`\`\`solidity
// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
pragma solidity ^0.8.20;

contract TEOSToken {
    // ... code ...
}
\`\`\`

---

## 📜 docs/LICENSE.md
${LICENSE_DOC_CONTENT}

---

## 📜 License Block
This repository is governed by the **PolyForm Noncommercial License 1.0.0 + TESL Sovereign Overlay**.  
Source‑available, not open source.  
Commercial or sovereign deployments require written authorization from Elmahrosa International.  
See [LICENSE.md](./docs/LICENSE.md).
`
  }
};

const RepositoryExport: React.FC = () => {
  const [activeRepo, setActiveRepo] = useState<keyof typeof REPOS>('teos-ai-guard');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REPOS[activeRepo].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([REPOS[activeRepo].content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${REPOS[activeRepo].name}-Scaffold.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Repository Export Center</h2>
          <p className="text-sm text-slate-500">Generate and download unified scaffolds for Elmahrosa International ecosystems.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(Object.keys(REPOS) as Array<keyof typeof REPOS>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveRepo(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeRepo === key 
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              {REPOS[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{REPOS[activeRepo].name} Scaffold</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-all flex items-center gap-2 text-xs font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy MD'}
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-all flex items-center gap-2 text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download MD
                </button>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm text-emerald-400/80 bg-slate-950 custom-scrollbar">
              <pre className="whitespace-pre-wrap">{REPOS[activeRepo].content}</pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Github className="w-5 h-5" />
              Deployment Instructions
            </h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p>1. Create a new repository on GitHub: <br/> <span className="text-emerald-400 font-mono text-xs">{REPOS[activeRepo].url}</span></p>
              <p>2. Use the "Download MD" button to get the full scaffold file.</p>
              <p>3. Copy specific blocks into their respective folders in your local environment.</p>
              <p>4. Push to main branch to trigger CI/CD pipelines.</p>
            </div>
            <a 
              href={REPOS[activeRepo].url} 
              target="_blank" 
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-white font-semibold transition-all"
            >
              Open GitHub Repository
            </a>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
            <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">Institutional Guard</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Production Ready</p>
                  <p className="text-[10px] text-slate-500">Government-ready audit trail</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Sovereign Protocol</p>
                  <p className="text-[10px] text-slate-500">Identity verified on-chain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryExport;
