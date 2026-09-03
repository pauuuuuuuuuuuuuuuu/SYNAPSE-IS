# SYNAPSE-IS — Industrial Ecology & Waste-to-Value Exchange Platform

A high-performance, cyber-physical B2B Web Application dashboard interface designed for AI-driven industrial ecology, by-product circularity, and carbon accounting.

## 🚀 Key Modules Built

### 🌐 Phase 1: Public Landing Page (Pre-Login Default View)
- **Visible on Initial Load**: The landing page is the only view visible on load; the main dashboard is completely hidden until authentication.
- **Navbar**: Glowing cybernetic logo, smooth anchor links (*Solutions, Impact & ESG, Partners, Contact*), and a prominent **"SIGN IN / ACCESS PORTAL"** button that triggers the glassmorphism login overlay.
- **High-Impact Hero Section**: Headline *"Transforming Manufacturing Waste into Lifetime Revenue Streams"*, subheadline, **"GET STARTED"** CTA, and **"EXPLORE LIVE DEMO"** quick-access button over an abstract high-tech background.
- **4 Bold Impact Stats**:
  - `500k+ Tons Diverted` (Blast furnace slag, polymers & industrial chemical fractions)
  - `50+ Enterprise Partners` (Major heavy manufacturing conglomerates & recyclers)
  - `Rp 120B+ Revenue Generated` (Net secondary material transactions)
  - `A+ Avg ESG Score` (GRI & KLHK PROPER Gold standards)
- **Solutions & Architecture Highlights**: Autonomous Molecular GNN, Zero-Empty Haul Logistics, and Audited Blockchain Carbon Ledger.
- **Trusted Partners Marquee**: PT Krakatau Industrial, PT Polychem Indo Lestari, PT Jawa Power Thermal, Waste4Change Haulers, PT Indocement Tunggal.
- **Footer**: Industrial Ecology Digest newsletter signup, support email (`support@synapse-is.id`), and headquarters prominently set to: **'BINUS Innovation Hub, Semarang, Indonesia'**.

---

### 🔒 Enterprise Login Portal (Glassmorphism Overlay)
- Modal dialog with Google Workspace SSO, Enterprise Email/Password input with show/hide password toggle, and a **1-Click Demo Login** button for evaluation.
- Authenticating seamlessly transitions the view: hides the landing page and reveals the Enterprise Dashboard, displays a welcome toast, and fires a delayed `window.dispatchEvent(new Event('resize'))` event so Canvas and 3D renderers scale with correct bounds.

---

### 🎛️ Phase 2: Enterprise Dashboard (Post-Login Tabbed Navigation)

1. **Tab 1: Overview (Sci-Fi Monitoring)**
   - **4 Top KPI Cards**: Circularity Index (88%), Waste Diverted (124.5 Tons), Resource Utilization (92%), and CO₂e Savings (3,140 kg).
   - **3D Molecular GNN Studio**: Interactive Three.js ball-and-stick model for polymer structures with elemental breakdown (`C: 72.4%`, `H: 18.2%`, `O: 9.4%`).
   - **Spatial Reverse-Logistics Fleet**: HTML5 Canvas map showing real-time freight corridors and returning empty haulers.
   - **Factory Digital Twin (Plant Alpha)**: Isometric 3D cyber-physical facility with live IoT telemetry (35.4°C, 175 m³/h) and camera controls.
   - **Subsystem Diagnostic Alerts with Swipe-to-Archive**: Touch swipe left reveals dark green `"TEMPORARY ARCHIVE"` pane with responsive `"UNDO"` recovery action and active counter updates.

2. **Tab 2: Marketplace / Exchange**
   - **Zero-Waste IKN Initiative Promotional Banner**: Subsidized freight rates for Java-to-IKN Nusantara routes with interactive `"CLAIM LOGISTICS SUBSIDY"` button.
   - **Interactive Catalog Toolbar**: Filter chips (*All, Slag & Metals, Polymers & Resins, Fly Ash & Geopolymer, Bio-Mass & Sludge, Chemical Solvents*), instant search, and sorting (*Distance, Volume, Purity, Valuation*).
   - **6 B2B Industrial Waste Cards**: Rich listings (*Steel Slag, Recycled HDPE, Fly Ash Class-F, Spent Coffee, Copper Slag, Recovered Isopropanol*) with chemical purity assays, volume progress bars, IDR valuations, and avoided emissions.
   - **Flowchart Simulation Modal**: 3-step pipeline (Smart Escrow &rarr; Empty Hauler Detection &rarr; IKN Subsidy &rarr; Dispatch Confirmation) that updates the inventory table in real time.

3. **Tab 3: Analytics (Advanced Chart.js Visualizations)**
   - **Monthly Processing Volume**: Dual-bar chart comparing Raw Inflow vs. Successfully Diverted Streams (Jan–Jun 2026).
   - **Exchange Efficiency**: Doughnut chart showing 88% Transacted & Diverted, 8% In-Transit Buffer, and 4% Residual Slag.
   - **Carbon Offset Abatement Trajectory**: Line chart showing AI Autonomous Symbiosis Path vs. Standard Industry Baseline.
   - **Summary KPI Cards**: Cumulative diversion (1,420 Tons), Avoided landfill tipping fees (Rp 8.4B), and Verified ESG offset yield (12,840 tCO₂e).

4. **Tab 4: Customers & Partners (CRM)**
   - Data table of committed industrial waste producers and recyclers.
   - Columns: Company & Industry, Partnership Status (**'Lifetime Contract'**, **'Long-Term Match'**, **'Annual Enterprise'**), Material Type, Total Volume Exchanged, Quality Rating, Negotiated Price Tier, and Actions.
   - Live search input and status filter dropdown with encrypted liaison dispatch toasts.

5. **Tab 5: Reports & Inventory**
   - Live Hyperledger Fabric database connection view.
   - Transaction ID with copy-to-clipboard, Material & Volume, Source & Receiver, Logistics Status pills (*In-Transit, Processed, Pending*), Green Value & Revenue, and Manifest validation.
   - **Export to CSV**: Dynamically generates and downloads real `synapse_b2b_inventory_manifests.csv` in the browser.
   - **Download ESG Audit**: Triggers cryptographic audit manifest generation toast.

6. **Tab 6: Settings (Highly Realistic Configuration)**
   - **Account Profile**: Dr. Elara Vance avatar, Chief Industrial Ecologist role, email, and authorized mobile.
   - **Organization Details**: PT Synapse Circular Systems, Corporate Tax NPWP (`01.884.291.4-054.000`), KLHK Compliance ID (`KLHK-PROPER-2026-GOLD-A88`), and Cikarang Hub.
   - **Security & Access**: Two-Factor Authentication (2FA) toggle switch with instant feedback and active sessions list.
   - **API Keys & Integrations**: SAP S/4HANA ERP, SCADA / OPC-UA, and Waste4Change webhook keys with one-click copy.
   - **Save Configuration Button**: Commits settings to distributed node #JKT-04 with toast feedback.

7. **Sign Out Action**: Topbar button securely closes the enterprise session and returns to the Public Landing Page.

## 💻 How to Run

1. Open `index.html` directly in any modern browser (Google Chrome, Edge, Brave, Firefox, Safari):
   ```bash
   # On Windows PowerShell:
   start C:\Users\Christabell\.gemini\antigravity\scratch\synapse-is-dashboard\index.html
   ```
2. Or serve it via any lightweight local server (e.g., Python or Vite):
   ```bash
   cd C:\Users\Christabell\.gemini\antigravity\scratch\synapse-is-dashboard
   python -m http.server 3000
   ```
   Then navigate to `http://localhost:3000`.
