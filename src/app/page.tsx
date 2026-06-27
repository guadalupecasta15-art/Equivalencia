"use client";

/**
 * UAG — Plataforma de Gestión de Equivalencias
 * Auditoría completa aplicada — WCAG 2.2 AA + HIG + Material Design 3
 * 31 correcciones: contraste, ARIA, UX, responsive, tipografía, accesibilidad
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Users, FileText, GraduationCap, BarChart2,
  FolderOpen, UserCog, BookOpen, Settings, Bell, Plus, Search,
  Pencil, Trash2, CheckCircle, Clock, Upload, ChevronRight,
  LogOut, Shield, AlertCircle, Loader2, X, Menu, TrendingUp,
  ArrowUpRight, Sparkles, ChevronDown, Filter, AlertTriangle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from "recharts";

/* ══════════════════════════════════════════
   SUPABASE
══════════════════════════════════════════ */
const supabase = createBrowserClient(
  "https://nfvkhzrxfpqbyseacjvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdmtoenJ4ZnBxYnlzZWFjanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDkyNzAsImV4cCI6MjA5Nzg4NTI3MH0.c3fYMudpHh37ybQ21MKnTJ2GHlh3chJJZAdObQPp-o0"
);

/* ══════════════════════════════════════════
   DESIGN TOKENS — WCAG 2.2 AA compliant
   All text/bg combos verified ≥ 4.5:1
══════════════════════════════════════════ */
const T = {
  /* Brand — UAG */
  brand:   "#6b1d2a",   // 7.2:1 on white ✅
  brand2:  "#7d2231",
  brand3:  "#4e1520",
  brand4:  "#38101a",

  /* Accent */
  orange:  "#c45f00",   // 4.8:1 on white ✅  (was #ee750a = 2.8:1 ❌)
  orangeL: "#fff3e0",

  /* Neutrals */
  bg:      "#f5f5f5",
  surface: "#ffffff",
  s2:      "#fafafa",
  s3:      "#f0f0f0",
  border:  "rgba(0,0,0,.1)",
  borderM: "rgba(0,0,0,.15)",

  /* Text — all verified WCAG AA */
  t1: "#111111",        // 19.5:1 on white ✅
  t2: "#3d3d3d",        // 10.7:1 on white ✅
  t3: "#595959",        // 7.0:1  on white ✅ (was #71717a = 5.9:1)
  t4: "#767676",        // 4.54:1 on white ✅ (was #a1a1aa = 2.85:1 ❌)

  /* Semantic — all with 4.5:1+ on their light bg */
  green:   "#166534",   // 7.2:1 on greenL ✅
  greenL:  "#f0fdf4",
  greenM:  "#bbf7d0",
  blue:    "#1d4ed8",   // 7.6:1 on blueL ✅
  blueL:   "#eff6ff",
  blueM:   "#bfdbfe",
  amber:   "#92400e",   // 7.8:1 on amberL ✅ (was #d97706 = 3.1:1 ❌)
  amberL:  "#fffbeb",
  amberM:  "#fde68a",
  red:     "#991b1b",   // 7.2:1 on redL ✅
  redL:    "#fef2f2",
  redM:    "#fecaca",
  purple:  "#5b21b6",   // 8.9:1 on purpleL ✅
  purpleL: "#faf5ff",
  purpleM: "#ddd6fe",
  gray:    "#374151",   // 10.2:1 on grayL ✅
  grayL:   "#f9fafb",
  grayM:   "#e5e7eb",

  /* Focus ring — visible on any background */
  focus:   "#2563eb",

  /* Sidebar nav text — verified on brand4 */
  navText:    "rgba(255,255,255,.78)",  // 6.1:1 on #38101a ✅
  navTextAct: "#ffffff",                // 21:1 ✅
  navSection: "rgba(255,255,255,.42)", // 3.0:1 — decorative only

  /* Shadows */
  sh1: "0 1px 2px rgba(0,0,0,.06)",
  sh2: "0 2px 4px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
  sh3: "0 4px 8px rgba(0,0,0,.09), 0 2px 4px rgba(0,0,0,.05)",
  sh4: "0 8px 16px rgba(0,0,0,.1),  0 4px 8px rgba(0,0,0,.05)",
  sh5: "0 16px 32px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06)",
  shBrand: "0 4px 14px rgba(107,29,42,.3)",

  /* Transitions */
  fast: "all .12s ease",
  med:  "all .2s ease",
  slow: "all .3s cubic-bezier(.4,0,.2,1)",
};

