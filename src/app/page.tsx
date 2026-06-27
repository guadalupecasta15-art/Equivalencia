"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Users, FileText, GraduationCap, BarChart2,
  FolderOpen, UserCog, BookOpen, Settings, Bell,
  ChevronDown, Plus, Search, Eye, Pencil, Trash2,
  CheckCircle, Clock, Upload, ChevronRight, LogOut, Shield,
  AlertCircle, Loader2, X, Menu
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";

/* ─── SUPABASE ─── */
const supabase = createBrowserClient(
  "https://nfvkhzrxfpqbyseacjvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdmtoenJ4ZnBxYnlzZWFjanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDkyNzAsImV4cCI6MjA5Nzg4NTI3MH0.c3fYMudpHh37ybQ21MKnTJ2GHlh3chJJZAdObQPp-o0"
);

/* ─── TOKENS ─── */
const C = {
  bordo:"#7a2531", bordo2:"#8b2c3a", bordo3:"#5c1a22", bordo4:"#4a1520",
  orange:"#ee750a", orangeL:"#f4970b",
  bg:"#F8F9FB", surface:"#fff", border:"#E8ECF0", borderL:"#F0F3F7",
  text:"#1A1A2E", textSec:"#6B7280", textMuted:"#9CA3AF",
  green:"#16A34A", greenL:"#DCFCE7", blue:"#2563EB", blueL:"#DBEAFE",
  amber:"#D97706", amberL:"#FEF3C7", red:"#DC2626", redL:"#FEE2E2",
  gray:"#6B7280", grayL:"#F3F4F6",
};

