import React from 'react'
import { Card, Image, Menu } from 'semantic-ui-react'
import moment from 'moment'

const formatDate = date => {
  date = moment(date)
  let str = ''
  if (date.isBefore(moment().add(7, 'days'), 'day')) {
    str = date.fromNow()
  } else if (date.isSame(moment(), 'year')) {
    str = date.format('MMMM D')
  } else {
    str = date.format('MMMM D, YYYY')
  }
  return str.toUpperCase()
}

const Post = ({ url, owner_email, ts }) => {
  return (
    <Card>
      <Image src={url} />
      <Card.Content>
        <Card.Header>{owner_email}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Menu secondary size="tiny">
          <Menu.Item fitted>
            <span title={moment(ts).format('dddd, MMMM Do YYYY, h:mm a')}>
              {formatDate(ts)}
            </span>
          </Menu.Item>
        </Menu>
      </Card.Content>
    </Card>
  )
}

const Feed = ({ entries }) => {
  return (
    <Card.Group itemsPerRow={3} stackable>
      {entries.map(entry => {
        return <Post key={entry._id} {...entry} />
      })}
    </Card.Group>
  )
}

export default Feed
