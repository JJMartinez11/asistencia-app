function HistoryPanel({ history, students }) {
    const studentMap = {};

    students.forEach(student => {
        studentMap[student.id] = student.name;
    });

    return (
        <div style={styles.panel}>
            <h3 style={styles.title}>History</h3>

            {history.length === 0 ? (
                <p style={styles.empty}>No attendance records for this date.</p>
            ) : (
                history.map(record => (
                    <div key={record.id} style={styles.item}>
                        <span>
                            {record.status === "P" ? "✔" : "✖"}
                        </span>

                        <span>
                            {studentMap[record.student_id] || "Unknown student"}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    panel: {
        marginTop: "18px",
        paddingTop: "12px",
        borderTop: "1px solid #e2e8f0"
    },
    title: {
        margin: "0 0 10px",
        color: "#0f172a"
    },
    empty: {
        fontSize: "14px",
        color: "#64748b"
    },
    item: {
        display: "flex",
        gap: "8px",
        fontSize: "14px",
        padding: "5px 0",
        color: "#334155"
    }
};

export default HistoryPanel;