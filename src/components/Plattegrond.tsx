import { useState } from "react";

function Plattegrond() {
    const [groteAfbeelding, setGroteAfbeelding] = useState<string | null>(null);

    return (
        <div className="plattegrond">

            <h1>Plattegronden</h1>

            <section className="gebouw">
                <h2>Hoofdgebouw</h2>
                <img
                    src="/images/hoofdgebouw.png"
                    alt="Hoofdgebouw"
                    className="klikbare-afbeelding"
                    onClick={() => setGroteAfbeelding("/images/hoofdgebouw.png")}
                />
            </section>

            <div className="satellieten">

                <section className="gebouw">
                    <h2>Site Kuurne</h2>
                    <img
                        src="/images/siteKuu.png"
                        alt="Site Kuurne"
                        className="klikbare-afbeelding"
                        onClick={() => setGroteAfbeelding("/images/siteKuu.png")}
                    />
                </section>

                <section className="gebouw">
                    <h2>Site Lendelede</h2>
                    <img
                        src="/images/siteLen.png"
                        alt="Site Lendelede"
                        className="klikbare-afbeelding"
                        onClick={() => setGroteAfbeelding("/images/siteLen.png")}
                    />
                </section>

            </div>

            {groteAfbeelding && (
                <div
                    className="lightbox"
                    onClick={() => setGroteAfbeelding(null)}
                >
                    <img
                        src={groteAfbeelding}
                        alt="Vergrote plattegrond"
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="sluit-knop"
                        onClick={() => setGroteAfbeelding(null)}
                    >
                        ✕
                    </button>
                </div>
            )}

        </div>
    );
}

export default Plattegrond;