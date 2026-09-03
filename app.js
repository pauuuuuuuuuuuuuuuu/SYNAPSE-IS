/**
 * SYNAPSE-IS — Industrial Ecology & Waste-to-Value Exchange
 * Main Interactive Application Script (Hardened & Fail-Safe)
 */

document.addEventListener('DOMContentLoaded', () => {
  safeExecute('UTC Clock', initUTCClock);
  safeExecute('Sparklines', initSparklines);
  safeExecute('Molecular 3D GNN', initMolecular3D);
  safeExecute('Factory Digital Twin 3D', initFactory3D);
  safeExecute('Logistics Map Canvas', initLogisticsMap);
  safeExecute('Prediction Chart', initPredictionChart);
  safeExecute('Telemetry Simulator', initTelemetrySimulator);
  safeExecute('Modal Handlers', initModalHandlers);
  safeExecute('Auth Portal', initAuth);
  safeExecute('Interactive Widgets', initInteractiveWidgets);
  safeExecute('Tab Navigation System', initTabs);
  safeExecute('Mobile Navigation Drawer', initMobileDrawer);
  safeExecute('Swipe to Archive Alerts', initSwipeToArchive);
});

function safeExecute(name, fn) {
  try {
    fn();
  } catch (err) {
    console.warn(`[SYNAPSE-IS] Warning in ${name}:`, err.message);
  }
}

/* ==========================================================================
   1. REAL-TIME UTC CLOCK
   ========================================================================== */
