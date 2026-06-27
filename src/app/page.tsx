"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Users, FileText, GraduationCap, BarChart2,
  FolderOpen, UserCog, BookOpen, Settings, Bell, Plus, Search,
  Eye, Pencil, Trash2, CheckCircle, Clock, Upload, ChevronRight,
  LogOut, Shield, AlertCircle, Loader2, X, Menu, TrendingUp,
  ArrowUpRight, Sparkles, ChevronDown, MoreHorizontal, Filter
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line, Area, AreaChart
} from "recharts";

/* ══════════════════════════════════════════
   SUPABASE
══════════════════════════════════════════ */
const supabase = createBrowserClient(
  "https://nfvkhzrxfpqbyseacjvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdmtoenJ4ZnBxYnlzZWFjanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDkyNzAsImV4cCI6MjA5Nzg4NTI3MH0.c3fYMudpHh37ybQ21MKnTJ2GHlh3chJJZAdObQPp-o0"
);

/* ══════════════════════════════════════════
   DESIGN SYSTEM
══════════════════════════════════════════ */
const DS = {
  /* UAG Brand */
  brand:    "#7a2531",
  brand2:   "#8f2d3d",
  brand3:   "#5c1a22",
  brand4:   "#3d1018",
  orange:   "#ee750a",
  orangeL:  "#f48c30",

  /* Neutrals */
  bg:       "#f6f6f7",
  surface:  "#ffffff",
  surface2: "#fafafa",
  surface3: "#f4f4f5",
  border:   "rgba(0,0,0,.08)",
  borderM:  "rgba(0,0,0,.12)",
  borderS:  "rgba(0,0,0,.05)",

  /* Text */
  t1: "#09090b",
  t2: "#3f3f46",
  t3: "#71717a",
  t4: "#a1a1aa",

  /* Semantic */
  green:  "#16a34a", greenL:  "#f0fdf4", greenM: "#dcfce7",
  blue:   "#2563eb", blueL:   "#eff6ff", blueM:  "#dbeafe",
  amber:  "#d97706", amberL:  "#fffbeb", amberM: "#fef3c7",
  red:    "#dc2626", redL:    "#fef2f2", redM:   "#fee2e2",
  purple: "#7c3aed", purpleL: "#faf5ff", purpleM:"#ede9fe",
  gray:   "#52525b", grayL:   "#fafafa", grayM:  "#f4f4f5",

  /* Radius */
  r4: "4px", r6: "6px", r8: "8px", r10: "10px",
  r12: "12px", r14: "14px", r16: "16px", r20: "20px",

  /* Shadow */
  s1: "0 1px 2px rgba(0,0,0,.05)",
  s2: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)",
  s3: "0 4px 6px rgba(0,0,0,.05), 0 2px 4px rgba(0,0,0,.04)",
  s4: "0 10px 15px rgba(0,0,0,.07), 0 4px 6px rgba(0,0,0,.04)",
  s5: "0 20px 25px rgba(0,0,0,.08), 0 8px 10px rgba(0,0,0,.04)",
  sBrand: "0 4px 14px rgba(122,37,49,.25)",

  /* Transitions */
  fast: "all .1s ease",
  med:  "all .18s ease",
  slow: "all .28s cubic-bezier(.4,0,.2,1)",
};

