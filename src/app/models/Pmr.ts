export class Pmr {
  constructor(public id: number,
              public nom: string,
              public quantite: number,
              public description: string | null,
              public point_geo: string)
  {
  }
}
