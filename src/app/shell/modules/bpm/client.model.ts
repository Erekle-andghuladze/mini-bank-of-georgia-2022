export class Client {
  clientKey: number;
  firstName: string;
  image: string;
  lastName: string;
  plus: number;
  sumAmount: number;

  constructor(
    clientKey: number,
    firstName: string,
    image: string,
    lastName: string,
    plus: number,
    sumAmount: number,
  ) {
    this.clientKey = clientKey;
    this.firstName = firstName;
    this.image = image;
    this.lastName = lastName;
    this.plus = plus;
    this.sumAmount = sumAmount;
  }
  }
