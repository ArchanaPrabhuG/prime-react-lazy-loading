import * as React from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { API } from './API';


interface AppProps { }
interface AppState {
  cars: never[];
  loading: boolean;
  first: number;
  rows: number;
  totalRecords: number;
}

class App extends React.Component<AppProps, AppState> {
  carservice: API;
  datasource: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      cars: [],
      loading: true,
      first: 0,
      rows: 2,
      totalRecords: 0
    };
    this.carservice = new API();
    this.onPage = this.onPage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.carservice.getCars().then((data) => {
        this.datasource = data;
        this.setState({
          totalRecords: data.length,
          cars: this.datasource.slice(0, this.state.rows),
          loading: false
        });
      });
    }, 1000);
  }

  onPage(event: { first: number; }) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = event.first + this.state.rows;

      this.setState({
        first: startIndex,
        cars: this.datasource.slice(startIndex, endIndex),
        loading: false
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <DataTable
          value={this.state.cars}
          paginator={true}
          rows={this.state.rows}
          totalRecords={this.state.totalRecords}
          lazy={true}
          first={this.state.first}
          onPage={this.onPage}
          loading={this.state.loading}>

          <Column field="year" header="Year" />
          <Column field="brand" header="Brand" />
          <Column field="color" header="Color" />
        </DataTable>
      </div>
    );
  }
}
export default App;