import React from 'react'
import './LandingComponent.styles.scss'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

const LandingComponent = ({isAuthenticated}) => {

    if (isAuthenticated) {
        return <Redirect to='/admin' />;
    }
    
    return (
        <div>
            {/* Code here */}
            <Link to='/login'><button>Login</button></Link>
            
        </div>
    )
}

LandingComponent.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(LandingComponent)
