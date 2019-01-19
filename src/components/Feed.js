import React from 'react'
import { Card, Image, Menu, Comment } from 'semantic-ui-react'
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

const Post = ({ url, owner_email, ts, caption }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{owner_email}</Card.Header>
      </Card.Content>
      <Image src={url} />
      <Card.Content>
        <Card.Description>
          <Comment.Group size="small">
            <Comment>
              <Comment.Content>
                <Comment.Author>{owner_email}</Comment.Author>
                <Comment.Text>{caption}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Menu secondary size="mini">
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
