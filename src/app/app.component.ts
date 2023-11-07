import { Policy } from 'src/app/model/policy';
import { Grade } from './enum/grade.enum';
import { Component, OnInit } from '@angular/core';
import { PolicyHolderService } from './service/policy-holder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeService } from './service/tree.service';
interface TreeNode {
  name: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'green-policy';
  grade = Grade;
  OriPolicyHolder!: Policy;
  policyholder!: Policy;
  code: string = '';
  validateForm!: FormGroup;
  constructor(
    private policyholderService: PolicyHolderService,
    private fb: FormBuilder,
    private treeService: TreeService
  ) {
    this.treeService.treeAction$.subscribe((data) => {
      console.log('onClick', data);
      this.policyholder = data;
    })
    this.treeService.backLevel$.subscribe((data) => {
      console.log('backLevel', data);
      const mainCodeObject = this.findObjectByValue(this.OriPolicyHolder, 'code', data);
      console.log('mainCodeObject', mainCodeObject);
      if (mainCodeObject) {
        this.policyholder = mainCodeObject;
      } else {
        alert('無上層資料')
      }

    })

  }

  ngOnInit() {
    this.initForm();
    this.searchPolicyholder();
  }

  private initForm() {
    this.validateForm = this.fb.group({
      code: ['', [Validators.required]]
    })
  }

  /**
   * dirty 整個表單
   */
  private isFormValid(): boolean {
    for (const i in this.validateForm.controls) {
      if (i) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) { return false; }
    return true;
  }

  findObjectByValue(obj: any, key: string, value: string): any {
    // 如果物件本身就匹配，直接返回
    if (obj[key] === value) {
      return obj;
    }

    // 遍歷物件的所有屬性
    for (let prop in obj) {
      // 檢查屬性是否為物件
      if (obj[prop] !== null && typeof (obj[prop]) === 'object') {
        // 遞迴搜索
        let result = this.findObjectByValue(obj[prop], key, value);
        // 如果找到匹配的物件，返回結果
        if (result) {
          return result;
        }
      }
    }

    // 如果沒有找到，返回 null
    return null;
  }


  searchPolicyholder(): void {
    // if (this.isFormValid()) {
    this.policyholderService.getPolicyholder(this.code).subscribe((data) => {
      if (data) {
        this.OriPolicyHolder = data as Policy;
        this.policyholder = this.OriPolicyHolder;
      }
    })
    // } else {
    //   alert('保單號碼為必填欄位');
    // }
  }
}
