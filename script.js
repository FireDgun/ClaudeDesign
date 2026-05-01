/* ==========================================================
   NEXUS BUILD — Interaction & 3D scenes
   ========================================================== */
import * as THREE from 'three';

/* ----------------------------------------------------------
   1. LOADER
   ---------------------------------------------------------- */
(() => {
  const loader = document.getElementById('loader');
  const fill = loader.querySelector('.loader-bar-fill');
  const percent = loader.querySelector('.loader-percent');
  const message = loader.querySelector('.loader-message');

  const messages = [
    'מאתחל מערכות תלת-ממד...',
    'טוען מודל בניין SKYLINE_TOWER...',
    'מסנכרן עם רשת AI...',
    'מחשב הצללות...',
    'מוכן.'
  ];

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hidden'), 500);
    }
    fill.style.right = (100 - progress) + '%';
    percent.textContent = Math.floor(progress) + '%';
    const idx = Math.min(Math.floor(progress / 25), messages.length - 1);
    message.textContent = messages[idx];
  }, 180);
})();

/* ----------------------------------------------------------
   2. CUSTOM CURSOR
   ---------------------------------------------------------- */
(() => {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor) return;

  let mx = 0, my = 0, cx = 0, cy = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  const tick = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll('a, button, [data-tilt], input, select, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
})();

/* ----------------------------------------------------------
   3. NAV SCROLL EFFECT
   ---------------------------------------------------------- */
