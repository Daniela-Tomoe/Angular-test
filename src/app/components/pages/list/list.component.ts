import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { IBusiness } from 'src/app/IBusiness';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  business: IBusiness[] = []

  searchModel!: any

  search(): void {
    console.log(this.searchModel)
  }
}
