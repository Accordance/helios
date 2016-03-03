var dataCentersMock = [{
  "id": "1",
  "descr": "Data Center1"
}, {
  "id": "2",
  "descr": "Data Center2"
  }];

$httpBackend.whenGET('/data_centers').respond(dataCentersMock);
