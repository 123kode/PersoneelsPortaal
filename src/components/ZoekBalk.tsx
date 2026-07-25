interface ZoekBalkProps {
    zoekTekst: string;
    onZoekTekstChanged: (tekst: string) => void;
}

function ZoekBalk({ zoekTekst, onZoekTekstChanged }: ZoekBalkProps) {
    return (
        <input
            type="text"
            placeholder="Typ een naam..."
            value={zoekTekst}
            onChange={(e) => onZoekTekstChanged(e.target.value)}
        />
    );
}

export default ZoekBalk;