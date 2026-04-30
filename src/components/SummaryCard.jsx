function SummaryCard({ summary, selectedClass }) {
    const percentage =
        summary.total > 0
            ? Math.round((summary.present / summary.total) * 100)
            : 0;

    return (
        <div style={styles.card}>
            <div>
                <div style={styles.label}>Current class</div>
                <div style={styles.className}>
                    {selectedClass?.name || "No class selected"}
                </div>
            </div>

            <div style={styles.stats}>
                <div style={styles.counter}>
                    {summary.present}/{summary.total}
                </div>
                <div style={styles.percentage}>
                    {percentage}% present
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: "linear-gradient(135deg, #1e293b, #334155)",
        color: "white",
        padding: "16px",
        borderRadius: "16px",
        marginBottom: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px"
    },
    label: {
        fontSize: "12px",
        color: "#cbd5e1"
    },
    className: {
        fontSize: "17px",
        fontWeight: "bold"
    },
    stats: {
        textAlign: "right"
    },
    counter: {
        fontSize: "24px",
        fontWeight: "bold"
    },
    percentage: {
        fontSize: "12px",
        color: "#cbd5e1"
    }
};

export default SummaryCard;