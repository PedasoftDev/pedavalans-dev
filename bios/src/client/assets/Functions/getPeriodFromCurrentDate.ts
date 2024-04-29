
const getPeriodFromCurrentDate: (currentYear: string) => { yearFrequency: string; halfYearFrequency: string; quarterFrequency: string; monthFrequency: string; } = (currentYear: string) => {
  const currentMonth = new Date().getMonth() + 1
  switch (currentMonth) {
    case 1:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 1. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Ocak Dönemi'
      }
    case 2:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 1. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Şubat Dönemi'
      }
    case 3:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 1. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Mart Dönemi'
      }
    case 4:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 1. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Nisan Dönemi'
      }
    case 5:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 2. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Mayıs Dönemi'
      }
    case 6:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 2. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Haziran Dönemi'
      }
    case 7:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 2. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Temmuz Dönemi'
      }
    case 8:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 3. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Ağustos Dönemi'
      }
    case 9:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 3. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Eylül Dönemi'
      }
    case 10:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 3. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Ekim Dönemi'
      }
    case 11:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 4. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Kasım Dönemi'
      }
    case 12:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 2. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 4. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Aralık Dönemi'
      }
    default:
      return {
        yearFrequency: currentYear + ' Yılı Dönemi',
        halfYearFrequency: currentYear + ' 1. Yarıyılı Dönemi',
        quarterFrequency: currentYear + ' 1. Çeyrekyılı Dönemi',
        monthFrequency: currentYear + ' Ocak Dönemi'
      }
  }
}

export default getPeriodFromCurrentDate