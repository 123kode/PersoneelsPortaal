function Radios() {
    return (
        <div className="placeholder-module">

            <h1>📻 Radio's</h1>

            <p className="placeholder-subtitel">
                Radio's binnen PZ VLAS.
            </p>

            <div className="placeholder-info">

                <h2>🚧 Module in ontwikkeling</h2>

                <p>
                    De gegevens worden automatisch ingelezen vanuit een
                    <strong> SharePoint-lijst</strong>, zodat alle radio's
                    centraal worden beheerd en steeds actueel blijven.
                </p>

            </div>

            <div className="placeholder-grid">

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">🔍</div>
                    <h3>Zoeken</h3>
                    <p>
                        Op radionummer, serienummer of toegewezen gebruiker.
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">🎛️</div>
                    <h3>Filters</h3>
                    <p>
                        Type, status, bewaarplaats en gebruiker.
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">📋</div>
                    <h3>Radiolijst</h3>
                    <p>
                        Overzicht met sortering, favorieten en snelle selectie.
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">📄</div>
                    <h3>Detailfiche</h3>
                    <p>
                        Configuratie, accessoires, historiek en bewaarplaats.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Radios;