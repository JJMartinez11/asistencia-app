function HistoryPanel({ history, students }) {
    const studentMap = {};
    students.forEach(s => { studentMap[s.id] = s.name; });

    const presentList = history.filter(r => r.status === "P");
    const absentList  = history.filter(r => r.status === "A");

    return (
        <div className="ut-card" style={styles.panel}>
            <div className="ut-section-header" style={{ marginBottom: 16 }}>
                <div className="ut-section-title">
                    <span>🕐</span>
                    Historial del día
                </div>
                {history.length > 0 && (
                    <span style={styles.total}>
                        {history.length} registros
                    </span>
                )}
            </div>

            {history.length === 0 ? (
                <div className="ut-empty" style={{ padding: "20px 0" }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>📋</div>
                    <div>Sin registros para esta fecha.</div>
                </div>
            ) : (
                <div>
                    {/* Presentes */}
                    {presentList.length > 0 && (
                        <div style={styles.group}>
                            <div style={styles.groupLabel}>
                                <span className="ut-chip ut-chip--green">Presentes</span>
                                <span style={styles.count}>{presentList.length}</span>
                            </div>
                            {presentList.map(record => (
                                <div
                                    key={record.id}
                                    className="ut-history-record ut-history-record--present"
                                >
                                    <div className="ut-history-dot ut-history-dot--present" />
                                    {studentMap[record.student_id] || "Estudiante desconocido"}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Ausentes */}
                    {absentList.length > 0 && (
                        <div style={styles.group}>
                            <div style={styles.groupLabel}>
                                <span className="ut-chip ut-chip--red">Ausentes</span>
                                <span style={styles.count}>{absentList.length}</span>
                            </div>
                            {absentList.map(record => (
                                <div
                                    key={record.id}
                                    className="ut-history-record ut-history-record--absent"
                                >
                                    <div className="ut-history-dot ut-history-dot--absent" />
                                    {studentMap[record.student_id] || "Estudiante desconocido"}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    panel: {
        padding: "20px",
        marginTop: 16
    },
    group: {
        marginBottom: 14
    },
    groupLabel: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 8
    },
    count: {
        fontSize: 13,
        color: "var(--text-3)",
        fontWeight: 600
    },
    total: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text-3)",
        background: "var(--bg-2)",
        padding: "4px 10px",
        borderRadius: "99px"
    }
};

export default HistoryPanel;
