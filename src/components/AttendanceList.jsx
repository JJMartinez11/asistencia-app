function AttendanceList({ students, attendance, loading, onMark }) {
    if (loading) {
        return <p style={styles.message}>Loading attendance...</p>;
    }

    if (students.length === 0) {
        return <p style={styles.message}>No students in this class.</p>;
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Students</h3>

            {students.map(student => {
                const status = attendance[student.id];

                return (
                    <div
                        key={student.id}
                        style={{
                            ...styles.row,
                            background: status === "P" ? "#dcfce7" : "#fee2e2"
                        }}
                    >
                        <div>
                            <div style={styles.name}>{student.name}</div>
                            <div style={styles.status}>
                                {status === "P" ? "Present" : "Absent"}
                            </div>
                        </div>

                        <div style={styles.actions}>
                            <button
                                onClick={() => onMark(student.id, "P")}
                                style={{
                                    ...styles.button,
                                    background: status === "P" ? "#16a34a" : "#e5e7eb",
                                    color: status === "P" ? "white" : "#111827"
                                }}
                            >
                                ✔
                            </button>

                            <button
                                onClick={() => onMark(student.id, "A")}
                                style={{
                                    ...styles.button,
                                    background: status === "A" ? "#dc2626" : "#e5e7eb",
                                    color: status === "A" ? "white" : "#111827"
                                }}
                            >
                                ✖
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    container: {
        marginTop: "8px"
    },
    title: {
        margin: "0 0 10px",
        color: "#0f172a"
    },
    row: {
        minHeight: "54px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 12px",
        marginBottom: "8px",
        borderRadius: "14px"
    },
    name: {
        fontWeight: "bold",
        color: "#0f172a"
    },
    status: {
        fontSize: "12px",
        color: "#475569",
        marginTop: "2px"
    },
    actions: {
        display: "flex",
        gap: "8px"
    },
    button: {
        width: "44px",
        height: "38px",
        borderRadius: "10px",
        border: "none",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer"
    },
    message: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "14px"
    }
};

export default AttendanceList;