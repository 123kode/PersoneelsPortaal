interface GradenFilterProps {
    geselecteerd: string[];
    onChange: (waarden: string[]) => void;
    beschikbareGraden: string[];
}

const operationeleVolgorde = [
    "Aspirant-agent",
    "Agent",
    "Aspirant-inspecteur",
    "Inspecteur",
    "Aspirant-hoofdinspecteur",
    "Hoofdinspecteur",
    "Aspirant-commissaris",
    "Commissaris",
    "Hoofdcommissaris",
];

const calogVolgorde = [
    "CALog D",
    "CALog C",
    "CALog B",
    "CALog A",
];

function GradenFilter({
    geselecteerd,
    onChange,
    beschikbareGraden,
}: GradenFilterProps) {

    function toggle(graad: string) {

        if (geselecteerd.includes(graad)) {

            onChange(
                geselecteerd.filter(g => g !== graad)
            );

        } else {

            onChange([
                ...geselecteerd,
                graad,
            ]);
        }
    }

    const operationeel = operationeleVolgorde.filter(
        graad => beschikbareGraden.includes(graad)
    );

    const calog = calogVolgorde.filter(
        graad => beschikbareGraden.includes(graad)
    );

    return (

        <details className="multi-select-filter">

            <summary>
                Graden
                {geselecteerd.length > 0 &&
                    ` (${geselecteerd.length})`}
            </summary>

            <div className="graden-filter">

                <div className="graad-groep">

                    <div className="graad-titel">
                        Operationeel
                    </div>

                    {operationeel.map(graad => (

                        <label
                            key={graad}
                            className="graad-item"
                        >

                            <input
                                type="checkbox"
                                checked={geselecteerd.includes(graad)}
                                onChange={() => toggle(graad)}
                            />

                            {graad}

                        </label>

                    ))}

                </div>

                <div className="graad-groep">

                    <div className="graad-titel">
                        CALog
                    </div>

                    {calog.map(graad => (

                        <label
                            key={graad}
                            className="graad-item"
                        >

                            <input
                                type="checkbox"
                                checked={geselecteerd.includes(graad)}
                                onChange={() => toggle(graad)}
                            />

                            {graad}

                        </label>

                    ))}

                </div>

            </div>

        </details>

    );
}

export default GradenFilter;