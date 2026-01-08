import { IEmission } from "../interfaces/IEmission";

export class EmissionFactory {
    static createEmission(type: string, content: string, details: any = {}): IEmission {
        const base = {
            id: Date.now().toString(),
            content,
            timestamp: new Date()
        };

        switch (type.toLowerCase()) {
            case "musique":
                // Format: { artiste, titre, album, durée } - Sujet 3.4
                return { 
                    ...base, 
                    type: "Musique", 
                    details: { 
                        artist: details.artist || "Unknown", 
                        title: content, // Repurposing content as title
                        album: details.album || "Single",
                        duration: details.duration || "0:00" 
                    } 
                };
            case "sport":
                // Format: { sport, équipes, score, minute } - Sujet 3.4
                return { 
                    ...base, 
                    type: "Sport", 
                    details: { 
                        sport: details.sport || "Football",
                        teams: details.teams || "A vs B", // Repurposing match as teams
                        score: details.score || "0-0",
                        minute: details.minute || "0'"
                    } 
                };
            case "actu":
                // Format: { catégorie, titre, source } - Sujet 3.4
                return { 
                    ...base, 
                    type: "Actu", 
                    details: { 
                        category: details.category || "General",
                        title: content,
                        source: details.source || "AFP" 
                    } 
                };
            default:
                throw new Error(`Type d'émission inconnu: ${type}`);
        }
    }
}
