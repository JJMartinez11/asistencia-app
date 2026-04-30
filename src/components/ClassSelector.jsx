function ClassSelector({ classes, selectedClassId, onChange, loading }) {
    return (
        <div style={styles.group}>
            <label style={styles.label}>Class</label>

            <select
                value={selectedClassId}
                onChange={(e) => onChange(e.target.value)}
                style={styles.select}
                disabled={loading}
            >
                {classes.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

const styles = {
    group: {
        marginBottom: "10px"
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#334155"
    },
    select: {
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        fontSize: "15px",
        background: "white"
    }
};

export default ClassSelector;