import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import axios from 'axios';

export interface PeriodicElement {
  userId: number;
  id: number;
  title: string
  completed: boolean;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }
];

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  ngOnInit() {
    this.elementData();
  }
  
  async elementData() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    data.forEach((e: PeriodicElement) => {
      this.dataSource.data.push(e);
    });
    this.table.renderRows();
  }

  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
