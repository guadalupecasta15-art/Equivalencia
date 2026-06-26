# UAG Online — Plataforma de Gestión de Equivalencias

## Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Supabase** (Auth + PostgreSQL + Storage)
- **Recharts** (gráficas)
- **Lucide React** (íconos)

---

## Inicio rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el schema en Supabase
Abre **Supabase Dashboard → SQL Editor → New query**, pega el contenido de `schema.sql` y ejecuta.

### 3. Crear tu usuario en Supabase Auth
**Authentication → Users → Add user**
```
Email:    tu@uag.mx
Password: (la que elijas)
```

### 4. Variables de entorno
El archivo `.env.local` ya está configurado con tus credenciales.
Si necesitas cambiarlo:
```env
NEXT_PUBLIC_SUPABASE_URL=https://nfvkhzrxfpqbyseacjvu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 5. Correr en desarrollo
```bash
npm run dev
# → http://localhost:3000
```

### 6. Deploy en Vercel
```bash
npx vercel --prod
```
Asegúrate de agregar las variables de entorno en el panel de Vercel.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx          ← Página principal (login + dashboard)
│   ├── layout.tsx        ← Root layout con fuente Inter
│   └── globals.css       ← Estilos globales + animaciones
├── lib/
│   └── supabase/
│       ├── client.ts     ← Cliente para Client Components
│       └── server.ts     ← Cliente para Server Components
├── middleware.ts          ← Protección de rutas con Auth
└── types/
    └── index.ts          ← Tipos TypeScript del dominio
schema.sql                ← Schema completo de la BD
```

---

## Módulos implementados

| Módulo | Estado | Fuente de datos |
|--------|--------|----------------|
| Login / Logout | ✅ | Supabase Auth real |
| Dashboard KPIs | ✅ | Vista `v_kpi_dashboard` |
| Gráficas (barras / doughnut / líneas) | ✅ | Datos en vivo |
| Alumnos — CRUD completo | ✅ | Tabla `estudiantes` |
| Equivalencias — listado | ✅ | Tabla `equivalencias` |
| Seguimiento Académico | 🔧 Placeholder | — |
| Documentos | 🔧 Placeholder | — |
| Reportes | 🔧 Placeholder | — |
| Usuarios y Permisos | 🔧 Placeholder | — |

---

## Tablas en Supabase

| Tabla | Descripción |
|-------|-------------|
| `roles` | 4 roles: decano, jefa_admisiones, success_coach, seguimiento_academico |
| `usuarios` | Extensión de auth.users con rol asignado |
| `carreras` | 7 carreras de Programas Online |
| `materias` | Plan de estudios por carrera |
| `estudiantes` | Alumnos con CRUD completo |
| `equivalencias` | Solicitudes con estatus y auditoría |
| `documentos` | Referencias a Supabase Storage |
| `historial_cambios` | Auditoría completa de cambios |
| `v_kpi_dashboard` | Vista para KPIs del dashboard |
