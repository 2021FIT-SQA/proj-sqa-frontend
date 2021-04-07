import React, { Fragment, useEffect, useState } from 'react';
import './style.scss';
import { Row, Col, Card, Avatar, Spin, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import convertDateTimeArrToString from '../../../../utils/dateConverter.js';

const StudentInfo = ({ student, loading }) => {

    const buildInfoRow = (title, value) => (
        <Row style={{
            marginTop: '2rem',
            marginBottom: '2rem',
            borderBottom: '1px solid #eee',
            paddingBottom: '2rem'
        }}>
            <Col span={8} style={{paddingRight: 10}}>{title}</Col>
            <Col span={16}>{value}</Col>
        </Row>
    );
    const nameLetter = student ? student.firstName.split('').shift() : 'A';
    const studentName = student ? `${student.lastName} ${student.firstName}` : 'Student Name';
    const birthday = student ? convertDateTimeArrToString(student.dob, 'DATE') : 'dd/mm/yyyy';
    const department = student ? `${student.department.name} - ${student.department.code}` : '';

    return loading ? (
        <Spin />
    ) : (
        <Fragment>
            <Row style={{marginBottom: '1rem'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/admin/students">Student</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="">Detail</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row gutter={8}>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={8}
                    xl={8}
                >
                    <Card
                        cover={
                            <Avatar
                                style={{
                                    backgroundColor: '#f56a00',
                                    borderRadius: '50%',
                                    width: '156px',
                                    height: '156px',
                                    margin: 'auto',
                                    marginTop: '1rem',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}  
                                size="large"
                            >
                            {React.createElement(
                                'span',
                                {
                                    style: {
                                        fontSize: '5rem'
                                    }
                                },
                                nameLetter
                            )}
                          </Avatar>
                        }
                    >
                        <Card.Meta title={studentName} style={{ textAlign: 'center'}} />
                        { 
                            student && 
                            <>
                                {buildInfoRow("StudentID:", student.username)}
                                {buildInfoRow("Birthday:", birthday)}
                            </>
                        }      
                    </Card>
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={16}
                    xl={16}
                >
                    <Card
                        title={`Detail information of ${student?.username}`}
                    >
                        { 
                            student && 
                            <>
                                {buildInfoRow("StudentID:", student.username)}
                                {buildInfoRow("Fulllname:", studentName)}
                                {buildInfoRow("Gender:", student.gender)}
                                {buildInfoRow("Email:", student.email)}
                                {buildInfoRow("Department:", department)}
                                {buildInfoRow("Year:", student.sinceYear)}
                                {buildInfoRow("Phone:", student.phoneNumber)}
                                {buildInfoRow("Birthday:", birthday)}
                                {buildInfoRow("Address:", student.fullAddress)}
                            </>
                        }                   
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default StudentInfo
