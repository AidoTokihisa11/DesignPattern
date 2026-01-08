import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class MusicTheme implements IThemeStrategy {
    getName(): string {
        return "Musique";
    }
    formatEmission(emission: IEmission): any {
        // RadioMusicale format: { artiste, titre, album, durée }
        const d = emission.details;
        return {
            source_radio: "Musique",
            artiste: d.artist || "Inconnu",
            titre: d.title || emission.content,
            album: d.album || "Single",
            duree: d.duration || "0:00"
        };
    }
}
