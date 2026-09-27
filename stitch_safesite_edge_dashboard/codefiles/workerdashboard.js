// workerdashboard.js
// State management & Biometric telemetry bindings

let currentState = 'critical'; // 'critical' | 'warning' | 'safe'
let isRestingActive = false;

// Helper: Determine if resting action is permitted based on worker status/risk level
// Available ONLY when risk level is INTERMEDIATE / WARNING or CRITICAL.
// Disabled when SAFE / LOW.
function isRestingAllowed(status) {
  const s = String(status || '').toLowerCase().trim();
  if (s === 'safe' || s === 'low') {
    return false;
  }
  return s === 'critical' || s === 'warning' || s === 'intermediate';
}

// Toast helper
function showToast(message, icon = '✓') {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast || !toastMsg || !toastIcon) return;
  
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  toast.classList.remove('translate-y-24', 'opacity-0');
  
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 3200);
}

// Tab Navigation Switcher
function switchTab(tabId) {
  const tabs = ['safety', 'alerts', 'watch', 'history', 'profile'];
  tabs.forEach(t => {
    const view = document.getElementById(`tab-view-${t}`);
    const navBtn = document.getElementById(`nav-${t}`);
    if (view) view.classList.add('hidden');
    if (navBtn) {
      navBtn.classList.remove('bg-brand-600', 'text-white', 'shadow-xs');
      navBtn.classList.add('text-slate-600');
    }
  });

  const targetView = document.getElementById(`tab-view-${tabId}`);
  const targetNav = document.getElementById(`nav-${tabId}`);
  if (targetView) targetView.classList.remove('hidden');
  if (targetNav) {
    targetNav.classList.remove('text-slate-600');
    targetNav.classList.add('bg-brand-600', 'text-white', 'shadow-xs');
  }
}

// Update Resting Button Appearance & Interactivity based on status
function updateRestingButton(status) {
  const btn = document.getElementById('btnResting');
  const btnText = document.getElementById('btnRestingText');
  if (!btn || !btnText) return;

  const allowed = isRestingAllowed(status);

  if (!allowed) {
    // Disabled state for SAFE workers
    isRestingActive = false;
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
    btn.className = "w-full px-5 py-3 rounded-xl text-slate-400 font-black text-sm bg-slate-200 cursor-not-allowed opacity-60 flex items-center justify-center space-x-2 shadow-none pointer-events-none";
    btnText.textContent = "I'M RESTING NOW";
    btn.title = "Resting action disabled: Worker status is SAFE";
  } else {
    // Enabled state for WARNING / INTERMEDIATE / CRITICAL workers
    btn.disabled = false;
    btn.removeAttribute('aria-disabled');
    btn.title = "Log immediate rest break";

    if (isRestingActive) {
      btn.className = "w-full px-5 py-3 rounded-xl text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer";
      btnText.textContent = "I'M RESTING (STATUS ACTIVE)";
    } else {
      const s = String(status || '').toLowerCase().trim();
      if (s === 'warning' || s === 'intermediate') {
        btn.className = "w-full px-5 py-3 rounded-xl text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 cursor-pointer";
      } else {
        btn.className = "w-full px-5 py-3 rounded-xl text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 bg-danger-solid hover:bg-danger-dark cursor-pointer";
      }
      btnText.textContent = "I'M RESTING NOW";
    }
  }
}

// Toggle Worker Resting Action
function toggleRestingState() {
  if (!isRestingAllowed(currentState)) {
    showToast("Resting action not required. Worker vitals are safe.", "ℹ️");
    return;
  }

  isRestingActive = !isRestingActive;
  updateRestingButton(currentState);

  if (isRestingActive) {
    showToast("Rest status active. Site supervisor notified you are taking shade.");
  } else {
    showToast("Rest ended. Resuming telemetry tracking.");
  }
}

// Quick Hydration Log
function logHydrationQuick() {
  const hyd = document.getElementById('hydrationStatus');
  if (hyd) hyd.textContent = "Last confirmed: Just now (500ml)";
  showToast("Hydration confirmed: 500ml logged to your profile.", "💧");
}

