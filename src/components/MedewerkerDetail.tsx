import type { Medewerker } from "../models/Medewerker";

interface MedewerkerDetailProps {
    medewerker: Medewerker | null;
    onOpenPlattegrond: () => void;
    onTeamClick: (team: string) => void;
    onDienstClick: (dienst: string) => void;
}

function MedewerkerDetail({
    medewerker,
    onOpenPlattegrond,
    onTeamClick,
    onDienstClick,
}: MedewerkerDetailProps) {

    if (!medewerker) {
        return (
            <div className="detail-placeholder">
                <div className="placeholder-icoon">👤</div>
                <h3>Selecteer een medewerker</h3>
                <p>Klik op een medewerker om de contactgegevens te bekijken.</p>
            </div>
        );
    }

    return (
        <div className="detail-card">

            {/* IDENTITEIT */}

            <div className="detail-header">

                <img
                    src={`/foto's/${medewerker.foto}`}
                    alt={`${medewerker.naam} ${medewerker.voornaam}`}
                    className="detail-foto"
                />

                <div className="detail-identiteit">

                    <h2>
                        {medewerker.naam}, {medewerker.voornaam}
                    </h2>

                    <div className="detail-functie">
                        {medewerker.functie}
                    </div>

                    <div
                        className={
                            medewerker.aanwezig
                                ? "status-badge aanwezig"
                                : "status-badge afwezig"
                        }
                    >
                        <span className="status-dot"></span>
                        {medewerker.aanwezig ? "Aanwezig" : "Afwezig"}
                    </div>

                </div>

            </div>

            {/* WERKGEGEVENS */}

            <div className="detail-gegevens">

                <div className="detail-sectie-titel">
                    Werkgegevens
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Afdeling</span>

                    <button
                        className="detail-link"
                        onClick={() => onDienstClick(medewerker.dienst)}
                    >
                        {medewerker.dienst}
                    </button>
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Team</span>

                    <button
                        className="detail-link"
                        onClick={() => {
                            if (medewerker.team) {
                                onTeamClick(medewerker.team);
                            }
                        }}
                    >
                        {medewerker.team || "—"}
                    </button>
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Specifieke groep</span>

                    <div className="groep-tags">
                        {medewerker.specifiekeGroep?.length ? (
                            medewerker.specifiekeGroep.map((groep) => (
                                <span
                                    key={groep}
                                    className="groep-tag"
                                >
                                    {groep}
                                </span>
                            ))
                        ) : (
                            <span>—</span>
                        )}
                    </div>
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Gebouw</span>

                    <button
                        type="button"
                        className="gebouw-link"
                        onClick={onOpenPlattegrond}
                    >
                        🏢 {medewerker.gebouw || "—"}
                    </button>
                </div>

            </div>

            {/* CONTACT */}

            <div className="detail-gegevens">

                <div className="detail-sectie-titel">
                    Contact
                </div>

                <div className="detail-rij contact-rij">
                    <span className="detail-label">GSM</span>

                    <a
                        className="contact-link"
                        href={`tel:${medewerker.telefoon}`}
                    >
                        <span className="contact-icoon">📱</span>
                        {medewerker.telefoon}
                    </a>
                </div>

                <div className="detail-rij contact-rij">
                    <span className="detail-label">Vast toestel</span>

                    {medewerker.vastToestel ? (
                        <a
                            className="contact-link"
                            href={`tel:${medewerker.vastToestel}`}
                        >
                            <span className="contact-icoon">☎</span>
                            {medewerker.vastToestel}
                        </a>
                    ) : (
                        <span>—</span>
                    )}
                </div>

                <div className="detail-rij contact-rij">
                    <span className="detail-label">E-mail</span>

                    <a
                        className="contact-link"
                        href={`mailto:${medewerker.email}`}
                    >
                        <span className="contact-icoon">✉</span>
                        {medewerker.email}
                    </a>
                </div>

                <div className="detail-rij contact-rij">
                    <span className="detail-label">Teams</span>

                    <a
                        className="contact-link"
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(
                            medewerker.email
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="contact-icoon">💬</span>
                        Start chat
                    </a>
                </div>

            </div>

            {/* DEMO: GEPLANDE PRESTATIES */}

            <div className="planning-blok">

                <div className="planning-header">

                    <h3>Geplande prestaties</h3>

                    <span className="planning-demo">
                        Demo
                    </span>

                </div>

                <div className="planning-rij">
                    <span>Vandaag</span>
                    <strong>07:00 – 15:00</strong>
                </div>

                <div className="planning-rij">
                    <span>Maandag</span>
                    <strong>07:00 – 15:00</strong>
                </div>

                <div className="planning-rij">
                    <span>Dinsdag</span>
                    <strong>13:00 – 21:00</strong>
                </div>

                <div className="planning-rij">
                    <span>Woensdag</span>
                    <strong className="planning-rust">
                        Rust
                    </strong>
                </div>

                <div className="planning-rij">
                    <span>Donderdag</span>
                    <strong>07:00 – 15:00</strong>
                </div>

            </div>

        </div>
    );
}

export default MedewerkerDetail;