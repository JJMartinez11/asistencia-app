// src/utils/exportToCSV.js

/**
 * Exporta la asistencia de una fecha a un archivo CSV compatible con Excel.
 *
 * @param {Array}  students   - [{ id, name }]
 * @param {Object} attendance - { [studentId]: 'present' | 'absent' }
 * @param {string} date       - 'YYYY-MM-DD'
 */
export function exportToCSV(students, attendance, date) {
  if (!students.length) return

  const STATUS_LABEL = {
    present: 'Presente',
    absent:  'Ausente',
  }

  // Encabezado + filas
  const rows = [
    ['Nombre', 'Estado', 'Fecha'],
    ...students.map(s => [
      s.name,
      STATUS_LABEL[attendance[s.id]] ?? 'Sin registrar',
      date,
    ]),
  ]

  // Escapa celdas que contengan comas, comillas o saltos de línea
  const escape = value =>
    /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value

  const csvContent = rows.map(row => row.map(escape).join(',')).join('\r\n')

  // BOM UTF-8: necesario para que Excel abra tildes y ñ sin configuración extra
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `asistencia_${date}.csv`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  // Limpieza inmediata
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
