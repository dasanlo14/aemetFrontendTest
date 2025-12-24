import { PrecipitationProb } from './precipitation-prob.model';

export interface TomorrowPrediction {
  averageTemperature: number;
  unitTemperature: string;
  precipitationProb: PrecipitationProb[];
}
