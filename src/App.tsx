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

function App() {

    const [medewerkers, setMedewerkers] = useState<Medewerker[]>([]);
    const [dienstGegevens, setDienstGegevens] = useState<Dienst[]>([]);

    const [zoekTekst, setZoekTekst] = useState("");

    const [geselecteerdeMedewerker, setGeselecteerdeMedewerker] =
        useState<Medewerker | null>(null);

    const [geselecteerdeDienst, setGeselecteerdeDienst] =
        useState<Dienst | null>(null);

    const [sorteerVolgorde, setSorteerVolgorde] = useState("AZ");
    const [dienstFilter, setDienstFilter] = useState("");
    const [functieFilter, setFunctieFilter] = useState("");
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

        setDienstFilter(dienstNaam);

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

        setFunctieFilter(functie);

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

        setDienstFilter("");
        setFunctieFilter("");
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
        ...new Set(
            medewerkers.map(
                medewerker =>
                    medewerker.functie
            )
        )
    ].sort();


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
                        🌐VLAS CONNECT
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
                    className="dashboard-kaart dashboard-knop"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter("");
                        setFunctieFilter("");
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
                    className="dashboard-kaart dashboard-knop"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter("");
                        setFunctieFilter("");
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
                    className="dashboard-kaart dashboard-knop"
                    onClick={() => {

                        setZoekTekst("");

                        setDienstFilter("");
                        setFunctieFilter("");
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

                    <select
                        value={dienstFilter}
                        onChange={(e) => {

                            const dienstNaam =
                                e.target.value;

                            setDienstFilter(
                                dienstNaam
                            );

                            if (dienstNaam === "") {
                                setGeselecteerdeDienst(null);
                            }
                        }}
                    >

                        <option value="">
                            Alle diensten
                        </option>

                        {diensten.map(
                            dienst => (

                                <option
                                    key={dienst}
                                    value={dienst}
                                >
                                    {dienst}
                                </option>

                            )
                        )}

                    </select>


                    {/* GRAAD / FUNCTIE */}

                    <select
                        value={functieFilter}
                        onChange={(e) =>
                            setFunctieFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Alle graden
                        </option>

                        {functies.map(
                            functie => (

                                <option
                                    key={functie}
                                    value={functie}
                                >
                                    {functie}
                                </option>

                            )
                        )}

                    </select>


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
                        Wis filters
                    </button>

                </div>

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

                        {dienstFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() => {
                                    setDienstFilter("");
                                    setGeselecteerdeDienst(null);
                                }}
                                title="Dienstfilter verwijderen"
                            >
                                {dienstFilter}
                                <span>×</span>
                            </button>
                        )}

                        {functieFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() =>
                                    setFunctieFilter("")
                                }
                                title="Graadfilter verwijderen"
                            >
                                {functieFilter}
                                <span>×</span>
                            </button>
                        )}

                        {aanwezigFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() =>
                                    setAanwezigFilter("")
                                }
                                title="Aanwezigheidsfilter verwijderen"
                            >
                                {aanwezigFilter === "aanwezig"
                                    ? "Aanwezig"
                                    : "Afwezig"}
                                <span>×</span>
                            </button>
                        )}

                        {favorietenFilter && (
                            <button
                                type="button"
                                className="filter-chip"
                                onClick={() =>
                                    setFavorietenFilter("")
                                }
                                title="Favorietenfilter verwijderen"
                            >
                                ★ Favorieten
                                <span>×</span>
                            </button>
                        )}

                    </div>
                )}


            {/* =====================
                PERSONEEL + DETAIL
                ===================== */}

            <div className="main-layout">


                {/* LINKERKANT */}

                <div className="left-panel">

                    <MedewerkerLijst

                        medewerkers={
                            medewerkers
                        }

                        zoekTekst={
                            zoekTekst
                        }

                        sorteerVolgorde={
                            sorteerVolgorde
                        }

                        dienstFilter={
                            dienstFilter
                        }

                        functieFilter={
                            functieFilter
                        }

                        aanwezigFilter={
                            aanwezigFilter
                        }

                        favorietenFilter={
                            favorietenFilter
                        }

                        favorieten={
                            favorieten
                        }

                        geselecteerdeMedewerker={
                            geselecteerdeMedewerker
                        }

                        onSelecteer={
                            selecteerMedewerker
                        }

                        onSelecteerDienst={
                            selecteerDienst
                        }

                        onSelecteerFunctie={
                            selecteerFunctie
                        }

                        onToggleFavoriet={
                            toggleFavoriet
                        }

                        onWisFilters={wisFilters}

                    />

                </div>


                {/* RECHTERKANT */}

                <div className="right-panel">


                    {geselecteerdeDienst ? (

                        <DienstDetail

                            dienst={
                                geselecteerdeDienst
                            }

                            medewerkers={
                                medewerkers
                            }

                            onSelecteerMedewerker={selecteerMedewerker}


                            /* ALLE MEDEWERKERS
                               VAN DE DIENST */

                            onToonMedewerkers={() => {

                                const dienstNaam =
                                    vindDienstNaam(
                                        geselecteerdeDienst.naam
                                    );

                                if (dienstNaam) {
                                    setDienstFilter(dienstNaam);
                                }

                                setZoekTekst("");
                                setFunctieFilter("");
                                setAanwezigFilter("");
                                setFavorietenFilter("");
                            }}

                            /* ALLE AANWEZIGE
                               MEDEWERKERS
                               VAN DE DIENST */

                            onToonAanwezigen={() => {

                                const dienstNaam =
                                    vindDienstNaam(
                                        geselecteerdeDienst.naam
                                    );

                                if (dienstNaam) {
                                    setDienstFilter(dienstNaam);
                                }

                                setZoekTekst("");
                                setFunctieFilter("");
                                setAanwezigFilter("aanwezig");
                                setFavorietenFilter("");
                            }}

                        />

                    ) : (

                        <MedewerkerDetail
                            medewerker={
                                geselecteerdeMedewerker
                            }
                        />

                    )}

                </div>

            </div>

        </div>
    );
}

export default App;