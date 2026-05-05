function AttendanceList({ students, attendance, loading, onMark }) {
    if (loading) {
        return (
            <div className="ut-loading-pulse">
                <span /><span /><span />
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div className="ut-empty">
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎓</div>
                <div style={{ fontWeight: 600 }}>Sin estudiantes</div>
                <div style={{ marginTop: 4 }}>Selecciona una clase para ver la lista.</div>
            </div>
        );
    }

    const markedCount = Object.keys(attendance).length;
    const totalCount  = students.length;

    return (
        <div>
            <div className="ut-section-header">
                <div className="ut-section-title">
                    <span>🎓</span>
                    Estudiantes
                </div>
                <span style={styles.markedBadge}>
                    {markedCount}/{totalCount} marcados
                </span>
            </div>

            <div className="ut-student-list">
                {students.map((student, idx) => {
                    const status = attendance[student.id];
                    const rowClass = status === "P"
                        ? "ut-student-row ut-student-row--present"
                        : status === "A"
                            ? "ut-student-row ut-student-row--absent"
                            : "ut-student-row ut-student-row--neutral";

                    return (
                        <div key={student.id} className={rowClass} style={styles.row}>
                            {/* Avatar + Info */}
                            <div style={styles.info}>
                                <div style={styles.avatar}>
                                    {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="ut-student-name">{student.name}</div>
                                    <div
                                        className={`ut-student-status ut-student-status--${
                                            status === "P" ? "present" :
                                            status === "A" ? "absent" : "neutral"
                                        }`}
                                    >
                                        {status === "P" ? "Presente"
                                         : status === "A" ? "Ausente"
                                         : "Sin marcar"}
                                    </div>
                                </div>
                            </div>

                            {/* Mark buttons */}
                            <div className="ut-mark-btns">
                                <button
                                    className={`ut-mark-btn ${
                                        status === "P"
                                            ? "ut-mark-btn--present-active"
                                            : "ut-mark-btn--present-idle"
                                    }`}
                                    onClick={() => onMark(student.id, "P")}
                                    title="Marcar presente"
                                >
                                    ✓
                                </button>
                                <button
                                    className={`ut-mark-btn ${
                                        status === "A"
                                            ? "ut-mark-btn--absent-active"
                                            : "ut-mark-btn--absent-idle"
                                    }`}
                                    onClick={() => onMark(student.id, "A")}
                                    title="Marcar ausente"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const styles = {
    row: {
        cursor: "default"
    },
    info: {
        display: "flex",
        alignItems: "center",
        gap: 12
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #2e7df7, #1a4080)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 15,
        flexShrink: 0
    },
    markedBadge: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text-3)",
        background: "var(--bg-2)",
        padding: "4px 10px",
        borderRadius: "99px"
    }
};

export default AttendanceList;
