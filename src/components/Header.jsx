function Header() {
    return (
        <div style={styles.header}>
            <div>
                <h1 style={styles.title}>📋 Attendance</h1>
                <p style={styles.subtitle}>Class attendance control</p>
            </div>
        </div>
    );
}

const styles = {
    header: {
        marginBottom: "16px"
    },
    title: {
        margin: 0,
        fontSize: "26px",
        color: "#0f172a"
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: "14px",
        color: "#64748b"
    }
};

export default Header;