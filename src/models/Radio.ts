import { ISubject } from "../interfaces/ISubject";
import { IObserver } from "../interfaces/IObserver";
import { IThemeStrategy } from "../interfaces/IThemeStrategy";
import { ICatalogueItem } from "../interfaces/ICatalogueItem";
import { IEmission } from "../interfaces/IEmission";

export class Radio implements ISubject<Record<string, unknown>>, ICatalogueItem {
    private observers: IObserver<Record<string, unknown>>[] = [];
    
    constructor(public name: string, public theme: IThemeStrategy) {}

    attach(observer: IObserver<Record<string, unknown>>): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`Auditeur abonné à ${this.name}.`);
        }
    }

    detach(observer: IObserver<Record<string, unknown>>): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`Auditeur désabonné de ${this.name}.`);
        }
    }

    getName(): string {
        return this.name;
    }

    notify(data: Record<string, unknown>): void {
        this.observers.forEach(observer => observer.update(data));
    }

    broadcastEmission(emission: IEmission): void {
        const formattedData = this.theme.formatEmission(emission);
        console.log(`Radio ${this.name} (${this.theme.getName()}) diffusa :`, formattedData);
        this.notify(formattedData);
    }
}
