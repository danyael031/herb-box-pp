import { NextRequest, NextResponse } from "next/server";
import SerialPortWrapper from "@/lib/serial/SerialPort";

let serialPort: SerialPortWrapper | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command, port = "/dev/ttyUSB0", baudRate = 9600, timeoutMs = 5000 } = body;

    if (!command) {
      return NextResponse.json({ error: "Command is required" }, { status: 400 });
    }

    if (!serialPort?.connected) {
      serialPort = new SerialPortWrapper();
      await serialPort.connect(port, baudRate);
    }

    const response = await serialPort.sendCommand(command, timeoutMs);

    return NextResponse.json({ response });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (serialPort) {
      await serialPort.disconnect();
      serialPort = null;
    }
    return NextResponse.json({ message: "Disconnected" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    connected: serialPort?.connected ?? false,
    queueSize: serialPort?.queueSize ?? 0,
    pending: serialPort?.pending ?? 0,
  });
}
