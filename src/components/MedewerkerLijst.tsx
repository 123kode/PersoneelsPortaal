import type { Medewerker } from "../models/Medewerker";

interface MedewerkerLijstProps {
    medewerkers: Medewerker[];
    zoekTekst: string;
    sorteerVolgorde: string;
    dienstFilter: string[];
    teamFilter: string[];
    functieFilter: string[];
    specifiekeGroepFilter: string[];
    aanwezigFilter: string;
    favorietenFilter: string;
    favorieten: number[];
    geselecteerdeMedewerker: Medewerker | null;
    onSelecteerDienst: (dienst: string) => void;
    onSelecteerFunctie: (functie: string) => void;
    onSelecteer: (medewerker: Medewerker) => void;
    onToggleFavoriet: (id: number) => void;
    onWisFilters: () => void;
}


function MedewerkerLijst({
    medewerkers,
    zoekTekst,
    sorteerVolgorde,
    dienstFilter,
    teamFilter,
    functieFilter,
    aanwezigFilter,
    specifiekeGroepFilter,
    favorietenFilter,
    favorieten,
    geselecteerdeMedewerker,
    onSelecteer,
    onSelecteerDienst,
    onToggleFavoriet,
    onWisFilters,
}: MedewerkerLijstProps) {
console.log("dienstFilter:", dienstFilter);
console.log("teamFilter:", teamFilter);
    const gefilterdeMedewerkers = medewerkers

        .filter(medewerker => {

            const zoekInhoud = `
    ${medewerker.voornaam}
    ${medewerker.naam}
    ${medewerker.functie}
    ${medewerker.dienst}
    ${medewerker.team ?? ""}
    ${medewerker.specifiekeGroep?.join(" ") ?? ""}
    ${medewerker.gebouw ?? ""}
    ${medewerker.email}
    ${medewerker.telefoon}
    ${medewerker.vastToestel ?? ""}
`.toLowerCase();

            return zoekInhoud.includes(
                zoekTekst.toLowerCase()
            );
        })

        .filter(medewerker => {

            if (dienstFilter.length === 0) {
                return true;
            }

            return dienstFilter.includes(medewerker.dienst);
        })

        .filter(medewerker => {

            if (teamFilter.length === 0) {
                return true;
            }

            return (
                medewerker.team !== undefined &&
                teamFilter.includes(medewerker.team)
            );
        })

        .filter(medewerker => {

            if (functieFilter.length === 0) {
                return true;
            }

            return functieFilter.includes(medewerker.functie);
        })

        .filter(medewerker => {

            if (specifiekeGroepFilter.length === 0) {
                return true;
            }

            return specifiekeGroepFilter.every(groep =>
                medewerker.specifiekeGroep?.includes(groep)
            );
        })

        .filter(medewerker => {

            if (aanwezigFilter === "") {
                return true;
            }

            if (aanwezigFilter === "aanwezig") {
                return medewerker.aanwezig;
            }

            return !medewerker.aanwezig;
        })

        .filter(medewerker => {

            if (favorietenFilter === "") {
                return true;
            }

            return favorieten.includes(medewerker.id);
        })

        .sort((a, b) => {

            const naamA =
                `${a.naam} ${a.voornaam}`;

            const naamB =
                `${b.naam} ${b.voornaam}`;

            if (sorteerVolgorde === "AZ") {
                return naamA.localeCompare(naamB);
            }

            return naamB.localeCompare(naamA);
        });

    return (
        <>

            <div className="resultaten-teller">

                {gefilterdeMedewerkers.length === 1
                    ? "1 medewerker gevonden"
                    : `${gefilterdeMedewerkers.length} medewerkers gevonden`}

            </div>

            <div className="medewerker-lijst">

                {gefilterdeMedewerkers.map(medewerker => {

                    const isFavoriet =
                        favorieten.includes(medewerker.id);

                    return (

                        <div
                            key={medewerker.id}
                            onClick={() =>
                                onSelecteer(medewerker)
                            }
                            className={
                                geselecteerdeMedewerker?.id === medewerker.id
                                    ? "medewerker-card geselecteerd"
                                    : "medewerker-card"
                            }
                        >

                            <div className="medewerker-info">

                                <div className="medewerker-naam">
                                    {medewerker.naam}, {medewerker.voornaam}
                                </div>

                                <div className="medewerker-functie">
                                    {medewerker.functie}
                                </div>

                                <button
                                    type="button"
                                    className="medewerker-dienst dienst-link"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        onSelecteerDienst(
                                            medewerker.dienst
                                        );
                                    }}
                                >
                                    {medewerker.dienst}
                                </button>

                            </div>

                            <div className="kaart-acties">

                                <button
                                    type="button"
                                    className={
                                        isFavoriet
                                            ? "favoriet-knop actief"
                                            : "favoriet-knop"
                                    }
                                    title={
                                        isFavoriet
                                            ? "Verwijder uit favorieten"
                                            : "Voeg toe aan favorieten"
                                    }
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        onToggleFavoriet(
                                            medewerker.id
                                        );
                                    }}
                                >
                                    {isFavoriet ? "★" : "☆"}
                                </button>

                                <div
                                    className={
                                        medewerker.aanwezig
                                            ? "lijst-status aanwezig"
                                            : "lijst-status afwezig"
                                    }
                                    title={
                                        medewerker.aanwezig
                                            ? "Aanwezig"
                                            : "Afwezig"
                                    }
                                ></div>

                            </div>

                        </div>

                    );
                })}

            </div>

            {gefilterdeMedewerkers.length === 0 && (
                <div className="geen-resultaten">

                    <div className="geen-resultaten-titel">
                        Geen medewerkers gevonden
                    </div>

                    <div className="geen-resultaten-tekst">
                        Pas je zoekopdracht aan of verwijder een filter.
                    </div>

                    <button
                        type="button"
                        className="wis-filters-knop"
                        onClick={onWisFilters}
                    >
                        Wis filters
                    </button>

                </div>
            )}

        </>
    );
}

export default MedewerkerLijst;