import { supabase } from "./supabase";

// Get all classes
export async function getClasses() {
    const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("name", { ascending: true });

    return { data: data || [], error };
}

// Get students by selected class
export async function getStudentsByClass(classId) {
    if (!classId) return { data: [], error: null };

    const { data, error } = await supabase
        .from("class_students")
        .select(`
            student:students (
                id,
                name
            )
        `)
        .eq("class_id", classId);

    if (error) return { data: [], error };

    const students = data
        .map(item => item.student)
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

    return { data: students, error: null };
}

// Save attendance
export async function saveAttendance(records) {
    const { data, error } = await supabase
        .from("attendance")
        .upsert(records, {
            onConflict: "student_id,class_id,date"
        });

    return { data, error };
}

// Get attendance by class and date
export async function getAttendanceByClassAndDate(classId, date) {
    if (!classId || !date) return { data: [], error: null };

    const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("class_id", classId)
        .eq("date", date);

    return { data: data || [], error };
}