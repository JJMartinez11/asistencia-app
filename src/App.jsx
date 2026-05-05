import { useState } from "react";
import { useAttendance } from "./hooks/useAttendance";
import { exportToCSV } from "./utils/exportToCSV";

import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import ClassSelector from "./components/ClassSelector";
import DateSelector from "./components/DateSelector";
import AttendanceList from "./components/AttendanceList";
import HistoryPanel from "./components/HistoryPanel";

function App() {
    const [dark, setDark]           = useState(false);
    const [sidebarOpen, setSidebar] = useState(false);

    const {
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
        setDate,
        setSelectedClassId
    } = useAttendance();

    const handleExport = () => {
        exportToCSV(students, attendance, selectedDate);
    };

    const handleMark = (studentId, status) => {
        mark(studentId, status);
        saveOne(studentId, status);
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="ut-shell">

                {/* Sidebar + Top Bar (via Header) */}
                <Header
                    selectedClass={selectedClass}
                    dark={dark}
                    onToggleDark={() => setDark(d => !d)}
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebar(o => !o)}
                />

                {/* Main */}
                <main className="ut-main">
                    <div className="ut-page">

                        {/* Error */}
                        {error && (
                            <div style={styles.errorBox}>
                                ⚠ {error}
                            </div>
                        )}

                        {/* Summary Cards */}
                        <SummaryCard summary={summary} selectedClass={selectedClass} />

                        {/* Dashboard grid */}
                        <div className="ut-dashboard-grid">

                            {/* Left column */}
                            <div>
                                {/* Controls card */}
                                <div className="ut-card ut-controls" style={{ marginBottom: 16 }}>
                                    <div style={styles.controlsTitle}>
                                        <span>🎛</span> Configurar sesión
                                    </div>

                                    <div className="ut-controls__row">
                                        <div className="ut-controls__group">
                                            <ClassSelector
                                                classes={classes}
                                                selectedClassId={selectedClassId}
                                                onChange={setSelectedClassId}
                                                loading={loading.classes}
                                            />
                                        </div>
                                        <div className="ut-controls__group">
                                            <DateSelector
                                                selectedDate={selectedDate}
                                                onChange={setDate}
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.controlsActions}>
                                        <button
                                            className="ut-btn ut-btn-primary"
                                            onClick={handleExport}
                                            disabled={students.length === 0}
                                        >
                                            📥 Exportar CSV
                                        </button>

                                        {saveStatus === "saving" && (
                                            <span className="ut-status ut-status--saving">
                                                ⏳ Guardando…
                                            </span>
                                        )}
                                        {saveStatus === "success" && (
                                            <span className="ut-status ut-status--success">
                                                ✅ Guardado
                                            </span>
                                        )}
                                        {saveStatus === "error" && (
                                            <span className="ut-status ut-status--error">
                                                ❌ Error al guardar
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Attendance list */}
                                <div className="ut-card" style={{ padding: "20px" }}>
                                    <AttendanceList
                                        students={students}
                                        attendance={attendance}
                                        loading={loading.students || loading.history}
                                        onMark={handleMark}
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div>
                                {/* QR Module preview */}
                                <div className="ut-module-preview" style={{ marginBottom: 16 }}>
                                    <span className="ut-module-preview__icon">📷</span>
                                    <div className="ut-module-preview__title">Asistencia por QR</div>
                                    <div className="ut-module-preview__desc">
                                        Genera un código QR temporal para que los estudiantes registren su asistencia desde su celular.
                                    </div>
                                    <span className="ut-module-preview__badge">Próximamente</span>
                                </div>

                                {/* Grades Module preview */}
                                <div className="ut-module-preview" style={{ marginBottom: 16 }}>
                                    <span className="ut-module-preview__icon">📝</span>
                                    <div className="ut-module-preview__title">Evaluaciones y Notas</div>
                                    <div className="ut-module-preview__desc">
                                        Crea actividades, asigna puntajes y lleva el seguimiento académico de cada estudiante.
                                    </div>
                                    <span className="ut-module-preview__badge">Próximamente</span>
                                </div>

                                {/* History */}
                                <HistoryPanel
                                    history={history}
                                    students={students}
                                />
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

const styles = {
    errorBox: {
        background: "rgba(239,68,68,0.1)",
        color: "#991b1b",
        border: "1px solid rgba(239,68,68,0.25)",
        padding: "12px 16px",
        borderRadius: "12px",
        marginBottom: "16px",
        fontSize: "14px",
        fontWeight: "600"
    },
    controlsTitle: {
        fontSize: "14px",
        fontWeight: "700",
        color: "var(--text-2)",
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    controlsActions: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginTop: "14px",
        flexWrap: "wrap"
    }
};

export default App;
