"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Users, FileText, GraduationCap, BarChart2,
  FolderOpen, UserCog, BookOpen, Settings, Bell, HelpCircle,
  ChevronDown, Plus, Search, Eye, Pencil, Trash2, ArrowLeft,
  CheckCircle, Clock, Upload, ChevronRight, LogOut, Shield,
  AlertCircle, Loader2, X
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";

/* ─── SUPABASE CLIENT ─── */
const supabase = createBrowserClient(
  "https://nfvkhzrxfpqbyseacjvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdmtoenJ4ZnBxYnlzZWFjanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDkyNzAsImV4cCI6MjA5Nzg4NTI3MH0.c3fYMudpHh37ybQ21MKnTJ2GHlh3chJJZAdObQPp-o0"
);


/* ─── UAG LOGOS ─── */
function UAGLogoSmall({ white = false }: { white?: boolean }) {
  const bordo = white ? "#ffffff" : "#7a2531";
  const orange = "#ee750a";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
        <path d="M15 65 L5 15 L13 17 L28 60Z" fill={orange} opacity="0.9"/>
        <path d="M22 65 L12 10 L20 13 L32 62Z" fill={bordo} opacity="0.85"/>
        <path d="M30 65 L24 8 L32 12 L38 64Z" fill={bordo}/>
        <path d="M38 65 L36 7 L44 11 L42 64Z" fill={bordo}/>
        <path d="M46 65 L48 8 L56 12 L50 65Z" fill={bordo} opacity="0.85"/>
        <path d="M54 65 L60 12 L68 17 L58 65Z" fill={bordo} opacity="0.7"/>
        <path d="M4 70 Q38 78 72 70" stroke={orange} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div>
        <div style={{ fontWeight:900, fontSize:15, color:bordo, letterSpacing:"-0.03em", lineHeight:1 }}>UAG</div>
        <div style={{ display:"flex", alignItems:"center", gap:2, marginTop:1 }}>
          <svg width="10" height="10" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke={orange} strokeWidth="2.5"/>
            <line x1="10" y1="3" x2="10" y2="11" stroke={orange} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:11, fontWeight:700, color:white ? "rgba(255,255,255,0.9)" : "#7a2531" }}>nline</span>
        </div>
      </div>
    </div>
  );
}

function UAGLogoLogin() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
      <svg width="70" height="70" viewBox="0 0 80 80" fill="none">
        <path d="M15 65 L5 15 L13 17 L28 60Z" fill="#ee750a" opacity="0.9"/>
        <path d="M22 65 L12 10 L20 13 L32 62Z" fill="#ffffff" opacity="0.85"/>
        <path d="M30 65 L24 8 L32 12 L38 64Z" fill="#ffffff"/>
        <path d="M38 65 L36 7 L44 11 L42 64Z" fill="#ffffff"/>
        <path d="M46 65 L48 8 L56 12 L50 65Z" fill="#ffffff" opacity="0.85"/>
        <path d="M54 65 L60 12 L68 17 L58 65Z" fill="#ffffff" opacity="0.7"/>
        <path d="M4 70 Q38 78 72 70" stroke="#ee750a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{ borderLeft:"1px solid rgba(255,255,255,0.3)", paddingLeft:16 }}>
        <div style={{ fontWeight:900, fontSize:28, color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>UAG</div>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
          <svg width="14" height="14" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke="#ee750a" strokeWidth="2.5"/>
            <line x1="10" y1="3" x2="10" y2="11" stroke="#ee750a" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:18, fontWeight:700, color:"#ee750a" }}>nline</span>
        </div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", marginTop:4, textTransform:"uppercase", letterSpacing:"0.08em" }}>Powered by Arizona State University®</div>
      </div>
    </div>
  );
}


/* ─── RESPONSIVE STYLES ─── */
const responsiveCSS = `
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{margin:0}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-thumb{background:rgba(122,37,49,.25);border-radius:3px}

  /* Mobile sidebar overlay */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }
  .sidebar-overlay.open { display: block; }

  /* Responsive grid */
  @media (max-width: 1200px) {
    .kpi-grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
    .charts-3col { grid-template-columns: 1fr 1fr !important; }
    .shortcuts-6col { grid-template-columns: repeat(3, 1fr) !important; }
  }

  @media (max-width: 900px) {
    .main-content { margin-left: 0 !important; }
    .sidebar { transform: translateX(-100%); transition: transform .25s ease; }
    .sidebar.mobile-open { transform: translateX(0) !important; }
    .kpi-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
    .charts-3col { grid-template-columns: 1fr !important; }
    .shortcuts-6col { grid-template-columns: repeat(3, 1fr) !important; }
    .table-scroll { overflow-x: auto; }
    .hide-mobile { display: none !important; }
    .page-header-resp { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  }

  @media (max-width: 600px) {
    .kpi-grid-5 { grid-template-columns: 1fr 1fr !important; }
    .shortcuts-6col { grid-template-columns: repeat(2, 1fr) !important; }
    .header-search-hide { display: none !important; }
    .page-padding { padding: 16px !important; }
    .modal-inner { max-width: 95vw !important; margin: 10px !important; }
  }

  @media (max-width: 400px) {
    .kpi-grid-5 { grid-template-columns: 1fr !important; }
    .shortcuts-6col { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* Login responsive */
  @media (max-width: 768px) {
    .login-left-panel { display: none !important; }
    .login-right { padding: 32px 20px !important; }
  }

  /* Prevent horizontal overflow */
  html, body { overflow-x: hidden; max-width: 100vw; }
  
  /* Mobile header adjustments */
  @media (max-width: 600px) {
    .header-user-name { display: none; }
  }
`;

