import React, { Component } from "react";
import { Table, Tag } from "antd";
import teacherApi from '../../../../api/teacherApi'
import { v4 as uuidv4 } from "uuid";

const columns = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: uuidv4(),
    width: 100,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: uuidv4(),
    width: 105,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: uuidv4(),
    width: 150,
  },
  {
    title: "Rating",
    dataIndex: "index",
    width: 50,
    render: (index) => {
      const color = (Number(index) % 2 === 0) ? 'green' : 'pink';
      const text = (Number(index) % 2 === 0) ? 'excellent' : 'good'
      return (
          <Tag color={color}>
              {text}
          </Tag>
      )
  }
},
];

class TransactionTable extends Component {
  _isMounted = false; 
  state = {
    list: [],
  };
  fetchData = () => {
    teacherApi.getTeachers('page=1&size=13').then((response) => {
      const teachers = response.content.slice(0, 9);
      if (this._isMounted) {
        const list = teachers.map((teacher, index) => {
          return {
            index,
            key: uuidv4(),
            fullName: `${teacher.lastName} ${teacher.firstName}`,
            email: teacher.email,
            department: `${teacher.department.name} (${teacher.department.code})`
        } 
        })
        this.setState({ list });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.list}
        pagination={false}
      />
    );
  }
}

export default TransactionTable;
