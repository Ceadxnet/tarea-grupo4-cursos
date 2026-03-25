/**
 * Validaciones compartidas para alta y actualización de cursos.
 */

const MODALIDADES_VALIDAS = Object.freeze(['Presencial', 'Virtual', 'Hibrida']);

function _str(v) {
  return v === undefined || v === null ? '' : String(v).trim();
}

/**
 * Valida el cuerpo completo (POST y PUT según la consigna).
 * @returns {{ ok: true, datos: object } | { ok: false, errores: string[] }}
 */
function validarCursoCompleto(body) {
  const errores = [];
  const nombre = _str(body?.nombre);
  const descripcion = _str(body?.descripcion);
  const docente = _str(body?.docente);
  const { creditos, horas, modalidad } = body || {};

  if (!nombre) errores.push('El nombre es obligatorio');
  if (!descripcion) errores.push('La descripcion es obligatoria');
  if (!docente) errores.push('El docente es obligatorio');
  if (creditos === undefined || creditos === null || creditos === '') {
    errores.push('Los creditos son obligatorios');
  }
  if (horas === undefined || horas === null || horas === '') {
    errores.push('Las horas son obligatorias');
  }
  if (modalidad === undefined || modalidad === null || String(modalidad).trim() === '') {
    errores.push('La modalidad es obligatoria');
  }

  const c = Number(creditos);
  const h = Number(horas);
  if (!Number.isInteger(c) || c <= 0) {
    errores.push('Los creditos deben ser un numero entero positivo');
  }
  if (!Number.isInteger(h) || h <= 0) {
    errores.push('Las horas deben ser un numero entero positivo');
  }

  const mod = typeof modalidad === 'string' ? modalidad.trim() : modalidad;
  if (mod && !MODALIDADES_VALIDAS.includes(mod)) {
    errores.push('La modalidad debe ser Presencial, Virtual o Hibrida');
  }

  if (errores.length > 0) {
    return { ok: false, errores };
  }

  return {
    ok: true,
    datos: {
      nombre,
      descripcion,
      docente,
      creditos: c,
      horas: h,
      modalidad: mod,
    },
  };
}

module.exports = {
  MODALIDADES_VALIDAS,
  validarCursoCompleto,
};
