import type { Medewerker } from "../models/Medewerker";

interface MedewerkerDetailProps {
    medewerker: Medewerker | null;
}

function MedewerkerDetail({ medewerker }: MedewerkerDetailProps) {

    if (!medewerker) {
        return null;
    }

    return (
        <div className="detail-card">

            <div className="detail-header">

                <img
                    src={`/foto's/${medewerker.foto}`}
                    alt={medewerker.naam}
                    className="detail-foto"
                />

                <div>

                    <h2>
                        {medewerker.voornaam} {medewerker.naam}
                    </h2>

                    <h3>{medewerker.functie}</h3>

                </div>

            </div>

            <p><strong>Dienst:</strong> {medewerker.dienst}</p>
            <p><strong>E-mail:</strong> {medewerker.email}</p>
            <p><strong>Telefoon:</strong> {medewerker.telefoon}</p>

            <p>
                <strong>Status:</strong>{" "}
                {medewerker.aanwezig ? "🟢 Aanwezig" : "🔴 Afwezig"}
            </p>

        </div>
    );
}

export default MedewerkerDetail;