import React from 'react'
import {Link} from 'react-router-dom'
import './LandingComponent.styles.scss';

const LandingComponent = () => {
    return (
        <div>
            <Link to='/login'>
                Login
            </Link>
        </div>
    )
}

export default LandingComponent
