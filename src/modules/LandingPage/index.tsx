import * as React from 'react';
import { Card, Row, Col, notification } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios'

const { Meta } = Card;
const LandingPage = () => {
    const [stories, setStories] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        axios.get('https://5fc9f0533c1c2200164414bd.mockapi.io/stories').then((res) => {
            setStories(res.data)
        })
            .catch((error) => {
                notification.open({
                    message: 'Error!',
                    description: 'Please try again later',
                });
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div style={{ height: 'calc(100vh - 64px)' }}>
            <Row justify='start' align='middle'>
                <Col key='initial' span={4}>
                    <Link to='/home'>
                        <Card
                            hoverable
                            style={styles.card}
                            loading={isLoading}
                        >
                            <Meta
                                title="+ Add New"
                            />
                        </Card>
                    </Link>
                </Col>
                {stories.map((item: any, index: number) =>
                    <Col key={index} span={4}>
                        <Link to={`/home/${item.id}`}>
                            <Card
                                hoverable
                                style={styles.card}
                                cover={
                                    <img
                                        style={{ borderStartStartRadius: 3 }}
                                        alt="example"
                                        src={item.cover}
                                    />
                                }
                            >
                                <Meta
                                    title={item.title}
                                    description={item.description}
                                />
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        margin: 10, borderRadius: 3
    }
}

export default LandingPage;