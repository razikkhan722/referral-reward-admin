import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutChart = () => {
    // console.log('DonutChartData: ', DonutChartData);

    //   const weeklyData = DonutChartData?.week?.data || [];

    //   // Extract data for Monthly and Weekly datasets
    //   const weekValue = weeklyData?.map((item) =>
    //     parseInt(item?.daily_total_sales, 10)
    //   );

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'pie',
                    height: 300,
                    backgroundColor: 'transparent',
                    //   spacing: [0, 0, 0, 0],
                    custom: {},
                    events: {
                        render() {
                            const chart = this,
                                series = chart.series[0];
                            let customLabel = chart.options.chart.custom.label;

                            if (!customLabel) {
                                customLabel = chart.options.chart.custom.label =
                                    chart.renderer.label(
                                        `<div style="text-align: center;">
                                    <span style="font-size: 22px; font-weight: bold;">96,715,28</span><br/>
                                    <span style="font-size: 14px; color: grey;">weekly visits</span>
                                </div>`, 0,
                                        0,
                                        'html'
                                    )
                                        .add();
                            }

                            const x = series.center[0] + chart.plotLeft - (customLabel.getBBox().width / 2);
                            const y = series.center[1] + chart.plotTop - (customLabel.getBBox().height / 2);

                            customLabel.attr({ x,  y });
                        }
                    }
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                    pointFormat: ''
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        innerSize: '70%',
                        size: '100%',
                        borderWidth: 6,
                        borderRadius: 8,
                        borderColor: '#D2F1F9',
                        dataLabels: { enabled: false },
                        allowPointSelect: false,
                        startAngle: 0,
                        endAngle: 360,
                        slicedOffset: 0,
                    }
                },
                colors: ['#FF741F', '#B399FF', '#B5D35B', '#FCF45F'], // ✅ custom colors

                series: [{
                    name: 'Registrations',
                    colorByPoint: true,
                    data: [{
                        name: 'Purchases',
                        y: 12.6
                    }, {
                        name: 'Signups',
                        y: 20.6
                    }, {
                        name: 'Milestones',
                        y: 12.0
                    }, {
                        name: 'Referrals',
                        y: 30.4
                    }]
                }]
            });
        }
    }, []);

    return (
        <div className="highcharts-figure">
            <div ref={chartRef} className='donutChart-style' id="container"></div>
            {/* <div className='text-dark text-center fw-bold fs-5'>Total Sale</div> */}
        </div>
    );
};

export default DonutChart;
