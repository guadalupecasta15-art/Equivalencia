"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Users, FileText, GraduationCap, BarChart2,
  FolderOpen, UserCog, BookOpen, Settings, Bell, Plus, Search,
  Pencil, Trash2, CheckCircle, Clock, Upload, ChevronRight,
  LogOut, Shield, AlertCircle, Loader2, X, Menu, TrendingUp,
  ArrowUpRight, Sparkles, ChevronDown, Filter, AlertTriangle,
  Eye, Download, History, Activity, Lock, ArrowLeft,
  Calendar, Mail, Hash, MoreVertical, RefreshCw, Building2,
  FileCheck, Star, Target, Award, Zap, ChevronUp, Info,
  PieChart as PieIcon
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar, LineChart, Line
} from "recharts";

const supabase = createBrowserClient(
  "https://nfvkhzrxfpqbyseacjvu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdmtoenJ4ZnBxYnlzZWFjanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDkyNzAsImV4cCI6MjA5Nzg4NTI3MH0.c3fYMudpHh37ybQ21MKnTJ2GHlh3chJJZAdObQPp-o0"
);

const T = {
  brand:"#7a2531",brand2:"#8f2d3d",brand3:"#5c1a22",brand4:"#3d1018",
  orange:"#c45f00",orangeL:"#fff3e0",
  bg:"#f4f4f6",surface:"#ffffff",s2:"#fafafa",s3:"#f0f0f2",
  border:"rgba(0,0,0,.09)",borderM:"rgba(0,0,0,.14)",
  t1:"#111827",t2:"#374151",t3:"#6b7280",t4:"#9ca3af",
  green:"#166534",greenL:"#f0fdf4",greenM:"#bbf7d0",
  blue:"#1e40af",blueL:"#eff6ff",blueM:"#bfdbfe",
  amber:"#92400e",amberL:"#fffbeb",amberM:"#fde68a",
  red:"#991b1b",redL:"#fef2f2",redM:"#fecaca",
  purple:"#5b21b6",purpleL:"#faf5ff",purpleM:"#ddd6fe",
  gray:"#374151",grayL:"#f9fafb",grayM:"#e5e7eb",
  focus:"#2563eb",
  sh1:"0 1px 2px rgba(0,0,0,.06)",
  sh2:"0 2px 4px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05)",
  sh3:"0 4px 8px rgba(0,0,0,.09),0 2px 4px rgba(0,0,0,.05)",
  sh4:"0 8px 20px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.05)",
  sh5:"0 20px 40px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06)",
  shB:"0 4px 14px rgba(122,37,49,.28)",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .skip-link{position:absolute;top:-40px;left:16px;z-index:9999;background:#7a2531;color:#fff;padding:8px 16px;border-radius:0 0 8px 8px;font-size:14px;font-weight:600;text-decoration:none;transition:top .15s}
  .skip-link:focus{top:0}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{font-size:16px;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
  body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f4f6;color:#111827;line-height:1.5;overflow-x:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
  :focus-visible{outline:2.5px solid #2563eb;outline-offset:2px;border-radius:4px}
  :focus:not(:focus-visible){outline:none}
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.16);border-radius:99px}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
  @keyframes slideR{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  @keyframes pulse2{0%,100%{opacity:1}50%{opacity:.45}}
  .spin{animation:spin .75s linear infinite;display:inline-flex}
  .fade-up{animation:fadeUp .2s ease both}
  .scale-in{animation:scaleIn .18s cubic-bezier(.34,1.2,.64,1) both}
  .skel{background:linear-gradient(90deg,#ebebeb 25%,#d8d8d8 50%,#ebebeb 75%);background-size:200% 100%;animation:pulse2 1.6s ease infinite;border-radius:6px}
  @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
  .sidebar{position:fixed;top:0;left:0;bottom:0;width:234px;background:#3d1018;display:flex;flex-direction:column;transform:translateX(-100%);transition:transform .28s cubic-bezier(.4,0,.2,1);z-index:300;border-right:1px solid rgba(255,255,255,.05)}
  .sidebar.open{transform:translateX(0);animation:slideR .28s ease}
  .sob{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:299;backdrop-filter:blur(4px);cursor:pointer}
  .sob.show{display:block;animation:fadeIn .15s ease}
  @media(min-width:1024px){.sidebar{transform:translateX(0)!important}.sob{display:none!important}.mw{margin-left:234px}.tbar-logo{display:none!important}.tbar-title{display:block!important}}
  @media(max-width:1023px){.mw{margin-left:0}.tbar-title{display:none!important}}
  .ni{display:flex;align-items:center;gap:9px;padding:8px 12px;margin:1px 8px;border-radius:8px;cursor:pointer;color:rgba(255,255,255,.65);font-size:13px;font-weight:500;transition:background .12s,color .12s;min-height:38px;position:relative;user-select:none;text-decoration:none;line-height:1.3}
  .ni:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.9)}
  .ni.on{background:rgba(255,255,255,.11);color:#fff;font-weight:600}
  .ni.on::before{content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:#c45f00;border-radius:0 3px 3px 0}
  .ni-ico{flex-shrink:0;opacity:.7}
  .ni.on .ni-ico{opacity:1}
  .nbadge{margin-left:auto;background:rgba(255,255,255,.14);color:rgba(255,255,255,.88);font-size:10px;font-weight:700;padding:1px 7px;border-radius:99px}
  .nsec{padding:16px 12px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.32)}
  .tbar{position:sticky;top:0;z-index:200;height:54px;background:rgba(255,255,255,.92);backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%);border-bottom:1px solid rgba(0,0,0,.08);display:flex;align-items:center;padding:0 clamp(12px,2.5vw,22px);gap:10px;box-shadow:0 1px 2px rgba(0,0,0,.06)}
  .card{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:12px;box-shadow:0 2px 4px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);overflow:hidden;transition:box-shadow .18s,border-color .18s}
  .kcard{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:14px;padding:clamp(14px,2.5vw,20px);transition:box-shadow .18s,transform .18s;box-shadow:0 2px 4px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05)}
  .kcard:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.05)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;border-radius:8px;font-family:inherit;font-weight:600;cursor:pointer;transition:all .12s;white-space:nowrap;min-height:38px;padding:9px 16px;font-size:13.5px;line-height:1}
  .btn:disabled{opacity:.45;cursor:not-allowed;pointer-events:none}
  .bp{background:#7a2531;color:#fff;box-shadow:0 4px 14px rgba(122,37,49,.28)}
  .bp:hover{background:#8f2d3d;box-shadow:0 6px 16px rgba(122,37,49,.32)}
  .bp:active{transform:scale(.98)}
  .bs{background:#fff;color:#374151;border:1px solid rgba(0,0,0,.13);box-shadow:0 1px 2px rgba(0,0,0,.06)}
  .bs:hover{background:#fafafa;border-color:rgba(0,0,0,.2)}
  .bg{background:transparent;color:#6b7280;min-height:34px;padding:7px 11px;font-size:13px;border-radius:7px}
  .bg:hover{background:rgba(0,0,0,.05);color:#111827}
  .bd{background:#fef2f2;color:#991b1b;border:1px solid rgba(153,27,27,.18)}
  .bd:hover{background:#fecaca}
  .bico{width:34px;height:34px;min-width:34px;background:transparent;border:1px solid rgba(0,0,0,.1);border-radius:7px;cursor:pointer;color:#6b7280;display:flex;align-items:center;justify-content:center;transition:all .12s;padding:0}
  .bico:hover{background:#fafafa;color:#111827;border-color:rgba(0,0,0,.18)}
  .inp{width:100%;min-height:38px;padding:8px 12px;background:#fff;color:#111827;border:1.5px solid rgba(0,0,0,.14);border-radius:9px;font-size:14px;font-family:inherit;outline:none;transition:border-color .13s,box-shadow .13s;line-height:1.4}
  .inp::placeholder{color:#9ca3af}
  .inp:focus{border-color:#7a2531;box-shadow:0 0 0 3px rgba(122,37,49,.12)}
  .inp:hover:not(:focus){border-color:rgba(0,0,0,.22)}
  .inp.err{border-color:#991b1b}
  .inp.err:focus{box-shadow:0 0 0 3px rgba(153,27,27,.12)}
  select.inp{cursor:pointer}
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:99px;font-size:11.5px;font-weight:600;line-height:1.4;white-space:nowrap}
  .bdot{width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0}
  .tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
  table{width:100%;border-collapse:collapse;min-width:460px}
  thead th{padding:9px 13px;font-size:10.5px;font-weight:700;color:#6b7280;text-align:left;text-transform:uppercase;letter-spacing:.07em;background:#fafafa;border-bottom:1px solid rgba(0,0,0,.07);white-space:nowrap}
  tbody tr{border-bottom:1px solid rgba(0,0,0,.05);transition:background .1s}
  tbody tr:last-child{border-bottom:none}
  tbody tr:hover{background:rgba(0,0,0,.018)}
  tbody td{padding:11px 13px;font-size:13.5px;vertical-align:middle;color:#111827}
  @media(max-width:640px){.t2c .tw{display:none}.mc{display:block!important}}
  @media(min-width:641px){.mc{display:none!important}}
  .mover{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.42);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:clamp(12px,4vw,24px);animation:fadeIn .15s ease}
  .mbox{background:#fff;border-radius:16px;width:100%;max-width:min(580px,96vw);max-height:92vh;overflow-y:auto;overflow-x:hidden;box-shadow:0 20px 40px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06);animation:scaleIn .18s cubic-bezier(.34,1.2,.64,1);border:1px solid rgba(0,0,0,.06)}
  .toast{position:fixed;z-index:9999;bottom:max(20px,env(safe-area-inset-bottom,20px));right:clamp(12px,4vw,20px);left:clamp(12px,4vw,auto);max-width:min(400px,calc(100vw - 24px));padding:13px 15px;border-radius:12px;display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:500;line-height:1.4;box-shadow:0 20px 40px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06);animation:scaleIn .2s cubic-bezier(.34,1.2,.64,1)}
  .cover{position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.48);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .12s ease}
  .cbox{background:#fff;border-radius:14px;width:100%;max-width:380px;padding:24px;box-shadow:0 20px 40px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.06);animation:scaleIn .16s ease;border:1px solid rgba(0,0,0,.06)}
  .tabs{display:flex;gap:0;border-bottom:1px solid rgba(0,0,0,.08);overflow-x:auto;scrollbar-width:none}
  .tabs::-webkit-scrollbar{display:none}
  .tab{padding:10px 16px;font-size:13.5px;font-weight:500;color:#6b7280;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;transition:color .12s,border-color .12s;user-select:none;min-height:42px;display:flex;align-items:center;gap:6px;background:none;border-top:none;border-left:none;border-right:none;font-family:inherit}
  .tab:hover{color:#111827}
  .tab.on{color:#7a2531;border-bottom-color:#7a2531;font-weight:600}
  .pbar{height:6px;border-radius:99px;background:rgba(0,0,0,.08);overflow:hidden}
  .pbar-f{height:100%;border-radius:99px;transition:width .6s ease}
  .s-pe{background:#fde68a;color:#92400e}
  .s-pr{background:#bfdbfe;color:#1e40af}
  .s-rv{background:#ddd6fe;color:#5b21b6}
  .s-vl{background:#bbf7d0;color:#166534}
  .s-rj{background:#fecaca;color:#991b1b}
  .s-fn{background:#e5e7eb;color:#374151}
  .s-ac{background:#bbf7d0;color:#166534}
  .s-in{background:#e5e7eb;color:#374151}
  .s-bj{background:#fecaca;color:#991b1b}
  .pw{padding:clamp(14px,3vw,28px);max-width:1440px;margin:0 auto}
  .ptitle{font-size:clamp(19px,3.5vw,24px);font-weight:800;letter-spacing:-.04em;color:#111827;line-height:1.15}
  .stitle{font-size:13.5px;font-weight:700;color:#111827;letter-spacing:-.01em}
  .fl{display:flex;align-items:center}
  .fl-sb{display:flex;align-items:center;justify-content:space-between}
  .fl-w{display:flex;align-items:center;flex-wrap:wrap}
  .g5{gap:5px}.g6{gap:6px}.g7{gap:7px}.g8{gap:8px}.g9{gap:9px}.g10{gap:10px}.g12{gap:12px}.g14{gap:14px}.g16{gap:16px}.g20{gap:20px}
  .mb8{margin-bottom:8px}.mb12{margin-bottom:12px}.mb14{margin-bottom:14px}.mb16{margin-bottom:16px}.mb20{margin-bottom:20px}.mb24{margin-bottom:24px}
  .kgrid{display:grid;gap:clamp(9px,1.5vw,13px);grid-template-columns:repeat(auto-fill,minmax(min(170px,100%),1fr));margin-bottom:clamp(14px,2vw,20px)}
  .cgrid{display:grid;gap:clamp(11px,1.5vw,15px);margin-bottom:clamp(13px,2vw,18px);grid-template-columns:1fr}
  @media(min-width:720px){.cgrid{grid-template-columns:1.6fr 1fr}}
  @media(min-width:1140px){.cgrid{grid-template-columns:1.7fr 1fr 1.4fr}}
  .g2{display:grid;gap:13px;grid-template-columns:1fr}
  @media(min-width:480px){.g2{grid-template-columns:1fr 1fr}}
  .g3{display:grid;gap:12px;grid-template-columns:1fr}
  @media(min-width:640px){.g3{grid-template-columns:1fr 1fr 1fr}}
  .sgrid{display:grid;gap:8px;grid-template-columns:repeat(auto-fill,minmax(min(128px,100%),1fr))}
  .divider{height:1px;background:rgba(0,0,0,.07)}
  .flabel{display:block;font-size:12px;font-weight:600;color:#374151;letter-spacing:-.01em;margin-bottom:5px;line-height:1.4}
  .ferr{display:flex;align-items:flex-start;gap:5px;margin-top:4px;font-size:12px;color:#991b1b;font-weight:500;line-height:1.4}
  .alert{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;border-radius:10px;font-size:13.5px;line-height:1.5;font-weight:500;border:1px solid}
  .ae{background:#fef2f2;color:#991b1b;border-color:rgba(153,27,27,.18)}
  .as{background:#f0fdf4;color:#166534;border-color:rgba(22,101,52,.18)}
  .aw{background:#fffbeb;color:#92400e;border-color:rgba(146,64,14,.18)}
  .ai{background:#eff6ff;color:#1e40af;border-color:rgba(30,64,175,.18)}
  .empty{padding:clamp(36px,7vw,60px) 24px;text-align:center;color:#6b7280}
  .tl-item{display:flex;gap:14px;padding-bottom:20px;position:relative}
  .tl-item:not(:last-child)::after{content:'';position:absolute;left:15px;top:32px;bottom:0;width:1.5px;background:rgba(0,0,0,.1)}
  .tl-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:700;z-index:1}
  .ll{display:none}
  @media(min-width:768px){.ll{display:flex}}
  .lm{display:block}
  @media(min-width:768px){.lm{display:none}}
  @media(max-width:640px){.card,.kcard{box-shadow:0 2px 8px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.06)}}
  @media(max-width:480px){.hide-xs{display:none!important}}
  .stat-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.06)}
  .stat-row:last-child{border-bottom:none}
  .chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:7px;font-size:12px;font-weight:500;border:1px solid;cursor:pointer;transition:all .12s;background:#fff}
  .chip.on{background:#7a2531;color:#fff;border-color:#7a2531}
`;

type Rol = "decano"|"jefa_admisiones"|"success_coach"|"seguimiento_academico";
type Estudiante = { id:string;matricula:string;nombre:string;correo:string;telefono?:string;carrera_id?:string;ciclo:string;fecha_ingreso:string;estatus:string;carreras?:{nombre:string;clave:string};};
type Equivalencia = { id:string;estudiante_id:string;clave_origen:string;nombre_origen:string;institucion_origen:string;nombre_uag:string;clave_uag:string;creditos:number;fecha_solicitud:string;estatus:string;observaciones?:string;estudiantes?:{nombre:string;matricula:string};};
type KpiData = { total_estudiantes:number;equiv_pendientes:number;equiv_proceso:number;equiv_validadas:number;equiv_rechazadas:number;equiv_finalizadas:number;};
type AuditLog = { id:string;tabla:string;accion:string;campo?:string;valor_antes?:string;valor_despues?:string;created_at:string;usuario_id?:string;};
type Carrera = { id:string;nombre:string;clave:string;creditos_total:number;total_materias:number;modalidad:string;};
type Usuario = { id:string;nombre:string;correo:string;rol:string;activo:boolean;ultimo_login?:string;};

const PERMS: Record<Rol,Record<string,boolean>> = {
  decano:               {dashboard:true,alumnos:true,equivalencias:true,carreras:true,reportes:true,documentos:true,usuarios:true,auditoria:true,config:true},
  jefa_admisiones:      {dashboard:true,alumnos:true,equivalencias:true,carreras:true,reportes:true,documentos:true,usuarios:false,auditoria:true,config:false},
  success_coach:        {dashboard:true,alumnos:true,equivalencias:true,carreras:true,reportes:false,documentos:false,usuarios:false,auditoria:false,config:false},
  seguimiento_academico:{dashboard:true,alumnos:true,equivalencias:true,carreras:false,reportes:false,documentos:false,usuarios:false,auditoria:false,config:false},
};

function initials(n:string){ return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function fmtDate(d:string){ try{ return new Date(d).toLocaleDateString("es-MX",{day:"2-digit",month:"short",year:"numeric"}); }catch{ return d||"—"; } }
function fmtTime(d:string){ try{ return new Date(d).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"}); }catch{ return ""; } }
function useDebounce<T>(v:T,d:number):T { const [val,setVal]=useState(v); useEffect(()=>{ const t=setTimeout(()=>setVal(v),d); return()=>clearTimeout(t); },[v,d]); return val; }

const SM: Record<string,{cls:string;label:string}> = {
  pendiente:{cls:"s-pe",label:"Pendiente"},en_proceso:{cls:"s-pr",label:"En proceso"},
  en_revision:{cls:"s-rv",label:"En revisión"},validado:{cls:"s-vl",label:"Validado"},
  rechazado:{cls:"s-rj",label:"Rechazado"},finalizado:{cls:"s-fn",label:"Finalizado"},
  activo:{cls:"s-ac",label:"Activo"},inactivo:{cls:"s-in",label:"Inactivo"},baja:{cls:"s-bj",label:"Baja temporal"},
};

function Badge({ s }: { s:string }) {
  const k=s?.toLowerCase().replace(/ /g,"_")??"";
  const {cls="s-in",label=s}=SM[k]??{};
  return <span className={`badge ${cls}`} role="status"><span className="bdot" aria-hidden="true"/>{label}</span>;
}
function Av({ name, sz=32 }: { name:string;sz?:number }) {
  return <div aria-hidden="true" style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(135deg,${T.brand},${T.brand2})`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(sz*.34),fontWeight:700,flexShrink:0,letterSpacing:"-.02em",lineHeight:1}}>{initials(name)}</div>;
}
function Sp({ size=15, label="Cargando" }: { size?:number;label?:string }) {
  return <span role="status" aria-label={label}><Loader2 size={size} className="spin" aria-hidden="true" style={{color:T.t3}}/><span className="sr-only">{label}</span></span>;
}
function Sk({ w="100%", h=14, mb=0 }: { w?:string;h?:number;mb?:number }) {
  return <div className="skel" aria-hidden="true" style={{width:w,height:h,marginBottom:mb}}/>;
}
function ES({ icon, title, desc }: { icon:React.ReactNode;title:string;desc:string }) {
  return <div className="empty" role="status"><div style={{color:T.t4,marginBottom:14,display:"flex",justifyContent:"center",opacity:.45}} aria-hidden="true">{icon}</div><p style={{fontSize:14.5,fontWeight:600,color:T.t2,marginBottom:5}}>{title}</p><p style={{fontSize:13.5,color:T.t3,maxWidth:300,margin:"0 auto",lineHeight:1.55}}>{desc}</p></div>;
}
function Toast({ msg, ok, onDone }: { msg:string;ok:boolean;onDone:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onDone,4000); return()=>clearTimeout(t); },[onDone]);
  return <div className="toast" role="alert" style={{background:ok?T.t1:T.red,color:"#fff"}}>{ok?<CheckCircle size={16} style={{color:"#4ade80",flexShrink:0}}/>:<AlertTriangle size={16} style={{color:"#fca5a5",flexShrink:0}}/>}<span style={{flex:1}}>{msg}</span><button onClick={onDone} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:6,width:24,height:24,cursor:"pointer",color:"inherit",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><X size={12}/></button></div>;
}
function Confirm({ title, msg, onOk, onCancel }: { title:string;msg:string;onOk:()=>void;onCancel:()=>void }) {
  const ref=useRef<HTMLButtonElement>(null);
  useEffect(()=>{ ref.current?.focus(); },[]);
  return <div className="cover" role="dialog" aria-modal="true"><div className="cbox"><div className="fl g10 mb12"><div style={{width:40,height:40,borderRadius:10,background:T.redL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><AlertTriangle size={20} style={{color:T.red}}/></div><h2 style={{fontSize:16,fontWeight:700,color:T.t1}}>{title}</h2></div><p style={{fontSize:13.5,color:T.t2,marginBottom:20,lineHeight:1.55,paddingLeft:50}}>{msg}</p><div className="fl g8" style={{justifyContent:"flex-end"}}><button onClick={onCancel} className="btn bs" style={{minHeight:38,padding:"8px 14px"}}>Cancelar</button><button onClick={onOk} ref={ref} className="btn bd" style={{minHeight:38,padding:"8px 14px"}}>Eliminar</button></div></div></div>;
}

const CT = ({ active:a, payload:p, label:l }: any) => {
  if (!a||!p?.length) return null;
  return <div style={{background:T.t1,borderRadius:10,padding:"10px 14px",boxShadow:T.sh5,fontSize:12.5,minWidth:120}}>{l&&<p style={{color:"rgba(255,255,255,.5)",marginBottom:6,fontSize:11.5}}>{l}</p>}{p.map((px:any,i:number)=><p key={i} style={{color:"#fff",fontWeight:600,marginBottom:i<p.length-1?3:0}}><span style={{color:px.color}}>{px.name}: </span>{px.value}{px.unit||""}</p>)}</div>;
};

function UAGLogo({ white=false, size=28 }: { white?:boolean;size?:number }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}} aria-label="UAG Online">
      <img
        src="https://nfvkhzrxfpqbyseacjvu.supabase.co/storage/v1/object/sign/Assets%20Logo/Recurso%201.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTYzMjkxMi00OWRhLTRkZTEtYTAwMS1iYWIwMzZjYzc1YWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBc3NldHMgTG9nby9SZWN1cnNvIDEucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4Mjc1MzUzMSwiZXhwIjoyMDM1MDQxNTMxfQ.UbOq5slL20vZJ4G2lQcia9ILj5hrMXsIc-igzyhj5ao"
        alt="UAG Online"
        style={{
          height: size * 1.5,
          width: "auto",
          objectFit: "contain",
          filter: white ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
}

const PAGE_TITLES: Record<string,string> = {
  dashboard:"Dashboard",alumnos:"Alumnos",equivalencias:"Equivalencias",
  seguimiento:"Seguimiento Académico",carreras:"Catálogo de Carreras",
  reportes:"Reportes",documentos:"Documentos",usuarios:"Usuarios",
  auditoria:"Auditoría",config:"Configuración",expediente:"Expediente",
};

function buildNav(rol:Rol) {
  const all=[
    {id:"dashboard",label:"Dashboard",icon:<LayoutDashboard size={15}/>,section:"p"},
    {id:"alumnos",label:"Alumnos",icon:<Users size={15}/>,badge:"125",section:"p"},
    {id:"equivalencias",label:"Equivalencias",icon:<FileText size={15}/>,badge:"38",section:"p"},
    {id:"seguimiento",label:"Seguimiento Académico",icon:<GraduationCap size={15}/>,section:"p"},
    {id:"carreras",label:"Catálogo de Carreras",icon:<BookOpen size={15}/>,section:"a"},
    {id:"reportes",label:"Reportes",icon:<BarChart2 size={15}/>,section:"a"},
    {id:"documentos",label:"Documentos",icon:<FolderOpen size={15}/>,section:"a"},
    {id:"usuarios",label:"Usuarios",icon:<UserCog size={15}/>,section:"a"},
    {id:"auditoria",label:"Auditoría",icon:<History size={15}/>,section:"a"},
    {id:"config",label:"Configuración",icon:<Settings size={15}/>,section:"a"},
  ];
  return all.filter(n=>PERMS[rol][n.id]!==false);
}


function Sidebar({ active, setActive, user, rol, onLogout, open, onClose }: { active:string;setActive:(s:string)=>void;user:User|null;rol:Rol;onLogout:()=>void;open:boolean;onClose:()=>void; }) {
  const nombre=user?.email?.split("@")[0]??"Usuario";
  const nav=buildNav(rol);
  const RL: Record<Rol,string>={decano:"Decano",jefa_admisiones:"Jefa de Admisiones",success_coach:"Success Coach",seguimiento_academico:"Seg. Académico"};
  const p=nav.filter(n=>n.section==="p"), a=nav.filter(n=>n.section==="a");
  return (
    <>
      <div className={`sob ${open?"show":""}`} onClick={onClose} aria-hidden="true"/>
      <aside className={`sidebar ${open?"open":""}`} aria-label="Navegación principal">
        <div style={{padding:"16px 14px 12px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
          <UAGLogo white size={24}/>
          <p style={{marginTop:6,fontSize:10,color:"rgba(255,255,255,.28)",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",lineHeight:1}}>Programas Online</p>
        </div>
        <nav style={{flex:1,overflowY:"auto",padding:"8px 0"}} aria-label="Menú principal">
          {p.length>0&&<><p className="nsec">Principal</p>{p.map(item=><a key={item.id} href="#" className={`ni ${active===item.id||active.startsWith(item.id+"-")?"on":""}`} aria-current={active===item.id?"page":undefined} onClick={e=>{e.preventDefault();setActive(item.id);onClose();}}><span className="ni-ico" aria-hidden="true">{item.icon}</span><span style={{flex:1}}>{item.label}</span>{item.badge&&<span className="nbadge">{item.badge}</span>}</a>)}</>}
          {a.length>0&&<><p className="nsec">Administración</p>{a.map(item=><a key={item.id} href="#" className={`ni ${active===item.id?"on":""}`} aria-current={active===item.id?"page":undefined} onClick={e=>{e.preventDefault();setActive(item.id);onClose();}}><span className="ni-ico" aria-hidden="true">{item.icon}</span><span>{item.label}</span></a>)}</>}
        </nav>
        <div style={{padding:"10px 10px 14px",borderTop:"1px solid rgba(255,255,255,.06)"}}>
          <div style={{padding:"9px 10px",borderRadius:10,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.07)",marginBottom:8}}>
            <div className="fl g8"><Av name={nombre} sz={26}/><div style={{flex:1,minWidth:0}}><p style={{fontSize:12.5,fontWeight:600,color:"rgba(255,255,255,.88)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.2}}>{nombre}</p><p style={{fontSize:10.5,color:"rgba(255,255,255,.38)",marginTop:2,lineHeight:1}}>{RL[rol]}</p></div><div style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",flexShrink:0}} aria-label="En línea"/></div>
          </div>
          <button onClick={onLogout} style={{width:"100%",color:"rgba(255,255,255,.42)",fontSize:13,justifyContent:"flex-start",gap:8,padding:"8px 10px",minHeight:34,display:"flex",alignItems:"center",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",borderRadius:7}} className="bg"><LogOut size={13} aria-hidden="true"/> Cerrar sesión</button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ user, onMenu, pageTitle }: { user:User|null;onMenu:()=>void;pageTitle:string; }) {
  const nombre=user?.email?.split("@")[0]??"Usuario";
  return (
    <header className="tbar" role="banner">
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <button onClick={onMenu} className="bico" aria-label="Abrir menú" style={{flexShrink:0}}><Menu size={17} aria-hidden="true"/></button>
      <div className="tbar-logo" style={{display:"none"}}><UAGLogo size={20}/></div>
      <h1 className="tbar-title" style={{fontSize:14.5,fontWeight:700,color:T.t1,letterSpacing:"-.02em",display:"none",margin:0,flex:1}}>{pageTitle}</h1>
      <div style={{flex:1}}/>
      <div className="fl g8">
        <button className="bico" style={{position:"relative"}} aria-label="Notificaciones"><Bell size={16} aria-hidden="true"/><span aria-hidden="true" style={{position:"absolute",top:5,right:5,width:7,height:7,background:T.orange,borderRadius:"50%",border:"2px solid #fff"}}/></button>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px 4px 4px",borderRadius:99,border:`1px solid ${T.border}`,cursor:"pointer",background:"#fff"}}>
          <Av name={nombre} sz={24}/>
          <span style={{fontSize:13,fontWeight:600,color:T.t1,letterSpacing:"-.01em"}} className="hide-xs">{nombre}</span>
          <ChevronDown size={12} style={{color:T.t4}} aria-hidden="true"/>
        </div>
      </div>
    </header>
  );
}


const LINE_D=[{m:"Ene",v:10,p:20,pe:15},{m:"Feb",v:18,p:28,pe:14},{m:"Mar",v:30,p:35,pe:12},{m:"Abr",v:38,p:40,pe:16},{m:"May",v:48,p:45,pe:18},{m:"Jun",v:56,p:48,pe:21}];
const BAR_D=[{n:"Admón.",v:65},{n:"Derecho",v:72},{n:"Psicología",v:58},{n:"Diseño",v:80},{n:"Contaduría",v:61}];
const PIE_C=[T.amber,T.blue,T.purple,T.green,T.red,T.gray];

function DashboardPage({ setActive, kpi, rol }: { setActive:(s:string)=>void;kpi:KpiData|null;rol:Rol }) {
  const L=kpi===null;
  const PIE_D=[{name:"Pendiente",value:kpi?.equiv_pendientes??0},{name:"En proceso",value:kpi?.equiv_proceso??0},{name:"En revisión",value:0},{name:"Validadas",value:kpi?.equiv_validadas??0},{name:"Rechazadas",value:kpi?.equiv_rechazadas??0},{name:"Finalizadas",value:kpi?.equiv_finalizadas??0}];
  const KPIS=[
    {label:"Total alumnos",value:kpi?.total_estudiantes,icon:<Users size={15}/>,accent:T.brand,abg:"rgba(122,37,49,.07)",trend:"+12 este ciclo",up:true},
    {label:"Validadas",value:kpi?.equiv_validadas,icon:<CheckCircle size={15}/>,accent:T.green,abg:"rgba(22,101,52,.07)",trend:"45% del total",up:true},
    {label:"En proceso",value:kpi?.equiv_proceso,icon:<Clock size={15}/>,accent:T.blue,abg:"rgba(30,64,175,.07)",trend:"38% del total",up:null},
    {label:"Pendientes",value:kpi?.equiv_pendientes,icon:<AlertCircle size={15}/>,accent:T.amber,abg:"rgba(146,64,14,.07)",trend:"Requieren atención",up:false},
    {label:"Rechazadas",value:kpi?.equiv_rechazadas,icon:<X size={15}/>,accent:T.red,abg:"rgba(153,27,27,.07)",trend:"Sin cambio",up:null},
  ];
  const feed=[
    {c:"#4ade80",text:"Success Coach visualizando expediente de Juan Pérez",time:"Hace 2 min"},
    {c:T.orange,text:"Seguimiento editando equivalencia — Derecho Civil I",time:"Hace 5 min"},
    {c:T.blue,text:"Decano subió dictamen oficial — expediente #456987",time:"Hace 12 min"},
    {c:T.red,text:"Admisiones cambió estatus a Rechazado",time:"Hace 18 min"},
    {c:T.purple,text:"Nuevo alumno registrado — Pedro Sánchez",time:"Hace 31 min"},
  ];
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div>
          <p style={{fontSize:12,color:T.t3,marginBottom:4,display:"flex",alignItems:"center",gap:6,lineHeight:1}}><span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block"}} aria-hidden="true"/>En línea · {new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
          <h2 className="ptitle">¡Bienvenida, Candy García! 👋</h2>
        </div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><RefreshCw size={13} aria-hidden="true"/> Actualizar</button>
          <button className="btn bp" style={{fontSize:13}} onClick={()=>setActive("alumnos")}><Plus size={13} aria-hidden="true"/> Nuevo alumno</button>
        </div>
      </div>
      <section aria-label="KPIs" className="kgrid">
        {L?Array(5).fill(0).map((_,i)=><div key={i} className="kcard"><Sk w="40%" h={10} mb={14}/><Sk w="55%" h={28} mb={10}/><Sk w="65%" h={10}/></div>):KPIS.map((k,i)=>(
          <div key={i} className="kcard">
            <div className="fl-sb mb12"><div style={{width:34,height:34,borderRadius:9,background:k.abg,display:"flex",alignItems:"center",justifyContent:"center",color:k.accent}} aria-hidden="true">{k.icon}</div><ArrowUpRight size={13} style={{color:T.t4}} aria-hidden="true"/></div>
            <p style={{fontSize:"clamp(24px,4vw,32px)",fontWeight:900,color:T.t1,letterSpacing:"-.04em",lineHeight:1,marginBottom:5}} aria-live="polite">{k.value??0}</p>
            <p style={{fontSize:12.5,color:T.t3,marginBottom:7,lineHeight:1.3}}>{k.label}</p>
            <p style={{display:"flex",alignItems:"center",gap:4,fontSize:11.5,lineHeight:1}}>{k.up===true&&<TrendingUp size={11} style={{color:T.green}} aria-hidden="true"/>}<span style={{color:k.up===true?T.green:k.up===false?T.amber:T.t4,fontWeight:500}}>{k.trend}</span></p>
          </div>
        ))}
      </section>
      <div className="cgrid">
        <div className="card">
          <div className="fl-sb" style={{padding:"14px 18px 10px"}}>
            <div><p className="stitle">Equivalencias por período</p><p style={{fontSize:12,color:T.t3,marginTop:2}}>Ciclo 2025–2026</p></div>
            <button className="bg fl" style={{fontSize:12,padding:"5px 10px",minHeight:30,gap:4}}>2026A <ChevronDown size={11}/></button>
          </div>
          <div className="divider"/>
          <div style={{padding:"12px 8px"}} role="img" aria-label="Gráfica de equivalencias por período">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={LINE_D}>
                <defs>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green} stopOpacity=".14"/><stop offset="95%" stopColor={T.green} stopOpacity="0"/></linearGradient>
                  <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.blue} stopOpacity=".12"/><stop offset="95%" stopColor={T.blue} stopOpacity="0"/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" vertical={false}/>
                <XAxis dataKey="m" tick={{fontSize:11,fill:T.t4}} tickLine={false} axisLine={false}/>
                <YAxis tick={{fontSize:10.5,fill:T.t4}} tickLine={false} axisLine={false}/>
                <Tooltip content={<CT/>}/>
                <Area type="monotone" dataKey="v" stroke={T.green} strokeWidth={2} fill="url(#gV)" name="Validadas" dot={false}/>
                <Area type="monotone" dataKey="p" stroke={T.blue} strokeWidth={2} fill="url(#gP)" name="En proceso" dot={false}/>
                <Line type="monotone" dataKey="pe" stroke={T.amber} strokeWidth={1.5} dot={false} name="Pendientes" strokeDasharray="4 3"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div style={{padding:"14px 18px 10px"}}><p className="stitle">Por estatus</p><p style={{fontSize:12,color:T.t3,marginTop:2}}>Distribución actual</p></div>
          <div className="divider"/>
          <div style={{padding:"12px 8px"}} role="img" aria-label="Distribución por estatus">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart><Pie data={PIE_D} cx="50%" cy="44%" innerRadius={44} outerRadius={65} dataKey="value" paddingAngle={3} strokeWidth={0}>{PIE_D.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}</Pie><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:12.5}}/><Legend iconSize={7} wrapperStyle={{fontSize:11.5,color:T.t3,paddingTop:6,lineHeight:1.8}}/></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gap:"clamp(11px,1.5vw,15px)",gridTemplateColumns:"1fr",marginBottom:"clamp(12px,2vw,16px)"}}>
        <div className="card">
          <div style={{padding:"14px 18px 10px"}}><p className="stitle">Avance por carrera</p><p style={{fontSize:12,color:T.t3,marginTop:2}}>% completado</p></div>
          <div className="divider"/>
          <div style={{padding:"12px 4px"}} role="img" aria-label="Avance por carrera">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={BAR_D} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" horizontal={false}/>
                <XAxis type="number" tick={{fontSize:11,fill:T.t4}} tickLine={false} axisLine={false} domain={[0,100]} tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="n" tick={{fontSize:11.5,fill:T.t4}} tickLine={false} axisLine={false} width={66}/>
                <Tooltip content={<CT/>}/><Bar dataKey="v" fill={T.orange} radius={[0,5,5,0]} name="Avance" unit="%"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gap:"clamp(11px,1.5vw,15px)",gridTemplateColumns:"1fr",marginBottom:0}}>
        {(rol==="decano"||rol==="jefa_admisiones")&&(
          <div className="card">
            <div className="fl-sb" style={{padding:"14px 18px 10px"}}>
              <div className="fl g8"><Activity size={15} style={{color:T.brand}}/><p className="stitle">Actividad en Tiempo Real</p></div>
              <span style={{fontSize:11.5,color:T.green,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:T.green}} aria-hidden="true"/>En vivo</span>
            </div>
            <div className="divider"/>
            <div style={{padding:"12px 18px"}}>{feed.map((f,i)=><div key={i} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:i<feed.length-1?"1px solid rgba(0,0,0,.05)":"none"}}><div style={{width:8,height:8,borderRadius:"50%",background:f.c,marginTop:5,flexShrink:0}} aria-hidden="true"/><div><p style={{fontSize:13,color:T.t1,lineHeight:1.4}}>{f.text}</p><p style={{fontSize:11.5,color:T.t4,marginTop:2}}>{f.time}</p></div></div>)}</div>
          </div>
        )}
        <div className="card">
          <div className="fl-sb" style={{padding:"14px 18px 10px"}}><p className="stitle">Acciones rápidas</p><Sparkles size={13} style={{color:T.orange}}/></div>
          <div className="divider"/>
          <div style={{padding:"clamp(12px,2vw,14px)"}}>
            <div className="sgrid">{[{label:"Nuevo alumno",icon:<Users size={17}/>,fn:()=>setActive("alumnos"),c:T.brand},{label:"Equivalencia",icon:<FileText size={17}/>,fn:()=>setActive("equivalencias"),c:T.blue},{label:"Buscar",icon:<Search size={17}/>,fn:()=>setActive("alumnos"),c:T.purple},{label:"Seguimiento",icon:<GraduationCap size={17}/>,fn:()=>setActive("seguimiento"),c:T.green},{label:"Reportes",icon:<BarChart2 size={17}/>,fn:()=>setActive("reportes"),c:T.amber},{label:"Documentos",icon:<FolderOpen size={17}/>,fn:()=>setActive("documentos"),c:T.orange}].map(a=>(
              <button key={a.label} onClick={a.fn} style={{padding:"clamp(10px,2vw,14px) 6px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:11,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontSize:"clamp(11px,1.4vw,12.5px)",fontWeight:500,color:T.t2,width:"100%",minHeight:74,fontFamily:"inherit",transition:"all .13s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=a.c;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.sh3;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:38,height:38,borderRadius:9,background:`${a.c}12`,display:"flex",alignItems:"center",justifyContent:"center",color:a.c}} aria-hidden="true">{a.icon}</div>{a.label}
              </button>
            ))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


function AlumnosPage({ setActive, setExp }: { setActive:(s:string)=>void;setExp:(e:Estudiante)=>void; }) {
  const [list,setList]=useState<Estudiante[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [toast,setToast]=useState<{msg:string;ok:boolean}|null>(null);
  const [modal,setModal]=useState<"new"|"edit"|null>(null);
  const [editing,setEditing]=useState<Estudiante|null>(null);
  const [form,setForm]=useState({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo",telefono:""});
  const [ferrs,setFerrs]=useState<Record<string,string>>({});
  const [saving,setSaving]=useState(false);
  const [confirm,setConfirm]=useState<{id:string;nombre:string}|null>(null);
  const firstRef=useRef<HTMLInputElement>(null);
  const dS=useDebounce(search,250);
  const load=useCallback(async()=>{ setLoading(true); const {data}=await supabase.from("estudiantes").select("*,carreras(nombre,clave)").order("created_at",{ascending:false}); if(data) setList(data as Estudiante[]); setLoading(false); },[]);
  useEffect(()=>{load();},[load]);
  useEffect(()=>{ if(modal) setTimeout(()=>firstRef.current?.focus(),60); },[modal]);
  const filtered=list.filter(a=>a.nombre.toLowerCase().includes(dS.toLowerCase())||a.matricula.includes(dS)||a.correo.toLowerCase().includes(dS.toLowerCase()));
  function val(){const e:Record<string,string>={};if(!form.nombre.trim()) e.nombre="Requerido";if(!form.matricula.trim()) e.matricula="Requerido";if(!form.correo.trim()) e.correo="Requerido";else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo="Correo no válido";return e;}
  async function save(){const e=val();if(Object.keys(e).length){setFerrs(e);return;}setSaving(true);setFerrs({});if(modal==="new"){const {error}=await supabase.from("estudiantes").insert([form]);if(error) setToast({msg:error.message,ok:false});else{setToast({msg:"Alumno registrado ✓",ok:true});load();setModal(null);}}else if(editing){const {error}=await supabase.from("estudiantes").update(form).eq("id",editing.id);if(error) setToast({msg:error.message,ok:false});else{setToast({msg:"Cambios guardados ✓",ok:true});load();setModal(null);}}setSaving(false);}
  async function handleDel(){if(!confirm) return;const {error}=await supabase.from("estudiantes").delete().eq("id",confirm.id);setConfirm(null);if(error) setToast({msg:error.message,ok:false});else{setToast({msg:"Alumno eliminado",ok:true});load();}}
  function openEdit(a:Estudiante){setEditing(a);setFerrs({});setForm({nombre:a.nombre,correo:a.correo,matricula:a.matricula,ciclo:a.ciclo,estatus:a.estatus,telefono:a.telefono||""});setModal("edit");}
  function F({label,name,type="text",ph=""}:{label:string;name:string;type?:string;ph?:string}){return(<div><label htmlFor={`f-${name}`} className="flabel">{label}</label><input id={`f-${name}`} ref={name==="nombre"?firstRef:undefined} className={`inp ${ferrs[name]?"err":""}`} type={type} value={(form as Record<string,string>)[name]} onChange={e=>{setForm(p=>({...p,[name]:e.target.value}));setFerrs(p=>({...p,[name]:""}));}} placeholder={ph} aria-invalid={!!ferrs[name]}/>{ferrs[name]&&<p className="ferr"><AlertCircle size={11}/> {ferrs[name]}</p>}</div>);}
  return (
    <div className="pw">
      {toast&&<Toast {...toast} onDone={()=>setToast(null)}/>}
      {confirm&&<Confirm title="Eliminar alumno" msg={`¿Eliminar a "${confirm.nombre}"? Esta acción no se puede deshacer.`} onOk={handleDel} onCancel={()=>setConfirm(null)}/>}
      {modal&&(
        <div className="mover" role="dialog" aria-modal="true" aria-labelledby="mt">
          <div className="mbox">
            <div className="fl-sb" style={{padding:"18px 22px 14px",borderBottom:`1px solid ${T.border}`}}>
              <div><h2 id="mt" style={{fontSize:16,fontWeight:700,color:T.t1,letterSpacing:"-.03em",marginBottom:2}}>{modal==="new"?"Registrar nuevo alumno":"Editar alumno"}</h2><p style={{fontSize:13,color:T.t3,lineHeight:1.4}}>{modal==="new"?"Completa los datos del estudiante":"Actualiza la información"}</p></div>
              <button onClick={()=>setModal(null)} className="bg" aria-label="Cerrar" style={{padding:6,borderRadius:8,minHeight:32,display:"flex",alignItems:"center"}}><X size={17}/></button>
            </div>
            <div style={{padding:"18px 22px",display:"flex",flexDirection:"column",gap:13}}>
              <div className="g2"><F label="Nombre completo" name="nombre" ph="Ej. Ana Torres García"/><F label="Matrícula" name="matricula" ph="2026001"/></div>
              <F label="Correo electrónico" name="correo" type="email" ph="alumno@correo.com"/>
              <F label="Teléfono" name="telefono" ph="+52 33 1234 5678"/>
              <div className="g2">
                <div><label htmlFor="f-ciclo" className="flabel">Ciclo académico</label><select id="f-ciclo" className="inp" value={form.ciclo} onChange={e=>setForm(p=>({...p,ciclo:e.target.value}))}>{["2026A","2025B","2025A","2024B"].map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label htmlFor="f-est" className="flabel">Estatus</label><select id="f-est" className="inp" value={form.estatus} onChange={e=>setForm(p=>({...p,estatus:e.target.value}))}><option value="activo">Activo</option><option value="inactivo">Inactivo</option><option value="baja">Baja temporal</option></select></div>
              </div>
            </div>
            <div className="fl g8" style={{padding:"13px 22px",borderTop:`1px solid ${T.border}`,justifyContent:"flex-end"}}>
              <button onClick={()=>setModal(null)} className="btn bs" style={{padding:"8px 14px"}}>Cancelar</button>
              <button onClick={save} disabled={saving} className="btn bp" style={{padding:"8px 16px"}}>{saving?<><Sp size={13} label="Guardando"/> Guardando…</>:modal==="new"?"Registrar alumno":"Guardar cambios"}</button>
            </div>
          </div>
        </div>
      )}
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Alumnos</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>{loading?"Cargando…":`${list.length} estudiantes registrados · Ciclo 2026A`}</p></div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><Download size={13}/> Exportar</button>
          <button onClick={()=>{setModal("new");setFerrs({});setForm({nombre:"",correo:"",matricula:"",ciclo:"2026A",estatus:"activo",telefono:""}); }} className="btn bp" style={{fontSize:13}}><Plus size={13}/> Nuevo alumno</button>
        </div>
      </div>
      <div className="fl-w g8 mb16">
        <div style={{flex:1,minWidth:200,maxWidth:340,position:"relative"}}><Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.t4}} aria-hidden="true"/><input aria-label="Buscar alumno" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Nombre, matrícula o correo…" style={{width:"100%",minHeight:36,padding:"7px 12px 7px 32px",background:"#fff",color:T.t1,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=T.brand} onBlur={e=>e.target.style.borderColor=T.border}/></div>
        {[{l:"Carrera: Todas",o:["Administración","Derecho","Psicología","Diseño","Contaduría"]},{l:"Estatus: Todos",o:["Activo","Inactivo","Baja temporal"]},{l:"Success Coach: Todos",o:["Luis Castro","Martha Ruiz"]}].map(f=>(
          <select key={f.l} aria-label={f.l} style={{minHeight:36,padding:"7px 9px",background:"#fff",color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}}><option>{f.l}</option>{f.o.map(o=><option key={o}>{o}</option>)}</select>
        ))}
      </div>
      <div className="card t2c">
        {loading?(<div style={{padding:"clamp(30px,6vw,50px)",textAlign:"center"}} role="status"><Sp size={20} label="Cargando alumnos"/><p style={{fontSize:13.5,color:T.t3,marginTop:12,fontWeight:500}}>Cargando alumnos…</p></div>)
        :filtered.length===0?(<ES icon={<Users size={42}/>} title={search?"Sin resultados":"No hay alumnos"} desc={search?"Intenta con otro término":"Registra el primer alumno para comenzar"}/>):(
          <>
            <div className="mc" style={{padding:12}}>
              {filtered.map(a=>(
                <article key={a.id} style={{border:`1px solid ${T.border}`,borderRadius:12,padding:"13px 15px",marginBottom:9,background:"#fff"}}>
                  <div className="fl g10 mb10"><Av name={a.nombre} sz={38}/><div style={{flex:1,minWidth:0}}><p style={{fontWeight:700,fontSize:14.5,color:T.t1,letterSpacing:"-.02em",lineHeight:1.2}}>{a.nombre}</p><p style={{fontSize:12.5,color:T.t3,marginTop:2}}>{a.correo}</p></div><Badge s={a.estatus}/></div>
                  <dl style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:10}}>
                    {[{t:"Matrícula",v:a.matricula},{t:"Ciclo",v:a.ciclo},{t:"Carrera",v:a.carreras?.nombre??"—"}].map(({t,v})=>(
                      <div key={t} style={{background:T.s2,borderRadius:7,padding:"6px 9px",gridColumn:t==="Carrera"?"1/-1":"auto"}}><dt style={{fontSize:10,color:T.t4,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",lineHeight:1}}>{t}</dt><dd style={{fontSize:13,color:T.t1,fontWeight:500,marginTop:3,lineHeight:1.3}}>{v}</dd></div>
                    ))}
                  </dl>
                  <div className="fl g7">
                    <button onClick={()=>{setExp(a);setActive("expediente");}} className="btn bs" style={{flex:1,fontSize:13,justifyContent:"center",minHeight:36,padding:"7px 10px"}}><Eye size={13}/> Ver</button>
                    <button onClick={()=>openEdit(a)} className="btn bs" style={{flex:1,fontSize:13,justifyContent:"center",minHeight:36,padding:"7px 10px"}}><Pencil size={13}/> Editar</button>
                    <button onClick={()=>setConfirm({id:a.id,nombre:a.nombre})} className="btn bd" style={{flex:1,fontSize:13,justifyContent:"center",minHeight:36,padding:"7px 10px"}}><Trash2 size={13}/></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="tw">
              <table aria-label="Lista de alumnos">
                <thead><tr>{["ID","Matrícula","Alumno","Carrera","Ciclo","Success Coach","Estatus","Acciones"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{filtered.map((a,i)=>(
                  <tr key={a.id}>
                    <td><code style={{background:T.s2,color:T.t3,padding:"2px 6px",borderRadius:5,fontSize:12,fontFamily:"monospace"}}>{i+1}</code></td>
                    <td><code style={{background:T.s2,color:T.t2,padding:"2px 7px",borderRadius:6,fontSize:12.5,fontFamily:"monospace",fontWeight:600}}>{a.matricula}</code></td>
                    <td><div className="fl g9"><Av name={a.nombre} sz={30}/><div><p style={{fontWeight:600,fontSize:13.5,color:T.t1,letterSpacing:"-.01em",lineHeight:1.2}}>{a.nombre}</p><p style={{fontSize:12,color:T.t3,marginTop:1}}>{a.correo}</p></div></div></td>
                    <td style={{fontSize:13.5,color:T.t2}}>{a.carreras?.nombre??"—"}</td>
                    <td><span style={{background:T.blueM,color:T.blue,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{a.ciclo}</span></td>
                    <td style={{fontSize:13,color:T.t2}}>Luis Castro</td>
                    <td><Badge s={a.estatus}/></td>
                    <td><div className="fl g5">
                      <button onClick={()=>{setExp(a);setActive("expediente");}} className="bico" aria-label={`Ver expediente de ${a.nombre}`}><Eye size={13}/></button>
                      <button onClick={()=>openEdit(a)} className="bico" aria-label={`Editar ${a.nombre}`}><Pencil size={13}/></button>
                      <button onClick={()=>setConfirm({id:a.id,nombre:a.nombre})} className="bico" aria-label={`Eliminar ${a.nombre}`} style={{color:T.red,borderColor:"rgba(153,27,27,.18)"}}><Trash2 size={13}/></button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}
        <div className="fl-sb" style={{padding:"10px 14px",borderTop:`1px solid ${T.border}`,flexWrap:"wrap",gap:8}}>
          <p style={{fontSize:12.5,color:T.t3}}>Mostrando {filtered.length} de {list.length} resultados</p>
          <div className="fl g5">{["‹","1","2","3","…","25","›"].map((p,i)=><button key={i} style={{width:28,height:28,border:`1px solid ${p==="1"?T.brand:T.border}`,background:p==="1"?T.brand:"#fff",color:p==="1"?"#fff":T.t2,borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center"}}>{p}</button>)}</div>
        </div>
      </div>
    </div>
  );
}


function ExpedientePage({ estudiante, onBack }: { estudiante:Estudiante;onBack:()=>void }) {
  const [tab,setTab]=useState("general");
  const [equivs,setEquivs]=useState<Equivalencia[]>([]);
  const [loadE,setLoadE]=useState(true);
  const avance=67;
  const SEMS=[{s:1,pct:100,lbl:"Completo"},{s:2,pct:100,lbl:"Completo"},{s:3,pct:100,lbl:"Completo"},{s:4,pct:70,lbl:"70%"},{s:5,pct:0,lbl:"Pendiente"},{s:6,pct:0,lbl:"Pendiente"}];
  const HIST=[{time:"11:00 AM",user:"Admisiones",action:"Cambió estatus a Activo",color:T.orange},{time:"10:35 AM",user:"Decano",action:"Subió dictamen oficial",color:T.brand},{time:"10:22 AM",user:"Seguimiento Académico",action:"Agregó equivalencia: Derecho Civil I",color:T.green},{time:"10:15 AM",user:"Success Coach",action:"Modificó el programa a Derecho",color:T.blue},{time:"09:45 AM",user:"Sistema",action:"Alumno registrado en el sistema",color:T.gray}];
  useEffect(()=>{ supabase.from("equivalencias").select("*").eq("estudiante_id",estudiante.id).then(({data})=>{ if(data) setEquivs(data as Equivalencia[]); setLoadE(false); }); },[estudiante.id]);
  const tabs=[{id:"general",label:"Información general",icon:<Info size={13}/>},{id:"equivalencias",label:"Equivalencias",icon:<FileText size={13}/>},{id:"academico",label:"Avance académico",icon:<GraduationCap size={13}/>},{id:"documentos",label:"Documentos",icon:<FolderOpen size={13}/>},{id:"historial",label:"Historial",icon:<History size={13}/>}];
  return (
    <div className="pw">
      <div className="fl g10 mb20" style={{flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div className="fl g10" style={{alignItems:"center"}}>
          <button onClick={onBack} className="btn bs" style={{padding:"7px 12px",fontSize:13,minHeight:36,display:"flex",alignItems:"center",gap:6}}><ArrowLeft size={14}/> Alumnos</button>
          <h2 className="ptitle">Expediente del alumno</h2>
        </div>
        <button className="btn bp" style={{fontSize:13,padding:"8px 16px"}}><Pencil size={13}/> Editar información</button>
      </div>
      <div className="card mb16">
        <div style={{background:`linear-gradient(135deg,${T.brand4},${T.brand})`,padding:"clamp(18px,3vw,28px)"}}>
          <div className="fl g16" style={{flexWrap:"wrap",alignItems:"center"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"3px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:800,color:"#fff",flexShrink:0,letterSpacing:"-.02em"}}>{initials(estudiante.nombre)}</div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontWeight:800,fontSize:"clamp(17px,3vw,22px)",color:"#fff",letterSpacing:"-.03em",lineHeight:1.15,marginBottom:6}}>{estudiante.nombre}</p>
              <div className="fl" style={{flexWrap:"wrap",gap:"8px 20px"}}>
                {[{icon:<Hash size={12}/>,v:`Matrícula: ${estudiante.matricula}`},{icon:<BookOpen size={12}/>,v:`Carrera: ${estudiante.carreras?.nombre??"—"}`},{icon:<Calendar size={12}/>,v:`Ciclo: ${estudiante.ciclo}`},{icon:<Mail size={12}/>,v:estudiante.correo}].map(({icon,v},i)=>(
                  <span key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12.5,color:"rgba(255,255,255,.75)"}}><span style={{color:"rgba(255,255,255,.5)"}} aria-hidden="true">{icon}</span>{v}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"center",padding:"14px 20px",background:"rgba(255,255,255,.1)",borderRadius:12,flexShrink:0}}>
              <p style={{fontSize:36,fontWeight:900,color:T.orange,lineHeight:1,letterSpacing:"-.04em"}}>{avance}%</p>
              <p style={{fontSize:11.5,color:"rgba(255,255,255,.65)",marginTop:5,lineHeight:1}}>Avance académico</p>
              <div style={{height:5,background:"rgba(255,255,255,.2)",borderRadius:99,marginTop:8,overflow:"hidden"}}><div style={{height:"100%",width:`${avance}%`,background:T.orange,borderRadius:99}}/></div>
            </div>
          </div>
        </div>
        <div className="tabs" style={{padding:"0 clamp(12px,2vw,20px)"}}>
          {tabs.map(t=><button key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}><span aria-hidden="true">{t.icon}</span>{t.label}</button>)}
        </div>
      </div>
      {tab==="general"&&(
        <div className="card" style={{padding:"clamp(16px,3vw,24px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(200px,100%),1fr))",gap:14,marginBottom:22}}>
            {[{l:"Nombre completo",v:estudiante.nombre},{l:"Matrícula",v:estudiante.matricula},{l:"Correo",v:estudiante.correo},{l:"Teléfono",v:estudiante.telefono||"—"},{l:"Carrera",v:estudiante.carreras?.nombre||"—"},{l:"Clave",v:estudiante.carreras?.clave||"—"},{l:"Ciclo",v:estudiante.ciclo},{l:"Fecha de ingreso",v:fmtDate(estudiante.fecha_ingreso)},{l:"Success Coach",v:"Luis Castro"},{l:"Estatus",v:<Badge s={estudiante.estatus}/>}].map(({l,v},i)=>(
              <div key={i}><p style={{fontSize:11,color:T.t4,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:4,lineHeight:1}}>{l}</p><p style={{fontSize:14,color:T.t1,fontWeight:500,lineHeight:1.4}}>{v}</p></div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(140px,100%),1fr))",gap:10}}>
            {[{l:"Total materias",v:48,c:T.brand},{l:"Equiv. aprobadas",v:8,c:T.green},{l:"En proceso",v:3,c:T.blue},{l:"Pendientes",v:14,c:T.amber},{l:"Créditos obtenidos",v:134,c:T.purple},{l:"Créditos faltantes",v:66,c:T.t3}].map(({l,v,c},i)=>(
              <div key={i} style={{background:T.s2,borderRadius:10,padding:"12px 14px",border:`1px solid ${T.border}`}}>
                <p style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:900,color:c,letterSpacing:"-.04em",lineHeight:1,marginBottom:4}}>{v}</p>
                <p style={{fontSize:11.5,color:T.t3,lineHeight:1.3}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="equivalencias"&&(
        <div className="card t2c">
          {loadE?(<div style={{padding:40,textAlign:"center"}} role="status"><Sp size={20} label="Cargando equivalencias"/></div>)
          :equivs.length===0?(<ES icon={<FileText size={40}/>} title="Sin equivalencias" desc="Este alumno no tiene equivalencias registradas aún."/>):(
            <>
              <div className="mc" style={{padding:12}}>
                {equivs.map(e=>(
                  <div key={e.id} style={{border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:9,background:"#fff"}}>
                    <div className="fl-sb mb8"><p style={{fontWeight:700,fontSize:14,color:T.t1}}>{e.nombre_origen}</p><Badge s={e.estatus}/></div>
                    <p style={{fontSize:12.5,color:T.t2,marginBottom:4}}><span style={{color:T.t3}}>UAG: </span>{e.nombre_uag}</p>
                    <p style={{fontSize:12.5,color:T.t2}}><span style={{color:T.t3}}>Clave: </span>{e.clave_origen} · <span style={{color:T.t3}}>Créditos: </span>{e.creditos}</p>
                  </div>
                ))}
              </div>
              <div className="tw">
                <table aria-label="Equivalencias del alumno">
                  <thead><tr>{["Materia origen","Clave","Materia UAG","Créditos","Tipo","Estatus","Fecha","Observaciones"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>{equivs.map(e=>(
                    <tr key={e.id}>
                      <td><p style={{fontWeight:600,fontSize:13.5,color:T.t1}}>{e.nombre_origen}</p></td>
                      <td><code style={{background:T.s2,color:T.t2,padding:"2px 7px",borderRadius:5,fontSize:12,fontFamily:"monospace",fontWeight:600}}>{e.clave_origen}</code></td>
                      <td style={{fontSize:13.5,color:T.t1}}>{e.nombre_uag}</td>
                      <td><span style={{background:T.blueM,color:T.blue,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{e.creditos} cr.</span></td>
                      <td><span style={{background:T.purpleM,color:T.purple,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>Equivalencia</span></td>
                      <td><Badge s={e.estatus}/></td>
                      <td style={{fontSize:12.5,color:T.t3}}>{fmtDate(e.fecha_solicitud)}</td>
                      <td style={{fontSize:12.5,color:T.t3}}>{e.observaciones||"—"}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}
          <div style={{padding:"13px 16px",borderTop:`1px solid ${T.border}`}}><button className="btn bp" style={{fontSize:13,padding:"8px 14px"}}><Plus size={13}/> Nueva equivalencia</button></div>
        </div>
      )}
      {tab==="academico"&&(
        <div style={{display:"grid",gap:14}}>
          <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
            <p className="stitle" style={{marginBottom:16}}>Avance general de la carrera</p>
            <div className="fl g20" style={{flexWrap:"wrap",gap:"clamp(16px,3vw,32px)",alignItems:"center"}}>
              <div style={{position:"relative",width:130,height:130,flexShrink:0}} role="img" aria-label={`${avance}% de avance`}>
                <svg width="130" height="130" style={{transform:"rotate(-90deg)"}}>
                  <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(0,0,0,.07)" strokeWidth="10"/>
                  <circle cx="65" cy="65" r="54" fill="none" stroke={T.brand} strokeWidth="10" strokeDasharray={`${2*Math.PI*54*avance/100} ${2*Math.PI*54*(1-avance/100)}`} strokeLinecap="round"/>
                </svg>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <p style={{fontSize:28,fontWeight:900,color:T.t1,letterSpacing:"-.04em",lineHeight:1}}>{avance}%</p>
                  <p style={{fontSize:11,color:T.t3,marginTop:2}}>de avance</p>
                </div>
              </div>
              <div style={{flex:1,minWidth:160}}>
                {[{l:"Materias cursadas",v:26},{l:"Materias equivalentes",v:8},{l:"Pendientes por cursar",v:14},{l:"Total de materias",v:48},{l:"Créditos obtenidos",v:134},{l:"Créditos faltantes",v:66}].map(({l,v})=>(
                  <div key={l} className="stat-row"><p style={{fontSize:13.5,color:T.t2}}>{l}</p><p style={{fontSize:14,fontWeight:700,color:T.t1}}>{v}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
            <p className="stitle" style={{marginBottom:14}}>Avance por semestre</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {SEMS.map(({s,pct,lbl})=>(
                <div key={s} className="fl-sb g12">
                  <p style={{fontSize:13.5,color:T.t2,minWidth:90}}>Semestre {s}</p>
                  <div className="pbar" style={{flex:1}}><div className="pbar-f" style={{width:`${pct}%`,background:pct===100?T.green:pct>0?T.orange:T.grayM}}/></div>
                  <p style={{fontSize:12.5,fontWeight:600,color:pct===100?T.green:pct>0?T.orange:T.t4,minWidth:60,textAlign:"right"}}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab==="documentos"&&(
        <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
          <div className="fl-sb mb16"><p className="stitle">Documentación Oficial del Decano</p><button className="btn bp" style={{fontSize:13,padding:"7px 14px"}}><Upload size={13}/> Subir documento</button></div>
          <div style={{border:"2px dashed rgba(0,0,0,.1)",borderRadius:12,padding:"clamp(32px,6vw,52px) 24px",textAlign:"center",marginBottom:16,cursor:"pointer",background:T.s2}} onDragOver={e=>e.preventDefault()}>
            <Upload size={32} style={{color:T.t4,marginBottom:12}} aria-hidden="true"/>
            <p style={{fontSize:14,fontWeight:600,color:T.t2,marginBottom:5}}>Arrastra archivos o haz clic para subir</p>
            <p style={{fontSize:13,color:T.t3}}>PDF, Word, Excel · Máx. 25 MB</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(200px,100%),1fr))",gap:10}}>
            {[{name:"Kardex_JuanPerez.pdf",type:"PDF",date:"10/03/2026",size:"2.4 MB",color:T.red},{name:"Certificado_Parcial.pdf",type:"PDF",date:"10/03/2026",size:"1.1 MB",color:T.red},{name:"Dictamen_Oficial.pdf",type:"PDF",date:"12/03/2026",size:"540 KB",color:T.red}].map((d,i)=>(
              <div key={i} style={{border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",background:"#fff",transition:"all .13s"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.sh3;e.currentTarget.style.borderColor=T.brand;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=T.border;}}>
                <div className="fl g8 mb8">
                  <div style={{width:36,height:36,borderRadius:8,background:T.redL,display:"flex",alignItems:"center",justifyContent:"center",color:T.red,flexShrink:0}}><FileText size={16}/></div>
                  <div style={{flex:1,minWidth:0}}><p style={{fontSize:12.5,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</p><p style={{fontSize:11,color:T.t3,marginTop:1}}>{d.date} · {d.size}</p></div>
                </div>
                <div className="fl g6">
                  <button className="btn bs" style={{flex:1,fontSize:12,padding:"5px 8px",minHeight:30,justifyContent:"center"}}><Eye size={11}/> Ver</button>
                  <button className="btn bs" style={{flex:1,fontSize:12,padding:"5px 8px",minHeight:30,justifyContent:"center"}}><Download size={11}/> Descargar</button>
                  <button className="bico" style={{width:30,height:30,color:T.red,borderColor:"rgba(153,27,27,.2)"}} aria-label="Eliminar documento"><Trash2 size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="historial"&&(
        <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
          <div className="fl-sb mb16"><p className="stitle">Historial de cambios</p><button className="btn bs" style={{fontSize:12,padding:"6px 12px"}}><Download size={12}/> Exportar</button></div>
          <div>{HIST.map((h,i)=>(
            <div key={i} className="tl-item">
              <div className="tl-dot" style={{background:`${h.color}18`,color:h.color}}>{i+1}</div>
              <div style={{flex:1,paddingTop:4}}>
                <p style={{fontSize:13.5,fontWeight:600,color:T.t1,lineHeight:1.3}}>{h.action}</p>
                <div className="fl g10" style={{marginTop:4}}>
                  <p style={{fontSize:12,color:h.color,fontWeight:600}}>{h.user}</p>
                  <p style={{fontSize:12,color:T.t4}}>{h.time} · Hoy</p>
                </div>
              </div>
            </div>
          ))}</div>
        </div>
      )}
    </div>
  );
}


function EquivalenciasPage() {
  const [list,setList]=useState<Equivalencia[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [statusF,setStatusF]=useState("todos");
  const dS=useDebounce(search,250);
  useEffect(()=>{ supabase.from("equivalencias").select("*,estudiantes(nombre,matricula)").order("created_at",{ascending:false}).then(({data})=>{ if(data) setList(data as Equivalencia[]); setLoading(false); }); },[]);
  const filtered=list.filter(e=>{
    const matchS=e.nombre_origen.toLowerCase().includes(dS.toLowerCase())||e.estudiantes?.nombre?.toLowerCase().includes(dS.toLowerCase())||false;
    const matchSt=statusF==="todos"||e.estatus===statusF;
    return matchS&&matchSt;
  });
  const counts={pendiente:list.filter(e=>e.estatus==="pendiente").length,en_proceso:list.filter(e=>e.estatus==="en_proceso").length,en_revision:list.filter(e=>e.estatus==="en_revision").length,validado:list.filter(e=>e.estatus==="validado").length,rechazado:list.filter(e=>e.estatus==="rechazado").length,finalizado:list.filter(e=>e.estatus==="finalizado").length};
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Equivalencias</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>{loading?"Cargando…":`${list.length} registros totales`}</p></div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><Download size={13}/> Exportar</button>
          <button className="btn bp" style={{fontSize:13}}><Plus size={13}/> Nueva equivalencia</button>
        </div>
      </div>
      <div className="kgrid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(min(130px,100%),1fr))",marginBottom:16}}>
        {[{l:"Pendiente",v:counts.pendiente,c:T.amber,bg:T.amberM},{l:"En proceso",v:counts.en_proceso,c:T.blue,bg:T.blueM},{l:"En revisión",v:counts.en_revision,c:T.purple,bg:T.purpleM},{l:"Validadas",v:counts.validado,c:T.green,bg:T.greenM},{l:"Rechazadas",v:counts.rechazado,c:T.red,bg:T.redM},{l:"Finalizadas",v:counts.finalizado,c:T.gray,bg:T.grayM}].map(({l,v,c,bg})=>(
          <div key={l} style={{background:"#fff",border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .13s"}} onClick={()=>setStatusF(l.toLowerCase().replace(" ","_"))} onMouseEnter={e=>{e.currentTarget.style.borderColor=c;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>
            <p style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:900,color:c,lineHeight:1,marginBottom:4}}>{v}</p>
            <p style={{fontSize:11.5,color:T.t3}}>{l}</p>
          </div>
        ))}
      </div>
      <div className="fl-w g8 mb16">
        <div style={{flex:1,minWidth:200,maxWidth:340,position:"relative"}}><Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.t4}}/><input aria-label="Buscar equivalencia" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Alumno, materia, institución…" style={{width:"100%",minHeight:36,padding:"7px 12px 7px 32px",background:"#fff",color:T.t1,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=T.brand} onBlur={e=>e.target.style.borderColor=T.border}/></div>
        {[{l:"Estatus",o:["todos","pendiente","en_proceso","en_revision","validado","rechazado","finalizado"]},{l:"Carrera",o:["Todas","Administración","Derecho","Psicología"]},{l:"Período",o:["2026A","2025B","2025A"]}].map(f=>(
          <select key={f.l} aria-label={f.l} style={{minHeight:36,padding:"7px 9px",background:"#fff",color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}} onChange={e=>f.l==="Estatus"&&setStatusF(e.target.value)}><option value="todos">{f.l}: Todos</option>{f.o.filter(o=>o!=="todos").map(o=><option key={o} value={o}>{o}</option>)}</select>
        ))}
      </div>
      <div className="card t2c">
        {loading?(<div style={{padding:48,textAlign:"center"}} role="status"><Sp size={20} label="Cargando equivalencias"/><p style={{fontSize:13.5,color:T.t3,marginTop:12}}>Cargando equivalencias…</p></div>)
        :filtered.length===0?(<ES icon={<FileText size={40}/>} title="Sin equivalencias" desc="No se encontraron equivalencias con los filtros aplicados."/>):(
          <>
            <div className="mc" style={{padding:12}}>
              {filtered.map(e=>(
                <article key={e.id} style={{border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 15px",marginBottom:9,background:"#fff"}}>
                  <div className="fl-sb mb8"><p style={{fontWeight:700,fontSize:14,color:T.t1,lineHeight:1.2,flex:1,paddingRight:8}}>{e.nombre_origen}</p><Badge s={e.estatus}/></div>
                  <p style={{fontSize:12.5,color:T.t2,marginBottom:4}}><span style={{color:T.t3}}>Alumno: </span><strong>{e.estudiantes?.nombre??"—"}</strong></p>
                  <p style={{fontSize:12.5,color:T.t2,marginBottom:4}}><span style={{color:T.t3}}>Institución: </span>{e.institucion_origen}</p>
                  <div className="fl g8"><p style={{fontSize:12.5,color:T.t2}}><span style={{color:T.t3}}>UAG: </span>{e.nombre_uag}</p><span style={{background:T.blueM,color:T.blue,padding:"1px 7px",borderRadius:99,fontSize:11.5,fontWeight:600}}>{e.creditos} cr.</span></div>
                  <div className="fl g6" style={{marginTop:10}}>
                    <button className="bico" style={{width:32,height:32}} aria-label="Ver detalle"><Eye size={13}/></button>
                    <button className="bico" style={{width:32,height:32}} aria-label="Editar"><Pencil size={13}/></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="tw">
              <table aria-label="Lista de equivalencias">
                <thead><tr>{["Alumno","Materia Origen","Institución","Materia UAG","Créditos","Tipo","Estatus","Fecha","Acciones"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{filtered.map(e=>(
                  <tr key={e.id}>
                    <td><div className="fl g8"><Av name={e.estudiantes?.nombre??"?"} sz={26}/><div><p style={{fontWeight:600,fontSize:13,color:T.t1,lineHeight:1.2}}>{e.estudiantes?.nombre??"—"}</p><p style={{fontSize:11.5,color:T.t3,marginTop:1}}>{e.estudiantes?.matricula}</p></div></div></td>
                    <td><p style={{fontWeight:600,fontSize:13,color:T.t1}}>{e.nombre_origen}</p><p style={{fontSize:11.5,color:T.t3,marginTop:1}}>{e.clave_origen}</p></td>
                    <td style={{fontSize:13,color:T.t2}}>{e.institucion_origen}</td>
                    <td style={{fontSize:13,color:T.t1,fontWeight:500}}>{e.nombre_uag}</td>
                    <td><span style={{background:T.blueM,color:T.blue,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{e.creditos} cr.</span></td>
                    <td><span style={{background:T.purpleM,color:T.purple,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>Equivalencia</span></td>
                    <td><Badge s={e.estatus}/></td>
                    <td style={{fontSize:12.5,color:T.t3}}>{fmtDate(e.fecha_solicitud)}</td>
                    <td><div className="fl g5"><button className="bico" aria-label="Ver detalle"><Eye size={13}/></button><button className="bico" aria-label="Editar"><Pencil size={13}/></button></div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}
        <div style={{padding:"10px 14px",borderTop:`1px solid ${T.border}`}}><p style={{fontSize:12.5,color:T.t3}}>{filtered.length} de {list.length} equivalencias</p></div>
      </div>
    </div>
  );
}


function SeguimientoPage() {
  const materias=[
    {sem:1,nombre:"Introducción al Derecho",clave:"DER101",cred:6,tipo:"Obligatoria",est:"validado"},
    {sem:1,nombre:"Historia Universal",clave:"HIS101",cred:4,tipo:"Equivalencia",est:"validado"},
    {sem:2,nombre:"Derecho Civil I",clave:"DER201",cred:6,tipo:"Obligatoria",est:"validado"},
    {sem:2,nombre:"Sociología Jurídica",clave:"SOC201",cred:4,tipo:"Equivalencia",est:"en_proceso"},
    {sem:3,nombre:"Derecho Constitucional",clave:"DER301",cred:6,tipo:"Obligatoria",est:"en_revision"},
    {sem:3,nombre:"Matemáticas Básicas",clave:"MAT101",cred:4,tipo:"Equivalencia",est:"pendiente"},
    {sem:4,nombre:"Derecho Penal",clave:"DER401",cred:6,tipo:"Obligatoria",est:"pendiente"},
    {sem:4,nombre:"Filosofía del Derecho",clave:"FIL401",cred:4,tipo:"Obligatoria",est:"pendiente"},
  ];
  const sems=[...new Set(materias.map(m=>m.sem))];
  const creds={total:200,obtenidos:134,faltantes:66};
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Seguimiento Académico</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>Plan de estudios y avance por semestre</p></div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><Download size={13}/> Exportar plan</button>
        </div>
      </div>
      <div className="kgrid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(min(150px,100%),1fr))",marginBottom:16}}>
        {[{l:"Total materias",v:48,c:T.brand},{l:"Cursadas",v:26,c:T.green},{l:"Equivalentes",v:8,c:T.blue},{l:"Pendientes",v:14,c:T.amber},{l:"Créditos obtenidos",v:134,c:T.purple},{l:"Créditos faltantes",v:66,c:T.t3}].map(({l,v,c})=>(
          <div key={l} className="kcard" style={{padding:"14px 16px"}}>
            <p style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:900,color:c,letterSpacing:"-.04em",lineHeight:1,marginBottom:5}}>{v}</p>
            <p style={{fontSize:12,color:T.t3,lineHeight:1.3}}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gap:14,gridTemplateColumns:"1fr",marginBottom:16}}>
        <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
          <p className="stitle" style={{marginBottom:14}}>Avance de créditos</p>
          <div className="fl g14" style={{flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
            <div style={{flex:1,minWidth:200}}>
              <div className="fl-sb" style={{marginBottom:6}}><span style={{fontSize:13,color:T.t2}}>Créditos obtenidos</span><span style={{fontSize:13,fontWeight:700,color:T.green}}>{creds.obtenidos}/{creds.total}</span></div>
              <div className="pbar" style={{height:10}}><div className="pbar-f" style={{width:`${Math.round(creds.obtenidos/creds.total*100)}%`,background:T.green}}/></div>
            </div>
            <p style={{fontSize:36,fontWeight:900,color:T.brand,letterSpacing:"-.04em",lineHeight:1}}>{Math.round(creds.obtenidos/creds.total*100)}%</p>
          </div>
          <div className="fl g8" style={{flexWrap:"wrap"}}>
            {[{l:"Obligatorias",v:120,c:T.brand},{l:"Optativas",v:14,c:T.blue},{l:"Equivalencias",v:0,c:T.green}].map(({l,v,c})=>(
              <div key={l} style={{background:T.s2,borderRadius:8,padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0}} aria-hidden="true"/>
                <span style={{fontSize:12.5,color:T.t2}}>{l}: <strong style={{color:T.t1}}>{v} cr.</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {sems.map(sem=>(
        <div key={sem} className="card mb14">
          <div className="fl-sb" style={{padding:"13px 18px 10px"}}>
            <div className="fl g8">
              <span style={{background:T.brand,color:"#fff",padding:"3px 10px",borderRadius:99,fontSize:12,fontWeight:700}}>Semestre {sem}</span>
              <p className="stitle">Plan de estudios</p>
            </div>
            <span style={{fontSize:12,color:T.t3}}>{materias.filter(m=>m.sem===sem).length} materias</span>
          </div>
          <div className="divider"/>
          <div className="tw">
            <table>
              <thead><tr>{["Materia","Clave","Créditos","Tipo","Estatus"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{materias.filter(m=>m.sem===sem).map((m,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600,fontSize:13.5,color:T.t1}}>{m.nombre}</td>
                  <td><code style={{background:T.s2,color:T.t2,padding:"2px 7px",borderRadius:5,fontSize:12,fontFamily:"monospace",fontWeight:600}}>{m.clave}</code></td>
                  <td><span style={{background:T.blueM,color:T.blue,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{m.cred} cr.</span></td>
                  <td><span style={{background:m.tipo==="Equivalencia"?T.purpleM:T.grayM,color:m.tipo==="Equivalencia"?T.purple:T.gray,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{m.tipo}</span></td>
                  <td><Badge s={m.est}/></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarrerasPage() {
  const [list,setList]=useState<Carrera[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState<Carrera|null>(null);
  useEffect(()=>{ supabase.from("carreras").select("*").order("nombre").then(({data})=>{ if(data) setList(data as Carrera[]); setLoading(false); }); },[]);
  const filtered=list.filter(c=>c.nombre.toLowerCase().includes(search.toLowerCase())||c.clave.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Catálogo de Carreras</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>{loading?"Cargando…":`${list.length} programas activos`}</p></div>
        <button className="btn bp" style={{fontSize:13}}><Plus size={13}/> Nueva carrera</button>
      </div>
      <div className="fl-w g8 mb16">
        <div style={{position:"relative",flex:1,maxWidth:320}}><Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.t4}}/><input aria-label="Buscar carrera" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar carrera o clave…" style={{width:"100%",minHeight:36,padding:"7px 12px 7px 32px",background:"#fff",color:T.t1,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=T.brand} onBlur={e=>e.target.style.borderColor=T.border}/></div>
      </div>
      {selected?(
        <div className="card" style={{padding:"clamp(16px,3vw,24px)"}}>
          <div className="fl g10 mb20"><button onClick={()=>setSelected(null)} className="btn bs" style={{padding:"7px 12px",fontSize:13,minHeight:36,display:"flex",alignItems:"center",gap:6}}><ArrowLeft size={14}/> Regresar</button><h3 style={{fontSize:18,fontWeight:800,color:T.t1,letterSpacing:"-.03em"}}>{selected.nombre}</h3></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(150px,100%),1fr))",gap:12,marginBottom:20}}>
            {[{l:"Clave",v:selected.clave},{l:"Modalidad",v:selected.modalidad},{l:"Total materias",v:selected.total_materias},{l:"Créditos totales",v:selected.creditos_total}].map(({l,v})=>(
              <div key={l} style={{background:T.s2,borderRadius:10,padding:"12px 14px",border:`1px solid ${T.border}`}}><p style={{fontSize:10.5,color:T.t4,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{l}</p><p style={{fontSize:16,fontWeight:800,color:T.t1}}>{v}</p></div>
            ))}
          </div>
          <p className="stitle" style={{marginBottom:12}}>Plan de estudios (muestra)</p>
          <div className="tw">
            <table>
              <thead><tr>{["Semestre","Clave","Materia","Créditos","Tipo"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{[{s:1,c:"DER101",n:"Introducción al Derecho",cr:6,t:"Obligatoria"},{s:1,c:"HIS101",n:"Historia Universal",cr:4,t:"Optativa"},{s:2,c:"DER201",n:"Derecho Civil I",cr:6,t:"Obligatoria"},{s:2,c:"SOC201",n:"Sociología Jurídica",cr:4,t:"Optativa"}].map((m,i)=>(
                <tr key={i}><td><span style={{background:T.blueM,color:T.blue,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:700}}>Sem. {m.s}</span></td><td><code style={{background:T.s2,color:T.t2,padding:"2px 7px",borderRadius:5,fontSize:12,fontFamily:"monospace",fontWeight:600}}>{m.c}</code></td><td style={{fontSize:13.5,fontWeight:500,color:T.t1}}>{m.n}</td><td><span style={{background:T.purpleM,color:T.purple,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{m.cr} cr.</span></td><td><span style={{background:m.t==="Obligatoria"?T.redL:T.greenL,color:m.t==="Obligatoria"?T.red:T.green,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{m.t}</span></td></tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      ):(
        <div className="card">
          {loading?(<div style={{padding:40,textAlign:"center"}} role="status"><Sp size={20} label="Cargando carreras"/></div>)
          :filtered.length===0?(<ES icon={<BookOpen size={40}/>} title="Sin resultados" desc="No se encontraron carreras con ese término."/>):(
            <div className="tw">
              <table aria-label="Catálogo de carreras">
                <thead><tr>{["Carrera","Clave","Modalidad","Total materias","Créditos","Acciones"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{filtered.map(c=>(
                  <tr key={c.id}>
                    <td><p style={{fontWeight:700,fontSize:13.5,color:T.t1}}>{c.nombre}</p></td>
                    <td><code style={{background:T.s2,color:T.t2,padding:"2px 8px",borderRadius:6,fontSize:12,fontFamily:"monospace",fontWeight:700}}>{c.clave}</code></td>
                    <td><span style={{background:T.greenM,color:T.green,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{c.modalidad}</span></td>
                    <td style={{textAlign:"center",fontWeight:700,color:T.t1}}>{c.total_materias}</td>
                    <td style={{textAlign:"center",fontWeight:700,color:T.t1}}>{c.creditos_total}</td>
                    <td><div className="fl g5">
                      <button onClick={()=>setSelected(c)} className="bico" aria-label={`Ver carrera ${c.nombre}`}><Eye size={13}/></button>
                      <button className="bico" aria-label={`Editar ${c.nombre}`}><Pencil size={13}/></button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function ReportesPage() {
  const [periodo,setPeriodo]=useState("2026A");
  const [carrera,setCarrera]=useState("todas");
  const coach_data=[{name:"Luis Castro",equiv:45,tiempo:3.2},{name:"Martha Ruiz",equiv:38,tiempo:4.1},{name:"Ana Gómez",equiv:52,tiempo:2.8},{name:"Carlos Vega",equiv:29,tiempo:5.0}];
  const KPIS=[{l:"Total estudiantes",v:247,c:T.brand,icon:<Users size={16}/>},{l:"Equiv. aprobadas",v:156,c:T.green,icon:<CheckCircle size={16}/>},{l:"Equiv. pendientes",v:38,c:T.amber,icon:<Clock size={16}/>},{l:"Equiv. rechazadas",v:22,c:T.red,icon:<X size={16}/>},{l:"Tiempo promedio",v:"3.4 días",c:T.blue,icon:<Calendar size={16}/>},{l:"Tasa de aprobación",v:"88%",c:T.purple,icon:<Target size={16}/>}];
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Reportes e Indicadores</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>Análisis completo de equivalencias académicas</p></div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><Download size={13}/> PDF</button>
          <button className="btn bs" style={{fontSize:13}}><Download size={13}/> Excel</button>
          <button className="btn bp" style={{fontSize:13}}><Download size={13}/> CSV</button>
        </div>
      </div>
      <div className="card mb16" style={{padding:"14px 18px"}}>
        <div className="fl-w g12">
          <div className="fl g8">
            <span style={{fontSize:13,color:T.t2,fontWeight:500}}>Filtros:</span>
            {[{l:"Período",o:["2026A","2025B","2025A"],v:periodo,fn:setPeriodo},{l:"Carrera",o:["todas","Administración","Derecho","Psicología","Diseño","Contaduría"],v:carrera,fn:setCarrera}].map(f=>(
              <select key={f.l} value={f.v} onChange={e=>f.fn(e.target.value)} style={{minHeight:34,padding:"6px 9px",background:T.s2,color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>{f.o.map(o=><option key={o} value={o}>{f.l}: {o}</option>)}</select>
            ))}
            {["Success Coach: Todos","Estatus: Todos"].map(l=>(
              <select key={l} style={{minHeight:34,padding:"6px 9px",background:T.s2,color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}}><option>{l}</option></select>
            ))}
          </div>
          <button className="btn bs" style={{fontSize:13,padding:"7px 12px",marginLeft:"auto"}}><RefreshCw size={13}/> Aplicar</button>
        </div>
      </div>
      <div className="kgrid mb16">
        {KPIS.map((k,i)=>(
          <div key={i} className="kcard" style={{padding:"clamp(14px,2vw,18px)"}}>
            <div className="fl-sb mb10"><div style={{width:32,height:32,borderRadius:8,background:`${k.c}12`,display:"flex",alignItems:"center",justifyContent:"center",color:k.c}}>{k.icon}</div><ArrowUpRight size={13} style={{color:T.t4}}/></div>
            <p style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:900,color:T.t1,letterSpacing:"-.04em",lineHeight:1,marginBottom:4}}>{k.v}</p>
            <p style={{fontSize:12,color:T.t3}}>{k.l}</p>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gap:14,gridTemplateColumns:"1fr",marginBottom:14}}>
        <div style={{display:"grid",gap:14,gridTemplateColumns:"1fr"}}>
          {[
            {title:"Equivalencias por período",sub:"Tendencia mensual 2025–2026",content:(
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={LINE_D}>
                  <defs><linearGradient id="r1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green} stopOpacity=".14"/><stop offset="95%" stopColor={T.green} stopOpacity="0"/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" vertical={false}/>
                  <XAxis dataKey="m" tick={{fontSize:11,fill:T.t4}} tickLine={false} axisLine={false}/>
                  <YAxis tick={{fontSize:10.5,fill:T.t4}} tickLine={false} axisLine={false}/>
                  <Tooltip content={<CT/>}/>
                  <Area type="monotone" dataKey="v" stroke={T.green} strokeWidth={2} fill="url(#r1)" name="Validadas" dot={false}/>
                  <Line type="monotone" dataKey="p" stroke={T.blue} strokeWidth={2} dot={false} name="En proceso"/>
                </AreaChart>
              </ResponsiveContainer>
            )},
            {title:"Carreras con más equivalencias",sub:"Ranking por programa",content:(
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={BAR_D} layout="vertical" barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" horizontal={false}/>
                  <XAxis type="number" tick={{fontSize:11,fill:T.t4}} tickLine={false} axisLine={false}/>
                  <YAxis type="category" dataKey="n" tick={{fontSize:11.5,fill:T.t4}} tickLine={false} axisLine={false} width={70}/>
                  <Tooltip content={<CT/>}/><Bar dataKey="v" fill={T.orange} radius={[0,5,5,0]} name="Equivalencias"/>
                </BarChart>
              </ResponsiveContainer>
            )},
          ].map(({title,sub,content},i)=>(
            <div key={i} className="card">
              <div style={{padding:"14px 18px 10px"}}><p className="stitle">{title}</p><p style={{fontSize:12,color:T.t3,marginTop:2}}>{sub}</p></div>
              <div className="divider"/>
              <div style={{padding:"12px 8px"}}>{content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="fl-sb" style={{padding:"14px 18px 10px"}}><div><p className="stitle">Productividad por Success Coach</p><p style={{fontSize:12,color:T.t3,marginTop:2}}>Equivalencias procesadas y tiempo promedio</p></div></div>
        <div className="divider"/>
        <div className="tw">
          <table aria-label="Productividad por Success Coach">
            <thead><tr>{["Success Coach","Equivalencias procesadas","Tiempo promedio (días)","Tasa de aprobación","Estatus"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{coach_data.map((c,i)=>(
              <tr key={i}>
                <td><div className="fl g8"><Av name={c.name} sz={30}/><p style={{fontWeight:600,fontSize:13.5,color:T.t1}}>{c.name}</p></div></td>
                <td><div style={{display:"flex",alignItems:"center",gap:10}}><div className="pbar" style={{width:80}}><div className="pbar-f" style={{width:`${Math.min(100,c.equiv*2)}%`,background:T.orange}}/></div><span style={{fontSize:13,fontWeight:700,color:T.t1}}>{c.equiv}</span></div></td>
                <td><span style={{fontSize:14,fontWeight:700,color:c.tiempo<=3.5?T.green:T.amber}}>{c.tiempo} días</span></td>
                <td><span style={{fontSize:13,fontWeight:700,color:T.green}}>{Math.round(85+Math.random()*10)}%</span></td>
                <td><span style={{background:T.greenM,color:T.green,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>Activo</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function DocumentosPage({ rol }: { rol:Rol }) {
  const isDecano=rol==="decano";
  const docs=[{name:"Dictamen_Oficial_2026.pdf",tipo:"Dictamen",alumno:"Juan Pérez Gómez",fecha:"12/03/2026",size:"1.2 MB",ver:"v2.0"},{name:"Kardex_AnaLopez.pdf",tipo:"Kardex",alumno:"Ana López Ramírez",fecha:"10/03/2026",size:"2.4 MB",ver:"v1.0"},{name:"Certificado_MariaFernandez.pdf",tipo:"Certificado",alumno:"María Fernández",fecha:"09/03/2026",size:"890 KB",ver:"v1.0"},{name:"Programa_Estudios_DER.pdf",tipo:"Plan de estudios",alumno:"—",fecha:"01/03/2026",size:"450 KB",ver:"v3.1"},{name:"Dictamen_CarlosMartinez.pdf",tipo:"Dictamen",alumno:"Carlos Martínez",fecha:"08/03/2026",size:"760 KB",ver:"v1.0"}];
  const tipos=["Todos","Dictamen","Kardex","Certificado","Plan de estudios"];
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div>
          <div className="fl g8 mb4"><FolderOpen size={16} style={{color:T.brand}}/><h2 className="ptitle">Gestión Documental</h2></div>
          <p style={{fontSize:13.5,color:T.t3}}>Repositorio oficial de documentos académicos</p>
        </div>
        {isDecano&&<button className="btn bp" style={{fontSize:13}}><Upload size={13}/> Subir documento</button>}
      </div>
      {isDecano&&(
        <div style={{border:"2px dashed rgba(0,0,0,.1)",borderRadius:14,padding:"clamp(28px,5vw,48px) 24px",textAlign:"center",marginBottom:20,cursor:"pointer",background:"#fff",transition:"all .13s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.brand;e.currentTarget.style.background=T.greenL;}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,.1)";e.currentTarget.style.background="#fff";}}>
          <div style={{width:52,height:52,borderRadius:12,background:T.redL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Upload size={24} style={{color:T.brand}}/></div>
          <p style={{fontSize:14.5,fontWeight:700,color:T.t1,marginBottom:5}}>Arrastra archivos o haz clic para subir</p>
          <p style={{fontSize:13,color:T.t3,marginBottom:10}}>PDF, Word, Excel · Máx. 25 MB por archivo</p>
          <span style={{background:T.brand,color:"#fff",padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Seleccionar archivos</span>
        </div>
      )}
      {!isDecano&&(<div className="alert ai mb16"><Shield size={15} style={{flexShrink:0,marginTop:1}}/><span>Solo el Decano puede subir, modificar o eliminar documentos. Tienes acceso de solo lectura.</span></div>)}
      <div className="fl-w g8 mb16">
        <div style={{flex:1,minWidth:200,position:"relative"}}><Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.t4}}/><input aria-label="Buscar documento" placeholder="Nombre del documento o alumno…" style={{width:"100%",minHeight:36,padding:"7px 12px 7px 32px",background:"#fff",color:T.t1,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13.5,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=T.brand} onBlur={e=>e.target.style.borderColor=T.border}/></div>
        <select style={{minHeight:36,padding:"7px 9px",background:"#fff",color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:9,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>{tipos.map(t=><option key={t}>{t}</option>)}</select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:12}}>
        {docs.map((d,i)=>(
          <div key={i} className="card" style={{padding:"16px",transition:"all .13s",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.sh4;e.currentTarget.style.borderColor=T.brand;}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=T.sh2;e.currentTarget.style.borderColor="rgba(0,0,0,.08)";}}>
            <div className="fl g10 mb12">
              <div style={{width:42,height:42,borderRadius:10,background:T.redL,display:"flex",alignItems:"center",justifyContent:"center",color:T.red,flexShrink:0}}><FileText size={20}/></div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:13,fontWeight:700,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.3}}>{d.name}</p>
                <div className="fl g6" style={{marginTop:4}}>
                  <span style={{background:T.blueM,color:T.blue,padding:"1px 6px",borderRadius:99,fontSize:11,fontWeight:600}}>{d.tipo}</span>
                  <span style={{background:T.grayM,color:T.gray,padding:"1px 6px",borderRadius:99,fontSize:11,fontWeight:600}}>{d.ver}</span>
                </div>
              </div>
            </div>
            <div style={{marginBottom:10}}>
              <p style={{fontSize:12,color:T.t3,marginBottom:2}}><span style={{fontWeight:500,color:T.t2}}>Alumno:</span> {d.alumno}</p>
              <p style={{fontSize:12,color:T.t3}}><span style={{fontWeight:500,color:T.t2}}>Subido:</span> {d.fecha} · {d.size}</p>
            </div>
            <div className="fl g6">
              <button className="btn bs" style={{flex:1,fontSize:12,padding:"6px 8px",minHeight:32,justifyContent:"center"}}><Eye size={11}/> Ver</button>
              <button className="btn bs" style={{flex:1,fontSize:12,padding:"6px 8px",minHeight:32,justifyContent:"center"}}><Download size={11}/> Descargar</button>
              {isDecano&&<button className="bico" style={{width:32,height:32,color:T.red,borderColor:"rgba(153,27,27,.2)"}} aria-label="Eliminar"><Trash2 size={12}/></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsuariosPage() {
  const usuarios: Usuario[]=[
    {id:"1",nombre:"Candy García",correo:"candy.garcia@uag.mx",rol:"jefa_admisiones",activo:true,ultimo_login:"2026-03-12T10:30:00"},
    {id:"2",nombre:"Roberto Méndez",correo:"roberto.mendez@uag.mx",rol:"decano",activo:true,ultimo_login:"2026-03-12T09:00:00"},
    {id:"3",nombre:"Luis Castro",correo:"luis.castro@uag.mx",rol:"success_coach",activo:true,ultimo_login:"2026-03-12T11:00:00"},
    {id:"4",nombre:"Martha Ruiz",correo:"martha.ruiz@uag.mx",rol:"success_coach",activo:true,ultimo_login:"2026-03-11T16:00:00"},
    {id:"5",nombre:"Ana Gómez",correo:"ana.gomez@uag.mx",rol:"seguimiento_academico",activo:true,ultimo_login:"2026-03-12T08:30:00"},
    {id:"6",nombre:"Pedro Soto",correo:"pedro.soto@uag.mx",rol:"seguimiento_academico",activo:false,ultimo_login:"2026-03-01T10:00:00"},
  ];
  const RLB: Record<string,string>={"decano":"Decano","jefa_admisiones":"Jefa de Admisiones","success_coach":"Success Coach","seguimiento_academico":"Seguimiento Académico"};
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div><h2 className="ptitle">Usuarios y Permisos</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>{usuarios.length} usuarios registrados · {usuarios.filter(u=>u.activo).length} activos</p></div>
        <button className="btn bp" style={{fontSize:13}}><Plus size={13}/> Nuevo usuario</button>
      </div>
      <div className="kgrid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(min(150px,100%),1fr))",marginBottom:16}}>
        {[{l:"Total usuarios",v:usuarios.length,c:T.brand},{l:"Activos",v:usuarios.filter(u=>u.activo).length,c:T.green},{l:"Inactivos",v:usuarios.filter(u=>!u.activo).length,c:T.red},{l:"Roles asignados",v:4,c:T.blue}].map(({l,v,c})=>(
          <div key={l} className="kcard" style={{padding:"14px 16px"}}><p style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:900,color:c,letterSpacing:"-.04em",lineHeight:1,marginBottom:5}}>{v}</p><p style={{fontSize:12,color:T.t3}}>{l}</p></div>
        ))}
      </div>
      <div className="card t2c">
        <div className="mc" style={{padding:12}}>
          {usuarios.map(u=>(
            <article key={u.id} style={{border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 15px",marginBottom:9,background:"#fff"}}>
              <div className="fl g10 mb8"><Av name={u.nombre} sz={36}/><div style={{flex:1,minWidth:0}}><p style={{fontWeight:700,fontSize:14,color:T.t1,lineHeight:1.2}}>{u.nombre}</p><p style={{fontSize:12.5,color:T.t3,marginTop:2}}>{u.correo}</p></div><Badge s={u.activo?"activo":"inactivo"}/></div>
              <p style={{fontSize:12.5,color:T.t2,marginBottom:6}}><span style={{color:T.t3}}>Rol: </span><strong>{RLB[u.rol]??u.rol}</strong></p>
              <p style={{fontSize:12,color:T.t4}}>Último acceso: {fmtDate(u.ultimo_login||"")}</p>
            </article>
          ))}
        </div>
        <div className="tw">
          <table aria-label="Lista de usuarios">
            <thead><tr>{["Usuario","Correo","Rol","Último acceso","Estatus","Acciones"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{usuarios.map(u=>(
              <tr key={u.id}>
                <td><div className="fl g9"><Av name={u.nombre} sz={30}/><p style={{fontWeight:600,fontSize:13.5,color:T.t1}}>{u.nombre}</p></div></td>
                <td style={{fontSize:13,color:T.t2}}>{u.correo}</td>
                <td><span style={{background:T.purpleM,color:T.purple,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{RLB[u.rol]??u.rol}</span></td>
                <td style={{fontSize:12.5,color:T.t3}}>{fmtDate(u.ultimo_login||"")}</td>
                <td><Badge s={u.activo?"activo":"inactivo"}/></td>
                <td><div className="fl g5"><button className="bico" aria-label={`Editar ${u.nombre}`}><Pencil size={13}/></button><button className="bico" aria-label={`Eliminar ${u.nombre}`} style={{color:T.red,borderColor:"rgba(153,27,27,.18)"}}><Trash2 size={13}/></button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function AuditoriaPage() {
  const [logs,setLogs]=useState<AuditLog[]>([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState({tabla:"todos",accion:"todas",fecha:""});
  useEffect(()=>{ supabase.from("historial_cambios").select("*").order("created_at",{ascending:false}).limit(100).then(({data})=>{ if(data) setLogs(data as AuditLog[]); setLoading(false); }); },[]);
  const mock: AuditLog[]=[
    {id:"1",tabla:"estudiantes",accion:"crear",campo:"estatus",valor_antes:"",valor_despues:"activo",created_at:"2026-03-12T11:00:00"},
    {id:"2",tabla:"equivalencias",accion:"modificar",campo:"estatus",valor_antes:"pendiente",valor_despues:"validado",created_at:"2026-03-12T10:45:00"},
    {id:"3",tabla:"documentos",accion:"subir",campo:"nombre_archivo",valor_antes:"",valor_despues:"Dictamen_Oficial.pdf",created_at:"2026-03-12T10:30:00"},
    {id:"4",tabla:"equivalencias",accion:"crear",campo:"",valor_antes:"",valor_despues:"Historia Universal — UAG",created_at:"2026-03-12T10:15:00"},
    {id:"5",tabla:"usuarios",accion:"login",campo:"",valor_antes:"",valor_despues:"candy.garcia@uag.mx",created_at:"2026-03-12T09:00:00"},
    {id:"6",tabla:"estudiantes",accion:"modificar",campo:"carrera_id",valor_antes:"Administración","valor_despues":"Derecho",created_at:"2026-03-11T16:30:00"},
    {id:"7",tabla:"equivalencias",accion:"eliminar",campo:"",valor_antes:"Sociología General",valor_despues:"",created_at:"2026-03-11T15:00:00"},
  ];
  const display=logs.length>0?logs:mock;
  const getACls=(a:string)=>a==="crear"?{bg:T.greenL,c:T.green}:a==="eliminar"?{bg:T.redL,c:T.red}:a==="login"?{bg:T.blueL,c:T.blue}:{bg:T.amberL,c:T.amber};
  return (
    <div className="pw">
      <div className="fl-sb fl-w g12 mb20">
        <div>
          <div className="fl g8 mb4"><Lock size={16} style={{color:T.brand}}/><h2 className="ptitle">Auditoría del Sistema</h2></div>
          <p style={{fontSize:13.5,color:T.t3}}>Registro inmutable de todas las acciones. Solo lectura.</p>
        </div>
        <div className="fl g8">
          <button className="btn bs" style={{fontSize:13}}><Filter size={13}/> Filtros</button>
          <button className="btn bp" style={{fontSize:13}}><Download size={13}/> Exportar</button>
        </div>
      </div>
      <div className="alert ai mb16"><Lock size={15} style={{flexShrink:0,marginTop:1}}/><span>Los registros de auditoría son inmutables. No pueden ser modificados ni eliminados para garantizar la trazabilidad completa del sistema.</span></div>
      <div className="card mb16" style={{padding:"14px 18px"}}>
        <div className="fl-w g8">
          {[{l:"Tabla",o:["todos","estudiantes","equivalencias","documentos","usuarios"]},{l:"Acción",o:["todas","crear","modificar","eliminar","login","subir"]},{l:"Módulo",o:["Todos","Alumnos","Equivalencias","Documentos","Usuarios"]}].map(f=>(
            <select key={f.l} aria-label={f.l} style={{minHeight:34,padding:"6px 9px",background:T.s2,color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",cursor:"pointer",outline:"none"}}><option>{f.l}: Todos</option>{f.o.filter(o=>o!=="todos"&&o!=="todas").map(o=><option key={o} value={o}>{o}</option>)}</select>
          ))}
          <input type="date" style={{minHeight:34,padding:"6px 9px",background:T.s2,color:T.t2,border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
          <div style={{flex:1,minWidth:180,position:"relative"}}><Search size={13} style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:T.t4}}/><input aria-label="Buscar en auditoría" placeholder="Buscar usuario, acción, módulo…" style={{width:"100%",minHeight:34,padding:"6px 12px 6px 30px",background:T.s2,color:T.t1,border:`1.5px solid ${T.border}`,borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none"}} onFocus={e=>e.target.style.borderColor=T.brand} onBlur={e=>e.target.style.borderColor=T.border}/></div>
        </div>
      </div>
      <div className="card t2c">
        {loading&&logs.length===0?(
          <div style={{padding:48,textAlign:"center"}} role="status"><Sp size={20} label="Cargando auditoría"/><p style={{fontSize:13.5,color:T.t3,marginTop:12}}>Cargando registros…</p></div>
        ):(
          <>
            <div className="mc" style={{padding:12}}>
              {display.map((l,i)=>{ const {bg,c}=getACls(l.accion); return (
                <div key={l.id} style={{border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8,background:"#fff"}}>
                  <div className="fl-sb mb6">
                    <span style={{background:bg,color:c,padding:"2px 8px",borderRadius:99,fontSize:11.5,fontWeight:600}}>{l.accion}</span>
                    <span style={{fontSize:11,color:T.t4}}>{fmtDate(l.created_at)} {fmtTime(l.created_at)}</span>
                  </div>
                  <p style={{fontSize:13,fontWeight:600,color:T.t1,marginBottom:4}}>{l.tabla}</p>
                  {l.campo&&<p style={{fontSize:12.5,color:T.t2,marginBottom:2}}><span style={{color:T.t3}}>Campo: </span>{l.campo}</p>}
                  {l.valor_antes&&<p style={{fontSize:12.5,color:T.red}}><span style={{color:T.t3}}>Antes: </span>{l.valor_antes}</p>}
                  {l.valor_despues&&<p style={{fontSize:12.5,color:T.green}}><span style={{color:T.t3}}>Después: </span>{l.valor_despues}</p>}
                </div>
              ); })}
            </div>
            <div className="tw">
              <table aria-label="Log de auditoría">
                <thead><tr>{["Fecha / Hora","Usuario","Rol","Módulo","Acción","Campo","Valor anterior","Valor nuevo"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{display.map(l=>{ const {bg,c}=getACls(l.accion); return (
                  <tr key={l.id}>
                    <td style={{fontSize:12,color:T.t3,whiteSpace:"nowrap"}}>{fmtDate(l.created_at)}<br/><span style={{fontSize:11}}>{fmtTime(l.created_at)}</span></td>
                    <td style={{fontSize:13,color:T.t2}}>Sistema</td>
                    <td><span style={{background:T.purpleM,color:T.purple,padding:"2px 7px",borderRadius:99,fontSize:11,fontWeight:600}}>Admin</span></td>
                    <td><code style={{background:T.s2,color:T.t2,padding:"2px 7px",borderRadius:5,fontSize:12,fontFamily:"monospace"}}>{l.tabla}</code></td>
                    <td><span style={{background:bg,color:c,padding:"2px 8px",borderRadius:99,fontSize:12,fontWeight:600}}>{l.accion}</span></td>
                    <td style={{fontSize:13,color:T.t2}}>{l.campo||"—"}</td>
                    <td style={{fontSize:12.5,color:T.red,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.valor_antes||"—"}</td>
                    <td style={{fontSize:12.5,color:T.green,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.valor_despues||"—"}</td>
                  </tr>
                ); })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div style={{padding:"10px 14px",borderTop:`1px solid ${T.border}`}}><p style={{fontSize:12.5,color:T.t3}}>{display.length} registros · Solo lectura</p></div>
      </div>
    </div>
  );
}

function ConfigPage() {
  const sections=[
    {title:"Información del sistema",items:[{l:"Nombre de la plataforma",v:"UAG — Gestión de Equivalencias"},{l:"Versión",v:"v3.0 Enterprise"},{l:"Institución",v:"Universidad Autónoma de Guadalajara"},{l:"Módulo",v:"Programas Online"}]},
    {title:"Notificaciones",items:[{l:"Notificaciones por correo",v:"Activadas"},{l:"Alertas de equivalencias pendientes",v:"Activadas"},{l:"Resumen semanal",v:"Desactivado"}]},
    {title:"Seguridad",items:[{l:"Autenticación de dos factores",v:"Desactivada"},{l:"Sesiones simultáneas",v:"1 sesión por usuario"},{l:"Tiempo de sesión",v:"8 horas"}]},
  ];
  return (
    <div className="pw">
      <div className="mb20"><h2 className="ptitle">Configuración</h2><p style={{fontSize:13.5,color:T.t3,marginTop:3}}>Preferencias y configuración del sistema</p></div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {sections.map((s,si)=>(
          <div key={si} className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
            <div className="fl-sb mb14"><p className="stitle">{s.title}</p><button className="btn bs" style={{fontSize:12,padding:"6px 12px",minHeight:32}}><Pencil size={12}/> Editar</button></div>
            <div className="divider" style={{marginBottom:14}}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))",gap:12}}>
              {s.items.map(({l,v},i)=>(
                <div key={i} style={{background:T.s2,borderRadius:9,padding:"11px 14px"}}>
                  <p style={{fontSize:11,color:T.t4,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{l}</p>
                  <p style={{fontSize:14,color:T.t1,fontWeight:500}}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="card" style={{padding:"clamp(16px,3vw,22px)"}}>
          <p className="stitle" style={{marginBottom:14}}>Zona de peligro</p>
          <div className="divider" style={{marginBottom:14}}/>
          <div className="alert ae" style={{marginBottom:14}}><AlertTriangle size={15} style={{flexShrink:0}}/><span>Las siguientes acciones son irreversibles. Procede con extrema precaución.</span></div>
          <div className="fl g8" style={{flexWrap:"wrap"}}>
            <button className="btn bd" style={{fontSize:13}}>Limpiar caché del sistema</button>
            <button className="btn bd" style={{fontSize:13}}>Exportar base de datos completa</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function LoginPage({ onLogin }: { onLogin:(u:User)=>void }) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [loading,setLoading]=useState(false);
  const eRef=useRef<HTMLInputElement>(null);
  useEffect(()=>{ eRef.current?.focus(); },[]);
  function validate(){const e:Record<string,string>={};if(!email) e.email="Requerido";else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email="Correo no válido";if(!pass) e.pass="Requerido";return e;}
  async function handleLogin(ev?:React.FormEvent){ev?.preventDefault();const e=validate();if(Object.keys(e).length){setErrors(e);return;}setLoading(true);setErrors({});const {data,error}=await supabase.auth.signInWithPassword({email,password:pass});setLoading(false);if(error){setPass("");setErrors({auth:"Correo o contraseña incorrectos."});eRef.current?.focus();return;}if(data.user) onLogin(data.user);}
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <div className="ll" style={{flex:"0 0 46%",flexDirection:"column",justifyContent:"space-between",padding:"clamp(36px,5vw,56px)",position:"relative",overflow:"hidden",background:`linear-gradient(150deg,${T.brand4} 0%,${T.brand3} 45%,${T.brand} 100%)`}}>
        <div style={{position:"absolute",top:-80,right:-80,width:380,height:380,borderRadius:"50%",background:"rgba(196,95,0,.1)",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-60,left:-40,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,.03)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{marginBottom:52}}><UAGLogo white size={28}/></div>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"5px 12px",background:"rgba(196,95,0,.18)",border:"1px solid rgba(196,95,0,.32)",borderRadius:99,marginBottom:20}}>
            <Building2 size={11} style={{color:T.orange}}/>
            <span style={{fontSize:11.5,fontWeight:600,color:T.orange,letterSpacing:".04em"}}>Uso exclusivo — Personal administrativo UAG</span>
          </div>
          <h1 style={{color:"#fff",fontSize:"clamp(26px,4vw,38px)",fontWeight:900,lineHeight:1.1,letterSpacing:"-.05em",marginBottom:16}}>Plataforma de<br/>Gestión de<br/>Equivalencias</h1>
          <p style={{color:"rgba(255,255,255,.58)",fontSize:14.5,lineHeight:1.65,maxWidth:340}}>Centraliza la gestión, control y seguimiento de equivalencias académicas de estudiantes de nuevo ingreso en Programas Online.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:44}}>
            {[[<Users size={13}/>, "Gestión de Alumnos"],[<FileText size={13}/>, "Control de Equivalencias"],[<GraduationCap size={13}/>,"Seguimiento Académico"],[<BarChart2 size={13}/>, "Reportes e Indicadores"],[<History size={13}/>, "Auditoría del Sistema"],[<Activity size={13}/>, "Actividad en Tiempo Real"]].map(([icon,label],i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.07)"}}>
                <span style={{color:T.orange,flexShrink:0}} aria-hidden="true">{icon as React.ReactNode}</span>
                <span style={{fontSize:12.5,color:"rgba(255,255,255,.72)",fontWeight:500,lineHeight:1.3}}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{position:"relative",zIndex:1,fontSize:11.5,color:"rgba(255,255,255,.28)"}}>© 2026 UAG Online · Plataforma Enterprise v3.0 · Todos los derechos reservados</p>
      </div>
      <div style={{flex:1,background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(22px,5vw,48px) clamp(18px,4vw,40px)",minHeight:"100vh"}}>
        <div style={{width:"100%",maxWidth:400}} className="fade-up">
          <div className="lm" style={{background:`linear-gradient(135deg,${T.brand4},${T.brand})`,borderRadius:14,padding:"18px 20px",marginBottom:26}}>
            <UAGLogo white size={22}/>
            <p style={{color:"rgba(255,255,255,.58)",fontSize:13,marginTop:10,lineHeight:1.5}}>Plataforma Enterprise · Gestión de Equivalencias UAG</p>
          </div>
          <div style={{marginBottom:26}}>
            <h1 style={{fontSize:"clamp(21px,4vw,25px)",fontWeight:800,color:T.t1,letterSpacing:"-.04em",marginBottom:4,lineHeight:1.2}}>Iniciar sesión</h1>
            <p style={{color:T.t3,fontSize:14,lineHeight:1.5}}>Accede con tu cuenta institucional UAG</p>
          </div>
          <form onSubmit={handleLogin} noValidate>
            {errors.auth&&<div className="alert ae mb14" role="alert"><AlertCircle size={15} style={{flexShrink:0,marginTop:1}}/><span>{errors.auth}</span></div>}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div>
                <label htmlFor="le" className="flabel">Correo institucional</label>
                <div style={{position:"relative"}}><Mail size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:T.t4,pointerEvents:"none"}}/><input id="le" ref={eRef} className={`inp ${errors.email?"err":""}`} type="email" value={email} onChange={e=>{setEmail(e.target.value);setErrors(p=>({...p,email:""}));}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="usuario@uag.mx" autoComplete="email" style={{paddingLeft:34}} aria-invalid={!!errors.email}/></div>
                {errors.email&&<p className="ferr"><AlertCircle size={11}/> {errors.email}</p>}
              </div>
              <div>
                <div className="fl-sb" style={{marginBottom:5}}><label htmlFor="lp" className="flabel" style={{marginBottom:0}}>Contraseña</label><button type="button" style={{background:"none",border:"none",fontSize:13,color:T.brand,fontWeight:500,cursor:"pointer",fontFamily:"inherit",padding:0}}>¿Olvidaste tu contraseña?</button></div>
                <div style={{position:"relative"}}><Shield size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:T.t4,pointerEvents:"none"}}/><input id="lp" className={`inp ${errors.pass?"err":""}`} type="password" value={pass} onChange={e=>{setPass(e.target.value);setErrors(p=>({...p,pass:""}));}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Tu contraseña" autoComplete="current-password" style={{paddingLeft:34}} aria-invalid={!!errors.pass}/></div>
                {errors.pass&&<p className="ferr"><AlertCircle size={11}/> {errors.pass}</p>}
              </div>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13.5,color:T.t2,userSelect:"none"}}><input type="checkbox" defaultChecked style={{width:15,height:15,accentColor:T.brand,cursor:"pointer"}}/>Mantener sesión iniciada</label>
              <button type="submit" disabled={loading} className="btn bp" style={{width:"100%",padding:"11px",fontSize:14.5,borderRadius:10,boxShadow:T.shB,letterSpacing:"-.01em"}}>{loading?<><Sp size={14} label="Iniciando sesión"/> Verificando…</>:<>Iniciar sesión <ChevronRight size={15}/></>}</button>
            </div>
          </form>
          <p style={{textAlign:"center",marginTop:22,fontSize:13,color:T.t4}}>¿Necesitas ayuda? <button style={{background:"none",border:"none",color:T.brand,fontWeight:600,cursor:"pointer",fontSize:"inherit",fontFamily:"inherit",padding:0}}>Soporte técnico</button></p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:14,marginTop:28,paddingTop:20,borderTop:`1px solid ${T.border}`}}>
            {["🔒 Cifrado SSL","🛡️ Datos seguros","⚡ Alta disponibilidad"].map(t=><span key={t} style={{fontSize:11.5,color:T.t4,fontWeight:500}}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function UAGPage() {
  const [user,setUser]=useState<User|null>(null);
  const [rol,setRol]=useState<Rol>("jefa_admisiones");
  const [active,setActive]=useState("dashboard");
  const [kpi,setKpi]=useState<KpiData|null>(null);
  const [checking,setChecking]=useState(true);
  const [sideOpen,setSideOpen]=useState(false);
  const [exp,setExp]=useState<Estudiante|null>(null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{ setUser(data.session?.user??null); setChecking(false); });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>setUser(s?.user??null));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!user) return;
    (async()=>{
      const {data:uData}=await supabase.from("usuarios").select("rol_id,roles(nombre)").eq("id",user.id).single();
      if(uData&&(uData as any).roles?.nombre) setRol((uData as any).roles.nombre as Rol);
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
      setKpi({total_estudiantes:e.count??0,equiv_pendientes:pe.count??0,equiv_proceso:pr.count??0,equiv_validadas:va.count??0,equiv_rechazadas:re.count??0,equiv_finalizadas:fi.count??0});
    })();
  },[user]);

  async function logout(){ await supabase.auth.signOut(); setUser(null); setActive("dashboard"); setKpi(null); }

  const pageTitle=active==="expediente"&&exp?`Expediente — ${exp.nombre}`:PAGE_TITLES[active]??"";

  function renderPage(){
    if(active==="expediente"&&exp) return <ExpedientePage estudiante={exp} onBack={()=>{ setActive("alumnos"); setExp(null); }}/>;
    switch(active){
      case "dashboard":     return <DashboardPage setActive={setActive} kpi={kpi} rol={rol}/>;
      case "alumnos":       return <AlumnosPage setActive={setActive} setExp={setExp}/>;
      case "equivalencias": return <EquivalenciasPage/>;
      case "seguimiento":   return <SeguimientoPage/>;
      case "carreras":      return <CarrerasPage/>;
      case "reportes":      return <ReportesPage/>;
      case "documentos":    return <DocumentosPage rol={rol}/>;
      case "usuarios":      return <UsuariosPage/>;
      case "auditoria":     return <AuditoriaPage/>;
      case "config":        return <ConfigPage/>;
      default:              return <DashboardPage setActive={setActive} kpi={kpi} rol={rol}/>;
    }
  }

  if(checking) return (
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:18,background:T.bg,fontFamily:"Inter,system-ui,sans-serif"}} role="status">
        <UAGLogo size={28}/>
        <div className="fl g10" style={{color:T.t3,fontSize:14}}><Sp size={16} label="Cargando"/> Verificando sesión…</div>
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
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <div style={{display:"flex",minHeight:"100vh",background:T.bg}}>
        <Sidebar active={active} setActive={v=>{ setActive(v); setExp(null); setSideOpen(false); }} user={user} rol={rol} onLogout={logout} open={sideOpen} onClose={()=>setSideOpen(false)}/>
        <div className="mw" style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          <Topbar user={user} onMenu={()=>setSideOpen(p=>!p)} pageTitle={pageTitle}/>
          <main id="main-content" role="main" style={{flex:1,overflowY:"auto",overflowX:"hidden"}} key={active} className="fade-up">
            {renderPage()}
          </main>
        </div>
      </div>
    </>
  );
}
