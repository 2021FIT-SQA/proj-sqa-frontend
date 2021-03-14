import React, {useCallback, useMemo, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid';

import { Card } from 'antd'
import { TeacherTableComponent } from '../teacher/components/teacher-table/TeacherTable'
import { TeacherFilterComponent } from './components/filter/TeacherFilter';

import { getTeachers } from 'redux/actions/teacher.action'
import teacherApi from 'api/teacherApi';

const TeacherContainer = () => {

    // TODO: Build custom loading to be independent on redux
    const [teacherList, setTeacherList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        keyword: '',
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [loading, setLoading] = useState(false)

    // featch teacher api
    const fetchTeacherList = (paramsString) => {
        try {
            setLoading(previous => true);

            teacherApi.getTeachers(paramsString).then(data => {
                const { content, pageable, totalElements } = data;
                const teacherToDisplay = content.map(ele => {
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
                })
                setTeacherList(teacherToDisplay);
                setPagination( previous => {
                    return {
                        ...previous,
                        current: pageable.pageNumber + 1,
                        pageSize: pageable.pageSize,
                        total: totalElements
                    }
                })
                setLoading(previous => false)
            })
        } catch (error) {
            throw error
        }
    }

    // did mount every params changes
    useEffect(() => {
        fetchTeacherList(queryString.stringify(params));
    }, [params])

    // TODO: filters on table changing
    const handlePagination = (paginate, filters) => {
        console.log('filter', filters)
        fetchTeacherList(queryString.stringify({
            page: paginate.current,
            size: paginate.pageSize
        }))
    }

    const handleFinish = (values) => {
        const {keyword} = values;
        setParams(previous => {
            return {
                ...previous,
                keyword: keyword
            }
        })
    }
    
    const handleReset =  () => {
        setParams(previous => {
            return {
                ...previous,
                keyword: ''
            }
        })
    }

    return (
        <div>
            <Card>
                <TeacherFilterComponent 
                    keyword={params.keyword}
                    onFinish={handleFinish}
                    onReset={handleReset}

                />
                <TeacherTableComponent 
                    data={teacherList}
                    onChange={handlePagination}
                    loading={loading}
                    pagination={pagination}
                />
            </Card>
        </div>
    )
}

export default TeacherContainer
