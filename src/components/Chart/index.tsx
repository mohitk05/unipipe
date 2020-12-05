import * as React from "react";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'


const Chart = (value: any) => {
    const { captions, data } = JSON.parse(value.data)
    return <RadarChart
        captions={captions}
        data={data}
        size={450}
    />

}

export default Chart;
