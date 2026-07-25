import type { Medewerker } from "../models/Medewerker";

interface MedewerkerLijstProps {
    medewerkers: Medewerker[];
    zoekTekst: string;
    sorteerVolgorde: string;
    dienstFilter: string;
    geselecteerdeMedewerker: Medewerker | null;
    onSelecteer: (medewerker: Medewerker) => void;
}

function MedewerkerLijst({
    medewerkers,
    zoekTekst,
    sorteerVolgorde,
    dienstFilter,
    geselecteerdeMedewerker,
    onSelecteer,
}: MedewerkerLijstProps) {

    return (
        <>
            {medewerkers
                .filter(medewerker =>
                    `${medewerker.voornaam} ${medewerker.naam}`
                        .toLowerCase()
                        .includes(zoekTekst.toLowerCase())
                )

                .filter(medewerker => {

                    if (dienstFilter === "") {
                        return true;
                    }

                    return medewerker.dienst === dienstFilter;

                })

                .sort((a, b) => {

                    const naamA = `${a.voornaam} ${a.naam}`;
                    const naamB = `${b.voornaam} ${b.naam}`;

                    if (sorteerVolgorde === "AZ") {
                        return naamA.localeCompare(naamB);
                    }

                    return naamB.localeCompare(naamA);

                })
                .map(medewerker => (
                    <div
                        key={medewerker.id}
                        onClick={() => onSelecteer(medewerker)}
                        className={
                            geselecteerdeMedewerker?.id === medewerker.id
                                ? "medewerker-card geselecteerd"
                                : "medewerker-card"
                        }
                    >
                        <div className="kaart-header">

                            <div className="medewerker-naam">
                                {medewerker.voornaam} {medewerker.naam}
                            </div>

                            <div className="status-bol">
                                {medewerker.aanwezig ? "🟢" : "🔴"}
                            </div>

                        </div>

                        <div className="medewerker-functie">
                            {medewerker.functie}
                        </div>

                        <div className="medewerker-dienst">
                            {medewerker.dienst}
                        </div>
                    </div>
                ))}
        </>
    );
}

export default MedewerkerLijst;