// Emergency Modal Handling
function openHelpModal() {
  const modal = document.getElementById('helpModal');
  if (modal) modal.classList.remove('hidden');
}

function closeHelpModal() {
  const modal = document.getElementById('helpModal');
  if (modal) modal.classList.add('hidden');
}

function confirmHelpDispatch() {
  closeHelpModal();
  showToast(" Emergency help requested! Medic dispatched to Zone 4.");
  const dispatchNotice = document.getElementById('supervisorDispatchNotice');
  if (dispatchNotice) {
    dispatchNotice.textContent = "EMERGENCY DISPATCH IN TRANSIT: Medic & Supervisor en route to Zone 4.";
    if (dispatchNotice.parentElement) {
      dispatchNotice.parentElement.classList.remove('text-emerald-700');
      dispatchNotice.parentElement.classList.add('text-red-700', 'font-black');
    }
  }
}

// Acknowledge Single Alert
function acknowledgeAlert(id) {
  const btn = document.getElementById(`btnAck${id}`);
  const btnFull = document.getElementById(`btnAckFull${id}`);
  if (btn) {
    btn.textContent = "✓ Done";
    btn.disabled = true;
    btn.classList.replace('text-red-700', 'text-emerald-700');
    btn.classList.replace('border-red-300', 'border-emerald-300');
  }
  if (btnFull) {
    btnFull.textContent = "✓ Acknowledged";
    btnFull.classList.replace('bg-red-600', 'bg-emerald-600');
  }
  const badge = document.getElementById('alertCountBadge');
  if (badge) badge.textContent = "0";
  showToast("Alert acknowledged. Supervisor informed.");
}

// Manual Refresh Telemetry Sync
function refreshData() {
  const timestamp = document.getElementById('lastUpdateTimestamp');
  if (timestamp) timestamp.textContent = "Just now";
  showToast("SmartWatch sensors re-synced successfully.");
}

