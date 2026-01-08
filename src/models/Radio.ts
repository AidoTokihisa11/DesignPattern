import { ISubject } from "../interfaces/ISubject";
import { IObserver } from "../interfaces/IObserver";
import { IThemeStrategy } from "../interfaces/IThemeStrategy";
import { ICatalogueItem } from "../interfaces/ICatalogueItem";

export class Radio implements ISubject, ICatalogueItem {
    private observers: IObserver[] = [];
    
    constructor(public name: string, public theme: IThemeStrategy) {}

    attach(observer: IObserver): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`Auditeur abonné à ${this.name}.`);
        }
    }

    detach(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`Auditeur désabonné de ${this.name}.`);
        }
    }

    getName(): string {
        return this.name;
    }

    notify(emission: any): void {
        const formattedData = this.theme.formatEmission(emission);
        console.log(`Radio ${this.name} (${this.theme.getName()}) diffusa :`, formattedData);
        this.observers.forEach(observer => observer.update(formattedData));
    }
}
