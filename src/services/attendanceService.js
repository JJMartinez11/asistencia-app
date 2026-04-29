import { supabase } from "./supabase";

// traer estudiantes
export async function getEstudiantes() {
    const { data, error } = await supabase
        .from("estudiantes")
        .select("*");

    return { data, error };
}

// guardar asistencia
export async function guardarAsistencia(registros) {
    const { data, error } = await supabase
        .from("asistencias")
        .insert(registros);

    return { data, error };
}

// historial por fecha
export async function getHistorial(fecha) {
    const { data, error } = await supabase
        .from("asistencias")
        .select("*")
        .eq("fecha", fecha)
        .order("fecha", { ascending: false });

    return { data, error };
}