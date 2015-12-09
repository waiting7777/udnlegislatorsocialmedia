if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 // window.location.href = "http://p.udn.com.tw/upf/newmedia/2015_data/20151208_udnlegislatorsocialmedia/udnlegislatorsocialmedia_m/index.html";
}

var grey_block_list = [];
var svg = null;
var dist_shortTolong_dict = {}, dist_longToshort_dict = {};
var dist_voice = [];
var rect_dist_width_scale = null;
var dist_x_dict = {};
var dist_y_dict = {};
var dist_width_dict = {};
var dist_now_x_dict = {};
var dist_now_y_dict = {};
var candidates_onebyone_dataDict = {};
var tip_str_byDist = {};
var face_img_data = [];
var face_img_id_list = [];
var counter_hover = [0, 0, 0];
// var fanpage_likes_groups = [[], [], [], [], []];
// var fanpage_likes_groups_merged = [];
// var tat_groups = [[], [], []];
// var tat_groups_merged = [];

//-----------------------------------------------------------------------------------------------------
d3.csv("data/candidates_on_internet_statistics_byDist.csv", function(data_dist){
  dist_voice = data_dist.slice();

  rect_dist_width_scale = d3.scale.linear().domain([0, 10000]).range([20, 80]);
});

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function(){

    var w = 800, h = 750;
    svg = d3.select("#vis").append("svg").attr({"width": w, "height": h});

    window.setTimeout(function(){

      $(".d3-tip").css("display", "block");

      var scroll = scroller()
      .container(d3.select('#graphic'));

      scroll(d3.selectAll('.step'));

      scroll.on('active', function(index) {
        // highlight current step text
        d3.selectAll('.step')
          .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

        $("#vis").css("display", "inline-block");
        
        // console.log(index);
        if(index == 0){
          /*svg.selectAll(".first-chart-dist-group-block")
          .transition()
          .duration(600)
          .attr("opacity", 0);*/

          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          svg.selectAll(".first-cover-group-block")
          .transition()
          .duration(600)
          .style("opacity", 1);
        }

        else if(index == 1){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          var x_dis = 4, y_dis = 4, rect_width = 40;

          svg.selectAll(".first-chart-dist-group-block")
          .transition()
          .duration(600)
          .style("opacity", 1)
          .attr("pointer-events", "none")
          .selectAll("rect")
          .attr({
            "width": 40,
            "height": 40,
            'x': function(d){
              return d['pos_x']*(rect_width + x_dis);
            },
            'y': function(d){
              return d['pos_y']*(rect_width + y_dis);
            }
          });
          svg.selectAll(".first-chart-text").attr("display", "table");
          svg.selectAll(".second-chart-text").attr("display", "none");
        }

        else if(index == 2){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".third-chart-dist-group-block")
          .transition()
          .duration(600)
          .attr("opacity", 0);*/

          var last_x = 0, last_y = 0, last_width = 0, max_height = 0, now_row_y = -1, now_row_x = -1, x_dis = 4, y_dis = 4, rect_width = 40;

          svg.selectAll(".first-chart-dist-group-block")
          .transition()
          .duration(600)
          .style("opacity", 1)
          .attr("pointer-events", "auto")
          .selectAll("rect")
          .attr({
            "width": function(d){
              return dist_width_dict[d['dist_long']];
            },
            "height": function(d){
              return dist_width_dict[d['dist_long']];
            },
            'x': function(d){
              

              if(d['dist'] == '不分區' || d['dist'] == "原") return d['pos_x']*(rect_width + x_dis);
              
              else{
                return dist_x_dict[d['dist_long']];
              }
            },
            'y': function(d){
              if(d['dist'] == '不分區' || d['dist'] == "原") return d['pos_y']*(rect_width + y_dis);
              else {
                return dist_y_dict[d['dist_long']];
              }
            }
          });
          svg.selectAll(".first-chart-text").attr("display", 'none');
          svg.selectAll(".second-chart-text").attr("display", "table");


        }

        else if (index == 3){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".first-chart-dist-group-block")
          .transition()
          .duration(600)
          .attr("opacity", 0);*/

          svg.selectAll(".third-chart-dist-group-block")
          .transition()
          .duration(600)
          .style("opacity", 1)
          .attr("pointer-events", "auto");

          /*svg.selectAll(".fourth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/
        }

        else if (index == 4){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".fifth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/

          svg.selectAll(".fourth-chart-group-block")
            .transition()
            .duration(600)
            .style("opacity", 1)
            .attr("pointer-events", "auto");

          /*svg.selectAll(".third-chart-dist-group-block")
          .transition()
          .duration(600)
          .attr("opacity", 0);*/
        }

        else if (index == 5){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".fourth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/

          svg.selectAll(".fifth-chart-group-block")
            .transition()
            .duration(600)
            .style("opacity", 1)
            .attr("pointer-events", "auto");

          /*svg.selectAll(".sixth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/
        }

        else if (index == 6){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".fifth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/

          svg.selectAll(".sixth-chart-group-block")
            .transition()
            .duration(600)
            .style("opacity", 1)
            .attr("pointer-events", "auto");

          /*svg.selectAll(".seventh-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/
        }

        else if (index == 7){
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          /*svg.selectAll(".sixth-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/

          svg.selectAll(".seventh-chart-group-block")
            .transition()
            .duration(600)
            .style("opacity", 1)
            .attr("pointer-events", "auto");
        }

        else if (index == 8){
          /*svg.selectAll(".seventh-chart-group-block")
            .transition()
            .duration(600)
            .attr("opacity", 0);*/
          d3.selectAll(".group_blocks")
          .transition()
          .duration(600)
          .style("opacity", 0)
          .attr("pointer-events", "none");

          $("#vis").css("display", "none");
        }
        // activate current section
        // plot.activate(index);
      });

    }, 1000);

    for (var jj = 1; jj < 64; jj++){
      face_img_id_list.push(jj);
    }

    for (var ii = 0; ii < 60; ii++){
      var temp_face = {};
      var index_now  = getRandomInt(0,face_img_id_list.length - 1);

      temp_face['id'] = face_img_id_list[index_now];
      face_img_id_list.splice(index_now, 1);

      temp_face['width'] = getRandomInt(40,100);
      temp_face['x'] = getRandomInt(0, 700);
      temp_face['y'] = getRandomInt(0, 650);
      face_img_data.push(temp_face);
    }

    // console.log(face_img_id_list);

    var g_block_first_cover = svg.append("g").attr({
      "class": "first-cover-group-block group_blocks"
    });

    var g_first_cover = g_block_first_cover.selectAll(".face-img-group").data(face_img_data).enter()
        .append("g").attr("class", "face-img-group");

    g_first_cover.append("svg:image")
    .attr({
      "xlink:href": function(d){
        return "img/face_img_" + d['id'] + ".jpg";
      },
      "x": function(d){
        return d.x;
      },
      "y": function(d){
        return d.y;
      },
      "width": 0,
      "height": 0,
      "class": "face-imgs"
    })
    .transition()
    .duration(10000)
    .attr({
      "width": function(d){
        return d.width;
      },
      "height": function(d){
        return d.width;
      },
      "x": 1000,
      "y": -100
    });

    d3.csv("data/election_dist_pos.csv", function(data_dist_pos){

      

      for (var i in data_dist_pos){
        dist_shortTolong_dict[data_dist_pos[i]['dist']] = data_dist_pos[i]['dist_long'];
        dist_longToshort_dict[data_dist_pos[i]['dist_long']] = data_dist_pos[i]['dist'];
      }

      var padding = 20, x_dis = 4, y_dis = 4, rect_width = 40;

      var last_x = 0, last_y = 0, last_width = 0, max_height = 0, now_row_y = -1, now_row_x = -1;

      var tip = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){
        if(d['dist'] != '不分區' && d['dist'] != "原"){
          var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
          var num = voice[0]['total'];
          return d['dist_long'] + '<br>' + modNum(num) + '次<br>';
        }
        
      });

      var g_block = svg.append("g").attr("class", "first-chart-dist-group-block group_blocks").style("opacity", 0);

      g_block.call(tip);

      var g = g_block.selectAll(".first-chart-dist-group").data(data_dist_pos).enter()
        .append("g")
        .attr("class", "first-chart-dist-group")
        .on("mouseover", function(d){
          tip.show(d);
        })
        .on("mouseout", function(d){
          tip.hide(d);
        });

      
        
      g.append("rect")
        .attr({
          'x': function(d){
            if(d['dist'] != '不分區' && d['dist'] != "原"){
              if(d['dist'] == '連江' || d['dist'] == '金' || d['dist'] == '澎'){
                    dist_x_dict[d['dist_long']] = d['pos_x']*(rect_width + x_dis) + 100;
                    var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
                    var this_width = rect_dist_width_scale(voice[0]['total']);
                    dist_width_dict[d['dist_long']] = this_width;
              }
              else{
                var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
                var this_width = rect_dist_width_scale(voice[0]['total']);
                dist_width_dict[d['dist_long']] = this_width;

                if(d['pos_y'] != now_row_y){

                  now_row_y = d['pos_y'];
                  last_width = this_width;
                  last_x = d['pos_x']*(rect_width + x_dis);
                  dist_x_dict[d['dist_long']] = last_x + 100;
                }
                else{
                  last_x = last_x + last_width + x_dis;
                  last_width = this_width;
                  dist_x_dict[d['dist_long']] = last_x + 100;
                }
              }
            }
            return d['pos_x']*(rect_width + x_dis);
          },
          'y': function(d){
            if(d['dist'] != '不分區' && d['dist'] != "原"){
                var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
                var this_height = rect_dist_width_scale(voice[0]['total']);

                if(d['pos_y'] != now_row_y){
                  last_y = last_y + max_height + y_dis;
                  max_height = this_height;
                  now_row_y = d['pos_y'];                  
                }
                else{
                  if(this_height > max_height)
                    max_height = this_height;
                }

                dist_y_dict[d['dist_long']] = last_y;
                dist_now_y_dict[d['dist_long']] = last_y;
            }
            return d['pos_y']*(rect_width + y_dis);
          },
          'width': rect_width,
          'height': rect_width,
          'fill': '#c9caca',
          'stroke': '#ffffff',
          'stroke-width': '2px',
          'class': 'first-chart-dist-rect'
        });

      // console.log(dist_x_dict);
      
      g.append("text")
        .text(function(d){
          return d['dist'];
        })
        .attr({
          'x': function(d){
            return d['pos_x']*(rect_width + x_dis) + 6;
          },
          'y': function(d){
            return d['pos_y']*(rect_width + x_dis) + 25;
          },
          'font-size': function(d){
            if(d['dist'].length > 2)
              return '10px';
            else return '15px';
          },
          'fill': "#ffffff",
          'class': "first-chart-text"
        });

      g.append("text")
        .text(function(d){
          return d['dist']
        })
        .attr({
          
          'x': function(d){
            if(d['dist'] != '不分區' && d['dist'] != "原"){
              var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
              var num = voice[0]['total'];
              if(num > 3000){
                return dist_x_dict[d['dist_long']] + 6;
              }
              else return 0;
            }
            else return 0;
          },
          'y': function(d){
            if(d['dist'] != '不分區' && d['dist'] != "原"){
              var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
              var num = voice[0]['total'];
              if(num > 3000){
                return dist_y_dict[d['dist_long']] + 25;
              }
              else return 0;
            }
            else return 0;
          },
          'font-size': function(d){
            if(d['dist'] != '不分區' && d['dist'] != "原"){
              var voice = $.grep(dist_voice, function(e){return e['dist'] == d['dist_long']});
              var num = voice[0]['total'];
              if(num > 3000){
                /*if(d['dist'].length > 2)
                  return '10px';
                else*/ return '18px';
              }
              else return 0;
              
            }
            else return 0;
          },
          'fill': "#ffffff",
          'class': "second-chart-text",
          'display': 'none'
        });



      g_block.append("text")
      .text("73席區域立委")
      .attr({
        'x': 1*(rect_width + x_dis),
        'y': 1*(rect_width + y_dis),
        'class': "first-chart-text"
      })
      .style({
        'font-size': '20px'
      });

      g_block.append("text")
      .text("34席不分區立委")
      .attr({
        'x': 11*(rect_width + x_dis),
        'y': 3*(rect_width + y_dis) - 20,
        'class': "first-chart-text"
      })
      .style({
        'font-size': '20px'
      });

      g_block.append("text")
      .text("6席原住民立委")
      .attr({
        'x': 11*(rect_width + x_dis),
        'y': 11*(rect_width + y_dis) - 20,
        'class': "first-chart-text"
      })
      .style({
        'font-size': '20px'
      });

      var text_ps = g_block.append("text")
      .attr({
        'x': 520,
        'y': 450,
        'class': "second-chart-text",
        'fill': "#808080",
        'font-size': "14px"
      });

      /*text_ps.append("tspan")
      .text("資料來源")
      .attr({
        'x': 520,
        'dy': "1.2em",
        'id': "fanpage_reference"
      })
      .style({
        'fill': 'blue'
      })
      .on("click", function(){
        window.open("http://google.com");
      });*/

      /*text_ps.append("tspan")
      .text("1.20個新聞類FB粉絲團po文、及po文")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("中的新聞連結。包括Yahoo!奇摩新聞、")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("蘋果日報、自由時報、中時電子報、udn")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text(".com 聯合新聞網、聯合晚報、經濟日報")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("、中央社新聞粉絲團、ETtoday新聞雲、")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("Nownews 今日新聞、風傳媒、The ")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("News Lens 關鍵評論網、新頭殼")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("newtalk、Initium Media 端傳媒、東森")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("新聞、TVBS 新聞、三立新聞、中天快點")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("TVV、壹電視 Next TV、udn tv。")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("2.PTT八卦板、政治黑特板")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });*/

      text_ps.append("tspan")
      .text("*滑鼠移至圖上看詳細資訊")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("統計時間：")
      .attr({
        'x': 520,
        'dy': "2.4em"
      });

      text_ps.append("tspan")
      .text("2015/5/1到2015/11/20")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("註：")
      .attr({
        'x': 520,
        'dy': "2.4em"
      });

      text_ps.append("tspan")
      .text("1.方塊大小代表各選區所有立委候選人被")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("討論次數總和。")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("2.採精準比對，名字一模一樣才納入統計。")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("3.因各選區候選人討論次數最多與最少差")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("距過大，故進行視覺化時，將最大與最小")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("方塊設定一基準面積，其間差距均分，其")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("他方塊面積依照與最大和最小值差距等比")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      text_ps.append("tspan")
      .text("例決定。")
      .attr({
        'x': 520,
        'dy': "1.2em"
      });

      d3.csv("data/all_candidates_voice_onebyone.csv", function(data_voice){

        var no_dist_data = [];
        var block_dict = {};
        var initX = 350, initY = 300, inside_width = 0, inside_height = 0, dis = 10, now_x = initX, now_y = initY - 54, new_loop = 0, rightest = 0, most_bot = 0, firstRectWidth = 54;
        var direction = 'n';

        for(var i in data_voice){
          if(data_voice[i]['district'] != "不分區" && data_voice[i]['district'] != "平地原住民選舉區" && data_voice[i]['district'] != "山地原住民選舉區"){
            if (!(data_voice[i]['district'] in candidates_onebyone_dataDict)){
              candidates_onebyone_dataDict[data_voice[i]['district']] = [];
              
            }
            candidates_onebyone_dataDict[data_voice[i]['district']].push(data_voice[i]);
          }
          else{
            var temp = data_voice[i];
            temp['value'] = temp['total'];
            no_dist_data.push(temp);


            var this_width = rect_dist_width_scale(data_voice[i]['total']);

            if (data_voice[i]['name'] == '王金平'){
              block_dict[data_voice[i]['name']] = {};
              block_dict[data_voice[i]['name']]['x'] = initX;
              block_dict[data_voice[i]['name']]['y'] = initY;
              inside_width = this_width;
              inside_height = this_width;
            }
            else{
              // console.log(direction);
              

              block_dict[data_voice[i]['name']] = {};
              
              if(direction == 'n'){
                if ((now_x - initX) > inside_width + dis){
                    direction = 'e';
                    block_dict[data_voice[i]['name']]['x'] = now_x;
                    block_dict[data_voice[i]['name']]['y'] = now_y;
                    rightest = now_x + this_width;
                }
                else{
                    if(new_loop == 1){
                      new_loop = 0;
                      now_y = now_y - dis - this_width;
                      inside_width = rightest - initX;
                      inside_height = most_bot - initY;
                      firstRectWidth = this_width;
                    }
                    var xx = now_x;
                    now_x = now_x + this_width + dis;
                    block_dict[data_voice[i]['name']]['x'] = xx;
                    block_dict[data_voice[i]['name']]['y'] = now_y;
                }
              }
              else if (direction == 'e'){
                if((now_y - initY) > inside_height){
                    direction = 's';
                    // now_x = now_x - dis - this_width;
                    block_dict[data_voice[i]['name']]['x'] = now_x;
                    block_dict[data_voice[i]['name']]['y'] = now_y;
                    most_bot = now_y + this_width;
                  }
                  else{
                    var yy = now_y;
                    now_y = now_y + dis + this_width;
                    block_dict[data_voice[i]['name']]['x'] = now_x;
                    block_dict[data_voice[i]['name']]['y'] = yy;
                  }
              }
              else if (direction == 's'){
                now_x = now_x - this_width - dis;

                  block_dict[data_voice[i]['name']]['x'] = now_x;
                  block_dict[data_voice[i]['name']]['y'] = now_y;

                  if(now_x < initX - this_width - dis){
                    direction = 'w';
                    // now_x = now_x - this_width;
                    initX = now_x;
                  }
              }
              else{
                now_y = now_y - this_width - dis;

                

                block_dict[data_voice[i]['name']]['x'] = now_x;
                block_dict[data_voice[i]['name']]['y'] = now_y;

                if (now_y < initY - firstRectWidth){
                    now_y -= dis;
                    direction = 'n';
                    initY = now_y;
                    new_loop = 1; 
                }
                
              }
            }

          }
          // data_voice[i]['value'] = data_voice[i]['total'];
        }

        // console.log(block_dict);
        // console.log(candidates_onebyone_dataDict);
        for(var j in candidates_onebyone_dataDict){
          var str = j + "<br>";
          for(var k in candidates_onebyone_dataDict[j]){
            if(candidates_onebyone_dataDict[j][k]['name'].length == 2)
              str = str + candidates_onebyone_dataDict[j][k]['name'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + modNum(candidates_onebyone_dataDict[j][k]['total']) + "次<br>";
            else
              str = str + candidates_onebyone_dataDict[j][k]['name'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + modNum(candidates_onebyone_dataDict[j][k]['total']) + "次<br>";              
          }
          tip_str_byDist[j] = str;
        }

        var tip = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){
          if(d['dist'] != '不分區' && d['dist'] != "原"){
            // console.log(d);
            return tip_str_byDist[d['dist']];
          }
          
        });

        var g_block = svg.append("g").attr("class", "third-chart-dist-group-block  group_blocks").style("opacity", 0);

        g_block.call(tip);

        var g = g_block.selectAll(".third-chart-dist-group").data(dist_voice).enter()
          .append("g")
          .attr("class", "third-chart-dist-group")
          .attr("id", function(d){return "third-chart-group-" + d['dist']})
          .style("opacity", function(d){
            // console.log(d);
            if(d['dist'] == '基隆市選舉區' || d['dist'] == '新竹市選舉區' || d['dist'] == '新北市第12選舉區')
              return 1;
            else
              return 0.5;
          })
          .attr("stroke", '#3e3a39')
          .attr("stroke-width", function(d){
            if(d['dist'] == '基隆市選舉區' || d['dist'] == '新竹市選舉區' || d['dist'] == '新北市第12選舉區')
              return '1px';
            else
              return 0;
          })
          .on("mouseover", function(d){
            $(this).css("opacity", 1);
            $(this).css("stroke-width", "1px");
            tip.show(d);
          })
          .on("mouseout", function(d){
            $(this).css("opacity", 0.5);
            $(this).css("stroke-width", 0);
            tip.hide(d);
          });

        d3.selectAll(".third-chart-dist-group").each(function(d){
          // console.log(d);
          if(d['dist'] != "不分區" && d['dist'] != "平地原住民選舉區" && d['dist'] != "山地原住民選舉區"){

            // console.log(d['dist']);
            // console.log(candidates_onebyone_dataDict[d['dist']]);

            var dist_total = d['total'];
            var dist_width = dist_width_dict[d['dist']];

            d3.select(this).selectAll(".third-chart-rect-" + d['dist']).data(candidates_onebyone_dataDict[d['dist']]).enter()
            .append("rect")
            .attr({
              'x': function(d){
                return dist_x_dict[d['district']];
              },
              'y': function(d){
                var now_height = dist_width * (d['total']/dist_total);
                var now_y = dist_now_y_dict[d['district']];
                dist_now_y_dict[d['district']] += now_height;

                return now_y; 
              },
              'width': dist_width,
              'height': function(d){
                return dist_width * (d['total']/dist_total);
              },
              'fill': function(d){
                return getPartyColor(d['party']);
              },
              'class': "third-chart-rect-" + d['dist']
            });

          }
        });

        g_block.append("text")
        .text("基")
        .attr({
          'x': dist_x_dict["基隆市選舉區"] + 6,
          'y': dist_y_dict["基隆市選舉區"] + 25,
          'fill': "#ffffff",
          "font-size": "18px"
        });

        g_block.append("text")
        .text("新12")
        .attr({
          'x': dist_x_dict["新北市第12選舉區"] + 6,
          'y': dist_y_dict["新北市第12選舉區"] + 25,
          'fill': "#ffffff",
          "font-size": "18px"
        });

        g_block.append("text")
        .text("竹市")
        .attr({
          'x': dist_x_dict["新竹市選舉區"] + 6,
          'y': dist_y_dict["新竹市選舉區"] + 25,
          'fill': "#ffffff",
          "font-size": "18px"
        });

        g_block.append("g")
        .append("svg:image")
        .attr({
          'xlink:href': "img/icon.jpg?v1",
          'x': 12*(rect_width + x_dis) - 20,
          'y': 12*(rect_width + y_dis) - 20,
          'width': 198,
          'height': 104
        });

        g_block.append("text")
        .text("註：討論次數為0的立委候選人不在圖中呈現。")
        .attr({
          'x': 12*(rect_width + x_dis) - 20,
          'y': 12*(rect_width + y_dis) + 120,
          'fill': "#808080"
        });

        var g_block_fourth = svg.append("g").attr("class", "fourth-chart-group-block  group_blocks").style("opacity", 0);

        
        var tip_fourth = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){
          if(d['district'] == '不分區' || d['district'] == "平地原住民選舉區" || d['district'] == "山地原住民選舉區"){
            // console.log(d);
            return d['district'] + "<br>" + d['name'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + modNum(d['total']) + "次<br>";
          }
          
        });

        g_block_fourth.call(tip_fourth);

        var root = {'children': no_dist_data};

        var treemap = d3.layout.treemap().size([w - 100, h - 100]);

        treemap.sort(function(a,b){
          return a.value - b.value;
        });

        var nodes = treemap.nodes(root);


        // var g_fourth = g_block_fourth.selectAll(".fourth-chart-group").data(data_voice).enter()
        var g_fourth = g_block_fourth.selectAll(".fourth-chart-group").data(nodes).enter()
                      .append("g")
                      .attr({
                        "class": "fourth-chart-group"
                      })
                      .style({
                        "opacity":function(d){
                          if(d['name'] == "王金平" || d['name'] == '段宜康' || d['name'] == '邱毅')
                            return 1;
                          else
                            return 0.5;
                        },
                        "stroke": "#3e3a39",
                        "stroke-width": function(d){
                          if(d['name'] == "王金平" || d['name'] == '段宜康' || d['name'] == '邱毅')
                            return "2px";
                          else
                            return 0;
                        }
                      })
                      .on("mouseover", function(d){
                        $(this).css("opacity", 1);
                        $(this).css("stroke-width", "2px");
                        tip_fourth.show(d);
                      })
                      .on("mouseout", function(d){
                        $(this).css("opacity", 0.5);
                        $(this).css("stroke-width", 0);
                        tip_fourth.hide(d);
                      });

        g_fourth.append("rect")
        .attr({
          'x': function(it){return it.x},
          'y': function(it){return it.y},
          'width': function(it){return it.dx},
          'height': function(it){return it.dy},
          'fill':function(it){
            if(!('party' in it)){
              return 'white';
            }
            else{
              return getPartyColor(it.party);
            }
          }
        })
        .style({
          'stroke': 'white',
          'stroke-width': '5px'
        });

        g_block_fourth.append("g")
        .append("svg:image")
        .attr({
          'x': w - 100 - 470,
          'y': h - 80,
          'xlink:href': "img/icon2.jpg",
          'width': 461,
          'height': 64
        });

        g_block_fourth.append("text")
        .text(nodes[1]['name'])
        .attr({
          'x': nodes[1].x + nodes[1].dx/2 - 30,
          'y': nodes[1].y + nodes[1].dy/2 + 10

        })
        .style({
          'font-size': "20px",
          "fill": "#ffffff"
        });

        g_block_fourth.append("text")
        .text(nodes[2]['name'])
        .attr({
          'x': nodes[2].x + nodes[2].dx/2 - 30,
          'y': nodes[2].y + nodes[2].dy/2 + 8

        })
        .style({
          'font-size': "20px",
          "fill": "#ffffff"
        });

        g_block_fourth.append("text")
        .text(nodes[3]['name'])
        .attr({
          'x': nodes[3].x + nodes[3].dx/2 - 20,
          'y': nodes[3].y + nodes[3].dy/2 + 5

        })
        .style({
          'font-size': "20px",
          "fill": "#ffffff"
        });

        /*g_fourth.append("rect")
        .attr({
          'width': function(d, i){
            if(d['district'] == "不分區" || d['district'] == "平地原住民選舉區" || d['district'] == "山地原住民選舉區"){
              if(i==0)
                inside_width = rect_dist_width_scale(d['total'])
              return rect_dist_width_scale(d['total']);
            }
            else return 0;
          },
          'height': function(d){
            if(d['district'] == "不分區" || d['district'] == "平地原住民選舉區" || d['district'] == "山地原住民選舉區")
              return rect_dist_width_scale(d['total']);
            else return 0;
          },
          'x': function(d, i){
            if(d['district'] == "不分區" || d['district'] == "平地原住民選舉區" || d['district'] == "山地原住民選舉區"){
              return block_dict[d['name']]['x'];
            }
            else return 0;
          },
          'y': function(d,i){
            if(d['district'] == "不分區" || d['district'] == "平地原住民選舉區" || d['district'] == "山地原住民選舉區"){
              return block_dict[d['name']]['y'];
              
            }
            else return 0;
          },
          'fill': function(d){
            return getPartyColor(d['party']);
          }

        });*/

      });

    });

    

    d3.csv("data/all_candidates_voice_onebyone.csv", function(data_voice_onebyone){
      data_voice_onebyone.sort(function(a,b){
        return b['total'] - a['total'];
      });

      

      // console.log(data_voice_onebyone);

      var padding = 0, x_padding = 3, y_padding = 3, now_x = 0, now_y = padding + 50, rect_width = 28;

      var g_block = svg.append("g").attr("class", "fifth-chart-group-block  group_blocks").style("opacity", 0);

      var tip = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){

        return d['name'] + "&nbsp;/&nbsp;" + d['party'] + "<br>" + d['district'] + "<br>媒體社群討論度" + modNum(d['total']) + "次<br>";
          
      });

      g_block.call(tip);

      var g = g_block.selectAll(".fifth-chart-group").data(data_voice_onebyone).enter()
                .append("g")
                .attr({
                  "class": function(d){ return "fifth-chart-group fifth-dist-" + d['district']}

                })
                .style({
                  "opacity":function(d){
                    if(d['name'] == "柯建銘" || d['name'] == "邱顯智")
                      return 1;
                    else
                      return 0.5;
                  },
                  "stroke": "#3e3a39",
                  "stroke-width": function(d){
                    if(d['name'] == "柯建銘" || d['name'] == "邱顯智")
                      return "2px";
                    else
                      return 0;
                  }
                })
                .on("mouseover", function(d){
                  if(counter_hover[0] == 0){
                    $(".fifth-chart-group").css("opacity", 0.5);
                    $(".fifth-chart-group").css("stroke-width", 0);
                    counter_hover[0] = 1;
                  }

                  if(d['district'] != "不分區"){
                    $(".fifth-dist-" + d['district']).css("opacity", 1);
                    $(".fifth-dist-" + d['district']).css("stroke-width", "2px");
                  }
                  else{
                    $(this).css("opacity", 1);
                    $(this).css("stroke-width", "2px");
                  }
                  tip.show(d);
                })
                .on("mouseout", function(d){
                  if(d['district'] != "不分區"){
                    $(".fifth-dist-" + d['district']).css("opacity", 0.5);
                    $(".fifth-dist-" + d['district']).css("stroke-width", 0);
                  }
                  else{
                    $(this).css("opacity", 0.5);
                    $(this).css("stroke-width", 0);
                  }
                  tip.hide(d);
                });

      g.append("rect")
      .attr({
        'class': "fifth-chart-rect",
        'width': rect_width + "px",
        'height': rect_width + "px",
        'x': function(d, i){
          if(i%24 == 0){
            now_x = 0;
          }
          else{
            now_x = now_x + x_padding + rect_width;
          }
          return now_x;
        },
        'y': function(d,i){
          if(i%24 == 0){
            now_y = now_y + y_padding + rect_width;
          }
          
          return now_y;
        },
        'fill': function(d){
          return getPartyColor(d['party']);
        }
      });

      g_block.append("text")
      .text("高 → 低")
      .attr({
        'x': 0,
        'y': padding + 60,
        'font-size': "18px"
      });

      g_block.append("line")
      .attr({
        'x1': 0,
        'x2': 300,
        'y1': padding + 70,
        'y2': padding + 70,
        'stroke': 'black',
        'stroke-width': "1px"
      });
    });

    d3.csv("data/candidates_fanpages_talkingabout_statistics.csv", function(data_talkingabout){
      data_talkingabout.sort(function(a,b){
        return b['likes'] - a['likes'];
      });

      /*for (var i in data_talkingabout){
        fanpage_likes_groups[getLikesGroup(data_talkingabout[i]['likes'])].push(data_talkingabout[i]);
      }

      for (var j in fanpage_likes_groups){
        for (var k in fanpage_likes_groups[j]){
          fanpage_likes_groups_merged.push(fanpage_likes_groups[j][k]);
        }
      }*/

      // console.log(fanpage_likes_groups);

      var padding = 80, x_padding = 5, y_padding = 5, now_x = 0 + padding, now_y = 50 + padding, group_now_x = 0, group_now_y = 0, num_in_row_x = 8, num_in_row_y = 8, counter_x = 0, counter_y = 0;


      var g_block = svg.append("g").attr("class", "sixth-chart-group-block  group_blocks").style("opacity", 0);

      var tip = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){

        return d['name'] + "&nbsp;/&nbsp;" + d['party'] + "<br>" + d['dist'] + "<br>臉書粉絲數" + modNum(d['likes']) + "名<br>";
          
      });

      g_block.call(tip);

      var g = g_block.selectAll(".sixth-chart-group").data(data_talkingabout).enter()
                    .append("g")
                    .attr({
                      "class": function(d){ return "sixth-chart-group sixth-dist-" + d['dist']}
                    })
                    .style({
                      "opacity": function(d){
                        if(d['name'] == "潘建志" || d['name'] == "柯建銘" || d['name'] == "王定宇" || d['name'] == "蔡其昌" || d['name'] == "蘇嘉全" || d['name'] == "趙天麟" || d['name'] == "洪慈庸" || d['name'] == "郝龍斌")
                          return 1;
                        else
                          return 0.5;
                      },
                      "stroke": "#3e3a39",
                      "stroke-width": function(d){
                        if(d['name'] == "潘建志" || d['name'] == "柯建銘" || d['name'] == "王定宇" || d['name'] == "蔡其昌" || d['name'] == "蘇嘉全" || d['name'] == "趙天麟" || d['name'] == "洪慈庸" || d['name'] == "郝龍斌")
                          return "2px";
                        else
                          return 0;
                      }
                      
                    })
                    .on("mouseover", function(d){
                      if(counter_hover[1] == 0){
                        $(".sixth-chart-group").css("opacity", 0.5);
                        $(".sixth-chart-group").css("stroke-width", 0);
                        counter_hover[1] = 1;
                      }

                      if(d['dist'] != "不分區"){
                        $(".sixth-dist-" + d['dist']).css("opacity", 1);
                        $(".sixth-dist-" + d['dist']).css("stroke-width", "2px");
                      }
                      else{
                        $(this).css("opacity", 1);
                        $(this).css("stroke-width", "2px");
                      }
                      tip.show(d);
                    })
                    .on("mouseout", function(d){
                      if(d['dist'] != "不分區"){
                        $(".sixth-dist-" + d['dist']).css("opacity", 0.5);
                        $(".sixth-dist-" + d['dist']).css("stroke-width", 0);
                      }
                      else{
                        $(this).css("opacity", 0.5);
                        $(this).css("stroke-width", 0);
                      }
                      tip.hide(d);
                    });

      g_block.append("line")
      .attr({
        'x1': now_x,
        'x2': now_x + (x_padding + 20)*8 - 5,
        'y1': now_y + 15,
        'y2': now_y + 15,
        'stroke': 'black',
        'stroke-width': '1px'
      });

      g_block.append("text")
      .text("100,000 +")
      .attr({
        'x': now_x,
        'y': now_y + 5
      });

      g_block.append("line")
      .attr({
        'x1': 300 + padding,
        'x2': 300 + padding + (x_padding + 20)*16 - 5,
        'y1': now_y + 15,
        'y2': now_y + 15,
        'stroke': 'black',
        'stroke-width': '1px'
      });

      g_block.append("text")
      .text("5,000 - 10,000")
      .attr({
        'x': 300 + padding,
        'y': now_y + 5
      });

      var text_ps = g_block.append("text")
      .attr({
        'x': 300 + padding,
        'y': now_y + 500,
        'fill': "#808080"
      });
      

      text_ps.append("tspan")
      .text("資料來源：各立委候選人FB粉絲團，個人專頁未列入統計。")
      .attr({
        'x': 300 + padding,
        'dy': '1.2em'
      });

      text_ps.append("tspan")
      .text("統計時間：2015/12/8")
      .attr({
        'x': 300 + padding,
        'dy': '1.2em'
      });

      g.append("rect")
      .attr({
        'class': "sixth-chart-rect",
        'width': '20px',
        'height': '20px',
        'x': function(d, i){
          if(getLikesGroup(d['likes']) != group_now_x){
            group_now_x = getLikesGroup(d['likes']);

            counter_x = 0;

            if(group_now_x == 3 || group_now_x == 4)
              num_in_row_x = 16;
          }

          if(group_now_x == 3 || group_now_x == 4){
            if(counter_x%num_in_row_x == 0){
              now_x = 300 + padding;
            }
            else{
              now_x = now_x + x_padding + 20
            }
          }

          else{
            if(counter_x%num_in_row_x == 0){
              now_x = 0 + padding;
            }
            else{
              now_x = now_x + x_padding + 20
            }
          }

          counter_x++;
          
          return now_x;
        },
        'y': function(d,i){
          if(getLikesGroup(d['likes']) != group_now_y){
            group_now_y = getLikesGroup(d['likes']);

            counter_y = 0;

            if(group_now_y == 3){
              num_in_row_y = 16;
              now_y = 50 + padding;
            }

            else{
              now_y = now_y + 80;

              if(group_now_y == 4){
                g_block.append("line")
                .attr({
                  'x1': 300 + padding,
                  'x2': 300 + padding + (x_padding + 20)*16 - 5,
                  'y1': now_y + 15,
                  'y2': now_y + 15,
                  'stroke': 'black',
                  'stroke-width': '1px'
                });

                g_block.append("text")
                .text("0 - 5000")
                .attr({
                  'x': 300 + padding,
                  'y': now_y + 5
                });
              }
              else{
                g_block.append("line")
                .attr({
                  'x1': 0 + padding,
                  'x2': 0 + padding + (x_padding + 20)*8 - 5,
                  'y1': now_y + 15,
                  'y2': now_y + 15,
                  'stroke': 'black',
                  'stroke-width': '1px'
                });

                if(group_now_y == 1){
                  g_block.append("text")
                  .text("50,000 - 100,000")
                  .attr({
                    'x': 0 + padding,
                    'y': now_y + 5
                  });
                }
                else if (group_now_y == 2){
                  g_block.append("text")
                  .text("10,000 - 50,000")
                  .attr({
                    'x': 0 + padding,
                    'y': now_y + 5
                  });
                }
              }
            }
          }        

          if(counter_y%num_in_row_y == 0){
            now_y = now_y + y_padding + 20;
          }          

          counter_y++;

          return now_y;
        },
        'fill': function(d){
          return getPartyColor(d['party']);
        }
      });

    });

    d3.csv("data/first100_likes.csv", function(data_first100){

      var padding = 80, x_padding = 5, y_padding = 5, now_x = 0 + padding, now_y = 50 + padding, group_now_x = 0, group_now_y = 0, num_in_row = 18, counter_x = 0, counter_y = 0;


      var g_block = svg.append("g").attr("class", "seventh-chart-group-block  group_blocks").style("opacity", 0);

      var tip = d3.tip().offset([0, -10]).direction('w').attr('class', 'd3-tip').html(function(d){

        return d['name'] + "&nbsp;/&nbsp;" + d['party'] + "<br>" + d['dist'] + "<br>臉書活躍度" + Math.round(d['percent']*100)/100 + "％<br>";
          
      });

      g_block.call(tip);

      var g = g_block.selectAll(".seventh-chart-group").data(data_first100).enter()
                    .append("g")
                    .attr({
                      "class": function(d){ return "seventh-chart-group seventh-dist-" + d['dist']}
                    })
                    .style({
                      "opacity":function(d){
                        if(d['name'] == "邱顯智" || d['name'] == "蘇嘉全")
                          return 1;
                        else
                          return 0.5;
                      },
                      "stroke": "#3e3a39",
                      "stroke-width": function(d){
                        if(d['name'] == "邱顯智" || d['name'] == "蘇嘉全")
                          return "2px";
                        else
                          return 0;
                      }
                    })
                    .on("mouseover", function(d){
                      if(counter_hover[2] == 0){
                        $(".seventh-chart-group").css("opacity", 0.5);
                        $(".seventh-chart-group").css("stroke-width", 0);
                        counter_hover[2] = 1;
                      }

                      if(d['dist'] != "不分區"){
                        $(".seventh-dist-" + d['dist']).css("opacity", 1);
                        $(".seventh-dist-" + d['dist']).css("stroke-width", "2px");
                      }
                      else{
                        $(this).css("opacity", 1);
                        $(this).css("stroke-width", "2px");
                      }
                      tip.show(d);
                    })
                    .on("mouseout", function(d){
                      if(d['dist'] != "不分區"){
                        $(".seventh-dist-" + d['dist']).css("opacity", 0.5);
                        $(".seventh-dist-" + d['dist']).css("stroke-width", 0);
                      }
                      else{
                        $(this).css("opacity", 0.5);
                        $(this).css("stroke-width", 0);
                      }
                      tip.hide(d);
                    });

      g_block.append("line")
      .attr({
        'x1': now_x,
        'x2': now_x + (x_padding + 30)*5 - 5,
        'y1': now_y + 25,
        'y2': now_y + 25,
        'stroke': 'black',
        'stroke-width': '1px'
      });

      g_block.append("text")
      .text("30% + ")
      .attr({
        'x': now_x,
        'y': now_y + 15
      });

      var text_ps = g_block.append("text")
      .attr({
        'x': now_x,
        'y': now_y + 500,
        'fill': "#808080"
      });
      

      text_ps.append("tspan")
      .text("資料來源：各立委候選人FB粉絲團，個人專頁未列入統計。")
      .attr({
        'x': now_x,
        'dy': '1.2em'
      });

      text_ps.append("tspan")
      .text("統計時間：2015/12/8")
      .attr({
        'x': now_x,
        'dy': '1.2em'
      });

      g.append("rect")
      .attr({
        'class': "seventh-chart-rect",
        'width': '30px',
        'height': '30px',
        'x': function(d){
          if(getTatGroup(d['percent']) != group_now_x){
            group_now_x = getTatGroup(d['percent']);

            counter_x = 0;
          }

          if(counter_x%num_in_row == 0){
            now_x = 0 + padding;
          }
          else{
            now_x = now_x + x_padding + 30
          }

          counter_x++;

          return now_x;
        },
        'y': function(d){
          if(getTatGroup(d['percent']) != group_now_y){
            group_now_y = getTatGroup(d['percent']);

            counter_y = 0;

            now_y = now_y + 80;

            g_block.append("line")
            .attr({
              'x1': 0 + padding,
              'x2': 0 + padding + (x_padding + 30)*5 - 5,
              'y1': now_y + 25,
              'y2': now_y + 25,
              'stroke': 'black',
              'stroke-width': '1px'
            });

            if(group_now_y == 1){
              g_block.append("text")
              .text("10% - 30%")
              .attr({
                'x': 0 + padding,
                'y': now_y + 15
              });
            }
            else if (group_now_y == 2){
              g_block.append("text")
              .text("0% - 10%")
              .attr({
                'x': 0 + padding,
                'y': now_y + 15
              });
            }
          }   

          if(counter_y%num_in_row == 0){
            now_y = now_y + y_padding + 30;
          }          

          counter_y++;

          return now_y;   
        },
        'fill': function(d){
          return getPartyColor(d['party']);
        }
      });
    });

    
});

