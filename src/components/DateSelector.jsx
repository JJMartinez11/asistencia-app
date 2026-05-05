function DateSelector({ selectedDate, onChange }) {
    return (
        <div>
            <label className="ut-label">Fecha</label>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => onChange(e.target.value)}
                className="ut-input"
            />
        </div>
    );
}

export default DateSelector;
