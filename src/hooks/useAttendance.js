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

    // 🔹 cargar estudiantes
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

    // 🔹 cargar historial
    useEffect(() => {
        async function loadHistory() {
            setLoadingKey('history', true)
            try {
                const { data, error } = await getHistorial(selectedDate)
                if (error) throw error

                setHistory(data)

                const preloaded = {}
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
        }

        loadHistory()
    }, [selectedDate])

    // 🔹 marcar
    const mark = useCallback((id, estado) => {
        setAttendance(prev => ({
            ...prev,
            [id]: estado
        }))
    }, [])

    // 🔹 guardar uno (autoguardado)
    const saveOne = useCallback(async (id, estado) => {
        try {
            await guardarAsistencia([{
                estudiante_id: id,
                estado,
                fecha: selectedDate
            }])
        } catch (err) {
            console.error(err)
            setError("Error guardando asistencia")
        }
    }, [selectedDate])

    // 🔹 guardar todos
    const saveAll = useCallback(async () => {
        try {
            setLoadingKey('saving', true)

            const registros = Object.entries(attendance).map(([id, estado]) => ({
                estudiante_id: id,
                estado,
                fecha: selectedDate
            }))

            await guardarAsistencia(registros)

        } catch (err) {
            console.error(err)
            setError('Error guardando asistencia')
        } finally {
            setLoadingKey('saving', false)
        }
    }, [attendance, selectedDate])

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