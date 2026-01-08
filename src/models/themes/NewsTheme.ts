import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class NewsTheme implements IThemeStrategy {
    getName(): string {
        return "Actu";
    }
    formatEmission(emission: IEmission): any {
        // RadioActualites format: { catégorie, titre, source }
        const d = emission.details;
        return {
            source_radio: "Actualités",
            categorie: d.category || "Général",
            titre: d.title || emission.content,
            source: d.source || "Rédaction",
            heure: emission.timestamp
        };
    }
}
