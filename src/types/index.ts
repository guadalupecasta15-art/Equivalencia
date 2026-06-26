export type Rol =
  | "decano"
  | "jefa_admisiones"
  | "success_coach"
  | "seguimiento_academico";

export type EstatusEstudiante = "activo" | "inactivo" | "baja";

export type EstatusEquivalencia =
  | "pendiente"
  | "en_proceso"
  | "en_revision"
  | "validado"
  | "rechazado"
  | "finalizado";

export type TipoDocumento =
  | "kardex"
  | "certificado_parcial"
  | "certificado_total"
  | "programa_estudios"
  | "dictamen"
  | "otro";

export interface Role {
  id: string;
  nombre: Rol;
  descripcion?: string;
  permisos: Record<string, string>;
  created_at: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol_id?: string;
  activo: boolean;
  ultimo_login?: string;
  created_at: string;
  updated_at: string;
  roles?: Role;
}

export interface Carrera {
  id: string;
  nombre: string;
  clave: string;
  creditos_total: number;
  total_materias: number;
  modalidad: string;
  requisitos?: string;
  activo: boolean;
  created_at: string;
}

export interface Materia {
  id: string;
  carrera_id: string;
  clave: string;
  nombre: string;
  creditos: number;
  semestre: number;
  obligatoria: boolean;
  created_at: string;
  carreras?: Carrera;
}

export interface Estudiante {
  id: string;
  matricula: string;
  nombre: string;
  correo: string;
  telefono?: string;
  carrera_id?: string;
  ciclo: string;
  fecha_ingreso: string;
  coach_id?: string;
  estatus: EstatusEstudiante;
  observaciones?: string;
  created_at: string;
  updated_at: string;
  carreras?: Carrera;
  usuarios?: Usuario;
}

export interface Equivalencia {
  id: string;
  estudiante_id: string;
  clave_origen: string;
  nombre_origen: string;
  institucion_origen: string;
  materia_uag_id?: string;
  clave_uag: string;
  nombre_uag: string;
  creditos: number;
  fecha_solicitud: string;
  observaciones?: string;
  estatus: EstatusEquivalencia;
  usuario_responsable?: string;
  created_at: string;
  updated_at: string;
  estudiantes?: Pick<Estudiante, "nombre" | "matricula">;
  materias?: Materia;
}

export interface Documento {
  id: string;
  estudiante_id: string;
  equivalencia_id?: string;
  tipo: TipoDocumento;
  nombre_archivo: string;
  storage_path: string;
  tamaño_bytes?: number;
  mime_type?: string;
  subido_por?: string;
  observaciones?: string;
  created_at: string;
  estudiantes?: Pick<Estudiante, "nombre" | "matricula">;
}

export interface HistorialCambio {
  id: string;
  tabla: string;
  registro_id: string;
  usuario_id?: string;
  accion: string;
  campo?: string;
  valor_antes?: string;
  valor_despues?: string;
  ip?: string;
  created_at: string;
  usuarios?: Pick<Usuario, "nombre" | "correo">;
}

export interface KpiDashboard {
  total_estudiantes: number;
  equiv_pendientes: number;
  equiv_proceso: number;
  equiv_validadas: number;
  equiv_rechazadas: number;
  equiv_finalizadas: number;
}
