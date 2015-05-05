/* jshint newcap: false */
define(['moment', 'ng-table', 'lodash'], function (moment, ngTable, lodash) {
    "use strict";

    return ['$scope', 'maintenanceEventsFactory', '$window', 'ngTableParams', '$filter', '$location', function ($scope, maintenanceEventsFactory, $window, ngTableParams, $filter, $location) {
        $scope.status = [
            { name: 'All', value: ''},
            { name: 'Scheduled', value: 'scheduled'},
            { name: 'Active', value: 'active'},
            { name: 'Closed', value: 'closed'}
        ];

        $scope.env = [
            { name: 'All', value: ''},
            { name: 'p2', value: 'p2'},
            { name: 'd1', value: 'd1'},
            { name: 'f1', value: 'f1'},
            { name: 'f2', value: 'f2'},
            { name: 'l1', value: 'l1'},
            { name: 's1', value: 's1'}
        ];

        $scope.convertStatus = function (status) {
            var statusConversions = {
                scheduled: "",
                active: "warning",
                closed: "active"
            };
            return statusConversions[status];
        };

        $scope.openNewWindow = function (url) {
            $window.open(url);
        };

        var setupTimeline = function (events) {
            SimileAjax.History.enabled = false;
            var eventSource1 = new Timeline.DefaultEventSource();
            var bandInfos = [
                Timeline.createBandInfo({
                    width: "70%",
                    intervalUnit: Timeline.DateTime.DAY,
                    intervalPixels: 100,
                    eventSource: eventSource1
                }),
                Timeline.createBandInfo({
                    overview: true,
                    showEventText: false,
                    trackHeight: 0.5,
                    trackGap: 0.2,
                    width: "30%",
                    intervalUnit: Timeline.DateTime.MONTH,
                    intervalPixels: 200,
                    eventSource: eventSource1
                })
            ];
            bandInfos[1].syncWith = 0;
            bandInfos[1].highlight = true;
            var cronos_timeline = Timeline.create(document.getElementById("cronos-timeline"), bandInfos, Timeline.HORIZONTAL);

            var timeLineEvents = [];

            angular.forEach($scope.events, function (key, value) {
                timeLineEvents.push({
                    start: key.time_frame.start,
                    end: key.time_frame.end,
                    title: key.summary,
                    description: key.status
                });
            });

            var timeline_data = {
                events: timeLineEvents
            };

            var url = '.'; // The base url for image, icon and background image
            eventSource1.loadJSON(timeline_data, url);
            cronos_timeline.layout(); // display the timeline
        };

        var setupTable = function (events) {
//            get unique assignees, use later
//            $scope.assignees = _.chain(events).map(function(events) { return events.assignee }).uniq().value();

            $scope.tableParams = new ngTableParams(
                angular.extend({
                    page: 1,
                    count: 10,
                    sorting: {
                        'time_frame.start': 'dsc'
                    }
                }, $location.search()), {
                    total: events.length,
                    getData: function ($defer, params) {
                        $location.search(params.url()); // put params in url
                        var filteredData = params.filter() ?
                            $filter('filter')(events, params.filter()) :
                            events;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            events;

                        params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
//            moving out select to do later
//            var statusSelect = $('#statusSelect').remove();
//            $('#statusFilter').append(statusSelect);
        };

        var assigneeToLdapName = function (assignee) {
            var finalLdap;
            var commaSeperated = assignee.split(',');
            if (commaSeperated.length === 1) {
              return assignee;
            }
            finalLdap = commaSeperated[1].substr(1, 1).toLowerCase();
            finalLdap += commaSeperated[0].toLowerCase();
            return finalLdap;
        };

        maintenanceEventsFactory.query(function (events) {
            $scope.events = events;
            angular.forEach(events, function (event) {
                event.ldapName = assigneeToLdapName(event.assignee);
            });

            setupTimeline(events);
            setupTable(events);
        });
    }];
});