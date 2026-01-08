import { IObserver } from "../interfaces/IObserver";

export class Auditeur implements IObserver {
    constructor(public name: string) {}

    update(data: any): void {
        console.log(`[Notification pour ${this.name}]:`, JSON.stringify(data, null, 2));
    }
}
