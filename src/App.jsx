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
    const [dark, setDark] = useState(false);

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

    return (
        <div className={dark ? "dark" : ""}>
            <div style={styles.page}>
                <div style={styles.app}>
                    <div style={styles.stickyTop}>
                        <Header selectedClass={selectedClass} />

                        <button
                            onClick={() => setDark(!dark)}
                            style={styles.themeButton}
                        >
                            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </button>

                        <SummaryCard summary={summary} />
                    </div>

                    <main style={styles.content}>
                        {error && (
                            <div style={styles.errorBox}>
                                ⚠ {error}
                            </div>
                        )}

                        <section style={styles.controlsCard}>
                            <ClassSelector
                                classes={classes}
                                selectedClassId={selectedClassId}
                                onChange={setSelectedClassId}
                                loading={loading.classes}
                            />

                            <DateSelector
                                selectedDate={selectedDate}
                                onChange={setDate}
                            />

                            <button
                                onClick={handleExport}
                                disabled={students.length === 0}
                                style={{
                                    ...styles.exportButton,
                                    opacity: students.length === 0 ? 0.5 : 1,
                                    cursor: students.length === 0 ? "not-allowed" : "pointer"
                                }}
                            >
                                📥 Export CSV
                            </button>

                            {saveStatus === "saving" && (
                                <div style={styles.savingStatus}>
                                    ⏳ Saving...
                                </div>
                            )}

                            {saveStatus === "success" && (
                                <div style={styles.successStatus}>
                                    ✅ Saved
                                </div>
                            )}

                            {saveStatus === "error" && (
                                <div style={styles.errorStatus}>
                                    ❌ Error saving
                                </div>
                            )}
                        </section>

                        <AttendanceList
                            students={students}
                            attendance={attendance}
                            loading={loading.students || loading.history}
                            onMark={(studentId, status) => {
                                mark(studentId, status);
                                saveOne(studentId, status);
                            }}
                        />

                        <HistoryPanel
                            history={history}
                            students={students}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "0 14px 24px",
        fontFamily: "Arial, sans-serif"
    },
    app: {
        maxWidth: "540px",
        margin: "0 auto"
    },
    stickyTop: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        padding: "14px 0 12px",
        background: "var(--bg)"
    },
    content: {
        paddingBottom: "20px"
    },
    controlsCard: {
        background: "var(--card)",
        borderRadius: "18px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
        border: "1px solid #334155"
    },
    errorBox: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "12px",
        borderRadius: "14px",
        marginBottom: "12px",
        fontSize: "14px",
        fontWeight: "bold"
    },
    exportButton: {
        width: "100%",
        padding: "13px",
        borderRadius: "14px",
        border: "none",
        background: "var(--primary)",
        color: "white",
        fontWeight: "bold",
        fontSize: "15px",
        boxShadow: "0 8px 18px rgba(37, 99, 235, 0.28)"
    },
    themeButton: {
        width: "100%",
        margin: "10px 0",
        padding: "11px",
        borderRadius: "14px",
        border: "none",
        background: "#111827",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },
    savingStatus: {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "12px",
        background: "#fef3c7",
        color: "#92400e",
        fontWeight: "bold",
        textAlign: "center"
    },
    successStatus: {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "12px",
        background: "#dcfce7",
        color: "#166534",
        fontWeight: "bold",
        textAlign: "center"
    },
    errorStatus: {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "12px",
        background: "#fee2e2",
        color: "#991b1b",
        fontWeight: "bold",
        textAlign: "center"
    }
};

export default App;