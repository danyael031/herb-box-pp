import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import PromiseQueue from "../queue";

export interface SerialPortWrapperOptions {
  delimiter?: string;
}

export class SerialPortWrapper {
  private port: SerialPort | null = null;
  private parser: ReadlineParser | null = null;
  private queue: PromiseQueue;
  private delimiter: string;
  private isConnected = false;

  constructor(options: SerialPortWrapperOptions = {}) {
    this.queue = new PromiseQueue(1);
    this.delimiter = options.delimiter ?? "\n";
  }

  async connect(portPath: string, baudRate: number = 9600): Promise<void> {
    if (this.isConnected) {
      throw new Error("Already connected");
    }

    this.port = new SerialPort({
      path: portPath,
      baudRate,
    });

    this.parser = this.port.pipe(new ReadlineParser({ delimiter: this.delimiter }));

    return new Promise((resolve, reject) => {
      this.port!.open((err) => {
        if (err) {
          reject(err);
          return;
        }
        this.isConnected = true;
        resolve();
      });
    });
  }

  async sendCommand(command: string, timeoutMs = 5000): Promise<string> {
    if (!this.isConnected || !this.port || !this.parser) {
      throw new Error("Not connected");
    }

    return this.queue.enqueue(async () => {
      return this.executeCommand(command, timeoutMs);
    });
  }

  private executeCommand(command: string, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: string[] = [];

      const onData = (data: string) => {
        chunks.push(data);
        this.parser!.off("data", onData);
        clearTimeout(timeout);

        const response = chunks.join("");
        resolve(response);
      };

      const timeout = setTimeout(() => {
        this.parser!.off("data", onData);
        reject(new Error(`Timeout waiting for response after ${timeoutMs}ms`));
      }, timeoutMs);

      this.parser!.on("data", onData);

      this.port!.write(command + "\n", (err) => {
        if (err) {
          clearTimeout(timeout);
          reject(err);
        }
      });
    });
  }

  get connected(): boolean {
    return this.isConnected;
  }

  get queueSize(): number {
    return this.queue.size;
  }

  get pending(): number {
    return this.queue.pending;
  }

  async disconnect(): Promise<void> {
    if (!this.port || !this.isConnected) {
      return;
    }

    return new Promise((resolve, reject) => {
      this.port!.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        this.isConnected = false;
        this.port = null;
        this.parser = null;
        resolve();
      });
    });
  }
}

export default SerialPortWrapper;
