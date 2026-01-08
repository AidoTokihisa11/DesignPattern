export interface IIterator<T> {
    hasNext(): boolean;
    next(): T | null;
}
