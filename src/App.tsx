import { useEffect, useState } from "react";
import "./App.css";

import type { Medewerker } from "./models/Medewerker";
import { getMedewerkers } from "./services/MedewerkerService";

import ZoekBalk from "./components/ZoekBalk";
import MedewerkerLijst from "./components/MedewerkerLijst";
import MedewerkerDetail from "./components/MedewerkerDetail";

function App() {

    const [medewerkers, setMedewerkers] = useState<Medewerker[]>([]);
    const [zoekTekst, setZoekTekst] = useState("");
    const [geselecteerdeMedewerker, setGeselecteerdeMedewerker] =
        useState<Medewerker | null>(null);

    const [sorteerVolgorde, setSorteerVolgorde] = useState("AZ");
    const [dienstFilter, setDienstFilter] = useState("");

    useEffect(() => {

        async function laadMedewerkers() {

            const data = await getMedewerkers();

            setMedewerkers(data);
        }

        laadMedewerkers();

    }, []);

    return (
        <div className="App">

            <h1>Personeelsportaal</h1>

            <ZoekBalk
                zoekTekst={zoekTekst}
                onZoekTekstChanged={setZoekTekst}
            />

            <br />

            <select
                value={sorteerVolgorde}
                onChange={(e) => setSorteerVolgorde(e.target.value)}
            >
                <option value="AZ">Naam A-Z</option>
                <option value="ZA">Naam Z-A</option>
            </select>

            <br /><br />

            <select
                value={dienstFilter}
                onChange={(e) => setDienstFilter(e.target.value)}
            >
                <option value="">Alle diensten</option>
                <option value="ILP">ILP</option>
                <option value="ICT">ICT</option>
                <option value="HR">HR</option>
            </select>

            <div className="main-layout">

                <div className="left-panel">

                    <MedewerkerLijst
                        medewerkers={medewerkers}
                        zoekTekst={zoekTekst}
                        sorteerVolgorde={sorteerVolgorde}
                        dienstFilter={dienstFilter}
                        geselecteerdeMedewerker={geselecteerdeMedewerker}
                        onSelecteer={setGeselecteerdeMedewerker}
                    />

                </div>

                <div className="right-panel">

                    <MedewerkerDetail
                        medewerker={geselecteerdeMedewerker}
                    />

                </div>

            </div>

        </div>
    );
}

export default App;