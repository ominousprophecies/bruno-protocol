#!/usr/bin/env bash

# ==============================================================================
# BRUNO PROTOCOL — AUTOMATED AGENT SKILLS INSTALLER
# Description: Injects local-first AI system rules and validation schemas
#              directly into engineering project roots.
# Core Velocity: Optimizing workflows for the 8-Month Singularity Curve.
# ==============================================================================

set -euo pipefail

# ANSI Color Codes for Clean Terminal Output
RED='\033[0;31m'
GREEN='\033[0;32m'
TEAL='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${TEAL}======================================================================${NC}"
echo -e "${TEAL}          INITIALIZING BRUNO PROTOCOL AUTONOMOUS CORE ENGINE          ${NC}"
echo -e "${TEAL}======================================================================${NC}"

# Step 1: Detect Project Root and Git Context
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}[!] Warning: No local Git repository (.git) detected in this directory.${NC}"
    echo -e "Ensuring target folders match standard project structures..."
fi

# Step 2: Establish Deterministic Target Directories
echo -e "\n${GREEN}[*] Structuring Local Filesystem Nodes...${NC}"
mkdir -p .cursor/rules
mkdir -p bruno/environments

# Step 3: Inject System Rules for AI Assistants (.cursorrules Integration)
echo -e "${GREEN}[*] Injecting AI Agent Instruction Matrices into .cursor/rules/...${NC}"

cat << 'EOF' > .cursor/rules/instructions.md
# Bruno API Protocol System Rules for AI Agents

You are an expert autonomous software engineer optimized for writing local-first, Git-native API layers using Bruno.

## 1. System Philosophy
- Never generate monolithic JSON or Postman configurations.
- Treat API endpoints strictly as standalone code artifacts.
- Every endpoint MUST live in its own dedicated, human-readable .bru or .yaml text file.
- Co-locate API collections in the same repository as the application backend (inside a /bruno directory).

## 2. Structural File Constraints (.bru Syntax Specifications)
When generating or modifying .bru files, strictly execute the plain-text block layout format. Ensure headers, URLs, meta blocks, and assertion text streams are isolated cleanly.

### Expected Syntax Standard:
meta {
  name: Get System Velocity
  type: http
  seq: 1
}

get {
  url: {{base_url}}/api/v1/singularity/metrics
}

headers {
  Content-Type: application/json
  Authorization: Bearer {{system_token}}
}

body:json {
  {
    "query_mode": "accelerated"
  }
}

assert {
  res.status: eq 200
  res.body.doubling_period_months: lte 8
}

## 3. Automation Scripts & Tests
- Always append programmatic assertion layers to ensure verification loops pass during continuous integration (CI) pipeline runs.
- Use the Chai library validation syntax natively within optional script:post-response or tests text blocks when deeper evaluation is requested.
- Use bru.setVar("variable_name", value) inside post-response scripts to pass runtime authorization tokens across requests deterministically.

## 4. Execution Guardrails
- DO NOT hardcode corporate secrets, private keys, or passwords inside .bru request blocks.
- Inject placeholders using double curly braces (e.g., {{auth_token}}) and seed them via isolated .bru environment files located inside the /environments directory.
EOF

# Symlink or copy for wider editor compatibility (GitHub Copilot / VS Code Global)
cat << 'EOF' > .github-copilot-instructions
# Direct references to Bruno Native Specifications
- Read and adhere strictly to rules specified inside .cursor/rules/instructions.md
- Enforce the plain-text .bru file block layouts for all backend API constructions.
EOF

echo -e "${GREEN}[✓] AI Agent Rules Successfully Seeded.${NC}"

# Step 4: Generate Baseline Local Collection Parameters
echo -e "\n${GREEN}[*] Generating Local-First Git Collection Blueprints...${NC}"

if [ ! -f "bruno/bruno.json" ]; then
    cat << 'EOF' > bruno/bruno.json
{
  "version": "1",
  "name": "Enterprise Core Services",
  "type": "collection"
}
EOF
fi

if [ ! -f "bruno/environments/Production.bru" ]; then
    cat << 'EOF' > bruno/environments/Production.bru
vars {
  base_url: https://api.bruno-protocol.org
}
vars:secret {
  system_token
}
EOF
fi
echo -e "${GREEN}[✓] Localized Filesystem Configurations Initialized.${NC}"

# Step 5: Verification and Final Status Briefing
echo -e "\n${TEAL}======================================================================${NC}"
echo -e "${GREEN}      SUCCESS: Bruno Automation Infrastructure Injection Complete!   ${NC}"
echo -e "${TEAL}======================================================================${NC}"
echo -e "Your local AI agents can now automatically generate, expand, and self-heal"
echo -e "your API vectors seamlessly without manual interface overhead."
echo -e "\nNext step: Run ${YELLOW}git add .cursor/rules/ bruno/${NC} to secure your pipeline metrics."