/* ══════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f6f6f7; color: #09090b;
    overflow-x: hidden; -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.25); }

  /* ── KEYFRAMES ── */
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }
  @keyframes slideRight { from { transform:translateX(-100%); } to { transform:translateX(0); } }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }

  .spin { animation: spin .7s linear infinite; }
  .fade-up { animation: fadeUp .22s ease both; }
  .fade-in { animation: fadeIn .18s ease both; }
  .scale-in { animation: scaleIn .2s cubic-bezier(.34,1.56,.64,1) both; }

  /* ── SKELETON ── */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 6px;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    position: fixed; top: 0; left: 0; bottom: 0; width: 240px;
    background: ${DS.brand4};
    border-right: 1px solid rgba(255,255,255,.06);
    display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    will-change: transform; z-index: 300;
  }
  .sidebar.open { transform: translateX(0); animation: slideRight .28s ease; }

  .sidebar-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,.6); z-index: 299;
    backdrop-filter: blur(3px);
  }
  .sidebar-overlay.show { display: block; animation: fadeIn .18s ease; }

  @media (min-width: 1024px) {
    .sidebar { transform: translateX(0) !important; box-shadow: none; }
    .sidebar-overlay { display: none !important; }
    .main-wrap { margin-left: 240px; }
  }
  @media (max-width: 1023px) { .main-wrap { margin-left: 0; } }

  /* ── NAV ITEM ── */
  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 12px; margin: 1px 8px;
    border-radius: 8px; cursor: pointer; user-select: none;
    color: rgba(255,255,255,.5); font-size: 13.5px; font-weight: 500;
    transition: background .13s, color .13s;
    min-height: 36px; position: relative;
  }
  .nav-item:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
  .nav-item.active {
    background: rgba(255,255,255,.1);
    color: #fff; font-weight: 600;
  }
  .nav-item.active::before {
    content: ''; position: absolute; left: -8px; top: 50%;
    transform: translateY(-50%); width: 3px; height: 18px;
    background: ${DS.orange}; border-radius: 0 3px 3px 0;
  }
  .nav-item .nav-icon { flex-shrink: 0; opacity: .7; }
  .nav-item.active .nav-icon { opacity: 1; }
  .nav-item .nav-badge {
    margin-left: auto; background: ${DS.orange}; color: #fff;
    font-size: 10px; font-weight: 700; padding: 1px 6px;
    border-radius: 99px; min-width: 18px; text-align: center;
  }

  /* ── TOPBAR ── */
  .topbar {
    position: sticky; top: 0; z-index: 200; height: 56px;
    background: rgba(255,255,255,.85);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border-bottom: 1px solid rgba(0,0,0,.06);
    display: flex; align-items: center;
    padding: 0 clamp(14px,2.5vw,24px); gap: 12px;
  }

  /* ── CARD ── */
  .card {
    background: #fff;
    border: 1px solid rgba(0,0,0,.07);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.03);
    overflow: hidden;
    transition: box-shadow .18s ease, border-color .18s ease;
  }
  .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04); }
  .card-interactive:hover {
    border-color: rgba(0,0,0,.12);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.04);
  }

  /* ── KPI CARD ── */
  .kpi-card {
    background: #fff; border: 1px solid rgba(0,0,0,.07);
    border-radius: 14px; padding: clamp(16px,2.5vw,22px);
    transition: all .18s ease;
    position: relative; overflow: hidden;
  }
  .kpi-card::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
    transform: translate(20px,-20px);
  }
  .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.09); }

  /* ── BUTTONS ── */
  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 9px 16px; min-height: 36px;
    background: ${DS.brand}; color: #fff;
    border: none; border-radius: 8px;
    font-size: 13.5px; font-weight: 600; cursor: pointer;
    font-family: inherit; letter-spacing: -.01em;
    transition: background .13s, box-shadow .13s, transform .1s;
    box-shadow: 0 1px 2px rgba(122,37,49,.2), inset 0 1px 0 rgba(255,255,255,.08);
  }
  .btn-primary:hover { background: ${DS.brand2}; box-shadow: 0 4px 12px rgba(122,37,49,.3); }
  .btn-primary:active { transform: scale(.98); }
  .btn-primary:disabled { opacity: .5; cursor: not-allowed; }

  .btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 14px; min-height: 36px;
    background: #fff; color: ${DS.t2};
    border: 1px solid rgba(0,0,0,.12); border-radius: 8px;
    font-size: 13.5px; font-weight: 500; cursor: pointer;
    font-family: inherit; transition: all .13s;
    box-shadow: 0 1px 2px rgba(0,0,0,.04);
  }
  .btn-secondary:hover { background: #fafafa; border-color: rgba(0,0,0,.18); box-shadow: 0 2px 6px rgba(0,0,0,.07); }
  .btn-secondary:active { transform: scale(.98); }

  .btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 7px 12px; min-height: 32px;
    background: transparent; color: ${DS.t3};
    border: none; border-radius: 7px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    font-family: inherit; transition: all .13s;
  }
  .btn-ghost:hover { background: rgba(0,0,0,.05); color: ${DS.t1}; }

  .btn-danger {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 14px; min-height: 36px;
    background: ${DS.redL}; color: ${DS.red};
    border: 1px solid rgba(220,38,38,.15); border-radius: 8px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all .13s;
  }
  .btn-danger:hover { background: ${DS.redM}; }

  .btn-icon {
    width: 32px; height: 32px; min-width: 32px;
    display: flex; align-items: center; justify-content: center;
    background: transparent; border: 1px solid rgba(0,0,0,.1);
    border-radius: 7px; cursor: pointer; color: ${DS.t3};
    transition: all .13s;
  }
  .btn-icon:hover { background: #fafafa; color: ${DS.t1}; border-color: rgba(0,0,0,.16); }

  /* ── INPUT ── */
  .inp {
    width: 100%; min-height: 38px; padding: 8px 12px;
    background: #fff; color: ${DS.t1};
    border: 1px solid rgba(0,0,0,.12); border-radius: 8px;
    font-size: 14px; font-family: inherit; outline: none;
    transition: border-color .13s, box-shadow .13s;
    box-shadow: 0 1px 2px rgba(0,0,0,.03);
  }
  .inp::placeholder { color: ${DS.t4}; }
  .inp:focus {
    border-color: ${DS.brand};
    box-shadow: 0 0 0 3px rgba(122,37,49,.1), 0 1px 2px rgba(0,0,0,.03);
  }
  .inp:hover:not(:focus) { border-color: rgba(0,0,0,.2); }

  .inp-search {
    flex: 1; min-height: 36px; padding: 7px 12px 7px 34px;
    background: rgba(0,0,0,.04); color: ${DS.t1};
    border: 1px solid transparent; border-radius: 8px;
    font-size: 13.5px; font-family: inherit; outline: none;
    transition: all .13s;
  }
  .inp-search:focus {
    background: #fff; border-color: rgba(0,0,0,.12);
    box-shadow: 0 0 0 3px rgba(122,37,49,.08);
  }

  /* ── TABLE ── */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  table { width: 100%; border-collapse: collapse; min-width: 520px; }
  thead th {
    padding: 10px 14px; font-size: 11.5px; font-weight: 600;
    color: ${DS.t3}; text-align: left; text-transform: uppercase;
    letter-spacing: .06em; background: #fafafa;
    border-bottom: 1px solid rgba(0,0,0,.07); white-space: nowrap;
  }
  tbody tr { border-bottom: 1px solid rgba(0,0,0,.05); transition: background .1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(0,0,0,.018); }
  tbody td { padding: 12px 14px; font-size: 13.5px; vertical-align: middle; }

  /* Mobile cards for tables */
  @media (max-width: 640px) {
    .table-to-cards .table-wrap { display: none; }
    .mobile-cards { display: block !important; }
  }
  @media (min-width: 641px) {
    .mobile-cards { display: none !important; }
  }

  /* ── BADGE ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 99px;
    font-size: 11.5px; font-weight: 600; white-space: nowrap;
  }
  .badge::before { content:''; width:5px; height:5px; border-radius:50%; background:currentColor; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(0,0,0,.4); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: clamp(12px,3vw,24px); animation: fadeIn .15s ease;
  }
  .modal-box {
    background: #fff; border-radius: 16px; width: 100%;
    max-width: min(560px, 96vw); max-height: 90vh; overflow-y: auto;
    box-shadow: 0 24px 48px rgba(0,0,0,.18), 0 8px 16px rgba(0,0,0,.08);
    animation: scaleIn .2s cubic-bezier(.34,1.56,.64,1);
  }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 20px; right: 20px; z-index: 9999;
    max-width: min(360px, calc(100vw - 40px));
    padding: 12px 16px; border-radius: 12px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,.16), 0 2px 8px rgba(0,0,0,.08);
    animation: scaleIn .2s cubic-bezier(.34,1.56,.64,1);
    border: 1px solid rgba(255,255,255,.15);
  }

  /* ── PAGE ── */
  .page-wrap { padding: clamp(16px,3vw,32px); max-width: 1440px; }
  .page-title { font-size: clamp(20px,3.5vw,26px); font-weight: 800; letter-spacing: -.04em; color: ${DS.t1}; line-height: 1.1; }
  .section-title { font-size: 14px; font-weight: 600; color: ${DS.t1}; letter-spacing: -.01em; }

  /* ── KPI GRID ── */
  .kpi-grid { display: grid; gap: clamp(10px,1.5vw,14px); margin-bottom: clamp(16px,2vw,20px);
    grid-template-columns: repeat(auto-fill, minmax(min(175px,100%), 1fr)); }

  /* ── CHARTS GRID ── */
  .charts-row { display: grid; gap: clamp(12px,1.5vw,16px); margin-bottom: clamp(14px,2vw,18px);
    grid-template-columns: 1fr; }
  @media(min-width:700px) { .charts-row { grid-template-columns: 1.6fr 1fr; } }
  @media(min-width:1100px) { .charts-row { grid-template-columns: 1.7fr 1fr 1.5fr; } }

  /* ── SHORTCUTS ── */
  .shortcuts { display: grid; gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(min(130px,100%), 1fr)); }

  /* ── FORM GRID ── */
  .form-grid-2 { display: grid; gap: 14px; grid-template-columns: 1fr; }
  @media(min-width:480px) { .form-grid-2 { grid-template-columns: 1fr 1fr; } }

  /* ── EMPTY STATE ── */
  .empty-state { padding: clamp(40px,8vw,72px) 24px; text-align: center; color: ${DS.t3}; }

  /* ── TOPBAR SEARCH HIDE ── */
  .topbar-search { display: none; }
  @media(min-width:600px) { .topbar-search { display: flex; } }

  /* ── LABEL ── */
  .field-label { display: block; font-size: 12px; font-weight: 600; color: ${DS.t2};
    letter-spacing: .02em; margin-bottom: 5px; }

  /* ── SELECT ── */
  .sel {
    min-height: 36px; padding: 7px 10px;
    background: rgba(0,0,0,.03); color: ${DS.t2};
    border: 1px solid rgba(0,0,0,.1); border-radius: 8px;
    font-size: 13.5px; font-family: inherit; outline: none; cursor: pointer;
    transition: all .13s;
  }
  .sel:focus { background: #fff; border-color: ${DS.brand}; box-shadow: 0 0 0 3px rgba(122,37,49,.08); }

  /* ── LOGIN ── */
  .login-left { display: none; }
  @media(min-width:760px) { .login-left { display: flex; } }
  .login-mobile-banner { display: block; }
  @media(min-width:760px) { .login-mobile-banner { display: none; } }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: rgba(0,0,0,.06); margin: 0; }

  /* ── SECTION LABEL ── */
  .nav-section { padding: 16px 12px 4px; font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em; color: rgba(255,255,255,.25); }