function initUTCClock() {
  const clockEl = document.getElementById('utc-clock');
  function update() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. KPI MINI SPARKLINES (Canvas)
   ========================================================================== */
function initSparklines() {
  const canvas = document.getElementById('kpiSparkline1');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const points = [12, 18, 15, 22, 20, 26, 24, 30, 28, 34];
  const w = canvas.width || 80;
  const h = canvas.height || 36;
  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, '#00e5ff');
  grad.addColorStop(1, '#00ff88');

  ctx.beginPath();
  const step = w / (points.length - 1);
  points.forEach((val, i) => {
    const y = h - (val / 36) * h;
    const x = i * step;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 8;
  ctx.stroke();

  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  const areaGrad = ctx.createLinearGradient(0, 0, 0, h);
  areaGrad.addColorStop(0, 'rgba(0, 255, 136, 0.25)');
  areaGrad.addColorStop(1, 'rgba(0, 255, 136, 0.0)');
  ctx.fillStyle = areaGrad;
  ctx.fill();
}

/* ==========================================================================
   3. 3D MOLECULAR ANALYSIS (AI GNN POLYMER) — THREE.JS (Fail-Safe)
   ========================================================================== */
function initMolecular3D() {
  const container = document.getElementById('molecule3d-container');
  if (!container) return;

  // Fallback if THREE is not loaded
  if (typeof THREE === 'undefined') {
    container.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-xs p-4 text-center">
        <div class="text-[#00ff88] text-sm font-bold mb-1">GNN Graph Initialized</div>
        <div>Offline Visualization Mode</div>
      </div>
    `;
    return;
  }

  const width = container.clientWidth || container.offsetWidth || 340;
  const height = container.clientHeight || container.offsetHeight || 256;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a07, 0.04);

  const camera = new THREE.PerspectiveCamera(45, (width && height) ? width / height : 1.33, 0.1, 1000);
  camera.position.set(0, 0, 18);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    console.warn("WebGL not available, skipping 3D molecular renderer");
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  let controls = null;
  if (typeof THREE.OrbitControls === 'function') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x102518, 2.5);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00ff88, 3, 50);
  pointLight1.position.set(10, 10, 15);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00e5ff, 2, 50);
  pointLight2.position.set(-10, -10, -10);
  scene.add(pointLight2);

  const moleculeGroup = new THREE.Group();
  scene.add(moleculeGroup);

  const matCarbon = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    emissive: 0x00ff88,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.8
  });

  const matHydrogen = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 0.5,
    roughness: 0.1,
    metalness: 0.9
  });

  const matOxygen = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
    roughness: 0.3
  });

  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f4632,
    roughness: 0.4,
    metalness: 0.6
  });

  const nodeDefs = [
    { pos: [-3, 0, 0], mat: matCarbon, r: 0.8 },
    { pos: [-1.8, 1.8, 0.4], mat: matCarbon, r: 0.8 },
    { pos: [0.5, 2.0, -0.4], mat: matCarbon, r: 0.8 },
    { pos: [2.0, 0.3, 0.2], mat: matCarbon, r: 0.8 },
    { pos: [1.0, -1.8, 0], mat: matCarbon, r: 0.8 },
    { pos: [-1.4, -1.9, -0.3], mat: matCarbon, r: 0.8 },
    { pos: [3.8, 0.8, 0.5], mat: matOxygen, r: 0.95 },
    { pos: [5.2, -0.2, 0.2], mat: matHydrogen, r: 0.6 },
    { pos: [-4.6, 0.5, -0.2], mat: matOxygen, r: 0.95 },
    { pos: [-2.5, 3.2, 0.8], mat: matHydrogen, r: 0.6 },
    { pos: [0.9, 3.5, -0.8], mat: matHydrogen, r: 0.6 },
    { pos: [1.8, -3.2, 0.2], mat: matHydrogen, r: 0.6 },
    { pos: [-2.2, -3.3, -0.6], mat: matHydrogen, r: 0.6 },
    { pos: [5.0, 2.4, -1.0], mat: matCarbon, r: 0.75 },
    { pos: [6.8, 2.8, -0.5], mat: matCarbon, r: 0.75 },
    { pos: [7.8, 4.2, -1.2], mat: matOxygen, r: 0.9 }
  ];

  nodeDefs.forEach(def => {
    const geo = new THREE.SphereGeometry(def.r, 24, 24);
    const mesh = new THREE.Mesh(geo, def.mat);
    mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
    moleculeGroup.add(mesh);
  });

  const bonds = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [3, 6], [6, 7], [0, 8],
    [1, 9], [2, 10], [4, 11], [5, 12],
    [6, 13], [13, 14], [14, 15]
  ];

  function createBond(p1, p2) {
    const v1 = new THREE.Vector3(...p1);
    const v2 = new THREE.Vector3(...p2);
    const distance = v1.distanceTo(v2);
    const cylinderGeo = new THREE.CylinderGeometry(0.16, 0.16, distance, 12);
    const cylinder = new THREE.Mesh(cylinderGeo, bondMaterial);

    const mid = v1.clone().add(v2).multiplyScalar(0.5);
    cylinder.position.copy(mid);

    const direction = v2.clone().sub(v1).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const orientation = new THREE.Quaternion().setFromUnitVectors(up, direction);
    cylinder.setRotationFromQuaternion(orientation);
    moleculeGroup.add(cylinder);
  }

  bonds.forEach(([i1, i2]) => {
    createBond(nodeDefs[i1].pos, nodeDefs[i2].pos);
  });

  // Background floating GNN cyber particles
  const particleGeo = new THREE.BufferGeometry();
  const count = 100;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i + 1] = (Math.random() - 0.5) * 30;
    positions[i + 2] = (Math.random() - 0.5) * 30;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.25,
    color: 0x00ff88,
    transparent: true,
    opacity: 0.6
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  function handleMolecularResize() {
    if (!container || !renderer) return;
    if (container.clientWidth > 0 && container.clientHeight > 0) {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    }
  }
  window.addEventListener('resize', handleMolecularResize);

  const resetBtn = document.getElementById('resetMoleculeBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      moleculeGroup.rotation.set(0, 0, 0);
      camera.position.set(0, 0, 18);
      if (controls) controls.reset();
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    else moleculeGroup.rotation.y += 0.005;
    particles.rotation.y += 0.0008;
    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   4. 3D DIGITAL TWIN FACTORY (Plant Alpha) — THREE.JS (Fail-Safe)
   ========================================================================== */
function initFactory3D() {
  const container = document.getElementById('factory3d-container');
  if (!container) return;

  if (typeof THREE === 'undefined') {
    container.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-xs p-4 text-center">
        <div class="text-[#00ff88] text-sm font-bold mb-1">Plant Alpha Telemetry Connected</div>
        <div>Offline 3D Mode</div>
      </div>
    `;
    return;
  }

  const width = container.clientWidth || container.offsetWidth || 340;
  const height = container.clientHeight || container.offsetHeight || 256;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a07, 0.035);

  const camera = new THREE.PerspectiveCamera(40, (width && height) ? width / height : 1.33, 0.1, 1000);
  camera.position.set(22, 20, 22);
  camera.lookAt(0, 0, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    console.warn("WebGL not available for factory");
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  let controls = null;
  if (typeof THREE.OrbitControls === 'function') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 10;
    controls.maxDistance = 50;
  }

  const ambientLight = new THREE.AmbientLight(0x0e2017, 2.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x00ff88, 1.8);
  dirLight.position.set(20, 30, 10);
  scene.add(dirLight);

  const cyanFill = new THREE.PointLight(0x00e5ff, 2, 40);
  cyanFill.position.set(-15, 12, -10);
  scene.add(cyanFill);

  const gridHelper = new THREE.GridHelper(30, 30, 0x00ff88, 0x14281f);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const factoryGroup = new THREE.Group();
  scene.add(factoryGroup);

  const matSteel = new THREE.MeshStandardMaterial({
    color: 0x1a2e24,
    roughness: 0.3,
    metalness: 0.8
  });
  const matReactor = new THREE.MeshStandardMaterial({
    color: 0x0f3d28,
    emissive: 0x00ff88,
    emissiveIntensity: 0.3,
    roughness: 0.2,
    metalness: 0.7
  });
  const matPipes = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 0.5,
    roughness: 0.2
  });
  const matConveyor = new THREE.MeshStandardMaterial({
    color: 0x0d1712,
    roughness: 0.8
  });

  // Reactor Silos
  for (let i = -2; i <= 2; i += 2) {
    const tankGeo = new THREE.CylinderGeometry(1.4, 1.4, 5, 24);
    const tank = new THREE.Mesh(tankGeo, matReactor);
    tank.position.set(i * 2.8 - 3, 2.5, -4);
    factoryGroup.add(tank);

    const domeGeo = new THREE.SphereGeometry(1.4, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const dome = new THREE.Mesh(domeGeo, matReactor);
    dome.position.set(i * 2.8 - 3, 5, -4);
    factoryGroup.add(dome);
  }

  // Interconnecting Pipes
  const pipePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-7, 4.5, -4),
    new THREE.Vector3(-3, 4.5, -4),
    new THREE.Vector3(1, 4.5, -4),
    new THREE.Vector3(4, 4.5, -2),
    new THREE.Vector3(4, 2.5, 2)
  ]);
  const pipeGeo = new THREE.TubeGeometry(pipePath, 32, 0.25, 12, false);
  const pipeMesh = new THREE.Mesh(pipeGeo, matPipes);
  factoryGroup.add(pipeMesh);

  // Central Processing Module
  const refinerGeo = new THREE.BoxGeometry(6, 3, 5);
  const refiner = new THREE.Mesh(refinerGeo, matSteel);
  refiner.position.set(1, 1.5, 0);
  factoryGroup.add(refiner);

  // Conveyor Belt & Moving Pallets
  const conveyorGeo = new THREE.BoxGeometry(1.8, 0.4, 12);
  const conveyor = new THREE.Mesh(conveyorGeo, matConveyor);
  conveyor.position.set(-6, 0.2, 1);
  factoryGroup.add(conveyor);

  const pallets = [];
  const palletGeo = new THREE.BoxGeometry(1.0, 0.6, 1.0);
  const palletMat = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    roughness: 0.4,
    emissive: 0x00ff88,
    emissiveIntensity: 0.4
  });

  for (let k = 0; k < 4; k++) {
    const p = new THREE.Mesh(palletGeo, palletMat);
    p.position.set(-6, 0.7, -4 + k * 3);
    factoryGroup.add(p);
    pallets.push(p);
  }

  const camIsoBtn = document.getElementById('camOverviewBtn');
  const camTopBtn = document.getElementById('camTopBtn');
  if (camIsoBtn) {
    camIsoBtn.addEventListener('click', () => {
      camera.position.set(22, 20, 22);
      camera.lookAt(0, 0, 0);
      if (controls) controls.target.set(0, 0, 0);
    });
  }
  if (camTopBtn) {
    camTopBtn.addEventListener('click', () => {
      camera.position.set(0, 32, 0.1);
      camera.lookAt(0, 0, 0);
      if (controls) controls.target.set(0, 0, 0);
    });
  }

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (controls) controls.update();
    else factoryGroup.rotation.y += 0.002;

    pallets.forEach(p => {
      p.position.z += 1.8 * delta;
      if (p.position.z > 6.5) {
        p.position.z = -5.0;
      }
    });

    renderer.render(scene, camera);
  }
  animate();

  function handleFactoryResize() {
    if (!container || !renderer) return;
    if (container.clientWidth > 0 && container.clientHeight > 0) {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
  }
  window.addEventListener('resize', handleFactoryResize);
}

