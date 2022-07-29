// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import { date } from "yup";
// import { Grid } from "@material-ui/core";

// const MyChart = (props) => {
//     // console.log(props.chartData?.map((a)=>a.date))
//     const option = {
//       chart: {
//         height: props.graphHeight,              
//         zoomType: "x",        
//       },
//       title: {
//         text: "",
//         align: "left",
//         style: {
//           fontSize: ".875rem",
//           fontWeight: "bold",
//           letterSpacing: "0.02em",
//         },
//       },
//       subtitle: {
//         text: "",
//       },
//       credits: {
//         enabled: false,
//       },
   
//       xAxis: {
//         visible:props.axisVisiblity,
//         // type: "datetime",
//         // labels: {
//         //     format: "{value:%b - %e}",
//         //   },
//         categories:props.chartData?.map((a)=>a.date)
//         // categories:[1,2,3,4,5,6,7,8,9,10,11,12,131,14,15,16,17,18,19],
//         // categories:['2-3-2022','5-3-2022']
//       },
//       yAxis: {    
//         visible:props.axisVisiblity,    
//         // categories:props.chartData?.map((a)=>a.noOfCopyAds),
//         title: {
//           text: "",
//         },
//         labels: {
//           formatter: function () {
//             return this.value ;
//           },
//         },
//       },
//       legend: {
//         enabled: props.dataBoxVisiblity,        
//         align: "right",
//         verticalAlign: "top",
//         padding: 0,
  
//         itemStyle: {
//           lineHeight: "14px",
//         },
//       },
//       plotOptions: {
//         area: {
//           fillColor: {
//             linearGradient: {
//               color:
//               "linear-gradient(360deg, rgba(181, 237, 255, 0.3) 0.17%, rgba(0, 203, 255, 0.6) 28.76%, rgba(103, 33, 255, 0.8) 85.95%)",
//               x1: 0,
//               y1: 0,
//               x2: 0,
//               y2: 1,
//             },
//             stops: [
//                 [0.3, "rgba(103, 33, 255, 0.8 )"],
//                 [0.6, "rgba(0, 203, 255, 0.4)"],
//                 [0.8, "rgba(181, 237, 255, 0.3)"],
//             ],
//           },
  
//           lineWidth: 6,
//         //   color:"white",
//         //   lineTension: 0.2,
//           states: {
//             hover: {
//               lineWidth: 6,
//             },
//           },
//           threshold: null,
//         },      
//       },
   
//       series: [
//         {
//           type: props.fillType,
//           name: "No of ads",
//           data: props.chartData?.map((a)=>a.noOfCopyAds),
//         // data:[1,2,3,4,5,6,7,8,9,10,11,12,131,14,15,16,17,18,19],
//         //   color: "blue",
//         lineWidth: 5,
//         datalable:{},
//         // lineTension: 1,
//         marker: {
//             fillColor: '#FFFFFF',
//             lineWidth: 3,            
//             lineColor: "black", // inherit from series            
//             radius: 5,            
//         },
//           color: {
//             linearGradient: {
//                 color:
//                 "linear-gradient(360deg, rgba(181, 237, 255, 0.3) 0.17%, rgba(0, 203, 255, 0.6) 28.76%, rgba(103, 33, 255, 0.8) 85.95%)",
//                 x1: 1,
//                 y1: 1,
//                 x2: 0,
//                 y2: 1,
//               },
//             stops: [
//                 [0.3, "rgba(181, 237, 255, 0.3)"],
//                 [0.6, "rgba(0, 203, 255, 0.6)"],
//                 [0.8, "rgba(103, 33, 255, 0.8)"],
//             ]
//         },
//         tooltip: {
//           // nullFormat: 'Value is not available.',
//           // backgroundColor: '#fff',
//           hideDelay:"0.5",
//       },
//         //   series: {
//         //     color: 'yellow'
//         // }
//         //   pointStart: Date.UTC(2010, 0, 1),
//         pointInterval: 1,        
//         },
//       ],
//     };
//     return (
//       // <Grid container>
//       //   <Grid item>
//         <HighchartsReact highcharts={Highcharts} options={option}/>
//       //   </Grid>
//       // </Grid>
//     );
//   };
  
  

//   export default  MyChart;
  