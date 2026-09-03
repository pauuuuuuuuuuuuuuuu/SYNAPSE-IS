# SYNAPSE-IS — Industrial Ecology & Waste-to-Value Exchange Platform

A high-performance, cyber-physical B2B Web Application dashboard interface designed for AI-driven industrial ecology, by-product circularity, and carbon accounting.

## 🚀 Key Modules Built

1. **B2B Material Exchange Marketplace (Primary Landing Flow)**
   - **Promotional / Educational Banner**: Showcases the Zero-Waste IKN Industrial Symbiosis Initiative with subsidized freight backhauls and "CLAIM FREIGHT SUBSIDY" button with instant toast response.
   - **Filter & Search Bar**: Categorized filter chips (*All, Slag & Metals, Polymers & Resins, Fly Ash & Geopolymer, Bio-Mass & Sludge, Chemical Solvents*), instant search, and multi-criteria sorting (*Distance, Volume, Purity, Valuation*).
   - **Rich Industrial Waste Catalog**: 6 localized B2B listings (*Steel Slag, Recycled HDPE, Fly Ash Class-F, Spent Coffee Grounds, Refined Copper Slag, Recovered Isopropanol*) spanning Cikarang, Cibitung, Karawang, Cilegon, and IKN Nusantara.
   - **Interactive Flowchart Modal ("Request Match / Find Empty Truck")**: Simulates a 3-step reverse-logistics flowchart (Lab Assay Lock &rarr; GPS Backhaul Hauler Detection &rarr; IKN Freight Subsidy &rarr; Match Dispatch confirmation), with live updates to the Inventory table.

2. **Data Storage & Inventory Database Manifests**
   - **Data-Dense Table**: Simulates live Hyperledger Fabric database connection with columns for *Transaction ID, Material & Volume, Source (Factory A), Receiver (Factory B / UMKM), Logistics Status, Green Report / Revenue, and Manifests*.
   - **Search & Filter Controls**: Real-time filtering by keyword and status (*Pending, In-Transit, Processed*).
   - **Export to CSV**: Dynamically generates and downloads real `synapse_b2b_inventory_manifests.csv` using client-side JavaScript Blob generation.
   - **Copy Transaction IDs & Verify Manifests**: Interactive clipboard utilities and SHA-256 verification toasts.

3. **Top KPI Telemetry**
   - **Circularity Index (88%)** with radial SVG arc gauge & +5.1% YoY gain.
   - **Waste Diverted (124.5 Tons)** with dynamic sparkline bars.
   - **Resource Utilization (92%)** with glowing spline chart.
   - **CO₂e Savings (3,140 kg)** with live operational status indicator.

4. **Global Spatial Logistics Map (Reverse-Logistics Fleet)**
   - HTML5 Canvas real-time map with interactive geo-hubs and animated bezier curved transport routes with moving cargo packets.

5. **Factory Digital Twin (Plant Alpha - Secondary Workstation)**
   - Isometric **Three.js 3D simulation** of an advanced bio-refining & pyrolysis recycling facility.
   - Interactive camera views (Isometric vs. Top-Down) and live diagnostic alerts with **Swipe-to-Archive** mobile gesture.

6. **AI Graph Neural Network (Molecular Analysis - Secondary Workstation)**
   - Interactive **Three.js 3D ball-and-stick model** of polymer by-product structures with draggable/rotatable atoms.

7. **Material Flow Analysis (Closed-Loop Sankey)**
   - SVG-based mass balance visualization from Raw & Recycled inputs to Catalytic Reactor and Production reuse streams.

8. **Automated ESG & Circular Carbon Ledger**
   - Chart.js AI optimization trajectory curves, verified Carbon Credit trading ledger, and A+ ESG rating.

8. **Enterprise Access Portal (Frontend Login Simulation)**
   - Futuristic cyber-physical glassmorphism login portal overlay.
   - **Google Workspace SSO** button with official multi-colored Google 'G' icon and simulated OAuth authentication delay.
   - **Enterprise Email & Password** form with show/hide password toggle and auto-name extraction.
   - Live **Toast Notification** upon successful login.
   - **Sign Out / Switch Profile** button in the dashboard topbar to re-open login anytime.

9. **Mobile-Responsiveness & Swipe-to-Archive Gestures**
   - **Off-Canvas Slide-In Drawer**: Sidebar is hidden by default on mobile (`< 768px`) and opens via top-bar hamburger button (`#mobileMenuBtn`), with backdrop blur and auto-close on selection.
   - **Single-Column Mobile Stack (`grid-cols-1`)**: All visualization grids flow naturally without horizontal overflow.
   - **Scaled Typography & Touch Targets**: Minimum 14px-16px font sizes and $\ge 44\text{px}$ touch targets for ergonomic phone usage.
   - **Swipe-to-Archive Interaction**: Factory Digital Twin diagnostic alerts support tactile leftward swiping (`touchstart`/`touchmove`/`touchend` + mouse fallback), revealing a dark green `"TEMPORARY ARCHIVE"` folder pane with a responsive `"UNDO"` recovery action.

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