/* ==========================================================================
   5. SPATIAL LOGISTICS MAP (Canvas with Safe Dimensions)
   ========================================================================== */
function initLogisticsMap() {
  const canvas = document.getElementById('logisticsMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    if (canvas.parentElement && canvas.parentElement.clientWidth > 0 && canvas.parentElement.clientHeight > 0) {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
  }
  resize();
  window.addEventListener('resize', resize);

  const hubs = [
    { name: 'Rotterdam (Port)', x: 0.49, y: 0.32, shipments: 48, active: true },
    { name: 'Antwerp Biopark', x: 0.47, y: 0.35, shipments: 34, active: true },
    { name: 'Houston Eco-Hub', x: 0.22, y: 0.44, shipments: 29, active: true },
    { name: 'Singapore CleanTech', x: 0.78, y: 0.60, shipments: 42, active: true },
    { name: 'Shanghai Industrial', x: 0.82, y: 0.42, shipments: 56, active: true },
    { name: 'Santos Circular Bio', x: 0.35, y: 0.74, shipments: 19, active: false }
  ];

  const routes = [
    [0, 1], [0, 2], [0, 3],
    [3, 4], [2, 5], [1, 3]
  ];

  const packets = routes.map((r, idx) => ({
    routeIndex: idx,
    progress: Math.random(),
    speed: 0.003 + Math.random() * 0.004
  }));

  let pulse = 0;

  function render() {
    if (!canvas.width || !canvas.height) {
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Grid background
    ctx.strokeStyle = 'rgba(20, 42, 31, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Landmass silhouettes (Defensive against negative/zero radius)
    ctx.fillStyle = 'rgba(12, 26, 19, 0.65)';
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
    ctx.lineWidth = 1;

    function drawBlob(cx, cy, rx, ry) {
      const radiusX = Math.max(1, rx * w);
      const radiusY = Math.max(1, ry * h);
      ctx.beginPath();
      ctx.ellipse(cx * w, cy * h, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    drawBlob(0.22, 0.35, 0.12, 0.15);
    drawBlob(0.33, 0.68, 0.08, 0.18);
    drawBlob(0.50, 0.32, 0.07, 0.10);
    drawBlob(0.52, 0.58, 0.09, 0.18);
    drawBlob(0.75, 0.38, 0.16, 0.16);
    drawBlob(0.85, 0.72, 0.07, 0.10);

    // Routes
    routes.forEach(([i1, i2]) => {
      const h1 = hubs[i1];
      const h2 = hubs[i2];
      const x1 = h1.x * w;
      const y1 = h1.y * h;
      const x2 = h2.x * w;
      const y2 = h2.y * h;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - 30;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Moving Packets
    packets.forEach(pkt => {
      pkt.progress += pkt.speed;
      if (pkt.progress > 1) pkt.progress = 0;

      const [i1, i2] = routes[pkt.routeIndex];
      const x1 = hubs[i1].x * w;
      const y1 = hubs[i1].y * h;
      const x2 = hubs[i2].x * w;
      const y2 = hubs[i2].y * h;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - 30;

      const t = pkt.progress;
      const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
      const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Hub Pins
    pulse += 0.04;
    hubs.forEach(hub => {
      const hx = hub.x * w;
      const hy = hub.y * h;

      const ringR = Math.max(1, 6 + Math.sin(pulse) * 4);
      ctx.beginPath();
      ctx.arc(hx, hy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }
  render();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const w = canvas.width;
    const h = canvas.height;

    let hoveredHub = null;
    hubs.forEach(hub => {
      const hx = hub.x * w;
      const hy = hub.y * h;
      const dist = Math.hypot(mx - hx, my - hy);
      if (dist < 18) {
        hoveredHub = hub;
      }
    });

    const tooltip = document.getElementById('mapTooltip');
    const hubNameEl = document.getElementById('tooltipHubName');
    const shipmentsEl = document.getElementById('tooltipShipments');

    if (hoveredHub && tooltip && hubNameEl && shipmentsEl) {
      hubNameEl.textContent = `Hub: ${hoveredHub.name}`;
      shipmentsEl.textContent = `${hoveredHub.shipments} Active Shipments`;
      tooltip.style.opacity = '1';
    }
  });

  const focusBtn = document.getElementById('filterActiveShipments');
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      const hubNameEl = document.getElementById('tooltipHubName');
      const shipmentsEl = document.getElementById('tooltipShipments');
      const tooltip = document.getElementById('mapTooltip');
      if (hubNameEl && shipmentsEl) {
        hubNameEl.textContent = `Hub: Rotterdam (Filtered)`;
        shipmentsEl.textContent = `48 Tracked Low-Carbon Loads`;
        if (tooltip) tooltip.style.opacity = '1';
      }
    });
  }

  // Toggle Low-CO2 Route Optimization
  const toggleGeoBtn = document.getElementById('toggleGeoRoutes');
  let isLowCo2Active = false;
  if (toggleGeoBtn) {
    toggleGeoBtn.addEventListener('click', () => {
      isLowCo2Active = !isLowCo2Active;
      const tooltip = document.getElementById('mapTooltip');
      const hubNameEl = document.getElementById('tooltipHubName');
      const shipmentsEl = document.getElementById('tooltipShipments');

      if (isLowCo2Active) {
        toggleGeoBtn.classList.remove('text-slate-300', 'bg-[#0b1611]');
        toggleGeoBtn.classList.add('text-[#00ff88]', 'bg-[#00ff88]/20', 'border-[#00ff88]/50');
        toggleGeoBtn.textContent = 'Low-CO₂ [Active]';
        if (hubNameEl && shipmentsEl) {
          hubNameEl.textContent = 'Mode: Low-CO₂ Green Arcs';
          shipmentsEl.textContent = 'Active Multi-modal Rail & Sail (-34% GHG)';
          if (tooltip) tooltip.style.opacity = '1';
        }
      } else {
        toggleGeoBtn.classList.remove('text-[#00ff88]', 'bg-[#00ff88]/20', 'border-[#00ff88]/50');
        toggleGeoBtn.classList.add('text-slate-300', 'bg-[#0b1611]');
        toggleGeoBtn.textContent = 'Toggle Low-CO₂';
        if (hubNameEl && shipmentsEl) {
          hubNameEl.textContent = 'Mode: Standard Routing';
          shipmentsEl.textContent = '48 Active Multi-modal Shipments';
        }
      }
    });
  }
}

/* ==========================================================================
   6. AI PREDICTION HUB FORECAST CHART (Chart.js or Canvas Fallback)
   ========================================================================== */
function initPredictionChart() {
  const canvas = document.getElementById('predictionChart');
  if (!canvas) return;

  if (typeof Chart !== 'undefined') {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'AI Optimized Yield',
            data: [45, 58, 72, 85, 91, 98],
            borderColor: '#00ff88',
            borderWidth: 2.5,
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(0, 255, 136, 0.15)',
            pointRadius: 2,
            pointBackgroundColor: '#00ff88'
          },
          {
            label: 'Baseline Linear',
            data: [42, 49, 52, 60, 64, 68],
            borderColor: '#00e5ff',
            borderWidth: 1.8,
            borderDash: [4, 4],
            tension: 0.3,
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0c1712',
            titleColor: '#00ff88',
            bodyColor: '#ffffff',
            borderColor: '#182e21',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: '#0f1f17' },
            ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 9 } }
          },
          y: {
            grid: { color: '#0f1f17' },
            ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 9 } }
          }
        }
      }
    });
  } else {
    // Pure 2D canvas fallback if Chart.js is not loaded
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#00ff88';
      ctx.font = '10px monospace';
      ctx.fillText('AI Trajectory: +28% Projected Yield', 10, 30);
    }
  }
}