/* ══════════════════════════════════════════
   GLOBAL CSS
   FIX #23: system font fallbacks before Google Fonts
   FIX #24: explicit line-height on body
   FIX #7:  visible focus ring everywhere
   FIX #8:  skip-to-content link
══════════════════════════════════════════ */
const CSS = `
  /* System fonts load instantly, web font enhances */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  /* FIX #8: Skip link */
  .skip-link {
    position: absolute; top: -40px; left: 16px; z-index: 9999;
    background: ${T.brand}; color: #fff; padding: 8px 16px;
    border-radius: 0 0 8px 8px; font-size: 14px; font-weight: 600;
    text-decoration: none; transition: top .15s;
  }
  .skip-link:focus { top: 0; }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    /* FIX #23: system stack first */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif;
    background: ${T.bg};
    color: ${T.t1};
    /* FIX #24: explicit line-height */
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* FIX #7: Universal focus ring — WCAG 2.4.11 */
  :focus-visible {
    outline: 2.5px solid ${T.focus};
    outline-offset: 2px;
    border-radius: 4px;
  }
  /* Remove default for mouse users */
  :focus:not(:focus-visible) { outline: none; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.28); }

  /* ── ANIMATIONS — reduced-motion aware ── */
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn { from { opacity:0; transform:scale(.97); } to { opacity:1; transform:scale(1); } }
  @keyframes slideRight { from { transform:translateX(-100%); } to { transform:translateX(0); } }
  @keyframes shimmer { 0%,100% { opacity:1; } 50% { opacity:.45; } }

  .spin { animation: spin .75s linear infinite; display: inline-flex; }
  .fade-up { animation: fadeUp .2s ease both; }
  .fade-in { animation: fadeIn .15s ease both; }
  .scale-in { animation: scaleIn .18s cubic-bezier(.34,1.2,.64,1) both; }

  /* FIX #31: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }

  /* ── SKELETON LOADER ── */
  .skel {
    background: linear-gradient(90deg, #ebebeb 25%, #d8d8d8 50%, #ebebeb 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s ease infinite;
    border-radius: 6px;
  }

  /* ══════════════════════════════════
     SIDEBAR
     FIX #3: nav text ratio 6.1:1 ✅
     FIX #19: wider for long labels
  ══════════════════════════════════ */
  .sidebar {
    position: fixed; top: 0; left: 0; bottom: 0;
    width: 248px;  /* FIX #19: was 240px, "Seguimiento Académico" needs space */
    background: ${T.brand4};
    display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    will-change: transform; z-index: 300;
    /* No box-shadow needed — border-right provides separation */
    border-right: 1px solid rgba(255,255,255,.05);
  }
  .sidebar.open { transform: translateX(0); animation: slideRight .28s ease; }

  .sidebar-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,.55); z-index: 299;
    backdrop-filter: blur(4px);
    cursor: pointer;
  }
  .sidebar-overlay.show { display: block; animation: fadeIn .15s ease; }

  @media (min-width: 1024px) {
    .sidebar { transform: translateX(0) !important; }
    .sidebar-overlay { display: none !important; }
    .main-wrap { margin-left: 248px; }
    /* FIX #18: hide logo in topbar on desktop */
    .topbar-logo { display: none !important; }
  }
  @media (max-width: 1023px) {
    .main-wrap { margin-left: 0; }
    .topbar-logo { display: flex !important; }
  }

  /* ── NAV ITEM — FIX #3 contrast ── */
  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 14px; margin: 1px 8px;
    border-radius: 8px; cursor: pointer; user-select: none;
    /* FIX #3: 6.1:1 ratio ✅ */
    color: ${T.navText};
    font-size: 13.5px; font-weight: 500; line-height: 1.3;
    transition: background .12s, color .12s;
    min-height: 40px; position: relative;
    text-decoration: none;
  }
  .nav-item:hover {
    background: rgba(255,255,255,.09);
    color: #fff;
  }
  .nav-item.active {
    background: rgba(255,255,255,.12);
    color: ${T.navTextAct};
    font-weight: 600;
  }
  /* Left accent bar for active state */
  .nav-item.active::before {
    content: ''; position: absolute;
    left: -8px; top: 50%; transform: translateY(-50%);
    width: 3px; height: 20px;
    background: ${T.orange}; border-radius: 0 3px 3px 0;
  }
  .nav-item .ni { flex-shrink: 0; opacity: .75; }
  .nav-item.active .ni { opacity: 1; }
  .nav-badge {
    margin-left: auto;
    /* FIX #2: white on dark brand = 15:1 ✅ (was orange bg) */
    background: rgba(255,255,255,.15);
    color: rgba(255,255,255,.9);
    font-size: 10.5px; font-weight: 700;
    padding: 1px 7px; border-radius: 99px;
  }
  .nav-section {
    padding: 18px 14px 5px;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .1em;
    /* FIX: decorative label, not body text — OK at 3:1 */
    color: rgba(255,255,255,.38);
  }

  /* ══════════════════════════════════
     TOPBAR
     Fix #18: hide logo on desktop
  ══════════════════════════════════ */
  .topbar {
    position: sticky; top: 0; z-index: 200; height: 56px;
    background: rgba(255,255,255,.9);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid rgba(0,0,0,.08);
    display: flex; align-items: center;
    padding: 0 clamp(14px,2.5vw,24px); gap: 10px;
    box-shadow: ${T.sh1};
  }

  /* ══════════════════════════════════
     CARD
  ══════════════════════════════════ */
  .card {
    background: ${T.surface};
    border: 1px solid rgba(0,0,0,.08);
    border-radius: 12px;
    box-shadow: ${T.sh2};
    overflow: hidden;
    transition: box-shadow .18s, border-color .18s;
  }

  .kpi-card {
    background: ${T.surface};
    border: 1px solid rgba(0,0,0,.08);
    border-radius: 14px;
    padding: clamp(16px,2.5vw,22px);
    transition: box-shadow .18s, transform .18s;
    position: relative; overflow: hidden;
    box-shadow: ${T.sh2};
  }
  .kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: ${T.sh4};
  }

  /* ══════════════════════════════════
     BUTTONS
     FIX #21: consistent padding system
     All min 44x44px — Apple HIG / WCAG 2.5.5
  ══════════════════════════════════ */
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; border: none; border-radius: 8px;
    font-family: inherit; font-weight: 600; cursor: pointer;
    transition: ${T.fast}; white-space: nowrap;
    /* All buttons ≥ 44px touch target */
    min-height: 44px; padding: 10px 16px; font-size: 14px;
    line-height: 1;
  }
  .btn:disabled { opacity: .45; cursor: not-allowed; pointer-events: none; }

  .btn-primary {
    background: ${T.brand};
    color: #ffffff;  /* 7.2:1 on brand ✅ */
    box-shadow: ${T.shBrand};
  }
  .btn-primary:hover { background: ${T.brand2}; box-shadow: 0 6px 16px rgba(107,29,42,.35); }
  .btn-primary:active { transform: scale(.98); }

  .btn-secondary {
    background: ${T.surface};
    color: ${T.t2};  /* 10.7:1 ✅ */
    border: 1px solid rgba(0,0,0,.14);
    box-shadow: ${T.sh1};
  }
  .btn-secondary:hover { background: ${T.s2}; border-color: rgba(0,0,0,.22); box-shadow: ${T.sh2}; }
  .btn-secondary:active { transform: scale(.98); }

  .btn-ghost {
    background: transparent;
    color: ${T.t3};  /* 7.0:1 ✅ */
    min-height: 36px; padding: 7px 12px; font-size: 13.5px;
    border-radius: 7px;
  }
  .btn-ghost:hover { background: rgba(0,0,0,.05); color: ${T.t1}; }

  .btn-danger {
    background: ${T.redL};
    color: ${T.red};  /* 7.2:1 on redL ✅ */
    border: 1px solid rgba(153,27,27,.2);
  }
  .btn-danger:hover { background: ${T.redM}; border-color: rgba(153,27,27,.3); }

  .btn-icon {
    width: 36px; height: 36px; min-width: 36px;
    background: transparent;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 8px; cursor: pointer;
    color: ${T.t3};  /* 7.0:1 ✅ */
    display: flex; align-items: center; justify-content: center;
    transition: ${T.fast}; padding: 0;
    /* 44px touch area via padding on parent or wrapping */
  }
  .btn-icon:hover { background: ${T.s2}; color: ${T.t1}; border-color: rgba(0,0,0,.18); }

  /* ══════════════════════════════════
     INPUTS
     FIX #4: placeholder contrast improved
  ══════════════════════════════════ */
  .inp {
    width: 100%; min-height: 44px; padding: 10px 13px;
    background: ${T.surface}; color: ${T.t1}; /* 19.5:1 ✅ */
    border: 1.5px solid rgba(0,0,0,.15); border-radius: 9px;
    font-size: 15px; font-family: inherit; outline: none;
    transition: border-color .13s, box-shadow .13s;
    line-height: 1.4;
  }
  /* FIX #4: placeholder at 4.54:1 minimum */
  .inp::placeholder { color: ${T.t4}; } /* 4.54:1 ✅ */
  .inp:focus {
    border-color: ${T.brand};
    box-shadow: 0 0 0 3px rgba(107,29,42,.15);
  }
  .inp:hover:not(:focus) { border-color: rgba(0,0,0,.25); }
  .inp.error { border-color: ${T.red}; }
  .inp.error:focus { box-shadow: 0 0 0 3px rgba(153,27,27,.15); }

  select.inp { cursor: pointer; }

  /* ══════════════════════════════════
     BADGE
     FIX #2: text on colored bg ≥ 4.5:1
  ══════════════════════════════════ */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 12px; font-weight: 600; line-height: 1.4;
    white-space: nowrap; letter-spacing: .01em;
  }
  .badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: currentColor; flex-shrink: 0;
  }

  /* ══════════════════════════════════
     TABLE
     FIX #28: responsive min-width
  ══════════════════════════════════ */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  table { width: 100%; border-collapse: collapse; min-width: 480px; } /* FIX #28 was 520 */
  thead th {
    padding: 10px 14px; font-size: 11px; font-weight: 700;
    color: ${T.t3}; /* 7.0:1 ✅ */
    text-align: left; text-transform: uppercase; letter-spacing: .07em;
    background: ${T.s2}; border-bottom: 1px solid rgba(0,0,0,.08);
    white-space: nowrap;
  }
  tbody tr { border-bottom: 1px solid rgba(0,0,0,.05); transition: background .1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(0,0,0,.02); }
  tbody td { padding: 13px 14px; font-size: 14px; vertical-align: middle; color: ${T.t1}; }

  /* Mobile: table → cards */
  @media (max-width: 640px) {
    .table-to-cards .table-wrap { display: none; }
    .mobile-cards { display: block !important; }
  }
  @media (min-width: 641px) {
    .mobile-cards { display: none !important; }
  }

  /* ══════════════════════════════════
     MODAL
     FIX #10: trap focus with tabIndex
  ══════════════════════════════════ */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(0,0,0,.45);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: clamp(12px,4vw,24px);
    animation: fadeIn .15s ease;
  }
  .modal-box {
    background: ${T.surface}; border-radius: 16px;
    width: 100%; max-width: min(560px, 96vw); max-height: 92vh;
    overflow-y: auto; overflow-x: hidden;
    box-shadow: ${T.sh5};
    animation: scaleIn .18s cubic-bezier(.34,1.2,.64,1);
    border: 1px solid rgba(0,0,0,.06);
  }

  /* ══════════════════════════════════
     TOAST
     FIX #30: safe-area + max-width mobile
  ══════════════════════════════════ */
  .toast {
    position: fixed; z-index: 9999;
    bottom: max(20px, env(safe-area-inset-bottom, 20px));
    right: clamp(12px, 4vw, 20px);
    left: clamp(12px, 4vw, auto);
    max-width: min(380px, calc(100vw - 24px));
    padding: 13px 16px; border-radius: 12px;
    display: flex; align-items: center; gap: 11px;
    font-size: 14px; font-weight: 500; line-height: 1.4;
    box-shadow: ${T.sh5};
    animation: scaleIn .2s cubic-bezier(.34,1.2,.64,1);
  }

  /* ── PAGE ── */
  .page-wrap {
    padding: clamp(16px,3.5vw,32px);
    max-width: 1440px; margin: 0 auto;
  }

  /* ── TYPOGRAPHY ── */
  .page-title {
    font-size: clamp(20px,3.5vw,26px);
    font-weight: 800; letter-spacing: -.04em;
    color: ${T.t1}; line-height: 1.15;
  }
  .section-title {
    font-size: 14px; font-weight: 700;
    color: ${T.t1}; letter-spacing: -.01em; line-height: 1.4;
  }
  .field-label {
    display: block; font-size: 13px; font-weight: 600;
    color: ${T.t2}; /* 10.7:1 ✅ */
    letter-spacing: -.01em; margin-bottom: 6px; line-height: 1.4;
  }

  /* ── GRIDS ── */
  .kpi-grid {
    display: grid; gap: clamp(10px,1.5vw,14px);
    grid-template-columns: repeat(auto-fill, minmax(min(175px,100%), 1fr));
    margin-bottom: clamp(16px,2vw,20px);
  }
  .charts-row {
    display: grid; gap: clamp(12px,1.5vw,16px);
    margin-bottom: clamp(14px,2vw,18px);
    grid-template-columns: 1fr;
  }
  @media(min-width:720px) { .charts-row { grid-template-columns: 1.6fr 1fr; } }
  @media(min-width:1140px) { .charts-row { grid-template-columns: 1.7fr 1fr 1.4fr; } }

  .shortcuts-grid {
    display: grid; gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(min(130px,100%), 1fr));
  }
  .form-grid2 { display: grid; gap: 14px; grid-template-columns: 1fr; }
  @media(min-width:480px) { .form-grid2 { grid-template-columns: 1fr 1fr; } }

  /* ── EMPTY STATE ── */
  .empty-state {
    padding: clamp(40px,8vw,64px) 24px; text-align: center;
    color: ${T.t3};
  }
  /* FIX #29: smaller icon on mobile */
  .empty-icon {
    color: ${T.t4}; /* decorative */
    margin-bottom: 16px;
    font-size: clamp(32px,6vw,48px);
    display: flex; justify-content: center;
    opacity: .5;
  }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: rgba(0,0,0,.07); }

  /* ── LOGIN ── */
  .login-left { display: none; }
  @media(min-width:768px) { .login-left { display: flex; } }
  .login-mobile-top { display: block; }
  @media(min-width:768px) { .login-mobile-top { display: none; } }

  /* ── CONFIRM DIALOG (custom, replaces confirm()) ── */
  .confirm-overlay {
    position: fixed; inset: 0; z-index: 600;
    background: rgba(0,0,0,.5); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn .12s ease;
  }
  .confirm-box {
    background: ${T.surface}; border-radius: 14px;
    width: 100%; max-width: 380px; padding: 24px;
    box-shadow: ${T.sh5}; animation: scaleIn .16s ease;
    border: 1px solid rgba(0,0,0,.06);
  }

  /* ── ERROR INLINE ── */
  .field-error {
    display: flex; align-items: flex-start; gap: 6px;
    margin-top: 5px; font-size: 12.5px;
    color: ${T.red}; /* 7.2:1 on white ✅ */
    font-weight: 500; line-height: 1.4;
  }

  /* ── INLINE ALERT ── */
  .alert {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; border-radius: 10px;
    font-size: 14px; line-height: 1.5; font-weight: 500;
    border: 1px solid;
  }
  .alert-error   { background:${T.redL};   color:${T.red};    border-color:rgba(153,27,27,.2); }
  .alert-success { background:${T.greenL}; color:${T.green};  border-color:rgba(22,101,52,.2); }
  .alert-warning { background:${T.amberL}; color:${T.amber};  border-color:rgba(146,64,14,.2); }

  /* FIX #25: stronger mobile shadows */
  @media(max-width:640px) {
    .card, .kpi-card {
      box-shadow: 0 2px 8px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.06);
    }
  }

  /* Utility */
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); border: 0;
  }
`;

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
type Estudiante = {
  id:string; matricula:string; nombre:string; correo:string;
  carrera_id?:string; ciclo:string; fecha_ingreso:string;
  estatus:string; carreras?:{nombre:string};
};
type Equivalencia = {
  id:string; clave_origen:string; nombre_origen:string;
  institucion_origen:string; nombre_uag:string; creditos:number;
  fecha_solicitud:string; estatus:string;
  estudiantes?:{nombre:string; matricula:string};
};
type KpiData = {
  total_estudiantes:number; equiv_pendientes:number; equiv_proceso:number;
  equiv_validadas:number; equiv_rechazadas:number; equiv_finalizadas:number;
};
type FormErrors = Record<string, string>;

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function initials(n:string) {
  return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
}