function getPartyColor(party){
  switch(party) {
    case "國民黨":
      return '#00a0da';
      break;
    case "民進黨":
      return '#8cc666';
      break;
    case "親民黨":
      return '#f08327';
      break;
    case "台灣團結聯盟":
      return '#a98734';
      break;
    case "綠黨社會民主黨聯盟":
      return '#d36ca1';
      break;
    case "時代力量":
      return '#595757';
      break;
    case "民國黨":
      return '#fed400';
      break;
    case "無黨籍":
      return '#9fa0a0';
      break;
    case "新黨":
      return '#ffee20'
    default:
      return '#e83828'
  }
}

function getLikesGroup(likes){
    if (likes >= 100000)
      return 0;
    else if (likes < 100000 && likes >= 50000)
      return 1;
    else if (likes < 50000 && likes >= 10000)
      return 2;
    else if (likes < 10000 && likes >= 5000)
      return 3;
    else
      return 4;
}

function getTatGroup(tat){
  if(tat >= 30)
    return 0;
  else if (tat < 30 && tat >= 10)
    return 1;
  else
    return 2;
}

function modNum(str){
  var str1, str2, str3;
  var finalStr;
  if(str.length > 6){
    str1 = str.substr(str.length - 3, 3);
    str2 = str.substr(str.length - 6, 3);
    str3 = str.substr(0, str.length - 6);
    finalStr = str3 + ',' + str2 + ',' + str1;
  }
  else if (str.length > 3){
    str1 = str.substr(str.length - 3, 3);
    str2 = str.substr(0, str.length - 3);
    finalStr = str2 + ',' + str1;
  }
  else{
    finalStr = str;
  } 

  return finalStr; 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}