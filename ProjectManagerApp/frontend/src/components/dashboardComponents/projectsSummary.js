// Step 1 - Include react
import React from 'react';
import axios from 'axios';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Pie2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme);
const chartConfigs = {
    type: 'pie2d',// The chart type
    width: '500', // Width of the chart
    height: '300', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Projects Summary",
            "numberSuffix": "",
            "theme": "fusion",
            "palettecolors": "DA2641,DCC709,7300e6",
            "pieRadius":"80"
            
        },
        // Chart Data
        "data": []
    }
};

// Step 9 - Creating the DOM element to pass the react-fusioncharts component
class projectsChart extends React.Component {
    state = {
        chartData: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:8080/projects/')
            .then(resp => {
                if (resp.data.length > 0) {
                    this.prepareChartData(resp.data);
                }
            })
    }
    prepareChartData = (projectsArr) => {
        const arr = { "Active": 0, "onHold": 0, "Completed": 0 };
        for (var i = 0; i < projectsArr.length; i++) {
            if (projectsArr[i].status === "active") {
                arr.Active = arr.Active + 1;
            }
            else if (projectsArr[i].status === "completed") {
                arr.Completed = arr.Completed + 1;
            }
            else {
                arr.onHold = arr.onHold + 1;
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
export default projectsChart