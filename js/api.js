var api = (function () {

    var getData = function () {
        return {
            "data": [{
                    "id": 1,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568637979572",
                    "doi": "600",
                    "cdoi": "600",
                    "ia": null,
                    "ci_no": 0,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 2,
                    "pid": "2",
                    "ptype": "S",
                    "gender": "Male",
                    "pname": "Dr. Benny Rogers",
                    "toi": "1568638197981",
                    "doi": "300",
                    "cdoi": "300",
                    "ia": "1",
                    "ci_no": 1,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 3,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "120",
                    "cdoi": "720",
                    "ia": "2",
                    "ci_no": 1,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 4,
                    "pid": "2",
                    "ptype": "S",
                    "gender": "Male",
                    "pname": "Dr. Benny Rogers",
                    "toi": "1568638197981",
                    "doi": "120",
                    "cdoi": "420",
                    "ia": "1",
                    "ci_no": 2,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 5,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "180",
                    "cdoi": "900",
                    "ia": "2",
                    "ci_no": 2,
                    "tone": "Neutral",
                    "vs": 1
                },
                {
                    "id": 6,
                    "pid": "3",
                    "ptype": "S",
                    "gender": "Male",
                    "pname": "Dr. Vijay Kumar",
                    "toi": "1568638197981",
                    "doi": "120",
                    "cdoi": "120",
                    "ia": "1",
                    "ci_no": 1,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 7,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "240",
                    "cdoi": "1140",
                    "ia": "3",
                    "ci_no": 1,
                    "tone": "Neutral",
                    "vs": 1
                },
                {
                    "id": 8,
                    "pid": "4",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Sumita Arora",
                    "toi": "1568638197981",
                    "doi": "300",
                    "cdoi": "300",
                    "ia": "1",
                    "ci_no": 1,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 8,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "120",
                    "cdoi": "1260",
                    "ia": "4",
                    "ci_no": 1,
                    "tone": "Neutral",
                    "vs": 1
                },
                {
                    "id": 9,
                    "pid": "4",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Sumita Arora",
                    "toi": "1568638197981",
                    "doi": "120",
                    "cdoi": "420",
                    "ia": "1",
                    "ci_no": 2,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 10,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "300",
                    "cdoi": "1560",
                    "ia": "4",
                    "ci_no": 2,
                    "tone": "Neutral",
                    "vs": 1
                },
                {
                    "id": 11,
                    "pid": "4",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Sumita Arora",
                    "toi": "1568638197981",
                    "doi": "180",
                    "cdoi": "600",
                    "ia": "1",
                    "ci_no": 3,
                    "tone": "Positive",
                    "vs": 1
                },
                {
                    "id": 12,
                    "pid": "1",
                    "ptype": "H",
                    "gender": "Male",
                    "pname": "Dr. Rajendra Prasad",
                    "toi": "1568638197981",
                    "doi": "300",
                    "cdoi": "1860",
                    "ia": "4",
                    "ci_no": 3,
                    "tone": "Negative",
                    "vs": 1
                },
                {
                    "id": 13,
                    "pid": "5",
                    "ptype": "S",
                    "gender": "Male",
                    "pname": "Dr. Akshay Bhatia",
                    "toi": "1568638197981",
                    "doi": null,
                    "cdoi": null,
                    "ia": -1,
                    "ci_no": null,
                    "tone": null,
                    "vs": 1
                },
                {
                    "id": 14,
                    "pid": "6",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Akshita Kumar",
                    "toi": "1568638197981",
                    "doi": null,
                    "cdoi": null,
                    "ia": -1,
                    "ci_no": null,
                    "tone": null,
                    "vs": 1
                },
                {
                    "id": 15,
                    "pid": "7",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Sonam Patil",
                    "toi": "1568638197981",
                    "doi": null,
                    "cdoi": null,
                    "ia": -1,
                    "ci_no": null,
                    "tone": null,
                    "vs": 0
                },
                {
                    "id": 16,
                    "pid": "8",
                    "ptype": "S",
                    "gender": "Female",
                    "pname": "Dr. Pratibha Sehgal",
                    "toi": "1568638197981",
                    "doi": null,
                    "cdoi": null,
                    "ia": -1,
                    "ci_no": null,
                    "tone": null,
                    "vs": 0
                }
            ]
        }
    }
    var getOldData = function () {
        return {
            nodes: [{
                    id: "Sean Connery",
                    name: "Sean Connery",
                    group: 1,
                    value: 0,
                    duration: "10 seconds",
                    tone: "positive",
                    time: 0
                },
                {
                    id: "Roger Moore",
                    name: "Roger Moore",
                    group: 2,
                    value: 1,
                    duration: "20 seconds",
                    tone: "positive",
                    time: 1,
                    x: 105,
                    y: 100
                },
                {
                    id: "Pierce Brosnan",
                    name: "Pierce Brosnan",
                    group: 2,
                    value: 2,
                    duration: "15 seconds",
                    tone: "moderate",
                    time: 2
                },
                {
                    id: "Ghost Ship",
                    name: "Ghost Ship",
                    group: 2,
                    value: 3,
                    duration: "20 seconds",
                    tone: "negative",
                    time: 3
                },
                {
                    id: "Gestolene Herzen",
                    name: "Gestolene Herzen",
                    group: 2,
                    value: 4,
                    duration: "20 seconds",
                    tone: "positive",
                    time: 4
                },
                {
                    id: "Band of Brothers",
                    name: "Band of Brothers",
                    group: 2,
                    value: 5,
                    duration: "20 seconds",
                    tone: "negative",
                    time: 5
                },
                {
                    id: "Mit aller Macht",
                    name: "Mit aller Macht",
                    group: 2,
                    value: 6,
                    duration: "30 seconds",
                    tone: "positive",
                    time: 6
                }
            ],
            links: [{
                    source: "Sean Connery",
                    target: "Roger Moore",
                    value: 1
                },
                {
                    source: "Roger Moore",
                    target: "Pierce Brosnan",
                    value: 1
                },
                {
                    source: "Pierce Brosnan",
                    target: "Ghost Ship",
                    value: 1
                },
                {
                    source: "Ghost Ship",
                    target: "Gestolene Herzen",
                    value: 1
                },
                {
                    source: "Gestolene Herzen",
                    target: "Band of Brothers",
                    value: 1
                },
                {
                    source: "Band of Brothers",
                    target: "Sean Connery",
                    value: 1
                },
                {
                    source: "Sean Connery",
                    target: "Mit aller Macht",
                    value: 1
                },
                {
                    source: "Mit aller Macht",
                    target: "Gestolene Herzen",
                    value: 1
                }
            ]
        };
    }
    return {
        getData: getData,
        getOldData: getOldData
    }
})();