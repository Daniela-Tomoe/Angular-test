import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sort } from '@angular/material/sort';

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
  sortedData: IBusiness[]

  constructor (
    private tableService: TableService
  ) {
    this.sortedData = this.business.slice()
  }

  ngOnInit() {
    this.tableService.getAllData().subscribe(items => {
      this.business = items
    })
  }

  displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'details']
  
  formatCurrency(value: number): string {
    if (isNaN(value)) return '';

    return 'R$ ' + value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    })
  }

  sortData(sort: Sort) {
    const data = this.business.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data
      return
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'business':
          return this.compare(a.business, b.business, isAsc);
        case 'valuation':
          return this.compare(a.valuation, b.valuation, isAsc)
        default:
          return 0;
      }
    })
  }

  compare(a:string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
