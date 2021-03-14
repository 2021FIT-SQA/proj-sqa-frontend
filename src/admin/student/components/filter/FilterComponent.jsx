import React from 'react'
import { Form, Row, Col, Input, Button} from 'antd';


export const FilterComponent = ({keyword, onFinish, onReset}) => {
    return (
        <Form className="search-form" onFinish={onFinish}>
            <Row style={{width: '100%'}}>
                <Col span={ keyword === null || keyword === "" ? 21 : 18 }>
                    <Form.Item name="keyword">
                        <Input
                            type="text"
                            placeholder='Filter by student id, name, email, phone number' /> 
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Button type="primary" htmlType="submit">Search</Button>
                </Col>
                {
                    keyword 
                    &&
                    <Col span={3}>
                        <Button 
                            onClick={onReset}
                            style={{marginRight: 3}}
                        >
                            Clear
                        </Button>
                    </Col>
                }
            </Row>
        </Form>
    );
};

