import React, { useState }from 'react'
import { Form, Row, Col, Input, Button} from 'antd';


const filters = ['id', 'name', 'email', 'phone'];
const labels = ['Student ID', 'Name', 'Email', ' Phone'];

export const FilterComponent = ({keyword, onFinish, onReset}) => {
    return (
        <Form className="search-form" onFinish={onFinish}>
            <Row style={{width: '100%'}}>
                <Col span={18}>
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

export const advancedForm = () => {
    const getFields = () => {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
          };
        const children = [];

        filters.map((filter, i) => (
            children.push(
                <Col span={12} key={i}>
                  <Form.Item {...formItemLayout} name={filter} label={labels[i]}>
                      <Input placeholder={labels[i]} />
                  </Form.Item>
                </Col>
            )));
        return children;
    }

    const onFinish = () => {

    }
    const onReset = () => {

    }

    return (
        <Form className="search-form" onFinish={onFinish}>
            <Row gutter={40}>{getFields()}</Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Search</Button>
                    <Button style={{ marginLeft: 8 }} onClick={onReset}>
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
