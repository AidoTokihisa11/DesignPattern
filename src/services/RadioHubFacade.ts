import { Catalogue } from "../patterns/Catalogue";
import { Radio } from "../models/Radio";
import { Auditeur } from "../models/Auditeur";
import { ThemeRegistry } from "./ThemeRegistry";
import { EmissionFactory } from "../patterns/EmissionFactory";

export class RadioHubFacade {
    private mainCatalogue: Catalogue;
    private auditeurs: Map<string, Auditeur> = new Map();

    constructor() {
        this.mainCatalogue = new Catalogue("Main Catalogue");
        // Initialize with default themes if registry is empty? 
        // Assuming registry is populated externally or self-populated.
    }

    createRadio(name: string, themeName: string): Radio {
        const registry = ThemeRegistry.getInstance();
        let theme = registry.getTheme(themeName);
        
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
        return this.auditeurs.get(name)!;
    }

    subscribeAuditeur(auditeurName: string, radioName: string): void {
        const radio = this.getRadio(radioName);
        if (!radio) throw new Error(`Radio '${radioName}' introuvable`);

        const auditeur = this.createAuditeur(auditeurName);
        radio.attach(auditeur);
    }

    unsubscribeAuditeur(auditeurName: string, radioName: string): void {
        const radio = this.getRadio(radioName);
        if (!radio) throw new Error(`Radio '${radioName}' introuvable`);
        
        const auditeur = this.auditeurs.get(auditeurName);
        if (auditeur) {
            radio.detach(auditeur);
        }
    }

    // CU_7: Envoyer un message à l'animateur (Simulé)
    sendAnimatorMessage(auditeurName: string, radioName: string, message: string): void {
        const radio = this.getRadio(radioName);
        if (!radio) throw new Error(`Radio '${radioName}' introuvable`);
        
        console.log(`[MESSAGE] De ${auditeurName} pour l'animateur de ${radioName}: "${message}"`);
    }

    // CU_8: Écouter une émission (Simulé)
    listenToRadio(auditeurName: string, radioName: string): { status: string, radio: string, url: string } {
        const radio = this.getRadio(radioName);
        if (!radio) throw new Error(`Radio '${radioName}' introuvable`);
        
        console.log(`[STREAM] ${auditeurName} commence à écouter ${radioName}`);
        return {
            status: "connected",
            radio: radioName,
            url: `http://stream.radiohub.net/${radioName.toLowerCase()}/live.mp3`
        };
    }

    emitEmission(radioName: string, type: string, content: string, details: any): void {
        const radio = this.getRadio(radioName);
        if (!radio) throw new Error(`Radio '${radioName}' introuvable`);

        const emission = EmissionFactory.createEmission(type, content, details);
        
        // Pass the full emission object to the radio
        radio.notify(emission);
    }
}