/* ─── DESIGN TOKENS ─── */
const C = {
  bordo:     "#7a2531",
  bordo2:    "#8b2c3a",
  bordo3:    "#5c1a22",
  bordo4:    "#4a1520",
  orange:    "#ee750a",
  bg:        "#F8F9FB",
  surface:   "#FFFFFF",
  border:    "#E8ECF0",
  borderL:   "#F0F3F7",
  text:      "#1A1A2E",
  textSec:   "#6B7280",
  textMuted: "#9CA3AF",
  green:     "#16A34A",
  greenL:    "#DCFCE7",
  blue:      "#2563EB",
  blueL:     "#DBEAFE",
  amber:     "#D97706",
  amberL:    "#FEF3C7",
  purple:    "#7C3AED",
  purpleL:   "#EDE9FE",
  red:       "#DC2626",
  redL:      "#FEE2E2",
  gray:      "#6B7280",
  grayL:     "#F3F4F6",
};

/* ─── TYPES ─── */
type Estudiante = {
  id: string;
  matricula: string;
  nombre: string;
  correo: string;
  telefono?: string;
  carrera_id?: string;
  ciclo: string;
  fecha_ingreso: string;
  estatus: string;
  carreras?: { nombre: string };
};

type Equivalencia = {
  id: string;
  estudiante_id: string;
  clave_origen: string;
  nombre_origen: string;
  institucion_origen: string;
  nombre_uag: string;
  creditos: number;
  fecha_solicitud: string;
  estatus: string;
  estudiantes?: { nombre: string; matricula: string };
};

type KpiData = {
  total_estudiantes: number;
  equiv_pendientes: number;
  equiv_proceso: number;
  equiv_validadas: number;
  equiv_rechazadas: number;
  equiv_finalizadas: number;
};

/* ─── HELPERS ─── */
function initials(name: string) {
  return name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, [string, string]> = {
    validado:      [C.green,  C.greenL],
    en_proceso:    [C.blue,   C.blueL],
    en_revision:   [C.amber,  C.amberL],
    pendiente:     [C.amber,  C.amberL],
    rechazado:     [C.red,    C.redL],
    finalizado:    [C.gray,   C.grayL],
    activo:        [C.green,  C.greenL],
    inactivo:      [C.gray,   C.grayL],
    baja:          [C.red,    C.redL],
  };
  const key = s?.toLowerCase().replace(/ /g,"_") ?? "";
  const [fg, bg] = map[key] ?? [C.gray, C.grayL];
  const label = s?.replace(/_/g," ");
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:bg, color:fg, padding:"3px 10px",
      borderRadius:20, fontSize:11.5, fontWeight:600, whiteSpace:"nowrap",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:fg, display:"inline-block" }}/>
      {label?.charAt(0).toUpperCase() + label?.slice(1)}
    </span>
  );
}

function Avatar({ name, sz=32 }: { name:string; sz?:number }) {
  return (
    <div style={{
      width:sz, height:sz, borderRadius:"50%",
      background:C.bordo, color:"#fff",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:sz*0.34, fontWeight:700, flexShrink:0,
    }}>
      {initials(name)}
    </div>
  );
}

function Spin() {
  return <Loader2 size={16} style={{ animation:"spin 1s linear infinite", display:"inline-block" }}/>;
}

function Toast({ msg, ok }: { msg:string; ok:boolean }) {
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, zIndex:9999,
      background: ok ? C.green : C.red, color:"#fff",
      padding:"12px 20px", borderRadius:10, fontSize:13, fontWeight:600,
      boxShadow:"0 8px 24px rgba(0,0,0,.2)", display:"flex", alignItems:"center", gap:8,
      animation:"fadeIn .2s ease",
    }}>
      {ok ? <CheckCircle size={15}/> : <AlertCircle size={15}/>} {msg}
    </div>
  );
}

