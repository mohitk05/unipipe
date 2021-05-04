import * as React from 'react';
import { Link } from 'react-router-dom'

const LandingPage = () => {
    const [stories, setStories] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const saved = localStorage.getItem('saved_flows');
        saved && setStories(JSON.parse(saved));
    }, [])

    return (
        <main style={styles.main}>
            <h1>Saved flows</h1>
        </main>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    main: {
        padding: 16
    },
    card: {
        margin: 10, borderRadius: 3
    }
}

export default LandingPage;