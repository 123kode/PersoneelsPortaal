function Voertuigen() {
    return (
        <div className="placeholder-module">

            <h1>🚓 Voertuigen</h1>

            <p className="placeholder-subtitel">
                Wagenpark binnen PZ VLAS.
            </p>

            <div className="placeholder-info">

                <h2>🚧 Module in ontwikkeling</h2>



                <p>
                    De gegevens worden automatisch ingelezen vanuit een
                    <strong> SharePoint-lijst</strong>, zodat alle voertuiginformatie
                    centraal wordt beheerd en steeds actueel blijft.
                </p>

            </div>

            <div className="placeholder-grid">

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">🔍</div>
                    <h3>Zoeken</h3>
                    <p>
                        Op roepnummer, nummerplaat, merk of model.
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">🎛️</div>
                    <h3>Filters</h3>
                    <p>
                        Type, status, standplaats, brandstof,
                        prioriteit...
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">📋</div>
                    <h3>Voertuigenlijst</h3>
                    <p>
                        Overzicht met sortering, favorieten en snelle selectie.
                    </p>
                </div>

                <div className="placeholder-kaart">
                    <div className="placeholder-icoon">📄</div>
                    <h3>Detailfiche</h3>
                    <p>
                        Technische gegevens, uitrusting, standplaats,
                        historiek en opmerkingen.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Voertuigen;