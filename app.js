/* ==========================================================================
   AuraID Studio Pro v5.0 — Complete Shopkeeper & Studio Engine (app.js)
   PART 1 OF 2:
   - Photorealistic Shaded Indian Male & Female Formal Attire (13 Templates + PNG Upload)
   - Live WebRTC Camera Capture Modal (Front/Back Switch + Mirror)
   - Dual AI Engine: ISNet ONNX Deep Hair Matting + Realtime MediaPipe & CIE-LAB
   ========================================================================== */

(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. PHOTOREALISTIC SHADED INDIAN MALE & FEMALE FORMAL ATTIRE CATALOG
  //    Uses multi-stop directional cloth gradients, realistic collar drop shadows,
  //    3D lapel bevels, and natural neck V-opening (x:134..266) for lifelike fit.
  // --------------------------------------------------------------------------
  const COMMON_SVG_DEFS = `
    <defs>
      <filter id="dropShad" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.42"/>
      </filter>
      <filter id="softShad" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.28"/>
      </filter>
      <linearGradient id="shirtWhite" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="65%" stop-color="#f1f5f9"/>
        <stop offset="100%" stop-color="#cbd5e1"/>
      </linearGradient>
      <linearGradient id="shirtSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e0f2fe"/>
        <stop offset="70%" stop-color="#bae6fd"/>
        <stop offset="100%" stop-color="#7dd3fc"/>
      </linearGradient>
      <linearGradient id="navyWool" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="45%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#060b16"/>
      </linearGradient>
      <linearGradient id="navyLapel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="charcoalWool" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#27272a"/>
        <stop offset="50%" stop-color="#18181b"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>
      <linearGradient id="charcoalLapel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3f3f46"/>
        <stop offset="100%" stop-color="#18181b"/>
      </linearGradient>
      <linearGradient id="royalWool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1d4ed8"/>
        <stop offset="55%" stop-color="#1e3a8a"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="crimsonSilk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="50%" stop-color="#991b1b"/>
        <stop offset="100%" stop-color="#450a0a"/>
      </linearGradient>
      <linearGradient id="goldSilk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fde047"/>
        <stop offset="50%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#a16207"/>
      </linearGradient>
    </defs>
  `;

  const FORMAL_SUITS = [
    {
      id: 'none',
      category: 'all',
      name: 'No Suit (Original)',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="160" r="92" fill="none" stroke="#94a3b8" stroke-width="14" stroke-dasharray="22 14"/>
        <line x1="132" y1="92" x2="268" y2="228" stroke="#ef4444" stroke-width="16" stroke-linecap="round"/>
      </svg>`
    },
    // --- MALE ATTIRE TEMPLATES ---
    {
      id: 'male_navy_crimson',
      category: 'male',
      name: 'Navy Suit + Crimson Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Inner Dress Shirt & Neck Shadow -->
        <path d="M132 48 L200 118 L268 48 L295 320 L105 320 Z" fill="url(#shirtWhite)"/>
        <path d="M136 50 Q200 105 264 50 L200 124 Z" fill="#94a3b8" opacity="0.28"/>
        <!-- 3D Silk Crimson Tie with Knot Shadow -->
        <g filter="url(#softShad)">
          <polygon points="183,104 217,104 210,136 190,136" fill="#7f1d1d"/>
          <polygon points="190,134 210,134 224,298 200,320 176,298" fill="url(#crimsonSilk)"/>
          <line x1="191" y1="158" x2="213" y2="180" stroke="#fca5a5" stroke-width="3" opacity="0.45"/>
          <line x1="187" y1="204" x2="217" y2="234" stroke="#fca5a5" stroke-width="3" opacity="0.45"/>
        </g>
        <!-- Crisp Spread Shirt Collar Wings -->
        <polygon points="134,44 200,112 154,148 115,74" fill="#ffffff" filter="url(#softShad)"/>
        <polygon points="266,44 200,112 246,148 285,74" fill="#ffffff" filter="url(#softShad)"/>
        <!-- Tailored Navy Wool Jacket Shoulders -->
        <path d="M-24 320 L-12 162 Q6 96 126 48 L200 292 L274 48 Q394 96 412 162 L424 320 Z" fill="url(#navyWool)" filter="url(#dropShad)"/>
        <!-- Shoulder Seam Highlights -->
        <path d="M-8 160 Q14 102 124 52" fill="none" stroke="#475569" stroke-width="2" opacity="0.5"/>
        <path d="M408 160 Q386 102 276 52" fill="none" stroke="#475569" stroke-width="2" opacity="0.5"/>
        <!-- 3D Notched Lapels with Shadow -->
        <polygon points="125,48 165,138 143,150 160,166 200,292 104,164" fill="url(#navyLapel)" filter="url(#dropShad)"/>
        <polygon points="275,48 235,138 257,150 240,166 200,292 296,164" fill="url(#navyLapel)" filter="url(#dropShad)"/>
        <!-- Welt Pocket & White Silk Pocket Square -->
        <rect x="268" y="216" width="60" height="10" rx="3" fill="#040812"/>
        <polygon points="276,216 296,195 316,216" fill="#f8fafc" filter="url(#softShad)"/>
      </svg>`
    },
    {
      id: 'male_charcoal_exec',
      category: 'male',
      name: 'Charcoal Black + Navy Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M132 48 L200 118 L268 48 L295 320 L105 320 Z" fill="url(#shirtWhite)"/>
        <g filter="url(#softShad)">
          <polygon points="183,104 217,104 210,136 190,136" fill="#172554"/>
          <polygon points="190,134 210,134 224,298 200,320 176,298" fill="url(#royalWool)"/>
          <line x1="189" y1="165" x2="214" y2="190" stroke="#93c5fd" stroke-width="3.5" opacity="0.5"/>
          <line x1="186" y1="210" x2="217" y2="241" stroke="#93c5fd" stroke-width="3.5" opacity="0.5"/>
        </g>
        <polygon points="134,44 200,112 154,148 115,74" fill="#ffffff" filter="url(#softShad)"/>
        <polygon points="266,44 200,112 246,148 285,74" fill="#ffffff" filter="url(#softShad)"/>
        <path d="M-24 320 L-12 162 Q6 96 126 48 L200 292 L274 48 Q394 96 412 162 L424 320 Z" fill="url(#charcoalWool)" filter="url(#dropShad)"/>
        <polygon points="125,48 165,138 143,150 160,166 200,292 104,164" fill="url(#charcoalLapel)" filter="url(#dropShad)"/>
        <polygon points="275,48 235,138 257,150 240,166 200,292 296,164" fill="url(#charcoalLapel)" filter="url(#dropShad)"/>
        <rect x="268" y="216" width="60" height="10" rx="3" fill="#050505"/>
        <polygon points="278,216 298,198 316,216" fill="#38bdf8"/>
      </svg>`
    },
    {
      id: 'male_royal_gold',
      category: 'male',
      name: 'Royal Blue + Gold Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M132 48 L200 118 L268 48 L295 320 L105 320 Z" fill="url(#shirtWhite)"/>
        <g filter="url(#softShad)">
          <polygon points="183,104 217,104 210,136 190,136" fill="#854d0e"/>
          <polygon points="190,134 210,134 224,298 200,320 176,298" fill="url(#goldSilk)"/>
        </g>
        <polygon points="134,44 200,112 154,148 115,74" fill="#ffffff" filter="url(#softShad)"/>
        <polygon points="266,44 200,112 246,148 285,74" fill="#ffffff" filter="url(#softShad)"/>
        <path d="M-24 320 L-12 162 Q6 96 126 48 L200 292 L274 48 Q394 96 412 162 L424 320 Z" fill="url(#royalWool)" filter="url(#dropShad)"/>
        <polygon points="125,48 165,138 143,150 160,166 200,292 104,164" fill="#2563eb" filter="url(#dropShad)"/>
        <polygon points="275,48 235,138 257,150 240,166 200,292 296,164" fill="#2563eb" filter="url(#dropShad)"/>
        <rect x="268" y="216" width="60" height="10" rx="3" fill="#0f172a"/>
        <polygon points="278,216 298,196 316,216" fill="#fde047"/>
      </svg>`
    },
    {
      id: 'male_bandhgala',
      category: 'male',
      name: 'Jodhpuri Bandhgala',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Inner White Kurta/Collar Peek -->
        <path d="M132 54 Q200 105 268 54 L250 120 L150 120 Z" fill="#f8fafc"/>
        <!-- Royal Black Bandhgala Coat -->
        <path d="M-24 320 L-12 160 Q8 96 128 48 L176 96 L224 96 L272 48 Q392 96 412 160 L424 320 Z" fill="url(#charcoalWool)" filter="url(#dropShad)"/>
        <!-- 3D Mandarin Stand Collar with Gold Piping -->
        <path d="M126 45 Q162 94 197 94 L197 124 Q144 120 114 68 Z" fill="url(#charcoalLapel)" stroke="#d97706" stroke-width="1.5" filter="url(#softShad)"/>
        <path d="M274 45 Q238 94 203 94 L203 124 Q256 120 286 68 Z" fill="url(#charcoalLapel)" stroke="#d97706" stroke-width="1.5" filter="url(#softShad)"/>
        <!-- Center Placket & Antique Brass Buttons -->
        <line x1="200" y1="96" x2="200" y2="320" stroke="#09090b" stroke-width="4"/>
        <circle cx="200" cy="144" r="8" fill="url(#goldSilk)" filter="url(#softShad)"/>
        <circle cx="200" cy="198" r="8" fill="url(#goldSilk)" filter="url(#softShad)"/>
        <circle cx="200" cy="252" r="8" fill="url(#goldSilk)" filter="url(#softShad)"/>
        <circle cx="200" cy="304" r="8" fill="url(#goldSilk)" filter="url(#softShad)"/>
        <rect x="262" y="196" width="58" height="9" rx="2" fill="#09090b"/>
        <polygon points="272,196 292,174 310,196" fill="url(#goldSilk)"/>
      </svg>`
    },
    {
      id: 'male_nehru_jacket',
      category: 'male',
      name: 'Nehru Jacket + Shirt',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Crisp White Kurta / Shirt Sleeves & Collar -->
        <path d="M-24 320 L-12 162 Q6 96 130 48 L200 108 L270 48 Q394 96 412 162 L424 320 Z" fill="url(#shirtWhite)"/>
        <!-- Navy Sleeveless Modi / Nehru Vest -->
        <path d="M42 320 L55 125 Q95 75 130 48 L178 98 L222 98 L270 48 Q305 75 345 125 L358 320 Z" fill="url(#navyWool)" filter="url(#dropShad)"/>
        <path d="M128 45 Q162 94 197 94 L197 122 Q145 118 116 66 Z" fill="url(#navyLapel)" filter="url(#softShad)"/>
        <path d="M272 45 Q238 94 203 94 L203 122 Q255 118 284 66 Z" fill="url(#navyLapel)" filter="url(#softShad)"/>
        <line x1="200" y1="98" x2="200" y2="320" stroke="#090d16" stroke-width="3.5"/>
        <circle cx="200" cy="148" r="6.5" fill="#94a3b8"/>
        <circle cx="200" cy="202" r="6.5" fill="#94a3b8"/>
        <circle cx="200" cy="256" r="6.5" fill="#94a3b8"/>
      </svg>`
    },
    {
      id: 'male_white_shirt_tie',
      category: 'male',
      name: 'White Formal Shirt + Tie',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M-24 320 L-12 162 Q6 96 132 48 L200 112 L268 48 Q394 96 412 162 L424 320 Z" fill="url(#shirtWhite)" filter="url(#dropShad)"/>
        <path d="M85 165 L95 320 M315 165 L305 320" stroke="#cbd5e1" stroke-width="2.5"/>
        <g filter="url(#softShad)">
          <polygon points="183,100 217,100 210,132 190,132" fill="#0f172a"/>
          <polygon points="190,130 210,130 225,296 200,320 175,296" fill="url(#navyWool)"/>
          <line x1="189" y1="164" x2="213" y2="188" stroke="#38bdf8" stroke-width="4"/>
          <line x1="185" y1="212" x2="217" y2="244" stroke="#38bdf8" stroke-width="4"/>
        </g>
        <polygon points="132,42 200,108 152,146 112,72" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#softShad)"/>
        <polygon points="268,42 200,108 248,146 288,72" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#softShad)"/>
      </svg>`
    },
    {
      id: 'male_sky_shirt_open',
      category: 'male',
      name: 'Sky Blue Formal Shirt',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M-24 320 L-12 162 Q6 96 132 48 L188 124 L200 178 L212 124 L268 48 Q394 96 412 162 L424 320 Z" fill="url(#shirtSky)" filter="url(#dropShad)"/>
        <!-- Open Collar Inner Placket -->
        <polygon points="182,115 200,185 218,115 200,145" fill="#f8fafc"/>
        <line x1="200" y1="178" x2="200" y2="320" stroke="#93c5fd" stroke-width="3"/>
        <circle cx="200" cy="215" r="4.5" fill="#ffffff"/>
        <circle cx="200" cy="268" r="4.5" fill="#ffffff"/>
        <polygon points="132,42 188,122 146,154 110,74" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1.5" filter="url(#softShad)"/>
        <polygon points="268,42 212,122 254,154 290,74" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1.5" filter="url(#softShad)"/>
      </svg>`
    },

    // --- FEMALE ATTIRE TEMPLATES ---
    {
      id: 'female_navy_corp',
      category: 'female',
      name: "Women's Navy Blazer + Shell",
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Soft Ivory Silk Shell Top -->
        <path d="M126 66 Q200 165 274 66 L290 320 L110 320 Z" fill="url(#shirtWhite)"/>
        <!-- Tailored Women's Navy Corporate Blazer -->
        <path d="M-16 320 L-6 166 Q14 104 128 52 L200 268 L272 52 Q386 104 406 166 L416 320 Z" fill="url(#navyWool)" filter="url(#dropShad)"/>
        <!-- Contoured Shawl Lapels -->
        <path d="M127 50 Q160 148 200 268 L164 268 Q120 156 102 74 Z" fill="url(#navyLapel)" filter="url(#softShad)"/>
        <path d="M273 50 Q240 148 200 268 L236 268 Q280 156 298 74 Z" fill="url(#navyLapel)" filter="url(#softShad)"/>
        <circle cx="200" cy="285" r="7" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'female_black_collar_coat',
      category: 'female',
      name: "Women's Black Suit + Shirt",
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M128 50 L200 142 L272 50 L290 320 L110 320 Z" fill="url(#shirtWhite)"/>
        <polygon points="128,44 200,136 150,166 106,80" fill="#ffffff" filter="url(#softShad)"/>
        <polygon points="272,44 200,136 250,166 294,80" fill="#ffffff" filter="url(#softShad)"/>
        <path d="M-16 320 L-6 166 Q14 104 126 52 L200 276 L274 52 Q386 104 406 166 L416 320 Z" fill="url(#charcoalWool)" filter="url(#dropShad)"/>
        <polygon points="124,50 166,158 200,276 110,166" fill="url(#charcoalLapel)" filter="url(#softShad)"/>
        <polygon points="276,50 234,158 200,276 290,166" fill="url(#charcoalLapel)" filter="url(#softShad)"/>
      </svg>`
    },
    {
      id: 'female_maroon_saree',
      category: 'female',
      name: 'Formal Maroon Silk Saree',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Maroon Blouse Base (Right & Left Shoulders) -->
        <path d="M-16 320 L-6 165 Q15 104 128 54 Q200 128 272 54 Q385 104 406 165 L416 320 Z" fill="url(#crimsonSilk)" filter="url(#dropShad)"/>
        <!-- Gold Zari Blouse Neckline Piping -->
        <path d="M128 54 Q200 128 272 54" fill="none" stroke="url(#goldSilk)" stroke-width="5"/>
        <!-- Diagonal Pleated Silk Saree Pallu Drape Across Left Shoulder (Viewer's Right) -->
        <path d="M95 320 L256 58 Q335 82 375 135 L310 320 Z" fill="#b91c1c" filter="url(#dropShad)"/>
        <!-- Rich Gold Zari Saree Border & Pleat Lines -->
        <path d="M95 320 L256 58 L274 66 L122 320 Z" fill="url(#goldSilk)"/>
        <path d="M155 320 L295 75" stroke="#7f1d1d" stroke-width="3" opacity="0.6"/>
        <path d="M205 320 L328 96" stroke="#7f1d1d" stroke-width="3" opacity="0.6"/>
        <path d="M255 320 L356 118" stroke="#7f1d1d" stroke-width="3" opacity="0.6"/>
      </svg>`
    },
    {
      id: 'female_navy_saree',
      category: 'female',
      name: 'Formal Navy & Gold Saree',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <path d="M-16 320 L-6 165 Q15 104 128 54 Q200 128 272 54 Q385 104 406 165 L416 320 Z" fill="url(#navyWool)" filter="url(#dropShad)"/>
        <path d="M128 54 Q200 128 272 54" fill="none" stroke="url(#goldSilk)" stroke-width="5"/>
        <path d="M95 320 L256 58 Q335 82 375 135 L310 320 Z" fill="url(#royalWool)" filter="url(#dropShad)"/>
        <path d="M95 320 L256 58 L274 66 L122 320 Z" fill="url(#goldSilk)"/>
        <path d="M155 320 L295 75" stroke="#0f172a" stroke-width="3" opacity="0.55"/>
        <path d="M205 320 L328 96" stroke="#0f172a" stroke-width="3" opacity="0.55"/>
      </svg>`
    },
    {
      id: 'female_formal_kurti',
      category: 'female',
      name: 'Formal Collar Kurti + Dupatta',
      svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
        ${COMMON_SVG_DEFS}
        <!-- Teal Formal Kurti with Mandarin V-Notch Collar -->
        <path d="M-16 320 L-6 165 Q15 104 130 52 L186 105 L200 155 L214 105 L270 52 Q385 104 406 165 L416 320 Z" fill="#0f766e" filter="url(#dropShad)"/>
        <path d="M128 48 Q162 96 188 105 L182 128 Q142 114 116 68 Z" fill="#115e59" stroke="url(#goldSilk)" stroke-width="1.5"/>
        <path d="M272 48 Q238 96 212 105 L218 128 Q258 114 284 68 Z" fill="#115e59" stroke="url(#goldSilk)" stroke-width="1.5"/>
        <!-- Neatly Pinned Cream & Gold Dupatta on Shoulders -->
        <path d="M22 320 L48 112 Q85 78 120 62 L152 320 Z" fill="#fef3c7" stroke="url(#goldSilk)" stroke-width="4" filter="url(#softShad)"/>
        <path d="M378 320 L352 112 Q315 78 280 62 L248 320 Z" fill="#fef3c7" stroke="url(#goldSilk)" stroke-width="4" filter="url(#softShad)"/>
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
      hint: 'Shopkeeper Standard (33×43 mm): Fits 6 photos in 1 A4 top row or 8 photos on 4R paper with zero paper waste!'
    },
    passport_35_45: {
      name: 'Official Studio Passport / ID (35×45 mm)',
      width: 35,
      height: 45,
      unit: 'mm',
      placard: false,
      hint: 'Standard 3.5×4.5 cm Indian passport size. Fits 8 copies on 4R (auto-rotated) or 5–6 per row on A4.'
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
    deepAiCutoutCanvas: null,
    deepAiRunning: false,
    userBrushCanvas: null,
    compositedSubjectCanvas: null,

    // Direct Ready Photo Mode (Skips AI & BG replacement when true)
    directReadyMode: false,

    // Document Size & DPI
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
    bgMode: 'hybrid',
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

    // Realistic Formal Suit Overlay
    suitCategory: 'all',
    suitId: 'none',
    dragSuitOnCanvas: true,
    suitScale: 100,
    suitWidthStretch: 100,
    suitOffsetX: 0,
    suitOffsetY: 0,
    suitBrightness: 100,

    // Custom Border Studio
    enablePhotoBorder: true,
    borderColor: '#0f172a',
    borderWidthPx: 3,
    borderInsetPx: 0,

    // Retouch & Placard
    brightness: 105,
    contrast: 104,
    saturation: 100,
    warmth: 0,
    enablePlacard: false,
    placardName: 'AARAV SHARMA',
    placardDate: '',
    compareHoldOriginal: false,

    // Zero-Waste Print Sheet Layout
    paperKey: 'a4',
    sheetAlign: 'top-center',
    paperOrientation: 'portrait',
    autoFit4R8: true,
    copyCount: 6,
    marginMm: 2.0,
    gapMm: 1.5,
    topOffsetMm: 0,
    showCropMarks: true,
    computedSheetMetrics: { cols: 6, rows: 6, maxCapacity: 36, rotatedTiles: false }
  };

  // Offscreen Processing Canvases
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

  // Live Camera Stream State
  let activeCameraStream = null;
  let cameraFacingMode = 'user';
  let cameraMirrored = true;

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
      'openCameraModalBtn', 'directPrintUploadInput', 'photoUploadInput', 'loadSampleBtn',
      'mobileToolTabs', 'directReadyModeToggle', 'runDeepAiBtn', 'deepAiProgressWrap',
      'deepAiProgressFill', 'deepAiProgressText', 'bgModeTabs', 'bgEngineStatus',
      'reRunAiBtn', 'pickBgColorBtn', 'sampledWallSwatch', 'bgToleranceSlider',
      'toleranceValLabel', 'aiConfidenceSlider', 'aiConfidenceValLabel',
      'bgFeatherSlider', 'featherValLabel', 'bgChokeSlider', 'chokeValLabel',
      'bgSpillSlider', 'spillValLabel', 'brushModeGroup', 'brushSizeSlider',
      'brushSizeValLabel', 'resetBrushMaskBtn', 'bgPresetSwatches',
      'customBgColorPicker', 'customBgHexInput', 'bgGradientToggle',
      'suitCategoryTabs', 'customSuitUploadInput', 'suitCatalogGrid',
      'activeSuitBadge', 'dragSuitModeToggle', 'resetSuitFitBtn',
      'suitScaleSlider', 'suitScaleValLabel', 'suitWidthSlider', 'suitWidthValLabel',
      'suitYSlider', 'suitYValLabel', 'suitXSlider', 'suitXValLabel',
      'suitBrightSlider', 'suitBrightValLabel', 'docPresetSelect', 'presetHintText',
      'cropWidthInput', 'cropHeightInput', 'cropUnitSelect', 'dpiSelect',
      'outputPxReadout', 'showBiometricGuide', 'cropZoomSlider', 'zoomValLabel',
      'cropRotateSlider', 'rotateValLabel', 'rotate90LeftBtn', 'rotate90RightBtn',
      'flipHBtn', 'autoCenterBtn', 'enablePhotoBorder', 'borderControlsWrap',
      'photoBorderColorPicker', 'photoBorderWidthSlider', 'borderWidthValLabel',
      'photoBorderInsetSlider', 'borderInsetValLabel', 'brightnessSlider',
      'brightValLabel', 'contrastSlider', 'contrastValLabel', 'saturationSlider',
      'satValLabel', 'warmthSlider', 'warmthValLabel', 'resetRetouchBtn',
      'enablePlacardToggle', 'placardInputsWrap', 'placardNameInput',
      'placardDateInput', 'useTodayDateBtn', 'paperSizeSelect', 'gridFormulaLabel',
      'fillOneRowBtn', 'fillTwoRowsBtn', 'fillHalfSheetBtn', 'fillMaxSheetBtn',
      'autoFit4R8Toggle', 'sheetAlignGroup', 'paperOrientationGroup',
      'copyCountSlider', 'copyCountNumber', 'copyCountValLabel', 'sheetCapacityBadge',
      'sheetGapSlider', 'gapValLabel', 'sheetMarginSlider', 'marginValLabel',
      'sheetTopOffsetSlider', 'topOffsetValLabel', 'showCropMarksToggle',
      'downloadSheetTiffBtn', 'downloadSheetPngBtn', 'printSheetDirectBtn',
      'downloadSingleTiffBtn', 'downloadSinglePngBtn', 'downloadSingleJpgBtn',
      'metricDocSize', 'metricPixels', 'metricSheetInfo', 'compareOriginalBtn',
      'workspaceStudio', 'workspacePrint', 'interactiveCropCanvas',
      'singleOutputCanvas', 'singleFileSizeEst', 'canvasModeBanner',
      'printSheetCanvas', 'sheetSummaryFooter', 'cameraModal', 'closeCameraModalBtn',
      'cameraVideoEl', 'switchCameraBtn', 'mirrorCameraBtn', 'capturePhotoBtn',
      'toastContainer'
    ];
    ids.forEach((id) => {
      dom[id] = document.getElementById(id);
    });
  }

  function preloadFormalSuitSVGs() {
    FORMAL_SUITS.forEach((suit) => {
      if (suit.id === 'none' || suit.isCustomPng) return;
      const img = new Image();
      const svgBlob = new Blob([suit.svg], { type: 'image/svg+xml;charset=utf-8' });
      img.src = URL.createObjectURL(svgBlob);
      suitImageCache[suit.id] = img;
    });
  }

  function buildSuitCatalogUI() {
    if (!dom.suitCatalogGrid) return;
    dom.suitCatalogGrid.innerHTML = '';

    const filtered = FORMAL_SUITS.filter((s) =>
      state.suitCategory === 'all' || s.id === 'none' || s.category === state.suitCategory
    );

    filtered.forEach((suit) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `suit-card ${suit.id === state.suitId ? 'active' : ''}`;
      btn.dataset.suitId = suit.id;

      const thumbHtml = suit.isCustomPng
        ? `<img src="${suit.pngUrl}" alt="${suit.name}" />`
        : suit.svg;

      btn.innerHTML = `
        <div class="suit-thumb">${thumbHtml}</div>
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
          showToast(`${suit.name} applied — Drag on photo to fit neck`);
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
      navigator.serviceWorker.register('./sw.js?v=5.0').then((reg) => reg.update()).catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // 5. LIVE WEBRTC CAMERA CAPTURE ENGINE (PC WEBCAM & MOBILE FRONT/REAR)
  // --------------------------------------------------------------------------
  async function startLiveCamera() {
    stopLiveCamera();
    try {
      const constraints = {
        audio: false,
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 1600 }
        }
      };
      activeCameraStream = await navigator.mediaDevices.getUserMedia(constraints);
      dom.cameraVideoEl.srcObject = activeCameraStream;
      dom.cameraVideoEl.classList.toggle('unmirrored', !cameraMirrored);
      dom.cameraModal.classList.remove('hidden');
    } catch (err) {
      showToast('Camera permission denied or no camera found on device.');
    }
  }

  function stopLiveCamera() {
    if (activeCameraStream) {
      activeCameraStream.getTracks().forEach((track) => track.stop());
      activeCameraStream = null;
    }
    if (dom.cameraVideoEl) {
      dom.cameraVideoEl.srcObject = null;
    }
  }

  function captureFrameFromLiveCamera() {
    const video = dom.cameraVideoEl;
    if (!video || !video.videoWidth) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const targetAspect = 35 / 45;

    let cropW = vw;
    let cropH = Math.round(vw / targetAspect);
    if (cropH > vh) {
      cropH = vh;
      cropW = Math.round(vh * targetAspect);
    }
    const sx = Math.round((vw - cropW) / 2);
    const sy = Math.round((vh - cropH) / 2);

    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = cropW;
    snapCanvas.height = cropH;
    const sCtx = snapCanvas.getContext('2d');

    if (cameraMirrored) {
      sCtx.translate(cropW, 0);
      sCtx.scale(-1, 1);
    }
    sCtx.drawImage(video, sx, sy, cropW, cropH, 0, 0, cropW, cropH);

    stopLiveCamera();
    dom.cameraModal.classList.add('hidden');

    const img = new Image();
    img.onload = () => {
      state.directReadyMode = false;
      dom.directReadyModeToggle.checked = false;
      loadNewSourceImage(img, '📸 Live Camera Portrait Captured!');
    };
    img.src = snapCanvas.toDataURL('image/png');
  }

  // --------------------------------------------------------------------------
  // 6. DUAL AI ENGINE: ISNet ONNX DEEP MATTING + MEDIAPIPE & CIE-LAB TRIMAP
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
            dom.deepAiProgressText.textContent = `AI Hair Matting (${key.split('/').pop()}): ${pct}%`;
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

      state.directReadyMode = false;
      dom.directReadyModeToggle.checked = false;
      state.bgMode = 'deep';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'deep');
      });

      dom.deepAiProgressFill.style.width = '100%';
      dom.deepAiProgressText.textContent = 'Deep AI Cutout Complete!';
      dom.bgEngineStatus.textContent = 'ISNet Deep AI Active';

      recomputeBackgroundCutout();
      renderAll();
      showToast('✨ Deep AI Hair-Strand Cutout Complete!');
    } catch (err) {
      dom.deepAiProgressText.textContent = 'Using Local Hybrid AI + LAB Matting';
      state.bgMode = 'hybrid';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'hybrid');
      });
      recomputeBackgroundCutout();
      renderAll();
      showToast('Using Fast Local Hybrid AI + LAB Engine');
    } finally {
      state.deepAiRunning = false;
      dom.runDeepAiBtn.disabled = false;
      setTimeout(() => {
        dom.deepAiProgressWrap.classList.add('hidden');
      }, 2600);
    }
  }

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

  // ==========================================================================
  // PART 2 OF 2:
  // - CIE-LAB Perceptual Matting & Direct Ready-Photo Bypass
  // - Custom Border Renderer, Realistic Suit Compositor & UPSC/SSC Slate
  // - Auto Zero-Waste Print Sheet Engine (with 4R 8-Photo Auto-Rotation)
  // - Lossless Uncompressed 24-Bit .TIFF Binary Encoder & All Event Listeners
  // ==========================================================================

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

    // If Direct Ready Photo Mode or 'Original' BG mode is active, preserve 100% of original image
    if (state.directReadyMode || state.bgMode === 'none') {
      outCtx.clearRect(0, 0, w, h);
      outCtx.drawImage(rawSourceCanvas, 0, 0);
      applyManualBrushToSubject(outCtx, w, h);
      return;
    }

    // If Ultra Deep AI (ISNet ONNX) was run and selected
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

  function loadNewSourceImage(imgElement, toastMsg, isDirectReady = false) {
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

    state.directReadyMode = Boolean(isDirectReady);
    dom.directReadyModeToggle.checked = state.directReadyMode;

    if (isDirectReady) {
      state.bgMode = 'none';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'none');
      });
      dom.bgEngineStatus.textContent = 'Direct Ready Mode';
    } else if (state.bgMode === 'none' || state.bgMode === 'deep') {
      state.bgMode = 'hybrid';
      dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.bgmode === 'hybrid');
      });
    }

    rawSourceCanvas.width = w;
    rawSourceCanvas.height = h;
    rawSourceCtx.clearRect(0, 0, w, h);
    rawSourceCtx.drawImage(imgElement, 0, 0, w, h);

    state.userBrushCanvas = document.createElement('canvas');
    state.userBrushCanvas.width = w;
    state.userBrushCanvas.height = h;

    autoSampleBorderWallColors();
    state.zoom = 1.0; state.panX = 0; state.panY = 0; state.rotationDeg = 0; state.quadrantRotations = 0; state.flipH = false;
    dom.cropZoomSlider.value = '1'; dom.zoomValLabel.textContent = '100%';
    dom.cropRotateSlider.value = '0'; dom.rotateValLabel.textContent = '0.0°';

    recomputeBackgroundCutout();
    if (!isDirectReady) {
      runMediaPipeOnCurrentSource();
    }
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
  // 9. SINGLE PHOTO & CUSTOM BORDER COMPOSITOR
  // --------------------------------------------------------------------------
  function renderAll() {
    renderSingleCroppedPassportCanvas();
    renderInteractiveStudioStage();
    renderPrintSheetCanvas();
    updateMetricsBarUI();
  }

  function updateMetricsBarUI() {
    const { widthPx, heightPx } = getTargetSinglePhotoPixels();
    const { widthMm, heightMm } = getTargetSinglePhotoMm();
    const paper = PAPER_SIZES_MM[state.paperKey];

    dom.outputPxReadout.textContent = `${widthPx} × ${heightPx} px`;
    dom.metricDocSize.textContent = `${widthMm.toFixed(1).replace(/\.0$/, '')}×${heightMm.toFixed(1).replace(/\.0$/, '')} mm`;
    dom.metricPixels.textContent = `${widthPx}×${heightPx} px @ ${state.dpi} DPI`;
    dom.metricSheetInfo.textContent = `${paper.name} (${state.copyCount} pcs)`;

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

    // 1. Draw Studio Backdrop Color or Radial Vignette
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

    // 2. Draw Portrait Subject
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

    // 3. Draw Realistic Formal Suit Overlay (if selected)
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

    // 4. Draw UPSC / SSC Name & Date Slate (if enabled)
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

    // 5. Draw Custom Studio Border & Optional Inner White Frame
    if (state.enablePhotoBorder && !state.compareHoldOriginal) {
      const dpiScale = state.dpi / 300;
      const bWidth = Math.max(1, Math.round(state.borderWidthPx * dpiScale));
      const insetPx = Math.max(0, Math.round(state.borderInsetPx * dpiScale));

      // Optional Inner White Studio Frame inside the outer cut line
      if (insetPx > 0) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = insetPx * 2;
        ctx.strokeRect(bWidth, bWidth, widthPx - bWidth * 2, heightPx - bWidth * 2);
      }

      // Outer Colored Cut Border
      ctx.strokeStyle = state.borderColor;
      ctx.lineWidth = bWidth;
      const halfB = bWidth / 2;
      ctx.strokeRect(halfB, halfB, widthPx - bWidth, heightPx - bWidth);
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
  // 10. AUTO ZERO-WASTE PRINT SHEET ENGINE (WITH 4R 8-PHOTO ROTATION)
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

    const { widthPx: rawTileW, heightPx: rawTileH } = getTargetSinglePhotoPixels();
    const gapPx = Math.round((state.gapMm / 25.4) * state.dpi);
    const marginPx = Math.round((state.marginMm / 25.4) * state.dpi);
    const topOffsetPx = Math.round((state.topOffsetMm / 25.4) * state.dpi);

    const availW = Math.max(rawTileW, sheetWpx - marginPx * 2);
    const availH = Math.max(rawTileH, sheetHpx - marginPx * 2 - topOffsetPx);

    // Normal upright grid capacity
    const colsUpright = Math.max(1, Math.floor((availW + gapPx) / (rawTileW + gapPx)));
    const rowsUpright = Math.max(1, Math.floor((availH + gapPx) / (rawTileH + gapPx)));
    const capUpright = colsUpright * rowsUpright;

    // Rotated 90° tile grid capacity (Crucial on 4R 101.6x152.4mm where rotated 45x35mm fits 2x4 = 8 copies instead of 6!)
    const colsRotated = Math.max(1, Math.floor((availW + gapPx) / (rawTileH + gapPx)));
    const rowsRotated = Math.max(1, Math.floor((availH + gapPx) / (rawTileW + gapPx)));
    const capRotated = colsRotated * rowsRotated;

    const useRotatedTiles = state.autoFit4R8 && state.paperKey === '4r' && capRotated > capUpright;

    const tileW = useRotatedTiles ? rawTileH : rawTileW;
    const tileH = useRotatedTiles ? rawTileW : rawTileH;
    const cols = useRotatedTiles ? colsRotated : colsUpright;
    const rows = useRotatedTiles ? rowsRotated : rowsUpright;
    const maxCapacity = cols * rows;

    state.computedSheetMetrics = { cols, rows, maxCapacity, rotatedTiles: useRotatedTiles };

    // Update slider max dynamically to match paper's true zero-waste capacity
    dom.copyCountSlider.max = String(maxCapacity);
    dom.copyCountNumber.max = String(maxCapacity);

    const actualCopies = Math.min(state.copyCount, maxCapacity);
    dom.sheetCapacityBadge.textContent = `${actualCopies} / ${maxCapacity} Max`;
    dom.gridFormulaLabel.textContent = `${cols} Cols × ${rows} Rows (${maxCapacity} Max)`;

    const usedCols = Math.min(cols, actualCopies);
    const totalRowW = usedCols * tileW + (usedCols - 1) * gapPx;

    const startX = state.sheetAlign === 'top-center'
      ? Math.max(marginPx, Math.round((sheetWpx - totalRowW) / 2))
      : marginPx;

    // Strictly Top-Header aligned so bottom of sheet is never wasted
    const startY = marginPx + topOffsetPx;

    let drawn = 0;
    let lastBottomY = startY;

    for (let r = 0; r < rows && drawn < actualCopies; r++) {
      for (let c = 0; c < cols && drawn < actualCopies; c++) {
        const x = startX + c * (tileW + gapPx);
        const y = startY + r * (tileH + gapPx);

        if (useRotatedTiles) {
          ctx.save();
          ctx.translate(x + tileW / 2, y + tileH / 2);
          ctx.rotate(-Math.PI / 2);
          ctx.drawImage(dom.singleOutputCanvas, -rawTileW / 2, -rawTileH / 2, rawTileW, rawTileH);
          ctx.restore();
        } else {
          ctx.drawImage(dom.singleOutputCanvas, x, y, tileW, tileH);
        }

        if (state.showCropMarks) {
          drawScissorCropMarks(ctx, x, y, tileW, tileH, Math.max(5, Math.round(state.dpi * 0.03)));
        }
        lastBottomY = Math.max(lastBottomY, y + tileH);
        drawn++;
      }
    }

    // Paper-Saver Cut Strip Guide Line
    const cutLineY = lastBottomY + Math.round((3.5 / 25.4) * state.dpi);
    if (state.showCropMarks && cutLineY < sheetHpx - 40) {
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.lineWidth = Math.max(1, Math.round(state.dpi / 300));
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(0, cutLineY);
      ctx.lineTo(sheetWpx, cutLineY);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = `500 ${Math.max(10, Math.round(state.dpi * 0.032))}px "JetBrains Mono", monospace`;
      const savedMm = Math.max(0, Math.round(sheetHmm - (cutLineY / state.dpi) * 25.4));
      ctx.fillText(`✂ CUT STRIP HERE — ${savedMm} mm of ${paper.name} remains reusable below`, marginPx + 6, cutLineY + Math.round(state.dpi * 0.045));
      ctx.restore();
    }

    dom.sheetSummaryFooter.textContent =
      `Zero-Waste Layout: ${cols} per row × ${Math.ceil(actualCopies / cols)} rows (${actualCopies} photos) at top of ${paper.name} (${sheetWpx}×${sheetHpx} px @ ${state.dpi} DPI).`;
  }

  function drawScissorCropMarks(ctx, x, y, w, h, tickLen) {
    ctx.save();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.72)';
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
  // 11. LOSSLESS UNCOMPRESSED 24-BIT .TIFF BINARY ENCODER
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
  // 12. EVENT LISTENERS (CAMERA, DIRECT PRINT, SUITS, BORDERS & ZERO-WASTE)
  // --------------------------------------------------------------------------
  function bindEventListeners() {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => switchWorkspace(btn.dataset.workspace));
    });

    dom.mobileToolTabs.querySelectorAll('.subtab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activateToolTab(btn.dataset.panel);
      });
    });

    // Live Camera Modal Listeners
    dom.openCameraModalBtn.addEventListener('click', () => startLiveCamera());
    dom.closeCameraModalBtn.addEventListener('click', () => {
      stopLiveCamera();
      dom.cameraModal.classList.add('hidden');
    });
    dom.switchCameraBtn.addEventListener('click', () => {
      cameraFacingMode = cameraFacingMode === 'user' ? 'environment' : 'user';
      cameraMirrored = cameraFacingMode === 'user';
      startLiveCamera();
    });
    dom.mirrorCameraBtn.addEventListener('click', () => {
      cameraMirrored = !cameraMirrored;
      dom.cameraVideoEl.classList.toggle('unmirrored', !cameraMirrored);
    });
    dom.capturePhotoBtn.addEventListener('click', () => captureFrameFromLiveCamera());

    // Standard Upload vs Direct Print (Ready Photo) Upload
    dom.loadSampleBtn.addEventListener('click', () => generateHighResStudioSamplePortrait());

    dom.photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          loadNewSourceImage(img, `Loaded ${file.name}`, false);
          switchWorkspace('studio');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    // 1-Click Direct Print Ready Photo Bypass
    dom.directPrintUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          loadNewSourceImage(img, `Ready Photo Loaded Directly to Print Sheet!`, true);
          activateToolTab('panel-sheet');
          switchWorkspace('print');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    dom.directReadyModeToggle.addEventListener('change', () => {
      state.directReadyMode = dom.directReadyModeToggle.checked;
      recomputeBackgroundCutout();
      renderAll();
      showToast(state.directReadyMode ? 'Direct Ready Mode ON (Original BG kept)' : 'AI Background Cutout Active');
    });

    // Deep AI & Cutout Controls
    dom.runDeepAiBtn.addEventListener('click', () => runUltraDeepAiCutout());

    dom.bgModeTabs.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.bgmode;
        state.directReadyMode = (mode === 'none');
        dom.directReadyModeToggle.checked = state.directReadyMode;
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
      state.directReadyMode = false;
      dom.directReadyModeToggle.checked = false;
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
      recomputeBackgroundCutout(); renderAll();
    });

    dom.aiConfidenceSlider.addEventListener('input', () => {
      state.aiConfidence = parseInt(dom.aiConfidenceSlider.value, 10);
      dom.aiConfidenceValLabel.textContent = `${state.aiConfidence}%`;
      recomputeBackgroundCutout(); renderAll();
    });

    dom.bgFeatherSlider.addEventListener('input', () => {
      state.featherPx = parseFloat(dom.bgFeatherSlider.value);
      dom.featherValLabel.textContent = `${state.featherPx.toFixed(1)} px`;
      recomputeBackgroundCutout(); renderAll();
    });

    dom.bgChokeSlider.addEventListener('input', () => {
      state.chokePx = parseInt(dom.bgChokeSlider.value, 10);
      dom.chokeValLabel.textContent = state.chokePx;
      recomputeBackgroundCutout(); renderAll();
    });

    dom.bgSpillSlider.addEventListener('input', () => {
      state.spillSuppression = parseInt(dom.bgSpillSlider.value, 10);
      dom.spillValLabel.textContent = `${state.spillSuppression}%`;
      recomputeBackgroundCutout(); renderAll();
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
        recomputeBackgroundCutout(); renderAll();
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
        if (state.bgMode === 'none' && !state.directReadyMode) {
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

    // Realistic Formal Suit Studio Listeners (Male / Female Filter + Custom PNG Upload)
    dom.suitCategoryTabs.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.suitCategoryTabs.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.suitCategory = btn.dataset.suitcat;
        buildSuitCatalogUI();
      });
    });

    dom.customSuitUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const customId = `custom_suit_${Date.now()}`;
          suitImageCache[customId] = img;
          FORMAL_SUITS.splice(1, 0, {
            id: customId,
            category: 'all',
            name: file.name.replace(/\.[^.]+$/, '').slice(0, 18),
            isCustomPng: true,
            pngUrl: ev.target.result
          });
          state.suitId = customId;
          buildSuitCatalogUI();
          dom.activeSuitBadge.textContent = 'Custom PNG Suit';
          renderAll();
          showToast('👔 Custom Transparent PNG Suit Added!');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

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

    // Custom Border Studio Controls
    dom.enablePhotoBorder.addEventListener('change', () => {
      state.enablePhotoBorder = dom.enablePhotoBorder.checked;
      dom.borderControlsWrap.classList.toggle('hidden', !state.enablePhotoBorder);
      renderAll();
    });

    document.querySelectorAll('.border-color-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.border-color-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        state.borderColor = chip.dataset.bcolor;
        dom.photoBorderColorPicker.value = state.borderColor;
        renderAll();
      });
    });

    dom.photoBorderColorPicker.addEventListener('input', () => {
      state.borderColor = dom.photoBorderColorPicker.value;
      document.querySelectorAll('.border-color-chip').forEach((c) => c.classList.remove('active'));
      renderAll();
    });

    dom.photoBorderWidthSlider.addEventListener('input', () => {
      state.borderWidthPx = parseInt(dom.photoBorderWidthSlider.value, 10);
      dom.borderWidthValLabel.textContent = `${state.borderWidthPx} px`;
      renderAll();
    });

    dom.photoBorderInsetSlider.addEventListener('input', () => {
      state.borderInsetPx = parseInt(dom.photoBorderInsetSlider.value, 10);
      dom.borderInsetValLabel.textContent = `${state.borderInsetPx} px`;
      renderAll();
    });

    // Retouch & Slate
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
      state.borderColor = '#0f172a';
      state.borderWidthPx = 3;
      state.borderInsetPx = 0;
      dom.photoBorderColorPicker.value = '#0f172a';
      dom.photoBorderWidthSlider.value = '3';
      dom.photoBorderInsetSlider.value = '0';
      dom.borderWidthValLabel.textContent = '3 px';
      dom.borderInsetValLabel.textContent = '0 px';
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

    dom.compareOriginalBtn.addEventListener('pointerdown', () => { state.compareHoldOriginal = true; renderAll(); });
    window.addEventListener('pointerup', () => { if (state.compareHoldOriginal) { state.compareHoldOriginal = false; renderAll(); } });

    // Zero-Waste Print Sheet Controls
    const setCopyCount = (n) => {
      const maxCap = state.computedSheetMetrics.maxCapacity || 60;
      const clamped = Math.max(1, Math.min(maxCap, n));
      state.copyCount = clamped;
      dom.copyCountSlider.value = String(clamped);
      dom.copyCountNumber.value = String(clamped);
      dom.copyCountValLabel.textContent = `${clamped} ${clamped === 1 ? 'Copy' : 'Copies'}`;
      renderAll();
    };

    dom.paperSizeSelect.addEventListener('change', () => {
      state.paperKey = dom.paperSizeSelect.value;
      renderPrintSheetCanvas();
      // Automatically set copyCount to 1 Full Row on A4 (6) or Full 4R Sheet (8) so zero waste happens
      const { cols, maxCapacity } = state.computedSheetMetrics;
      if (state.paperKey === '4r') {
        setCopyCount(maxCapacity);
      } else {
        setCopyCount(cols);
      }
    });

    dom.autoFit4R8Toggle.addEventListener('change', () => {
      state.autoFit4R8 = dom.autoFit4R8Toggle.checked;
      renderPrintSheetCanvas();
      if (state.paperKey === '4r') {
        setCopyCount(state.computedSheetMetrics.maxCapacity);
      }
    });

    dom.fillOneRowBtn.addEventListener('click', () => {
      setCopyCount(state.computedSheetMetrics.cols);
    });
    dom.fillTwoRowsBtn.addEventListener('click', () => {
      setCopyCount(state.computedSheetMetrics.cols * 2);
    });
    dom.fillHalfSheetBtn.addEventListener('click', () => {
      const { cols, rows } = state.computedSheetMetrics;
      setCopyCount(cols * Math.max(1, Math.floor(rows / 2)));
    });
    dom.fillMaxSheetBtn.addEventListener('click', () => {
      setCopyCount(state.computedSheetMetrics.maxCapacity);
      showToast(`Filled ${state.computedSheetMetrics.maxCapacity} copies for Zero Paper Waste!`);
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

    dom.copyCountSlider.addEventListener('input', () => setCopyCount(parseInt(dom.copyCountSlider.value, 10)));
    dom.copyCountNumber.addEventListener('input', () => setCopyCount(parseInt(dom.copyCountNumber.value, 10) || 1));

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

    // Exact 1:1 Millimeter Direct Shop Printer & Lossless .TIFF Exports
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
      const paper = PAPER_SIZES_MM[state.paperKey];
      const isLandscape = state.paperOrientation === 'landscape';
      const wMm = isLandscape ? paper.heightMm : paper.widthMm;
      const hMm = isLandscape ? paper.widthMm : paper.heightMm;

      const dataUrl = dom.printSheetCanvas.toDataURL('image/png');
      const win = window.open('', '_blank');
      if (!win) { showToast('Allow popups to use Direct Print'); return; }
      win.document.write(`<!DOCTYPE html><html><head><title>Print AuraID Exact Scale (${wMm}x${hMm}mm)</title>
        <style>
          @page { size: ${wMm}mm ${hMm}mm; margin: 0mm; }
          html, body { margin: 0; padding: 0; width: ${wMm}mm; height: ${hMm}mm; overflow: hidden; background: #fff; }
          img { width: ${wMm}mm; height: ${hMm}mm; display: block; }
        </style>
        </head><body onload="setTimeout(()=>{window.print();},250);"><img src="${dataUrl}"/></body></html>`);
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

  function activateToolTab(targetId) {
    state.activePanelId = targetId;
    dom.mobileToolTabs.querySelectorAll('.subtab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.panel === targetId);
    });
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
          state.directReadyMode = false;
          dom.directReadyModeToggle.checked = false;
          if (state.bgMode === 'deep' || state.bgMode === 'none') state.bgMode = 'hybrid';
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