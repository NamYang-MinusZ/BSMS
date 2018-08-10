let CARD_CALL_NUM = 1;
let COLORS_ARROW = 0;
let FIVE_GRAPH_COLORS = [
    'rgb(14, 121, 178)',
    'rgb(234, 171, 0)',
    'rgb(106, 85, 104)',
    'rgb(173, 215, 220)',
    'rgb(84, 71, 138)'
];
var CHART;

window.onload = function () {

    CHART = CHART_DRAWER();
    VIEW_EVENTS_INIT();
    NAVIGATOR_INIT();
    NORMAL_CARD_CALL();
    LOAD_MORE();

}

function VIEW_EVENTS_INIT() {
    $('#CHART_ONLY').on('click', VIEW_CHART_ONLY);
    $('#CARD_ONLY').on('click', VIEW_CARD_ONLY);
    $('#VIEW_BOTH').on('click', VIEW_BOTH);
}

function NAVIGATOR_INIT() {

    $(".district-item-container").children("ul").collapse("show");

    $(".district-item-header").on("click", function () {
        $(this).parent().children("ul").collapse("toggle");
    })
}

function CHART_DRAWER(JSON_RESPONSE) {

    let HoursArr = new Array();
    let limitData = new Array();
    for (let index = 0; index <= 23; index++) {
        limitData.push(40);
        if (index < 10) {
            HoursArr.push('0'.concat(index.toString()));
        } else {
            HoursArr.push(index.toString());
        }
    }

    var Smoke_Canvas = $("#MYCHART");
    var Smoke_Chart = new Chart(Smoke_Canvas, {

        type: 'line',

        data: {

            labels: HoursArr,
            datasets: [{
                data: limitData,
                borderWidth: 3,
                backgroundColor: 'rgba(234, 96, 96, 0.4)',
                borderColor: 'rgb(234, 96, 96)',
                tension: 0.5,
                pointRadius: 0,
                label: '상한선',
                fill: false,
            }]

        },
        options: {
            responsive: true,
            responsiveAnimationDuration: 1000,
            maintainAspectRatio: false,

            title: {
                display: true,
                text: '시각별 일산화탄소 농도 추이',
            },

            scales: {

                xAxes: [{
                    ticks: {
                        fontSize: 15,
                        fontFamily: "'Ubuntu', sans-serif"
                    },
                    display: true,
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '시각'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 15,
                        fontFamily: "'Ubuntu', sans-serif"
                    },
                    gridLines: {
                        display: true,
                        color: 'rgba(0,0,0,0.5)'
                    }
                }]

            },





        }


    });

    return Smoke_Chart;
}

function COLORS() {

    return FIVE_GRAPH_COLORS[COLORS_ARROW];

}

function CHART_DATA_PUSH(BS_ID, BS_CO_HISTORY) {

    let NEW_SMOKE_CHART = {

        data: BS_CO_HISTORY,
        borderWidth: 3,
        borderColor: COLORS(),
        pointRadius: 4,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgb(255,255,255)',
        pointBorderColor: 'rgb(0,0,0)',
        pointBorderWidth: 2,
        pointStyle: 'circle',
        tension: 0.1,
        label: BS_ID,
        fill: false,
        stepped: true

    }

    COLORS_ARROW++;
    CHART.data.datasets.push(NEW_SMOKE_CHART);
    CHART.update();

}

function CHART_DATA_POP(BS_ID) {

    CHART.data.datasets.forEach((element, index, array) => {
        if (element.label == BS_ID) {
            array.splice(index, 1);
        }
    });
    COLORS_ARROW--;
    CHART.update();

}

function NORMAL_CARD_CALL() {

    $.ajax({
        type: "GET",
        url: "/system/cardcall?CALL_NUM=" + CARD_CALL_NUM++,
        dataType: "JSON",
        success: function (response) {
            // console.log(response);
            NORMAL_CARD_DRAWER(response);

        }
    })

}

