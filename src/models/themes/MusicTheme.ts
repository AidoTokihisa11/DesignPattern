import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class MusicTheme implements IThemeStrategy {
    getName(): string {
        return "Musique";
    }
    formatEmission(emission: IEmission): Record<string, unknown> {
        // RadioMusicale format: { artiste, titre, album, durée }
        // STRICT JSON COMPLIANCE (Sujet 3.4)
        const details = emission.details;
        return {
            artiste: details.artist || "Inconnu",
            titre: details.title || emission.content,
            album: details.album || "Single",
            durée: details.duration || "0:00"
        };
    }
}
