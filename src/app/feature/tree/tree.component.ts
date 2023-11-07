import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Grade } from '../../enum/grade.enum';
import { Policy } from 'src/app/model/policy';
import { TreeService } from 'src/app/service/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
  @Input() policyholder!: Policy;
  @Input() mainCode!: string;
  @Input() level: number = 0;
  // @Input() MaxLevel: number = 4;

  grade = Grade

  constructor(private treeService: TreeService) { }

  onPositiveClick(policy: Policy) {
    this.treeService.triggerTreeAction(policy);
  }

  onBack(introducer_code: string){
    this.treeService.triggerBackLevel(introducer_code);
  }

  getGradeColor(introducer_code: string): Grade {
    // console.log('this.mainCode:',this.mainCode+', introducer_code:',introducer_code);

    if (this.policyholder.code === this.mainCode) {
      return Grade.main;
    } else {
      if (this.mainCode === introducer_code) {
        return Grade.direct;
      } else {
        return Grade.indirect;
      }
    }
  }
}
