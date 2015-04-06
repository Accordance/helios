define(['lodash', 'jquery', 'd3'], function(_, $, d3) {
  "use strict";

  // More information on D3js - https://www.dashingd3js.com/

  var ForcerdGraph = function() {

      this.nodeClickCallback = null;

      var node = null;
      var link = null;
      var graph = null;
      var svg = null;
      this.graph_connected = false;

      var width = 720,
        height = 480,
        //node,
        //link,
        //graph,
        linkIndexes,
        selected_node,
        force;

      var colorz = ["#1f77b4", "#6baed6", "#d62728", "#bcbd22", "#ff7f0e", "#31a354", "#d6616b", "#31a354", "#17becf", "#9e9ac8", "#e7ba52", "#bdbdbd", "#9467bd", "#e377c2", "#17becf"];

      var that = this;
      this.init = function() {

        //var colorz = d3.scale.category20();

        d3.selectAll(".legend-icon").each(function(d, i) {
          d3.select(this).style("background", function(d) {
            return colorz[i + 1];
            //return colorz(i);
          });
        });


        force = d3.layout.force()
          .on('tick', tick)
          .charge(-1500)
          .distance(100)
          //.linkDistance(10)
          //.linkStrenght(20)
          .gravity(1)
          .size([width, height]);

        svg = d3.select("#graph")
          .append("svg")
          .attr("id", "dependenciesGraph")
          //.attr("width", width)
          //.attr("height", height)
          .attr("width", "100%")
          .attr("height", "100%")
          //.style("border", "1px solid silver")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("preserveAspectRatio", "xMidYMid meet");
          //.attr("preserveAspectRatio", "none");

        svg.append("defs").selectAll("marker")
          .data(["triangle"])
          .enter().append("marker")
          .attr("class", "marker")
          .attr("id", String)
          .attr("viewBox", "0 0 10 10")
          .attr("refX", 15)
          .attr("refY", 5)
          .attr("markerUnits", "strokeWidth")
          .attr("markerWidth", 3)
          .attr("markerHeight", 5)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z");
      };

      function tick() {
        link.attr("x1", function(d) {
          return d.source.x;
        })
          .attr("y1", function(d) {
          return d.source.y;
        })
          .attr("x2", function(d) {
          return d.target.x;
        })
          .attr("y2", function(d) {
          return d.target.y;
        });

        //   node.attr("cx", function(d) { return d.x; })
        //       .attr("cy", function(d) { return d.y; });
        node.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        /* forced-graph
        labels.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }); */
      }

      function charge(d, i) {
        //var r = typeSize(d);
        //return -r * 1000;
        return -1500;
      }

      function isConnected(a, b) {
        return linkIndexes[a.index + ',' + b.index] || a.index === b.index;
      }

      function fade(bo) {
        return function(d) {
          var opacity = bo ? 0.1 : 1;
          var rad = radius(d);

          node.style('stroke-opacity', function(o) {
            var thisOpac = isConnected(d, o) ? 1 : opacity;
            this.setAttribute('fill-opacity', thisOpac);
            return thisOpac;
          });

          link.style('stroke-opacity', function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
          });


          //labels.select('text.label').remove();
          //node.select('title').remove();

          //if (bo) {
            /*
              labels.filter(function(o) {
                      return isConnected(o, d);
                  })
                  .append('svg:text')
                  .attr('y', function(o) {
                          return (o == d) ? (rad + 10) + 'px' : '5px';
                      })
                  .style('fill', '#C17021')
                  .attr('text-anchor', 'middle')
                  .attr('class', 'label')
                  .text(function(o) { return (o !== d) ? o.name.substr(0, 16) : ''; });
                  */
            /*
              node.filter(function(o) {
                      return o === d;
                  })
                  .append('title')
                  .text(function(o) { return o.name + ' / Songs: ' + o.count + ' / Plays: ' + o.plays; });

                }
              }; */
          //}
        };
      }

      function color(d) {
        //return (d.type === 'g') ? '#3182bd' : '#c6dbef';
        //return colorz(d.group);
        return colorz[d.group];
      }

      function songsTypeSize(d) {
        var s;
        if (d.type === 'group') {
          //s = d.count / root.maxGenreSongs;
          s = 10;
        } else {
          //s = d.count / root.maxArtistSongs;
          s = 5;
        }
        return s;
      }

      var typeSize = songsTypeSize;

      function radius(d) {
        //return 5;
        var r = typeSize(d);
        if (d.type === 'group') {
          //r = Math.max(r * 40, 4);
          r = 10;
        } else {
          //r = Math.max(r * 25, 2);
          r = 5;
        }
        return r;
      }

      this.update = function() {
        var nodeClickCallback = this.nodeClickCallback;

        var new_graph = force.nodes(graph.nodes)
          .links(graph.links);

        if (that.graph_connected) {
          new_graph
          .charge(-1000)
          .gravity(0.2) // default 0.1
          .linkDistance(40);
        }
        else {
          new_graph.charge(-1500)
          .distance(100)
          .gravity(1);
        }

        new_graph.start();

        link = svg.selectAll(".link")
          .data(graph.links);
        link.enter()
          .append("line")
          .attr("class", "link")
          .attr("marker-end", "url(#triangle)")
          //.attr("stroke-width", 2)
          //.style("stroke-width", function(d) { return Math.sqrt(d.value); });
          .attr('source', function(d) {
          return d.source;
        })
          .attr('target', function(d) {
          return d.target;
        });
        link.exit()
          .remove();

        var node_drag = d3.behavior.drag()
          .on("dragstart", dragstart)
          .on("drag", dragmove)
          .on("dragend", dragend);

        function dragstart(d, i) {
          force.stop(); // stops the force auto positioning before you start dragging
        }

        function dragmove(d, i) {
          d.px += d3.event.dx;
          d.py += d3.event.dy;
          d.x += d3.event.dx;
          d.y += d3.event.dy;
          tick(); // this is the key to make it work together with updating both px,py,x,y on d !
        }

        function dragend(d, i) {
          d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
          tick();
          force.resume();
        }

        node = svg.selectAll(".node")
          .data(graph.nodes);

        node.enter()
          //.append("circle")
          //.attr("class", "node")
          //.attr("r", 5)
          //.style("fill", function(d) { return color(d.group); })
          .append("g")
          .attr("class", "node")
          .on("click", click)
          .call(node_drag);


        function click(d) {
          if (d3.event.defaultPrevented) {
            return;
          } // ignore drag
          /*
          // Toggle children on click.
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          */
          nodeClickCallback(d.name);
          d.fixed = !d.fixed;
          that.update();
        }

        /*
          node.append("image")
            .attr("xlink:href", "https://github.com/favicon.ico")
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 16)
            .attr("height", 16);
          */


        node.append("circle")
          .attr("r", radius)
          //.attr('id', function(d) {
          //                return d.type + d.id;
          //            })
          .attr("class", "node_circle")
          .style("fill", color)
          .on('mouseover', fade(true))
          .on('mouseout', fade(false));

        node.append("title")
          .text(function(d) {
          return d.name;
        });

        node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) {
          return d.name;
        });

        // Exit any old nodes
        node.exit().remove();

        // Build fast lookup of links
        linkIndexes = {};
        graph.links.forEach(function(d) {
          linkIndexes[d.source.index + ',' + d.target.index] = 1;
          linkIndexes[d.target.index + ',' + d.source.index] = 1;
        });

        // Init fade state
        node.each(fade(false));
      };

      this.reload_graph = function(url) {
        var that = this;

        d3.json(url, function(error, root) {

          svg.selectAll(".link").remove();
          svg.selectAll(".node").remove();
          graph = root;

          for (var i = 0; i < graph.nodes.length; i++) {
            graph.nodes[i].x = Math.random() * width;
            //graph.nodes[i].x = width/2;
            graph.nodes[i].y = Math.random() * height;
            //graph.nodes[i].y = height/2;
          }

          that.update();
        });

      };

      this.render = function(data, nodeClickCallback) {
        this.nodeClickCallback = nodeClickCallback;
        this.init();
        var data_params = data.params;
        var params = (data_params) ? "?" + _.map(Object.keys(data_params), function(n) { return n + "=" + data_params[n]; }).join('&') : "";
        var path = (data.node) ? "/" + data.node + params : '';

        that.graph_connected = (data.node) ? true : false;

        this.reload_graph("apps_graph" + path);
      };
    };

  return new ForcerdGraph();

});
