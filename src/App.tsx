import Voertuigen from "./components/Voertuigen";
import Radios from "./components/Radios";

import Organogram from "./components/Organogram";
import { Users, Building2, Network, Car, Radio } from "lucide-react";

import Plattegrond from "./components/Plattegrond";

import GradenFilter from "./components/GradenFilter";
import { useEffect, useState } from "react";
import "./App.css";

import type { Medewerker } from "./models/Medewerker";
import type { Dienst } from "./models/Dienst";

import { getMedewerkers } from "./services/MedewerkerService";
import { getDiensten } from "./services/DienstService";

import ZoekBalk from "./components/ZoekBalk";
import MedewerkerLijst from "./components/MedewerkerLijst";
import MedewerkerDetail from "./components/MedewerkerDetail";
import DienstDetail from "./components/DienstDetail";
import MultiSelectFilter from "./components/MultiSelectFilter";

function App() {

    const [weergave, setWeergave] = useState<
        "lijst" |
        "plattegrond" |
        "organogram" |
        "voertuigen" |
        "radios"
    >("lijst");


    const [specifiekeGroepFilter, setSpecifiekeGroepFilter] = useState<string[]>([]);

    const operationeleGraden = [
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

    const calogGraden = [
        "CALog A",
        "CALog B",
        "CALog C",
        "CALog D",
    ];

    const [medewerkers, setMedewerkers] = useState<Medewerker[]>([]);
    const [dienstGegevens, setDienstGegevens] = useState<Dienst[]>([]);

    const [zoekTekst, setZoekTekst] = useState("");

    const [geselecteerdeMedewerker, setGeselecteerdeMedewerker] =
        useState<Medewerker | null>(null);

    const [geselecteerdeDienst, setGeselecteerdeDienst] =
        useState<Dienst | null>(null);

    const [sorteerVolgorde, setSorteerVolgorde] = useState("AZ");
    const [dienstFilter, setDienstFilter] = useState<string[]>([]);
    const [functieFilter, setFunctieFilter] = useState<string[]>([]);
    const [aanwezigFilter, setAanwezigFilter] = useState("");
    const [favorietenFilter, setFavorietenFilter] = useState("");

    const [favorieten, setFavorieten] = useState<number[]>(() => {

        const opgeslagenFavorieten =
            localStorage.getItem("favorieten");

        if (!opgeslagenFavorieten) {
            return [];
        }

        try {
            return JSON.parse(opgeslagenFavorieten);
        } catch {
            return [];
        }
    });


    /* =========================
       DATA LADEN
       ========================= */

    useEffect(() => {

        async function laadGegevens() {

            const medewerkersData = await getMedewerkers();
            const dienstenData = await getDiensten();

            setMedewerkers(medewerkersData);
            setDienstGegevens(dienstenData);
        }

        laadGegevens();

    }, []);


    /* =========================
       FAVORIETEN OPSLAAN
       ========================= */

    useEffect(() => {

        localStorage.setItem(
            "favorieten",
            JSON.stringify(favorieten)
        );

    }, [favorieten]);


    /* =========================
       FAVORIET TOEVOEGEN / WISSEN
       ========================= */

    function toggleFavoriet(id: number) {

        setFavorieten(huidigeFavorieten => {

            if (huidigeFavorieten.includes(id)) {

                return huidigeFavorieten.filter(
                    favorietId => favorietId !== id
                );
            }

            return [
                ...huidigeFavorieten,
                id
            ];
        });
    }


    /* =========================
       MEDEWERKER SELECTEREN
       ========================= */

    function selecteerMedewerker(
        medewerker: Medewerker
    ) {

        setGeselecteerdeMedewerker(medewerker);

        // Eventuele dienstkaart sluiten
        setGeselecteerdeDienst(null);
    }


    /* =========================
       DIENST SELECTEREN
       ========================= */

    function selecteerDienst(
        dienstNaam: string
    ) {

        setDienstFilter([dienstNaam]);

        const gevondenDienst =
            dienstGegevens.find(
                dienst =>
                    dienst.naam
                        .trim()
                        .toLowerCase() ===
                    dienstNaam
                        .trim()
                        .toLowerCase()
            );

        if (gevondenDienst) {

            setGeselecteerdeDienst(
                gevondenDienst
            );

            setGeselecteerdeMedewerker(null);
        }
    }


    /* =========================
       FUNCTIE / GRAAD SELECTEREN
       ========================= */

    function selecteerFunctie(
        functie: string
    ) {

        setFunctieFilter([functie]);

        // Detailkaart sluiten zodat de resultaten
        // van de filter centraal staan
        setGeselecteerdeMedewerker(null);
        setGeselecteerdeDienst(null);
    }


    /* =========================
       FILTERS WISSEN
       ========================= */

    function wisFilters() {

        setZoekTekst("");

        setDienstFilter([]);
        setFunctieFilter([]);
        setAanwezigFilter("");
        setFavorietenFilter("");

        setSorteerVolgorde("AZ");

        setGeselecteerdeMedewerker(null);
        setGeselecteerdeDienst(null);
    }


    /* =========================
       UNIEKE DIENSTEN
       ========================= */

    const diensten = [
        ...new Set(
            medewerkers.map(
                medewerker =>
                    medewerker.dienst
            )
        )
    ].sort();


    /* =========================
       UNIEKE FUNCTIES / GRADEN
       ========================= */


    const functies = [
        ...operationeleGraden.filter(graad =>
            medewerkers.some(m => m.functie === graad)
        ),
        ...calogGraden.filter(graad =>
            medewerkers.some(m => m.functie === graad)
        ),
    ];

    /* =========================
       SPECIFIEKE GROEPEN
       ========================= */
    const specifiekeGroepen = [
        ...new Set(
            medewerkers.flatMap(
                m => m.specifiekeGroep ?? []
            )
        )
    ].sort((a, b) =>
        a.localeCompare(b, "nl-BE", {
            sensitivity: "base",
        })
    );


    /* =========================
       DASHBOARDCIJFERS
       ========================= */

    const totaalMedewerkers =
        medewerkers.length;

    const totaalAanwezig =
        medewerkers.filter(
            medewerker =>
                medewerker.aanwezig
        ).length;

    const totaalAfwezig =
        totaalMedewerkers -
        totaalAanwezig;


    /* =========================
       DIENSTFILTER NORMALISEREN
       ========================= */

    function vindDienstNaam(
        dienstNaam: string
    ) {

        return diensten.find(
            dienst =>
                dienst
                    .trim()
                    .toLowerCase() ===
                dienstNaam
                    .trim()
                    .toLowerCase()
        );
    }


    /* =========================
       SCHERM
       ========================= */

    return (

        <div className="App">


            {/* =====================
                HEADER
                ===================== */}

            <div className="portaal-header">

                <div className="portaal-header-inhoud">

                    <h1>
                        🌐 VLASconnect
                        <span className="demo-badge">DEMO</span>
                    </h1>

                    <p className="subtitel">
                        Collega's & diensten binnen handbereik
                    </p>

                </div>

            </div>


            {/* =====================
                DASHBOARD
                ===================== */}

            <div className="dashboard">


                {/* ALLE MEDEWERKERS */}

                <button
                    type="button"
                    className="dashboard-kaart dashboard-knop dashboard-totaal"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter([]);;
                        setFunctieFilter([]);
                        setAanwezigFilter("");
                        setFavorietenFilter("");

                        setGeselecteerdeDienst(null);
                        setGeselecteerdeMedewerker(null);
                    }}
                >

                    <span className="dashboard-getal">
                        {totaalMedewerkers}
                    </span>

                    <span className="dashboard-label">
                        Medewerkers
                    </span>

                </button>


                {/* AANWEZIG */}

                <button
                    type="button"
                    className="dashboard-kaart dashboard-knop dashboard-aanwezig"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter([]);;
                        setFunctieFilter([]);
                        setAanwezigFilter("aanwezig");
                        setFavorietenFilter("");

                        setGeselecteerdeDienst(null);
                        setGeselecteerdeMedewerker(null);
                    }}
                >

                    <span className="dashboard-getal">
                        {totaalAanwezig}
                    </span>

                    <span className="dashboard-label">
                        Aanwezig
                    </span>

                </button>


                {/* AFWEZIG */}

                <button
                    type="button"
                    className="dashboard-kaart dashboard-knop dashboard-afwezig"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter([]);;
                        setFunctieFilter([]);
                        setAanwezigFilter("afwezig");
                        setFavorietenFilter("");

                        setGeselecteerdeDienst(null);
                        setGeselecteerdeMedewerker(null);
                    }}
                >

                    <span className="dashboard-getal">
                        {totaalAfwezig}
                    </span>

                    <span className="dashboard-label">
                        Afwezig
                    </span>

                </button>

            </div>


            {/* =====================
                ZOEKEN EN FILTERS
                ===================== */}

            <div className="filterbalk">

                <div className="weergave-switch">

                    <button
                        type="button"
                        className={
                            weergave === "lijst"
                                ? "switch-knop actief"
                                : "switch-knop"
                        }
                        onClick={() => setWeergave("lijst")}
                    >
                        <Users size={18} />
                        <span>Personeelslijst</span>
                    </button>

                    <button
                        type="button"
                        className={
                            weergave === "plattegrond"
                                ? "switch-knop actief"
                                : "switch-knop"
                        }
                        onClick={() => setWeergave("plattegrond")}
                    >
                        <Building2 size={18} />
                        <span>Plattegronden</span>
                    </button>

                    <button
                        type="button"
                        className={
                            weergave === "organogram"
                                ? "switch-knop actief"
                                : "switch-knop"
                        }
                        onClick={() => setWeergave("organogram")}
                    >
                        <Network size={18} />
                        <span>Organogram</span>
                    </button>

                    <button
                        type="button"
                        className={
                            weergave === "voertuigen"
                                ? "switch-knop actief"
                                : "switch-knop"
                        }
                        onClick={() => setWeergave("voertuigen")}
                    >
                        <Car size={18} />
                        <span>Voertuigen</span>
                    </button>

                    <button
                        type="button"
                        className={
                            weergave === "radios"
                                ? "switch-knop actief"
                                : "switch-knop"
                        }
                        onClick={() => setWeergave("radios")}
                    >
                        <Radio size={18} />
                        <span>Radio's</span>
                    </button>

                </div>

                {weergave === "lijst" && (
                    <>

                        <div className="zoekveld">

                            <ZoekBalk
                                zoekTekst={zoekTekst}
                                onZoekTekstChanged={
                                    setZoekTekst
                                }
                            />

                        </div>


                        <div className="filter-opties">


                            {/* DIENST */}

                            <MultiSelectFilter
                                label="Afdeling"
                                opties={diensten}
                                geselecteerd={dienstFilter}
                                onChange={(waarden) => {
                                    setDienstFilter(waarden);

                                    if (waarden.length === 0) {
                                        setGeselecteerdeDienst(null);
                                    }
                                }}
                            />

                            <MultiSelectFilter
                                label="Specifieke groep"
                                opties={specifiekeGroepen}
                                geselecteerd={specifiekeGroepFilter}
                                onChange={setSpecifiekeGroepFilter}
                            />


                            {/* GRAAD / FUNCTIE */}

                            <GradenFilter
                                beschikbareGraden={functies}
                                geselecteerd={functieFilter}
                                onChange={setFunctieFilter}
                            />


                            {/* AANWEZIGHEID */}

                            <select
                                value={aanwezigFilter}
                                onChange={(e) =>
                                    setAanwezigFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Iedereen
                                </option>

                                <option value="aanwezig">
                                    Aanwezig
                                </option>

                                <option value="afwezig">
                                    Afwezig
                                </option>

                            </select>


                            {/* FAVORIETEN */}

                            <select
                                value={favorietenFilter}
                                onChange={(e) =>
                                    setFavorietenFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Alle medewerkers
                                </option>

                                <option value="favorieten">
                                    ★ Favorieten
                                </option>

                            </select>


                            {/* SORTERING */}

                            <select
                                value={sorteerVolgorde}
                                onChange={(e) =>
                                    setSorteerVolgorde(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="AZ">
                                    Naam A-Z
                                </option>

                                <option value="ZA">
                                    Naam Z-A
                                </option>

                            </select>


                            {/* WIS FILTERS */}

                            <button
                                type="button"
                                className="wis-filters-knop"
                                onClick={wisFilters}
                            >
                                <span>🗑</span> Wis alle filters
                            </button>

                        </div>

                    </>
                )}
            </div>


            {(zoekTekst ||
                dienstFilter ||
                functieFilter ||
                aanwezigFilter ||
                favorietenFilter) && (

                    <div className="actieve-filters">

                        <span className="actieve-filters-label">
                            Actieve filters:
                        </span>

                        {zoekTekst && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => setZoekTekst("")}
                                title="Zoekterm verwijderen"
                            >
                                Zoeken: {zoekTekst}
                                <span>×</span>
                            </button>
                        )}

                        {dienstFilter.length > 0 && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => {
                                    setDienstFilter([]);
                                    setGeselecteerdeDienst(null);
                                }}
                                title={`Geselecteerd: ${dienstFilter.join(", ")}\nKlik om alle dienstfilters te verwijderen`}
                            >
                                🏢 Diensten ({dienstFilter.length})
                                <span>×</span>
                            </button>
                        )}

                        {functieFilter.length > 0 && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => setFunctieFilter([])}
                                title={`Geselecteerd: ${functieFilter.join(", ")}\nKlik om alle graadfilters te verwijderen`}
                            >
                                👮 Graden ({functieFilter.length})
                                <span>×</span>
                            </button>
                        )}

                        {aanwezigFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => setAanwezigFilter("")}
                                title="Aanwezigheidsfilter verwijderen"
                            >
                                {aanwezigFilter === "aanwezig"
                                    ? "🟢 Aanwezig"
                                    : "🟠 Afwezig"}
                                <span>×</span>
                            </button>
                        )}

                        {favorietenFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => setFavorietenFilter("")}
                                title="Favorietenfilter verwijderen"
                            >
                                ★ Favorieten
                                <span>×</span>
                            </button>
                        )}

                    </div>
                )}



            {/* =====================
    PERSONEEL
    ===================== */}

            {weergave === "lijst" && (

                <div className="main-layout">


                    {/* LINKERKANT */}

                    <div className="left-panel">
                        <h3>Medewerkers geladen: {medewerkers.length}</h3>
                        <MedewerkerLijst
                            medewerkers={medewerkers}
                            zoekTekst={zoekTekst}
                            sorteerVolgorde={sorteerVolgorde}
                            dienstFilter={dienstFilter}
                            functieFilter={functieFilter}
                            specifiekeGroepFilter={specifiekeGroepFilter}   // <-- ontbreekt waarschijnlijk
                            aanwezigFilter={aanwezigFilter}
                            favorietenFilter={favorietenFilter}
                            favorieten={favorieten}
                            geselecteerdeMedewerker={geselecteerdeMedewerker}
                            onSelecteer={selecteerMedewerker}
                            onSelecteerDienst={selecteerDienst}
                            onSelecteerFunctie={selecteerFunctie}
                            onToggleFavoriet={toggleFavoriet}
                            onWisFilters={wisFilters}
                        />

                    </div>

                    {/* RECHTERKANT */}

                    <div className="right-panel">

                        {geselecteerdeDienst ? (

                            <DienstDetail

                                dienst={geselecteerdeDienst}

                                medewerkers={medewerkers}

                                onSelecteerMedewerker={selecteerMedewerker}

                                onToonMedewerkers={() => {

                                    const dienstNaam =
                                        vindDienstNaam(geselecteerdeDienst.naam);

                                    if (dienstNaam) {
                                        setDienstFilter([dienstNaam]);
                                    }

                                    setZoekTekst("");
                                    setFunctieFilter([]);
                                    setAanwezigFilter("");
                                    setFavorietenFilter("");
                                }}

                                onToonAanwezigen={() => {

                                    const dienstNaam =
                                        vindDienstNaam(geselecteerdeDienst.naam);

                                    if (dienstNaam) {
                                        setDienstFilter([dienstNaam]);
                                    }

                                    setZoekTekst("");
                                    setFunctieFilter([]);
                                    setAanwezigFilter("aanwezig");
                                    setFavorietenFilter("");
                                }}

                            />

                        ) : (

                            <MedewerkerDetail
                                medewerker={geselecteerdeMedewerker}
                                onOpenPlattegrond={() => setWeergave("plattegrond")}
                            />

                        )}

                    </div>

                </div>

            )}



            {/* =====================
    PLATTEGRONDEN
    ===================== */}

            {weergave === "plattegrond" && (
                <Plattegrond />
            )}

            {/* =====================
    ORGANOGRAM
    ===================== */}

            {weergave === "organogram" && (
                <Organogram />
            )}

            {/* =====================
    VOERTUIGEN
    ===================== */}

            {weergave === "voertuigen" && (
                <Voertuigen />
            )}

            {/* =====================
    RADIO'S
    ===================== */}

            {weergave === "radios" && (
                <Radios />
            )}

        </div>
    );
}

export default App;