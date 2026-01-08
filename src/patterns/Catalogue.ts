import { ICatalogueItem } from "../interfaces/ICatalogueItem";
import { IIterator } from "../interfaces/IIterator";

export class CatalogueIterator implements IIterator<ICatalogueItem> {
    private position: number = 0;
    constructor(private items: ICatalogueItem[]) {}

    hasNext(): boolean {
        return this.position < this.items.length;
    }

    next(): ICatalogueItem | null {
        if (!this.hasNext()) {
            return null;
        }
        return this.items[this.position++];
    }
}

export class Catalogue implements ICatalogueItem {
    private items: ICatalogueItem[] = [];

    constructor(private name: string) {}

    add(item: ICatalogueItem): void {
        this.items.push(item);
    }

    remove(item: ICatalogueItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    getName(): string {
        return this.name;
    }

    createIterator(): IIterator<ICatalogueItem> {
        return new CatalogueIterator(this.items);
    }
}
