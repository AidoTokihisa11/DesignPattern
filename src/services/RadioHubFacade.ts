import { Catalogue } from "../patterns/Catalogue";
import { Radio } from "../models/Radio";
import { Auditeur } from "../models/Auditeur";
import { ThemeRegistry } from "./ThemeRegistry";
import { EmissionFactory } from "../patterns/EmissionFactory";

const STREAM_URL_BASE = "http://stream.radiohub.net";

export class RadioHubFacade {
    private mainCatalogue: Catalogue;
    private auditeurs: Map<string, Auditeur> = new Map();

    constructor() {
        this.mainCatalogue = new Catalogue("Main Catalogue");
    }

    createRadio(name: string, themeName: string): Radio {
        const registry = ThemeRegistry.getInstance();
        const theme = registry.getTheme(themeName);
        
        if (!theme) {
            throw new Error(`Theme '${themeName}' introuvable. Thèmes dispos: ${registry.listThemes().join(', ')}`);
        }

        const radio = new Radio(name, theme);
        this.mainCatalogue.add(radio);
        console.log(`Radio créée: ${name} (${themeName})`);
        return radio;
    }

    getRadio(name: string): Radio | undefined {
         const iterator = this.mainCatalogue.createIterator();
         while (iterator.hasNext()) {
             const item = iterator.next();
             if (item instanceof Radio && item.name === name) {
                 return item;
             }
         }
         return undefined;
    }

    private getRadioOrThrow(name: string): Radio {
        const radio = this.getRadio(name);
        if (!radio) {
            throw new Error(`Radio '${name}' introuvable`);
        }
        return radio;
    }

    getAllRadios(): { name: string, theme: string }[] {
        const radios: { name: string, theme: string }[] = [];
        const iterator = this.mainCatalogue.createIterator();
        while(iterator.hasNext()) {
            const item = iterator.next();
            if (item instanceof Radio) {
                radios.push({
                    name: item.name,
                    theme: item.theme.getName()
                });
            }
        }
        return radios;
    }

    createAuditeur(name: string): Auditeur {
        if (!this.auditeurs.has(name)) {
            const auditeur = new Auditeur(name);
            this.auditeurs.set(name, auditeur);
        }
        const found = this.auditeurs.get(name);
        if (!found) throw new Error("Erreur de création d'auditeur");
        return found;
    }

    subscribeAuditeur(auditeurName: string, radioName: string): void {
        const radio = this.getRadioOrThrow(radioName);
        const auditeur = this.createAuditeur(auditeurName);
        radio.attach(auditeur);
    }

    unsubscribeAuditeur(auditeurName: string, radioName: string): void {
        const radio = this.getRadioOrThrow(radioName);
        const auditeur = this.auditeurs.get(auditeurName);
        if (auditeur) {
            radio.detach(auditeur);
        }
    }

    // CU_7: Envoyer un message à l'animateur
    sendAnimatorMessage(auditeurName: string, radioName: string, message: string): void {
        this.getRadioOrThrow(radioName); // Ensure radio exists
        // Simulation of message processing
        console.log(`[MESSAGE] De ${auditeurName} pour l'animateur de ${radioName}: "${message}"`);
    }

    // CU_8: Écouter une émission
    listenToRadio(auditeurName: string, radioName: string): { status: string, radio: string, url: string } {
        this.getRadioOrThrow(radioName); // Ensure radio exists
        
        console.log(`[STREAM] ${auditeurName} commence à écouter ${radioName}`);
        return {
            status: "connected",
            radio: radioName,
            url: `${STREAM_URL_BASE}/${radioName.toLowerCase()}/live.mp3`
        };
    }

    emitEmission(radioName: string, type: string, content: string, details: Record<string, unknown>): void {
        const radio = this.getRadioOrThrow(radioName);
        const emission = EmissionFactory.createEmission(type, content, details);
        radio.broadcastEmission(emission);
    }
}
