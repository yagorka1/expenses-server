export interface RateInterface {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}
