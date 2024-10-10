enum Frequency {
  Year = 'Yıl',
  HalfYear = 'Yarıyıl',
  QuarterYear = 'Çeyrekyıl',
  Month = 'Ay'
}

enum Months {
  Ocak = 1,
  Şubat,
  Mart,
  Nisan,
  Mayıs,
  Haziran,
  Temmuz,
  Ağustos,
  Eylül,
  Ekim,
  Kasım,
  Aralık
}

export default function getPeriodFromCurrentDate(currentYear: string, frequency: string): string {
  const currentMonth = new Date().getMonth() + 1;

  switch (frequency) {
    case Frequency.Year:
      return `${currentYear} Yılı Dönemi`;

    case Frequency.HalfYear:
      return currentMonth <= 6
        ? `${currentYear} 1. Yarıyılı Dönemi`
        : `${currentYear} 2. Yarıyılı Dönemi`;

    case Frequency.QuarterYear:
      if (currentMonth <= 3) {
        return `${currentYear} 1. Çeyrekyılı Dönemi`;
      } else if (currentMonth <= 6) {
        return `${currentYear} 2. Çeyrekyılı Dönemi`;
      } else if (currentMonth <= 9) {
        return `${currentYear} 3. Çeyrekyılı Dönemi`;
      } else {
        return `${currentYear} 4. Çeyrekyılı Dönemi`;
      }

    case Frequency.Month:
      return `${currentYear} ${Months[currentMonth]} Dönemi`;

    default:
      return `${currentYear} Ocak Dönemi`;
  }
}