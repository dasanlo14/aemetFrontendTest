import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { WeatherService } from '../../core/services/weather.service';
import { Municipality } from '../../models/municipality.model';
import { TomorrowPrediction } from '../../models/tomorrow-prediction.model';
import { Unit } from '../../models/enum/unit.enum';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, AfterViewInit, OnDestroy {

  search = '';
  searchSubject = new Subject<string>();
  unit: Unit = Unit.G_CEL;
  municipalities: Municipality[] = [];
  selectedMunicipality?: Municipality;

  loading = false;
  showResults = false;

  prediction?: TomorrowPrediction;

  predictionErrorMessage: string | null = null;
  municipalityErrorMessage: string | null = null;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private handleDocumentClick = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (this.searchInput
      && clickedElement !== this.searchInput.nativeElement) {
      this.showResults = false;
      this.cdr.detectChanges();
    }
  };


  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.municipalityErrorMessage= null;

      if (!value?.trim()) {
        this.municipalities = [];
        this.showResults = false;
        this.cdr.detectChanges();
        return;
      }

      this.weatherService.searchMunicipalities(value).subscribe({
        next: res => {
          this.municipalities = res;
          this.showResults = res.length > 0;
          this.cdr.detectChanges()
        },
        error: err => {
          console.error('Error buscando municipios en AEMET', err);
          this.municipalityErrorMessage =
            'Ha habido un problema con AEMET al buscar municipios. Inténtalo más tarde.';
          this.municipalities = [];
          this.showResults = false;
          this.cdr.detectChanges()
        },
      });
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.search);
  }

  selectMunicipality(m: Municipality): void {
    this.selectedMunicipality = m;
    this.prediction = undefined;
    this.predictionErrorMessage = null;
    this.municipalityErrorMessage = null;
    this.loading = true;
    this.showResults = false;
    this.search = m.name;
    this.municipalities = [];

    this.searchInput.nativeElement.blur();

    this.weatherService
      .getTomorrowPrediction(m.id, this.unit)
      .subscribe({
        next: res => {
          this.prediction = res;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Error AEMET', err);
          this.predictionErrorMessage =
            'Ha habido un problema con AEMET. Inténtalo de nuevo más tarde.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  changeUnit(unidad: Unit): void {
    this.unit = unidad;

    if (this.selectedMunicipality) {
      this.selectMunicipality(this.selectedMunicipality);
    }
  }

  getRainIcon(): string {
    if (!this.prediction || !this.prediction.precipitationProb.length) {
      return '☀️';
    }

    const total = this.prediction.precipitationProb
      .reduce((sum, p) => sum + p.probability, 0);

    const avg = total / this.prediction.precipitationProb.length;

    if (avg < 25) {
      return '☀️';
    }

    if (avg < 50) {
      return '🌥️';
    }

    if (avg < 75) {
      return '🌧️';
    }

    return '⛈️';
  }

  getPredictionDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handleDocumentClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick);
  }
}