/* ==========================================================================
   7. LIVE TELEMETRY SIMULATOR (IoT Fluctuations)
   ========================================================================== */
function initTelemetrySimulator() {
  const tempEl = document.getElementById('telemetryTemp');
  const flowEl = document.getElementById('telemetryFlow');

  setInterval(() => {
    if (tempEl) {
      const baseTemp = 35.0;
      const variation = (Math.random() * 0.8 - 0.4).toFixed(1);
      const newTemp = (baseTemp + parseFloat(variation)).toFixed(1);
      tempEl.textContent = `${newTemp}°C`;
    }
    if (flowEl) {
      const baseFlow = 175;
      const v = Math.floor(Math.random() * 6 - 3);
      flowEl.textContent = `${baseFlow + v} m³/h`;
    }
  }, 3000);
}

/* ==========================================================================
   8. MODAL HANDLERS (Telemetry & Diagnostics)
   ========================================================================== */
function initModalHandlers() {
  const modal = document.getElementById('telemetryModal');
  const closeBtn1 = document.getElementById('closeModalBtn');
  const closeBtn2 = document.getElementById('closeModalBtn2');
  const openBtnAlerts = document.getElementById('alertTriggerBtn');
  const openBtnIoT = document.getElementById('viewTelemetryBtn');

  function openModal() {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  // Open triggers
  if (openBtnAlerts) openBtnAlerts.addEventListener('click', openModal);
  if (openBtnIoT) openBtnIoT.addEventListener('click', openModal);

  // Close triggers
  if (closeBtn1) closeBtn1.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

  // Click outside backdrop to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. AUTHENTICATION & LOGIN SIMULATION (Frontend Formality)
   ========================================================================== */
function initAuth() {
  const loginOverlay = document.getElementById('loginOverlay');
  const googleBtn = document.getElementById('googleLoginBtn');
  const googleBtnText = document.getElementById('googleBtnText');
  const emailForm = document.getElementById('emailLoginForm');
  const emailSubmitBtn = document.getElementById('emailSubmitBtn');
  const emailBtnText = document.getElementById('emailBtnText');
  const emailBtnArrow = document.getElementById('emailBtnArrow');
  const emailInput = document.getElementById('loginEmailInput');
  const passInput = document.getElementById('loginPassInput');
  const togglePassBtn = document.getElementById('togglePassBtn');
  const forgotPassBtn = document.getElementById('forgotPassBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const authToast = document.getElementById('authToast');
  const authToastMsg = document.getElementById('authToastMsg');
  const headerUserName = document.getElementById('headerUserName');
  const headerUserRole = document.getElementById('headerUserRole');

  if (!loginOverlay) return;

  function showToast(msg) {
    if (!authToast) return;
    if (authToastMsg) authToastMsg.textContent = msg;
    authToast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-12');
    authToast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      authToast.classList.remove('opacity-100', 'translate-y-0');
      authToast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-12');
    }, 4000);
  }

  function completeLogin(userName, userRole, provider) {
    if (headerUserName && userName) headerUserName.textContent = userName;
    if (headerUserRole && userRole) headerUserRole.textContent = userRole;

    loginOverlay.classList.add('hidden-overlay');
    showToast(`Signed in via ${provider} • Access Granted`);

    if (googleBtnText) googleBtnText.textContent = 'Continue with Google Workspace';
    if (emailBtnText) emailBtnText.textContent = 'Authorize & Enter Central Core';
    if (emailBtnArrow) emailBtnArrow.classList.remove('hidden');
    if (googleBtn) googleBtn.disabled = false;
    if (emailSubmitBtn) emailSubmitBtn.disabled = false;

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // 1. Google Login Simulation
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      googleBtn.disabled = true;
      if (googleBtnText) {
        googleBtnText.innerHTML = `
          <span class="inline-flex items-center gap-2 text-[#00e5ff]">
            <span class="w-3.5 h-3.5 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin"></span>
            Verifying Google OAuth Token...
          </span>
        `;
      }

      setTimeout(() => {
        completeLogin('Dr. Elara Vance', 'Chief Ecologist (Google SSO)', 'Google Workspace');
      }, 700);
    });
  }

  // 2. Email / Password Login Simulation
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (emailSubmitBtn) emailSubmitBtn.disabled = true;
      if (emailBtnArrow) emailBtnArrow.classList.add('hidden');
      if (emailBtnText) {
        emailBtnText.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <span class="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            Authorizing Consensus Node...
          </span>
        `;
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      let displayName = 'Dr. Elara Vance';
      if (emailVal && emailVal.includes('@')) {
        const prefix = emailVal.split('@')[0];
        displayName = prefix.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      }

      setTimeout(() => {
        completeLogin(displayName, 'Lead Systems Auditor (Enterprise)', 'Enterprise SSO');
      }, 650);
    });
  }

  // 3. Toggle Password Visibility
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      togglePassBtn.innerHTML = isPassword 
        ? '<i data-lucide="eye-off" class="w-4 h-4"></i>'
        : '<i data-lucide="eye" class="w-4 h-4"></i>';
      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    });
  }

  // 4. Forgot Password Action
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Encrypted token recovery dispatched to administrator node');
    });
  }

  // 5. Sign Out / Switch Profile Action
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      loginOverlay.classList.remove('hidden-overlay');
      showToast('Logged out of Central Core node session');
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE WIDGETS & SYSTEM CONTROLS
   ========================================================================== */
function initInteractiveWidgets() {
  const toast = document.getElementById('authToast');
  const toastMsg = document.getElementById('authToastMsg');
  const mainViewport = document.querySelector('main');

  function triggerToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-12');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-12');
    }, 3800);
  }

  // 1. Download ESG Audit Report
  const downloadBtn = document.getElementById('downloadEsgAuditBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-[#00e5ff]">
          <span class="w-3 h-3 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin"></span>
          Generating PDF...
        </span>
      `;
      setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        triggerToast('Report Downloaded: SYNAPSE_ESG_Audit_2026.pdf (SHA-256 Verified)');
      }, 700);
    });
  }

  // 2. Notification Bell System Alerts
  const bellBtn = document.getElementById('notificationBellBtn');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      triggerToast('System Alerts: All 14 industrial recycling units operating optimally (0 Critical Alerts)');
    });
  }

  // 3. Quick System Status Badge
  const statusBadge = document.getElementById('systemStatusBadge');
  if (statusBadge) {
    statusBadge.addEventListener('click', () => {
      triggerToast('Network Telemetry: 99.98% Node Uptime • Consensus Protocol: Hyperledger Fabric');
    });
  }

  // 4. Global Search Keyboard Shortcut & Input
  const searchInput = document.getElementById('globalSearchInput');
  const searchBadge = document.getElementById('searchShortcutBadge');

  if (searchBadge && searchInput) {
    searchBadge.addEventListener('click', () => {
      searchInput.focus();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement !== searchInput)) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          triggerToast(`Query filter applied: "${query}" — 14 matched nodes`);
        }
      }
    });
  }

  // 5. Compliance Audit & System Settings
  const navAudit = document.getElementById('navComplianceAudit');
  const navSettings = document.getElementById('navSystemSettings');

  if (navAudit) {
    navAudit.addEventListener('click', () => {
      triggerToast('Compliance Audit: ISO 14044 LCA & GHG Scope 1-3 Standards Verified');
    });
  }

  if (navSettings) {
    navSettings.addEventListener('click', () => {
      triggerToast('System Settings: Industrial Ecology Node Configuration • Security Clearance Level 5');
    });
  }
}

