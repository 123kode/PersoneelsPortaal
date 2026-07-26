import type { Dienst } from "../models/Dienst";
import type { Medewerker } from "../models/Medewerker";

interface DienstDetailProps {
    dienst: Dienst | null;
    medewerkers: Medewerker[];
    onToonMedewerkers: () => void;
    onToonAanwezigen: () => void;
    onSelecteerMedewerker: (medewerker: Medewerker) => void;
}

function DienstDetail({
    dienst,
    medewerkers,
    onToonMedewerkers,
    onToonAanwezigen,
    onSelecteerMedewerker,
}: DienstDetailProps) {

    if (!dienst) {
        return null;
    }

    const diensthoofd = medewerkers.find(
        medewerker =>
            `${medewerker.voornaam} ${medewerker.naam}`
                .trim()
                .toLowerCase() ===
            dienst.diensthoofd
                .trim()
                .toLowerCase()
    );

    const dienstMedewerkers = medewerkers.filter(
        medewerker =>
            medewerker.dienst.trim().toLowerCase() ===
            dienst.naam.trim().toLowerCase()
    );

    const aanwezigeMedewerkers = dienstMedewerkers.filter(
        medewerker => medewerker.aanwezig
    );

    return (
        <div className="dienst-detail-card">

            <div className="dienst-detail-header">
                <div>
                    <div className="dienst-label">Dienst</div>
                    <h2>{dienst.naam}</h2>
                </div>
            </div>

            <div className="dienst-statistieken">

                <button
                    type="button"
                    className="dienst-statistiek dienst-statistiek-knop"
                    onClick={onToonMedewerkers}
                    title={`Toon alle ${dienstMedewerkers.length} medewerkers`}
                >
                    <strong>{dienstMedewerkers.length}</strong>
                    <span>Medewerkers</span>
                </button>

                <button
                    type="button"
                    className="dienst-statistiek dienst-statistiek-knop"
                    onClick={onToonAanwezigen}
                    title={`Toon ${aanwezigeMedewerkers.length} aanwezige medewerkers`}
                >
                    <strong>{aanwezigeMedewerkers.length}</strong>
                    <span>Aanwezig</span>
                </button>

            </div>

            <div className="detail-gegevens">

                <div className="detail-rij">
                    <span className="detail-label">
                        Diensthoofd
                    </span>

                    {diensthoofd ? (
                        <button
                            type="button"
                            className="diensthoofd-link"
                            onClick={() =>
                                onSelecteerMedewerker(diensthoofd)
                            }
                        >
                            {dienst.diensthoofd}
                        </button>
                    ) : (
                        <span>{dienst.diensthoofd}</span>
                    )}
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Locatie</span>
                    <span>{dienst.locatie}</span>
                </div>

                <div className="detail-rij">
                    <span className="detail-label">Telefoon</span>
                    <a href={`tel:${dienst.telefoon}`}>
                        {dienst.telefoon}
                    </a>
                </div>

                <div className="detail-rij">
                    <span className="detail-label">E-mail</span>
                    <a href={`mailto:${dienst.email}`}>
                        {dienst.email}
                    </a>
                </div>

            </div>

            <div className="detail-acties">

                <a
                    className="actie-knop primair"
                    href={`mailto:${dienst.email}`}
                >
                    ✉ E-mail
                </a>

                <a
                    className="actie-knop"
                    href={`tel:${dienst.telefoon}`}
                >
                    ☎ Bellen
                </a>

            </div>

        </div>
    );
}

export default DienstDetail;