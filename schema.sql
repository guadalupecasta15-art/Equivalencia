-- =====================================================
-- UAG EQUIVALENCIAS — Schema completo para Supabase
-- Ejecuta en: Supabase Dashboard > SQL Editor > New query
-- =====================================================

-- 1. ROLES
CREATE TABLE IF NOT EXISTS roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  permisos    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (nombre, descripcion) VALUES
  ('decano',               'Acceso total al sistema'),
  ('jefa_admisiones',      'Gestión administrativa completa'),
  ('success_coach',        'Consulta y seguimiento académico'),
  ('seguimiento_academico','Validación de equivalencias')
ON CONFLICT (nombre) DO NOTHING;


-- 2. USUARIOS (extiende auth.users de Supabase)
CREATE TABLE IF NOT EXISTS usuarios (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre       TEXT NOT NULL,
  correo       TEXT NOT NULL UNIQUE,
  rol_id       UUID REFERENCES roles(id),
  activo       BOOLEAN DEFAULT TRUE,
  ultimo_login TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);


-- 3. CARRERAS
CREATE TABLE IF NOT EXISTS carreras (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre         TEXT NOT NULL,
  clave          TEXT NOT NULL UNIQUE,
  creditos_total INT NOT NULL DEFAULT 0,
  total_materias INT NOT NULL DEFAULT 0,
  modalidad      TEXT DEFAULT 'En línea',
  requisitos     TEXT,
  activo         BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO carreras (nombre, clave, creditos_total, total_materias) VALUES
  ('Administración de Empresas',       'ADM', 360, 48),
  ('Derecho',                          'DER', 420, 54),
  ('Psicología',                       'PSI', 360, 48),
  ('Diseño Gráfico',                   'DIS', 330, 45),
  ('Contaduría',                       'CON', 390, 46),
  ('Ingeniería Industrial',            'ING', 400, 50),
  ('Lic. en Sistemas Computacionales', 'SIS', 380, 48)
ON CONFLICT (clave) DO NOTHING;


-- 4. MATERIAS
CREATE TABLE IF NOT EXISTS materias (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrera_id  UUID NOT NULL REFERENCES carreras(id) ON DELETE CASCADE,
  clave       TEXT NOT NULL,
  nombre      TEXT NOT NULL,
  creditos    INT NOT NULL DEFAULT 0,
  semestre    INT NOT NULL DEFAULT 1,
  obligatoria BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(carrera_id, clave)
);


-- 5. ESTUDIANTES
CREATE TABLE IF NOT EXISTS estudiantes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matricula     TEXT NOT NULL UNIQUE,
  nombre        TEXT NOT NULL,
  correo        TEXT NOT NULL,
  telefono      TEXT,
  carrera_id    UUID REFERENCES carreras(id),
  ciclo         TEXT NOT NULL DEFAULT '2026A',
  fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
  coach_id      UUID REFERENCES usuarios(id),
  estatus       TEXT NOT NULL DEFAULT 'activo'
                CHECK (estatus IN ('activo','inactivo','baja')),
  observaciones TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_estudiantes_carrera ON estudiantes(carrera_id);
CREATE INDEX IF NOT EXISTS idx_estudiantes_ciclo   ON estudiantes(ciclo);
CREATE INDEX IF NOT EXISTS idx_estudiantes_estatus ON estudiantes(estatus);


-- 6. EQUIVALENCIAS
CREATE TABLE IF NOT EXISTS equivalencias (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id       UUID NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  clave_origen        TEXT NOT NULL,
  nombre_origen       TEXT NOT NULL,
  institucion_origen  TEXT NOT NULL,
  materia_uag_id      UUID REFERENCES materias(id),
  clave_uag           TEXT NOT NULL DEFAULT '',
  nombre_uag          TEXT NOT NULL,
  creditos            INT NOT NULL DEFAULT 0,
  fecha_solicitud     DATE NOT NULL DEFAULT CURRENT_DATE,
  observaciones       TEXT,
  estatus             TEXT NOT NULL DEFAULT 'pendiente'
                      CHECK (estatus IN ('pendiente','en_proceso','en_revision','validado','rechazado','finalizado')),
  usuario_responsable UUID REFERENCES usuarios(id),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_equiv_estudiante ON equivalencias(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_equiv_estatus    ON equivalencias(estatus);


-- 7. DOCUMENTOS
CREATE TABLE IF NOT EXISTS documentos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id   UUID NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  equivalencia_id UUID REFERENCES equivalencias(id),
  tipo            TEXT NOT NULL
                  CHECK (tipo IN ('kardex','certificado_parcial','certificado_total','programa_estudios','dictamen','otro')),
  nombre_archivo  TEXT NOT NULL,
  storage_path    TEXT NOT NULL,
  tamaño_bytes    BIGINT,
  mime_type       TEXT,
  subido_por      UUID REFERENCES usuarios(id),
  observaciones   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_docs_estudiante ON documentos(estudiante_id);


-- 8. HISTORIAL DE CAMBIOS (auditoría completa)
CREATE TABLE IF NOT EXISTS historial_cambios (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tabla         TEXT NOT NULL,
  registro_id   UUID NOT NULL,
  usuario_id    UUID REFERENCES usuarios(id),
  accion        TEXT NOT NULL,
  campo         TEXT,
  valor_antes   TEXT,
  valor_despues TEXT,
  ip            TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hist_registro ON historial_cambios(registro_id);
CREATE INDEX IF NOT EXISTS idx_hist_fecha    ON historial_cambios(created_at DESC);


-- 9. TRIGGER updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER estudiantes_updated_at
  BEFORE UPDATE ON estudiantes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER equivalencias_updated_at
  BEFORE UPDATE ON equivalencias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- 10. VISTA KPI DASHBOARD
CREATE OR REPLACE VIEW v_kpi_dashboard AS
SELECT
  (SELECT COUNT(*) FROM estudiantes  WHERE estatus = 'activo')      AS total_estudiantes,
  (SELECT COUNT(*) FROM equivalencias WHERE estatus = 'pendiente')   AS equiv_pendientes,
  (SELECT COUNT(*) FROM equivalencias WHERE estatus = 'en_proceso')  AS equiv_proceso,
  (SELECT COUNT(*) FROM equivalencias WHERE estatus = 'validado')    AS equiv_validadas,
  (SELECT COUNT(*) FROM equivalencias WHERE estatus = 'rechazado')   AS equiv_rechazadas,
  (SELECT COUNT(*) FROM equivalencias WHERE estatus = 'finalizado')  AS equiv_finalizadas;


-- 11. ROW LEVEL SECURITY (RLS)
ALTER TABLE estudiantes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE equivalencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios      ENABLE ROW LEVEL SECURITY;

-- Políticas: usuarios autenticados tienen acceso completo
-- (refina por rol una vez que estés en producción)
CREATE POLICY "auth_all_estudiantes"   ON estudiantes   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_equiv"         ON equivalencias FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_docs"          ON documentos    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_read_usuarios"     ON usuarios      FOR SELECT TO authenticated USING (true);


-- 12. DATOS DE PRUEBA (opcional — elimina si no los necesitas)
-- Asegúrate de tener al menos un estudiante para probar el CRUD
DO $$
DECLARE
  carrera_adm UUID;
BEGIN
  SELECT id INTO carrera_adm FROM carreras WHERE clave = 'ADM' LIMIT 1;

  IF carrera_adm IS NOT NULL THEN
    INSERT INTO estudiantes (matricula, nombre, correo, carrera_id, ciclo, estatus) VALUES
      ('2026001', 'Juan Pérez Gómez',    'juan.perez@correo.com',    carrera_adm, '2026A', 'activo'),
      ('2026002', 'Ana López Ramírez',   'ana.lopez@correo.com',     carrera_adm, '2026A', 'activo'),
      ('2026003', 'María Fernández',     'maria.fernandez@correo.com',carrera_adm,'2026A', 'activo')
    ON CONFLICT (matricula) DO NOTHING;
  END IF;
END $$;
