export interface Wages {
  dailyWorkingHours: number;
  daysAWeek: number;
  weeklyWorkingHours: number;
  weeksInAYear: number;
  monthlyWage: number;
  weeklyWage: number;
  dailyWage: number;
  annualWage: number;
}

////////////
// Annual //
////////////
export function annualWageToHourlyWage({ annualWage, weeksInAYear, weeklyWorkingHours }: Wages): number {
  if (annualWage <= 0) {
    return 0;
  }
  try {
    return annualWage / weeksInAYear / weeklyWorkingHours;
  } catch {
    return 0;
  }
}
export function annualWageToMonthlyWage({ annualWage }: Wages): number {
  if (annualWage <= 0) {
    return 0;
  }
  try {
    return annualWage / 12;
  } catch {
    return 0;
  }
}
export function annualWageToWeeklyWage({ annualWage, weeksInAYear }: Wages): number {
  if (annualWage <= 0) {
    return 0;
  }
  try {
    return annualWage / weeksInAYear;
  } catch {
    return 0;
  }
}
export function annualWageToDailyWage({ annualWage, weeksInAYear, daysAWeek }: Wages): number {
  if (annualWage <= 0) {
    return 0;
  }
  try {
    return annualWage / weeksInAYear / daysAWeek;
  } catch {
    return 0;
  }
}

/////////////
// Monthly //
/////////////
export function monthlyWageToHourlyWage({ monthlyWage, weeksInAYear, weeklyWorkingHours }: Wages): number {
  if (monthlyWage <= 0) {
    return 0;
  }
  try {
    return (monthlyWage * 12) / weeksInAYear / weeklyWorkingHours;
  } catch {
    return 0;
  }
}
export function monthlyWageToDailyWage({ monthlyWage, weeksInAYear, daysAWeek }: Wages): number {
  if (monthlyWage <= 0) {
    return 0;
  }
  try {
    return (monthlyWage * 12) / weeksInAYear / daysAWeek;
  } catch {
    return 0;
  }
}
export function monthlyWageToWeeklyWage({ monthlyWage, weeksInAYear }: Wages): number {
  if (monthlyWage <= 0) {
    return 0;
  }
  try {
    return (monthlyWage * 12) / weeksInAYear;
  } catch {
    return 0;
  }
}
export function monthlyWageToAnnualWage({ monthlyWage }: Wages): number {
  if (monthlyWage <= 0) {
    return 0;
  }
  try {
    return monthlyWage * 12;
  } catch {
    return 0;
  }
}

////////////
// Weekly //
////////////
export function weeklyWageToHourlyWage({ weeklyWage, weeklyWorkingHours }: Wages): number {
  if (weeklyWage <= 0) {
    return 0;
  }
  try {
    return weeklyWage / weeklyWorkingHours;
  } catch {
    return 0;
  }
}
export function weeklyWageToDailyWage({ weeklyWage, daysAWeek }: Wages): number {
  if (weeklyWage <= 0) {
    return 0;
  }
  try {
    return weeklyWage / daysAWeek;
  } catch {
    return 0;
  }
}
export function weeklyWageToMonthlyWage({ weeklyWage, weeksInAYear }: Wages): number {
  if (weeklyWage <= 0) {
    return 0;
  }
  try {
    return (weeklyWage * weeksInAYear) / 12;
  } catch {
    return 0;
  }
}
export function weeklyWageToAnnualWage({ weeklyWage, weeksInAYear }: Wages): number {
  if (weeklyWage <= 0) {
    return 0;
  }
  try {
    return weeklyWage * weeksInAYear;
  } catch {
    return 0;
  }
}

///////////
// Daily //
///////////
export function dailyWageToHourlyWage({ dailyWage, dailyWorkingHours }: Wages): number {
  if (dailyWage <= 0) {
    return 0;
  }
  try {
    return dailyWage / dailyWorkingHours;
  } catch {
    return 0;
  }
}
export function dailyWageToWeeklyWage({ dailyWage, daysAWeek }: Wages): number {
  if (dailyWage <= 0) {
    return 0;
  }
  try {
    return dailyWage * daysAWeek;
  } catch {
    return 0;
  }
}
export function dailyWageToMonthlyWage({ dailyWage, daysAWeek, weeksInAYear }: Wages): number {
  if (dailyWage <= 0) {
    return 0;
  }
  try {
    return (dailyWage * daysAWeek * weeksInAYear) / 12;
  } catch {
    return 0;
  }
}
export function dailyWageToAnnualWage({ dailyWage, daysAWeek, weeksInAYear }: Wages): number {
  if (dailyWage <= 0) {
    return 0;
  }
  try {
    return dailyWage * daysAWeek * weeksInAYear;
  } catch {
    return 0;
  }
}
