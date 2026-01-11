import { IObserver } from "../interfaces/IObserver";

export class Auditeur implements IObserver<unknown> {
    constructor(public name: string) {}

    update(data: unknown): void {
        console.log(`[Notification pour ${this.name}]:`, JSON.stringify(data, null, 2));
    }
}
