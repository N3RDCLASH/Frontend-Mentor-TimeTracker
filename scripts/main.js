const TimeTracker = {
    data() {
        return {
            active: 'daily',
            activities: [],
            currentActivties: []
        }
    },
    methods: {
        getClass: (title) => {
            const titleArr = title.split(" ")
            if (titleArr.length > 1) {
                return titleArr.reduce((prev, curr) => {
                    return `${prev.toLowerCase()}-${curr.toLowerCase()}`
                })
            }
            return title.toLowerCase()
        },
        setCurrentActivities: () => {
            app.currentActivties = app.activities.map(({ title, timeframes }) => ({ title, timeframe: timeframes[app.active] }))
        },
        setActiveTimeframe: (timeframe) => {
            app.active = timeframe
        },
    },
    watch: {
        active: () => {
            app.setCurrentActivities()
        }
    },
    async mounted() {
        const data = await (await fetch(`data.json`)).json()
        app.activities = data
        app.setCurrentActivities()
    }
}

const app = Vue.createApp(TimeTracker).mount('#app')