/* ==========================================================================
   11. TAB-BASED NAVIGATION SYSTEM (Reduced Cognitive Overload)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.sidebar-tab-btn');
  const quickSwitchBtns = document.querySelectorAll('[data-switch-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  const mainContent = document.getElementById('dashboardMain') || document.querySelector('main');

  const tabLabels = {
    'tab-dashboard': 'Executive Overview & KPIs',
    'tab-molecular': 'Molecular AI GNN Analysis',
    'tab-logistics': 'Global Spatial Logistics Map',
    'tab-digital-twin': 'Factory Digital Twin — Plant Alpha',
    'tab-sankey': 'Material Flow Analysis (Sankey)',
    'tab-carbon-ledger': 'Automated ESG & Circular Carbon Ledger'
  };

  function switchTab(targetTabId) {
    if (!targetTabId) return;

    // 1. Hide all tab panes
    tabPanes.forEach(pane => {
      pane.classList.add('hidden');
    });

    // 2. Show the target tab pane
    const targetPane = document.getElementById(targetTabId);
    if (targetPane) {
      targetPane.classList.remove('hidden');
    }

    // 3. Update sidebar buttons active styling
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === targetTabId;
      if (isTarget) {
        btn.classList.add('active');
        btn.classList.remove('text-slate-400', 'border-transparent');
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-slate-400', 'border-transparent');
      }
    });

    // 4. Update breadcrumb text
    if (breadcrumbCurrent && tabLabels[targetTabId]) {
      breadcrumbCurrent.textContent = tabLabels[targetTabId];
    }

    // 5. Scroll main container smoothly to top
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Auto-close mobile drawer on tab switch
    const sidebar = document.getElementById('sidebarDrawer');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && backdrop && window.innerWidth < 768) {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    // 6. CRITICAL FIX: Trigger window resize event after short delay
    // This recalculates WebGL and Canvas buffer dimensions for newly unhidden containers
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }, 60);
  }

  // Bind Sidebar Tab Buttons
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = btn.getAttribute('data-tab');
      if (targetTabId) {
        switchTab(targetTabId);
      }
    });
  });

  // Bind Quick Switch Buttons in Overview
  quickSwitchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = btn.getAttribute('data-switch-tab');
      if (targetTabId) {
        switchTab(targetTabId);
      }
    });
  });
}

/* ==========================================================================
   12. MOBILE SIDEBAR DRAWER (Responsive Off-Canvas Navigation)
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeSidebarBtn');
  const sidebar = document.getElementById('sidebarDrawer');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (!sidebar) return;

  function openDrawer() {
    sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeDrawer() {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
}

/* ==========================================================================
   13. SWIPE-TO-ARCHIVE INTERACTION (Mobile Gesture & Undo Architecture)
   ========================================================================== */
