import * as React from 'react';
import { Card, Row, Col, Skeleton, notification } from 'antd';
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
        isLoading ? <Skeleton active /> : <Row justify='start' align='middle'>
            <Col span={4}>
                <Link to='/home'>
                    <Card
                        hoverable
                        style={styles.card}
                    >
                        <Meta
                            title="+ Add New"
                        />
                    </Card>
                </Link>
            </Col>
            {stories.map((item: any) =>
                <Col span={4}>
                    <Link to={`/home/${item.id}`}>
                        <Card
                            hoverable
                            style={styles.card}
                            cover={
                                <img
                                    style={{ width: 225, height: 165, borderStartStartRadius: 3 }}
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
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        margin: 10, borderRadius: 3
    }
}

export default LandingPage;