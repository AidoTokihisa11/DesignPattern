import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class SportTheme implements IThemeStrategy {
    getName(): string {
        return "Sport";
    }
    formatEmission(emission: IEmission): any {
        // RadioSport format: { sport, équipes, score, minute }
        const d = emission.details;
        return {
            source_radio: "Sport",
            sport: d.sport || "Divers",
            equipes: d.teams || "TBD",
            score: d.score || "0-0",
            temps: d.minute || "00:00"
        };
    }
}
