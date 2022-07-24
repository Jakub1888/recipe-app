import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() config: any;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {
    console.log(this.config);
  }
}