/* ════════════════════════════════════════
   LOGIN PAGE
════════════════════════════════════════ */
function LoginPage({ onLogin }: { onLogin: (u:User) => void }) {
  const [email, setEmail]   = useState("");
  const [pass,  setPass]    = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !pass) { setError("Completa todos los campos."); return; }
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (data.user) onLogin(data.user);
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"Inter,sans-serif" }}>
      {/* Left - hidden on mobile */}
      <div style={{
        flex:"0 0 45%", background:`linear-gradient(160deg,${C.bordo4} 0%,${C.bordo} 100%)`,
        position:"relative", overflow:"hidden", padding:"48px 52px",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
      }} className="login-left-panel">
        <div style={{ position:"absolute", inset:0, opacity:.05,
          backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:52 }}>
            <UAGLogoLogin/>
          </div>
          <div style={{ color:"rgba(255,255,255,.55)", fontSize:12, letterSpacing:".06em", textTransform:"uppercase", marginBottom:4 }}>
            Powered by Arizona State University®
          </div>
          <h1 style={{ color:"#fff", fontSize:34, fontWeight:800, lineHeight:1.15, letterSpacing:"-0.03em", marginBottom:20 }}>
            Plataforma de Gestión<br/>de Equivalencias y<br/>Seguimiento Académico
          </h1>
          <div style={{ width:48, height:3, background:C.orange, borderRadius:2, marginBottom:24 }}/>
          <p style={{ color:"rgba(255,255,255,.72)", fontSize:14.5, lineHeight:1.65, maxWidth:340 }}>
            Gestiona, consulta y da seguimiento al proceso de equivalencias académicas y al avance de nuestros estudiantes.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginTop:52 }}>
            {[
              [<Users size={20}/>,          "Gestión de\nAlumnos"],
              [<FileText size={20}/>,        "Control de\nEquivalencias"],
              [<GraduationCap size={20}/>,   "Seguimiento\nAcadémico"],
              [<BarChart2 size={20}/>,       "Reportes e\nIndicadores"],
            ].map(([icon, label], i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <div style={{ color:C.orange, marginTop:1, flexShrink:0 }}>{icon as React.ReactNode}</div>
                <span style={{ color:"rgba(255,255,255,.75)", fontSize:13, whiteSpace:"pre-line", lineHeight:1.4 }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"relative", zIndex:1, color:"rgba(255,255,255,.4)", fontSize:11 }}>
          © 2026 UAG Online. Todos los derechos reservados.
        </div>
      </div>

      {/* Right */}
      <div style={{ flex:1, background:"#FAFBFC", display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <h2 style={{ fontSize:26, fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:6 }}>Iniciar sesión</h2>
          <p style={{ color:C.textSec, fontSize:13.5, marginBottom:36 }}>Accede a tu cuenta para continuar</p>

          {/* Email */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:C.textSec, marginBottom:7, textTransform:"uppercase", letterSpacing:".05em" }}>
              Correo institucional
            </label>
            <div style={{ position:"relative" }}>
              <FileText size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}/>
              <input value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key==="Enter" && handleLogin()}
                placeholder="usuario@uag.mx" type="email"
                style={{ width:"100%", padding:"11px 14px 11px 38px", border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:13.5, color:C.text, background:"#fff", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor=C.bordo}
                onBlur={e => e.target.style.borderColor=C.border}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:C.textSec, marginBottom:7, textTransform:"uppercase", letterSpacing:".05em" }}>
              Contraseña
            </label>
            <div style={{ position:"relative" }}>
              <Shield size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}/>
              <input value={pass} onChange={e => setPass(e.target.value)} type="password"
                onKeyDown={e => e.key==="Enter" && handleLogin()}
                placeholder="Ingresa tu contraseña"
                style={{ width:"100%", padding:"11px 14px 11px 38px", border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:13.5, color:C.text, background:"#fff", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
              />
            </div>
          </div>

          {error && (
            <div style={{ background:C.redL, color:C.red, padding:"9px 14px", borderRadius:8, fontSize:12.5, marginBottom:14, display:"flex", alignItems:"center", gap:7 }}>
              <AlertCircle size={14}/> {error}
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, fontSize:13 }}>
            <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", color:C.textSec }}>
              <input type="checkbox" defaultChecked style={{ accentColor:C.bordo }}/> Recordarme
            </label>
            <span style={{ color:C.bordo, fontWeight:500, cursor:"pointer", fontSize:12.5 }}>¿Olvidaste tu contraseña?</span>
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", padding:"13px", background: loading ? C.bordo3 : C.bordo, color:"#fff", border:"none", borderRadius:9, fontSize:15, fontWeight:700, cursor: loading ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {loading ? <><Spin/> Verificando…</> : <>Iniciar sesión <ChevronRight size={18}/></>}
          </button>

          <div style={{ textAlign:"center", marginTop:28, fontSize:12, color:C.textMuted }}>
            ¿Necesitas ayuda? Contacta al <span style={{ color:C.bordo, fontWeight:500, cursor:"pointer" }}>soporte técnico</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════ */
const NAV = [
  { id:"dashboard",    label:"Inicio",               icon:<LayoutDashboard size={17}/> },
  { id:"alumnos",      label:"Alumnos",              icon:<Users size={17}/> },
  { id:"equivalencias",label:"Equivalencias",        icon:<FileText size={17}/> },
  { id:"seguimiento",  label:"Seguimiento Académico",icon:<GraduationCap size={17}/> },
  { id:"carreras",     label:"Carreras",             icon:<BookOpen size={17}/> },
  { id:"reportes",     label:"Reportes",             icon:<BarChart2 size={17}/> },
  { id:"documentos",   label:"Documentos",           icon:<FolderOpen size={17}/> },
  { id:"usuarios",     label:"Usuarios",             icon:<UserCog size={17}/> },
  { id:"catalogos",    label:"Catálogos",            icon:<BookOpen size={17}/> },
  { id:"config",       label:"Configuración",        icon:<Settings size={17}/> },
];

function Sidebar({ active, setActive, user, onLogout, mobileOpen, onClose }: {
  active:string; setActive:(s:string)=>void; user:User|null; onLogout:()=>void; mobileOpen:boolean; onClose:()=>void;
}) {
  const [hoverLogout, setHoverLogout] = useState(false);
  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? "open" : ""}`} onClick={onClose}/>
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`} style={{ width:210, background:C.bordo4, height:"100vh", position:"fixed", display:"flex", flexDirection:"column", zIndex:100, transition:"transform .25s ease" }}>
      <div style={{ padding:"16px 16px 14px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
        <UAGLogoSmall white={true}/>
      </div>
      <nav style={{ flex:1, overflowY:"auto", padding:"10px 0" }}>
        {NAV.map(item => {
          const on = active === item.id;
          return (
            <div key={item.id} onClick={() => { setActive(item.id); onClose(); }}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"9.5px 20px", cursor:"pointer",
                background: on ? C.orange : "transparent",
                color: on ? "#fff" : "rgba(255,255,255,.6)",
                fontSize:13, fontWeight: on ? 700 : 400,
                borderLeft: on ? "3px solid rgba(255,255,255,.4)" : "3px solid transparent",
                transition:"all .13s",
              }}
              onMouseEnter={e => { if(!on) e.currentTarget.style.background="rgba(255,255,255,.07)"; }}
              onMouseLeave={e => { if(!on) e.currentTarget.style.background="transparent"; }}
            >
              <span style={{ opacity: on ? 1 : .75 }}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>
      <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
        {user && (
          <div style={{ marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
            <Avatar name={user.email ?? "U"} sz={28}/>
            <div>
              <div style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,.85)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:130 }}>
                {user.email}
              </div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>Conectado</div>
            </div>
          </div>
        )}
        <div style={{ color:C.orange, fontWeight:700, fontSize:12, textAlign:"center", marginBottom:2 }}>Excelencia</div>
        <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, textAlign:"center", marginBottom:10 }}>que te acompaña</div>
        <button onClick={onLogout}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          style={{ width:"100%", padding:"8px", background: hoverLogout ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:7, color:"rgba(255,255,255,.6)", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"all .13s" }}>
          <LogOut size={13}/> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════
   HEADER
════════════════════════════════════════ */
function Header({ user, onMenuToggle }: { user:User|null; onMenuToggle:()=>void }) {
  const nombre = user?.user_metadata?.nombre ?? user?.email?.split("@")[0] ?? "Usuario";
  return (
    <header style={{ height:60, background:"#fff", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px 0 20px", position:"sticky", top:0, zIndex:90, boxShadow:"0 1px 3px rgba(0,0,0,.05)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onMenuToggle} style={{ width:36, height:36, border:`1px solid ${C.border}`, background:"#fff", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.textSec, flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <UAGLogoSmall white={false}/>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ position:"relative", cursor:"pointer" }}>
          <Bell size={19} color={C.textSec}/>
          <div style={{ position:"absolute", top:-3, right:-3, background:C.orange, color:"#fff", borderRadius:"50%", width:14, height:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8.5, fontWeight:800, border:"2px solid #fff" }}>3</div>
        </div>
        <HelpCircle size={19} color={C.textSec} style={{ cursor:"pointer" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", padding:"5px 10px 5px 5px", borderRadius:8, border:`1px solid ${C.border}` }}>
          <Avatar name={nombre} sz={28}/>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:C.text, lineHeight:1.2 }}>{nombre}</div>
            <div style={{ fontSize:10.5, color:C.textMuted }}>Jefa de Admisiones</div>
          </div>
          <ChevronDown size={13} color={C.textMuted}/>
        </div>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════ */
const BAR_DATA  = [{ name:"Administración",valor:65 },{ name:"Derecho",valor:72 },{ name:"Psicología",valor:58 },{ name:"Diseño",valor:80 },{ name:"Contaduría",valor:61 }];
const LINE_DATA = [{ mes:"Ene",proceso:20,validadas:10,pendientes:15,rechazadas:3 },{ mes:"Feb",proceso:28,validadas:18,pendientes:14,rechazadas:4 },{ mes:"Mar",proceso:35,validadas:30,pendientes:12,rechazadas:3 },{ mes:"Abr",proceso:40,validadas:38,pendientes:16,rechazadas:5 },{ mes:"May",proceso:45,validadas:48,pendientes:18,rechazadas:4 },{ mes:"Jun",proceso:48,validadas:56,pendientes:21,rechazadas:5 }];

function DashboardPage({ setActive, kpi }: { setActive:(s:string)=>void; kpi:KpiData|null }) {
  const card = { background:"#fff", border:`1px solid ${C.borderL}`, borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,.04)", overflow:"hidden" };
  const DOUGHNUT = [
    { name:"Pendiente",   value: kpi?.equiv_pendientes ?? 0,  color:C.orange },
    { name:"En proceso",  value: kpi?.equiv_proceso ?? 0,     color:C.blue   },
    { name:"Validadas",   value: kpi?.equiv_validadas ?? 0,   color:C.green  },
    { name:"Rechazadas",  value: kpi?.equiv_rechazadas ?? 0,  color:C.red    },
    { name:"Finalizadas", value: kpi?.equiv_finalizadas ?? 0, color:C.gray   },
  ];

  return (
    <div className="page-padding" style={{ padding:"24px 28px", maxWidth:1400 }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:4 }}>¡Bienvenida, Candy García!</h1>
          <p style={{ fontSize:13, color:C.textSec }}>Aquí tienes un resumen general de la gestión académica.</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, fontWeight:500, color:C.textSec, background:"#fff" }}>
          📅 Periodo actual: <strong style={{ color:C.text }}>2026A</strong> <ChevronDown size={13}/>
        </div>
      </div>

      {/* KPIs — live from Supabase */}
      <div className="kpi-grid-5" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:22 }}>
        {[
          { label:"Total alumnos",              value: kpi?.total_estudiantes ?? "—",  icon:<Users size={18}/>,         sub:"Activos"          },
          { label:"Equivalencias en proceso",   value: kpi?.equiv_proceso ?? "—",      icon:<FileText size={18}/>,      sub:"38% del total"    },
          { label:"Equivalencias validadas",    value: kpi?.equiv_validadas ?? "—",    icon:<CheckCircle size={18}/>,   sub:"45% del total"    },
          { label:"Equivalencias pendientes",   value: kpi?.equiv_pendientes ?? "—",   icon:<Clock size={18}/>,         sub:"17% del total"    },
          { label:"Usuarios activos",           value: 34,                             icon:<UserCog size={18}/>,       sub:"En el sistema"    },
        ].map((k,i) => (
          <div key={i} style={{ background:"#fff", border:`1px solid ${C.borderL}`, borderRadius:12, padding:"20px 22px", boxShadow:"0 1px 3px rgba(0,0,0,.04)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:11, color:C.textMuted, fontWeight:500, textTransform:"uppercase", letterSpacing:".05em", marginBottom:6 }}>{k.label}</div>
                <div style={{ fontSize:30, fontWeight:800, color:C.text, letterSpacing:"-0.03em", lineHeight:1 }}>
                  {kpi === null ? <Spin/> : k.value}
                </div>
              </div>
              <div style={{ width:40, height:40, borderRadius:10, background:"rgba(107,29,29,.08)", display:"flex", alignItems:"center", justifyContent:"center", color:C.bordo, flexShrink:0 }}>{k.icon}</div>
            </div>
            <div style={{ fontSize:11.5, color:C.green, marginTop:6 }}>✅ {k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="charts-3col" style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1.6fr", gap:16, marginBottom:18 }}>
        <div style={card}>
          <div style={{ padding:"15px 20px 12px", borderBottom:`1px solid ${C.borderL}`, display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontWeight:700, fontSize:13.5, color:C.text }}>Avance académico por carrera</span>
          </div>
          <div style={{ padding:"16px 20px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={BAR_DATA} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderL} vertical={false}/>
                <XAxis dataKey="name" tick={{ fontSize:10, fill:C.textSec }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:10, fill:C.textMuted }} tickLine={false} axisLine={false} domain={[0,100]} tickFormatter={v=>`${v}%`}/>
                <Tooltip formatter={v=>[`${v}%`,"Avance"]} contentStyle={{ fontSize:12, borderRadius:8 }}/>
                <Bar dataKey="valor" fill={C.orange} radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={card}>
          <div style={{ padding:"15px 20px 12px", borderBottom:`1px solid ${C.borderL}` }}>
            <span style={{ fontWeight:700, fontSize:13.5, color:C.text }}>Equivalencias por estatus</span>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={DOUGHNUT} cx="50%" cy="45%" innerRadius={45} outerRadius={68} dataKey="value" paddingAngle={2}>
                  {DOUGHNUT.map((d,i) => <Cell key={i} fill={d.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ fontSize:11, borderRadius:8 }}/>
                <Legend iconSize={8} wrapperStyle={{ fontSize:10.5 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={card}>
          <div style={{ padding:"15px 20px 12px", borderBottom:`1px solid ${C.borderL}` }}>
            <span style={{ fontWeight:700, fontSize:13.5, color:C.text }}>Equivalencias por período</span>
          </div>
          <div style={{ padding:"16px 20px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={LINE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderL} vertical={false}/>
                <XAxis dataKey="mes" tick={{ fontSize:10, fill:C.textSec }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:10, fill:C.textMuted }} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ fontSize:11, borderRadius:8 }}/>
                <Legend iconSize={8} wrapperStyle={{ fontSize:10.5 }}/>
                <Line type="monotone" dataKey="proceso" stroke={C.blue} strokeWidth={2} dot={false} name="En proceso"/>
                <Line type="monotone" dataKey="validadas" stroke={C.green} strokeWidth={2} dot={false} name="Validadas"/>
                <Line type="monotone" dataKey="pendientes" stroke={C.amber} strokeWidth={2} dot={false} name="Pendientes"/>
                <Line type="monotone" dataKey="rechazadas" stroke={C.red} strokeWidth={2} dot={false} name="Rechazadas"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Atajos rápidos */}
      <div style={card}>
        <div style={{ padding:"15px 20px 12px", borderBottom:`1px solid ${C.borderL}` }}>
          <span style={{ fontWeight:700, fontSize:13.5, color:C.text }}>Atajos rápidos</span>
        </div>
        <div className="shortcuts-6col" style={{ padding:"16px 20px", display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
          {[
            { label:"Nuevo alumno",       icon:<Users size={20}/>,          fn:()=>setActive("alumnos")        },
            { label:"Nueva equivalencia", icon:<FileText size={20}/>,       fn:()=>setActive("equivalencias")  },
            { label:"Buscar alumno",      icon:<Search size={20}/>,         fn:()=>setActive("alumnos")        },
            { label:"Plan de estudios",   icon:<BookOpen size={20}/>,       fn:()=>setActive("seguimiento")    },
            { label:"Reporte general",    icon:<BarChart2 size={20}/>,      fn:()=>setActive("reportes")       },
            { label:"Subir documento",    icon:<Upload size={20}/>,         fn:()=>setActive("documentos")     },
          ].map(a => (
            <button key={a.label} onClick={a.fn}
              style={{ padding:"14px 8px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:9, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:12, fontWeight:600, color:C.textSec, transition:"all .13s", textAlign:"center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.bordo; e.currentTarget.style.color=C.bordo; e.currentTarget.style.background="rgba(107,29,29,.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textSec; e.currentTarget.style.background=C.bg; }}
            >
              <div style={{ color:C.bordo }}>{a.icon}</div>{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ALUMNOS — full CRUD
════════════════════════════════════════ */
function AlumnosPage() {
  const [list, setList]     = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast]   = useState<{ msg:string; ok:boolean }|null>(null);
  const [modal, setModal]   = useState<"new"|"edit"|null>(null);
  const [editing, setEditing] = useState<Estudiante|null>(null);
  const [form, setForm]     = useState({ nombre:"", correo:"", matricula:"", ciclo:"2026A", estatus:"activo" });
  const [saving, setSaving] = useState(false);

  const showToast = (msg:string, ok=true) => { setToast({ msg, ok }); setTimeout(()=>setToast(null), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("estudiantes")
      .select("*, carreras(nombre)")
      .order("created_at", { ascending:false });
    if (!error && data) setList(data as Estudiante[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = list.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.matricula.includes(search) ||
    a.correo.toLowerCase().includes(search.toLowerCase())
  );

  async function save() {
    setSaving(true);
    if (modal === "new") {
      const { error } = await supabase.from("estudiantes").insert([form]);
      if (error) showToast(error.message, false);
      else { showToast("Alumno registrado ✓"); load(); setModal(null); }
    } else if (editing) {
      const { error } = await supabase.from("estudiantes").update(form).eq("id", editing.id);
      if (error) showToast(error.message, false);
      else { showToast("Alumno actualizado ✓"); load(); setModal(null); }
    }
    setSaving(false);
  }

  async function del(id:string) {
    if (!confirm("¿Eliminar este alumno?")) return;
    const { error } = await supabase.from("estudiantes").delete().eq("id", id);
    if (error) showToast(error.message, false);
    else { showToast("Alumno eliminado"); load(); }
  }

  function openEdit(a:Estudiante) {
    setEditing(a);
    setForm({ nombre:a.nombre, correo:a.correo, matricula:a.matricula, ciclo:a.ciclo, estatus:a.estatus });
    setModal("edit");
  }

  return (
    <div className="page-padding" style={{ padding:"24px 28px" }}>
      {toast && <Toast {...toast}/>}

      {/* Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", borderRadius:14, width:480, maxHeight:"90vh", overflow:"auto", boxShadow:"0 24px 64px rgba(0,0,0,.2)" }}>
            <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontWeight:700, fontSize:16, color:C.text }}>{modal==="new" ? "Nuevo alumno" : "Editar alumno"}</span>
              <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", cursor:"pointer", color:C.textMuted }}><X size={18}/></button>
            </div>
            <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { label:"Nombre completo", key:"nombre",   type:"text",  ph:"Ej. Ana María Torres" },
                { label:"Matrícula",       key:"matricula",type:"text",  ph:"2026001" },
                { label:"Correo",          key:"correo",   type:"email", ph:"alumno@correo.com" },
                { label:"Ciclo",           key:"ciclo",    type:"text",  ph:"2026A" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textSec, textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 }}>{f.label}</label>
                  <input value={(form as Record<string,string>)[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} type={f.type} placeholder={f.ph}
                    style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, color:C.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                    onFocus={e => e.target.style.borderColor=C.bordo}
                    onBlur={e => e.target.style.borderColor=C.border}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textSec, textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 }}>Estatus</label>
                <select value={form.estatus} onChange={e => setForm({...form,estatus:e.target.value})}
                  style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, color:C.text, outline:"none", fontFamily:"inherit" }}>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
            <div style={{ padding:"14px 24px", borderTop:`1px solid ${C.border}`, display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>setModal(null)} style={{ padding:"9px 18px", border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, background:"#fff", cursor:"pointer", color:C.textSec }}>Cancelar</button>
              <button onClick={save} disabled={saving}
                style={{ padding:"9px 18px", background: saving ? C.bordo3 : C.bordo, color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor: saving ? "not-allowed":"pointer", display:"flex", alignItems:"center", gap:6 }}>
                {saving ? <><Spin/> Guardando…</> : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-0.03em" }}>Alumnos</h1>
        <button onClick={()=>{ setModal("new"); setForm({ nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo" }); }}
          style={{ background:C.bordo, color:"#fff", border:"none", borderRadius:8, padding:"9px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
          <Plus size={15}/> Nuevo alumno
        </button>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, background:"#fff", border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px", maxWidth:320 }}>
        <Search size={14} color={C.textMuted}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Nombre, matrícula o correo"
          style={{ border:"none", background:"transparent", fontSize:13, color:C.text, outline:"none", fontFamily:"inherit", width:"100%" }}/>
      </div>

      <div style={{ background:"#fff", border:`1px solid ${C.borderL}`, borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}>
        {loading ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <Spin/> Cargando alumnos desde Supabase…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted }}>
            {list.length === 0
              ? "No hay alumnos en la base de datos. ¡Crea el primero!"
              : "No se encontraron resultados para tu búsqueda."}
          </div>
        ) : (
          <div className="table-scroll"><table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
            <thead>
              <tr style={{ background:C.bg }}>
                {["#","Matrícula","Alumno","Carrera","Ciclo","Estatus","Acciones"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", fontSize:10.5, fontWeight:700, color:C.textMuted, textAlign:"left", textTransform:"uppercase", letterSpacing:".05em", borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a,i) => (
                <tr key={a.id} style={{ borderBottom:`1px solid ${C.borderL}` }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(107,29,29,.025)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                >
                  <td style={{ padding:"12px 14px", fontSize:12, color:C.textMuted }}>{i+1}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ fontFamily:"monospace", fontSize:11.5, background:C.bg, padding:"2px 7px", borderRadius:5, color:C.textSec }}>{a.matricula}</span>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <Avatar name={a.nombre} sz={30}/>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{a.nombre}</div>
                        <div style={{ fontSize:11, color:C.textMuted }}>{a.correo}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px", fontSize:12.5, color:C.textSec }}>{a.carreras?.nombre ?? "—"}</td>
                  <td style={{ padding:"12px 14px" }}>
                    <span style={{ background:C.blueL, color:C.blue, padding:"2px 8px", borderRadius:6, fontSize:11.5, fontWeight:600 }}>{a.ciclo}</span>
                  </td>
                  <td style={{ padding:"12px 14px" }}><StatusBadge s={a.estatus}/></td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", gap:5 }}>
                      <button onClick={()=>openEdit(a)}
                        style={{ width:28,height:28,border:`1px solid ${C.border}`,background:"#fff",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textSec }}>
                        <Pencil size={13}/>
                      </button>
                      <button onClick={()=>del(a.id)}
                        style={{ width:28,height:28,border:`1px solid ${C.border}`,background:"#fff",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textSec }}>
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:`1px solid ${C.borderL}`, fontSize:12, color:C.textMuted }}>
          <span>Mostrando {filtered.length} de {list.length} alumnos · base de datos en vivo</span>
          <span style={{ fontSize:11, color:C.green, display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block" }}/>
            Conectado a Supabase
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   EQUIVALENCIAS — live data
════════════════════════════════════════ */
function EquivalenciasPage() {
  const [list, setList] = useState<Equivalencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("equivalencias")
      .select("*, estudiantes(nombre, matricula)")
      .order("created_at", { ascending:false })
      .then(({ data }) => { if(data) setList(data as Equivalencia[]); setLoading(false); });
  }, []);

  return (
    <div className="page-padding" style={{ padding:"24px 28px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-0.03em" }}>Equivalencias</h1>
        <button style={{ background:C.bordo, color:"#fff", border:"none", borderRadius:8, padding:"9px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
          <Plus size={15}/> Nueva equivalencia
        </button>
      </div>

      <div style={{ background:"#fff", border:`1px solid ${C.borderL}`, borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}>
        {loading ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <Spin/> Cargando equivalencias…
          </div>
        ) : list.length === 0 ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted }}>
            <FileText size={40} style={{ opacity:.2, marginBottom:12 }}/>
            <div style={{ fontWeight:600 }}>No hay equivalencias registradas</div>
            <div style={{ fontSize:12.5, marginTop:4 }}>Las equivalencias aparecerán aquí una vez que se registren en la base de datos.</div>
          </div>
        ) : (
          <div className="table-scroll"><table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
            <thead>
              <tr style={{ background:C.bg }}>
                {["Alumno","Materia Origen","Institución","Materia UAG","Créditos","Fecha","Estatus"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", fontSize:10.5, fontWeight:700, color:C.textMuted, textAlign:"left", textTransform:"uppercase", letterSpacing:".05em", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((e,i) => (
                <tr key={e.id} style={{ borderBottom:`1px solid ${C.borderL}` }}>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Avatar name={e.estudiantes?.nombre ?? "?"} sz={28}/>
                      <div>
                        <div style={{ fontSize:12.5, fontWeight:600, color:C.text }}>{e.estudiantes?.nombre ?? "—"}</div>
                        <div style={{ fontSize:11, color:C.textMuted }}>{e.estudiantes?.matricula}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:12.5, fontWeight:600 }}>{e.clave_origen}</div>
                    <div style={{ fontSize:11.5, color:C.textSec }}>{e.nombre_origen}</div>
                  </td>
                  <td style={{ padding:"12px 14px", fontSize:12, color:C.textSec }}>{e.institucion_origen}</td>
                  <td style={{ padding:"12px 14px", fontSize:12.5 }}>{e.nombre_uag}</td>
                  <td style={{ padding:"12px 14px", textAlign:"center" }}>
                    <span style={{ background:C.blueL, color:C.blue, padding:"2px 8px", borderRadius:6, fontSize:11.5, fontWeight:600 }}>{e.creditos} cr.</span>
                  </td>
                  <td style={{ padding:"12px 14px", fontSize:11.5, color:C.textMuted }}>{e.fecha_solicitud}</td>
                  <td style={{ padding:"12px 14px" }}><StatusBadge s={e.estatus}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${C.borderL}`, fontSize:11, color:C.green, display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block" }}/>
          Datos en vivo desde Supabase · {list.length} registros
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   PLACEHOLDER
════════════════════════════════════════ */
function PlaceholderPage({ title, icon }: { title:string; icon:React.ReactNode }) {
  return (
    <div className="page-padding" style={{ padding:"24px 28px" }}>
      <h1 style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-0.03em", marginBottom:24 }}>{title}</h1>
      <div style={{ background:"#fff", border:`1px solid ${C.borderL}`, borderRadius:12, padding:"60px 24px", textAlign:"center", color:C.textMuted }}>
        <div style={{ color:C.bordo, opacity:.2, marginBottom:14 }}>{icon}</div>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:6 }}>Módulo en construcción</div>
        <div style={{ fontSize:13 }}>Conecta las tablas en Supabase y este módulo cobrará vida automáticamente.</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT APP
════════════════════════════════════════ */
export default function UAGPage() {
  const [user,   setUser]   = useState<User|null>(null);
  const [active, setActive] = useState("dashboard");
  const [kpi,    setKpi]    = useState<KpiData|null>(null);
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Restore session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load KPI when logged in
  useEffect(() => {
    if (!user) return;
    async function loadKpi() {
      // Try the view first; fall back to individual counts if view doesn't exist yet
      const { data, error } = await supabase.from("v_kpi_dashboard").select("*").single();
      if (!error && data) {
        setKpi(data as KpiData);
        return;
      }
      // Fallback: count individual tables
      const [e, pend, proc, val, rej, fin] = await Promise.all([
        supabase.from("estudiantes").select("id", { count:"exact", head:true }),
        supabase.from("equivalencias").select("id", { count:"exact", head:true }).eq("estatus","pendiente"),
        supabase.from("equivalencias").select("id", { count:"exact", head:true }).eq("estatus","en_proceso"),
        supabase.from("equivalencias").select("id", { count:"exact", head:true }).eq("estatus","validado"),
        supabase.from("equivalencias").select("id", { count:"exact", head:true }).eq("estatus","rechazado"),
        supabase.from("equivalencias").select("id", { count:"exact", head:true }).eq("estatus","finalizado"),
      ]);
      setKpi({
        total_estudiantes: e.count ?? 0,
        equiv_pendientes:  pend.count ?? 0,
        equiv_proceso:     proc.count ?? 0,
        equiv_validadas:   val.count ?? 0,
        equiv_rechazadas:  rej.count ?? 0,
        equiv_finalizadas: fin.count ?? 0,
      });
    }
    loadKpi();
  }, [user]);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setActive("dashboard");
    setKpi(null);
  }

  // Checking session spinner
  if (checking) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif", color:C.textMuted, gap:10 }}>
        <Spin/> Verificando sesión…
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ fontFamily:"Inter,system-ui,sans-serif" }}>
          <LoginPage onLogin={u => setUser(u)}/>
        </div>
      </>
    );
  }

  const PAGE_TITLE: Record<string,string> = {
    dashboard:"Inicio", alumnos:"Alumnos", equivalencias:"Equivalencias",
    seguimiento:"Seguimiento Académico", carreras:"Carreras", reportes:"Reportes",
    documentos:"Documentos", usuarios:"Usuarios", catalogos:"Catálogos", config:"Configuración",
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={{ fontFamily:"Inter,system-ui,sans-serif", display:"flex", minHeight:"100vh", background:C.bg }}>
        <Sidebar active={active} setActive={setActive} user={user} onLogout={logout} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)}/>
        <div className="main-content" style={{ marginLeft:210, flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <Header user={user} onMenuToggle={() => setMobileOpen(!mobileOpen)}/>
          <main style={{ flex:1, overflowY:"auto" }}>
            {active==="dashboard"     && <DashboardPage setActive={setActive} kpi={kpi}/>}
            {active==="alumnos"       && <AlumnosPage/>}
            {active==="equivalencias" && <EquivalenciasPage/>}
            {active==="seguimiento"   && <PlaceholderPage title="Seguimiento Académico" icon={<GraduationCap size={56}/>}/>}
            {active==="carreras"      && <PlaceholderPage title="Carreras" icon={<BookOpen size={56}/>}/>}
            {active==="reportes"      && <PlaceholderPage title="Reportes" icon={<BarChart2 size={56}/>}/>}
            {active==="documentos"    && <PlaceholderPage title="Documentos" icon={<FolderOpen size={56}/>}/>}
            {active==="usuarios"      && <PlaceholderPage title="Usuarios" icon={<UserCog size={56}/>}/>}
            {active==="catalogos"     && <PlaceholderPage title="Catálogos" icon={<BookOpen size={56}/>}/>}
            {active==="config"        && <PlaceholderPage title="Configuración" icon={<Settings size={56}/>}/>}
          </main>
        </div>
      </div>
    </>
  );
}
