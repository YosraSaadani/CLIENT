import { Doctor } from "./doctor";

export class Calendrier 
{
    constructor(
   public doctor: string,
 public date: Date,
  public availability: { time: number, isAvailable: boolean }[])
  {

  }
}