(() => {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ----------------------------------------------------------
   4. HERO 3D SCENE — Futuristic city with floating buildings
   ---------------------------------------------------------- */
(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050608, 0.018);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 18, 50);
  camera.lookAt(0, 8, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ----- Lights ----- */
  const ambient = new THREE.AmbientLight(0x88aaff, 0.3);
  scene.add(ambient);

  const cyanLight = new THREE.PointLight(0x4ee0ff, 2, 80);
  cyanLight.position.set(-25, 18, 12);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa479ff, 2, 80);
  violetLight.position.set(25, 22, 12);
  scene.add(violetLight);

  const moonLight = new THREE.DirectionalLight(0xffffff, 0.4);
  moonLight.position.set(0, 30, 20);
  scene.add(moonLight);

  /* ----- Ground grid ----- */
  const gridHelper = new THREE.GridHelper(160, 60, 0x4ee0ff, 0x223344);
  gridHelper.position.y = 0;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.35;
  scene.add(gridHelper);

  /* Reflective floor plane */
  const floorGeo = new THREE.PlaneGeometry(160, 160);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c12,
    metalness: 0.9,
    roughness: 0.4,
    transparent: true,
    opacity: 0.6
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.01;
  scene.add(floor);

  /* ----- Buildings ----- */
  const buildings = new THREE.Group();
  scene.add(buildings);

  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c12,
    metalness: 0.95,
    roughness: 0.25,
    emissive: 0x0a1a2c,
    emissiveIntensity: 0.4
  });

  const edgeMatCyan = new THREE.LineBasicMaterial({
    color: 0x4ee0ff,
    transparent: true,
    opacity: 0.85
  });
  const edgeMatViolet = new THREE.LineBasicMaterial({
    color: 0xa479ff,
    transparent: true,
    opacity: 0.7
  });

  const buildingsData = [];
  const ROWS = 7, COLS = 7;
  for (let i = -ROWS; i <= ROWS; i++) {
    for (let j = -COLS; j <= COLS; j++) {
      // Skip center area for openness
      if (Math.abs(i) < 2 && Math.abs(j) < 2) continue;

      const dist = Math.sqrt(i * i + j * j);
      const w = 2 + Math.random() * 1.6;
      const d = 2 + Math.random() * 1.6;
      const baseH = Math.max(2, 18 - dist * 1.4 + Math.random() * 8);
      const h = baseH;

      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wireMat);
      mesh.position.set(i * 5 + (Math.random() - 0.5) * 1.5, h / 2, j * 5 + (Math.random() - 0.5) * 1.5);
      buildings.add(mesh);

      // Edges
      const edges = new THREE.EdgesGeometry(geo);
      const useViolet = Math.random() > 0.7;
      const lines = new THREE.LineSegments(edges, useViolet ? edgeMatViolet : edgeMatCyan);
      lines.position.copy(mesh.position);
      buildings.add(lines);

      // Window grid via small emissive dots
      if (Math.random() > 0.4) {
        const dotMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x4ee0ff : 0xffb547,
          transparent: true,
          opacity: 0.6
        });
        const cnt = Math.floor(h * 0.6);
        for (let k = 0; k < cnt; k++) {
          if (Math.random() > 0.6) continue;
          const dot = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), dotMat);
          dot.position.set(
            mesh.position.x + (Math.random() > 0.5 ? w / 2 + 0.01 : -w / 2 - 0.01),
            (k * 1.2) + 1,
            mesh.position.z + (Math.random() - 0.5) * d * 0.7
          );
          dot.lookAt(mesh.position.x, dot.position.y, dot.position.z);
          buildings.add(dot);
        }
      }

      buildingsData.push({
        mesh,
        baseY: h / 2,
        targetY: h / 2,
        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        amp: 0.4 + Math.random() * 0.6
      });
    }
  }

  /* ----- Floating central tower (the hero piece) ----- */
  const towerGroup = new THREE.Group();
  scene.add(towerGroup);

  const segments = 12;
  for (let i = 0; i < segments; i++) {
    const w = 4 - i * 0.18;
    const segH = 1.4;
    const y = i * (segH + 0.2);
    const segGeo = new THREE.BoxGeometry(w, segH, w);
    const segMesh = new THREE.Mesh(segGeo, new THREE.MeshStandardMaterial({
      color: 0x0d1220,
      metalness: 1,
      roughness: 0.2,
      emissive: i % 2 === 0 ? 0x0e2a3d : 0x1a0d2e,
      emissiveIntensity: 0.6
    }));
    segMesh.position.y = y + 5;
    towerGroup.add(segMesh);

    const segEdges = new THREE.EdgesGeometry(segGeo);
    const segLines = new THREE.LineSegments(segEdges, edgeMatCyan.clone());
    segLines.position.copy(segMesh.position);
    towerGroup.add(segLines);
  }

  /* ----- Particles (digital snow) ----- */
  const particleCount = 350;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = Math.random() * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    speeds[i] = 0.02 + Math.random() * 0.05;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x4ee0ff,
    size: 0.12,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ----- Scanning ring ----- */
  const ringGeo = new THREE.RingGeometry(15, 15.3, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x4ee0ff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  scene.add(ring);

  /* ----- Mouse parallax ----- */
  let pointerX = 0, pointerY = 0;
  let camX = 0, camY = 18;
  window.addEventListener('mousemove', (e) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ----- Resize ----- */
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  /* ----- Animate ----- */
  const clock = new THREE.Clock();
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  const animate = () => {
    const t = clock.getElapsedTime();

    // Camera parallax
    camX += ((pointerX * 6) - camX) * 0.04;
    camY += ((18 + pointerY * 3) - camY) * 0.04;
    camera.position.x = camX;
    camera.position.y = camY - scrollY * 0.02;
    camera.lookAt(0, 8, 0);

    // Buildings float
    buildingsData.forEach(b => {
      b.mesh.position.y = b.baseY + Math.sin(t * b.speed + b.offset) * b.amp;
    });

    // Tower rotate
    towerGroup.rotation.y = t * 0.15;
    towerGroup.position.y = Math.sin(t * 0.5) * 0.6;

    // Particles fall
    const pos = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] -= speeds[i];
      if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 50;
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Ring scan
    const scale = 0.5 + ((t * 0.4) % 1) * 2;
    ring.scale.set(scale, scale, scale);
    ringMat.opacity = 0.5 * (1 - ((t * 0.4) % 1));

    // Lights orbit
    cyanLight.position.x = Math.sin(t * 0.3) * 25;
    cyanLight.position.z = Math.cos(t * 0.3) * 25;
    violetLight.position.x = Math.sin(t * 0.3 + Math.PI) * 25;
    violetLight.position.z = Math.cos(t * 0.3 + Math.PI) * 25;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
})();

/* ----------------------------------------------------------
   5. TECH SHOWCASE — Wireframe rotating building
   ---------------------------------------------------------- */
