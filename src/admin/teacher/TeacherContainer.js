import React, {useCallback, useMemo, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid';

import { Card } from 'antd'
import { TeacherTableComponent } from '../teacher/components/teacher-table/TeacherTable'

import { getTeachers } from 'redux/actions/teacher.action'

const TeacherContainer = ( {teacher: {teachers, pagination, loading}, getTeachers}) => {

    // TODO: build initial teacher data here
    const [teacherList, setTeacherList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        size: 20
    });

    // featch teacher api
    const fetchTeacherList = async (paramsString) => {
        try {
            // action call
            await getTeachers(paramsString);
            // custom attribute to match column index
            const teacherToDisplay = teachers.map(ele => {
                const { username, firstName,lastName, gender, email, phoneNumber, dob, department } = ele;
                return {
                    key: uuidv4(),
                    username,
                    fullName: `${lastName} ${firstName.split('').splice(0,firstName.indexOf('(')).join('')}`,
                    gender,
                    email,
                    phoneNumber,
                    dob: dob.reverse().join('/'),
                    department: `${department.name} (${department.code})`
                }
            });
            setTeacherList(teacherToDisplay);
        } catch (error) {
            throw error
        }
    }

    // component did mount
    useEffect(() => {
        // first request with params: ?page=1&size=10
        fetchTeacherList(queryString.stringify(params));
    }, [])

    // TODO: need to memoized value on of pagination on table change
    const handlePagination = (paginate) => {
        fetchTeacherList(queryString.stringify({
            page: paginate.current,
            size: paginate.pageSize
        }))
    }

    return loading ? (<div>loadingggg</div>) : (
        <div>
            <Card>
                <TeacherTableComponent 
                    data={teacherList}
                    onChange={handlePagination}
                    pagination={pagination}
                />
            </Card>
        </div>
    )
}



TeacherContainer.propTypes = {
    getTeachers: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    teacher: state.teacher
})

export default connect(mapStateToProps, { getTeachers })(TeacherContainer)
