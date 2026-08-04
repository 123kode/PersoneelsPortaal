import { useState } from "react";
import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

function Organogram() {
    const [groteAfbeelding, setGroteAfbeelding] = useState<string | null>(null);

    return (
        <div className="plattegrond">

            <h1>Organogram</h1>

            <section className="gebouw">

                <img
                    src="/images/organogram.png"
                    alt="Organogram"
                    className="klikbare-afbeelding"
                    onClick={() =>
                        setGroteAfbeelding("/images/organogram.png")
                    }
                />

            </section>

            {groteAfbeelding && (

                <div
                    className="lightbox"
                    onClick={() => setGroteAfbeelding(null)}
                >

                    <TransformWrapper
                        initialScale={1}
                        minScale={1}
                        maxScale={4}
                        wheel={{
                            step: 0.05,
                        }}
                    >

                        <TransformComponent>

                            <img
                                src={groteAfbeelding}
                                alt="Organogram"
                                className="lightbox-image"
                                onClick={(e) => e.stopPropagation()}
                            />

                        </TransformComponent>

                    </TransformWrapper>

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

export default Organogram;