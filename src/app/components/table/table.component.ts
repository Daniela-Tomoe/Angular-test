import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/enviroment';
import { IBusiness } from 'src/app/IBusiness';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  business: IBusiness[] = []

  constructor (
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.tableService.getAllData().subscribe(items => {
      this.business = items
    })
  }

  displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'details']
}
