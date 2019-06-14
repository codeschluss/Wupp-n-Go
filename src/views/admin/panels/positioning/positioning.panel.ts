import { Component } from '@angular/core';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './positioning.panel.html'
})

export class PositioningPanelComponent extends BasePanel {

  protected path: string = 'positioning';

  protected resolve: object = {};

}