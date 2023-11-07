import { Component, Input } from '@angular/core';
import { Grade } from '../../enum/grade.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() grade: Grade = Grade.main;
  @Input() name: string = '';
  @Input() policyNumber: string = '';

}
