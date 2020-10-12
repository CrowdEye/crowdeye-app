import React from 'react';
import { Statistic, Row, Col } from 'antd';



function Dashboard () {
    return (
        <>
        <Row gutter={16} style={{marginTop: 16}}>
            <Col span={8}>
                <Statistic title="Total in Store" value={12} />
            </Col>
            <Col span={8}>
                <Statistic title="Total entered" value={25} />
            </Col>
            <Col span={8}>
                <Statistic title="Total left" value={13} />
            </Col>
        </Row>

        </>
    );
}
export default Dashboard;
