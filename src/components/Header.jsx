import uniLogo from "../assets/uni.png";

function Header({
    selectedClass,
    dark,
    onToggleDark,
    sidebarOpen,
    onToggleSidebar
}) {

    const navItems = [
        {
            section: "Principal",
            items: [
                { icon: "🏠", label: "Dashboard", active: true },
            ]
        },
        {
            section: "Asistencia",
            items: [
                { icon: "✅", label: "Asistencia Manual" },
                { icon: "📷", label: "Asistencia QR", soon: true },
            ]
        },
        {
            section: "Académico",
            items: [
                { icon: "📝", label: "Evaluaciones", soon: true },
                { icon: "📊", label: "Calificaciones", soon: true },
                { icon: "📈", label: "Reportes", soon: true },
            ]
        }
    ];

    return (
        <>
            {/* SIDEBAR */}
            <aside className={`ut-sidebar ${sidebarOpen ? "open" : ""}`}>

                <div className="ut-sidebar__logo">

                    <div style={styles.logoContainer}>

                        <img
                            src={uniLogo}
                            alt="UNI Logo"
                            style={styles.logo}
                        />

                        <div>
                            <div style={styles.logoName}>
                                UniTrack
                            </div>

                            <div style={styles.logoSub}>
                                Plataforma Docente
                            </div>
                        </div>

                    </div>

                </div>

                <nav className="ut-sidebar__nav">

                    {navItems.map(group => (
                        <div key={group.section}>

                            <div className="ut-nav-section">
                                {group.section}
                            </div>

                            {group.items.map(item => (
                                <button
                                    key={item.label}
                                    className={`ut-nav-item ${item.active ? "active" : ""}`}
                                >
                                    <span>{item.icon}</span>

                                    <span>{item.label}</span>

                                    {item.soon && (
                                        <span className="ut-nav-badge">
                                            Próximo
                                        </span>
                                    )}
                                </button>
                            ))}

                        </div>
                    ))}

                </nav>

                <div className="ut-sidebar__footer">
                    UniTrack v1.0 · 2025
                </div>

            </aside>

            {/* OVERLAY MOBILE */}
            <div
                className={`ut-overlay ${sidebarOpen ? "active" : ""}`}
                onClick={onToggleSidebar}
            />

            {/* MOBILE HEADER */}
            <header className="ut-mobile-header">

                <button
                    className="ut-hamburger"
                    onClick={onToggleSidebar}
                >
                    {sidebarOpen ? "✕" : "☰"}
                </button>

                <div style={styles.mobileBrand}>

                    <img
                        src={uniLogo}
                        alt="UNI Logo"
                        style={styles.mobileLogo}
                    />

                    <span style={styles.mobileTitle}>
                        UniTrack
                    </span>

                </div>

                <button
                    className="ut-theme-toggle"
                    onClick={onToggleDark}
                    title="Cambiar tema"
                />

            </header>

            {/* DESKTOP TOPBAR */}
            <div className="ut-topbar">

                <div className="ut-topbar__left">

                    <span className="ut-topbar__title">

                        {selectedClass?.name
                            ? `✅ ${selectedClass.name}`
                            : "Panel Principal"}

                    </span>

                </div>

                <div className="ut-topbar__right">

                    <span style={styles.themeText}>
                        {dark ? "🌙 Oscuro" : "☀️ Claro"}
                    </span>

                    <button
                        className="ut-theme-toggle"
                        onClick={onToggleDark}
                        title="Cambiar tema"
                    />

                </div>

            </div>
        </>
    );
}

const styles = {
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    logo: {
        width: "42px",
        height: "42px",
        objectFit: "contain",
        background: "white",
        borderRadius: "10px",
        padding: "4px",
        flexShrink: 0
    },

    logoName: {
        color: "white",
        fontWeight: "700",
        fontSize: "17px",
        lineHeight: 1.2
    },

    logoSub: {
        color: "rgba(255,255,255,0.5)",
        fontSize: "11px"
    },

    mobileBrand: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    mobileLogo: {
        width: "30px",
        height: "30px",
        objectFit: "contain",
        background: "white",
        borderRadius: "8px",
        padding: "3px"
    },

    mobileTitle: {
        color: "white",
        fontWeight: "700",
        fontSize: "16px"
    },

    themeText: {
        fontSize: 13,
        color: "var(--text-3)"
    }
};

export default Header;