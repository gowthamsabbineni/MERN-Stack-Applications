// Step 1 - Include react
import React from 'react';
import axios from 'axios';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Doughnut3D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Doughnut3D, FusionTheme);
const chartConfigs = {
    type: 'doughnut3d',// The chart type
    width: '500', // Width of the chart
    height: '300', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Employees Summary",
            "subCaption": "",
            "numberSuffix": "",
            "theme": "fusion",
            "palettecolors": "7fcc66,b3b300,5D6D7E,0059b3"
        },
        // Chart Data
        "data": []
    }
};

// Step 9 - Creating the DOM element to pass the react-fusioncharts component
class employeeSummary extends React.Component {
    state = {
        chartData: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:8080/employees/')
            .then(resp => {
                if (resp.data.length > 0) {
                    this.prepareChartData(resp.data);
                }
            })
    }
    prepareChartData = (employeesArr) => {
        const arr = { "Admins": 0, "Managers": 0, "Developers": 0, "Testers":0 };
        for (var i = 0; i < employeesArr.length; i++) {
            if (employeesArr[i].role === "admin") {
                arr.Admins = arr.Admins + 1;
            }
            else if (employeesArr[i].role === "manager") {
                arr.Managers = arr.Managers + 1;
            }
            else if(employeesArr[i].role === "developer"){
                arr.Developers = arr.Developers + 1;
            }
            else {
                arr.Testers = arr.Testers + 1;
            }
        }
        const chartData = Object.keys(arr).map(function (key) {
            const obj = {}
            obj.label = key;
            obj.value = arr[key];
            return(obj);
        });
        
        this.setState({
            chartData:chartData
        })
    }
    render() {
        chartConfigs.dataSource.data = this.state.chartData;
        return (
            <ReactFC
                {...chartConfigs} 
            />
        );
    }
}
export default employeeSummary