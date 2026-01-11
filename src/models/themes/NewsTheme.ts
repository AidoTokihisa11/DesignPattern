import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class NewsTheme implements IThemeStrategy {
    getName(): string {
        return "Actu";
    }
    formatEmission(emission: IEmission): Record<string, unknown> {
        // RadioActualites format: { catégorie, titre, source }
        // STRICT JSON COMPLIANCE (Sujet 3.4) (Heure is added per requirement 3.3 for News)
        const details = emission.details;
        return {
            catégorie: details.category || "Général",
            titre: details.title || emission.content,
            source: details.source || "Rédaction",
            heure: emission.timestamp
        };
    }
}