`;

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
type Estudiante = {
  id:string; matricula:string; nombre:string; correo:string;
  telefono?:string; carrera_id?:string; ciclo:string;
  fecha_ingreso:string; estatus:string; carreras?:{nombre:string};
};
type Equivalencia = {
  id:string; estudiante_id:string; clave_origen:string; nombre_origen:string;
  institucion_origen:string; nombre_uag:string; creditos:number;
  fecha_solicitud:string; estatus:string;
  estudiantes?:{nombre:string; matricula:string};
};
type KpiData = {
  total_estudiantes:number; equiv_pendientes:number; equiv_proceso:number;
  equiv_validadas:number; equiv_rechazadas:number; equiv_finalizadas:number;
};

/* ══════════════════════════════════════════
   MICRO COMPONENTS
══════════════════════════════════════════ */
function initials(n:string) { return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }

function Avatar({ name, sz=32, color=DS.brand }: { name:string; sz?:number; color?:string }) {
  return (
    <div style={{
      width:sz, height:sz, borderRadius:"50%",
      background:`linear-gradient(135deg, ${color}, ${color}cc)`,
      color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:sz*.33, fontWeight:700, flexShrink:0, letterSpacing:"-.02em",
      boxShadow:`inset 0 1px 0 rgba(255,255,255,.2)`,
    }}>
      {initials(name)}
    </div>
  );
}

function Badge({ s }: { s:string }) {
  const m: Record<string,[string,string,string]> = {
    validado:    [DS.green,  DS.greenL,  DS.greenM],
    en_proceso:  [DS.blue,   DS.blueL,   DS.blueM],
    en_revision: [DS.purple, DS.purpleL, DS.purpleM],
    pendiente:   [DS.amber,  DS.amberL,  DS.amberM],
    rechazado:   [DS.red,    DS.redL,    DS.redM],
    finalizado:  [DS.gray,   DS.grayL,   DS.grayM],
    activo:      [DS.green,  DS.greenL,  DS.greenM],
    inactivo:    [DS.gray,   DS.grayL,   DS.grayM],
    baja:        [DS.red,    DS.redL,    DS.redM],
  };
  const k = s?.toLowerCase().replace(/ /g,"_")??"";
  const [fg,,bg] = m[k]??[DS.gray,DS.grayL,DS.grayM];
  const label = s?.replace(/_/g," ");
  return (
    <span className="badge" style={{ background:bg, color:fg }}>
      {label?.charAt(0).toUpperCase()+label?.slice(1)}
    </span>
  );
}

function Spinner({ size=14 }: { size?:number }) {
  return <Loader2 size={size} className="spin" style={{ color:DS.t3 }}/>;
}

function SkeletonLine({ w="100%", h=14, mb=8 }: { w?:string; h?:number; mb?:number }) {
  return <div className="skeleton" style={{ width:w, height:h, marginBottom:mb }}/>;
}

function SkeletonCard() {
  return (
    <div className="kpi-card" style={{ padding:22 }}>
      <SkeletonLine w="40%" h={10} mb={12}/>
      <SkeletonLine w="60%" h={28} mb={8}/>
      <SkeletonLine w="50%" h={10}/>
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon:React.ReactNode; title:string; desc:string }) {
  return (
    <div className="empty-state">
      <div style={{ color:DS.t4, marginBottom:16, display:"flex", justifyContent:"center" }}>{icon}</div>
      <div style={{ fontSize:15, fontWeight:600, color:DS.t2, marginBottom:6 }}>{title}</div>
      <div style={{ fontSize:13.5, color:DS.t3, maxWidth:320, margin:"0 auto", lineHeight:1.5 }}>{desc}</div>
    </div>
  );
}

function Toast({ msg, ok, onDone }: { msg:string; ok:boolean; onDone:()=>void }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return ()=>clearTimeout(t); }, [onDone]);
  return (
    <div className="toast" style={{
      background: ok ? DS.t1 : DS.red,
      color:"#fff",
    }}>
      {ok
        ? <CheckCircle size={16} style={{ color:"#4ade80", flexShrink:0 }}/>
        : <AlertCircle size={16} style={{ color:"#fca5a5", flexShrink:0 }}/>
      }
      <span>{msg}</span>
      <button onClick={onDone}
        style={{ marginLeft:"auto", background:"rgba(255,255,255,.15)", border:"none",
          borderRadius:6, width:22, height:22, cursor:"pointer", color:"inherit",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <X size={12}/>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   UAG LOGO
══════════════════════════════════════════ */
function UAGLogo({ white=false, size=30 }: { white?:boolean; size?:number }) {
  const b = white ? "#fff" : DS.brand;
  const o = DS.orange;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <path d="M15 65 L5 15 L13 17 L28 60Z" fill={o} opacity=".9"/>
        <path d="M22 65 L12 10 L20 13 L32 62Z" fill={b} opacity=".85"/>
        <path d="M30 65 L24 8 L32 12 L38 64Z" fill={b}/>
        <path d="M38 65 L36 7 L44 11 L42 64Z" fill={b}/>
        <path d="M46 65 L48 8 L56 12 L50 65Z" fill={b} opacity=".85"/>
        <path d="M54 65 L60 12 L68 17 L58 65Z" fill={b} opacity=".7"/>
        <path d="M4 70 Q38 78 72 70" stroke={o} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{ lineHeight:1 }}>
        <div style={{ fontWeight:900, fontSize:Math.round(size*.48), color:b, letterSpacing:"-.03em", lineHeight:1 }}>UAG</div>
        <div style={{ display:"flex", alignItems:"center", gap:2.5, marginTop:2 }}>
          <svg width={Math.round(size*.32)} height={Math.round(size*.32)} viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke={o} strokeWidth="2.5"/>
            <line x1="10" y1="3" x2="10" y2="11" stroke={o} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:Math.round(size*.3), fontWeight:700, color:white?"rgba(255,255,255,.85)":b, letterSpacing:"-.01em" }}>nline</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   NAV DATA
══════════════════════════════════════════ */
const NAV = [
  { id:"dashboard",    label:"Inicio",               icon:<LayoutDashboard size={15}/> },
  { id:"alumnos",      label:"Alumnos",              icon:<Users size={15}/>,      badge:"247" },
  { id:"equivalencias",label:"Equivalencias",        icon:<FileText size={15}/>,   badge:"38" },
  { id:"seguimiento",  label:"Seguimiento Académico",icon:<GraduationCap size={15}/> },
  { id:"carreras",     label:"Carreras",             icon:<BookOpen size={15}/> },
  { id:"reportes",     label:"Reportes",             icon:<BarChart2 size={15}/> },
  { id:"documentos",   label:"Documentos",           icon:<FolderOpen size={15}/> },
  { id:"usuarios",     label:"Usuarios",             icon:<UserCog size={15}/> },
  { id:"config",       label:"Configuración",        icon:<Settings size={15}/> },
];

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
function LoginPage({ onLogin }: { onLogin:(u:User)=>void }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email||!pass) { setErr("Por favor ingresa tu correo y contraseña."); return; }
    setLoading(true); setErr("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password:pass });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    if (data.user) onLogin(data.user);
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"inherit" }}>
      {/* ── LEFT PANEL ── */}
      <div className="login-left" style={{
        flex:"0 0 48%", position:"relative", overflow:"hidden",
        flexDirection:"column", justifyContent:"space-between",
        padding:"clamp(40px,5vw,64px)",
        background:`linear-gradient(145deg, ${DS.brand4} 0%, ${DS.brand3} 40%, ${DS.brand} 100%)`,
      }}>
        {/* Decorative orbs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320,
          borderRadius:"50%", background:"rgba(238,117,10,.12)", filter:"blur(60px)" }}/>
        <div style={{ position:"absolute", bottom:-60, left:-40, width:240, height:240,
          borderRadius:"50%", background:"rgba(255,255,255,.04)", filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", top:"35%", left:"50%", width:200, height:200,
          borderRadius:"50%", background:"rgba(238,117,10,.06)", filter:"blur(50px)" }}/>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:56 }}><UAGLogo white size={32}/></div>

          <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px",
            background:"rgba(238,117,10,.15)", border:"1px solid rgba(238,117,10,.3)",
            borderRadius:99, marginBottom:24 }}>
            <Sparkles size={11} style={{ color:DS.orange }}/>
            <span style={{ fontSize:11.5, fontWeight:600, color:DS.orange, letterSpacing:".04em" }}>
              Programas Online · 2026
            </span>
          </div>

          <h1 style={{ color:"#fff", fontSize:"clamp(28px,4vw,42px)", fontWeight:900,
            lineHeight:1.08, letterSpacing:"-.05em", marginBottom:20 }}>
            Plataforma de<br/>Gestión de<br/>Equivalencias
          </h1>
          <p style={{ color:"rgba(255,255,255,.55)", fontSize:15, lineHeight:1.6, maxWidth:340 }}>
            Centraliza la gestión, control y seguimiento de equivalencias académicas de estudiantes de nuevo ingreso.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:48 }}>
            {[
              [<Users size={14}/>,       "Gestión de Alumnos"],
              [<FileText size={14}/>,    "Control de Equivalencias"],
              [<GraduationCap size={14}/>,"Seguimiento Académico"],
              [<BarChart2 size={14}/>,   "Reportes e Indicadores"],
            ].map(([icon,label],i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:9,
                padding:"10px 14px", borderRadius:10,
                background:"rgba(255,255,255,.06)",
                border:"1px solid rgba(255,255,255,.08)",
              }}>
                <span style={{ color:DS.orange, flexShrink:0 }}>{icon as React.ReactNode}</span>
                <span style={{ fontSize:12.5, color:"rgba(255,255,255,.7)", fontWeight:500 }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"relative", zIndex:1, fontSize:11.5, color:"rgba(255,255,255,.3)", letterSpacing:".02em" }}>
          © 2026 UAG Online · Todos los derechos reservados
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex:1, background:"#fafafa", display:"flex", alignItems:"center",
        justifyContent:"center", padding:"clamp(24px,5vw,48px) clamp(20px,4vw,40px)",
        minHeight:"100vh" }}>
        <div style={{ width:"100%", maxWidth:400 }} className="fade-up">

          {/* Mobile banner */}
          <div className="login-mobile-banner" style={{
            background:`linear-gradient(135deg, ${DS.brand4}, ${DS.brand})`,
            borderRadius:16, padding:"20px 22px", marginBottom:28,
          }}>
            <UAGLogo white size={26}/>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:13, marginTop:12, lineHeight:1.5 }}>
              Plataforma de Gestión de Equivalencias y Seguimiento Académico
            </p>
          </div>

          <div style={{ marginBottom:32 }}>
            <h2 style={{ fontSize:"clamp(22px,4vw,28px)", fontWeight:800, color:DS.t1,
              letterSpacing:"-.05em", marginBottom:6 }}>Iniciar sesión</h2>
            <p style={{ color:DS.t3, fontSize:14, lineHeight:1.5 }}>
              Accede con tu cuenta institucional UAG
            </p>
          </div>

          {/* Error state */}
          {err && (
            <div style={{
              background:DS.redL, border:`1px solid rgba(220,38,38,.2)`,
              borderRadius:10, padding:"11px 14px", marginBottom:18,
              display:"flex", alignItems:"flex-start", gap:9,
            }} className="fade-up">
              <AlertCircle size={15} style={{ color:DS.red, flexShrink:0, marginTop:1 }}/>
              <span style={{ fontSize:13.5, color:DS.red, fontWeight:500 }}>{err}</span>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label className="field-label">Correo institucional</label>
              <div style={{ position:"relative" }}>
                <Shield size={13} style={{ position:"absolute", left:11, top:"50%",
                  transform:"translateY(-50%)", color:DS.t4, pointerEvents:"none" }}/>
                <input className="inp" type="email" value={email}
                  onChange={e=>setEmail(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  placeholder="usuario@uag.mx"
                  style={{ paddingLeft:34 }}/>
              </div>
            </div>

            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                <label className="field-label" style={{ marginBottom:0 }}>Contraseña</label>
                <span style={{ fontSize:12.5, color:DS.brand, fontWeight:500, cursor:"pointer",
                  textDecoration:"none", letterSpacing:"-.01em" }}>
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div style={{ position:"relative" }}>
                <Shield size={13} style={{ position:"absolute", left:11, top:"50%",
                  transform:"translateY(-50%)", color:DS.t4, pointerEvents:"none" }}/>
                <input className="inp" type="password" value={pass}
                  onChange={e=>setPass(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  placeholder="Tu contraseña"
                  style={{ paddingLeft:34 }}/>
              </div>
            </div>

            <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer",
              fontSize:13.5, color:DS.t2, userSelect:"none" }}>
              <input type="checkbox" defaultChecked
                style={{ width:15, height:15, accentColor:DS.brand, cursor:"pointer" }}/>
              Mantener sesión iniciada
            </label>

            <button onClick={handleLogin} disabled={loading} className="btn-primary"
              style={{ width:"100%", padding:"11px", fontSize:14.5, borderRadius:10,
                boxShadow:DS.sBrand, letterSpacing:"-.01em" }}>
              {loading ? <><Spinner size={15}/> Verificando…</> : <>Iniciar sesión <ChevronRight size={16}/></>}
            </button>
          </div>

          <p style={{ textAlign:"center", marginTop:28, fontSize:13, color:DS.t4 }}>
            ¿Necesitas ayuda?{" "}
            <span style={{ color:DS.brand, fontWeight:500, cursor:"pointer" }}>Soporte técnico</span>
          </p>

          {/* Trust badges */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20,
            marginTop:36, paddingTop:24, borderTop:`1px solid ${DS.border}` }}>
            {["🔒 Cifrado SSL", "🛡️ Datos seguros", "⚡ Alta disponibilidad"].map(t=>(
              <span key={t} style={{ fontSize:11, color:DS.t4, fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════ */
function Sidebar({ active, setActive, user, onLogout, open, onClose }: {
  active:string; setActive:(s:string)=>void; user:User|null;
  onLogout:()=>void; open:boolean; onClose:()=>void;
}) {
  const nombre = user?.email?.split("@")[0]??"Usuario";
  return (
    <>
      <div className={`sidebar-overlay ${open?"show":""}`} onClick={onClose}/>
      <aside className={`sidebar ${open?"open":""}`}>

        {/* Brand */}
        <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
          <UAGLogo white size={28}/>
          <div style={{ marginTop:8, fontSize:10.5, color:"rgba(255,255,255,.28)",
            fontWeight:500, letterSpacing:".04em", textTransform:"uppercase" }}>
            Programas Online
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, overflowY:"auto", padding:"10px 0" }}>
          <div className="nav-section">Principal</div>
          {NAV.slice(0,4).map(item => (
            <div key={item.id} className={`nav-item ${active===item.id?"active":""}`}
              onClick={() => { setActive(item.id); onClose(); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}

          <div className="nav-section">Administración</div>
          {NAV.slice(4).map(item => (
            <div key={item.id} className={`nav-item ${active===item.id?"active":""}`}
              onClick={() => { setActive(item.id); onClose(); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding:"12px 12px 16px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
          <div style={{ padding:"10px 12px", borderRadius:10, background:"rgba(255,255,255,.05)",
            border:"1px solid rgba(255,255,255,.07)", marginBottom:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <Avatar name={nombre} sz={30}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.9)",
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  letterSpacing:"-.01em" }}>{nombre}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginTop:1 }}>Jefa de Admisiones</div>
              </div>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80",
                boxShadow:"0 0 6px rgba(74,222,128,.6)", flexShrink:0 }}/>
            </div>
          </div>

          <button onClick={onLogout} className="btn-ghost"
            style={{ width:"100%", color:"rgba(255,255,255,.4)", fontSize:13,
              justifyContent:"flex-start", gap:8, padding:"8px 10px" }}>
            <LogOut size={14}/> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

/* ══════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════ */
function Topbar({ user, onMenu }: { user:User|null; onMenu:()=>void }) {
  const [search, setSearch] = useState("");
  const nombre = user?.email?.split("@")[0]??"Usuario";
  return (
    <header className="topbar">
      <button onClick={onMenu} className="btn-icon" style={{ flexShrink:0 }}>
        <Menu size={17}/>
      </button>

      {/* Search bar */}
      <div className="topbar-search" style={{ flex:1, maxWidth:320, position:"relative" }}>
        <Search size={13} style={{ position:"absolute", left:10, top:"50%",
          transform:"translateY(-50%)", color:DS.t4, pointerEvents:"none" }}/>
        <input className="inp-search" value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Buscar estudiante, equivalencia…"/>
      </div>

      <div style={{ flex:1 }}/>

      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {/* Notifications */}
        <button className="btn-icon" style={{ position:"relative" }}>
          <Bell size={16}/>
          <div style={{ position:"absolute", top:5, right:5, width:7, height:7,
            background:DS.orange, borderRadius:"50%", border:"1.5px solid #fff" }}/>
        </button>

        {/* Period selector */}
        <div style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px",
          borderRadius:8, border:`1px solid ${DS.border}`, background:"#fff",
          cursor:"pointer", fontSize:13, color:DS.t2, fontWeight:500 }}>
          <span style={{ color:DS.t4, fontSize:11 }}>📅</span>
          <span>2026A</span>
          <ChevronDown size={12} style={{ color:DS.t4 }}/>
        </div>

        {/* Avatar */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 8px 4px 4px",
          borderRadius:99, border:`1px solid ${DS.border}`, cursor:"pointer",
          transition:DS.fast, background:"#fff" }}>
          <Avatar name={nombre} sz={26}/>
          <span style={{ fontSize:13, fontWeight:600, color:DS.t1, letterSpacing:"-.01em",
            display:"none" }} className="topbar-uname">{nombre}</span>
          <ChevronDown size={12} style={{ color:DS.t4 }}/>
        </div>
      </div>
      <style>{`@media(min-width:640px){.topbar-uname{display:inline!important}}`}</style>
    </header>
  );
}

/* ══════════════════════════════════════════
   CHART DATA
══════════════════════════════════════════ */
const BAR_D = [
  {n:"Admón.",v:65},{n:"Derecho",v:72},{n:"Psicología",v:58},{n:"Diseño",v:80},{n:"Contaduría",v:61}
];
const LINE_D = [
  {m:"Ene",p:20,v:10,pe:15,r:3},{m:"Feb",p:28,v:18,pe:14,r:4},{m:"Mar",p:35,v:30,pe:12,r:3},
  {m:"Abr",p:40,v:38,pe:16,r:5},{m:"May",p:45,v:48,pe:18,r:4},{m:"Jun",p:48,v:56,pe:21,r:5},
];
const PIE_COLORS = [DS.amber, DS.blue, DS.purple, DS.green, DS.red, DS.gray];

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:DS.t1, border:"none", borderRadius:10, padding:"10px 14px",
      boxShadow:DS.s5, fontSize:12.5 }}>
      <p style={{ color:"rgba(255,255,255,.5)", marginBottom:6, fontSize:11.5 }}>{label}</p>
      {payload.map((p:any,i:number) => (
        <p key={i} style={{ color:"#fff", fontWeight:600 }}>
          <span style={{ color:p.color }}>{p.name}: </span>{p.value}
          {p.name==="Avance"?"%":""}
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
    {name:"Pendiente",  value:kpi?.equiv_pendientes??0},
    {name:"En proceso", value:kpi?.equiv_proceso??0},
    {name:"En revisión",value:0},
    {name:"Validadas",  value:kpi?.equiv_validadas??0},
    {name:"Rechazadas", value:kpi?.equiv_rechazadas??0},
    {name:"Finalizadas",value:kpi?.equiv_finalizadas??0},
  ];

  const KPIS = [
    { label:"Total alumnos", value:kpi?.total_estudiantes, icon:<Users size={16}/>,
      accent:DS.brand, accentSoft:"rgba(122,37,49,.06)", trend:"+12 este ciclo", trendUp:true },
    { label:"Equivalencias validadas", value:kpi?.equiv_validadas, icon:<CheckCircle size={16}/>,
      accent:DS.green, accentSoft:"rgba(22,163,74,.06)", trend:"45% del total", trendUp:true },
    { label:"En proceso", value:kpi?.equiv_proceso, icon:<Clock size={16}/>,
      accent:DS.blue, accentSoft:"rgba(37,99,235,.06)", trend:"38% del total", trendUp:null },
    { label:"Pendientes", value:kpi?.equiv_pendientes, icon:<AlertCircle size={16}/>,
      accent:DS.amber, accentSoft:"rgba(217,119,6,.06)", trend:"Requieren atención", trendUp:false },
    { label:"Rechazadas", value:kpi?.equiv_rechazadas, icon:<X size={16}/>,
      accent:DS.red, accentSoft:"rgba(220,38,38,.06)", trend:"Sin cambio", trendUp:null },
  ];

  return (
    <div className="page-wrap">
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:"clamp(20px,3vw,28px)" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80",
              boxShadow:"0 0 8px rgba(74,222,128,.7)" }}/>
            <span style={{ fontSize:12, color:DS.t3, fontWeight:500 }}>En línea · Actualizado hace 2 min</span>
          </div>
          <h1 className="page-title">¡Bienvenida, Candy García! 👋</h1>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn-secondary" style={{ fontSize:13 }}>
            <Upload size={13}/> Exportar
          </button>
          <button className="btn-primary" style={{ fontSize:13 }} onClick={()=>setActive("alumnos")}>
            <Plus size={13}/> Nuevo alumno
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {loading
          ? Array(5).fill(0).map((_,i)=><SkeletonCard key={i}/>)
          : KPIS.map((k,i) => (
            <div key={i} className="kpi-card"
              style={{ "--accent-soft":k.accentSoft } as React.CSSProperties}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ width:36, height:36, borderRadius:9,
                  background:k.accentSoft, display:"flex", alignItems:"center",
                  justifyContent:"center", color:k.accent }}>
                  {k.icon}
                </div>
                <ArrowUpRight size={14} style={{ color:DS.t4 }}/>
              </div>
              <div style={{ fontSize:"clamp(26px,4vw,34px)", fontWeight:900, color:DS.t1,
                letterSpacing:"-.04em", lineHeight:1, marginBottom:6 }}>
                {k.value??<Spinner/>}
              </div>
              <div style={{ fontSize:12.5, color:DS.t3, fontWeight:500, marginBottom:8, letterSpacing:"-.01em" }}>
                {k.label}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11.5 }}>
                {k.trendUp===true && <TrendingUp size={11} style={{ color:DS.green }}/>}
                <span style={{ color: k.trendUp===true?DS.green : k.trendUp===false?DS.amber : DS.t4, fontWeight:500 }}>
                  {k.trend}
                </span>
              </div>
            </div>
          ))
        }
      </div>

      {/* Charts */}
      <div className="charts-row">
        {/* Area chart */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div className="section-title">Equivalencias por período</div>
              <div style={{ fontSize:12, color:DS.t3, marginTop:2 }}>Ciclo 2025–2026</div>
            </div>
            <button className="btn-ghost" style={{ fontSize:12, padding:"5px 10px" }}>
              2026A <ChevronDown size={12}/>
            </button>
          </div>
          <div className="divider"/>
          <div style={{ padding:"16px 12px" }}>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={LINE_D}>
                <defs>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={DS.green} stopOpacity=".15"/>
                    <stop offset="95%" stopColor={DS.green} stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={DS.blue} stopOpacity=".12"/>
                    <stop offset="95%" stopColor={DS.blue} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize:11, fill:DS.t4 }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:11, fill:DS.t4 }} tickLine={false} axisLine={false}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Area type="monotone" dataKey="v" stroke={DS.green} strokeWidth={2}
                  fill="url(#gV)" name="Validadas" dot={false}/>
                <Area type="monotone" dataKey="p" stroke={DS.blue} strokeWidth={2}
                  fill="url(#gP)" name="En proceso" dot={false}/>
                <Line type="monotone" dataKey="pe" stroke={DS.amber} strokeWidth={1.5}
                  dot={false} name="Pendientes" strokeDasharray="4 4"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px" }}>
            <div className="section-title">Por estatus</div>
            <div style={{ fontSize:12, color:DS.t3, marginTop:2 }}>Distribución actual</div>
          </div>
          <div className="divider"/>
          <div style={{ padding:"16px 12px" }}>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={PIE_D} cx="50%" cy="45%" innerRadius={50} outerRadius={72}
                  dataKey="value" paddingAngle={3} strokeWidth={0}>
                  {PIE_D.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:10, border:"none", boxShadow:DS.s4, fontSize:12.5 }}/>
                <Legend iconSize={7} wrapperStyle={{ fontSize:11.5, color:DS.t3 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar */}
        <div className="card">
          <div style={{ padding:"16px 20px 12px" }}>
            <div className="section-title">Avance por carrera</div>
            <div style={{ fontSize:12, color:DS.t3, marginTop:2 }}>% completado</div>
          </div>
          <div className="divider"/>
          <div style={{ padding:"16px 12px" }}>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={BAR_D} barSize={20} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" horizontal={false}/>
                <XAxis type="number" tick={{ fontSize:11, fill:DS.t4 }} tickLine={false} axisLine={false}
                  domain={[0,100]} tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="n" tick={{ fontSize:11, fill:DS.t4 }}
                  tickLine={false} axisLine={false} width={65}/>
                <Tooltip content={<CUSTOM_TOOLTIP/>}/>
                <Bar dataKey="v" fill={DS.orange} radius={[0,5,5,0]} name="Avance"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="card">
        <div style={{ padding:"14px 18px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div className="section-title">Acciones rápidas</div>
          <Sparkles size={14} style={{ color:DS.orange }}/>
        </div>
        <div className="divider"/>
        <div style={{ padding:"clamp(12px,2vw,16px)" }}>
          <div className="shortcuts">
            {[
              {label:"Nuevo alumno",      icon:<Users size={18}/>,       fn:()=>setActive("alumnos"),       color:DS.brand},
              {label:"Equivalencia",      icon:<FileText size={18}/>,    fn:()=>setActive("equivalencias"), color:DS.blue},
              {label:"Buscar alumno",     icon:<Search size={18}/>,      fn:()=>setActive("alumnos"),       color:DS.purple},
              {label:"Plan de estudios",  icon:<BookOpen size={18}/>,    fn:()=>setActive("seguimiento"),   color:DS.green},
              {label:"Reporte",           icon:<BarChart2 size={18}/>,   fn:()=>setActive("reportes"),      color:DS.amber},
              {label:"Documentos",        icon:<Upload size={18}/>,      fn:()=>setActive("documentos"),    color:DS.orange},
            ].map(a => (
              <button key={a.label} onClick={a.fn}
                style={{ padding:"clamp(12px,2vw,16px) 8px", background:"transparent",
                  border:`1px solid ${DS.border}`, borderRadius:12, cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:9,
                  fontSize:"clamp(11.5px,1.5vw,13px)", fontWeight:500, color:DS.t2,
                  transition:DS.med, width:"100%", fontFamily:"inherit" }}
                onMouseEnter={e=>{
                  e.currentTarget.style.background=`rgba(${a.color==="DS.brand"?"122,37,49":
                    a.color===DS.blue?"37,99,235":a.color===DS.purple?"124,58,237":
                    a.color===DS.green?"22,163,74":"217,119,6"},.04)`;
                  e.currentTarget.style.borderColor=a.color;
                  e.currentTarget.style.transform="translateY(-2px)";
                  e.currentTarget.style.boxShadow=DS.s3;
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.background="transparent";
                  e.currentTarget.style.borderColor=DS.border;
                  e.currentTarget.style.transform="translateY(0)";
                  e.currentTarget.style.boxShadow="none";
                }}>
                <div style={{ width:40, height:40, borderRadius:10,
                  background:`${a.color}14`, display:"flex", alignItems:"center",
                  justifyContent:"center", color:a.color }}>
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
══════════════════════════════════════════ */
function AlumnosPage() {
  const [list, setList]     = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast]   = useState<{msg:string;ok:boolean}|null>(null);
  const [modal, setModal]   = useState<"new"|"edit"|null>(null);
  const [editing, setEditing] = useState<Estudiante|null>(null);
  const [form, setForm]     = useState({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async()=>{
    setLoading(true);
    const {data} = await supabase.from("estudiantes").select("*,carreras(nombre)").order("created_at",{ascending:false});
    if (data) setList(data as Estudiante[]);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  const filtered = list.filter(a=>
    a.nombre.toLowerCase().includes(search.toLowerCase())||
    a.matricula.includes(search)||a.correo.toLowerCase().includes(search.toLowerCase())
  );

  async function save() {
    setSaving(true);
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

  async function del(id:string,nombre:string) {
    if(!confirm(`¿Eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return;
    const {error}=await supabase.from("estudiantes").delete().eq("id",id);
    if(error) setToast({msg:error.message,ok:false});
    else { setToast({msg:"Alumno eliminado",ok:true}); load(); }
  }

  function openEdit(a:Estudiante) {
    setEditing(a); setModal("edit");
    setForm({nombre:a.nombre,correo:a.correo,matricula:a.matricula,ciclo:a.ciclo,estatus:a.estatus});
  }

  return (
    <div className="page-wrap">
      {toast && <Toast {...toast} onDone={()=>setToast(null)}/>}

      {/* Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ padding:"20px 24px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${DS.border}` }}>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:DS.t1, letterSpacing:"-.02em" }}>
                  {modal==="new"?"Registrar nuevo alumno":"Editar alumno"}
                </div>
                <div style={{ fontSize:13, color:DS.t3, marginTop:2 }}>
                  {modal==="new"?"Completa la información del estudiante":"Actualiza los datos del estudiante"}
                </div>
              </div>
              <button onClick={()=>setModal(null)} className="btn-ghost"
                style={{ padding:6, borderRadius:8 }}>
                <X size={18}/>
              </button>
            </div>

            <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              <div className="form-grid-2">
                {[{label:"Nombre completo",key:"nombre",type:"text",ph:"Ej. Ana Torres García"},
                  {label:"Matrícula",key:"matricula",type:"text",ph:"2026001"}].map(f=>(
                  <div key={f.key}>
                    <label className="field-label">{f.label}</label>
                    <input className="inp" value={(form as Record<string,string>)[f.key]}
                      onChange={e=>setForm({...form,[f.key]:e.target.value})}
                      type={f.type} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
              <div>
                <label className="field-label">Correo electrónico</label>
                <input className="inp" value={form.correo} onChange={e=>setForm({...form,correo:e.target.value})}
                  type="email" placeholder="alumno@correo.com"/>
              </div>
              <div className="form-grid-2">
                <div>
                  <label className="field-label">Ciclo académico</label>
                  <select className="inp sel" value={form.ciclo} onChange={e=>setForm({...form,ciclo:e.target.value})}>
                    {["2026A","2025B","2025A","2024B"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Estatus</label>
                  <select className="inp sel" value={form.estatus} onChange={e=>setForm({...form,estatus:e.target.value})}>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ padding:"14px 24px", borderTop:`1px solid ${DS.border}`,
              display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={()=>setModal(null)} className="btn-secondary">Cancelar</button>
              <button onClick={save} disabled={saving} className="btn-primary">
                {saving?<><Spinner size={13}/> Guardando…</>:modal==="new"?"Registrar alumno":"Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <div>
          <h1 className="page-title">Alumnos</h1>
          <p style={{ fontSize:13.5, color:DS.t3, marginTop:3 }}>
            {loading?"Cargando…":`${list.length} estudiantes registrados`}
          </p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn-secondary" style={{ fontSize:13 }}>
            <Filter size={13}/> Filtros
          </button>
          <button onClick={()=>{ setModal("new"); setForm({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"}); }}
            className="btn-primary" style={{ fontSize:13 }}>
            <Plus size={14}/> Nuevo alumno
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom:14, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200, maxWidth:360, position:"relative" }}>
          <Search size={13} style={{ position:"absolute", left:10, top:"50%",
            transform:"translateY(-50%)", color:DS.t4 }}/>
          <input style={{ width:"100%", padding:"8px 12px 8px 32px", background:"#fff",
            border:`1px solid ${DS.border}`, borderRadius:9, fontSize:13.5,
            outline:"none", fontFamily:"inherit", color:DS.t1, boxShadow:DS.s1 }}
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar por nombre, matrícula…"/>
        </div>
        <select className="sel" style={{ minWidth:140 }}>
          <option>Todos los ciclos</option>
          <option>2026A</option><option>2025B</option><option>2025A</option>
        </select>
        <select className="sel" style={{ minWidth:140 }}>
          <option>Todos los estatus</option>
          <option>Activo</option><option>Inactivo</option><option>Baja</option>
        </select>
      </div>

      {/* Table + Mobile cards */}
      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:"clamp(32px,6vw,56px)", textAlign:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
              <Spinner size={22}/>
              <div style={{ fontSize:14, color:DS.t3, fontWeight:500 }}>Cargando alumnos…</div>
            </div>
          </div>
        ) : filtered.length===0 ? (
          <EmptyState icon={<Users size={48}/>}
            title="No se encontraron alumnos"
            desc={search?"Intenta con otro término de búsqueda.":"Registra el primer alumno para comenzar."}/>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mobile-cards" style={{ padding:"12px" }}>
              {filtered.map(a => (
                <div key={a.id} style={{
                  border:`1px solid ${DS.border}`, borderRadius:12, padding:"14px 16px",
                  marginBottom:10, background:"#fff", transition:DS.fast,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <Avatar name={a.nombre} sz={40}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:14.5, color:DS.t1, letterSpacing:"-.01em" }}>{a.nombre}</div>
                      <div style={{ fontSize:12.5, color:DS.t3, marginTop:1 }}>{a.correo}</div>
                    </div>
                    <Badge s={a.estatus}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                    {[{l:"Matrícula",v:a.matricula},{l:"Ciclo",v:a.ciclo},{l:"Carrera",v:a.carreras?.nombre??"—"}].map(({l,v})=>(
                      <div key={l} style={{ background:DS.bg, borderRadius:8, padding:"7px 10px" }}>
                        <div style={{ fontSize:10.5, color:DS.t4, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>{l}</div>
                        <div style={{ fontSize:13, color:DS.t1, fontWeight:500, marginTop:2 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>openEdit(a)} className="btn-secondary" style={{ flex:1, fontSize:13, justifyContent:"center" }}>
                      <Pencil size={13}/> Editar
                    </button>
                    <button onClick={()=>del(a.id,a.nombre)} className="btn-danger" style={{ flex:1, fontSize:13, justifyContent:"center" }}>
                      <Trash2 size={13}/> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {["Alumno","Matrícula","Carrera","Ciclo","Estatus","Acciones"].map(h=>(
                      <th key={h}>{h}</th>
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
                            <div style={{ fontWeight:600, fontSize:13.5, color:DS.t1, letterSpacing:"-.01em" }}>{a.nombre}</div>
                            <div style={{ fontSize:12, color:DS.t3, marginTop:1 }}>{a.correo}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ background:DS.bg, color:DS.t2, padding:"2px 8px",
                          borderRadius:6, fontSize:12.5, fontFamily:"monospace", fontWeight:500 }}>
                          {a.matricula}
                        </code>
                      </td>
                      <td style={{ fontSize:13.5, color:DS.t2 }}>{a.carreras?.nombre??"—"}</td>
                      <td>
                        <span style={{ background:DS.blueM, color:DS.blue, padding:"3px 9px",
                          borderRadius:99, fontSize:12, fontWeight:600 }}>{a.ciclo}</span>
                      </td>
                      <td><Badge s={a.estatus}/></td>
                      <td>
                        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                          <button onClick={()=>openEdit(a)} className="btn-icon" title="Editar">
                            <Pencil size={13}/>
                          </button>
                          <button onClick={()=>del(a.id,a.nombre)} className="btn-icon"
                            title="Eliminar" style={{ color:DS.red, borderColor:"rgba(220,38,38,.2)" }}>
                            <Trash2 size={13}/>
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

        {/* Footer */}
        {!loading && (
          <div style={{ padding:"12px 16px", borderTop:`1px solid ${DS.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:8, fontSize:12.5 }}>
            <span style={{ color:DS.t3 }}>
              {filtered.length} de {list.length} alumnos
            </span>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:DS.green, fontSize:12 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:DS.green }}/>
              <span style={{ fontWeight:500 }}>Conectado a Supabase</span>
            </div>
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
    supabase.from("equivalencias").select("*,estudiantes(nombre,matricula)")
      .order("created_at",{ascending:false})
      .then(({data})=>{ if(data) setList(data as Equivalencia[]); setLoading(false); });
  },[]);

  return (
    <div className="page-wrap">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <div>
          <h1 className="page-title">Equivalencias</h1>
          <p style={{ fontSize:13.5, color:DS.t3, marginTop:3 }}>
            {loading?"Cargando…":`${list.length} registros en total`}
          </p>
        </div>
        <button className="btn-primary" style={{ fontSize:13 }}>
          <Plus size={14}/> Nueva equivalencia
        </button>
      </div>

      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:56, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
            <Spinner size={22}/>
            <div style={{ fontSize:14, color:DS.t3 }}>Cargando equivalencias…</div>
          </div>
        ) : list.length===0 ? (
          <EmptyState icon={<FileText size={48}/>}
            title="Sin equivalencias registradas"
            desc="Las equivalencias aparecerán aquí una vez registradas en la base de datos."/>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mobile-cards" style={{ padding:12 }}>
              {list.map(e=>(
                <div key={e.id} style={{ border:`1px solid ${DS.border}`, borderRadius:12,
                  padding:"14px 16px", marginBottom:10, background:"#fff" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:DS.t1 }}>{e.nombre_origen}</div>
                      <div style={{ fontSize:12, color:DS.t3, marginTop:2 }}>{e.clave_origen} · {e.institucion_origen}</div>
                    </div>
                    <Badge s={e.estatus}/>
                  </div>
                  <div style={{ fontSize:13, color:DS.t2, marginBottom:6 }}>
                    <span style={{ color:DS.t3 }}>Alumno: </span>{e.estudiantes?.nombre??"—"}
                  </div>
                  <div style={{ fontSize:13, color:DS.t2, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:DS.t3 }}>UAG: </span>{e.nombre_uag}
                    <span style={{ background:DS.blueM, color:DS.blue, padding:"2px 8px", borderRadius:99, fontSize:11.5, fontWeight:600 }}>{e.creditos} cr.</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {["Alumno","Materia Origen","Institución","Materia UAG","Créditos","Fecha","Estatus"].map(h=><th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {list.map(e=>(
                    <tr key={e.id}>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <Avatar name={e.estudiantes?.nombre??"?"} sz={28}/>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13, color:DS.t1 }}>{e.estudiantes?.nombre??"—"}</div>
                            <div style={{ fontSize:11.5, color:DS.t3 }}>{e.estudiantes?.matricula}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight:600, fontSize:13, color:DS.t1 }}>{e.nombre_origen}</div>
                        <div style={{ fontSize:11.5, color:DS.t3, marginTop:1 }}>{e.clave_origen}</div>
                      </td>
                      <td style={{ fontSize:13, color:DS.t2 }}>{e.institucion_origen}</td>
                      <td style={{ fontSize:13, color:DS.t1, fontWeight:500 }}>{e.nombre_uag}</td>
                      <td>
                        <span style={{ background:DS.blueM, color:DS.blue, padding:"3px 9px",
                          borderRadius:99, fontSize:12, fontWeight:600 }}>{e.creditos} cr.</span>
                      </td>
                      <td style={{ fontSize:12.5, color:DS.t3 }}>{e.fecha_solicitud}</td>
                      <td><Badge s={e.estatus}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {!loading && (
          <div style={{ padding:"11px 16px", borderTop:`1px solid ${DS.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontSize:12.5, color:DS.t3 }}>{list.length} equivalencias · datos en vivo</span>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:DS.green }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:DS.green }}/>
              <span style={{ fontWeight:500 }}>Supabase</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PLACEHOLDER ─── */
function PlaceholderPage({ title, subtitle, icon }: { title:string; subtitle:string; icon:React.ReactNode }) {
  return (
    <div className="page-wrap">
      <div style={{ marginBottom:24 }}>
        <h1 className="page-title">{title}</h1>
        <p style={{ fontSize:13.5, color:DS.t3, marginTop:4 }}>{subtitle}</p>
      </div>
      <div className="card">
        <EmptyState icon={icon}
          title="Módulo en desarrollo"
          desc="Este módulo estará disponible próximamente. Conecta las tablas en Supabase para activarlo."/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function UAGPage() {
  const [user,    setUser]    = useState<User|null>(null);
  const [active,  setActive]  = useState("dashboard");
  const [kpi,     setKpi]     = useState<KpiData|null>(null);
  const [checking,setChecking]= useState(true);
  const [sideOpen,setSideOpen]= useState(false);

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

  async function logout(){ await supabase.auth.signOut(); setUser(null); setActive("dashboard"); setKpi(null); }

  if(checking) return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        flexDirection:"column", gap:16, fontFamily:"inherit", background:DS.bg }}>
        <UAGLogo size={32}/>
        <div style={{ display:"flex", alignItems:"center", gap:10, color:DS.t3, fontSize:14 }}>
          <Spinner size={16}/> Verificando sesión…
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

  const PAGES: Record<string,React.ReactNode> = {
    dashboard:    <DashboardPage setActive={setActive} kpi={kpi}/>,
    alumnos:      <AlumnosPage/>,
    equivalencias:<EquivalenciasPage/>,
    seguimiento:  <PlaceholderPage title="Seguimiento Académico" subtitle="Monitorea el avance de cada estudiante" icon={<GraduationCap size={52}/>}/>,
    carreras:     <PlaceholderPage title="Carreras" subtitle="Catálogo de programas académicos" icon={<BookOpen size={52}/>}/>,
    reportes:     <PlaceholderPage title="Reportes e Indicadores" subtitle="Análisis y métricas de equivalencias" icon={<BarChart2 size={52}/>}/>,
    documentos:   <PlaceholderPage title="Gestión Documental" subtitle="Repositorio de documentos académicos" icon={<FolderOpen size={52}/>}/>,
    usuarios:     <PlaceholderPage title="Usuarios y Permisos" subtitle="Control de acceso basado en roles" icon={<UserCog size={52}/>}/>,
    config:       <PlaceholderPage title="Configuración" subtitle="Preferencias del sistema" icon={<Settings size={52}/>}/>,
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:DS.bg }}>
        <Sidebar active={active} setActive={v=>{ setActive(v); setSideOpen(false); }}
          user={user} onLogout={logout} open={sideOpen} onClose={()=>setSideOpen(false)}/>
        <div className="main-wrap" style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <Topbar user={user} onMenu={()=>setSideOpen(p=>!p)}/>
          <main style={{ flex:1, overflowY:"auto", overflowX:"hidden" }} key={active} className="fade-up">
            {PAGES[active]}
          </main>
        </div>
      </div>
    </>
  );
}