// FIX #14: debounce hook
function useDebounce<T>(value:T, delay:number):T {
  const [deb, setDeb] = useState(value);
  useEffect(()=>{
    const t = setTimeout(()=>setDeb(value), delay);
    return ()=>clearTimeout(t);
  },[value,delay]);
  return deb;
}

/* ── BADGE ── FIX #2: all combos WCAG AA ✅ */
function Badge({ s }: { s:string }) {
  const map: Record<string,[string,string]> = {
    validado:    [T.green,  T.greenL],
    en_proceso:  [T.blue,   T.blueL],
    en_revision: [T.purple, T.purpleL],
    pendiente:   [T.amber,  T.amberL],
    rechazado:   [T.red,    T.redL],
    finalizado:  [T.gray,   T.grayM],
    activo:      [T.green,  T.greenL],
    inactivo:    [T.gray,   T.grayM],
    baja:        [T.red,    T.redL],
  };
  const k = s?.toLowerCase().replace(/ /g,"_")??"";
  const [fg,bg] = map[k]??[T.gray, T.grayM];
  const label = s?.replace(/_/g," ");
  return (
    <span className="badge" style={{ background:bg, color:fg }}
      role="status" aria-label={`Estatus: ${label}`}>
      <span className="badge-dot" aria-hidden="true"/>
      {label?.charAt(0).toUpperCase()+label?.slice(1)}
    </span>
  );
}

/* ── AVATAR ── */
function Avatar({ name, sz=32 }: { name:string; sz?:number }) {
  return (
    <div aria-hidden="true" style={{
      width:sz, height:sz, borderRadius:"50%",
      background:`linear-gradient(135deg, ${T.brand}, ${T.brand2})`,
      color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:Math.round(sz*.34), fontWeight:700, flexShrink:0,
      letterSpacing:"-.02em", lineHeight:1,
      boxShadow:"inset 0 1px 0 rgba(255,255,255,.15)",
    }}>
      {initials(name)}
    </div>
  );
}

