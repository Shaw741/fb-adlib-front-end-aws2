import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const MyChart = (props) => {
  // const dateobj = Array(30).fill(0);
  const option = {
    chart: {
      height: props.graphHeight,
      zoomType: "x",
      spacingLeft: 0,
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
      maxPadding:0,
      gridLineWidth: 1,
      showEmpty: false,
      visible: props.axisVisiblity,
      // type: "datetime",
      labels: {
        format: "{value:%b - %e}",
      },
      categories: [...props.chartData?.map((a) => a.date)].slice(-30),
    },
    yAxis: {
      gridLineWidth: 0,
      visible: props.axisVisiblity,
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return this.value;
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
        lineColor:"rgba(0, 203, 255, 1)",// "#164AFF",
        // lineColor: {
        //   linearGradient: {
        //     // color:
        //     // "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
        //     x1: 1,
        //     y1: 1,
        //     x2: 0,
        //     y2: 1,
        //   },
        // stops: [
        //     [0.1, "#B5EDFF"],
        //     [0.5, "#00CBFF"],
        //     [0.8, "#6721FF"],
        // ]
        // },
      },
    },

    series: [
      {
        type: "areaspline", // props.fillType,
        name: "No of ads",
        // data: [...props.chartData?.map((a) => a.noOfCopyAds)].slice(-30),
        data:[23,46,3,45,34,12,67,24,56,45,6],
        lineWidth: 6,
        // lineTension: 1,
        marker: {
          enabled: false,
          fillColor: "  #FFFFFF",
          lineWidth: 3,
          lineColor: "black", // inherit from series
          radius: 5,
        },        
        color: {
          linearGradient: {
            color:"linear-gradient(180deg, rgba(0, 203, 255, 0.8) 0%, rgba(0, 203, 255, 0) 100%)",
              // "linear-gradient(180deg, rgba(181, 237, 255, 0.5) 7.32%, rgba(0, 203, 255, 0.5) 32.15%, rgba(103, 33, 255, 0.5) 100.8%)",
            x1: 1,
            y1: 0,
            x2: 1,
            y2: 1,
          },
          stops: [
            [0, "rgba(181, 237, 255, 0.5)"],
            [1, "rgba(0, 203, 255, 0)"],
            
            // [0.07, "rgba(181, 237, 255, 0.5)"],
            // [0.32, "rgba(0, 203, 255, 0.5)"],
            // [0.97, "rgba(103, 33, 255, 0.5)"],
          
          ],
        },

        tooltip: {
          hideDelay: "0.5",
        },
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </>
  );
};

export default MyChart;
