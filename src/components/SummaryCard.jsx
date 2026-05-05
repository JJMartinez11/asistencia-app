function SummaryCard({ summary }) {
    const total    = summary?.total   ?? 0;
    const present  = summary?.present ?? 0;
    const absent   = total - present;
    const pct      = total > 0 ? Math.round((present / total) * 100) : 0;

    const cards = [
        {
            label: "Total",
            value: total,
            icon: "👥",
            colorClass: "blue",
            desc: "estudiantes"
        },
        {
            label: "Presentes",
            value: present,
            icon: "✅",
            colorClass: "green",
            desc: "marcados"
        },
        {
            label: "Ausentes",
            value: absent,
            icon: "❌",
            colorClass: "red",
            desc: "sin marcar"
        },
        {
            label: "Asistencia",
            value: `${pct}%`,
            icon: "📊",
            colorClass: "blue",
            desc: "de la clase",
            isPercent: true,
            pct
        }
    ];

    return (
        <div className="ut-summary-grid">
            {cards.map((card) => (
                <div key={card.label} className="ut-card" style={styles.card}>
                    <div style={styles.cardTop}>
                        <span style={styles.cardIcon}>{card.icon}</span>
                        <span className={`ut-chip ut-chip--${card.colorClass}`}>
                            {card.label}
                        </span>
                    </div>

                    <div style={styles.cardValue}>{card.value}</div>
                    <div style={styles.cardDesc}>{card.desc}</div>

                    {card.isPercent && (
                        <div className="ut-progress-bar" style={{ marginTop: 10 }}>
                            <div
                                className="ut-progress-fill"
                                style={{ width: `${card.pct}%` }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const styles = {
    card: {
        padding: "16px 18px",
    },
    cardTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    cardIcon: {
        fontSize: 20
    },
    cardValue: {
        fontSize: 28,
        fontWeight: 800,
        color: "var(--text)",
        lineHeight: 1,
        fontFamily: "'DM Mono', monospace"
    },
    cardDesc: {
        fontSize: 12,
        color: "var(--text-3)",
        marginTop: 4,
        fontWeight: 500
    }
};

export default SummaryCard;