function initSwipeToArchive() {
  const alertContainers = document.querySelectorAll('.swipe-alert-container');
  const activeCounter = document.getElementById('activeAlertsCounter');
  const triggerCounter = document.getElementById('alertTriggerCount');

  let activeCount = alertContainers.length;

  function updateCounters() {
    if (activeCounter) activeCounter.textContent = `${activeCount} Active`;
    if (triggerCounter) triggerCounter.textContent = `${activeCount} Subsystem Alerts`;
  }

  alertContainers.forEach(container => {
    const card = container.querySelector('.swipe-alert-card');
    const archivePane = container.querySelector('.swipe-archive-pane');
    const undoPane = container.querySelector('.swipe-undo-pane');
    const undoBtn = container.querySelector('.swipe-undo-btn');

    if (!card || !archivePane || !undoPane) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isSwiping = false;
    let isHorizontalSwipe = false;
    const swipeThreshold = 80; // pixels to trigger archive

    // Touch Handlers
    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = 0;
      isSwiping = true;
      isHorizontalSwipe = false;
      card.classList.add('swiping');
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - startX;
      const deltaY = touchY - startY;

      // Detect horizontal swipe vs vertical scroll
      if (!isHorizontalSwipe) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
          isHorizontalSwipe = true;
        }
      }

      if (isHorizontalSwipe) {
        // Prevent vertical scroll while performing a horizontal swipe
        if (e.cancelable) e.preventDefault();

        // Only allow swiping left (deltaX <= 0)
        if (deltaX < 0) {
          currentX = deltaX;
          card.style.transform = `translateX(${deltaX}px)`;
          const progress = Math.min(1, Math.abs(deltaX) / (swipeThreshold * 1.5));
          archivePane.style.opacity = Math.max(0.2, progress);
        } else {
          // Slight resistance if dragging right
          card.style.transform = `translateX(${deltaX * 0.2}px)`;
        }
      }
    }, { passive: false });

    function finishSwipe() {
      if (!isSwiping) return;
      isSwiping = false;
      card.classList.remove('swiping');

      // Check if swiped far enough to the left
      if (isHorizontalSwipe && currentX < -swipeThreshold) {
        // Complete the swipe off-screen
        card.style.transform = 'translateX(-105%)';
        
        setTimeout(() => {
          card.classList.add('hidden');
          undoPane.classList.remove('hidden');
          undoPane.classList.add('flex');
          activeCount = Math.max(0, activeCount - 1);
          updateCounters();
        }, 220);
      } else {
        // Snap back
        card.style.transform = 'translateX(0px)';
      }
      currentX = 0;
      isHorizontalSwipe = false;
    }

    card.addEventListener('touchend', finishSwipe);
    card.addEventListener('touchcancel', finishSwipe);

    // Mouse Drag Emulation for desktop testing
    let isMouseDown = false;
    card.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;
      currentX = 0;
      card.classList.add('swiping');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - startX;
      if (deltaX < 0) {
        currentX = deltaX;
        card.style.transform = `translateX(${deltaX}px)`;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      card.classList.remove('swiping');

      if (currentX < -swipeThreshold) {
        card.style.transform = 'translateX(-105%)';
        setTimeout(() => {
          card.classList.add('hidden');
          undoPane.classList.remove('hidden');
          undoPane.classList.add('flex');
          activeCount = Math.max(0, activeCount - 1);
          updateCounters();
        }, 220);
      } else {
        card.style.transform = 'translateX(0px)';
      }
      currentX = 0;
    });

    // Undo Interaction
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        undoPane.classList.add('hidden');
        undoPane.classList.remove('flex');
        card.classList.remove('hidden');
        card.style.transform = 'translateX(-105%)';
        
        // Force reflow
        void card.offsetWidth;
        
        card.style.transform = 'translateX(0px)';
        activeCount++;
        updateCounters();
      });
    }
  });
}

