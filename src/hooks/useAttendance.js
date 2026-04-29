import { useState, useEffect, useCallback } from 'react'
import {
    getEstudiantes,
    getHistorial,
    guardarAsistencia
} from '../services/attendanceService'

function todayString() {
    return new Date().toISOString().split('T')[0]
}

export function useAttendance() {
    const [students, setStudents] = useState([])
    const [attendance, setAttendance] = useState({})
    const [history, setHistory] = useState([])
    const [selectedDate, setSelectedDate] = useState(todayString())

    const [loading, setLoading] = useState({
        students: false,
        history: false,
        saving: false
    })

    const [error, setError] = useState(null)

    const setLoadingKey = (key, value) => {
        setLoading(prev => ({ ...prev, [key]: value }))
    }

    // 🔹 1. Cargar estudiantes (solo una vez)
    useEffect(() => {
        async function loadStudents() {
            setLoadingKey('students', true)
            try {
                const { data, error } = await getEstudiantes()
                if (error) throw error
                setStudents(data)
            } catch (err) {
                console.error(err)
                setError('Error cargando estudiantes')
            } finally {
                setLoadingKey('students', false)
            }
        }

        loadStudents()
    }, [])

    // 🔹 2. Función reutilizable para historial
    const loadHistory = useCallback(async () => {
        if (students.length === 0) return

        setLoadingKey('history', true)

        try {
            const { data, error } = await getHistorial(selectedDate)
            if (error) throw error

            setHistory(data)

            const preloaded = {}

            // Todos ausentes por defecto
            students.forEach(s => {
                preloaded[s.id] = "A"
            })

            // Sobrescribir con datos reales
            data.forEach(r => {
                preloaded[r.estudiante_id] = r.estado
            })

            setAttendance(preloaded)

        } catch (err) {
            console.error(err)
            setError('Error cargando historial')
        } finally {
            setLoadingKey('history', false)
        }
    }, [selectedDate, students])

    // 🔹 3. Ejecutar cuando cambie fecha o estudiantes
    useEffect(() => {
        loadHistory()
    }, [loadHistory])

    // 🔹 4. Marcar asistencia (instantáneo en UI)
    const mark = useCallback((id, estado) => {
        setAttendance(prev => ({
            ...prev,
            [id]: estado
        }))
    }, [])

    // 🔹 5. Guardar uno (AUTOGUARDADO)
    const saveOne = useCallback(async (id, estado) => {
        try {
            await guardarAsistencia([{
                estudiante_id: id,
                estado,
                fecha: selectedDate
            }])

            await loadHistory() // 🔥 sincroniza UI con BD

        } catch (err) {
            console.error(err)
            setError("Error guardando asistencia")
        }
    }, [selectedDate, loadHistory])

    // 🔹 6. Guardar todos
    const saveAll = useCallback(async () => {
        try {
            setLoadingKey('saving', true)

            const registros = Object.entries(attendance).map(([id, estado]) => ({
                estudiante_id: id,
                estado,
                fecha: selectedDate
            }))

            await guardarAsistencia(registros)
            await loadHistory() // 🔥 sincroniza

        } catch (err) {
            console.error(err)
            setError('Error guardando asistencia')
        } finally {
            setLoadingKey('saving', false)
        }
    }, [attendance, selectedDate, loadHistory])

    // 🔹 7. Resumen automático
    const summary = {
        total: students.length,
        present: Object.values(attendance).filter(e => e === 'P').length,
        absent: Object.values(attendance).filter(e => e === 'A').length,
    }

    return {
        students,
        history,
        attendance,
        selectedDate,
        summary,
        loading,
        error,
        mark,
        saveOne,
        saveAll,
        setDate: setSelectedDate
    }
}