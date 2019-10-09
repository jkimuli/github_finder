import React from 'react'

const Alert = ({alert}) => {
    return (
        alert!== null && <div className={`alert alert-${alert.level}`}>
            {alert.message}
        </div>
    )
}

export default Alert
