import { IThemeStrategy } from "../interfaces/IThemeStrategy";

export class ThemeRegistry {
    private static instance: ThemeRegistry;
    private themes: Map<string, IThemeStrategy> = new Map();

    private constructor() {}

    public static getInstance(): ThemeRegistry {
        if (!ThemeRegistry.instance) {
            ThemeRegistry.instance = new ThemeRegistry();
        }
        return ThemeRegistry.instance;
    }

    public registerTheme(theme: IThemeStrategy): void {
        this.themes.set(theme.getName().toLowerCase(), theme);
    }

    public getTheme(name: string): IThemeStrategy | undefined {
        return this.themes.get(name.toLowerCase());
    }

    public listThemes(): string[] {
        return Array.from(this.themes.keys());
    }
}
