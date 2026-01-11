import { IEmission } from "./IEmission";

export interface IThemeStrategy {
    getName(): string;
    formatEmission(emission: IEmission): Record<string, unknown>;
}
