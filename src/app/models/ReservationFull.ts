import {Pmr} from "./Pmr";
import {User} from "./User";

export class ReservationFull {
  constructor(public utilisateur: User,
              public pmr: Pmr,
              public reservation: number,
  )
  {
  }
}
