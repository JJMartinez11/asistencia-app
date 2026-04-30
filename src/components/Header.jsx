import uniLogo from "../assets/uni.png";

function Header({ selectedClass }) {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <img src={uniLogo} alt="UNI Logo" style={styles.logo} />

                <div>
                    <h1 style={styles.systemName}>
                        UniTrack
                    </h1>

                    <p style={styles.subtitle}>
                        {selectedClass?.name || "Selecciona una clase"}
                    </p>
                </div>
            </div>
        </header>
    );
}

const styles = {
    header: {
        width: "100%",
        background: "#0f172a",
        color: "white",
        padding: "16px 18px",
        borderRadius: "0 0 20px 20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
    },
    container: {
        display: "flex",
        alignItems: "center",
        gap: "14px"
    },
    logo: {
        width: "55px",
        height: "55px",
        objectFit: "contain",
        background: "white",
        borderRadius: "12px",
        padding: "5px"
    },
    systemName: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "bold"
    },
    subtitle: {
        margin: 0,
        fontSize: "13px",
        opacity: 0.7
    }
};

export default Header;