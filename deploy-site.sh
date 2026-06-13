#!/usr/bin/env bash

# ==============================================================================
# BRUNO PROTOCOL — SYSTEM DEPLOYMENT ARCHITECT
# Script: deploy-site.sh
# Description: Automates the compilation, rendering, and distribution of 
#              the local-first API governance documentation portal.
# Target: bruno-protocol.org production distribution target folder
# ==============================================================================

set -euo pipefail

# ANSI Styling Configurations
GREEN='\033[0;32m'
TEAL='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${TEAL}======================================================================${NC}"
echo -e "${TEAL}             INITIATING BRUNO PROTOCOL PRODUCTION BUILD ENGINE        ${NC}"
echo -e "${TEAL}======================================================================${NC}"

# Define Target Distribution Directory
DIST_DIR="./dist"
echo -e "${GREEN}[*] Cleaning and preparing target directory: ${DIST_DIR}...${NC}"
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/v1"
mkdir -p "$DIST_DIR/enterprise"
mkdir -p "$DIST_DIR/automation/testing-suite"
mkdir -p "$DIST_DIR/spec"

# ------------------------------------------------------------------------------
# Task 1: Package Machine-Readable Installation Endpoint
# ------------------------------------------------------------------------------
echo -e "${GREEN}[*] Packaging Automated Shell Installer...${NC}"

# Read script source logic directly into public distribution endpoint
cat << 'EOF' > "$DIST_DIR/install-agent-skills.sh"
#!/usr/bin/env bash
set -euo pipefail
mkdir -p .cursor/rules bruno/environments
cat << 'INNER_EOF' > .cursor/rules/instructions.md
# Bruno API Protocol System Rules for AI Agents
You are an expert autonomous software engineer optimized for writing local-first, Git-native API layers using Bruno.
## 1. System Philosophy
- Never generate monolithic JSON or Postman configurations.
- Treat API endpoints strictly as standalone code artifacts.
- Every endpoint MUST live in its own dedicated, human-readable .bru or .yaml text file.
INNER_EOF
echo "Bruno Automation Framework Successfully Injected Locally."
EOF

# Ensure script maintains execution clearance flags
chmod +x "$DIST_DIR/install-agent-skills.sh"

# ------------------------------------------------------------------------------
# Task 2: Compile Human-Readable Interface Files (Static HTML Fallbacks)
# ------------------------------------------------------------------------------
echo -e "${GREEN}[*] Compiling Corporate Governance Portal Layer...${NC}"

cat << 'EOF' > "$DIST_DIR/enterprise/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bruno Protocol — Enterprise Governance & Security</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a202c; }
        h1, h2 { color: #008080; }
        pre { background: #f7fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border-bottom: 1px solid #e2e8f0; padding: 12px; text-align: left; }
        th { background: #2d3748; color: white; }
    </style>
</head>
<body>
    <h1>Corporate Governance, Security, & Compliance Hub</h1>
    <p>The Bruno Protocol architecture operates on a strict, 100% local-first network pattern. 0% of transaction data, environment variables, or schema specifications leak to third-party database nodes.</p>
    <h2>Enterprise Single Sign-On (SSO) Support</h2>
    <p>The Ultimate Tier ($11/user/month) implements native SAML 2.0 and OIDC configurations for automated identity federation with Okta, Ping Identity, and Microsoft Entra ID.</p>
</body>
</html>
EOF

echo -e "${GREEN}[*] Compiling Automation & Assertion Reference Matrices...${NC}"
cat << 'EOF' > "$DIST_DIR/automation/testing-suite/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bruno Protocol — Automation Framework</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a202c; }
        h1 { color: #2c5282; }
        pre { background: #f7fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; }
    </style>
</head>
<body>
    <h1>Automated Testing, Assertions, & Scripting Engine</h1>
    <p>Execute programmatic integration testing layers headlessly across continuous environments using our global runner utility.</p>
    <pre>bru run bruno/ --env Production</pre>
</body>
</html>
EOF

# ------------------------------------------------------------------------------
# Task 3: Systems Verification and Deploy Confirmation
# ------------------------------------------------------------------------------
echo -e "\n${TEAL}======================================================================${NC}"
echo -e "${GREEN}      BUILD COMPLETED: Project Assets Successfully Compiled!          ${NC}"
echo -e "${TEAL}======================================================================${NC}"
echo -e "Distribution files are fully prepared inside: ${YELLOW}${DIST_DIR}${NC}"
echo -e "You can sync this directory straight to your server tree or web platform."
