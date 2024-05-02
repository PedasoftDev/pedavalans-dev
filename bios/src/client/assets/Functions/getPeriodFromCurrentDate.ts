export default function getPeriodFromCurrentDate(currentYear: string, frequency: string): string {
  const currentMonth = new Date().getMonth() + 1
  if (frequency === 'Yıl') {
    return currentYear + ' Yılı Dönemi'
  } else if (frequency === 'Yarıyıl') {
    if (currentMonth >= 1 && currentMonth <= 6) {
      return currentYear + ' 1. Yarıyılı Dönemi'
    } else {
      return currentYear + ' 2. Yarıyılı Dönemi'
    }
  } else if (frequency === 'Çeyrekyıl') {
    if (currentMonth >= 1 && currentMonth <= 3) {
      return currentYear + ' 1. Çeyrekyılı Dönemi'
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      return currentYear + ' 2. Çeyrekyılı Dönemi'
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      return currentYear + ' 3. Çeyrekyılı Dönemi'
    } else {
      return currentYear + ' 4. Çeyrekyılı Dönemi'
    }
  } else if (frequency === 'Ay') {
    switch (currentMonth) {
      case 1:
        return currentYear + ' Ocak Dönemi'
      case 2:
        return currentYear + ' Şubat Dönemi'
      case 3:
        return currentYear + ' Mart Dönemi'
      case 4:
        return currentYear + ' Nisan Dönemi'
      case 5:
        return currentYear + ' Mayıs Dönemi'
      case 6:
        return currentYear + ' Haziran Dönemi'
      case 7:
        return currentYear + ' Temmuz Dönemi'
      case 8:
        return currentYear + ' Ağustos Dönemi'
      case 9:
        return currentYear + ' Eylül Dönemi'
      case 10:
        return currentYear + ' Ekim Dönemi'
      case 11:
        return currentYear + ' Kasım Dönemi'
      case 12:
        return currentYear + ' Aralık Dönemi'
      default:
        return currentYear + ' Ocak Dönemi'
    }
  }
}