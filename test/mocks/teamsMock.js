var teamsMock = [{
  "name": "Sierra",
  "id": "sierra",
  "_id": "sierra",
  "email": "DL:sierra",
  "url": "https://en.wikipedia.org/wiki/Mountain_range",
  "applications": ["haven", "muskrat", "siryn", "masque", "stryfe", "proteus", "huntress", "blink", "scarlet_witch", "carnage", "morg", "michaelangelo", "apocalypse", "colossus", "savage_land", "husk", "mutant", "pyro"]
}, {
  "name": "Dune",
  "id": "dune",
  "_id": "dune",
  "email": "DL:dune",
  "url": "https://en.wikipedia.org/wiki/Dune",
  "applications": ["tombstone", "azrael", "scorpion", "lamprey", "siege", "superman"]
}, {
  "name": "Mesa",
  "id": "mesa",
  "_id": "mesa",
  "email": "DL:mesa",
  "url": "https://en.wikipedia.org/wiki/Mesa",
  "applications": ["northstar", "prowler", "mojo", "gideon", "cloak_and_dagger", "sleepwalker", "jinx", "doppelganger", "solo", "black_knight", "snake_eyes", "union_jack", "green_goblin", "daredevil", "mastermind", "x_cutioner", "cheetah", "rage"]
}, {
  "name": "Precipice",
  "id": "precipice",
  "_id": "precipice",
  "email": "DL:precipice",
  "url": "https://en.wikipedia.org/wiki/Cliff",
  "applications": ["four_horsemen_of_apocalypse", "leatherneck", "xian", "mandarin", "thunderbolts", "silver_samurai", "bionic_commando", "widget", "fleet_trackin", "shredder", "guardian", "maggott"]
}, {
  "name": "Upland",
  "id": "upland",
  "_id": "upland",
  "email": "DL:upland",
  "url": "https://en.wikipedia.org/wiki/Hill",
  "applications": ["wrecker", "callisto", "robin"]
}, {
  "name": "Knoll",
  "id": "knoll",
  "_id": "knoll",
  "email": "DL:knoll",
  "url": "https://en.wikipedia.org/wiki/Hillock",
  "applications": ["slapstick", "saracen", "mysterio", "vulture", "electro", "jubilee", "flash", "omega_red", "rumble"]
}, {
  "name": "Massif",
  "id": "massif",
  "_id": "massif",
  "email": "DL:massif",
  "url": "https://en.wikipedia.org/wiki/Massif",
  "applications": ["arcade", "wasp", "gi_joe", "sandman", "vengeance", "living_tribunal", "serpentor", "sunspot", "acolytes", "loki", "wolfsbane", "bishop", "galactus"]
}, {
  "name": "Mound",
  "id": "mound",
  "_id": "mound",
  "email": "DL:mound",
  "url": "https://en.wikipedia.org/wiki/Mound",
  "applications": ["guile", "mondo_gecko", "vertigo", "doctor_doom", "annihilus", "juggernaut", "weapon_omega", "storm"]
}, {
  "name": "Scarp",
  "id": "scarp",
  "_id": "scarp",
  "email": "DL:scarp",
  "url": "https://en.wikipedia.org/wiki/Escarpment",
  "applications": ["havok", "penguin", "kingpin", "namor", "cyborg", "raphael", "rictor"]
}];
$httpBackend.whenGET('/teams').respond(teamsMock);
