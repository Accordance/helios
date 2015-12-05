var janusMaintenanceEventsMock = [{
  "_id": "MR-138",
  "time_frame": {
    "start": "2001-07-09T22:00:00Z",
    "end": "2001-07-10T02:00:00Z"
  },
  "systems": [
    "tyrant"
  ],
  "description": "MR-138: Validate mySql replication",
  "env": "e1",
  "assignee": {
    "id": "male",
    "name": "Smith, John"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-149",
  "time_frame": {
    "start": "2001-06-08T07:00:00Z",
    "end": "2001-06-08T13:00:00Z"
  },
  "systems": [
    "syrin"
  ],
  "description": "MR-149: VaultUI rollback",
  "env": "e1",
  "assignee": {
    "id": "male",
    "name": "Harp, Peter"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-153",
  "time_frame": {
    "start": "2001-06-28T01:00:00Z",
    "end": "2001-06-28T02:00:00Z"
  },
  "systems": [
    "tyrant"
  ],
  "description": "MR-153: Check Sync mismatch DB tables",
  "env": "e4",
  "assignee": {
    "id": "male",
    "name": "Warren, Mark"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-219",
  "time_frame": {
    "start": "2001-06-23T17:00:00Z",
    "end": "2001-06-25T20:00:00Z"
  },
  "systems": [
    "maverick"
  ],
  "description": "MR-219: Create ACL for the Maverick service",
  "env": "e2",
  "assignee": {
    "id": "female",
    "name": "Williams, Jane"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-169",
  "time_frame": {
    "start": "2001-06-01T21:00:00Z",
    "end": "2001-06-02T02:00:00Z"
  },
  "systems": [

  ],
  "description": "MR-169: Provision secrets for the new Sandbox environment",
  "env": "e3",
  "assignee": {
    "id": "female",
    "name": "Frost, Carrol"
  },
  "status": "active",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-132",
  "time_frame": {
    "start": "2001-06-03T14:00:00Z",
    "end": "2001-06-03T21:00:00Z"
  },
  "systems": [

  ],
  "description": "MR-132: Game Day: validation of the LB failure",
  "env": "e4",
  "assignee": {
    "id": "male",
    "name": "Smith, John"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-159",
  "time_frame": {
    "start": "2001-06-05T19:00:00Z",
    "end": "2001-06-08T03:00:00Z"
  },
  "systems": [
    "spider"
  ],
  "description": "MR-159: Restore Spider DB",
  "env": "e2",
  "assignee": {
    "id": "male",
    "name": "Dunn, Jack"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-168",
  "time_frame": {
    "start": "2001-06-10T14:00:00Z",
    "end": "2001-06-12T21:00:00Z"
  },
  "systems": [
    "rogue"
  ],
  "description": "MR-168: Patching Rogue cluster to the latest version",
  "env": "e1",
  "assignee": {
    "id": "male",
    "name": "Smith, John"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-176",
  "time_frame": {
    "start": "2001-06-06T15:22:00Z",
    "end": "2001-06-06T15:35:00Z"
  },
  "systems": [
    "saracen"
  ],
  "description": "MR-176: Deploy new Oracle cluster",
  "env": "e2",
  "assignee": {
    "id": "male",
    "name": "Warren, Mark"
  },
  "status": "closed",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}, {
  "_id": "MR-194",
  "time_frame": {
    "start": "2001-06-14T03:00:00Z",
    "end": "2001-06-14T03:30:00Z"
  },
  "systems": [
    "scarecrow"
  ],
  "description": "MR-194: Shut down and retire Scarecrow grid",
  "env": "e4",
  "assignee": {
    "id": "female",
    "name": "Williams, Jane"
  },
  "status": "scheduled",
  "reference_url": "https://github.com/Accordance/accordance.github.io/wiki/Maintenance-Request"
}];

$httpBackend.whenGET('/janus/maintenanceEvents').respond(janusMaintenanceEventsMock);
