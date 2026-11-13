/* ==========================================================================
   AuraID Studio Pro v4.0 — Shopkeeper Edition Engine (app.js)
   - Dual AI Engine: ISNet ONNX Deep Matting (@imgly/background-removal) +
     Realtime MediaPipe + CIE-LAB Perceptual Trimap Cutout
   - Shopkeeper Top-Header Paper-Saver Print Sheet (6 per row on A4, Top-Aligned)
   - Formal Suit & Blazer Vector Studio + Lossless 24-bit .TIFF Encoder
   ========================================================================== */

(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. FORMAL BLAZER & SUIT VECTOR TEMPLATES
  // --------------------------------------------------------------------------
  const FORMAL_SUITS = [
    {
      id: 'none',
      name: 'No Suit Overlay',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="160" r="95" fill="none" stroke="#94a3b8" stroke-width="14" stroke-dasharray="22 14"/>
        <line x1="130" y1="90" x2="270" y2="230" stroke="#ef4444" stroke-width="16" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'navy_crimson_tie',
      name: 'Navy Suit + Red Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="navyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <path d="M132 52 L200 112 L268 52 L285 320 L115 320 Z" fill="#ffffff"/>
        <polygon points="184,102 216,102 210,132 190,132" fill="#7f1d1d"/>
        <polygon points="190,130 210,130 222,295 200,320 178,295" fill="#b91c1c"/>
        <polygon points="134,46 200,110 156,142 118,75" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="266,46 200,110 244,142 282,75" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-20 320 L-10 165 Q5 102 126 54 L200 285 L274 54 Q395 102 410 165 L420 320 Z" fill="url(#navyG)"/>
        <polygon points="124,52 162,135 142,148 158,162 200,285 108,165" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <polygon points="276,52 238,135 258,148 242,162 200,285 292,165" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <rect x="268" y="218" width="58" height="10" rx="3" fill="#090d16"/>
        <polygon points="276,218 295,198 314,218" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'charcoal_blue_tie',
      name: 'Charcoal + Blue Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M132 52 L200 112 L268 52 L285 320 L115 320 Z" fill="#f8fafc"/>
        <polygon points="184,102 216,102 210,132 190,132" fill="#1e3a8a"/>
        <polygon points="190,130 210,130 222,295 200,320 178,295" fill="#2563eb"/>
        <polygon points="134,46 200,110 156,142 118,75" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="266,46 200,110 244,142 282,75" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-20 320 L-10 165 Q5 102 126 54 L200 285 L274 54 Q395 102 410 165 L420 320 Z" fill="#18181b"/>
        <polygon points="124,52 162,135 142,148 158,162 200,285 108,165" fill="#27272a" stroke="#09090b" stroke-width="2"/>
        <polygon points="276,52 238,135 258,148 242,162 200,285 292,165" fill="#27272a" stroke="#09090b" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'jodhpuri_bandhgala',
      name: 'Indian Bandhgala',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M-20 320 L-10 160 Q8 98 130 52 L175 95 L225 95 L270 52 Q392 98 410 160 L420 320 Z" fill="#111827"/>
        <path d="M128 48 Q160 94 196 94 L196 122 Q145 118 116 68 Z" fill="#1f2937" stroke="#374151" stroke-width="2"/>
        <path d="M272 48 Q240 94 204 94 L204 122 Q255 118 284 68 Z" fill="#1f2937" stroke="#374151" stroke-width="2"/>
        <line x1="200" y1="95" x2="200" y2="320" stroke="#374151" stroke-width="3"/>
        <circle cx="200" cy="142" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
        <circle cx="200" cy="195" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
        <circle cx="200" cy="248" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
        <circle cx="200" cy="300" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
        <rect x="262" y="198" width="56" height="9" rx="2" fill="#030712"/>
        <polygon points="272,198 290,176 308,198" fill="#f59e0b"/>
      </svg>`
    },
    {
      id: 'royal_open_blazer',
      name: 'Royal Blazer (No Tie)',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M132 50 L185 118 L200 185 L215 118 L268 50 L285 320 L115 320 Z" fill="#ffffff"/>
        <polygon points="132,46 186,120 148,148 115,76" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="268,46 214,120 252,148 285,76" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-20 320 L-10 165 Q5 102 126 54 L200 290 L274 54 Q395 102 410 165 L420 320 Z" fill="#1d4ed8"/>
        <polygon points="124,52 162,140 144,152 158,166 200,290 108,165" fill="#1e40af" stroke="#172554" stroke-width="2"/>
        <polygon points="276,52 238,140 256,152 242,166 200,290 292,165" fill="#1e40af" stroke="#172554" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'women_navy_blazer',
      name: "Women's Navy Blazer",
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M126 60 Q200 165 274 60 L290 320 L110 320 Z" fill="#fdfbf7"/>
        <path d="M-15 320 L-5 168 Q15 106 128 56 L200 268 L272 56 Q385 106 405 168 L415 320 Z" fill="#1e293b"/>
        <path d="M126 54 Q158 145 200 268 L166 268 Q122 158 104 75 Z" fill="#334155"/>
        <path d="M274 54 Q242 145 200 268 L234 268 Q278 158 296 75 Z" fill="#334155"/>
      </svg>`
    },
    {
      id: 'women_formal_shirt',
      name: "Women's Collar Coat",
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 52 L200 138 L272 52 L290 320 L110 320 Z" fill="#ffffff"/>
        <polygon points="128,48 200,136 152,162 108,82" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="272,48 200,136 248,162 292,82" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-15 320 L-5 168 Q15 106 126 56 L200 278 L274 56 Q385 106 405 168 L415 320 Z" fill="#374151"/>
        <polygon points="124,54 166,158 200,278 112,168" fill="#4b5563"/>
        <polygon points="276,54 234,158 200,278 288,168" fill="#4b5563"/>
      </svg>`
    },
    {
      id: 'formal_shirt_tie',
      name: 'White Shirt & Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M-20 320 L-10 165 Q5 102 132 50 L200 108 L268 50 Q395 102 410 165 L420 320 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="184,98 216,98 210,128 190,128" fill="#0f172a"/>
        <polygon points="190,126 210,126 224,295 200,320 176,295" fill="#1e293b"/>
        <line x1="190" y1="160" x2="212" y2="180" stroke="#38bdf8" stroke-width="4"/>
        <line x1="186" y1="205" x2="216" y2="232" stroke="#38bdf8" stroke-width="4"/>
        <polygon points="132,45 200,106 154,142 114,74" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
        <polygon points="268,45 200,106 246,142 286,74" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      </svg>`
    }
  ];

  const suitImageCache = {};

  // --------------------------------------------------------------------------
  // 2. INDIAN SHOPKEEPER & OFFICIAL DOCUMENT PRESETS
  // --------------------------------------------------------------------------
  const INDIAN_PRESETS = {
    passport_std: {
      name: 'Shopkeeper Standard Passport (33×43 mm | 6 per A4 Row)',
      width: 33,
      height: 43,
      unit: 'mm',
      placard: false,
      hint: 'Shopkeeper Favourite (33×43 mm): Fits 6 photos across a single A4 top row (6 × 33mm = 198mm) with zero wasted width!'
    },
    passport_35_45: {
      name: 'Official Studio Passport (35×45 mm)',
      width: 35,
      height: 45,
      unit: 'mm',
      placard: false,
      hint: 'Standard 3.5×4.5 cm Indian passport size. Set Margin to 1mm & Gap to 1mm to fit 6 across A4, or 5 with wider gaps.'
    },
    passport_in: {
      name: 'Indian Passport Seva / OCI (51×51 mm)',
      width: 51,
      height: 51,
      unit: 'mm',
      placard: false,
      hint: 'Official Passport Seva (2×2 inch / 51×51 mm): Pure white background, 70–80% face coverage.'
    },
    gov_id_in: {
      name: 'National Government ID / UIDAI (35×45 mm)',
      width: 35,
      height: 45,
      unit: 'mm',
      placard: false,
      hint: 'UIDAI & National Government ID standard portrait.'
    },
    pan: {
      name: 'PAN Card — NSDL / UTIITSL (25×35 mm)',
      width: 25,
      height: 35,
      unit: 'mm',
      placard: false,
      hint: 'Official Income Tax PAN application box size: 2.5 cm × 3.5 cm (Fits 7 per row on A4).'
    },
    upsc_ssc: {
      name: 'UPSC / SSC / IBPS Exam (35×45 mm + Slate)',
      width: 35,
      height: 45,
      unit: 'mm',
      placard: true,
      hint: 'Includes candidate Name & Date of Photo (DOP) slate at the bottom for UPSC/SSC exams.'
    },
    dl_voter: {
      name: 'Voter ID / Driving Licence (35×45 mm)',
      width: 35,
      height: 45,
      unit: 'mm',
      placard: false,
      hint: 'ECI / Sarathi Parivahan standard passport portrait.'
    },
    stamp: {
      name: 'Indian Stamp Size (20×25 mm)',
      width: 20,
      height: 25,
      unit: 'mm',
      placard: false,
      hint: 'Mini stamp size (2.0×2.5 cm).'
    },
    custom: {
      name: 'Custom Dimensions',
      width: 33,
      height: 43,
      unit: 'mm',
      placard: false,
      hint: 'Enter any custom width, height, measurement unit, and DPI resolution.'
    }
  };

  const PAPER_SIZES_MM = {
    'a4': { name: 'A4 (210 × 297 mm)', widthMm: 210.0, heightMm: 297.0 },
    '4r': { name: '4R (4 × 6 in)', widthMm: 101.6, heightMm: 152.4 },
    '5r': { name: '5R (5 × 7 in)', widthMm: 127.0, heightMm: 177.8 },
    'a5': { name: 'A5 (148 × 210 mm)', widthMm: 148.0, heightMm: 210.0 },
    'letter': { name: 'US Letter (8.5 × 11 in)', widthMm: 215.9, heightMm: 279.4 }
  };

  // --------------------------------------------------------------------------
  // 3. CENTRAL STATE
  // --------------------------------------------------------------------------
  const state = {
    workspace: 'studio',
    activePanelId: 'panel-bg',

    sourceImage: null,
    sourceWidth: 900,
    sourceHeight: 1125,
    aiMaskCanvas: null,
    aiReady: false,
    deepAiCutoutCanvas: null, // Output from @imgly/background-removal ISNet ONNX
    deepAiRunning: false,
    userBrushCanvas: null,
    compositedSubjectCanvas: null,

    // Document Size & DPI (Defaulting to Shopkeeper 33x43mm so 6 fit in 1 A4 top row!)
    presetKey: 'passport_std',
    docWidth: 33,
    docHeight: 43,
    docUnit: 'mm',
    dpi: 300,
    showBiometricGuide: true,

    // Crop Transform
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotationDeg: 0,
    quadrantRotations: 0,
    flipH: false,

    // Background Removal
    bgMode: 'hybrid', // 'none' | 'hybrid' | 'deep' | 'flood'
    sampledWallSamples: [],
    tolerance: 28,
    aiConfidence: 55,
    featherPx: 1.5,
    chokePx: 1,
    spillSuppression: 60,
    isPickingWallColor: false,

    // Manual Touch-Up Brush
    brushMode: 'off',
    brushSize: 26,

    // Backdrop Fill
    bgColor: '#FFFFFF',
    bgVignette: false,

    // Formal Suit Overlay
    suitId: 'none',
    dragSuitOnCanvas: true,
    suitScale: 100,
    suitWidthStretch: 100,
    suitOffsetX: 0,
    suitOffsetY: 0,
    suitBrightness: 100,

    // Retouch & Placard
    brightness: 105,
    contrast: 104,
    saturation: 100,
    warmth: 0,
    enablePlacard: false,
    placardName: 'AARAV SHARMA',
    placardDate: '',
    enablePhotoBorder: true,
    compareHoldOriginal: false,

    // Shopkeeper Print Sheet Layout (Defaults to A4 Top-Header 6 Copies)
    paperKey: 'a4',
    sheetAlign: 'top-left', // 'top-left' | 'top-center'
    paperOrientation: 'portrait',
    copyCount: 6,
    marginMm: 2.0,
    gapMm: 1.5,
    topOffsetMm: 0,
    showCropMarks: true
  };

  const rawSourceCanvas = document.createElement('canvas');
  const rawSourceCtx = rawSourceCanvas.getContext('2d', { willReadFrequently: true });

  const matteCanvas = document.createElement('canvas');
  const matteCtx = matteCanvas.getContext('2d', { willReadFrequently: true });

  const tempBlurCanvas = document.createElement('canvas');
  const tempBlurCtx = tempBlurCanvas.getContext('2d');

  const dom = {};
  let selfieSegmentation = null;
  let pendingAiResolve = false;
  let imglyRemoveBgFn = null;

  // --------------------------------------------------------------------------
  // 4. INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    cacheDomElements();
    preloadFormalSuitSVGs();
    buildSuitCatalogUI();
    initDefaultDate();
    registerServiceWorker();
    initMediaPipeEngine();
    bindEventListeners();
    generateHighResStudioSamplePortrait();
  });

  function cacheDomElements() {
    const ids = [
      'offlineStatusBadge', 'offlineStatusText', 'loadSampleBtn', 'photoUploadInput',
      'mobileToolTabs', 'docPresetSelect', 'presetHintText', 'cropWidthInput',
      'cropHeightInput', 'cropUnitSelect', 'dpiSelect', 'outputPxReadout',
      'showBiometricGuide', 'cropZoomSlider', 'zoomValLabel', 'cropRotateSlider',
      'rotateValLabel', 'rotate90LeftBtn', 'rotate90RightBtn', 'flipHBtn',
      'autoCenterBtn', 'runDeepAiBtn', 'deepAiProgressWrap', 'deepAiProgressFill',
      'deepAiProgressText', 'bgModeTabs', 'bgEngineStatus', 'reRunAiBtn',
      'pickBgColorBtn', 'sampledWallSwatch', 'bgToleranceSlider', 'toleranceValLabel',
      'aiConfidenceSlider', 'aiConfidenceValLabel', 'bgFeatherSlider', 'featherValLabel',
      'bgChokeSlider', 'chokeValLabel', 'bgSpillSlider', 'spillValLabel',
      'brushModeGroup', 'brushSizeSlider', 'brushSizeValLabel', 'resetBrushMaskBtn',
      'bgPresetSwatches', 'customBgColorPicker', 'customBgHexInput', 'bgGradientToggle',
      'suitCatalogGrid', 'activeSuitBadge', 'dragSuitModeToggle', 'resetSuitFitBtn',
      'suitScaleSlider', 'suitScaleValLabel', 'suitWidthSlider', 'suitWidthValLabel',
      'suitYSlider', 'suitYValLabel', 'suitXSlider', 'suitXValLabel',
      'suitBrightSlider', 'suitBrightValLabel', 'brightnessSlider', 'brightValLabel',
      'contrastSlider', 'contrastValLabel', 'saturationSlider', 'satValLabel',
      'warmthSlider', 'warmthValLabel', 'resetRetouchBtn', 'enablePlacardToggle',
      'placardInputsWrap', 'placardNameInput', 'placardDateInput', 'useTodayDateBtn',
      'enablePhotoBorder', 'paperSizeSelect', 'sheetAlignGroup', 'paperOrientationGroup',
      'copyCountSlider', 'copyCountNumber', 'copyCountValLabel', 'sheetCapacityBadge',
      'sheetGapSlider', 'gapValLabel', 'sheetMarginSlider', 'marginValLabel',
      'sheetTopOffsetSlider', 'topOffsetValLabel', 'showCropMarksToggle',
      'downloadSheetTiffBtn', 'downloadSheetPngBtn', 'printSheetDirectBtn',
      'downloadSingleTiffBtn', 'downloadSinglePngBtn', 'downloadSingleJpgBtn',
      'metricDocSize', 'metricPixels', 'metricSheetInfo', 'compareOriginalBtn',
      'workspaceStudio', 'workspacePrint', 'interactiveCropCanvas',
      'singleOutputCanvas', 'singleFileSizeEst', 'canvasModeBanner',
      'printSheetCanvas', 'sheetSummaryFooter', 'toastContainer'
    ];
    ids.forEach((id) => {
      dom[id] = document.getElementById(id);
    });
  }

  function preloadFormalSuitSVGs() {
    FORMAL_SUITS.forEach((suit) => {
      if (suit.id === 'none') return;
      const img = new Image();
      const svgBlob = new Blob([suit.svg], { type: 'image/svg+xml;charset=utf-8' });
      img.src = URL.createObjectURL(svgBlob);
      suitImageCache[suit.id] = img;
    });
  }

  function buildSuitCatalogUI() {
    if (!dom.suitCatalogGrid) return;
    dom.suitCatalogGrid.innerHTML = '';
    FORMAL_SUITS.forEach((suit) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `suit-card ${suit.id === state.suitId ? 'active' : ''}`;
      btn.dataset.suitId = suit.id;
      btn.innerHTML = `
        <div class="suit-thumb">${suit.svg}</div>
        <span class="suit-title">${suit.name}</span>
      `;
      btn.addEventListener('click', () => {
        state.suitId = suit.id;
        dom.suitCatalogGrid.querySelectorAll('.suit-card').forEach((c) => {
          c.classList.toggle('active', c.dataset.suitId === suit.id);
        });
        dom.activeSuitBadge.textContent = suit.id === 'none' ? 'None' : suit.name;
        renderAll();
        if (suit.id !== 'none') {
          showToast(`${suit.name} applied — Drag on photo to align with neck`);
        }
      });
      dom.suitCatalogGrid.appendChild(btn);
    });
  }

  function initDefaultDate() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    state.placardDate = `DOP: ${dd}-${mm}-${yyyy}`;
    dom.placardDateInput.value = state.placardDate;
    dom.placardNameInput.value = state.placardName;
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js?v=4.0').then((reg) => {
        reg.update();
      }).catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 5. STATE-OF-THE-ART IN-BROWSER DEEP AI (@imgly/background-removal ISNet ONNX)
  // --------------------------------------------------------------------------
  async function runUltraDeepAiCutout() {
    if (state.deepAiRunning || !rawSourceCanvas.width) return;

    try {
      state.deepAiRunning = true;
      dom.runDeepAiBtn.disabled = true;
      dom.deepAiProgressWrap.classList.remove('hidden');
      dom.deepAiProgressFill.style.width = '15%';
      dom.deepAiProgressText.textContent = 'Loading ISNet ONNX Neural Engine...';
      dom.bgEngineStatus.textContent = 'Running Deep AI...';

      if (!imglyRemoveBgFn) {
        const mod = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm');
        imglyRemoveBgFn = mod.removeBackground || mod.default;
      }

      const sourceBlob = await new Promise((resolve) => rawSourceCanvas.toBlob(resolve, 'image/png'));

      const resultBlob = await imglyRemoveBgFn(sourceBlob, {
        model: 'medium',
        output: { format: 'image/png', quality: 1.0 },
        progress: (key, current, total) => {
          if (total > 0) {
            const pct = Math.min(95, Math.max(15, Math.round((current / total) * 100)));
            dom.deepAiProgressFill.style.width = `${pct}%`;
            dom.deepAiProgressText.textContent = `AI Matting (${key.split('/').pop()}): ${pct}%`;
          }
        }
      });

      const cutoutImg = new Image();
      await new Promise((resolve, reject) => {
        cutoutImg.onload = resolve;
        cutoutImg.onerror = reject;
        cutoutImg.src = URL.createObjectURL(resultBlob);
      });

      if (!state.deepAiCutoutCanvas) {
        state.deepAiCutoutCanvas = document.createElement('canvas');
      }
      state.deepAiCutoutCanvas.width = state.sourceWidth;
      state.deepAiCutoutCanvas.height = state.sourceHeight;
      const dCtx = state.deepAiCutoutCanvas.getContext('2d');
      dCtx.clearRect(0, 0, state.sourceWidth, state.sourceHeight);
      dCtx.drawImage(cutoutImg, 0, 0, state.sourceWidth, state.sourceHeight);

      state.bgMode = 'deep';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'deep');
      });

      dom.deepAiProgressFill.style.width = '100%';
      dom.deepAiProgressText.textContent = 'Ultra-HD Deep AI Cutout Complete!';
      dom.bgEngineStatus.textContent = 'ISNet Deep AI Active';

      recomputeBackgroundCutout();
      renderAll();
      showToast('✨ Ultra-HD Deep AI Cutout Complete!');
    } catch (err) {
      // Fallback to enhanced MediaPipe + LAB Trimap if offline or WebGL/WASM restricted
      dom.deepAiProgressText.textContent = 'Using Fast Local Hybrid AI + LAB Matting';
      state.bgMode = 'hybrid';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'hybrid');
      });
      recomputeBackgroundCutout();
      renderAll();
      showToast('Switched to Fast Local Hybrid AI + LAB Engine');
    } finally {
      state.deepAiRunning = false;
      dom.runDeepAiBtn.disabled = false;
      setTimeout(() => {
        dom.deepAiProgressWrap.classList.add('hidden');
      }, 2600);
    }
  }

  // --------------------------------------------------------------------------
  // 6. FAST REALTIME MEDIAPIPE + CIE-LAB TRIMAP ENGINE
  // --------------------------------------------------------------------------
  function initMediaPipeEngine() {
    let attempts = 0;
    const tryInit = () => {
      attempts++;
      if (typeof window.SelfieSegmentation === 'undefined') {
        if (attempts < 25) setTimeout(tryInit, 350);
        return;
      }
      try {
        selfieSegmentation = new window.SelfieSegmentation({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.4.1675469240/${file}`
        });
        selfieSegmentation.setOptions({ modelSelection: 1 });
        selfieSegmentation.onResults((results) => {
          pendingAiResolve = false;
          if (results && results.segmentationMask) {
            if (!state.aiMaskCanvas) {
              state.aiMaskCanvas = document.createElement('canvas');
            }
            state.aiMaskCanvas.width = state.sourceWidth;
            state.aiMaskCanvas.height = state.sourceHeight;
            const ctx = state.aiMaskCanvas.getContext('2d');
            ctx.clearRect(0, 0, state.sourceWidth, state.sourceHeight);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(results.segmentationMask, 0, 0, state.sourceWidth, state.sourceHeight);

            state.aiReady = true;
            if (state.bgMode !== 'deep') {
              dom.bgEngineStatus.textContent = 'AI + LAB Ready';
            }
            recomputeBackgroundCutout();
            renderAll();
          }
        });
        if (rawSourceCanvas.width > 0) runMediaPipeOnCurrentSource();
      } catch (err) {
        dom.bgEngineStatus.textContent = 'LAB Smart Key';
      }
    };
    tryInit();
  }

  async function runMediaPipeOnCurrentSource() {
    if (!selfieSegmentation || !rawSourceCanvas.width || pendingAiResolve) return;
    try {
      pendingAiResolve = true;
      await selfieSegmentation.send({ image: rawSourceCanvas });
    } catch (e) {
      pendingAiResolve = false;
      state.aiReady = false;
      recomputeBackgroundCutout();
      renderAll();
    }
  }

  function rgbToLab(r, g, b) {
    let rn = r / 255, gn = g / 255, bn = b / 255;
    rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
    gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
    bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;

    let x = (rn * 0.4124 + gn * 0.3576 + bn * 0.1805) / 0.95047;
    let y = (rn * 0.2126 + gn * 0.7152 + bn * 0.0722) / 1.00000;
    let z = (rn * 0.0193 + gn * 0.1192 + bn * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x) + 16 / 116;
    y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y) + 16 / 116;
    z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z) + 16 / 116;

    return { l: (116 * y) - 16, a: 500 * (x - y), b: 200 * (y - z), r, g, bVal: b };
  }

  function autoSampleBorderWallColors() {
    const w = rawSourceCanvas.width;
    const h = rawSourceCanvas.height;
    if (!w || !h) return;

    const coords = [
      [6, 6], [Math.floor(w * 0.25), 6], [Math.floor(w * 0.75), 6], [w - 7, 6],
      [6, Math.floor(h * 0.22)], [w - 7, Math.floor(h * 0.22)],
      [6, Math.floor(h * 0.48)], [w - 7, Math.floor(h * 0.48)]
    ];

    state.sampledWallSamples = coords.map(([x, y]) => {
      const p = rawSourceCtx.getImageData(x, y, 1, 1).data;
      return rgbToLab(p[0], p[1], p[2]);
    });

    if (state.sampledWallSamples.length > 0) {
      const first = state.sampledWallSamples[0];
      dom.sampledWallSwatch.style.backgroundColor = `rgb(${first.r}, ${first.g}, ${first.bVal})`;
    }
  }

  function minWallLabDistSq(r, g, b) {
    const lab = rgbToLab(r, g, b);
    let minD = Infinity;
    const samples = state.sampledWallSamples;
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      const dL = (lab.l - s.l) * 0.55;
      const dA = (lab.a - s.a) * 1.15;
      const dB = (lab.b - s.b) * 1.15;
      const dSq = dL * dL + dA * dA + dB * dB;
      if (dSq < minD) minD = dSq;
    }
    return minD;
  }

  function recomputeBackgroundCutout() {
    const w = state.sourceWidth;
    const h = state.sourceHeight;
    if (!w || !h) return;

    if (!state.compositedSubjectCanvas) {
      state.compositedSubjectCanvas = document.createElement('canvas');
    }
    state.compositedSubjectCanvas.width = w;
    state.compositedSubjectCanvas.height = h;
    const outCtx = state.compositedSubjectCanvas.getContext('2d');

    if (state.bgMode === 'none') {
      outCtx.clearRect(0, 0, w, h);
      outCtx.drawImage(rawSourceCanvas, 0, 0);
      applyManualBrushToSubject(outCtx, w, h);
      return;
    }

    // If Ultra Deep AI (ISNet ONNX) was run and selected, use its high-precision alpha mask
    if (state.bgMode === 'deep' && state.deepAiCutoutCanvas) {
      outCtx.clearRect(0, 0, w, h);
      outCtx.drawImage(state.deepAiCutoutCanvas, 0, 0);
      applyManualBrushToSubject(outCtx, w, h);
      return;
    }

    const srcData = rawSourceCtx.getImageData(0, 0, w, h);
    const pixels = srcData.data;
    const totalPixels = w * h;
    const alphaMap = new Uint8ClampedArray(totalPixels);
    alphaMap.fill(255);

    const tol = state.tolerance;
    const tolSq = tol * tol;
    const rampSpanSq = Math.max(1, (tol + 16) * (tol + 16) - tolSq);

    const runLabBorderFloodFill = () => {
      const visited = new Uint8Array(totalPixels);
      const queue = new Int32Array(totalPixels);
      let head = 0, tail = 0;

      const push = (x, y) => {
        const idx = y * w + x;
        if (!visited[idx]) {
          visited[idx] = 1;
          queue[tail++] = idx;
        }
      };

      for (let x = 0; x < w; x += 2) push(x, 0);
      for (let y = 0; y < h; y += 2) {
        push(0, y);
        push(w - 1, y);
      }

      const maxFloodSq = (tol + 16) * (tol + 16);

      while (head < tail) {
        const curr = queue[head++];
        const i4 = curr * 4;
        const dSq = minWallLabDistSq(pixels[i4], pixels[i4 + 1], pixels[i4 + 2]);

        if (dSq <= maxFloodSq) {
          if (dSq <= tolSq) alphaMap[curr] = 0;
          else alphaMap[curr] = Math.min(255, Math.max(0, Math.round(((dSq - tolSq) / rampSpanSq) * 255)));

          const cx = curr % w;
          const cy = (curr - cx) / w;
          if (cx > 0 && !visited[curr - 1]) { visited[curr - 1] = 1; queue[tail++] = curr - 1; }
          if (cx < w - 1 && !visited[curr + 1]) { visited[curr + 1] = 1; queue[tail++] = curr + 1; }
          if (cy > 0 && !visited[curr - w]) { visited[curr - w] = 1; queue[tail++] = curr - w; }
          if (cy < h - 1 && !visited[curr + w]) { visited[curr + w] = 1; queue[tail++] = curr + w; }
        }
      }
    };

    const confThreshold = Math.round((state.aiConfidence / 100) * 255);

    if (state.bgMode === 'hybrid' && state.aiReady && state.aiMaskCanvas) {
      const aiData = state.aiMaskCanvas.getContext('2d').getImageData(0, 0, w, h).data;
      const definiteFg = Math.min(242, confThreshold + 55);
      const definiteBg = Math.max(15, confThreshold - 65);

      for (let i = 0; i < totalPixels; i++) {
        const aiA = aiData[i * 4];
        if (aiA >= definiteFg) {
          alphaMap[i] = 255;
        } else if (aiA <= definiteBg) {
          alphaMap[i] = 0;
        } else {
          const i4 = i * 4;
          const dSq = minWallLabDistSq(pixels[i4], pixels[i4 + 1], pixels[i4 + 2]);
          let colorAlpha = 255;
          if (dSq <= tolSq) colorAlpha = 0;
          else if (dSq < tolSq + rampSpanSq) colorAlpha = Math.round(((dSq - tolSq) / rampSpanSq) * 255);

          const aiNorm = (aiA - definiteBg) / Math.max(1, definiteFg - definiteBg);
          alphaMap[i] = Math.min(255, Math.max(0, Math.round(aiNorm * 0.55 * 255 + colorAlpha * 0.45)));
        }
      }
    } else {
      runLabBorderFloodFill();
    }

    if (state.chokePx !== 0) {
      const copy = new Uint8ClampedArray(alphaMap);
      const steps = Math.min(4, Math.abs(state.chokePx));
      const erode = state.chokePx > 0;
      for (let s = 0; s < steps; s++) {
        for (let y = 1; y < h - 1; y++) {
          const row = y * w;
          for (let x = 1; x < w - 1; x++) {
            const idx = row + x;
            const c = copy[idx];
            if (c > 0 && c < 255) {
              const n1 = copy[idx - 1], n2 = copy[idx + 1];
              const n3 = copy[idx - w], n4 = copy[idx + w];
              alphaMap[idx] = erode ? Math.min(c, n1, n2, n3, n4) : Math.max(c, n1, n2, n3, n4);
            }
          }
        }
        copy.set(alphaMap);
      }
    }

    matteCanvas.width = w;
    matteCanvas.height = h;
    const matteImg = matteCtx.createImageData(w, h);
    const mData = matteImg.data;
    for (let i = 0; i < totalPixels; i++) {
      const a = alphaMap[i];
      const i4 = i * 4;
      mData[i4] = a; mData[i4 + 1] = a; mData[i4 + 2] = a; mData[i4 + 3] = 255;
    }
    matteCtx.putImageData(matteImg, 0, 0);

    if (state.featherPx > 0) {
      tempBlurCanvas.width = w;
      tempBlurCanvas.height = h;
      tempBlurCtx.filter = `blur(${state.featherPx}px)`;
      tempBlurCtx.drawImage(matteCanvas, 0, 0);
      tempBlurCtx.filter = 'none';
      matteCtx.drawImage(tempBlurCanvas, 0, 0);
    }

    const finalMatte = matteCtx.getImageData(0, 0, w, h).data;
    const spillStrength = state.spillSuppression / 100;

    for (let i = 0; i < totalPixels; i++) {
      const i4 = i * 4;
      const a = finalMatte[i4];
      pixels[i4 + 3] = a;
      if (spillStrength > 0 && a > 8 && a < 248) {
        const edgeWeight = (1 - a / 255) * spillStrength;
        const r = pixels[i4], g = pixels[i4 + 1], b = pixels[i4 + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        pixels[i4] = Math.round(r * (1 - edgeWeight) + luma * edgeWeight);
        pixels[i4 + 1] = Math.round(g * (1 - edgeWeight) + luma * edgeWeight);
        pixels[i4 + 2] = Math.round(b * (1 - edgeWeight) + luma * edgeWeight);
      }
    }

    outCtx.putImageData(srcData, 0, 0);
    applyManualBrushToSubject(outCtx, w, h);
  }

  function applyManualBrushToSubject(outCtx, w, h) {
    if (!state.userBrushCanvas) return;
    const bData = state.userBrushCanvas.getContext('2d').getImageData(0, 0, w, h).data;
    const subjImg = outCtx.getImageData(0, 0, w, h);
    const sData = subjImg.data;
    const origData = rawSourceCtx.getImageData(0, 0, w, h).data;

    let modified = false;
    for (let i = 0; i < w * h; i++) {
      const i4 = i * 4;
      const eraseVal = bData[i4];
      const restoreVal = bData[i4 + 1];
      if (eraseVal > 0) {
        sData[i4 + 3] = Math.max(0, sData[i4 + 3] - eraseVal);
        modified = true;
      } else if (restoreVal > 0) {
        sData[i4] = origData[i4];
        sData[i4 + 1] = origData[i4 + 1];
        sData[i4 + 2] = origData[i4 + 2];
        sData[i4 + 3] = Math.min(255, sData[i4 + 3] + restoreVal);
        modified = true;
      }
    }
    if (modified) outCtx.putImageData(subjImg, 0, 0);
  }

  // --------------------------------------------------------------------------
  // 7. STUDIO SAMPLE PORTRAIT
  // --------------------------------------------------------------------------
  function generateHighResStudioSamplePortrait() {
    const w = 900, h = 1125;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');

    const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
    wallGrad.addColorStop(0, '#bfe0dc');
    wallGrad.addColorStop(1, '#99c7c1');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h * 0.44;

    // Formal Suit in Sample
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx - 95, cy + 240); ctx.lineTo(cx + 95, cy + 240);
    ctx.lineTo(cx + 45, h); ctx.lineTo(cx - 45, h);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy + 265); ctx.lineTo(cx + 22, cy + 265);
    ctx.lineTo(cx + 34, h); ctx.lineTo(cx - 34, h);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(cx - 335, h);
    ctx.quadraticCurveTo(cx - 300, cy + 240, cx - 78, cy + 235);
    ctx.lineTo(cx - 28, h); ctx.closePath(); ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 335, h);
    ctx.quadraticCurveTo(cx + 300, cy + 240, cx + 78, cy + 235);
    ctx.lineTo(cx + 28, h); ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#c68b63';
    ctx.beginPath();
    ctx.roundRect(cx - 68, cy + 120, 136, 175, 45);
    ctx.fill();

    ctx.fillStyle = '#d19972';
    ctx.beginPath();
    ctx.ellipse(cx - 154, cy + 10, 24, 48, -0.08, 0, Math.PI * 2);
    ctx.ellipse(cx + 154, cy + 10, 24, 48, 0.08, 0, Math.PI * 2);
    ctx.fill();

    const faceGrad = ctx.createRadialGradient(cx - 25, cy - 30, 30, cx, cy, 185);
    faceGrad.addColorStop(0, '#e3ad86');
    faceGrad.addColorStop(1, '#c98e67');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 150, 190, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#171923';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 75, 158, 136, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - 114, cy - 95, 56, 0, Math.PI * 2);
    ctx.arc(cx + 104, cy - 102, 50, 0, Math.PI * 2);
    ctx.arc(cx, cy - 152, 64, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#171923';
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 98, cy - 30); ctx.quadraticCurveTo(cx - 65, cy - 45, cx - 32, cy - 32);
    ctx.moveTo(cx + 32, cy - 32); ctx.quadraticCurveTo(cx + 65, cy - 45, cx + 98, cy - 30);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx - 64, cy - 5, 26, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 64, cy - 5, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2d1e18';
    ctx.beginPath();
    ctx.arc(cx - 64, cy - 5, 11, 0, Math.PI * 2);
    ctx.arc(cx + 64, cy - 5, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#a86f4c'; ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8); ctx.lineTo(cx - 8, cy + 52); ctx.lineTo(cx + 12, cy + 56);
    ctx.stroke();

    ctx.strokeStyle = '#9c4c44'; ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(cx - 42, cy + 102); ctx.quadraticCurveTo(cx, cy + 115, cx + 42, cy + 102);
    ctx.stroke();

    const img = new Image();
    img.onload = () => loadNewSourceImage(img, null);
    img.src = c.toDataURL('image/png');
  }

  function loadNewSourceImage(imgElement, toastMsg) {
    const maxDim = 1500;
    let w = imgElement.naturalWidth || imgElement.width;
    let h = imgElement.naturalHeight || imgElement.height;
    if (w > maxDim || h > maxDim) {
      const scale = maxDim / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }

    state.sourceImage = imgElement;
    state.sourceWidth = w;
    state.sourceHeight = h;
    state.deepAiCutoutCanvas = null;
    if (state.bgMode === 'deep') state.bgMode = 'hybrid';

    rawSourceCanvas.width = w;
    rawSourceCanvas.height = h;
    rawSourceCtx.clearRect(0, 0, w, h);
    rawSourceCtx.drawImage(imgElement, 0, 0, w, h);

    state.userBrushCanvas = document.createElement('canvas');
    state.userBrushCanvas.width = w;
    state.userBrushCanvas.height = h;

    autoSampleBorderWallColors();
    state.zoom = 1.0; state.panX = 0; state.panY = 0; state.rotationDeg = 0; state.quadrantRotations = 0; state.flipH = false;

    recomputeBackgroundCutout();
    runMediaPipeOnCurrentSource();
    renderAll();

    if (toastMsg) showToast(toastMsg);
  }

  // --------------------------------------------------------------------------
  // 8. PIXEL & MILLIMETER CALCULATORS
  // --------------------------------------------------------------------------
  function getTargetSinglePhotoPixels() {
    const { docWidth, docHeight, docUnit, dpi } = state;
    let wPx = 390, hPx = 508;

    if (docUnit === 'px') {
      wPx = Math.round(docWidth);
      hPx = Math.round(docHeight);
    } else if (docUnit === 'mm') {
      wPx = Math.round((docWidth / 25.4) * dpi);
      hPx = Math.round((docHeight / 25.4) * dpi);
    } else if (docUnit === 'cm') {
      wPx = Math.round(((docWidth * 10) / 25.4) * dpi);
      hPx = Math.round(((docHeight * 10) / 25.4) * dpi);
    } else if (docUnit === 'in') {
      wPx = Math.round(docWidth * dpi);
      hPx = Math.round(docHeight * dpi);
    }

    return {
      widthPx: Math.max(60, Math.min(4800, wPx)),
      heightPx: Math.max(60, Math.min(4800, hPx))
    };
  }

  function getTargetSinglePhotoMm() {
    const { docWidth, docHeight, docUnit, dpi } = state;
    if (docUnit === 'mm') return { widthMm: docWidth, heightMm: docHeight };
    if (docUnit === 'cm') return { widthMm: docWidth * 10, heightMm: docHeight * 10 };
    if (docUnit === 'in') return { widthMm: docWidth * 25.4, heightMm: docHeight * 25.4 };
    return { widthMm: (docWidth / dpi) * 25.4, heightMm: (docHeight / dpi) * 25.4 };
  }

  // --------------------------------------------------------------------------
  // 9. RENDER PIPELINE & SHOPKEEPER TOP-HEADER PRINT SHEET COMPOSER
  // --------------------------------------------------------------------------
  function renderAll() {
    updateMetricsBarUI();
    renderSingleCroppedPassportCanvas();
    renderInteractiveStudioStage();
    renderPrintSheetCanvas();
  }

  function updateMetricsBarUI() {
    const { widthPx, heightPx } = getTargetSinglePhotoPixels();
    const { widthMm, heightMm } = getTargetSinglePhotoMm();
    const paper = PAPER_SIZES_MM[state.paperKey];

    dom.outputPxReadout.textContent = `${widthPx} × ${heightPx} px`;
    dom.metricDocSize.textContent = `${widthMm.toFixed(1).replace(/\.0$/, '')}×${heightMm.toFixed(1).replace(/\.0$/, '')} mm`;
    dom.metricPixels.textContent = `${widthPx}×${heightPx} px @ ${state.dpi} DPI`;
    dom.metricSheetInfo.textContent = `${paper.name} (${state.copyCount} pcs Top-Row)`;

    const kb = Math.round((widthPx * heightPx * 3 + 512) / 1024);
    dom.singleFileSizeEst.textContent = kb > 1024 ? `~${(kb / 1024).toFixed(1)} MB` : `~${kb} KB`;
  }

  function renderSingleCroppedPassportCanvas() {
    const { widthPx, heightPx } = getTargetSinglePhotoPixels();
    const canvas = dom.singleOutputCanvas;
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, widthPx, heightPx);

    if (state.bgColor !== 'transparent' && !state.compareHoldOriginal) {
      if (state.bgVignette) {
        const rad = ctx.createRadialGradient(
          widthPx * 0.5, heightPx * 0.42, widthPx * 0.1,
          widthPx * 0.5, heightPx * 0.5, Math.max(widthPx, heightPx) * 0.75
        );
        rad.addColorStop(0, adjustHex(state.bgColor, 18));
        rad.addColorStop(1, adjustHex(state.bgColor, -18));
        ctx.fillStyle = rad;
      } else {
        ctx.fillStyle = state.bgColor;
      }
      ctx.fillRect(0, 0, widthPx, heightPx);
    }

    const activeSource = state.compareHoldOriginal
      ? rawSourceCanvas
      : (state.compositedSubjectCanvas || rawSourceCanvas);

    if (activeSource && activeSource.width) {
      ctx.save();
      ctx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
      ctx.translate(widthPx / 2, heightPx / 2);

      const totalAngleRad = ((state.rotationDeg + state.quadrantRotations * 90) * Math.PI) / 180;
      ctx.rotate(totalAngleRad);
      if (state.flipH) ctx.scale(-1, 1);

      const baseScale = Math.max(widthPx / state.sourceWidth, heightPx / state.sourceHeight);
      const finalScale = baseScale * state.zoom;
      ctx.scale(finalScale, finalScale);

      ctx.drawImage(
        activeSource,
        -state.sourceWidth / 2 + state.panX,
        -state.sourceHeight / 2 + state.panY
      );
      ctx.restore();

      if (state.warmth !== 0 && !state.compareHoldOriginal) {
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = state.warmth > 0
          ? `rgba(255, 160, 60, ${Math.abs(state.warmth) / 160})`
          : `rgba(56, 189, 248, ${Math.abs(state.warmth) / 160})`;
        ctx.fillRect(0, 0, widthPx, heightPx);
        ctx.restore();
      }
    }

    if (state.suitId !== 'none' && !state.compareHoldOriginal) {
      const suitImg = suitImageCache[state.suitId];
      if (suitImg && suitImg.complete) {
        ctx.save();
        ctx.filter = `brightness(${state.suitBrightness}%)`;
        const sScale = state.suitScale / 100;
        const wStretch = state.suitWidthStretch / 100;
        const drawW = widthPx * 1.06 * sScale * wStretch;
        const drawH = heightPx * 0.50 * sScale;
        const centerX = (widthPx / 2) + (state.suitOffsetX / 100) * widthPx;
        const topY = (heightPx * 0.56) + (state.suitOffsetY / 100) * heightPx - (drawH - heightPx * 0.50) * 0.35;
        ctx.drawImage(suitImg, centerX - drawW / 2, topY, drawW, drawH);
        ctx.restore();
      }
    }

    if (state.enablePlacard && !state.compareHoldOriginal) {
      const slateHeight = Math.round(heightPx * 0.165);
      const slateY = heightPx - slateHeight;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, slateY, widthPx, slateHeight);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = Math.max(1, Math.round(widthPx * 0.004));
      ctx.beginPath(); ctx.moveTo(0, slateY); ctx.lineTo(widthPx, slateY); ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `700 ${Math.max(10, Math.round(slateHeight * 0.36))}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText((state.placardName || 'CANDIDATE NAME').toUpperCase(), widthPx / 2, slateY + slateHeight * 0.34, widthPx * 0.94);

      ctx.font = `600 ${Math.max(9, Math.round(slateHeight * 0.30))}px "JetBrains Mono", monospace`;
      ctx.fillText(state.placardDate || 'DOP: DD-MM-YYYY', widthPx / 2, slateY + slateHeight * 0.74, widthPx * 0.94);
    }

    // Crisp Studio Black Cut Border so shopkeepers can cut along the exact edge easily
    if (state.enablePhotoBorder && !state.compareHoldOriginal) {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = Math.max(2, Math.round(widthPx * 0.006));
      ctx.strokeRect(1, 1, widthPx - 2, heightPx - 2);
    }
  }

  function renderInteractiveStudioStage() {
    const stageCanvas = dom.interactiveCropCanvas;
    const container = document.getElementById('cropStageContainer');
    const rect = container.getBoundingClientRect();

    const cw = Math.max(280, Math.floor(rect.width - 12));
    const ch = Math.max(220, Math.floor(rect.height - 12));
    stageCanvas.width = cw;
    stageCanvas.height = ch;

    const ctx = stageCanvas.getContext('2d');
    ctx.clearRect(0, 0, cw, ch);

    const { widthPx, heightPx } = getTargetSinglePhotoPixels();
    const aspect = widthPx / heightPx;

    const pad = 24;
    let boxW = cw - pad * 2;
    let boxH = boxW / aspect;
    if (boxH > ch - pad * 2) {
      boxH = ch - pad * 2;
      boxW = boxH * aspect;
    }
    const boxX = Math.round((cw - boxW) / 2);
    const boxY = Math.round((ch - boxH) / 2);

    stageCanvas._cropBox = { boxX, boxY, boxW, boxH };

    const tileSize = 12;
    for (let y = boxY; y < boxY + boxH; y += tileSize) {
      for (let x = boxX; x < boxX + boxW; x += tileSize) {
        const odd = ((Math.floor((x - boxX) / tileSize) + Math.floor((y - boxY) / tileSize)) % 2) === 1;
        ctx.fillStyle = odd ? '#1e293b' : '#0f172a';
        ctx.fillRect(x, y, Math.min(tileSize, boxX + boxW - x), Math.min(tileSize, boxY + boxH - y));
      }
    }

    ctx.drawImage(dom.singleOutputCanvas, boxX, boxY, boxW, boxH);

    ctx.fillStyle = 'rgba(4, 7, 17, 0.65)';
    ctx.fillRect(0, 0, cw, boxY);
    ctx.fillRect(0, boxY + boxH, cw, ch - (boxY + boxH));
    ctx.fillRect(0, boxY, boxX, boxH);
    ctx.fillRect(boxX + boxW, boxY, cw - (boxX + boxW), boxH);

    ctx.strokeStyle = state.activePanelId === 'panel-suit' && state.suitId !== 'none' ? '#34d399' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    if (state.showBiometricGuide) {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(boxX + boxW / 2, boxY); ctx.lineTo(boxX + boxW / 2, boxY + boxH);
      ctx.moveTo(boxX, boxY + boxH * 0.42); ctx.lineTo(boxX + boxW, boxY + boxH * 0.42);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(boxX + boxW * 0.5, boxY + boxH * 0.43, boxW * 0.31, boxH * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // SHOPKEEPER TOP-HEADER PRINT SHEET COMPOSER
  // Never centers vertically in the middle of the sheet! Always starts at the
  // very top header (marginMm + topOffsetMm) so the bottom paper stays blank & reusable!
  // --------------------------------------------------------------------------
  function renderPrintSheetCanvas() {
    const paper = PAPER_SIZES_MM[state.paperKey];
    const isLandscape = state.paperOrientation === 'landscape';
    const sheetWmm = isLandscape ? paper.heightMm : paper.widthMm;
    const sheetHmm = isLandscape ? paper.widthMm : paper.heightMm;

    const sheetWpx = Math.round((sheetWmm / 25.4) * state.dpi);
    const sheetHpx = Math.round((sheetHmm / 25.4) * state.dpi);

    const canvas = dom.printSheetCanvas;
    canvas.width = sheetWpx;
    canvas.height = sheetHpx;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetWpx, sheetHpx);

    const { widthPx: tileW, heightPx: tileH } = getTargetSinglePhotoPixels();
    const gapPx = Math.round((state.gapMm / 25.4) * state.dpi);
    const marginPx = Math.round((state.marginMm / 25.4) * state.dpi);
    const topOffsetPx = Math.round((state.topOffsetMm / 25.4) * state.dpi);

    const availW = Math.max(tileW, sheetWpx - marginPx * 2);
    const availH = Math.max(tileH, sheetHpx - marginPx * 2 - topOffsetPx);

    const cols = Math.max(1, Math.floor((availW + gapPx) / (tileW + gapPx)));
    const rows = Math.max(1, Math.floor((availH + gapPx) / (tileH + gapPx)));
    const maxCapacity = cols * rows;

    const actualCopies = Math.min(state.copyCount, maxCapacity);
    dom.sheetCapacityBadge.textContent = `${actualCopies} / ${maxCapacity} (${cols}/row)`;

    const usedCols = Math.min(cols, actualCopies);
    const totalRowW = usedCols * tileW + (usedCols - 1) * gapPx;

    // Shopkeeper Alignment:
    // - 'top-left': Starts strictly at top-left (marginPx) so even horizontal scrap can be saved!
    // - 'top-center': Centers horizontally across the header while staying pinned to the TOP edge!
    const startX = state.sheetAlign === 'top-center'
      ? Math.max(marginPx, Math.round((sheetWpx - totalRowW) / 2))
      : marginPx;

    // ALWAYS TOP-HEADER ALIGNED (never centered vertically in the middle of the page!)
    const startY = marginPx + topOffsetPx;

    let drawn = 0;
    let lastBottomY = startY;

    for (let r = 0; r < rows && drawn < actualCopies; r++) {
      for (let c = 0; c < cols && drawn < actualCopies; c++) {
        const x = startX + c * (tileW + gapPx);
        const y = startY + r * (tileH + gapPx);
        ctx.drawImage(dom.singleOutputCanvas, x, y, tileW, tileH);

        if (state.showCropMarks) {
          drawScissorCropMarks(ctx, x, y, tileW, tileH, Math.max(5, Math.round(state.dpi * 0.03)));
        }
        lastBottomY = Math.max(lastBottomY, y + tileH);
        drawn++;
      }
    }

    // Draw a subtle horizontal "CUT HERE TO SAVE REMAINING SHEET" dashed guide below the last printed row
    const cutLineY = lastBottomY + Math.round((3.5 / 25.4) * state.dpi);
    if (state.showCropMarks && cutLineY < sheetHpx - 40) {
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.55)';
      ctx.lineWidth = Math.max(1, Math.round(state.dpi / 300));
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(0, cutLineY);
      ctx.lineTo(sheetWpx, cutLineY);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = `500 ${Math.max(10, Math.round(state.dpi * 0.032))}px "JetBrains Mono", monospace`;
      const savedMm = Math.max(0, Math.round(sheetHmm - (cutLineY / state.dpi) * 25.4));
      ctx.fillText(`✂ CUT STRIP HERE — ${savedMm} mm of ${paper.name} remains reusable below`, marginPx + 4, cutLineY + Math.round(state.dpi * 0.045));
      ctx.restore();
    }

    dom.sheetSummaryFooter.textContent =
      `Top-Header Shopkeeper Layout: ${cols} photos per row • ${actualCopies} printed at the very top of ${paper.name} (${sheetWpx}×${sheetHpx} px @ ${state.dpi} DPI).`;
  }

  function drawScissorCropMarks(ctx, x, y, w, h, tickLen) {
    ctx.save();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.7)';
    ctx.lineWidth = Math.max(1, Math.round(state.dpi / 250));
    const corners = [[x, y, -1, -1], [x + w, y, 1, -1], [x, y + h, -1, 1], [x + w, y + h, 1, 1]];
    ctx.beginPath();
    corners.forEach(([cx, cy, dx, dy]) => {
      ctx.moveTo(cx + dx * 2, cy); ctx.lineTo(cx + dx * tickLen, cy);
      ctx.moveTo(cx, cy + dy * 2); ctx.lineTo(cx, cy + dy * tickLen);
    });
    ctx.stroke();
    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // 10. LOSSLESS 24-BIT UNCOMPRESSED .TIFF BINARY ENCODER
  // --------------------------------------------------------------------------
  function encodeCanvasToLosslessTiffBlob(canvas, dpi) {
    const width = canvas.width;
    const height = canvas.height;
    const rgba = canvas.getContext('2d').getImageData(0, 0, width, height).data;

    const rgbByteLength = width * height * 3;
    const numTags = 12;
    const ifdOffset = 8;
    const ifdSize = 2 + numTags * 12 + 4;
    const extraDataOffset = ifdOffset + ifdSize;
    const pixelDataOffset = extraDataOffset + 24;

    const buffer = new ArrayBuffer(pixelDataOffset + rgbByteLength);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    view.setUint8(0, 0x49); view.setUint8(1, 0x49);
    view.setUint16(2, 42, true);
    view.setUint32(4, ifdOffset, true);

    let pos = ifdOffset;
    view.setUint16(pos, numTags, true);
    pos += 2;

    const writeTag = (tag, type, count, valueOrOffset) => {
      view.setUint16(pos, tag, true);
      view.setUint16(pos + 2, type, true);
      view.setUint32(pos + 4, count, true);
      if (type === 3 && count === 1) {
        view.setUint16(pos + 8, valueOrOffset, true);
        view.setUint16(pos + 10, 0, true);
      } else {
        view.setUint32(pos + 8, valueOrOffset, true);
      }
      pos += 12;
    };

    const bpsOffset = extraDataOffset;
    const xResOffset = extraDataOffset + 8;
    const yResOffset = extraDataOffset + 16;

    writeTag(256, 4, 1, width);
    writeTag(257, 4, 1, height);
    writeTag(258, 3, 3, bpsOffset);
    writeTag(259, 3, 1, 1);
    writeTag(262, 3, 1, 2);
    writeTag(273, 4, 1, pixelDataOffset);
    writeTag(277, 3, 1, 3);
    writeTag(278, 4, 1, height);
    writeTag(279, 4, 1, rgbByteLength);
    writeTag(282, 5, 1, xResOffset);
    writeTag(283, 5, 1, yResOffset);
    writeTag(296, 3, 1, 2);
    view.setUint32(pos, 0, true);

    view.setUint16(bpsOffset, 8, true);
    view.setUint16(bpsOffset + 2, 8, true);
    view.setUint16(bpsOffset + 4, 8, true);
    view.setUint32(xResOffset, dpi, true);
    view.setUint32(xResOffset + 4, 1, true);
    view.setUint32(yResOffset, dpi, true);
    view.setUint32(yResOffset + 4, 1, true);

    let dst = pixelDataOffset;
    for (let i = 0; i < rgba.length; i += 4) {
      const a = rgba[i + 3] / 255;
      bytes[dst++] = Math.round(rgba[i] * a + 255 * (1 - a));
      bytes[dst++] = Math.round(rgba[i + 1] * a + 255 * (1 - a));
      bytes[dst++] = Math.round(rgba[i + 2] * a + 255 * (1 - a));
    }

    return new Blob([buffer], { type: 'image/tiff' });
  }

  function triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // --------------------------------------------------------------------------
  // 11. EVENT LISTENERS
  // --------------------------------------------------------------------------
  function bindEventListeners() {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => switchWorkspace(btn.dataset.workspace));
    });

    dom.mobileToolTabs.querySelectorAll('.subtab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.mobileToolTabs.querySelectorAll('.subtab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.dataset.panel;
        state.activePanelId = targetId;
        document.querySelectorAll('.tool-section').forEach((sec) => {
          sec.classList.toggle('active', sec.id === targetId);
        });

        if (targetId === 'panel-sheet') {
          switchWorkspace('print');
        } else if (state.workspace === 'print') {
          switchWorkspace('studio');
        } else {
          renderInteractiveStudioStage();
        }
      });
    });

    dom.loadSampleBtn.addEventListener('click', () => generateHighResStudioSamplePortrait());

    dom.photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => loadNewSourceImage(img, `Loaded ${file.name}`);
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Run Ultra-HD ISNet ONNX Deep AI Cutout Button
    dom.runDeepAiBtn.addEventListener('click', () => {
      runUltraDeepAiCutout();
    });

    dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.bgmode;
        if (mode === 'deep' && !state.deepAiCutoutCanvas) {
          runUltraDeepAiCutout();
          return;
        }
        dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.bgMode = mode;
        recomputeBackgroundCutout();
        renderAll();
      });
    });

    dom.reRunAiBtn.addEventListener('click', () => {
      autoSampleBorderWallColors();
      runMediaPipeOnCurrentSource();
      recomputeBackgroundCutout();
      renderAll();
      showToast('Re-scanned AI & wall colors');
    });

    dom.pickBgColorBtn.addEventListener('click', () => {
      state.isPickingWallColor = !state.isPickingWallColor;
      dom.canvasModeBanner.textContent = 'Tap anywhere on the background wall in the photo to sample its color.';
      dom.canvasModeBanner.classList.toggle('hidden', !state.isPickingWallColor);
    });

    dom.bgToleranceSlider.addEventListener('input', () => {
      state.tolerance = parseInt(dom.bgToleranceSlider.value, 10);
      dom.toleranceValLabel.textContent = state.tolerance;
      recomputeBackgroundCutout();
      renderAll();
    });

    dom.aiConfidenceSlider.addEventListener('input', () => {
      state.aiConfidence = parseInt(dom.aiConfidenceSlider.value, 10);
      dom.aiConfidenceValLabel.textContent = `${state.aiConfidence}%`;
      recomputeBackgroundCutout();
      renderAll();
    });

    dom.bgFeatherSlider.addEventListener('input', () => {
      state.featherPx = parseFloat(dom.bgFeatherSlider.value);
      dom.featherValLabel.textContent = `${state.featherPx.toFixed(1)} px`;
      recomputeBackgroundCutout();
      renderAll();
    });

    dom.bgChokeSlider.addEventListener('input', () => {
      state.chokePx = parseInt(dom.bgChokeSlider.value, 10);
      dom.chokeValLabel.textContent = state.chokePx;
      recomputeBackgroundCutout();
      renderAll();
    });

    dom.bgSpillSlider.addEventListener('input', () => {
      state.spillSuppression = parseInt(dom.bgSpillSlider.value, 10);
      dom.spillValLabel.textContent = `${state.spillSuppression}%`;
      recomputeBackgroundCutout();
      renderAll();
    });

    dom.brushModeGroup.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.brushModeGroup.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.brushMode = btn.dataset.brush;
        dom.canvasModeBanner.textContent =
          state.brushMode === 'erase'
            ? 'Erase BG Brush: Paint over unwanted background areas.'
            : state.brushMode === 'restore'
              ? 'Restore Brush: Paint over hair/shoulders to restore them.'
              : '';
        dom.canvasModeBanner.classList.toggle('hidden', state.brushMode === 'off');
      });
    });

    dom.brushSizeSlider.addEventListener('input', () => {
      state.brushSize = parseInt(dom.brushSizeSlider.value, 10);
      dom.brushSizeValLabel.textContent = `${state.brushSize} px`;
    });

    dom.resetBrushMaskBtn.addEventListener('click', () => {
      if (state.userBrushCanvas) {
        state.userBrushCanvas.getContext('2d').clearRect(0, 0, state.userBrushCanvas.width, state.userBrushCanvas.height);
        recomputeBackgroundCutout();
        renderAll();
        showToast('Manual brush strokes cleared');
      }
    });

    dom.bgPresetSwatches.querySelectorAll('.color-swatch').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        dom.bgPresetSwatches.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
        const col = swatch.dataset.color;
        state.bgColor = col;
        if (col !== 'transparent') {
          dom.customBgColorPicker.value = col;
          dom.customBgHexInput.value = col;
        }
        if (state.bgMode === 'none') {
          state.bgMode = 'hybrid';
          dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
            b.classList.toggle('active', b.dataset.bgmode === 'hybrid');
          });
          recomputeBackgroundCutout();
        }
        renderAll();
      });
    });

    dom.customBgColorPicker.addEventListener('input', () => {
      state.bgColor = dom.customBgColorPicker.value;
      dom.customBgHexInput.value = state.bgColor.toUpperCase();
      if (state.bgMode === 'none') {
        state.bgMode = 'hybrid';
        dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
          b.classList.toggle('active', b.dataset.bgmode === 'hybrid');
        });
        recomputeBackgroundCutout();
      }
      renderAll();
    });

    dom.customBgHexInput.addEventListener('change', () => {
      const val = dom.customBgHexInput.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        state.bgColor = val.toUpperCase();
        dom.customBgColorPicker.value = state.bgColor;
        renderAll();
      }
    });

    dom.bgGradientToggle.addEventListener('change', () => {
      state.bgVignette = dom.bgGradientToggle.checked;
      renderAll();
    });

    // Suit Overlay Controls
    dom.dragSuitModeToggle.addEventListener('change', () => {
      state.dragSuitOnCanvas = dom.dragSuitModeToggle.checked;
    });

    const updateSuitTransform = () => {
      state.suitScale = parseFloat(dom.suitScaleSlider.value);
      state.suitWidthStretch = parseFloat(dom.suitWidthSlider.value);
      state.suitOffsetY = parseFloat(dom.suitYSlider.value);
      state.suitOffsetX = parseFloat(dom.suitXSlider.value);
      state.suitBrightness = parseInt(dom.suitBrightSlider.value, 10);

      dom.suitScaleValLabel.textContent = `${Math.round(state.suitScale)}%`;
      dom.suitWidthValLabel.textContent = `${Math.round(state.suitWidthStretch)}%`;
      dom.suitYValLabel.textContent = `${state.suitOffsetY.toFixed(1)}%`;
      dom.suitXValLabel.textContent = `${state.suitOffsetX.toFixed(1)}%`;
      dom.suitBrightValLabel.textContent = `${state.suitBrightness}%`;
      renderAll();
    };
    dom.suitScaleSlider.addEventListener('input', updateSuitTransform);
    dom.suitWidthSlider.addEventListener('input', updateSuitTransform);
    dom.suitYSlider.addEventListener('input', updateSuitTransform);
    dom.suitXSlider.addEventListener('input', updateSuitTransform);
    dom.suitBrightSlider.addEventListener('input', updateSuitTransform);

    dom.resetSuitFitBtn.addEventListener('click', () => {
      dom.suitScaleSlider.value = '100';
      dom.suitWidthSlider.value = '100';
      dom.suitYSlider.value = '0';
      dom.suitXSlider.value = '0';
      dom.suitBrightSlider.value = '100';
      updateSuitTransform();
    });

    // Document Presets
    dom.docPresetSelect.addEventListener('change', () => {
      const key = dom.docPresetSelect.value;
      state.presetKey = key;
      const preset = INDIAN_PRESETS[key];
      if (!preset) return;

      dom.presetHintText.textContent = preset.hint;
      if (key !== 'custom') {
        state.docWidth = preset.width;
        state.docHeight = preset.height;
        state.docUnit = preset.unit;
        dom.cropWidthInput.value = preset.width;
        dom.cropHeightInput.value = preset.height;
        dom.cropUnitSelect.value = preset.unit;
      }

      if (preset.placard !== state.enablePlacard) {
        state.enablePlacard = preset.placard;
        dom.enablePlacardToggle.checked = preset.placard;
        dom.placardInputsWrap.classList.toggle('hidden', !preset.placard);
      }
      renderAll();
    });

    const onCustomDimChange = () => {
      state.docWidth = Math.max(5, parseFloat(dom.cropWidthInput.value) || 33);
      state.docHeight = Math.max(5, parseFloat(dom.cropHeightInput.value) || 43);
      state.docUnit = dom.cropUnitSelect.value;
      dom.docPresetSelect.value = 'custom';
      renderAll();
    };
    dom.cropWidthInput.addEventListener('input', onCustomDimChange);
    dom.cropHeightInput.addEventListener('input', onCustomDimChange);
    dom.cropUnitSelect.addEventListener('change', onCustomDimChange);

    dom.dpiSelect.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.dpiSelect.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.dpi = parseInt(btn.dataset.dpi, 10);
        renderAll();
      });
    });

    dom.showBiometricGuide.addEventListener('change', () => {
      state.showBiometricGuide = dom.showBiometricGuide.checked;
      renderInteractiveStudioStage();
    });

    dom.cropZoomSlider.addEventListener('input', () => {
      state.zoom = parseFloat(dom.cropZoomSlider.value);
      dom.zoomValLabel.textContent = `${Math.round(state.zoom * 100)}%`;
      renderAll();
    });

    dom.cropRotateSlider.addEventListener('input', () => {
      state.rotationDeg = parseFloat(dom.cropRotateSlider.value);
      dom.rotateValLabel.textContent = `${state.rotationDeg.toFixed(1)}°`;
      renderAll();
    });

    dom.rotate90LeftBtn.addEventListener('click', () => { state.quadrantRotations = (state.quadrantRotations - 1) % 4; renderAll(); });
    dom.rotate90RightBtn.addEventListener('click', () => { state.quadrantRotations = (state.quadrantRotations + 1) % 4; renderAll(); });
    dom.flipHBtn.addEventListener('click', () => { state.flipH = !state.flipH; renderAll(); });
    dom.autoCenterBtn.addEventListener('click', () => {
      state.zoom = 1.0; state.panX = 0; state.panY = 0; state.rotationDeg = 0; state.quadrantRotations = 0;
      dom.cropZoomSlider.value = '1'; dom.zoomValLabel.textContent = '100%';
      dom.cropRotateSlider.value = '0'; dom.rotateValLabel.textContent = '0.0°';
      renderAll();
    });

    // Retouch
    const updateRetouch = () => {
      state.brightness = parseInt(dom.brightnessSlider.value, 10);
      state.contrast = parseInt(dom.contrastSlider.value, 10);
      state.saturation = parseInt(dom.saturationSlider.value, 10);
      state.warmth = parseInt(dom.warmthSlider.value, 10);
      dom.brightValLabel.textContent = `${state.brightness}%`;
      dom.contrastValLabel.textContent = `${state.contrast}%`;
      dom.satValLabel.textContent = `${state.saturation}%`;
      dom.warmthValLabel.textContent = state.warmth;
      renderAll();
    };
    dom.brightnessSlider.addEventListener('input', updateRetouch);
    dom.contrastSlider.addEventListener('input', updateRetouch);
    dom.saturationSlider.addEventListener('input', updateRetouch);
    dom.warmthSlider.addEventListener('input', updateRetouch);

    dom.resetRetouchBtn.addEventListener('click', () => {
      dom.brightnessSlider.value = '105';
      dom.contrastSlider.value = '104';
      dom.saturationSlider.value = '100';
      dom.warmthSlider.value = '0';
      updateRetouch();
    });

    dom.enablePlacardToggle.addEventListener('change', () => {
      state.enablePlacard = dom.enablePlacardToggle.checked;
      dom.placardInputsWrap.classList.toggle('hidden', !state.enablePlacard);
      renderAll();
    });
    dom.placardNameInput.addEventListener('input', () => { state.placardName = dom.placardNameInput.value; renderAll(); });
    dom.placardDateInput.addEventListener('input', () => { state.placardDate = dom.placardDateInput.value; renderAll(); });
    dom.useTodayDateBtn.addEventListener('click', () => { initDefaultDate(); renderAll(); });
    dom.enablePhotoBorder.addEventListener('change', () => { state.enablePhotoBorder = dom.enablePhotoBorder.checked; renderAll(); });

    dom.compareOriginalBtn.addEventListener('pointerdown', () => { state.compareHoldOriginal = true; renderAll(); });
    window.addEventListener('pointerup', () => { if (state.compareHoldOriginal) { state.compareHoldOriginal = false; renderAll(); } });

    // Shopkeeper Print Sheet Controls
    dom.paperSizeSelect.addEventListener('change', () => {
      state.paperKey = dom.paperSizeSelect.value;
      renderAll();
    });

    dom.sheetAlignGroup.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.sheetAlignGroup.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.sheetAlign = btn.dataset.align;
        renderPrintSheetCanvas();
      });
    });

    dom.paperOrientationGroup.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.paperOrientationGroup.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.paperOrientation = btn.dataset.orient;
        renderAll();
      });
    });

    const setCopyCount = (n) => {
      const clamped = Math.max(1, Math.min(54, n));
      state.copyCount = clamped;
      dom.copyCountSlider.value = String(clamped);
      dom.copyCountNumber.value = String(clamped);
      dom.copyCountValLabel.textContent = `${clamped} ${clamped === 1 ? 'Copy' : 'Copies'}`;
      renderAll();
    };
    dom.copyCountSlider.addEventListener('input', () => setCopyCount(parseInt(dom.copyCountSlider.value, 10)));
    dom.copyCountNumber.addEventListener('input', () => setCopyCount(parseInt(dom.copyCountNumber.value, 10) || 1));

    document.querySelectorAll('.copy-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const copies = parseInt(btn.dataset.copies, 10);
        setCopyCount(copies);
      });
    });

    dom.sheetGapSlider.addEventListener('input', () => {
      state.gapMm = parseFloat(dom.sheetGapSlider.value);
      dom.gapValLabel.textContent = `${state.gapMm.toFixed(1)} mm`;
      renderPrintSheetCanvas();
    });

    dom.sheetMarginSlider.addEventListener('input', () => {
      state.marginMm = parseFloat(dom.sheetMarginSlider.value);
      dom.marginValLabel.textContent = `${state.marginMm.toFixed(1)} mm`;
      renderPrintSheetCanvas();
    });

    dom.sheetTopOffsetSlider.addEventListener('input', () => {
      state.topOffsetMm = parseFloat(dom.sheetTopOffsetSlider.value);
      dom.topOffsetValLabel.textContent = `${state.topOffsetMm} mm`;
      renderPrintSheetCanvas();
    });

    dom.showCropMarksToggle.addEventListener('change', () => {
      state.showCropMarks = dom.showCropMarksToggle.checked;
      renderPrintSheetCanvas();
    });

    // Exports & Direct Shop Printer
    dom.downloadSheetTiffBtn.addEventListener('click', () => {
      renderPrintSheetCanvas();
      const blob = encodeCanvasToLosslessTiffBlob(dom.printSheetCanvas, state.dpi);
      triggerBlobDownload(blob, `AuraID_${state.paperKey.toUpperCase()}_${state.copyCount}pcs_${state.dpi}DPI.tiff`);
      showToast(`Exported Lossless ${state.dpi} DPI Print Sheet (.TIFF)`);
    });

    dom.downloadSheetPngBtn.addEventListener('click', () => {
      renderPrintSheetCanvas();
      dom.printSheetCanvas.toBlob((blob) => {
        if (blob) triggerBlobDownload(blob, `AuraID_${state.paperKey.toUpperCase()}_Sheet_${state.dpi}DPI.png`);
      }, 'image/png');
    });

    dom.printSheetDirectBtn.addEventListener('click', () => {
      renderPrintSheetCanvas();
      const dataUrl = dom.printSheetCanvas.toDataURL('image/png');
      const win = window.open('', '_blank');
      if (!win) { showToast('Allow popups to use Direct Print'); return; }
      win.document.write(`<!DOCTYPE html><html><head><title>Print AuraID Customer Strip</title><style>@page{margin:0;}body{margin:0;padding:0;}img{width:100%;height:auto;display:block;}</style></head><body onload="window.print();"><img src="${dataUrl}"/></body></html>`);
      win.document.close();
    });

    dom.downloadSingleTiffBtn.addEventListener('click', () => {
      const blob = encodeCanvasToLosslessTiffBlob(dom.singleOutputCanvas, state.dpi);
      triggerBlobDownload(blob, `AuraID_${state.presetKey}_${state.dpi}DPI.tiff`);
      showToast('Exported Single Lossless .TIFF');
    });

    dom.downloadSinglePngBtn.addEventListener('click', () => {
      dom.singleOutputCanvas.toBlob((blob) => {
        if (blob) triggerBlobDownload(blob, `AuraID_${state.presetKey}_${state.dpi}DPI.png`);
      }, 'image/png');
    });

    dom.downloadSingleJpgBtn.addEventListener('click', () => {
      dom.singleOutputCanvas.toBlob((blob) => {
        if (blob) triggerBlobDownload(blob, `AuraID_${state.presetKey}_${state.dpi}DPI.jpg`);
      }, 'image/jpeg', 0.98);
    });

    bindStageCanvasGestures();
    window.addEventListener('resize', () => renderInteractiveStudioStage());
  }

  function switchWorkspace(ws) {
    state.workspace = ws;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const active = b.dataset.workspace === ws;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    dom.workspaceStudio.classList.toggle('active', ws === 'studio');
    dom.workspacePrint.classList.toggle('active', ws === 'print');
    renderAll();
  }

  function bindStageCanvasGestures() {
    const canvas = dom.interactiveCropCanvas;
    let isDragging = false;
    let lastX = 0, lastY = 0;

    const mapStagePointToSource = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const sx = ((clientX - rect.left) / rect.width) * canvas.width;
      const sy = ((clientY - rect.top) / rect.height) * canvas.height;
      const box = canvas._cropBox;
      if (!box) return null;

      const nx = (sx - (box.boxX + box.boxW / 2)) / box.boxW;
      const ny = (sy - (box.boxY + box.boxH / 2)) / box.boxH;

      const { widthPx, heightPx } = getTargetSinglePhotoPixels();
      const baseScale = Math.max(widthPx / state.sourceWidth, heightPx / state.sourceHeight);
      const finalScale = baseScale * state.zoom;

      const imgX = (nx * widthPx) / finalScale + state.sourceWidth / 2 - state.panX;
      const imgY = (ny * heightPx) / finalScale + state.sourceHeight / 2 - state.panY;

      return {
        x: Math.max(0, Math.min(state.sourceWidth - 1, Math.round(imgX))),
        y: Math.max(0, Math.min(state.sourceHeight - 1, Math.round(imgY)))
      };
    };

    const paintBrushStrokeAt = (clientX, clientY) => {
      if (!state.userBrushCanvas) return;
      const pt = mapStagePointToSource(clientX, clientY);
      if (!pt) return;
      const bCtx = state.userBrushCanvas.getContext('2d');
      bCtx.save();
      bCtx.beginPath();
      bCtx.arc(pt.x, pt.y, state.brushSize, 0, Math.PI * 2);
      bCtx.fillStyle = state.brushMode === 'erase' ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)';
      bCtx.fill();
      bCtx.restore();
      recomputeBackgroundCutout();
      renderAll();
    };

    canvas.addEventListener('pointerdown', (e) => {
      canvas.setPointerCapture(e.pointerId);

      if (state.isPickingWallColor) {
        const pt = mapStagePointToSource(e.clientX, e.clientY);
        if (pt) {
          const p = rawSourceCtx.getImageData(pt.x, pt.y, 1, 1).data;
          const sampledLab = rgbToLab(p[0], p[1], p[2]);
          state.sampledWallSamples = [sampledLab, ...state.sampledWallSamples.slice(0, 5)];
          dom.sampledWallSwatch.style.backgroundColor = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
          state.isPickingWallColor = false;
          dom.canvasModeBanner.classList.add('hidden');
          if (state.bgMode === 'deep') state.bgMode = 'hybrid';
          recomputeBackgroundCutout();
          renderAll();
          showToast('Sampled wall color & updated edge cutout');
        }
        return;
      }

      if (state.brushMode !== 'off') {
        isDragging = true;
        paintBrushStrokeAt(e.clientX, e.clientY);
        return;
      }

      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      if (state.brushMode !== 'off') {
        paintBrushStrokeAt(e.clientX, e.clientY);
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      if (state.activePanelId === 'panel-suit' && state.suitId !== 'none' && state.dragSuitOnCanvas) {
        state.suitOffsetX = Math.max(-35, Math.min(35, state.suitOffsetX + dx * 0.18));
        state.suitOffsetY = Math.max(-45, Math.min(45, state.suitOffsetY + dy * 0.18));
        dom.suitXSlider.value = String(state.suitOffsetX);
        dom.suitYSlider.value = String(state.suitOffsetY);
        dom.suitXValLabel.textContent = `${state.suitOffsetX.toFixed(1)}%`;
        dom.suitYValLabel.textContent = `${state.suitOffsetY.toFixed(1)}%`;
        renderAll();
        return;
      }

      const factor = 1.4 / state.zoom;
      state.panX += (state.flipH ? -dx : dx) * factor;
      state.panY += dy * factor;
      renderAll();
    });

    const endDrag = () => { isDragging = false; };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      if (state.activePanelId === 'panel-suit' && state.suitId !== 'none' && state.dragSuitOnCanvas) {
        state.suitScale = Math.max(55, Math.min(165, state.suitScale + delta * 80));
        dom.suitScaleSlider.value = String(state.suitScale);
        dom.suitScaleValLabel.textContent = `${Math.round(state.suitScale)}%`;
      } else {
        state.zoom = Math.max(0.3, Math.min(3.5, state.zoom + delta));
        dom.cropZoomSlider.value = String(state.zoom);
        dom.zoomValLabel.textContent = `${Math.round(state.zoom * 100)}%`;
      }
      renderAll();
    }, { passive: false });
  }

  function adjustHex(hex, delta) {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return hex;
    const num = parseInt(clean, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + delta));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + delta));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + delta));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function showToast(message) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    dom.toastContainer.appendChild(t);
    setTimeout(() => t.remove(), 2800);
  }
})();