export class NumberUtils {
  public static areEqualToTwoDecimals(num1: number, num2: number): boolean {
    const roundedNum1 = Math.round(num1 * 100) / 100;
    const roundedNum2 = Math.round(num2 * 100) / 100;
    return roundedNum1 === roundedNum2;
  }

  public static areEqualWithMargin(
    num1: number,
    num2: number,
    margin: number = 0.0,
  ): boolean {
    const difference = Math.abs(num1 - num2);
    return difference <= margin;
  }
}
