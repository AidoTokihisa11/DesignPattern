import { IEmission, EmissionType } from "../interfaces/IEmission";

interface EmissionDetailsInput {
    [key: string]: any;
}

export class EmissionFactory {
    static createEmission(type: string, content: string, details: EmissionDetailsInput = {}): IEmission {
        const timestamp = new Date();
        const id = Date.now().toString();

        const normalizedType = this.normalizeType(type);

        let formattedDetails: Record<string, unknown>;

        switch (normalizedType) {
            case "Musique":
                formattedDetails = {
                    artist: details.artist || "Unknown",
                    title: content,
                    album: details.album || "Single",
                    duration: details.duration || "0:00"
                };
                break;
            case "Sport":
                formattedDetails = {
                    sport: details.sport || "Football",
                    teams: details.teams || "A vs B",
                    score: details.score || "0-0",
                    minute: details.minute || "0'"
                };
                break;
            case "Actu":
                formattedDetails = {
                    category: details.category || "General",
                    title: content,
                    source: details.source || "AFP"
                };
                break;
            default:
                throw new Error(`Type d'émission inconnu: ${type}`);
        }

        return {
            id,
            type: normalizedType,
            content,
            timestamp,
            details: formattedDetails
        };
    }

    private static normalizeType(type: string): EmissionType {
        const lower = type.toLowerCase();
        if (lower === "musique") return "Musique";
        if (lower === "sport") return "Sport";
        if (lower === "actu") return "Actu";
        throw new Error(`Invalid emission type: ${type}`);
    }
}