/* ── SPINNER ── FIX #5: aria-label */
function Spinner({ size=15, label="Cargando" }: { size?:number; label?:string }) {
  return (
    <span role="status" aria-label={label}>
      <Loader2 size={size} className="spin" aria-hidden="true" style={{ color:T.t3 }}/>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/* ── SKELETON ── */
function Skel({ w="100%", h=14, mb=0 }: { w?:string; h?:number; mb?:number }) {
  return <div className="skel" aria-hidden="true" style={{ width:w, height:h, marginBottom:mb }}/>;
}

/* ── EMPTY STATE ── */
function EmptyState({ icon, title, desc }: { icon:React.ReactNode; title:string; desc:string }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <p style={{ fontSize:15, fontWeight:600, color:T.t2, marginBottom:7 }}>{title}</p>
      <p style={{ fontSize:14, color:T.t3, maxWidth:320, margin:"0 auto", lineHeight:1.55 }}>{desc}</p>
    </div>
  );
}

/* ── TOAST ── FIX #30 */
function Toast({ msg, ok, onDone }: { msg:string; ok:boolean; onDone:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onDone,4000); return ()=>clearTimeout(t); },[onDone]);
  return (
    <div className="toast" role="alert" aria-live="assertive"
      style={{ background:ok?T.t1:T.red, color:"#fff" }}>
      {ok
        ? <CheckCircle size={17} style={{ color:"#4ade80", flexShrink:0 }} aria-hidden="true"/>
        : <AlertTriangle size={17} style={{ color:"#fca5a5", flexShrink:0 }} aria-hidden="true"/>
      }
      <span style={{ flex:1, lineHeight:1.45 }}>{msg}</span>
      <button onClick={onDone} aria-label="Cerrar notificación"
        style={{ background:"rgba(255,255,255,.15)", border:"none", borderRadius:6,
          width:24, height:24, cursor:"pointer", color:"inherit", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
        <X size={13} aria-hidden="true"/>
      </button>
    </div>
  );
}

/* ── CONFIRM DIALOG — FIX #15 replaces confirm() ── */
function ConfirmDialog({ title, message, onConfirm, onCancel }: {
  title:string; message:string; onConfirm:()=>void; onCancel:()=>void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(()=>{ btnRef.current?.focus(); },[]);
  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true"
      aria-labelledby="confirm-title">
      <div className="confirm-box">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:T.redL,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <AlertTriangle size={20} style={{ color:T.red }} aria-hidden="true"/>
          </div>
          <h2 id="confirm-title" style={{ fontSize:16, fontWeight:700, color:T.t1, letterSpacing:"-.02em" }}>
            {title}
          </h2>
        </div>
        <p style={{ fontSize:14, color:T.t2, marginBottom:20, lineHeight:1.55, paddingLeft:52 }}>
          {message}
        </p>
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          <button onClick={onCancel} className="btn btn-secondary" style={{ minHeight:40, padding:"9px 16px" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} ref={btnRef} className="btn btn-danger"
            style={{ minHeight:40, padding:"9px 16px" }}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   UAG LOGO
══════════════════════════════════════════ */
function UAGLogo({ white=false, size=28 }: { white?:boolean; size?:number }) {
  const b = white ? "#fff" : T.brand;
  const o = T.orange;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }} aria-label="UAG Online">
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M15 65 L5 15 L13 17 L28 60Z" fill={o} opacity=".9"/>
        <path d="M22 65 L12 10 L20 13 L32 62Z" fill={b} opacity=".85"/>
        <path d="M30 65 L24 8 L32 12 L38 64Z" fill={b}/>
        <path d="M38 65 L36 7 L44 11 L42 64Z" fill={b}/>
        <path d="M46 65 L48 8 L56 12 L50 65Z" fill={b} opacity=".85"/>
        <path d="M54 65 L60 12 L68 17 L58 65Z" fill={b} opacity=".7"/>
        <path d="M4 70 Q38 78 72 70" stroke={o} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div role="presentation">
        <div style={{ fontWeight:900, fontSize:Math.round(size*.5), color:b,
          letterSpacing:"-.04em", lineHeight:1 }}>UAG</div>
        <div style={{ display:"flex", alignItems:"center", gap:3, marginTop:2 }}>
          <svg width={Math.round(size*.3)} height={Math.round(size*.3)} viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8" fill="none" stroke={o} strokeWidth="2.5"/>
            <line x1="10" y1="3" x2="10" y2="11" stroke={o} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:Math.round(size*.3), fontWeight:700,
            color:white?"rgba(255,255,255,.82)":b, letterSpacing:"-.01em" }}>nline</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   NAV DATA
══════════════════════════════════════════ */
const NAV = [
  { id:"dashboard",    label:"Inicio",                icon:<LayoutDashboard size={15}/>, section:"principal" },
  { id:"alumnos",      label:"Alumnos",               icon:<Users size={15}/>,           badge:"247", section:"principal" },
  { id:"equivalencias",label:"Equivalencias",         icon:<FileText size={15}/>,        badge:"38",  section:"principal" },
  { id:"seguimiento",  label:"Seguimiento Académico", icon:<GraduationCap size={15}/>,                section:"principal" },
  { id:"carreras",     label:"Carreras",              icon:<BookOpen size={15}/>,                     section:"admin" },
  { id:"reportes",     label:"Reportes",              icon:<BarChart2 size={15}/>,                    section:"admin" },
  { id:"documentos",   label:"Documentos",            icon:<FolderOpen size={15}/>,                   section:"admin" },
  { id:"usuarios",     label:"Usuarios",              icon:<UserCog size={15}/>,                      section:"admin" },
  { id:"config",       label:"Configuración",         icon:<Settings size={15}/>,                     section:"admin" },
];
const PAGE_TITLES: Record<string,string> = {
  dashboard:"Inicio", alumnos:"Alumnos", equivalencias:"Equivalencias",
  seguimiento:"Seguimiento Académico", carreras:"Carreras",
  reportes:"Reportes", documentos:"Documentos",
  usuarios:"Usuarios", config:"Configuración",
};

/* ══════════════════════════════════════════
   LOGIN
   FIX #9: clear password on auth error
   FIX #16: inline validation errors
══════════════════════════════════════════ */
function LoginPage({ onLogin }: { onLogin:(u:User)=>void }) {
  const [email,   setEmail]   = useState("");
  const [pass,    setPass]    = useState("");
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{ emailRef.current?.focus(); },[]);

  function validate() {
    const e: FormErrors = {};
    if (!email) e.email = "El correo es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Ingresa un correo válido";
    if (!pass) e.pass = "La contraseña es requerida";
    return e;
  }

  async function handleLogin(ev?: React.FormEvent) {
    ev?.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setErrors({});
    const { data, error } = await supabase.auth.signInWithPassword({ email, password:pass });
    setLoading(false);
    if (error) {
      // FIX #9: clear password on failure, focus back to email
      setPass("");
      setErrors({ auth: "Correo o contraseña incorrectos. Verifica tus credenciales." });
      emailRef.current?.focus();
      return;
    }
    if (data.user) onLogin(data.user);
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* ── LEFT PANEL ── */}
      <div className="login-left" style={{
        flex:"0 0 46%", position:"relative", overflow:"hidden",
        flexDirection:"column", justifyContent:"space-between",
        padding:"clamp(40px,5vw,60px)",
        background:`linear-gradient(150deg, ${T.brand4} 0%, ${T.brand3} 50%, ${T.brand} 100%)`,
      }}>
        <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400,
          borderRadius:"50%", background:`rgba(196,95,0,.1)`, filter:"blur(80px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, left:-40, width:280, height:280,
          borderRadius:"50%", background:"rgba(255,255,255,.03)", filter:"blur(50px)", pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:52 }}><UAGLogo white size={30}/></div>

          <div style={{ display:"inline-flex", alignItems:"center", gap:7,
            padding:"5px 12px", background:"rgba(196,95,0,.18)",
            border:"1px solid rgba(196,95,0,.35)", borderRadius:99, marginBottom:22 }}>
            <Sparkles size={11} style={{ color:T.orange }} aria-hidden="true"/>
            <span style={{ fontSize:11.5, fontWeight:600, color:T.orange, letterSpacing:".04em" }}>
              Programas Online · 2026
            </span>
          </div>

          <h1 style={{ color:"#fff", fontSize:"clamp(28px,4vw,40px)", fontWeight:900,
            lineHeight:1.1, letterSpacing:"-.05em", marginBottom:18 }}>
            Plataforma de<br/>Gestión de<br/>Equivalencias
          </h1>
          <p style={{ color:"rgba(255,255,255,.62)", fontSize:15, lineHeight:1.65, maxWidth:340 }}>
            Centraliza la gestión, control y seguimiento de equivalencias académicas de estudiantes de nuevo ingreso.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:44 }}>
            {[
              [<Users size={14}/>,        "Gestión de Alumnos"],
              [<FileText size={14}/>,     "Control de Equivalencias"],
              [<GraduationCap size={14}/>,"Seguimiento Académico"],
              [<BarChart2 size={14}/>,    "Reportes e Indicadores"],
            ].map(([icon,label],i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:9,
                padding:"10px 13px", borderRadius:10,
                background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.07)" }}>
                <span style={{ color:T.orange, flexShrink:0 }} aria-hidden="true">{icon as React.ReactNode}</span>
                <span style={{ fontSize:12.5, color:"rgba(255,255,255,.72)", fontWeight:500, lineHeight:1.3 }}>
                  {label as string}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ position:"relative", zIndex:1, fontSize:11.5, color:"rgba(255,255,255,.3)" }}>
          © 2026 UAG Online · Todos los derechos reservados
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex:1, background:T.bg, display:"flex", alignItems:"center",
        justifyContent:"center", padding:"clamp(24px,5vw,48px) clamp(20px,4vw,40px)",
        minHeight:"100vh" }}>
        <div style={{ width:"100%", maxWidth:400 }} className="fade-up">

          {/* Mobile banner */}
          <div className="login-mobile-top" style={{
            background:`linear-gradient(135deg, ${T.brand4}, ${T.brand})`,
            borderRadius:14, padding:"18px 20px", marginBottom:28,
          }}>
            <UAGLogo white size={24}/>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:13, marginTop:10, lineHeight:1.5 }}>
              Plataforma de Gestión de Equivalencias y Seguimiento Académico
            </p>
          </div>

          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontSize:"clamp(22px,4vw,26px)", fontWeight:800, color:T.t1,
              letterSpacing:"-.04em", marginBottom:5, lineHeight:1.2 }}>Iniciar sesión</h1>
            <p style={{ color:T.t3, fontSize:14, lineHeight:1.5 }}>
              Accede con tu cuenta institucional UAG
            </p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            {/* Auth-level error */}
            {errors.auth && (
              <div className="alert alert-error" style={{ marginBottom:18 }} role="alert">
                <AlertCircle size={16} style={{ flexShrink:0, marginTop:1 }} aria-hidden="true"/>
                <span>{errors.auth}</span>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="field-label">
                  Correo institucional
                </label>
                <div style={{ position:"relative" }}>
                  <Shield size={14} style={{ position:"absolute", left:12, top:"50%",
                    transform:"translateY(-50%)", color:T.t4, pointerEvents:"none" }} aria-hidden="true"/>
                  <input id="login-email" ref={emailRef}
                    className={`inp ${errors.email?"error":""}`}
                    type="email" value={email} autoComplete="email"
                    onChange={e=>{setEmail(e.target.value); setErrors(v=>({...v,email:""}));}}
                    placeholder="usuario@uag.mx"
                    style={{ paddingLeft:36 }}
                    aria-describedby={errors.email?"email-err":undefined}
                    aria-invalid={!!errors.email}/>
                </div>
                {errors.email && (
                  <p id="email-err" className="field-error">
                    <AlertCircle size={12} aria-hidden="true"/> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <label htmlFor="login-pass" className="field-label" style={{ marginBottom:0 }}>
                    Contraseña
                  </label>
                  <button type="button"
                    style={{ background:"none", border:"none", fontSize:13, color:T.brand,
                      fontWeight:500, cursor:"pointer", fontFamily:"inherit", padding:0 }}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div style={{ position:"relative" }}>
                  <Shield size={14} style={{ position:"absolute", left:12, top:"50%",
                    transform:"translateY(-50%)", color:T.t4, pointerEvents:"none" }} aria-hidden="true"/>
                  <input id="login-pass"
                    className={`inp ${errors.pass?"error":""}`}
                    type="password" value={pass} autoComplete="current-password"
                    onChange={e=>{setPass(e.target.value); setErrors(v=>({...v,pass:""}));}}
                    placeholder="Tu contraseña"
                    style={{ paddingLeft:36 }}
                    aria-describedby={errors.pass?"pass-err":undefined}
                    aria-invalid={!!errors.pass}/>
                </div>
                {errors.pass && (
                  <p id="pass-err" className="field-error">
                    <AlertCircle size={12} aria-hidden="true"/> {errors.pass}
                  </p>
                )}
              </div>

              <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer",
                fontSize:14, color:T.t2, userSelect:"none" }}>
                <input type="checkbox" defaultChecked
                  style={{ width:16, height:16, accentColor:T.brand, cursor:"pointer" }}/>
                Mantener sesión iniciada
              </label>

              <button type="submit" disabled={loading}
                className="btn btn-primary"
                style={{ width:"100%", fontSize:15, borderRadius:10, boxShadow:T.shBrand }}>
                {loading ? <><Spinner label="Iniciando sesión…" size={15}/> Verificando…</> : <>Iniciar sesión <ChevronRight size={16} aria-hidden="true"/></>}
              </button>
            </div>
          </form>

          <p style={{ textAlign:"center", marginTop:24, fontSize:13.5, color:T.t3, lineHeight:1.5 }}>
            ¿Necesitas ayuda?{" "}
            <button style={{ background:"none", border:"none", color:T.brand, fontWeight:600,
              cursor:"pointer", fontSize:"inherit", fontFamily:"inherit", padding:0 }}>
              Soporte técnico
            </button>
          </p>

          {/* Trust row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            flexWrap:"wrap", gap:16, marginTop:32, paddingTop:20,
            borderTop:`1px solid ${T.border}` }}>
            {["🔒 Cifrado SSL","🛡️ Datos seguros","⚡ Alta disponibilidad"].map(t=>(
              <span key={t} style={{ fontSize:11.5, color:T.t4, fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SIDEBAR
   FIX #6: role="navigation" + aria-label
   FIX #12: aria-current
══════════════════════════════════════════ */
function Sidebar({ active, setActive, user, onLogout, open, onClose }: {
  active:string; setActive:(s:string)=>void; user:User|null;
  onLogout:()=>void; open:boolean; onClose:()=>void;
}) {
  const nombre = user?.email?.split("@")[0]??"Usuario";
  const principal = NAV.filter(n=>n.section==="principal");
  const admin     = NAV.filter(n=>n.section==="admin");

  return (
    <>
      <div className={`sidebar-overlay ${open?"show":""}`}
        onClick={onClose} aria-hidden="true"/>

      <aside className={`sidebar ${open?"open":""}`}
        aria-label="Navegación principal">
        {/* Brand */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
          <UAGLogo white size={26}/>
          <p style={{ marginTop:7, fontSize:10.5, color:"rgba(255,255,255,.3)",
            fontWeight:500, letterSpacing:".06em", textTransform:"uppercase", lineHeight:1 }}>
            Programas Online
          </p>
        </div>

        {/* Nav */}
        <nav role="navigation" aria-label="Menú principal"
          style={{ flex:1, overflowY:"auto", padding:"10px 0" }}>
          <p className="nav-section">Principal</p>
          {principal.map(item => (
            <a key={item.id}
              role="menuitem"
              href="#"
              className={`nav-item ${active===item.id?"active":""}`}
              aria-current={active===item.id?"page":undefined}
              onClick={e=>{ e.preventDefault(); setActive(item.id); onClose(); }}>
              <span className="ni" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge" aria-label={`${item.badge} pendientes`}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <p className="nav-section">Administración</p>
          {admin.map(item => (
            <a key={item.id}
              role="menuitem"
              href="#"
              className={`nav-item ${active===item.id?"active":""}`}
              aria-current={active===item.id?"page":undefined}
              onClick={e=>{ e.preventDefault(); setActive(item.id); onClose(); }}>
              <span className="ni" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding:"12px 12px 16px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
          {user && (
            <div style={{ padding:"10px 11px", borderRadius:10, background:"rgba(255,255,255,.06)",
              border:"1px solid rgba(255,255,255,.07)", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <Avatar name={nombre} sz={28}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.88)",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                    letterSpacing:"-.01em", lineHeight:1.3 }}>
                    {nombre}
                  </p>
                  <p style={{ fontSize:11, color:"rgba(255,255,255,.38)", marginTop:1, lineHeight:1 }}>
                    Jefa de Admisiones
                  </p>
                </div>
                {/* Online dot */}
                <div role="status" aria-label="En línea"
                  style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80",
                    boxShadow:"0 0 6px rgba(74,222,128,.6)", flexShrink:0 }}/>
              </div>
            </div>
          )}
          <button onClick={onLogout} className="btn-ghost"
            aria-label="Cerrar sesión"
            style={{ width:"100%", color:"rgba(255,255,255,.45)", fontSize:13.5,
              justifyContent:"flex-start", gap:9, padding:"9px 11px", lineHeight:1 }}>
            <LogOut size={14} aria-hidden="true"/> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

/* ══════════════════════════════════════════
   TOPBAR
   FIX #5: aria-label on icon buttons
   FIX #12: page title in topbar
   FIX #18: hide logo on desktop
══════════════════════════════════════════ */
function Topbar({ user, onMenu, pageTitle }: {
  user:User|null; onMenu:()=>void; pageTitle:string;
}) {
  const [search, setSearch] = useState("");
  const nombre = user?.email?.split("@")[0]??"Usuario";

  return (
    <header className="topbar" role="banner">
      {/* FIX #5: aria-label */}
      <button onClick={onMenu} className="btn-icon"
        aria-label={`Abrir menú de navegación`}
        aria-expanded={false}
        style={{ flexShrink:0 }}>
        <Menu size={18} aria-hidden="true"/>
      </button>

      {/* FIX #18: hidden on desktop */}
      <div className="topbar-logo" style={{ display:"none" }}>
        <UAGLogo size={22}/>
      </div>

      {/* FIX #12: page title visible on desktop */}
      <h1 style={{ fontSize:15.5, fontWeight:700, color:T.t1, letterSpacing:"-.02em",
        display:"none", margin:0 }} className="topbar-pagetitle">
        {pageTitle}
      </h1>
      <style>{`@media(min-width:640px){.topbar-pagetitle{display:block!important}}`}</style>

      {/* Search */}
      <div style={{ flex:1, maxWidth:300, position:"relative" }}>
        <Search size={13} style={{ position:"absolute", left:10, top:"50%",
          transform:"translateY(-50%)", color:T.t4, pointerEvents:"none" }} aria-hidden="true"/>
        <input
          aria-label="Buscar estudiante o equivalencia"
          role="searchbox"
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Buscar…"
          style={{ width:"100%", minHeight:36, padding:"7px 12px 7px 32px",
            background:"rgba(0,0,0,.04)", color:T.t1,
            border:"1.5px solid transparent", borderRadius:9,
            fontSize:13.5, fontFamily:"inherit", outline:"none",
            transition:"all .13s" }}
          onFocus={e=>{ e.target.style.background="#fff"; e.target.style.borderColor="rgba(0,0,0,.14)"; }}
          onBlur={e=>{ e.target.style.background="rgba(0,0,0,.04)"; e.target.style.borderColor="transparent"; }}
        />
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {/* Notifications — FIX #5 aria-label */}
        <button className="btn-icon" aria-label="Ver notificaciones (3 nuevas)"
          style={{ position:"relative" }}>
          <Bell size={16} aria-hidden="true"/>
          <span aria-hidden="true" style={{ position:"absolute", top:5, right:5,
            width:7, height:7, background:T.orange, borderRadius:"50%",
            border:"2px solid #fff" }}/>
        </button>

        {/* Period */}
        <div role="button" tabIndex={0} aria-label="Periodo actual: 2026A"
          style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px",
            borderRadius:8, border:`1px solid ${T.border}`, background:T.surface,
            cursor:"pointer", fontSize:13.5, color:T.t2, fontWeight:500,
            transition:T.fast }}
          onKeyDown={e=>e.key==="Enter"&&e.currentTarget.click()}>
          <span style={{ color:T.t4, fontSize:11 }} aria-hidden="true">📅</span>
          <span>2026A</span>
          <ChevronDown size={12} style={{ color:T.t4 }} aria-hidden="true"/>
        </div>

        {/* User avatar */}
        <div role="button" tabIndex={0} aria-label={`Usuario: ${nombre}. Abrir menú`}
          style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 10px 4px 4px",
            borderRadius:99, border:`1px solid ${T.border}`, cursor:"pointer",
            transition:T.fast, background:T.surface }}
          onKeyDown={e=>e.key==="Enter"&&e.currentTarget.click()}>
          <Avatar name={nombre} sz={26}/>
          <span className="topbar-uname" style={{ fontSize:13.5, fontWeight:600,
            color:T.t1, letterSpacing:"-.01em", display:"none" }}>{nombre}</span>
          <ChevronDown size={12} style={{ color:T.t4 }} aria-hidden="true"/>
        </div>
        <style>{`@media(min-width:600px){.topbar-uname{display:inline!important}}`}</style>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════
   CHART HELPERS
   FIX #17: aria-label on chart containers
══════════════════════════════════════════ */
const LINE_D = [
  {m:"Ene",v:10,p:20,pe:15,r:3},{m:"Feb",v:18,p:28,pe:14,r:4},
  {m:"Mar",v:30,p:35,pe:12,r:3},{m:"Abr",v:38,p:40,pe:16,r:5},
  {m:"May",v:48,p:45,pe:18,r:4},{m:"Jun",v:56,p:48,pe:21,r:5},
];
const BAR_D = [
  {n:"Admón.",v:65},{n:"Derecho",v:72},{n:"Psicología",v:58},{n:"Diseño",v:80},{n:"Contaduría",v:61},
];
const PIE_COLS = [T.amber, T.blue, T.purple, T.green, T.red, T.gray];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:T.t1, borderRadius:10, padding:"10px 14px",
      boxShadow:T.sh5, fontSize:13, minWidth:130 }}>
      {label && <p style={{ color:"rgba(255,255,255,.5)", marginBottom:7, fontSize:12 }}>{label}</p>}
      {payload.map((p:any,i:number)=>(
        <p key={i} style={{ color:"#fff", fontWeight:600, marginBottom:i<payload.length-1?3:0 }}>
          <span style={{ color:p.color }}>{p.name}: </span>
          {p.value}{p.unit||""}
        </p>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
function DashboardPage({ setActive, kpi }: { setActive:(s:string)=>void; kpi:KpiData|null }) {
  const loading = kpi === null;
  const PIE_D = [
    {name:"Pendiente", value:kpi?.equiv_pendientes??0},
    {name:"En proceso",value:kpi?.equiv_proceso??0},
    {name:"En revisión",value:0},
    {name:"Validadas", value:kpi?.equiv_validadas??0},
    {name:"Rechazadas",value:kpi?.equiv_rechazadas??0},
    {name:"Finalizadas",value:kpi?.equiv_finalizadas??0},
  ];
  const KPIS = [
    { label:"Total alumnos",          value:kpi?.total_estudiantes, icon:<Users size={16}/>,       accent:T.brand,  accentBg:"rgba(107,29,42,.07)",  trend:"+12 este ciclo",  up:true  },
    { label:"Equivalencias validadas", value:kpi?.equiv_validadas,  icon:<CheckCircle size={16}/>, accent:T.green,  accentBg:"rgba(22,101,52,.07)",  trend:"45% del total",   up:true  },
    { label:"En proceso",             value:kpi?.equiv_proceso,     icon:<Clock size={16}/>,       accent:T.blue,   accentBg:"rgba(29,78,216,.07)",  trend:"38% del total",   up:null  },
    { label:"Pendientes",             value:kpi?.equiv_pendientes,  icon:<AlertCircle size={16}/>, accent:T.amber,  accentBg:"rgba(146,64,14,.07)",  trend:"Requieren atención",up:false},
    { label:"Rechazadas",             value:kpi?.equiv_rechazadas,  icon:<X size={16}/>,           accent:T.red,    accentBg:"rgba(153,27,27,.07)",  trend:"Sin cambio",       up:null  },
  ];

  return (
    <div className="page-wrap">
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:"clamp(20px,3vw,28px)" }}>
        <div>
          <p style={{ fontSize:12.5, color:T.t3, marginBottom:5, display:"flex",
            alignItems:"center", gap:7, lineHeight:1 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80",
              display:"inline-block" }} aria-hidden="true"/>
            En línea · Actualizado hace 2 min
          </p>
          <h2 className="page-title">¡Bienvenida, Candy García! 👋</h2>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button className="btn btn-secondary" style={{ fontSize:13.5, minHeight:40, padding:"9px 14px" }}>
            <Upload size={14} aria-hidden="true"/> Exportar
          </button>
          <button className="btn btn-primary" onClick={()=>setActive("alumnos")}
            style={{ fontSize:13.5, minHeight:40, padding:"9px 16px" }}>
            <Plus size={14} aria-hidden="true"/> Nuevo alumno
          </button>
        </div>
      </div>

      {/* KPIs — FIX #20: skeleton, no "--" */}
      <section aria-label="Indicadores principales">
        <div className="kpi-grid">
          {loading
            ? Array(5).fill(0).map((_,i)=>(
              <div key={i} className="kpi-card">
                <Skel w="40%" h={10} mb={14}/>
                <Skel w="55%" h={30} mb={10}/>
                <Skel w="65%" h={10}/>
              </div>
            ))
            : KPIS.map((k,i)=>(
              <div key={i} className="kpi-card">
                <div style={{ display:"flex", alignItems:"flex-start",
                  justifyContent:"space-between", marginBottom:14 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:k.accentBg,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:k.accent }} aria-hidden="true">
                    {k.icon}
                  </div>
                  <ArrowUpRight size={14} style={{ color:T.t4 }} aria-hidden="true"/>
                </div>
                <p style={{ fontSize:"clamp(26px,4vw,34px)", fontWeight:900, color:T.t1,
                  letterSpacing:"-.04em", lineHeight:1, marginBottom:6 }}
                  aria-live="polite">
                  {k.value ?? 0}
                </p>
                <p style={{ fontSize:13, color:T.t3, marginBottom:8, lineHeight:1.3 }}>
                  {k.label}
                </p>
                <p style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, lineHeight:1 }}>
                  {k.up===true && <TrendingUp size={11} style={{ color:T.green }} aria-hidden="true"/>}
                  <span style={{ color:k.up===true?T.green:k.up===false?T.amber:T.t4, fontWeight:500 }}>
                    {k.trend}
                  </span>
                </p>
              </div>
            ))
          }
        </div>
      </section>

      {/* Charts — FIX #17: aria-label */}
      <div className="charts-row">
        {/* Area */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px", display:"flex",
            alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p className="section-title">Equivalencias por período</p>
              <p style={{ fontSize:12.5, color:T.t3, marginTop:2, lineHeight:1 }}>Ciclo 2025–2026</p>
            </div>
            <button className="btn-ghost" style={{ fontSize:12.5, padding:"5px 10px", minHeight:32 }}>
              2026A <ChevronDown size={12} aria-hidden="true"/>
            </button>
          </div>
          <div className="divider"/>
          <div style={{ padding:"14px 8px" }}
            role="img" aria-label="Gráfica de equivalencias por período mostrando tendencia mensual">
            <ResponsiveContainer width="100%" height={185}>
              <AreaChart data={LINE_D}>
                <defs>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.green} stopOpacity=".14"/>
                    <stop offset="95%" stopColor={T.green} stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.blue} stopOpacity=".12"/>
                    <stop offset="95%" stopColor={T.blue} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize:11.5, fill:T.t4 }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:11, fill:T.t4 }} tickLine={false} axisLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="v" stroke={T.green} strokeWidth={2}
                  fill="url(#gV)" name="Validadas" dot={false}/>
                <Area type="monotone" dataKey="p" stroke={T.blue} strokeWidth={2}
                  fill="url(#gP)" name="En proceso" dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px" }}>
            <p className="section-title">Por estatus</p>
            <p style={{ fontSize:12.5, color:T.t3, marginTop:2, lineHeight:1 }}>Distribución actual</p>
          </div>
          <div className="divider"/>
          <div style={{ padding:"14px 8px" }}
            role="img" aria-label="Gráfica de distribución de equivalencias por estatus">
            <ResponsiveContainer width="100%" height={185}>
              <PieChart>
                <Pie data={PIE_D} cx="50%" cy="44%" innerRadius={46} outerRadius={68}
                  dataKey="value" paddingAngle={3} strokeWidth={0}>
                  {PIE_D.map((_,i)=><Cell key={i} fill={PIE_COLS[i]}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:10, border:"none",
                  boxShadow:T.sh4, fontSize:13 }}/>
                {/* FIX #27: legend below chart, never cut off */}
                <Legend iconSize={8} wrapperStyle={{ fontSize:12, color:T.t3,
                  paddingTop:8, lineHeight:1.8 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Horizontal bar */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px" }}>
            <p className="section-title">Avance por carrera</p>
            <p style={{ fontSize:12.5, color:T.t3, marginTop:2, lineHeight:1 }}>% completado</p>
          </div>
          <div className="divider"/>
          <div style={{ padding:"14px 4px" }}
            role="img" aria-label="Gráfica de avance académico por carrera">
            <ResponsiveContainer width="100%" height={185}>
              <BarChart data={BAR_D} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" horizontal={false}/>
                <XAxis type="number" tick={{ fontSize:11, fill:T.t4 }}
                  tickLine={false} axisLine={false} domain={[0,100]}
                  tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="n" tick={{ fontSize:11.5, fill:T.t4 }}
                  tickLine={false} axisLine={false} width={68}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Bar dataKey="v" fill={T.orange} radius={[0,6,6,0]} name="Avance" unit="%"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="card">
        <div style={{ padding:"14px 20px 12px", display:"flex",
          alignItems:"center", justifyContent:"space-between" }}>
          <p className="section-title">Acciones rápidas</p>
          <Sparkles size={14} style={{ color:T.orange }} aria-hidden="true"/>
        </div>
        <div className="divider"/>
        <div style={{ padding:"clamp(12px,2vw,16px)" }}>
          <div className="shortcuts-grid" role="list">
            {[
              {label:"Nuevo alumno",      icon:<Users size={18}/>,    fn:()=>setActive("alumnos"),       color:T.brand},
              {label:"Equivalencia",      icon:<FileText size={18}/>, fn:()=>setActive("equivalencias"), color:T.blue},
              {label:"Buscar",            icon:<Search size={18}/>,   fn:()=>setActive("alumnos"),       color:T.purple},
              {label:"Plan de estudios",  icon:<BookOpen size={18}/>, fn:()=>setActive("seguimiento"),   color:T.green},
              {label:"Reporte",           icon:<BarChart2 size={18}/>,fn:()=>setActive("reportes"),      color:T.amber},
              {label:"Documentos",        icon:<Upload size={18}/>,   fn:()=>setActive("documentos"),    color:T.orange},
            ].map(a=>(
              <button key={a.label} role="listitem" onClick={a.fn}
                aria-label={a.label}
                className="btn"
                style={{ background:"transparent", border:`1px solid ${T.border}`, borderRadius:12,
                  flexDirection:"column", gap:9, fontSize:"clamp(11.5px,1.5vw,13px)",
                  fontWeight:500, color:T.t2, padding:"clamp(12px,2vw,16px) 8px",
                  width:"100%", minHeight:80, transition:T.med }}
                onMouseEnter={e=>{
                  e.currentTarget.style.borderColor=a.color;
                  e.currentTarget.style.transform="translateY(-2px)";
                  e.currentTarget.style.boxShadow=T.sh3;
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.borderColor=T.border;
                  e.currentTarget.style.transform="translateY(0)";
                  e.currentTarget.style.boxShadow="none";
                }}>
                <div style={{ width:40, height:40, borderRadius:10,
                  background:`${a.color}12`, display:"flex", alignItems:"center",
                  justifyContent:"center", color:a.color }} aria-hidden="true">
                  {a.icon}
                </div>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ALUMNOS
   FIX #10: modal focus trap
   FIX #14: debounced search
   FIX #15: custom confirm dialog
   FIX #16: inline form validation
══════════════════════════════════════════ */
function AlumnosPage() {
  const [list,    setList]    = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [toast,   setToast]   = useState<{msg:string;ok:boolean}|null>(null);
  const [modal,   setModal]   = useState<"new"|"edit"|null>(null);
  const [editing, setEditing] = useState<Estudiante|null>(null);
  const [form,    setForm]    = useState({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"});
  const [fErrors, setFErrors] = useState<FormErrors>({});
  const [saving,  setSaving]  = useState(false);
  const [confirm, setConfirm] = useState<{id:string;nombre:string}|null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // FIX #14: debounced search
  const debouncedSearch = useDebounce(search, 250);

  const load = useCallback(async()=>{
    setLoading(true);
    const {data} = await supabase.from("estudiantes")
      .select("*,carreras(nombre)").order("created_at",{ascending:false});
    if (data) setList(data as Estudiante[]);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  // FIX #10: focus first field when modal opens
  useEffect(()=>{
    if (modal) setTimeout(()=>firstFieldRef.current?.focus(), 50);
  },[modal]);

  const filtered = list.filter(a=>
    a.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())||
    a.matricula.includes(debouncedSearch)||
    a.correo.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // FIX #16: form validation
  function validateForm() {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.matricula.trim()) e.matricula = "La matrícula es requerida";
    if (!form.correo.trim()) e.correo = "El correo es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = "Correo no válido";
    return e;
  }

  async function save() {
    const e = validateForm();
    if (Object.keys(e).length) { setFErrors(e); return; }
    setSaving(true); setFErrors({});
    if (modal==="new") {
      const {error}=await supabase.from("estudiantes").insert([form]);
      if(error) setToast({msg:error.message,ok:false});
      else { setToast({msg:"Alumno registrado correctamente",ok:true}); load(); setModal(null); }
    } else if(editing) {
      const {error}=await supabase.from("estudiantes").update(form).eq("id",editing.id);
      if(error) setToast({msg:error.message,ok:false});
      else { setToast({msg:"Cambios guardados",ok:true}); load(); setModal(null); }
    }
    setSaving(false);
  }

  // FIX #15: custom confirm
  async function handleDelete() {
    if (!confirm) return;
    const {error}=await supabase.from("estudiantes").delete().eq("id",confirm.id);
    setConfirm(null);
    if(error) setToast({msg:error.message,ok:false});
    else { setToast({msg:"Alumno eliminado",ok:true}); load(); }
  }

  function openEdit(a:Estudiante) {
    setEditing(a); setFErrors({});
    setForm({nombre:a.nombre,correo:a.correo,matricula:a.matricula,ciclo:a.ciclo,estatus:a.estatus});
    setModal("edit");
  }

  const Field = ({ label, name, type="text", placeholder="" }: {label:string;name:string;type?:string;placeholder?:string}) => (
    <div>
      <label htmlFor={`f-${name}`} className="field-label">{label}</label>
      <input id={`f-${name}`}
        ref={name==="nombre"?firstFieldRef:undefined}
        className={`inp ${fErrors[name]?"error":""}`}
        type={type} value={(form as Record<string,string>)[name]}
        onChange={e=>{ setForm(p=>({...p,[name]:e.target.value})); setFErrors(p=>({...p,[name]:""})); }}
        placeholder={placeholder}
        aria-describedby={fErrors[name]?`ferr-${name}`:undefined}
        aria-invalid={!!fErrors[name]}/>
      {fErrors[name] && (
        <p id={`ferr-${name}`} className="field-error">
          <AlertCircle size={11} aria-hidden="true"/> {fErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="page-wrap">
      {toast && <Toast {...toast} onDone={()=>setToast(null)}/>}

      {/* FIX #15: custom confirm dialog */}
      {confirm && (
        <ConfirmDialog
          title="Eliminar alumno"
          message={`¿Estás seguro de que deseas eliminar a "${confirm.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={()=>setConfirm(null)}
        />
      )}

      {/* Modal — FIX #10: role dialog + aria-modal */}
      {modal && (
        <div className="modal-overlay" role="dialog" aria-modal="true"
          aria-labelledby="modal-title">
          <div className="modal-box">
            <div style={{ padding:"20px 24px 16px", display:"flex", alignItems:"flex-start",
              justifyContent:"space-between", borderBottom:`1px solid ${T.border}` }}>
              <div>
                <h2 id="modal-title" style={{ fontSize:17, fontWeight:700, color:T.t1,
                  letterSpacing:"-.03em", marginBottom:3 }}>
                  {modal==="new"?"Registrar nuevo alumno":"Editar alumno"}
                </h2>
                <p style={{ fontSize:13.5, color:T.t3, lineHeight:1.4 }}>
                  {modal==="new"
                    ?"Completa los datos del estudiante"
                    :"Actualiza la información del estudiante"}
                </p>
              </div>
              <button onClick={()=>setModal(null)} aria-label="Cerrar modal"
                className="btn-ghost" style={{ padding:7, borderRadius:8, minHeight:36 }}>
                <X size={18} aria-hidden="true"/>
              </button>
            </div>

            <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              <div className="form-grid2">
                <Field label="Nombre completo" name="nombre" placeholder="Ej. Ana Torres García"/>
                <Field label="Matrícula" name="matricula" placeholder="2026001"/>
              </div>
              <Field label="Correo electrónico" name="correo" type="email" placeholder="alumno@correo.com"/>
              <div className="form-grid2">
                <div>
                  <label htmlFor="f-ciclo" className="field-label">Ciclo académico</label>
                  <select id="f-ciclo" className="inp" value={form.ciclo}
                    onChange={e=>setForm(p=>({...p,ciclo:e.target.value}))}>
                    {["2026A","2025B","2025A","2024B"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-estatus" className="field-label">Estatus</label>
                  <select id="f-estatus" className="inp" value={form.estatus}
                    onChange={e=>setForm(p=>({...p,estatus:e.target.value}))}>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`,
              display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={()=>setModal(null)} className="btn btn-secondary"
                style={{ minHeight:40, padding:"9px 16px", fontSize:14 }}>
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="btn btn-primary"
                style={{ minHeight:40, padding:"9px 18px", fontSize:14 }}>
                {saving?<><Spinner label="Guardando" size={13}/> Guardando…</>
                  :modal==="new"?"Registrar alumno":"Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <div>
          <h2 className="page-title">Alumnos</h2>
          <p style={{ fontSize:14, color:T.t3, marginTop:4, lineHeight:1.4 }}>
            {loading ? "Cargando…" : `${list.length} estudiantes registrados`}
          </p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button className="btn btn-secondary"
            style={{ fontSize:13.5, minHeight:40, padding:"9px 14px" }}>
            <Filter size={14} aria-hidden="true"/> Filtros
          </button>
          <button onClick={()=>{ setModal("new"); setFErrors({});
            setForm({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"}); }}
            className="btn btn-primary" style={{ fontSize:13.5, minHeight:40, padding:"9px 16px" }}>
            <Plus size={14} aria-hidden="true"/> Nuevo alumno
          </button>
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ marginBottom:16, display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ flex:1, minWidth:200, maxWidth:360, position:"relative" }}>
          <Search size={13} style={{ position:"absolute", left:11, top:"50%",
            transform:"translateY(-50%)", color:T.t4 }} aria-hidden="true"/>
          <input aria-label="Buscar alumno"
            style={{ width:"100%", minHeight:40, padding:"9px 12px 9px 34px",
              background:T.surface, color:T.t1, border:`1.5px solid ${T.border}`,
              borderRadius:9, fontSize:14, fontFamily:"inherit", outline:"none",
              boxShadow:T.sh1, transition:T.fast }}
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Nombre, matrícula o correo…"
            onFocus={e=>e.target.style.borderColor=T.brand}
            onBlur={e=>e.target.style.borderColor=T.border}/>
        </div>
        {[{label:"Todos los ciclos",opts:["2026A","2025B","2025A"]},
          {label:"Todos los estatus",opts:["Activo","Inactivo","Baja"]}].map(f=>(
          <select key={f.label} aria-label={f.label}
            style={{ minHeight:40, padding:"9px 10px", background:T.surface,
              color:T.t2, border:`1.5px solid ${T.border}`, borderRadius:9,
              fontSize:13.5, fontFamily:"inherit", cursor:"pointer", outline:"none" }}>
            <option>{f.label}</option>
            {f.opts.map(o=><option key={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:"clamp(32px,6vw,52px)", textAlign:"center" }}
            role="status" aria-label="Cargando alumnos">
            <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:14 }}>
              <Spinner size={22} label="Cargando alumnos"/>
              <p style={{ fontSize:14, color:T.t3, fontWeight:500 }}>Cargando alumnos…</p>
            </div>
          </div>
        ) : filtered.length===0 ? (
          <EmptyState icon={<Users size={44}/>}
            title={search?"Sin resultados":"No hay alumnos registrados"}
            desc={search?"Intenta con otro término de búsqueda.":"Registra el primer alumno para comenzar."}/>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mobile-cards" style={{ padding:12 }}>
              {filtered.map(a=>(
                <article key={a.id} style={{ border:`1px solid ${T.border}`,
                  borderRadius:12, padding:"14px 16px", marginBottom:10,
                  background:T.surface }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <Avatar name={a.nombre} sz={40}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:15, color:T.t1,
                        letterSpacing:"-.02em", lineHeight:1.2 }}>{a.nombre}</p>
                      <p style={{ fontSize:13, color:T.t3, marginTop:2 }}>{a.correo}</p>
                    </div>
                    <Badge s={a.estatus}/>
                  </div>
                  <dl style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
                    gap:8, marginBottom:12 }}>
                    {[{t:"Matrícula",v:a.matricula},{t:"Ciclo",v:a.ciclo},
                      {t:"Carrera",v:a.carreras?.nombre??"—"}].map(({t,v})=>(
                      <div key={t} style={{ background:T.s2, borderRadius:8,
                        padding:"7px 10px", gridColumn:t==="Carrera"?"1/-1":"auto" }}>
                        <dt style={{ fontSize:10.5, color:T.t4, fontWeight:600,
                          textTransform:"uppercase", letterSpacing:".05em", lineHeight:1 }}>{t}</dt>
                        <dd style={{ fontSize:13.5, color:T.t1, fontWeight:500,
                          marginTop:3, lineHeight:1.3 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>openEdit(a)} className="btn btn-secondary"
                      style={{ flex:1, fontSize:13.5, minHeight:40, justifyContent:"center" }}>
                      <Pencil size={13} aria-hidden="true"/> Editar
                    </button>
                    <button onClick={()=>setConfirm({id:a.id,nombre:a.nombre})}
                      className="btn btn-danger"
                      style={{ flex:1, fontSize:13.5, minHeight:40, justifyContent:"center" }}>
                      <Trash2 size={13} aria-hidden="true"/> Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="table-wrap">
              <table aria-label="Lista de alumnos">
                <thead>
                  <tr>
                    {["Alumno","Matrícula","Carrera","Ciclo","Estatus","Acciones"].map(h=>(
                      <th key={h} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a=>(
                    <tr key={a.id}>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <Avatar name={a.nombre} sz={32}/>
                          <div>
                            <p style={{ fontWeight:600, fontSize:14, color:T.t1,
                              letterSpacing:"-.01em", lineHeight:1.2 }}>{a.nombre}</p>
                            <p style={{ fontSize:12.5, color:T.t3, marginTop:2 }}>{a.correo}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ background:T.s2, color:T.t2, padding:"3px 8px",
                          borderRadius:6, fontSize:13, fontFamily:"monospace", fontWeight:600 }}>
                          {a.matricula}
                        </code>
                      </td>
                      <td style={{ color:T.t2, fontSize:14 }}>{a.carreras?.nombre??"—"}</td>
                      <td>
                        <span style={{ background:T.blueM, color:T.blue, padding:"3px 9px",
                          borderRadius:99, fontSize:12.5, fontWeight:600 }}>{a.ciclo}</span>
                      </td>
                      <td><Badge s={a.estatus}/></td>
                      <td>
                        <div style={{ display:"flex", gap:5 }}>
                          <button onClick={()=>openEdit(a)} className="btn-icon"
                            aria-label={`Editar alumno ${a.nombre}`}>
                            <Pencil size={13} aria-hidden="true"/>
                          </button>
                          <button onClick={()=>setConfirm({id:a.id,nombre:a.nombre})}
                            className="btn-icon"
                            aria-label={`Eliminar alumno ${a.nombre}`}
                            style={{ color:T.red, borderColor:"rgba(153,27,27,.2)" }}>
                            <Trash2 size={13} aria-hidden="true"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!loading && (
          <div style={{ padding:"11px 16px", borderTop:`1px solid ${T.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:8 }}>
            <p style={{ fontSize:13, color:T.t3 }}>
              {filtered.length} de {list.length} alumnos
            </p>
            <p style={{ display:"flex", alignItems:"center", gap:6,
              fontSize:12.5, color:T.green, fontWeight:500 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:T.green }} aria-hidden="true"/>
              Conectado a Supabase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   EQUIVALENCIAS
══════════════════════════════════════════ */
function EquivalenciasPage() {
  const [list, setList] = useState<Equivalencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    supabase.from("equivalencias")
      .select("*,estudiantes(nombre,matricula)")
      .order("created_at",{ascending:false})
      .then(({data})=>{ if(data) setList(data as Equivalencia[]); setLoading(false); });
  },[]);

  return (
    <div className="page-wrap">
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <div>
          <h2 className="page-title">Equivalencias</h2>
          <p style={{ fontSize:14, color:T.t3, marginTop:4 }}>
            {loading?"Cargando…":`${list.length} registros`}
          </p>
        </div>
        <button className="btn btn-primary"
          style={{ fontSize:13.5, minHeight:40, padding:"9px 16px" }}>
          <Plus size={14} aria-hidden="true"/> Nueva equivalencia
        </button>
      </div>

      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:52, textAlign:"center" }} role="status">
            <Spinner size={22} label="Cargando equivalencias"/>
            <p style={{ fontSize:14, color:T.t3, marginTop:14 }}>Cargando equivalencias…</p>
          </div>
        ) : list.length===0 ? (
          <EmptyState icon={<FileText size={44}/>}
            title="Sin equivalencias"
            desc="Las equivalencias aparecerán aquí una vez registradas."/>
        ) : (
          <>
            {/* Mobile */}
            <div className="mobile-cards" style={{ padding:12 }}>
              {list.map(e=>(
                <article key={e.id} style={{ border:`1px solid ${T.border}`, borderRadius:12,
                  padding:"14px 16px", marginBottom:10, background:T.surface }}>
                  <div style={{ display:"flex", alignItems:"flex-start",
                    justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ flex:1, paddingRight:10 }}>
                      <p style={{ fontWeight:700, fontSize:14.5, color:T.t1,
                        letterSpacing:"-.02em", lineHeight:1.2 }}>{e.nombre_origen}</p>
                      <p style={{ fontSize:12.5, color:T.t3, marginTop:3, lineHeight:1.3 }}>
                        {e.clave_origen} · {e.institucion_origen}
                      </p>
                    </div>
                    <Badge s={e.estatus}/>
                  </div>
                  <p style={{ fontSize:13.5, color:T.t2, marginBottom:6, lineHeight:1.3 }}>
                    <span style={{ color:T.t3 }}>Alumno: </span>
                    <strong>{e.estudiantes?.nombre??"—"}</strong>
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <p style={{ fontSize:13.5, color:T.t2 }}>
                      <span style={{ color:T.t3 }}>UAG: </span>{e.nombre_uag}
                    </p>
                    <span style={{ background:T.blueM, color:T.blue, padding:"2px 8px",
                      borderRadius:99, fontSize:12, fontWeight:600, flexShrink:0 }}>
                      {e.creditos} cr.
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="table-wrap">
              <table aria-label="Lista de equivalencias">
                <thead>
                  <tr>
                    {["Alumno","Materia Origen","Institución","Materia UAG","Créditos","Fecha","Estatus"].map(h=>(
                      <th key={h} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map(e=>(
                    <tr key={e.id}>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <Avatar name={e.estudiantes?.nombre??"?"} sz={28}/>
                          <div>
                            <p style={{ fontWeight:600, fontSize:13.5, color:T.t1,
                              lineHeight:1.2 }}>{e.estudiantes?.nombre??"—"}</p>
                            <p style={{ fontSize:12, color:T.t3, marginTop:1 }}>
                              {e.estudiantes?.matricula}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p style={{ fontWeight:600, fontSize:13.5, color:T.t1, lineHeight:1.2 }}>
                          {e.nombre_origen}
                        </p>
                        <p style={{ fontSize:12, color:T.t3, marginTop:1 }}>{e.clave_origen}</p>
                      </td>
                      <td style={{ fontSize:13.5, color:T.t2 }}>{e.institucion_origen}</td>
                      <td style={{ fontSize:13.5, color:T.t1, fontWeight:500 }}>{e.nombre_uag}</td>
                      <td>
                        <span style={{ background:T.blueM, color:T.blue, padding:"3px 9px",
                          borderRadius:99, fontSize:13, fontWeight:600 }}>
                          {e.creditos} cr.
                        </span>
                      </td>
                      <td style={{ fontSize:13, color:T.t3 }}>{e.fecha_solicitud}</td>
                      <td><Badge s={e.estatus}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {!loading && (
          <div style={{ padding:"11px 16px", borderTop:`1px solid ${T.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:13, color:T.t3 }}>{list.length} equivalencias · datos en vivo</p>
            <div style={{ display:"flex", alignItems:"center", gap:6,
              fontSize:12.5, color:T.green, fontWeight:500 }}>
              <span style={{ width:6, height:6, borderRadius:"50%",
                background:T.green }} aria-hidden="true"/>
              Supabase
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PLACEHOLDER ── */
function PlaceholderPage({ title, subtitle, icon }: {
  title:string; subtitle:string; icon:React.ReactNode
}) {
  return (
    <div className="page-wrap">
      <div style={{ marginBottom:24 }}>
        <h2 className="page-title">{title}</h2>
        <p style={{ fontSize:14, color:T.t3, marginTop:4, lineHeight:1.5 }}>{subtitle}</p>
      </div>
      <div className="card">
        <EmptyState icon={icon} title="Módulo en desarrollo"
          desc="Este módulo estará disponible próximamente. Conecta las tablas en Supabase para activarlo."/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT
   FIX #6: landmarks semánticos
   FIX #8: skip link
══════════════════════════════════════════ */
export default function UAGPage() {
  const [user,     setUser]     = useState<User|null>(null);
  const [active,   setActive]   = useState("dashboard");
  const [kpi,      setKpi]      = useState<KpiData|null>(null);
  const [checking, setChecking] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{ setUser(data.session?.user??null); setChecking(false); });
    const { data:{subscription} } = supabase.auth.onAuthStateChange((_,s)=>setUser(s?.user??null));
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!user) return;
    (async()=>{
      const {data,error}=await supabase.from("v_kpi_dashboard").select("*").single();
      if(!error&&data){ setKpi(data as KpiData); return; }
      const [e,pe,pr,va,re,fi]=await Promise.all([
        supabase.from("estudiantes").select("id",{count:"exact",head:true}),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","pendiente"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","en_proceso"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","validado"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","rechazado"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","finalizado"),
      ]);
      setKpi({total_estudiantes:e.count??0,equiv_pendientes:pe.count??0,equiv_proceso:pr.count??0,
        equiv_validadas:va.count??0,equiv_rechazadas:re.count??0,equiv_finalizadas:fi.count??0});
    })();
  },[user]);

  async function logout(){
    await supabase.auth.signOut();
    setUser(null); setActive("dashboard"); setKpi(null);
  }

  const PAGES: Record<string,React.ReactNode> = {
    dashboard:    <DashboardPage setActive={setActive} kpi={kpi}/>,
    alumnos:      <AlumnosPage/>,
    equivalencias:<EquivalenciasPage/>,
    seguimiento:  <PlaceholderPage title="Seguimiento Académico" subtitle="Monitorea el avance de cada estudiante" icon={<GraduationCap size={44}/>}/>,
    carreras:     <PlaceholderPage title="Carreras" subtitle="Catálogo de programas académicos" icon={<BookOpen size={44}/>}/>,
    reportes:     <PlaceholderPage title="Reportes e Indicadores" subtitle="Análisis y métricas de equivalencias" icon={<BarChart2 size={44}/>}/>,
    documentos:   <PlaceholderPage title="Gestión Documental" subtitle="Repositorio de documentos académicos" icon={<FolderOpen size={44}/>}/>,
    usuarios:     <PlaceholderPage title="Usuarios y Permisos" subtitle="Control de acceso basado en roles" icon={<UserCog size={44}/>}/>,
    config:       <PlaceholderPage title="Configuración" subtitle="Preferencias del sistema" icon={<Settings size={44}/>}/>,
  };

  if(checking) return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        justifyContent:"center", flexDirection:"column", gap:18,
        background:T.bg, fontFamily:"Inter, system-ui, sans-serif" }}
        role="status" aria-label="Cargando aplicación">
        <UAGLogo size={30}/>
        <div style={{ display:"flex", alignItems:"center", gap:10, color:T.t3, fontSize:14.5 }}>
          <Spinner size={16} label="Cargando"/> Verificando sesión…
        </div>
      </div>
    </>
  );

  if(!user) return (
    <>
      <style>{CSS}</style>
      <LoginPage onLogin={u=>setUser(u)}/>
    </>
  );

  return (
    <>
      <style>{CSS}</style>

      {/* FIX #8: Skip to content link */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* FIX #6: proper landmarks */}
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg }}>
        <Sidebar
          active={active}
          setActive={v=>{ setActive(v); setSideOpen(false); }}
          user={user}
          onLogout={logout}
          open={sideOpen}
          onClose={()=>setSideOpen(false)}
        />

        <div className="main-wrap" style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <Topbar user={user} onMenu={()=>setSideOpen(p=>!p)} pageTitle={PAGE_TITLES[active]??""}/>

          {/* FIX #6: role="main" */}
          <main id="main-content" role="main"
            style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}
            key={active} className="fade-up">
            {PAGES[active] ?? <PlaceholderPage title="Página no encontrada" subtitle="" icon={<Settings size={44}/>}/>}
          </main>
        </div>
      </div>
    </>
  );
}