// DEMO CONTROLLER: Dynamic State Switcher (Critical 91 | Warning 64 | Safe 24)
function setSafetyState(state) {
  currentState = state;
  isRestingActive = false;

  const banner = document.getElementById('safetyHeroBanner');
  const score = document.getElementById('heroScoreValue');
  const pill = document.getElementById('heroStatusPill');
  const title = document.getElementById('heroStatusTitle');
  const instruction = document.getElementById('heroStatusInstruction');
  const navBadge = document.getElementById('navRiskBadge');
  const headerBadge = document.getElementById('headerStatusBadge');

  // Sensor value nodes
  const hr = document.getElementById('valHR');
  const skin = document.getElementById('valSkinTemp');
  const spo2 = document.getElementById('valSpO2');
  const barHR = document.getElementById('barHR');
  const barSkinTemp = document.getElementById('barSkinTemp');
  const barSpO2 = document.getElementById('barSpO2');
  const valHumidity = document.getElementById('valHumidity');
  const valAmbientTemp = document.getElementById('valAmbientTemp');
  const valActivity = document.getElementById('valActivity');
  const badgeHR = document.getElementById('badgeHR');
  const badgeSkinTemp = document.getElementById('badgeSkinTemp');
  const badgeSpO2 = document.getElementById('badgeSpO2');
  const deltaSkinTemp = document.getElementById('deltaSkinTemp');

  // Reset demo buttons if present
  ['Critical', 'Warning', 'Safe'].forEach(s => {
    const btn = document.getElementById(`demoBtn${s}`);
    if (btn) {
      btn.className = "px-2.5 py-1 rounded-lg font-semibold text-slate-600 hover:text-slate-900 transition-all";
    }
  });

  const normState = String(state || '').toLowerCase().trim();

  if (normState === 'critical') {
    const dBtn = document.getElementById('demoBtnCritical');
    if (dBtn) dBtn.className = "px-2.5 py-1 rounded-lg font-bold bg-white text-danger-solid shadow-xs transition-all";
    
    if (banner) banner.className = "bg-danger-card border-2 border-danger-border rounded-2xl p-5 md:p-6 shadow-critical transition-all";
    if (score) {
      score.textContent = "91";
      score.className = "text-4xl md:text-5xl font-black text-danger-solid leading-none";
    }
    if (pill) {
      pill.textContent = "CRITICAL";
      pill.className = "px-2.5 py-0.5 text-xs font-black rounded-md uppercase tracking-wider bg-danger-solid text-white";
    }
    if (title) title.innerHTML = '<span class="mr-2">🔴</span> STOP WORK &amp; REST IMMEDIATELY';
    if (instruction) instruction.textContent = "Your biometric sensors detect severe heat strain and thermal spike. Move immediately to a shaded or air-conditioned rest station and hydrate.";
    if (navBadge) {
      navBadge.textContent = "91";
      navBadge.className = "text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white";
    }
    if (headerBadge) {
      headerBadge.textContent = "High Risk Alert";
      headerBadge.className = "bg-red-100 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    }
    
    if (hr) hr.textContent = "148";
    if (barHR) {
      barHR.style.width = "88%";
      barHR.className = "bg-red-500 h-1.5 rounded-full";
    }
    if (badgeHR) {
      badgeHR.textContent = "VERY HIGH";
      badgeHR.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-700";
    }

    if (skin) skin.textContent = "38.9";
    if (barSkinTemp) {
      barSkinTemp.style.width = "90%";
      barSkinTemp.className = "bg-red-500 h-1.5 rounded-full";
    }
    if (badgeSkinTemp) {
      badgeSkinTemp.textContent = "VERY HIGH";
      badgeSkinTemp.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-700";
    }
    if (deltaSkinTemp) {
      deltaSkinTemp.textContent = "▲ +1.7°C";
      deltaSkinTemp.className = "text-red-500 font-bold";
    }

    if (spo2) spo2.textContent = "94";
    if (barSpO2) {
      barSpO2.style.width = "70%";
      barSpO2.className = "bg-amber-500 h-1.5 rounded-full";
    }
    if (badgeSpO2) {
      badgeSpO2.textContent = "LOW";
      badgeSpO2.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800";
    }

    if (valHumidity) valHumidity.textContent = "78";
    if (valAmbientTemp) valAmbientTemp.textContent = "34";
    if (valActivity) valActivity.textContent = "Heavy Labor";
  } 
  else if (normState === 'warning' || normState === 'intermediate') {
    const dBtn = document.getElementById('demoBtnWarning');
    if (dBtn) dBtn.className = "px-2.5 py-1 rounded-lg font-bold bg-white text-amber-600 shadow-xs transition-all";
    
    if (banner) banner.className = "bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 md:p-6 shadow-xs transition-all";
    if (score) {
      score.textContent = "64";
      score.className = "text-4xl md:text-5xl font-black text-amber-600 leading-none";
    }
    if (pill) {
      pill.textContent = "ATTENTION";
      pill.className = "px-2.5 py-0.5 text-xs font-black rounded-md uppercase tracking-wider bg-amber-500 text-white";
    }
    if (title) title.innerHTML = '<span class="mr-2">🟡</span> ELEVATED HEAT STRAIN DETECTED';
    if (instruction) instruction.textContent = "Thermal exertion is climbing. Slow your physical pace, drink electrolyte fluid, and seek ventilation break within 10 minutes.";
    if (navBadge) {
      navBadge.textContent = "64";
      navBadge.className = "text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white";
    }
    if (headerBadge) {
      headerBadge.textContent = "Moderate Heat Warning";
      headerBadge.className = "bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    }
    
    if (hr) hr.textContent = "128";
    if (barHR) {
      barHR.style.width = "65%";
      barHR.className = "bg-amber-500 h-1.5 rounded-full";
    }
    if (badgeHR) {
      badgeHR.textContent = "HIGH";
      badgeHR.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800";
    }

    if (skin) skin.textContent = "37.8";
    if (barSkinTemp) {
      barSkinTemp.style.width = "75%";
      barSkinTemp.className = "bg-amber-500 h-1.5 rounded-full";
    }
    if (badgeSkinTemp) {
      badgeSkinTemp.textContent = "ELEVATED";
      badgeSkinTemp.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800";
    }
    if (deltaSkinTemp) {
      deltaSkinTemp.textContent = "▲ +0.6°C";
      deltaSkinTemp.className = "text-amber-600 font-bold";
    }

    if (spo2) spo2.textContent = "96";
    if (barSpO2) {
      barSpO2.style.width = "80%";
      barSpO2.className = "bg-amber-500 h-1.5 rounded-full";
    }
    if (badgeSpO2) {
      badgeSpO2.textContent = "FAIR";
      badgeSpO2.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800";
    }

    if (valHumidity) valHumidity.textContent = "70";
    if (valAmbientTemp) valAmbientTemp.textContent = "33";
    if (valActivity) valActivity.textContent = "Steel Erection";
  } 
  else if (normState === 'safe' || normState === 'low') {
    const dBtn = document.getElementById('demoBtnSafe');
    if (dBtn) dBtn.className = "px-2.5 py-1 rounded-lg font-bold bg-white text-emerald-600 shadow-xs transition-all";
    
    if (banner) banner.className = "bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 md:p-6 shadow-xs transition-all";
    if (score) {
      score.textContent = "24";
      score.className = "text-4xl md:text-5xl font-black text-emerald-600 leading-none";
    }
    if (pill) {
      pill.textContent = "NORMAL / SAFE";
      pill.className = "px-2.5 py-0.5 text-xs font-black rounded-md uppercase tracking-wider bg-emerald-600 text-white";
    }
    if (title) title.innerHTML = '<span class="mr-2">🟢</span> ALL VITALS NORMAL &amp; SAFE';
    if (instruction) instruction.textContent = "Biometric readings and core skin temperature are in safe physiological range. Continue standard work pace with routine hydration.";
    if (navBadge) {
      navBadge.textContent = "24";
      navBadge.className = "text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white";
    }
    if (headerBadge) {
      headerBadge.textContent = "Vitals Healthy";
      headerBadge.className = "bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
    }
    
    if (hr) hr.textContent = "78";
    if (barHR) {
      barHR.style.width = "35%";
      barHR.className = "bg-emerald-500 h-1.5 rounded-full";
    }
    if (badgeHR) {
      badgeHR.textContent = "NORMAL";
      badgeHR.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700";
    }

    if (skin) skin.textContent = "36.6";
    if (barSkinTemp) {
      barSkinTemp.style.width = "40%";
      barSkinTemp.className = "bg-emerald-500 h-1.5 rounded-full";
    }
    if (badgeSkinTemp) {
      badgeSkinTemp.textContent = "NORMAL";
      badgeSkinTemp.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700";
    }
    if (deltaSkinTemp) {
      deltaSkinTemp.textContent = "Normal";
      deltaSkinTemp.className = "text-emerald-600 font-semibold";
    }

    if (spo2) spo2.textContent = "99";
    if (barSpO2) {
      barSpO2.style.width = "95%";
      barSpO2.className = "bg-emerald-500 h-1.5 rounded-full";
    }
    if (badgeSpO2) {
      badgeSpO2.textContent = "OPTIMAL";
      badgeSpO2.className = "px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700";
    }

    if (valHumidity) valHumidity.textContent = "55";
    if (valAmbientTemp) valAmbientTemp.textContent = "29";
    if (valActivity) valActivity.textContent = "Light Labor";
  }

  // Trigger critical risk alarm if transitioning to critical
  handleRiskStateAlarm(state);

  // Update resting button to match newly selected safety status
  updateRestingButton(state);
  showToast(`Switched state to: ${state.toUpperCase()}`);
}

// =========================================================================
// CRITICAL RISK ALARM (Web Audio API Synthesizer)
// Professional, short, non-looping alert tone triggering ONLY on CRITICAL transition.
// =========================================================================
let hasTriggeredCriticalAlarm = false;
let previousRiskState = null;

function playCriticalAlertSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Tone 1: 880 Hz (A5), duration 0.20s with smooth envelope
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.20);

    // Tone 2: 659.25 Hz (E5), duration 0.28s after 0.05s gap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.25);
    gain2.gain.setValueAtTime(0, now + 0.25);
    gain2.gain.linearRampToValueAtTime(0.20, now + 0.27);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.25);
    osc2.stop(now + 0.55);

    // Close audio context cleanly after alert completion
    setTimeout(() => {
      try { ctx.close(); } catch (e) {}
    }, 1000);
  } catch (err) {
    // Autoplay prevented or audio unsupported: safely fail without breaking page
  }
}

