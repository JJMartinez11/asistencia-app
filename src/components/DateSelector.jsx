function DateSelector({ selectedDate, onChange }) {
    return (
        <div style={styles.group}>
            <label style={styles.label}>Date</label>

            <input
                type="date"
                value={selectedDate}
                onChange={(e) => onChange(e.target.value)}
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    group: {
        marginBottom: "12px"
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#334155"
    },
    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        fontSize: "15px"
    }
};

export default DateSelector;