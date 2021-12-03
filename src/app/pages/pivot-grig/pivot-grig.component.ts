import { Component, AfterViewInit } from "@angular/core";
import PivotGridDataSource from "devextreme/ui/pivot_grid/data_source";
import { Service, Sale } from "../../shared/services/pivot-grig.service";
import { formatDate } from "devextreme/localization";

@Component({
  selector: 'app-pivot-grig',
  templateUrl: './pivot-grig.component.html',
  styleUrls: ['./pivot-grig.component.scss']
})
export class PivotGrigComponent implements AfterViewInit{
  sales: Sale[] = [];

  dataSource: PivotGridDataSource;

  constructor(service: Service) {
    this.dataSource = new PivotGridDataSource({
      store: service.getSales(),
      fields: [
        {
          caption: "Region",
          width: 120,
          dataField: "region",
          area: "row"
        },
        {
          caption: "City",
          dataField: "city",
          width: 150,
          area: "row",
          selector: this.citySelector
        },
        {
          groupName: "mydate",
          area: "column",
          caption: "mydate"
        },
        {
          caption: "dateYear",
          area: "column",
          dataField: "date",
          dataType: "date",
          groupInterval: "year",
          groupName: "mydate",
          groupIndex: 0
        },
        {
          caption: "dateMonth",
          area: "column",
          dataField: "date",
          dataType: "date",
          groupInterval: "month",
          groupName: "mydate",
          groupIndex: 1
        },
        {
          caption: "dateDay",
          format: "EE dd",
          area: "column",
          dataField: "date",
          dataType: "date",
          groupName: "mydate",
          groupIndex: 2,
          selector: function (data: any) {
            return formatDate(new Date(data.date), "EE dd");
          },
          sortingMethod: function (a, b) {
            const day1 = (a?.value && typeof(a.value)==="string") ? parseInt( a.value.substring(4), 10) : a.value;
            const day2 = (b?.value && typeof(b.value)==="string")? parseInt(b.value.substring(4), 10) : b.value;
            if (day1 === day2) return 0;
            if (day1 && day2)
            return day1 > day2 ? 1 : -1;
            return 1;
          }
        },
        {
          caption: "Sales",
          dataField: "amount",
          dataType: "number",
          summaryType: "sum",
          format: "currency",
          area: "data"
        }
      ]
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    this.dataSource.field("mydate", {
      filterValues: [[2013, 1, "Thu 17"]],
      filterType: "include"
    });
    this.dataSource.load();
    // });
  }

  click = (e: any) => {
    this.dataSource.field("mydate", {
      filterValues: [[2013, 1, "Thu 17"]],
      filterType: "include"
    });
    this.dataSource.load();
  };

  citySelector(data: any) {
    return `${data.city} (${data.country})`;
  }
}
