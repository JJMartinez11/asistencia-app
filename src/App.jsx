import { useAttendance } from "./hooks/useAttendance";

function App() {
    const {
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
        setDate
    } = useAttendance();

    const mapaEstudiantes = {};
    students.forEach(e => {
        mapaEstudiantes[e.id] = e.nombre;
    });

    return (
        <div style={{ padding: "20px" }}>
            <h1>📋 Sistema de Asistencia</h1>
            {loading.saving && <p>Guardando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginBottom: "20px" }}>
                <h2>
                    {summary.present} / {summary.total} presentes
                </h2>
            </div>

            {students.map((e) => (
                <div
                    key={e.id}
                    style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "10px"
                    }}
                >
                    {e.nombre} - {e.genero}

                    <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                        <button
                            onClick={() => {
                                mark(e.id, "P");
                                saveOne(e.id, "P");
                            }}
                            style={{
                                backgroundColor: attendance[e.id] === "P" ? "green" : "#ccc",
                                color: "white",
                                padding: "10px",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Presente
                        </button>

                        <button
                            onClick={() => {
                                mark(e.id, "A");
                                saveOne(e.id, "A");
                            }}
                            style={{
                                backgroundColor: attendance[e.id] === "A" ? "red" : "#ccc",
                                color: "white",
                                padding: "10px",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Ausente
                        </button>
                    </div>
                </div>
            ))}

            <button onClick={saveAll} style={{ marginTop: "20px" }}>
                Guardar asistencia
            </button>

            <br /><br />

            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setDate(e.target.value)}
            />

            <h2>Historial</h2>

            {history.map((h) => (
                <div key={h.id}>
                    {mapaEstudiantes[h.estudiante_id] || "Sin nombre"} -
                    {h.estado === "P" ? "✔ Presente" : "✖ Ausente"} -
                    📅 {h.fecha}
                </div>
            ))}
        </div>
    );
}

export default App;