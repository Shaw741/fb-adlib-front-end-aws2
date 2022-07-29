import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { date } from "yup";

const MyChart = (props) => {
    // console.log(props.chartData?.map((a)=>a.date))
    const option = {
      chart: {
        height: props.graphHeight,
        zoomType: "x",        
      },
      title: {
        text: "",
        align: "left",
        style: {
          fontSize: ".875rem",
          fontWeight: "bold",
          letterSpacing: "0.02em",
        },
      },
      
      subtitle: {
        text: "",
      },
      credits: {
        enabled: false,
      },
   
      xAxis: {
        visible:props.axisVisiblity,
        // type: "datetime",
        labels: {
            format: "{value:%b - %e}",
          },
        categories:props.chartData?.map((a)=>a.date)
        // categories:['2-3-2022','5-3-2022']
      },
      yAxis: {    
        visible:props.axisVisiblity,    
        title: {
          text: "",
        },
        labels: {
          formatter: function () {
            return this.value ;
          },
        },
      },
      legend: {
        enabled: props.dataBoxVisiblity,        
        align: "right",
        verticalAlign: "top",
        padding: 0,
  
        itemStyle: {
          lineHeight: "14px",
        },
      },
      plotOptions: {
        areaspline: {
          lineColor: {
            linearGradient: {
              color:
              "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
              x1: 1,
              y1: 1,
              x2: 0,
              y2: 1,
            },
          stops: [
              [0.1, "#B5EDFF"],
              [0.5, "#00CBFF"],
              [0.8, "#6721FF"],                
          ]
          },
          
        },
       
      },
     
      series: [
        {          
          type:"areaspline",// props.fillType,
          name: "No of ads",
          // data: props.chartData?.map((a)=>a.noOfCopyAds),
          lineWidth: 7,
        data:[45,56,80,34,45,56,80,95,10,89,78,89,56],
       
        datalable:{},
        lineTension: 1,
        marker: {
          enabled: false,
            fillColor: '#FFFFFF',
            lineWidth: 3,             
            lineColor: "black", // inherit from series            
            radius: 5,    
                    
        },
          color: {
            linearGradient: {
                color:
                "linear-gradient(270deg, rgba(181, 237, 255, 0.45) 0%, rgba(0, 203, 255, 0.45) 27.78%, rgba(103, 33, 255, 0.45) 104.56%)",
                x1: 1,
                y1: 1,
                x2: 0,
                y2: 1,
              },
            stops: [
              [0.1, "rgba(181, 237, 255, 0.45)"],
                [0.5, "rgba(0, 203, 255, 0.45)"],
                [0.8, "rgba(103, 33, 255, 0.45)"], 
                // [0.1, "#B5EDFF"],
                // [0.5, "#00CBFF"],
                // [0.8, "#6721FF"],                
            ]
        },
        
        tooltip: {                   
          hideDelay:"0.5",
      }
    
        //   pointInterval: 0.5,        
        },
      ],
    };
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={option}/>
      </>
    );
  };
  
  

  export default  MyChart;
  