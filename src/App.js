import React, { Component } from 'react'
import {
  Header,
  Icon,
  Container,
  Menu,
  Message,
  Button
} from 'semantic-ui-react'
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import {
  AwsServiceClient,
  AwsRequest
} from 'mongodb-stitch-browser-services-aws'
import BSON from 'bson'

import Login from './components/Login'
import Feed from './components/Feed'
import UploadModal from './components/UploadModal'

import SampleData from './sample_data'

const pacificoFont = {
  fontFamily: "'Pacifico', cursive"
}

const githubButtonStyle = {
  position: 'fixed',
  margin: '1em',
  top: 0,
  right: 0,
  zIndex: 6
}

const convertImageToBSONBinaryObject = file => {
  return new Promise(resolve => {
    var fileReader = new FileReader()
    fileReader.onload = event => {
      var eventBinary = new BSON.Binary(new Uint8Array(event.target.result))
      resolve(eventBinary)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

class App extends Component {
  constructor(props) {
    super(props)
    // Exercise 2
    // TODO: Paste your Stitch App ID from the Stitch Admin Console here.
    this.appId = ''

    this.state = {
      isAuthed: false,
      email: '',
      entries: []
    }
  }

  componentDidMount = async () => {
    // Exercise 2
    // TODO: Initialize the Stitch App Client

    // Exercise 4
    // TODO: Initialize the RemoteMongoClient

    // Exercise 3
    // TODO: Initialize the AWS Service Client

    // Exercise 2
    // TODO: Change the following line to check if
    // client is already logged in.
    const isAuthed = false
    if (isAuthed) {
      const email = this.client.auth.user.profile.email
      const entries = await this.getEntries()
      this.setState({ isAuthed, email, entries })
    }

    // MOCK START
    // TODO: Remove this as part of Exercise 2
    this.client = {
      auth: {
        user: {
          id: '12345',
          profile: {
            email: ''
          }
        }
      }
    }
    // MOCK END
  }

  login = async (email, password) => {
    const { isAuthed } = this.state

    if (isAuthed) {
      return
    }
    // Exercise 2
    // TODO: Use the client to log in

    const entries = await this.getEntries()
    this.setState({
      isAuthed: true,
      email,
      entries
    })
  }

  logout = async () => {
    // Exercise 2
    // TODO: Use the client to log out

    this.setState({ isAuthed: false, email: '', entries: [] })
  }

  getEntries = async () => {
    // Exercise 4
    // TODO: Replace the following with a MongoDB Query to grab all entries,
    // sorted by ts descending. This function should return a Promise.
    return new Promise(resolve => {
      resolve(SampleData)
    })
  }

  handleFileUpload = async (file, caption) => {
    if (!file) {
      return
    }

    const saveFileResult = await this.saveFile(file)

    const saveEntryResult = await this.saveEntry(caption, saveFileResult)

    const entries = await this.getEntries()
    this.setState({ entries })

    return saveEntryResult
  }

  saveFile = async file => {
    const key = `${this.client.auth.user.id}-${file.name}`
    // Exercise 3
    // TODO: Replace the value of bucket with the name of your S3 bucket
    const bucket = 'your-bucket-name'
    const url = `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`

    // The following BSON Binary Object can be used a the body of the request.
    const bsonFile = await convertImageToBSONBinaryObject(file)

    // Exercise 3
    // TODO: Replace with a function to execute an AWS S3 Request
    // You will need to setup the args and build the request.
    const s3Result = { ETag: '12345' }

    return {
      url,
      file: {
        name: file.name,
        type: file.type
      },
      s3: {
        bucket,
        key,
        ETag: s3Result.ETag
      }
    }
  }

  saveEntry = async (caption, s3Data) => {
    // Exercise 4
    // TODO: Replace with a MongoDB query to insert data into
    // the stream collection. The function should return a Promise.
    return new Promise(resolve => {
      resolve({
        insertedId: '12345'
      })
    })
  }

  render() {
    const { isAuthed, email, entries } = this.state
    return (
      <Container style={{ marginTop: '1em' }}>
        <Header as="h1" textAlign="center">
          <Header.Content>
            <Icon name="camera retro" />{' '}
            <span style={pacificoFont}>PicStream</span>
            <Header.Subheader>
              Built using MongoDB Stitch and AWS S3
            </Header.Subheader>
          </Header.Content>
        </Header>
        {isAuthed ? (
          <Container>
            <Menu borderless size="small" stackable>
              <Menu.Item header>Welcome, {email}</Menu.Item>
              <Menu.Item>
                <UploadModal handleFileUpload={this.handleFileUpload} />
              </Menu.Item>
              <Menu.Item
                position="right"
                content="Logout"
                onClick={this.logout}
              />
            </Menu>
            {entries.length > 0 ? (
              <Feed entries={entries} />
            ) : (
              <Message color="blue" header="No Entries Found ☹️" />
            )}
          </Container>
        ) : (
          <Login loginUser={this.login} />
        )}
        <div style={githubButtonStyle}>
          <Button
            as="a"
            href={`https://github.com/aydrian/workshop-picstream/`}
            icon="github"
            content="Source"
            secondary
            target="_blank"
          />
        </div>
      </Container>
    )
  }
}

export default App
