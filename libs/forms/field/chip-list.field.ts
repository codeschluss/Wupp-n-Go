import { COMMA, ENTER, SEMICOLON, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent } from '@angular/material';
import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <mat-chip-list #chips>
      <ng-container *ngFor="let model of value" ngProjectAs="mat-chip">
        <mat-chip [selectable]="false" (removed)="delete(model)">
          {{ toLabel(model) }}
          <span matChipRemove>&times;</span>
        </mat-chip>
      </ng-container>
      <input #input
        [formControl]="search"
        [matAutocomplete]="auto"
        [matChipInputFor]="chips"
        [matChipInputSeparatorKeyCodes]="keys"
        (matChipInputTokenEnd)="insert($event)">
    </mat-chip-list>

    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="select($event)">
      <ng-container *ngFor="let model of options | async">
        <mat-option [value]="model.id">
          {{ toLabel(model) }}
        </mat-option>
      </ng-container>
    </mat-autocomplete>
  `)
})

export class ChipListFieldComponent extends BaseFieldComponent {

  @ViewChild(MatAutocompleteTrigger)
  public autocomplete: MatAutocompleteTrigger;

  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  public keys: number[] = [COMMA, ENTER, SEMICOLON, SPACE];

  public search: FormControl = new FormControl();

  public options: Observable<CrudModel[]>;

  public delete(model: CrudModel): void {
    this.value = this.value.filter((mod) => mod !== model);
  }

  public insert(event: MatChipInputEvent): void {
    const label = this.sanitize(event.value);
    if (label.length >= 3 && !this.find(label)) {
      this.value = this.value.concat(this.find(label, this.field.options) ||
        Object.assign(new this.field.model(), { [this.field.label]: label }));
    }
  }

  public select(event: MatAutocompleteSelectedEvent): void {
    if (!this.value.some((model) => model.id === event.option.value)) {
      this.value = this.value.concat(this.toModel(event.option.value));
    }
  }

  protected ngPostInit(): void {
    if (!this.value) { this.value = []; }
    this.group.get(this.field.name).valueChanges.subscribe(() => this.clear());
    this.options = this.search.valueChanges
      .pipe(startWith(''), map((label) => this.optionalize(label)));
  }

  private clear(): void {
    this.input.nativeElement.value = '';
    this.search.setValue('');
  }

  private find(label: string = '', models = this.value): CrudModel {
    return label && models.find((model) => this.toLabel(model)
      .localeCompare(label, undefined, { sensitivity: 'accent' }) === 0);
  }

  private matches(label: string = '', models = this.value): CrudModel[] {
    const regex = new RegExp(label, 'i');
    return models.filter((model) => this.toLabel(model).search(regex) !== -1);
  }

  private optionalize(label: string = '', models = this.value): CrudModel[] {
    const ids = models.map((model) => model.id);
    const opts = this.field.options.filter((model) => !ids.includes(model.id));
    return label ? this.matches(label, opts) : opts;
  }

  private sanitize(label: string = ''): string {
    // TODO: sanetize
    return label[0].toUpperCase() + label.substr(1).toLowerCase();
  }

}
