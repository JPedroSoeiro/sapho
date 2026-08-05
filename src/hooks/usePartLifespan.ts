import { useMemo } from 'react';
import { HelicopterPart, PartWithCalculatedLifespan } from '@/types/part';

export function usePartLifespan(parts: HelicopterPart[]): PartWithCalculatedLifespan[] {
  return useMemo(() => {
    const today = new Date();

    return parts.map((part) => {
      const daysUsed = Math.floor((today.getTime() - part.installDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = part.maxLifespanDays - daysUsed;
      const hoursRemaining = part.maxFlightHoursTBO - part.currentFlightHours;

      const calendarPercentage = (daysUsed / part.maxLifespanDays) * 100;
      const hoursPercentage = (part.currentFlightHours / part.maxFlightHoursTBO) * 100;

      const maxPercentage = Math.max(calendarPercentage, hoursPercentage);

      let criticalityLevel: 'healthy' | 'alert' | 'critical' = 'healthy';

      if (maxPercentage >= 95 || daysRemaining <= 0 || hoursRemaining <= 0) {
        criticalityLevel = 'critical';
      } else if (maxPercentage >= 80 || daysRemaining <= 90 || hoursRemaining <= 200) {
        criticalityLevel = 'alert';
      }

      return {
        ...part,
        daysUsed,
        daysRemaining,
        hoursRemaining,
        calendarPercentage,
        hoursPercentage,
        criticalityLevel,
      };
    });
  }, [parts]);
}
