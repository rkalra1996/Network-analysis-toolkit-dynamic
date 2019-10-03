var variablesConfig = (function(){
    return {
        DEFAULT_INTERVAL_TIMEOUT: 500,
        HUB: "hub",
        SPOKE: "spoke",
        SUBHUB: "subhub",
        SUBSPOKE: "subspoke",
        NODE_SIZE: {
            MIN: 15,
            MAX: 60
        },
        MINI_CIRCLE: {
            RADIUS: 5,
            X_OFFSET: 20,
            Y_OFFSET: 14
        },
        ACTIVE_CIRCLE: {
            RADIUS: 5
        },
        TOOLTIP: {
            X_OFFSET: 50,
            Y_OFFSET: 100,
            DURATION: 500
        },
        TRANSITION: {
            DURATION: 1000,
            DURATION_OFFSET: 50,
            RADIUS: {
                OFFSET: 10,
                MAX: 40
            }
        }
    }
})()