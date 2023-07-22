export class NationalCodeHelper {
  static isValidIranianNationalId = (nationalId: string): boolean => {
    if (!/^\d{10}$/.test(nationalId)) {
      return false;
    }

    const check = parseInt(nationalId[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalId[i]) * (10 - i);
    }
    sum %= 11;

    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
  };
}
