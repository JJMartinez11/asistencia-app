import { useAttendance } from "./hooks/useAttendance";

function App() {
    const {
        students,
        history,
        attendance,
        selectedDate,
        summary,
        mark,
        saveOne,
        setDate
    } = useAttendance();

    const mapaEstudiantes = {};
    students.forEach(e => {
        mapaEstudiantes[e.id] = e.nombre;
    });

    const historialAgrupado = history.reduce((acc, item) => {
        if (!acc[item.fecha]) {
            acc[item.fecha] = [];
        }
        acc[item.fecha].push(item);
        return acc;
    }, {});

    return (
        <div style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial"
        }}>
            <h1 style={{ textAlign: "center" }}>📋 Asistencia</h1>

            {/* CONTADOR */}
            <div style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "18px",
                fontWeight: "bold"
            }}>
                {summary.present} / {summary.total} presentes
            </div>

            {/* FECHA */}
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setDate(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}
            />

            {/* LISTA */}
            {students.map((e) => (
                <div key={e.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    marginBottom: "5px",
                    borderRadius: "8px",
                    background: attendance[e.id] === "P" ? "#dcfce7" : "#fee2e2"
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "500" }}>
                            {e.nombre}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "5px" }}>
                        <button
                            onClick={() => {
                                mark(e.id, "P");
                                saveOne(e.id, "P");
                            }}
                            style={{
                                padding: "6px 10px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "12px",
                                background: attendance[e.id] === "P" ? "#22c55e" : "#e5e7eb",
                                color: attendance[e.id] === "P" ? "white" : "black"
                            }}
                        >
                            ✔
                        </button>

                        <button
                            onClick={() => {
                                mark(e.id, "A");
                                saveOne(e.id, "A");
                            }}
                            style={{
                                padding: "6px 10px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "12px",
                                background: attendance[e.id] === "A" ? "#ef4444" : "#e5e7eb",
                                color: attendance[e.id] === "A" ? "white" : "black"
                            }}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            ))}

            {/* HISTORIAL */}
            <h3 style={{ marginTop: "20px" }}>Historial</h3>

            {Object.entries(historialAgrupado).map(([fecha, registros]) => {

                // 🔥 FILTRAR DUPLICADOS AQUÍ (CORRECTO)
                const registrosUnicos = Object.values(
                    registros.reduce((acc, item) => {
                        acc[item.estudiante_id] = item;
                        return acc;
                    }, {})
                );

                const presentes = registrosUnicos.filter(r => r.estado === "P").length;
                const ausentes = registrosUnicos.filter(r => r.estado === "A").length;

                return (
                    <div key={fecha} style={{ marginBottom: "15px" }}>

                        <div style={{ fontWeight: "bold" }}>
                            📅 {fecha}
                        </div>

                        <div style={{ fontSize: "12px", color: "#666" }}>
                            {presentes} presentes / {ausentes} ausentes
                        </div>

                        {registrosUnicos.map((h) => (
                            <div key={h.id} style={{ marginLeft: "10px" }}>
                                {h.estado === "P" ? "✔" : "✖"}{" "}
                                {mapaEstudiantes[h.estudiante_id] || "Sin nombre"}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default App;