function handleRiskStateAlarm(newState) {
  const normState = String(newState || '').toLowerCase().trim();
  if (normState === 'critical') {
    // Trigger alarm ONLY on transition into critical, not repeatedly while remaining critical
    if (previousRiskState !== 'critical' && !hasTriggeredCriticalAlarm) {
      playCriticalAlertSound();
      hasTriggeredCriticalAlarm = true;
    }
  } else {
    // Moving away from critical resets trigger flag so future transition to critical sounds again
    hasTriggeredCriticalAlarm = false;
  }
  previousRiskState = normState;
}

// User interaction fallback for browsers blocking autoplay before first gesture
if (typeof document !== 'undefined') {
  const onFirstInteraction = () => {
    if (currentState === 'critical' && !hasTriggeredCriticalAlarm) {
      playCriticalAlertSound();
      hasTriggeredCriticalAlarm = true;
    }
    document.removeEventListener('pointerdown', onFirstInteraction);
    document.removeEventListener('keydown', onFirstInteraction);
  };
  document.addEventListener('pointerdown', onFirstInteraction, { once: true });
  document.addEventListener('keydown', onFirstInteraction, { once: true });
}

// Initialize dashboard using Fathima (Worker #12) from data.js as single source of truth
function initDashboard() {
  let demoWorker = null;
  if (typeof workers !== 'undefined' && Array.isArray(workers)) {
    demoWorker = workers.find(w => w.id === "12" || w.name === "Fathima") || workers[0];
  }

  if (demoWorker) {
    currentState = demoWorker.status; // 'critical'

    const score = document.getElementById('heroScoreValue');
    if (score) score.textContent = demoWorker.risk;

    const navBadge = document.getElementById('navRiskBadge');
    if (navBadge) navBadge.textContent = demoWorker.risk;

    if (demoWorker.readings) {
      const hr = document.getElementById('valHR');
      if (hr) hr.textContent = demoWorker.readings.heartRate;

      const skin = document.getElementById('valSkinTemp');
      if (skin) skin.textContent = demoWorker.readings.skinTemp;

      const spo2 = document.getElementById('valSpO2');
      if (spo2) spo2.textContent = demoWorker.readings.spo2;

      const hum = document.getElementById('valHumidity');
      if (hum) hum.textContent = demoWorker.readings.humidity;

      const amb = document.getElementById('valAmbientTemp');
      if (amb) amb.textContent = demoWorker.readings.ambientTemp;
    }

    if (demoWorker.activity) {
      const act = document.getElementById('valActivity');
      if (act) {
        act.textContent = demoWorker.activity === 'heavy_labor' ? 'Heavy Labor' : demoWorker.activity;
      }
    }

    if (demoWorker.lastUpdate) {
      const lu = document.getElementById('lastUpdateTimestamp');
      if (lu) lu.textContent = demoWorker.lastUpdate;
    }

    updateRestingButton(demoWorker.status);
    handleRiskStateAlarm(demoWorker.status);
  } else {
    updateRestingButton(currentState);
    handleRiskStateAlarm(currentState);
  }
}

// Auto-initialize when document is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }
}
