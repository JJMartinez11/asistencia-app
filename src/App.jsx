import { useAttendance } from "./hooks/useAttendance";
import { exportToCSV } from "./utils/exportToCSV";

import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import ClassSelector from "./components/ClassSelector";
import DateSelector from "./components/DateSelector";
import AttendanceList from "./components/AttendanceList";
import HistoryPanel from "./components/HistoryPanel";

function App() {
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
        mark,
        saveOne,
        setDate,
        setSelectedClassId
    } = useAttendance();

    const handleExport = () => {
        exportToCSV(students, attendance, selectedDate);
    };

    return (
        <div style={styles.page}>
            <div style={styles.app}>
                <Header />

                {error && (
                    <div style={styles.errorBox}>
                        ⚠ {error}
                    </div>
                )}

                <SummaryCard summary={summary} selectedClass={selectedClass} />

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
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "16px",
        fontFamily: "Arial, sans-serif"
    },
    app: {
        maxWidth: "520px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "18px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)"
    },
    errorBox: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "12px",
        fontSize: "14px"
    },
    exportButton: {
        width: "100%",
        padding: "12px",
        marginBottom: "16px",
        borderRadius: "12px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontWeight: "bold",
        fontSize: "15px"
    }
};

export default App;