function ClassSelector({ classes, selectedClassId, onChange, loading }) {
    return (
        <div>
            <label className="ut-label">Clase</label>
            <select
                value={selectedClassId}
                onChange={(e) => onChange(e.target.value)}
                className="ut-select"
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

export default ClassSelector;
