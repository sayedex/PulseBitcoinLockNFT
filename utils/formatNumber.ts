export function formatNumber(value: number): string {
    if (value < 1000) {
        return Math.floor(value).toString();
    } else if (value < 1000000) {
      const num = value / 1000;
      const suffix = num.toFixed(1) + "k";
      return suffix;
    } else {
      const num = value / 1000000;
      const suffix =  num.toFixed(1) + "m";
      return suffix;
    }
  }