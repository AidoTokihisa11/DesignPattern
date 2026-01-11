export interface IObserver<T = unknown> {
    update(data: T): void;
}
