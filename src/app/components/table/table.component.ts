import { Component } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IBusiness } from 'src/app/IBusiness';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dataSource = new MatTableDataSource<IBusiness>();
  displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'details'];
  filterValue = '';

  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.tableService.getAllData().subscribe(items => {
      this.dataSource.data = items;
    })
  }

  formatCurrency(value: number): string {
    if (isNaN(value)) return '';

    return 'R$ ' + value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'business':
          return this.compare(a.business, b.business, isAsc);
        case 'valuation':
          return this.compare(a.valuation, b.valuation, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = sortedData;
  }

  compare(a: any, b: any, isAsc: boolean) {
    if (a == null || a === undefined) {
      return isAsc ? -1 : 1;
    }
    if (b == null || b === undefined) {
      return isAsc ? 1 : -1;
    }

    if (typeof a === 'string' && typeof b === 'string') {
      return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
    }

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}