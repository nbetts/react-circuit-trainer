import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Notifications = (props) => {
  const { notifications } = props;

  return (
    <div className="card">
      <div className="card-body p-0">
        <h2 className="card-title m-4">Latest Updates</h2>
        <div className="list-group list-group-flush">
          { notifications && notifications.map(notification => {
            return (
              <Link key={notification.id} to={`/${notification.category}/${notification.documentId}`}
                className="list-group-item list-group-item-action flex-column align-items-start px-4">
                <p className="mb-1">{notification.user} {notification.content}</p>
                <small>{moment(notification.time.toDate()).fromNow()}</small>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Notifications