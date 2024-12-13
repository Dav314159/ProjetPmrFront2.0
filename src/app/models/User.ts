export class User {
  public currentPassword !: string;
  public currentUsername !: string;

  constructor(public id: number,
              public username: string,
              public password: string,
              public nom: string,
              public prenom: string,
              public mail: string) {
  }
}
