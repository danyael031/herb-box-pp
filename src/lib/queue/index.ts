type PromiseGenerator<T = unknown> = () => Promise<T>;

interface QueueItem<T> {
  promiseGenerator: PromiseGenerator<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
}

class PromiseQueue {
  private queue: QueueItem<unknown>[] = [];
  private pendingPromises = 0;
  private maxConcurrent: number;

  constructor(maxConcurrent = Infinity) {
    this.maxConcurrent = maxConcurrent;
  }

  enqueue<T>(promiseGenerator: PromiseGenerator<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ promiseGenerator, resolve, reject } as QueueItem<unknown>);
      this._dequeue();
    });
  }

  private async _dequeue(): Promise<void> {
    if (this.pendingPromises >= this.maxConcurrent) {
      return;
    }

    if (this.queue.length === 0) {
      return;
    }

    this.pendingPromises++;

    const item = this.queue.shift() as QueueItem<unknown> | undefined;
    if (!item) return;

    const { promiseGenerator } = item as QueueItem<unknown>;

    try {
      const result = await promiseGenerator();
      (item.resolve as (value: unknown) => void)(result);
    } catch (error) {
      item.reject(error);
    } finally {
      this.pendingPromises--;
      this._dequeue();
    }
  }

  public get size(): number {
    return this.queue.length;
  }

  public get pending(): number {
    return this.pendingPromises;
  }
}

export default PromiseQueue;
