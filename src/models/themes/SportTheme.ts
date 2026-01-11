import { IThemeStrategy } from "../../interfaces/IThemeStrategy";
import { IEmission } from "../../interfaces/IEmission";

export class SportTheme implements IThemeStrategy {
    getName(): string {
        return "Sport";
    }
    formatEmission(emission: IEmission): Record<string, unknown> {
        // RadioSport format: { sport, équipes, score, minute }
        // STRICT JSON COMPLIANCE (Sujet 3.4)
        const details = emission.details;
        return {
            sport: details.sport || "Divers",
            équipes: details.teams || "TBD",
            score: details.score || "0-0",
            minute: details.minute || "00:00"
        };
    }
}