/* ─── GLOBAL CSS ─── */
const G = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; -webkit-text-size-adjust: 100%; }
  body { margin: 0; font-family: Inter, system-ui, sans-serif; overflow-x: hidden; background: #F8F9FB; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(122,37,49,.3); border-radius: 4px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideLeft { from { transform:translateX(-100%); } to { transform:translateX(0); } }
  .spin { animation: spin .8s linear infinite; }
  .fade-up { animation: fadeUp .2s ease; }

  /* ── SIDEBAR ── */
  .sidebar {
    position: fixed; top: 0; left: 0; bottom: 0; width: 220px;
    background: #4a1520; z-index: 200;
    display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform .25s cubic-bezier(.4,0,.2,1);
    will-change: transform;
  }
  .sidebar.open { transform: translateX(0); animation: slideLeft .25s ease; }
  .sidebar-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,.55); z-index: 199; backdrop-filter: blur(2px);
  }
  .sidebar-overlay.show { display: block; }

  /* Desktop: sidebar always visible */
  @media (min-width: 1024px) {
    .sidebar { transform: translateX(0) !important; }
    .sidebar-overlay { display: none !important; }
    .main-wrap { margin-left: 220px; }
  }
  @media (max-width: 1023px) {
    .main-wrap { margin-left: 0; }
  }

  /* ── NAV ITEM ── */
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 18px; cursor: pointer;
    color: rgba(255,255,255,.65); font-size: 13.5px; font-weight: 500;
    border-left: 3px solid transparent;
    transition: background .13s, color .13s, border-color .13s;
    min-height: 44px; user-select: none;
  }
  .nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .nav-item.active { background: #ee750a; color: #fff; border-left-color: rgba(255,255,255,.4); font-weight: 700; }

  /* ── HEADER ── */
  .topbar {
    position: sticky; top: 0; z-index: 100;
    height: 60px; background: #fff;
    border-bottom: 1px solid #E8ECF0;
    display: flex; align-items: center;
    padding: 0 clamp(12px, 3vw, 24px);
    gap: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
  }

  /* ── PAGE ── */
  .page-wrap { padding: clamp(14px, 3vw, 28px); max-width: 1400px; }

  /* ── KPI GRID ── */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
    gap: clamp(10px, 2vw, 16px);
    margin-bottom: clamp(14px, 2vw, 22px);
  }

  /* ── CHARTS ── */
  .charts-grid {
    display: grid;
    gap: clamp(12px, 2vw, 18px);
    margin-bottom: clamp(12px, 2vw, 18px);
    grid-template-columns: 1fr;
  }
  @media (min-width: 700px) { .charts-grid-3 { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1100px) { .charts-grid-3 { grid-template-columns: 1.6fr 1fr 1.6fr; } }

  /* ── SHORTCUTS ── */
  .shortcuts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(120px, 100%), 1fr));
    gap: clamp(8px, 1.5vw, 12px);
  }

  /* ── CARD ── */
  .card {
    background: #fff; border: 1px solid #F0F3F7;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,.04);
  }

  /* ── TABLE ── */
  .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  table { width: 100%; border-collapse: collapse; min-width: 560px; }
  
  /* Mobile: table → cards */
  @media (max-width: 600px) {
    .table-to-cards table, .table-to-cards thead { display: none; }
    .table-to-cards .card-row {
      display: block !important;
      background: #fff; border: 1px solid #E8ECF0; border-radius: 10px;
      margin-bottom: 10px; padding: 14px 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }
  }
  @media (min-width: 601px) {
    .table-to-cards .card-row { display: none !important; }
  }

  /* ── BUTTONS ── */
  .btn { min-height: 44px; min-width: 44px; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.5);
    backdrop-filter: blur(4px); z-index: 500;
    display: flex; align-items: center; justify-content: center;
    padding: clamp(12px, 3vw, 20px);
  }
  .modal-box {
    background: #fff; border-radius: 14px; width: 100%;
    max-width: min(560px, 100%); max-height: 90vh; overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,.25);
  }

  /* ── FORM INPUTS ── */
  .inp {
    width: 100%; padding: 11px 14px;
    border: 1.5px solid #E8ECF0; border-radius: 9px;
    font-size: clamp(14px, 2vw, 15px); color: #1A1A2E;
    background: #F8F9FB; outline: none; font-family: inherit;
    transition: border-color .15s, box-shadow .15s;
    min-height: 44px;
  }
  .inp:focus { border-color: #7a2531; box-shadow: 0 0 0 3px rgba(122,37,49,.12); background: #fff; }

  /* ── LOGIN ── */
  .login-left { display: none; }
  @media (min-width: 768px) { .login-left { display: flex; } }

  /* ── TYPOGRAPHY ── */
  .page-title { font-size: clamp(18px, 4vw, 24px); font-weight: 800; letter-spacing: -.03em; color: #1A1A2E; }
  .section-title { font-size: clamp(13px, 2vw, 15px); font-weight: 700; color: #1A1A2E; }
  .text-sm { font-size: clamp(11px, 1.5vw, 13px); }
`;

/* ─── TYPES ─── */
type Estudiante = {
  id: string; matricula: string; nombre: string; correo: string;
  telefono?: string; carrera_id?: string; ciclo: string;
  fecha_ingreso: string; estatus: string; carreras?: { nombre: string };
};
type Equivalencia = {
  id: string; estudiante_id: string; clave_origen: string; nombre_origen: string;
  institucion_origen: string; nombre_uag: string; creditos: number;
  fecha_solicitud: string; estatus: string;
  estudiantes?: { nombre: string; matricula: string };
};
type KpiData = {
  total_estudiantes: number; equiv_pendientes: number; equiv_proceso: number;
  equiv_validadas: number; equiv_rechazadas: number; equiv_finalizadas: number;
};

/* ─── HELPERS ─── */
function initials(n: string) { return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }

function Av({ name, sz=32, color=C.bordo }: { name:string; sz?:number; color?:string }) {
  return (
    <div style={{ width:sz, height:sz, borderRadius:"50%", background:color, color:"#fff",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:sz*.33, fontWeight:700, flexShrink:0, letterSpacing:"-.02em" }}>
      {initials(name)}
    </div>
  );
}

function Badge({ s }: { s: string }) {
  const m: Record<string,[string,string]> = {
    validado:[C.green,C.greenL], en_proceso:[C.blue,C.blueL], en_revision:[C.amber,C.amberL],
    pendiente:[C.amber,C.amberL], rechazado:[C.red,C.redL], finalizado:[C.gray,C.grayL],
    activo:[C.green,C.greenL], inactivo:[C.gray,C.grayL], baja:[C.red,C.redL],
  };
  const k = s?.toLowerCase().replace(/ /g,"_")??"";
  const [fg,bg] = m[k]??[C.gray,C.grayL];
  const label = s?.replace(/_/g," ");
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:bg, color:fg,
      padding:"4px 10px", borderRadius:20, fontSize:11.5, fontWeight:600, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:fg, display:"inline-block" }}/>
      {label?.charAt(0).toUpperCase()+label?.slice(1)}
    </span>
  );
}

function Spin() { return <Loader2 size={16} className="spin"/>; }

function Toast({ msg, ok }: { msg:string; ok:boolean }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:16, zIndex:999, background:ok?C.green:C.red,
      color:"#fff", padding:"12px 18px", borderRadius:10, fontSize:13.5, fontWeight:600,
      boxShadow:"0 8px 24px rgba(0,0,0,.2)", display:"flex", alignItems:"center", gap:8,
      maxWidth:"calc(100vw - 32px)" }} className="fade-up">
      {ok?<CheckCircle size={15}/>:<AlertCircle size={15}/>} {msg}
    </div>
  );
}

/* ─── UAG LOGOS ─── */
function UAGLogo({ white=false }: { white?:boolean }) {
  const b = white?"#fff":C.bordo, o = C.orange;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <svg width="34" height="34" viewBox="0 0 80 80" fill="none">
        <path d="M15 65 L5 15 L13 17 L28 60Z" fill={o} opacity=".9"/>
        <path d="M22 65 L12 10 L20 13 L32 62Z" fill={b} opacity=".85"/>
        <path d="M30 65 L24 8 L32 12 L38 64Z" fill={b}/>
        <path d="M38 65 L36 7 L44 11 L42 64Z" fill={b}/>
        <path d="M46 65 L48 8 L56 12 L50 65Z" fill={b} opacity=".85"/>
        <path d="M54 65 L60 12 L68 17 L58 65Z" fill={b} opacity=".7"/>
        <path d="M4 70 Q38 78 72 70" stroke={o} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div>
        <div style={{ fontWeight:900, fontSize:14, color:b, letterSpacing:"-.03em", lineHeight:1 }}>UAG</div>
        <div style={{ display:"flex", alignItems:"center", gap:2, marginTop:1 }}>
          <svg width="9" height="9" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke={o} strokeWidth="2.5"/>
            <line x1="10" y1="3" x2="10" y2="11" stroke={o} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:10, fontWeight:700, color:white?"rgba(255,255,255,.9)":C.bordo }}>nline</span>
        </div>
      </div>
    </div>
  );
}

/* ─── NAV DATA ─── */
const NAV = [
  { id:"dashboard", label:"Inicio", icon:<LayoutDashboard size={17}/> },
  { id:"alumnos", label:"Alumnos", icon:<Users size={17}/> },
  { id:"equivalencias", label:"Equivalencias", icon:<FileText size={17}/> },
  { id:"seguimiento", label:"Seguimiento Académico", icon:<GraduationCap size={17}/> },
  { id:"carreras", label:"Carreras", icon:<BookOpen size={17}/> },
  { id:"reportes", label:"Reportes", icon:<BarChart2 size={17}/> },
  { id:"documentos", label:"Documentos", icon:<FolderOpen size={17}/> },
  { id:"usuarios", label:"Usuarios", icon:<UserCog size={17}/> },
  { id:"catalogos", label:"Catálogos", icon:<BookOpen size={17}/> },
  { id:"config", label:"Configuración", icon:<Settings size={17}/> },
];

/* ════════════════════════════════════════
   LOGIN
════════════════════════════════════════ */
function LoginPage({ onLogin }: { onLogin:(u:User)=>void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email||!pass) { setErr("Completa todos los campos."); return; }
    setLoading(true); setErr("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password:pass });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    if (data.user) onLogin(data.user);
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* LEFT — hidden on mobile via CSS class */}
      <div className="login-left" style={{
        flex:"0 0 45%", background:`linear-gradient(160deg,${C.bordo4},${C.bordo})`,
        padding:"clamp(32px,5vw,56px)", flexDirection:"column", justifyContent:"space-between",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, opacity:.05,
          backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:48 }}><UAGLogo white/></div>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:11, letterSpacing:".08em",
            textTransform:"uppercase", marginBottom:6 }}>Powered by Arizona State University®</p>
          <h1 style={{ color:"#fff", fontSize:"clamp(26px,3.5vw,36px)", fontWeight:800,
            lineHeight:1.15, letterSpacing:"-.03em", marginBottom:18 }}>
            Plataforma de Gestión<br/>de Equivalencias y<br/>Seguimiento Académico
          </h1>
          <div style={{ width:44, height:3, background:C.orange, borderRadius:2, marginBottom:22 }}/>
          <p style={{ color:"rgba(255,255,255,.7)", fontSize:14.5, lineHeight:1.65 }}>
            Gestiona, consulta y da seguimiento al proceso de equivalencias académicas.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginTop:48 }}>
            {[[<Users size={20}/>, "Gestión de\nAlumnos"],[<FileText size={20}/>, "Control de\nEquivalencias"],
              [<GraduationCap size={20}/>, "Seguimiento\nAcadémico"],[<BarChart2 size={20}/>, "Reportes e\nIndicadores"]
            ].map(([icon,label],i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <div style={{ color:C.orange, marginTop:1, flexShrink:0 }}>{icon as React.ReactNode}</div>
                <span style={{ color:"rgba(255,255,255,.75)", fontSize:13, whiteSpace:"pre-line", lineHeight:1.4 }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"relative", zIndex:1, color:"rgba(255,255,255,.35)", fontSize:11 }}>
          © 2026 UAG Online. Todos los derechos reservados.
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ flex:1, background:"#FAFBFC", display:"flex", alignItems:"center",
        justifyContent:"center", padding:"clamp(24px,5vw,48px) clamp(20px,4vw,40px)", minHeight:"100vh" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          {/* Mobile logo */}
          <div style={{ display:"block", marginBottom:24 }} className="login-mobile-logo">
            <div style={{ background:`linear-gradient(135deg,${C.bordo4},${C.bordo})`,
              borderRadius:12, padding:"20px 24px", marginBottom:24 }}>
              <UAGLogo white/>
              <div style={{ color:"rgba(255,255,255,.7)", fontSize:13, marginTop:12, lineHeight:1.5 }}>
                Plataforma de Gestión de Equivalencias y Seguimiento Académico
              </div>
            </div>
          </div>
          <h2 style={{ fontSize:"clamp(22px,4vw,28px)", fontWeight:800, color:C.text,
            letterSpacing:"-.03em", marginBottom:6 }}>Iniciar sesión</h2>
          <p style={{ color:C.textSec, fontSize:14, marginBottom:32 }}>Accede a tu cuenta para continuar</p>

          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:C.textSec,
              textTransform:"uppercase", letterSpacing:".05em", marginBottom:6 }}>Correo institucional</label>
            <div style={{ position:"relative" }}>
              <Shield size={14} style={{ position:"absolute", left:12, top:"50%",
                transform:"translateY(-50%)", color:C.textMuted }}/>
              <input className="inp" value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                type="email" placeholder="usuario@uag.mx"
                style={{ paddingLeft:38 }}/>
            </div>
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:C.textSec,
              textTransform:"uppercase", letterSpacing:".05em", marginBottom:6 }}>Contraseña</label>
            <div style={{ position:"relative" }}>
              <Shield size={14} style={{ position:"absolute", left:12, top:"50%",
                transform:"translateY(-50%)", color:C.textMuted }}/>
              <input className="inp" value={pass} onChange={e=>setPass(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                type="password" placeholder="Ingresa tu contraseña"
                style={{ paddingLeft:38 }}/>
            </div>
          </div>

          {err && (
            <div style={{ background:C.redL, color:C.red, padding:"10px 14px", borderRadius:8,
              fontSize:13, marginBottom:14, display:"flex", alignItems:"center", gap:7 }}>
              <AlertCircle size={14}/> {err}
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            marginBottom:22, fontSize:13 }}>
            <label style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer", color:C.textSec }}>
              <input type="checkbox" defaultChecked style={{ accentColor:C.bordo, width:16, height:16 }}/>
              Recordarme
            </label>
            <span style={{ color:C.bordo, fontWeight:500, cursor:"pointer", fontSize:13 }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <button onClick={handleLogin} disabled={loading} className="btn"
            style={{ width:"100%", padding:"13px", background:loading?C.bordo3:C.bordo,
              color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:700,
              cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", gap:8, letterSpacing:".01em",
              boxShadow:"0 4px 14px rgba(122,37,49,.3)" }}>
            {loading?<><Spin/> Verificando…</>:<>Iniciar sesión <ChevronRight size={18}/></>}
          </button>

          <div style={{ textAlign:"center", marginTop:24, fontSize:12.5, color:C.textMuted }}>
            ¿Necesitas ayuda? Contacta al{" "}
            <span style={{ color:C.bordo, fontWeight:500, cursor:"pointer" }}>soporte técnico</span>
          </div>
        </div>
      </div>

      {/* Hide mobile logo on desktop */}
      <style>{`.login-mobile-logo { display: block; } @media (min-width: 768px) { .login-mobile-logo { display: none; } }`}</style>
    </div>
  );
}

/* ════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════ */
function Sidebar({ active, setActive, user, onLogout, open, onClose }: {
  active:string; setActive:(s:string)=>void; user:User|null;
  onLogout:()=>void; open:boolean; onClose:()=>void;
}) {
  const nombre = user?.email?.split("@")[0]??"Usuario";
  return (
    <>
      <div className={`sidebar-overlay ${open?"show":""}`} onClick={onClose}/>
      <aside className={`sidebar ${open?"open":""}`}>
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <UAGLogo white/>
        </div>

        <nav style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
          {NAV.map(item => (
            <div key={item.id} className={`nav-item ${active===item.id?"active":""}`}
              onClick={() => { setActive(item.id); onClose(); }}>
              <span style={{ opacity:active===item.id?1:.75, flexShrink:0 }}>{item.icon}</span>
              <span style={{ fontSize:"clamp(12.5px,1.5vw,13.5px)" }}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ color:C.orange, fontWeight:700, fontSize:12, textAlign:"center", marginBottom:2 }}>
            Excelencia
          </div>
          <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, textAlign:"center", marginBottom:12 }}>
            que te acompaña
          </div>
          {user && (
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, padding:"6px 8px",
              background:"rgba(255,255,255,.06)", borderRadius:8 }}>
              <Av name={nombre} sz={28}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.85)",
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.4)" }}>Conectado</div>
              </div>
            </div>
          )}
          <button onClick={onLogout} className="btn"
            style={{ width:"100%", padding:"9px", background:"rgba(255,255,255,.06)",
              border:"1px solid rgba(255,255,255,.15)", borderRadius:8, color:"rgba(255,255,255,.7)",
              fontSize:12.5, cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", gap:6 }}>
            <LogOut size={13}/> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

/* ════════════════════════════════════════
   TOPBAR
════════════════════════════════════════ */
function Topbar({ user, onMenu }: { user:User|null; onMenu:()=>void }) {
  const nombre = user?.email?.split("@")[0]??"Usuario";
  return (
    <header className="topbar">
      <button onClick={onMenu} className="btn"
        style={{ width:40, height:40, border:`1px solid ${C.border}`, background:"#fff",
          borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", color:C.textSec, flexShrink:0 }}>
        <Menu size={19}/>
      </button>

      <div style={{ flex:1, display:"flex", alignItems:"center" }}>
        <UAGLogo/>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ position:"relative", cursor:"pointer" }}>
          <Bell size={20} color={C.textSec}/>
          <div style={{ position:"absolute", top:-3, right:-3, width:14, height:14,
            background:C.orange, color:"#fff", borderRadius:"50%", fontSize:8.5,
            fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center",
            border:"2px solid #fff" }}>3</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer",
          padding:"5px 10px 5px 6px", borderRadius:9, border:`1px solid ${C.border}` }}>
          <Av name={nombre} sz={28}/>
          <div style={{ display:"none" }} className="topbar-username">
            <div style={{ fontSize:13, fontWeight:700, color:C.text, lineHeight:1.2 }}>{nombre}</div>
            <div style={{ fontSize:10.5, color:C.textMuted }}>Jefa de Admisiones</div>
          </div>
          <ChevronDown size={13} color={C.textMuted}/>
        </div>
      </div>
      <style>{`@media(min-width:640px){.topbar-username{display:block!important}}`}</style>
    </header>
  );
}

/* ─── CHART DATA ─── */
const BAR_DATA = [
  {name:"Administración",valor:65},{name:"Derecho",valor:72},{name:"Psicología",valor:58},
  {name:"Diseño",valor:80},{name:"Contaduría",valor:61},
];
const LINE_DATA = [
  {mes:"Ene",proceso:20,validadas:10,pendientes:15,rechazadas:3},
  {mes:"Feb",proceso:28,validadas:18,pendientes:14,rechazadas:4},
  {mes:"Mar",proceso:35,validadas:30,pendientes:12,rechazadas:3},
  {mes:"Abr",proceso:40,validadas:38,pendientes:16,rechazadas:5},
  {mes:"May",proceso:45,validadas:48,pendientes:18,rechazadas:4},
  {mes:"Jun",proceso:48,validadas:56,pendientes:21,rechazadas:5},
];

/* ════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════ */
function DashboardPage({ setActive, kpi }: { setActive:(s:string)=>void; kpi:KpiData|null }) {
  const DOUGHNUT = [
    {name:"Pendiente",value:kpi?.equiv_pendientes??0,color:C.orange},
    {name:"En proceso",value:kpi?.equiv_proceso??0,color:C.blue},
    {name:"Validadas",value:kpi?.equiv_validadas??0,color:C.green},
    {name:"Rechazadas",value:kpi?.equiv_rechazadas??0,color:C.red},
    {name:"Finalizadas",value:kpi?.equiv_finalizadas??0,color:C.gray},
  ];
  const KPI = [
    {label:"Total alumnos",value:kpi?.total_estudiantes??"—",icon:<Users size={17}/>,sub:"Activos"},
    {label:"En proceso",value:kpi?.equiv_proceso??"—",icon:<FileText size={17}/>,sub:"38% del total"},
    {label:"Validadas",value:kpi?.equiv_validadas??"—",icon:<CheckCircle size={17}/>,sub:"45% del total"},
    {label:"Pendientes",value:kpi?.equiv_pendientes??"—",icon:<Clock size={17}/>,sub:"17% del total"},
    {label:"Usuarios activos",value:34,icon:<UserCog size={17}/>,sub:"En el sistema"},
  ];
  return (
    <div className="page-wrap">
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:"clamp(16px,3vw,24px)" }}>
        <div>
          <h1 className="page-title">¡Bienvenida, Candy García!</h1>
          <p style={{ color:C.textSec, fontSize:13.5, marginTop:4 }}>Resumen general de la gestión académica.</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px",
          border:`1px solid ${C.border}`, borderRadius:9, fontSize:13, color:C.textSec,
          background:"#fff", cursor:"pointer", whiteSpace:"nowrap" }}>
          📅 Periodo: <strong style={{ color:C.text, marginLeft:4 }}>2026A</strong>
          <ChevronDown size={13}/>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {KPI.map((k,i) => (
          <div key={i} className="card" style={{ padding:"clamp(14px,2vw,20px)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:11, color:C.textMuted, fontWeight:600, textTransform:"uppercase",
                  letterSpacing:".05em", marginBottom:6 }}>{k.label}</div>
                <div style={{ fontSize:"clamp(24px,4vw,32px)", fontWeight:800, color:C.text,
                  letterSpacing:"-.03em", lineHeight:1 }}>
                  {kpi===null?<Spin/>:k.value}
                </div>
              </div>
              <div style={{ width:38, height:38, borderRadius:9, background:"rgba(122,37,49,.08)",
                display:"flex", alignItems:"center", justifyContent:"center", color:C.bordo, flexShrink:0 }}>
                {k.icon}
              </div>
            </div>
            <div style={{ fontSize:12, color:C.green, marginTop:8 }}>✅ {k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className={`charts-grid charts-grid-3`} style={{ display:"grid", gap:"clamp(12px,2vw,18px)", marginBottom:"clamp(14px,2vw,20px)" }}>
        <div className="card">
          <div style={{ padding:"14px 18px 10px", borderBottom:`1px solid ${C.borderL}` }}>
            <span className="section-title">Avance académico por carrera</span>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={BAR_DATA} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderL} vertical={false}/>
                <XAxis dataKey="name" tick={{ fontSize:10, fill:C.textSec }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:10, fill:C.textMuted }} tickLine={false} axisLine={false} domain={[0,100]} tickFormatter={v=>`${v}%`}/>
                <Tooltip formatter={v=>[`${v}%`,"Avance"]}/>
                <Bar dataKey="valor" fill={C.orange} radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{ padding:"14px 18px 10px", borderBottom:`1px solid ${C.borderL}` }}>
            <span className="section-title">Equivalencias por estatus</span>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={DOUGHNUT} cx="50%" cy="45%" innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={2}>
                  {DOUGHNUT.map((d,i) => <Cell key={i} fill={d.color}/>)}
                </Pie>
                <Tooltip/>
                <Legend iconSize={8} wrapperStyle={{ fontSize:10.5 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{ padding:"14px 18px 10px", borderBottom:`1px solid ${C.borderL}` }}>
            <span className="section-title">Equivalencias por período</span>
          </div>
          <div style={{ padding:"14px 16px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={LINE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderL} vertical={false}/>
                <XAxis dataKey="mes" tick={{ fontSize:10, fill:C.textSec }} tickLine={false} axisLine={false}/>
                <YAxis tick={{ fontSize:10, fill:C.textMuted }} tickLine={false} axisLine={false}/>
                <Tooltip/>
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

      {/* Shortcuts */}
      <div className="card">
        <div style={{ padding:"14px 18px 10px", borderBottom:`1px solid ${C.borderL}` }}>
          <span className="section-title">Atajos rápidos</span>
        </div>
        <div style={{ padding:"clamp(12px,2vw,18px)" }}>
          <div className="shortcuts-grid">
            {[
              {label:"Nuevo alumno",icon:<Users size={20}/>,fn:()=>setActive("alumnos")},
              {label:"Nueva equivalencia",icon:<FileText size={20}/>,fn:()=>setActive("equivalencias")},
              {label:"Buscar alumno",icon:<Search size={20}/>,fn:()=>setActive("alumnos")},
              {label:"Plan de estudios",icon:<BookOpen size={20}/>,fn:()=>setActive("seguimiento")},
              {label:"Reporte general",icon:<BarChart2 size={20}/>,fn:()=>setActive("reportes")},
              {label:"Subir documento",icon:<Upload size={20}/>,fn:()=>setActive("documentos")},
            ].map(a => (
              <button key={a.label} onClick={a.fn} className="btn"
                style={{ padding:"clamp(10px,2vw,14px) 8px", background:C.bg, border:`1px solid ${C.border}`,
                  borderRadius:10, cursor:"pointer", display:"flex", flexDirection:"column",
                  alignItems:"center", gap:8, fontSize:"clamp(11px,1.5vw,12.5px)", fontWeight:600,
                  color:C.textSec, transition:"all .13s", textAlign:"center", width:"100%" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.bordo; e.currentTarget.style.color=C.bordo; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textSec; }}>
                <div style={{ color:C.bordo }}>{a.icon}</div>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ALUMNOS — CRUD
════════════════════════════════════════ */
function AlumnosPage() {
  const [list, setList] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{msg:string;ok:boolean}|null>(null);
  const [modal, setModal] = useState<"new"|"edit"|null>(null);
  const [editing, setEditing] = useState<Estudiante|null>(null);
  const [form, setForm] = useState({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"});
  const [saving, setSaving] = useState(false);

  const showToast = (msg:string, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),3000); };

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("estudiantes").select("*, carreras(nombre)").order("created_at",{ascending:false});
    if (data) setList(data as Estudiante[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = list.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) ||
    a.matricula.includes(search) || a.correo.toLowerCase().includes(search.toLowerCase())
  );

  async function save() {
    setSaving(true);
    if (modal==="new") {
      const { error } = await supabase.from("estudiantes").insert([form]);
      if (error) showToast(error.message,false); else { showToast("Alumno registrado ✓"); load(); setModal(null); }
    } else if (editing) {
      const { error } = await supabase.from("estudiantes").update(form).eq("id",editing.id);
      if (error) showToast(error.message,false); else { showToast("Alumno actualizado ✓"); load(); setModal(null); }
    }
    setSaving(false);
  }

  async function del(id:string) {
    if (!confirm("¿Eliminar este alumno?")) return;
    const { error } = await supabase.from("estudiantes").delete().eq("id",id);
    if (error) showToast(error.message,false); else { showToast("Alumno eliminado"); load(); }
  }

  return (
    <div className="page-wrap">
      {toast && <Toast {...toast}/>}

      {/* Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ padding:"18px 22px 14px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontWeight:700, fontSize:16, color:C.text }}>{modal==="new"?"Nuevo alumno":"Editar alumno"}</span>
              <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", cursor:"pointer", color:C.textMuted, padding:4 }}>
                <X size={20}/>
              </button>
            </div>
            <div style={{ padding:"20px 22px", display:"flex", flexDirection:"column", gap:14 }}>
              {[{label:"Nombre completo",key:"nombre",type:"text",ph:"Ej. Ana Torres"},{label:"Matrícula",key:"matricula",type:"text",ph:"2026001"},
                {label:"Correo",key:"correo",type:"email",ph:"alumno@correo.com"},{label:"Ciclo",key:"ciclo",type:"text",ph:"2026A"}].map(f=>(
                <div key={f.key}>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textSec,
                    textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 }}>{f.label}</label>
                  <input className="inp" value={(form as Record<string,string>)[f.key]}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    type={f.type} placeholder={f.ph}/>
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textSec,
                  textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 }}>Estatus</label>
                <select className="inp" value={form.estatus} onChange={e=>setForm({...form,estatus:e.target.value})}>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
            <div style={{ padding:"14px 22px", borderTop:`1px solid ${C.border}`,
              display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>setModal(null)} className="btn"
                style={{ padding:"10px 18px", border:`1px solid ${C.border}`, borderRadius:9,
                  fontSize:13, background:"#fff", cursor:"pointer", color:C.textSec }}>Cancelar</button>
              <button onClick={save} disabled={saving} className="btn"
                style={{ padding:"10px 18px", background:saving?C.bordo3:C.bordo, color:"#fff",
                  border:"none", borderRadius:9, fontSize:13, fontWeight:700,
                  cursor:saving?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:6 }}>
                {saving?<><Spin/> Guardando…</>:"Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <h1 className="page-title">Alumnos</h1>
        <button onClick={()=>{ setModal("new"); setForm({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo"}); }}
          className="btn" style={{ background:C.bordo, color:"#fff", border:"none", borderRadius:9,
            padding:"10px 18px", fontSize:13.5, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:7 }}>
          <Plus size={15}/> Nuevo alumno
        </button>
      </div>

      {/* Search */}
      <div style={{ display:"flex", alignItems:"center", gap:8, background:"#fff",
        border:`1px solid ${C.border}`, borderRadius:9, padding:"10px 14px",
        marginBottom:16, maxWidth:360 }}>
        <Search size={14} color={C.textMuted}/>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Nombre, matrícula o correo"
          style={{ border:"none", background:"transparent", fontSize:13.5, color:C.text,
            outline:"none", fontFamily:"inherit", width:"100%", minHeight:24 }}/>
      </div>

      {/* Desktop table / Mobile cards */}
      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted,
            display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <Spin/> Cargando alumnos…
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div style={{ padding:"12px 12px 4px" }}>
              {filtered.map(a => (
                <div key={a.id} className="card-row" style={{ border:`1px solid ${C.border}`, borderRadius:10, marginBottom:10, padding:"14px 16px", background:"#fff" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <Av name={a.nombre} sz={36}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{a.nombre}</div>
                      <div style={{ fontSize:12, color:C.textMuted }}>{a.correo}</div>
                    </div>
                    <Badge s={a.estatus}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:12.5, color:C.textSec, marginBottom:10 }}>
                    <div><span style={{ color:C.textMuted }}>Matrícula: </span>{a.matricula}</div>
                    <div><span style={{ color:C.textMuted }}>Ciclo: </span>{a.ciclo}</div>
                    <div style={{ gridColumn:"1/-1" }}><span style={{ color:C.textMuted }}>Carrera: </span>{a.carreras?.nombre??"—"}</div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>{ setEditing(a); setForm({nombre:a.nombre,correo:a.correo,matricula:a.matricula,ciclo:a.ciclo,estatus:a.estatus}); setModal("edit"); }}
                      className="btn" style={{ flex:1, padding:"8px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", color:C.textSec, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      <Pencil size={13}/> Editar
                    </button>
                    <button onClick={()=>del(a.id)}
                      className="btn" style={{ flex:1, padding:"8px", background:C.redL, border:`1px solid ${C.red}`, borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", color:C.red, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
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
                  <tr style={{ background:C.bg }}>
                    {["#","Matrícula","Alumno","Carrera","Ciclo","Estatus","Acciones"].map(h=>(
                      <th key={h} style={{ padding:"10px 14px", fontSize:10.5, fontWeight:700,
                        color:C.textMuted, textAlign:"left", textTransform:"uppercase",
                        letterSpacing:".05em", borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length===0 ? (
                    <tr><td colSpan={7} style={{ padding:40, textAlign:"center", color:C.textMuted }}>
                      {list.length===0?"No hay alumnos registrados aún.":"Sin resultados para tu búsqueda."}
                    </td></tr>
                  ) : filtered.map((a,i)=>(
                    <tr key={a.id} style={{ borderBottom:`1px solid ${C.borderL}` }}>
                      <td style={{ padding:"12px 14px", fontSize:12, color:C.textMuted }}>{i+1}</td>
                      <td style={{ padding:"12px 14px" }}>
                        <span style={{ fontFamily:"monospace", fontSize:12, background:C.bg, padding:"2px 7px", borderRadius:5, color:C.textSec }}>{a.matricula}</span>
                      </td>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <Av name={a.nombre} sz={30}/>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{a.nombre}</div>
                            <div style={{ fontSize:11.5, color:C.textMuted }}>{a.correo}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:"12px 14px", fontSize:13, color:C.textSec }}>{a.carreras?.nombre??"—"}</td>
                      <td style={{ padding:"12px 14px" }}>
                        <span style={{ background:C.blueL, color:C.blue, padding:"2px 9px", borderRadius:6, fontSize:12, fontWeight:600 }}>{a.ciclo}</span>
                      </td>
                      <td style={{ padding:"12px 14px" }}><Badge s={a.estatus}/></td>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ display:"flex", gap:6 }}>
                          <button onClick={()=>{ setEditing(a); setForm({nombre:a.nombre,correo:a.correo,matricula:a.matricula,ciclo:a.ciclo,estatus:a.estatus}); setModal("edit"); }}
                            style={{ width:32, height:32, border:`1px solid ${C.border}`, background:"#fff", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.textSec }}>
                            <Pencil size={13}/>
                          </button>
                          <button onClick={()=>del(a.id)}
                            style={{ width:32, height:32, border:`1px solid ${C.border}`, background:"#fff", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.textSec }}>
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
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${C.borderL}`,
          fontSize:12, color:C.textMuted, display:"flex", alignItems:"center",
          justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <span>{filtered.length} de {list.length} alumnos</span>
          <span style={{ color:C.green, display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block" }}/>
            Conectado a Supabase
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   EQUIVALENCIAS
════════════════════════════════════════ */
function EquivalenciasPage() {
  const [list, setList] = useState<Equivalencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("equivalencias").select("*, estudiantes(nombre,matricula)")
      .order("created_at",{ascending:false})
      .then(({data})=>{ if(data) setList(data as Equivalencia[]); setLoading(false); });
  }, []);

  return (
    <div className="page-wrap">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
        <h1 className="page-title">Equivalencias</h1>
        <button className="btn" style={{ background:C.bordo, color:"#fff", border:"none",
          borderRadius:9, padding:"10px 18px", fontSize:13.5, fontWeight:700, cursor:"pointer",
          display:"flex", alignItems:"center", gap:7 }}>
          <Plus size={15}/> Nueva equivalencia
        </button>
      </div>

      <div className="card table-to-cards">
        {loading ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <Spin/> Cargando equivalencias…
          </div>
        ) : list.length===0 ? (
          <div style={{ padding:48, textAlign:"center", color:C.textMuted }}>
            <FileText size={40} style={{ opacity:.2, marginBottom:12 }}/>
            <div style={{ fontWeight:600, fontSize:14 }}>No hay equivalencias registradas</div>
            <div style={{ fontSize:13, marginTop:4 }}>Registra una equivalencia para comenzar.</div>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div style={{ padding:"12px 12px 4px" }}>
              {list.map(e=>(
                <div key={e.id} className="card-row" style={{ border:`1px solid ${C.border}`, borderRadius:10, marginBottom:10, padding:"14px 16px", background:"#fff" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ fontWeight:700, fontSize:13.5, color:C.text }}>{e.nombre_origen}</div>
                    <Badge s={e.estatus}/>
                  </div>
                  <div style={{ fontSize:12.5, color:C.textSec, marginBottom:6 }}>Alumno: <strong>{e.estudiantes?.nombre??"—"}</strong></div>
                  <div style={{ fontSize:12.5, color:C.textSec, marginBottom:6 }}>Institución: {e.institucion_origen}</div>
                  <div style={{ fontSize:12.5, color:C.textSec }}>Materia UAG: {e.nombre_uag} · <span style={{ background:C.blueL, color:C.blue, padding:"1px 7px", borderRadius:5, fontSize:11.5, fontWeight:600 }}>{e.creditos} cr.</span></div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr style={{ background:C.bg }}>
                    {["Alumno","Materia Origen","Institución","Materia UAG","Créditos","Fecha","Estatus"].map(h=>(
                      <th key={h} style={{ padding:"10px 14px", fontSize:10.5, fontWeight:700, color:C.textMuted,
                        textAlign:"left", textTransform:"uppercase", letterSpacing:".05em",
                        borderBottom:`1px solid ${C.border}`, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((e,i)=>(
                    <tr key={e.id} style={{ borderBottom:`1px solid ${C.borderL}` }}>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <Av name={e.estudiantes?.nombre??"?"} sz={28}/>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600 }}>{e.estudiantes?.nombre??"—"}</div>
                            <div style={{ fontSize:11.5, color:C.textMuted }}>{e.estudiantes?.matricula}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ fontSize:12.5, fontWeight:600 }}>{e.clave_origen}</div>
                        <div style={{ fontSize:12, color:C.textSec }}>{e.nombre_origen}</div>
                      </td>
                      <td style={{ padding:"12px 14px", fontSize:12.5, color:C.textSec }}>{e.institucion_origen}</td>
                      <td style={{ padding:"12px 14px", fontSize:13 }}>{e.nombre_uag}</td>
                      <td style={{ padding:"12px 14px", textAlign:"center" }}>
                        <span style={{ background:C.blueL, color:C.blue, padding:"2px 9px", borderRadius:6, fontSize:12, fontWeight:600 }}>{e.creditos} cr.</span>
                      </td>
                      <td style={{ padding:"12px 14px", fontSize:12, color:C.textMuted }}>{e.fecha_solicitud}</td>
                      <td style={{ padding:"12px 14px" }}><Badge s={e.estatus}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div style={{ padding:"10px 16px", borderTop:`1px solid ${C.borderL}`, fontSize:11.5,
          color:C.green, display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block" }}/>
          Datos en vivo · {list.length} registros
        </div>
      </div>
    </div>
  );
}

/* ─── PLACEHOLDER ─── */
function PlaceholderPage({ title, icon }: { title:string; icon:React.ReactNode }) {
  return (
    <div className="page-wrap">
      <h1 className="page-title" style={{ marginBottom:20 }}>{title}</h1>
      <div className="card" style={{ padding:"clamp(40px,8vw,64px) 24px", textAlign:"center", color:C.textMuted }}>
        <div style={{ color:C.bordo, opacity:.18, marginBottom:14 }}>{icon}</div>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:6 }}>Módulo en construcción</div>
        <div style={{ fontSize:13 }}>Conecta las tablas en Supabase y este módulo cobrará vida.</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export default function UAGPage() {
  const [user, setUser] = useState<User|null>(null);
  const [active, setActive] = useState("dashboard");
  const [kpi, setKpi] = useState<KpiData|null>(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({data})=>{ setUser(data.session?.user??null); setChecking(false); });
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_,session)=>setUser(session?.user??null));
    return ()=>subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function loadKpi() {
      const { data, error } = await supabase.from("v_kpi_dashboard").select("*").single();
      if (!error && data) { setKpi(data as KpiData); return; }
      const [e,pend,proc,val,rej,fin] = await Promise.all([
        supabase.from("estudiantes").select("id",{count:"exact",head:true}),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","pendiente"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","en_proceso"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","validado"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","rechazado"),
        supabase.from("equivalencias").select("id",{count:"exact",head:true}).eq("estatus","finalizado"),
      ]);
      setKpi({ total_estudiantes:e.count??0, equiv_pendientes:pend.count??0, equiv_proceso:proc.count??0,
        equiv_validadas:val.count??0, equiv_rechazadas:rej.count??0, equiv_finalizadas:fin.count??0 });
    }
    loadKpi();
  }, [user]);

  async function logout() { await supabase.auth.signOut(); setUser(null); setActive("dashboard"); setKpi(null); }

  const TITLES: Record<string,string> = {
    dashboard:"Inicio", alumnos:"Alumnos", equivalencias:"Equivalencias",
    seguimiento:"Seguimiento Académico", carreras:"Carreras", reportes:"Reportes",
    documentos:"Documentos", usuarios:"Usuarios", catalogos:"Catálogos", config:"Configuración",
  };

  if (checking) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"Inter,sans-serif", color:C.textMuted, gap:10 }}>
      <style>{G}</style>
      <Spin/> Verificando sesión…
    </div>
  );

  if (!user) return (
    <>
      <style>{G}</style>
      <LoginPage onLogin={u=>setUser(u)}/>
    </>
  );

  return (
    <>
      <style>{G}</style>
      <div style={{ display:"flex", minHeight:"100vh" }}>
        <Sidebar active={active} setActive={v=>{ setActive(v); setSidebarOpen(false); }}
          user={user} onLogout={logout} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
        <div className="main-wrap" style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <Topbar user={user} onMenu={()=>setSidebarOpen(!sidebarOpen)}/>
          <main style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
            {active==="dashboard"    && <DashboardPage setActive={setActive} kpi={kpi}/>}
            {active==="alumnos"      && <AlumnosPage/>}
            {active==="equivalencias"&& <EquivalenciasPage/>}
            {active==="seguimiento"  && <PlaceholderPage title="Seguimiento Académico" icon={<GraduationCap size={52}/>}/>}
            {active==="carreras"     && <PlaceholderPage title="Carreras" icon={<BookOpen size={52}/>}/>}
            {active==="reportes"     && <PlaceholderPage title="Reportes" icon={<BarChart2 size={52}/>}/>}
            {active==="documentos"   && <PlaceholderPage title="Documentos" icon={<FolderOpen size={52}/>}/>}
            {active==="usuarios"     && <PlaceholderPage title="Usuarios" icon={<UserCog size={52}/>}/>}
            {active==="catalogos"    && <PlaceholderPage title="Catálogos" icon={<BookOpen size={52}/>}/>}
            {active==="config"       && <PlaceholderPage title="Configuración" icon={<Settings size={52}/>}/>}
          </main>
        </div>
      </div>
    </>
  );
}
