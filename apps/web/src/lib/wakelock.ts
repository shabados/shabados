const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            const wakeLock = await (navigator as any).wakeLock.request('screen')

            wakeLock.onrelease = (e: Event) => console.log(e)

            const handleVisibilityChange = () => {
                if (wakeLock !== null && document.visibilityState === 'visible') {
                    requestWakeLock()
                }
            }

            document.addEventListener('visibilitychange', handleVisibilityChange)
        } catch (err) {
            console.log(err)
        }
    }
}

export default requestWakeLock

