import { History } from "@prisma/client";

export type HistoryRequestResponse = {
  plant1History: Array<History>,
  plant2History: Array<History>,
}