function NORMAL_CARD_DRAWER(JSON_RESPONSE) {
    // [{},{},{}]
    if (JSON_RESPONSE.length <= 0) {
        SCROLL_EVENT_STOP();
    }

    let CARD_CONTAINERS = new Array();

    for (let index = 0; index < JSON_RESPONSE.length; index++) {

        let $CARD_CONTAINER = $('<div></div>');
        $CARD_CONTAINER.addClass('card-container font-NotoSansKR');

        let KEY_POINTER = 0;

        for (const key in JSON_RESPONSE[index]) {

            if (KEY_POINTER == 0) {

                let $CARD_STATUS = $('<div></div>');
                $CARD_STATUS.addClass('card-status flex-center status-good');
                $CARD_STATUS.text(JSON_RESPONSE[index]['BS_ID']);

                $CARD_STATUS.hover(

                    function () {
                        $(this).addClass('card-selected');
                    },
                    function () {
                        $(this).removeClass('card-selected');
                    }

                )

                $CARD_STATUS.on('click', function () {

                    if ($(this).hasClass('card-selected-clicked') === false) {

                        if (CHART.data.datasets.length >= 6) {
                            alert(
                                '차트는 5개까지 동시 표현이 가능합니다.\n카드 재클릭을 통해 표현하고 있는 차트를 해제한후,\n새로운 카드를 클릭해주세요.'
                            );
                        } else {

                            $.ajax({
                                type: "POST",
                                url: "/system/get_bs_data",
                                data: {
                                    BS_ID: $(this).html()
                                },
                                dataType: "JSON",
                                success: function (response) {

                                    CHART_DATA_PUSH(response[0].BS_ID, response[0].BS_CO_HISTORY);

                                }
                            });

                            $(this).addClass('card-selected-clicked');
                            MOVE_TO_SELECTED_BUSSTOP($(this).html());
                        }



                    } else {

                        $(this).removeClass('card-selected-clicked');
                        let BS_ID = $(this).html();
                        CHART_DATA_POP(BS_ID);
                        markerPop(BS_ID);

                    }

                })

                $CARD_CONTAINER.append($CARD_STATUS);

                KEY_POINTER++;
            } else {

                let $CARD_DATA = $('<div></div>');
                $CARD_DATA.addClass('card-data flex-center');
                // $CARD_DATA.text(JSON_RESPONSE[index][key]);
                $CARD_CONTAINER.append($CARD_DATA);

            }

        }

        CARD_CONTAINERS.push($CARD_CONTAINER);
    }

    // alert(CARD_CONTAINERS.length);

    let pointer = 0;

    for (let index = 0; index < Math.ceil((CARD_CONTAINERS.length / 6)); index++) {

        let $CARD_SECTION_ROW = $('<div></div>');
        $CARD_SECTION_ROW.addClass('card-section-row');

        for (let index = 0; index < 6; index++) {

            if (CARD_CONTAINERS[pointer] == undefined) {
                // alert(pointer);
                let $DUMMY_CARD = $("<div></div>");
                $DUMMY_CARD.css({
                    margin: '0px auto',
                    width: '14%'
                })

                $CARD_SECTION_ROW.append($DUMMY_CARD);
            } else {
                $CARD_SECTION_ROW.append(CARD_CONTAINERS[pointer]);
            }
            pointer++;
        }

        $('.card-section-grid').append($CARD_SECTION_ROW);

    }

}

function VIEW_CHART_ONLY() {

    $('.bottom-card-container').hide();

    $('.bottom-card-container').css({
        'height': '0px'
    })
    $('.card-section-grid').css({
        'height': '0px'
    })

    $('.top-graph-container').hide();
    $('.top-graph-container').css({
        height: '0px'
    })
    $('#MYCHART').css({
        height: '0px'
    })

    $('.top-graph-container').show();

    $('.top-graph-container').animate({
        height: '100%'
    })

    $('#MYCHART').animate({
        height: '100%'
    }, function () {
        CHART.resize();
    })

    $('#CHART_ONLY').children('img').prop('src','./Images/View_Chart_Only_Clicked.png');
    $('#CARD_ONLY').children('img').prop('src','./Images/View_Grid_Only.png');
    $('#VIEW_BOTH').children('img').prop('src','./Images/View_Both.png');

}

function VIEW_CARD_ONLY() {
    NORMAL_CARD_CALL();
    $('.top-graph-container').hide();
    $('.top-graph-container').css({
        height: '0px'
    })
    $('#MYCHART').css({
        height: '0px'
    });

    $('.bottom-card-container').css({
        'height': '0px'
    })
    $('.card-section-grid').css({
        'height': '0px'
    })

    $('.bottom-card-container').show();
    $('.bottom-card-container').animate({
        height: '99.5%'
    });
    $('.card-section-grid').animate({
        height: '90%'
    });

    $('#CHART_ONLY').children('img').prop('src','./Images/View_Chart_Only.png');
    $('#CARD_ONLY').children('img').prop('src','./Images/View_Grid_Only_Clicked.png');
    $('#VIEW_BOTH').children('img').prop('src','./Images/View_Both.png');
}

function VIEW_BOTH() {

    $('.top-graph-container').hide();
    $('.bottom-card-container').hide();

    $('.top-graph-container').css({
        height: '0%'
    })
    $('#MYCHART').css({
        height: '0%'
    })
    $('.bottom-card-container').css({
        height: '0%'
    })
    $('.card-section-grid').css({
        height: '0%'
    });

    $('.top-graph-container').show();
    $('.bottom-card-container').show();

    $('.top-graph-container').animate({
        height: '40%'
    })
    $('#MYCHART').animate({
        height: '100%'
    }, function () {
        CHART.resize();
    })

    $('.bottom-card-container').css({
        height: '60%'
    })
    $('.card-section-grid').css({
        height: 'calc(56vh - 90px)'
    });

    $('#CHART_ONLY').children('img').prop('src','./Images/View_Chart_Only.png');
    $('#CARD_ONLY').children('img').prop('src','./Images/View_Grid_Only.png');
    $('#VIEW_BOTH').children('img').prop('src','./Images/View_Both_Clicked.png');
}

function LOAD_MORE() {
    $(".card-section-grid").on('scroll', function () {

        let SCROLL_ELEMENT = document.getElementsByClassName('card-section-grid');

        if (SCROLL_ELEMENT[0].scrollTop + SCROLL_ELEMENT[0].offsetHeight >= (SCROLL_ELEMENT[0].scrollHeight)) {
            // alert("추가 로드합니다.");
            NORMAL_CARD_CALL();
        }


    });

}
function SCROLL_EVENT_STOP() {
    $('.card-section-grid').off('scroll');
}
