import { useState, useEffect, useCallback } from "react";
import {
    getClasses,
    getStudentsByClass,
    getAttendanceByClassAndDate,
    saveAttendance
} from "../services/attendanceService";

function todayString() {
    return new Date().toISOString().split("T")[0];
}

export function useAttendance() {
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState("");

    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(todayString());

    const [saveStatus, setSaveStatus] = useState(null);

    const [loading, setLoading] = useState({
        classes: false,
        students: false,
        history: false,
        saving: false
    });

    const [error, setError] = useState(null);

    const setLoadingKey = (key, value) => {
        setLoading(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        async function loadClasses() {
            setLoadingKey("classes", true);
            setError(null);

            try {
                const { data, error } = await getClasses();
                if (error) throw error;

                setClasses(data);

                if (data.length > 0) {
                    setSelectedClassId(data[0].id);
                }
            } catch (err) {
                console.error(err);
                setError("Error loading classes");
            } finally {
                setLoadingKey("classes", false);
            }
        }

        loadClasses();
    }, []);

    useEffect(() => {
        async function loadStudents() {
            if (!selectedClassId) {
                setStudents([]);
                return;
            }

            setLoadingKey("students", true);
            setError(null);

            try {
                const { data, error } = await getStudentsByClass(selectedClassId);
                if (error) throw error;

                setStudents(data);
            } catch (err) {
                console.error(err);
                setError("Error loading students");
                setStudents([]);
            } finally {
                setLoadingKey("students", false);
            }
        }

        loadStudents();
    }, [selectedClassId]);

    const loadHistory = useCallback(async () => {
        if (!selectedClassId || students.length === 0) {
            setHistory([]);
            setAttendance({});
            return;
        }

        setLoadingKey("history", true);
        setError(null);

        try {
            const { data, error } = await getAttendanceByClassAndDate(
                selectedClassId,
                selectedDate
            );

            if (error) throw error;

            setHistory(data);

            const preloaded = {};

            students.forEach(student => {
                preloaded[student.id] = "A";
            });

            data.forEach(record => {
                preloaded[record.student_id] = record.status;
            });

            setAttendance(preloaded);
        } catch (err) {
            console.error(err);
            setError("Error loading attendance");
        } finally {
            setLoadingKey("history", false);
        }
    }, [selectedClassId, selectedDate, students]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const mark = useCallback((studentId, status) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    }, []);

    const saveOne = useCallback(async (studentId, status) => {
        if (!selectedClassId) return;

        try {
            setError(null);
            setSaveStatus("saving");

            await saveAttendance([{
                student_id: studentId,
                class_id: selectedClassId,
                status,
                date: selectedDate
            }]);

            setSaveStatus("success");

            setTimeout(() => {
                setSaveStatus(null);
            }, 1500);

            await loadHistory();
        } catch (err) {
            console.error(err);
            setSaveStatus("error");
            setError("Error saving attendance");
        }
    }, [selectedClassId, selectedDate, loadHistory]);

    const saveAll = useCallback(async () => {
        if (!selectedClassId) return;

        try {
            setLoadingKey("saving", true);
            setError(null);
            setSaveStatus("saving");

            const records = Object.entries(attendance).map(([studentId, status]) => ({
                student_id: studentId,
                class_id: selectedClassId,
                status,
                date: selectedDate
            }));

            await saveAttendance(records);

            setSaveStatus("success");

            setTimeout(() => {
                setSaveStatus(null);
            }, 1500);

            await loadHistory();
        } catch (err) {
            console.error(err);
            setSaveStatus("error");
            setError("Error saving attendance");
        } finally {
            setLoadingKey("saving", false);
        }
    }, [attendance, selectedClassId, selectedDate, loadHistory]);

    const selectedClass = classes.find(c => c.id === selectedClassId) || null;

    const summary = {
        total: students.length,
        present: Object.values(attendance).filter(status => status === "P").length,
        absent: Object.values(attendance).filter(status => status === "A").length,
    };

    return {
        classes,
        selectedClass,
        selectedClassId,
        students,
        history,
        attendance,
        selectedDate,
        summary,
        loading,
        error,
        saveStatus,
        mark,
        saveOne,
        saveAll,
        setDate: setSelectedDate,
        setSelectedClassId
    };
}