(() => {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(8, 8, 14);
  camera.lookAt(0, 4, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0x4488ff, 0.4);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0x4ee0ff, 1.5);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);
  const dirLight2 = new THREE.DirectionalLight(0xa479ff, 1);
  dirLight2.position.set(-5, 5, -5);
  scene.add(dirLight2);

  /* Building model — assembled from layers */
  const tower = new THREE.Group();
  scene.add(tower);

  const layerCount = 14;
  const layers = [];

  for (let i = 0; i < layerCount; i++) {
    const w = 3.6 - i * 0.12 + Math.sin(i * 0.5) * 0.3;
    const layerGroup = new THREE.Group();

    // Solid layer
    const geo = new THREE.BoxGeometry(w, 0.6, w);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0d1220,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0x0e2a3d,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85
    });
    const layer = new THREE.Mesh(geo, mat);
    layerGroup.add(layer);

    // Wireframe layer
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4ee0ff, transparent: true, opacity: 0.9 });
    const lines = new THREE.LineSegments(edges, lineMat);
    layerGroup.add(lines);

    // Pillars between layers
    if (i > 0) {
      const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4);
      const pillarMat = new THREE.MeshBasicMaterial({ color: 0x4ee0ff });
      [-1, 1].forEach(sx => [-1, 1].forEach(sz => {
        const p = new THREE.Mesh(pillarGeo, pillarMat);
        p.position.set(sx * (w / 2 - 0.15), -0.2, sz * (w / 2 - 0.15));
        layerGroup.add(p);
      }));
    }

    layerGroup.position.y = i * 0.85;
    layerGroup.userData = { targetY: i * 0.85, baseScale: 1, index: i };
    layerGroup.scale.set(0.01, 0.01, 0.01);  // start hidden, animate in
    tower.add(layerGroup);
    layers.push(layerGroup);
  }

  /* Antenna */
  const antennaGeo = new THREE.CylinderGeometry(0.05, 0.15, 2);
  const antennaMat = new THREE.MeshStandardMaterial({
    color: 0xa479ff,
    emissive: 0xa479ff,
    emissiveIntensity: 0.5
  });
  const antenna = new THREE.Mesh(antennaGeo, antennaMat);
  antenna.position.y = layerCount * 0.85 + 0.5;
  antenna.scale.set(0.01, 0.01, 0.01);
  tower.add(antenna);

  /* Tip light */
  const tipGeo = new THREE.SphereGeometry(0.15);
  const tipMat = new THREE.MeshBasicMaterial({ color: 0xff6ec7 });
  const tip = new THREE.Mesh(tipGeo, tipMat);
  tip.position.y = layerCount * 0.85 + 1.5;
  tower.add(tip);

  /* Orbit ring */
  const ringGeo = new THREE.TorusGeometry(5, 0.03, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x4ee0ff, transparent: true, opacity: 0.4 });
  const orbitRing = new THREE.Mesh(ringGeo, ringMat);
  orbitRing.rotation.x = Math.PI / 2;
  orbitRing.position.y = 4;
  scene.add(orbitRing);

  const ringGeo2 = new THREE.TorusGeometry(6, 0.02, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa479ff, transparent: true, opacity: 0.3 });
  const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  orbitRing2.rotation.x = Math.PI / 2;
  orbitRing2.rotation.z = Math.PI / 6;
  orbitRing2.position.y = 6;
  scene.add(orbitRing2);

  /* Orbit satellites */
  const satellites = [];
  for (let i = 0; i < 3; i++) {
    const sat = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.15),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0x4ee0ff : i === 1 ? 0xa479ff : 0xff6ec7 })
    );
    scene.add(sat);
    satellites.push({ mesh: sat, offset: (i / 3) * Math.PI * 2, radius: 5 + i * 0.5, height: 4 + i * 0.5 });
  }

  /* Resize */
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  /* Pointer-controlled rotation */
  let targetRotY = 0, targetRotX = 0;
  let curRotY = 0, curRotX = 0;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    targetRotY = x * 1.2;
    targetRotX = y * 0.4;
  });

  /* Build animation: layers rise into place when section visible */
  let assembled = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !assembled) {
        assembled = true;
        layers.forEach((layer, idx) => {
          setTimeout(() => {
            const start = performance.now();
            const dur = 600;
            const animate = () => {
              const p = Math.min(1, (performance.now() - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              layer.scale.setScalar(eased);
              if (p < 1) requestAnimationFrame(animate);
            };
            animate();
          }, idx * 80);
        });
        setTimeout(() => {
          const start = performance.now();
          const animate = () => {
            const p = Math.min(1, (performance.now() - start) / 600);
            antenna.scale.setScalar(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(animate);
          };
          animate();
        }, layerCount * 80);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(canvas);

  /* Animate */
  const clock = new THREE.Clock();
  const animate = () => {
    const t = clock.getElapsedTime();

    curRotY += (targetRotY - curRotY) * 0.06;
    curRotX += (targetRotX - curRotX) * 0.06;
    tower.rotation.y = t * 0.2 + curRotY;
    tower.rotation.x = curRotX;
    tower.position.y = -4 + Math.sin(t * 0.6) * 0.15;

    orbitRing.rotation.z = t * 0.3;
    orbitRing2.rotation.z = -t * 0.4;

    satellites.forEach((s, i) => {
      const angle = t * (0.4 + i * 0.1) + s.offset;
      s.mesh.position.x = Math.cos(angle) * s.radius;
      s.mesh.position.z = Math.sin(angle) * s.radius;
      s.mesh.position.y = s.height + Math.sin(t + i) * 0.3 - 4;
      s.mesh.rotation.x = t;
      s.mesh.rotation.y = t * 1.3;
    });

    // Tip pulse
    const pulseScale = 1 + Math.sin(t * 4) * 0.3;
    tip.scale.setScalar(pulseScale);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  /* Live readout updates */
  const verts = document.getElementById('tech-verts');
  const load = document.getElementById('tech-load');
  if (verts && load) {
    setInterval(() => {
      const v = 800000 + Math.floor(Math.random() * 60000);
      verts.textContent = v.toLocaleString('en-US');
      load.style.width = (50 + Math.random() * 30) + '%';
    }, 1500);
  }
})();

/* ----------------------------------------------------------
   6. NUMBER COUNTERS
   ---------------------------------------------------------- */
(() => {
  const counters = document.querySelectorAll('[data-counter]');
  const animate = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const dur = 1800;
    const start = performance.now();
    const step = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(target * eased).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    };
    step();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animate(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
})();

/* ----------------------------------------------------------
   7. SERVICE CARD MOUSE-TRACK GLOW
   ---------------------------------------------------------- */
(() => {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();

/* ----------------------------------------------------------
   8. TIMELINE REVEAL
   ---------------------------------------------------------- */
(() => {
  const steps = document.querySelectorAll('.timeline-step');
  const line = document.querySelector('.timeline-line');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  steps.forEach(s => observer.observe(s));

  // Update timeline progress line
  const updateLine = () => {
    if (!line) return;
    const tl = line.parentElement;
    const r = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = r.top - vh * 0.6;
    const end = r.bottom - vh * 0.4;
    const total = end - start;
    const cur = -start;
    const p = Math.max(0, Math.min(1, cur / total));
    line.style.setProperty('--progress', (p * 100) + '%');
  };
  window.addEventListener('scroll', updateLine, { passive: true });
  updateLine();
})();

/* ----------------------------------------------------------
   9. STATS BAR REVEAL
   ---------------------------------------------------------- */
(() => {
  const stats = document.querySelectorAll('[data-counter-stat]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.4 });
  stats.forEach(s => observer.observe(s));
})();

/* ----------------------------------------------------------
   10. CONTACT FORM
   ---------------------------------------------------------- */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>שולח...</span>';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.innerHTML = '<span>נשלח בהצלחה ✓</span>';
      btn.style.background = 'linear-gradient(135deg, #c8ff5e, #4ee0ff)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.opacity = '';
        btn.style.background = '';
        form.reset();
      }, 2400);
    }, 1200);
  });
})();

/* ----------------------------------------------------------
   11. SMOOTH ANCHOR SCROLL
   ---------------------------------------------------------- */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
