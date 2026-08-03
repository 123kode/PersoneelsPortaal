interface MultiSelectFilterProps {
    label: string;
    opties: string[];
    geselecteerd: string[];
    onChange: (waarden: string[]) => void;
}

function MultiSelectFilter({
    label,
    opties,
    geselecteerd,
    onChange,
}: MultiSelectFilterProps) {

    function toggle(optie: string) {

        if (geselecteerd.includes(optie)) {

            onChange(
                geselecteerd.filter(item => item !== optie)
            );

        } else {

            onChange([
                ...geselecteerd,
                optie,
            ]);
        }
    }

    return (
        <details className="multi-select-filter">

            <summary>
                {label}
                {geselecteerd.length > 0 &&
                    ` (${geselecteerd.length})`}
            </summary>

            <div className="multi-select-lijst">

                {opties.map(optie => (

                    <label
                        key={optie}
                        className="multi-select-item"
                    >

                        <input
                            type="checkbox"
                            checked={geselecteerd.includes(optie)}
                            onChange={() => toggle(optie)}
                        />

                        {optie}

                    </label>

                ))}

            </div>

        </details>
    );
}

export default MultiSelectFilter;