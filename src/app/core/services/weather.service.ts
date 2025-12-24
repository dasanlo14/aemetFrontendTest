import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipality } from '../../models/municipality.model';
import { TomorrowPrediction } from '../../models/tomorrow-prediction.model';
import { Unit } from '../../models/enum/unit.enum';

@Injectable({ providedIn: 'root' })
export class WeatherService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  searchMunicipalities(name?: string): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(
      `${this.baseUrl}/municipalities/search`,
      { params: name ? { name } : {} }
    );
  }

  getTomorrowPrediction(municipalityId: string, unit: Unit) {
    return this.http.get<TomorrowPrediction>(
      `${this.baseUrl}/prediction/${municipalityId}/tomorrow`,
      { params: { unit } }
    );
  }
}
