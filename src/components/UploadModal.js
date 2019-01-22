import React, { Component } from 'react'
import {
  Modal,
  Form,
  Input,
  Icon,
  Button,
  Item,
  TextArea,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react'

class UploadModal extends Component {
  constructor(props) {
    super(props)

    this.fileInput = React.createRef()
    this.handleFileUpload = props.handleFileUpload

    this.state = {
      open: false,
      file: null,
      caption: '',
      loading: false,
      errorMessage: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { file, caption } = this.state
    this.setState({ loading: true })
    this.handleFileUpload(file, caption)
      .then(() => {
        this.handleModalClose()
      })
      .catch(err => {
        console.err(err)
        this.setState({ loading: false, errorMessage: err.message })
      })
  }

  handleFileChange = event => {
    event.preventDefault()
    const file = this.fileInput.current.inputRef.files[0]
    if (!file) {
      return
    }
    this.setState({ file })
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      [name]: value
    }))
  }

  handleImageDelete = () => {
    this.setState({ file: null, caption: '' })
  }

  handleModalClose = () =>
    this.setState({
      open: false,
      file: null,
      caption: '',
      loading: false,
      errorMessage: ''
    })

  render() {
    const { file, caption, open, loading, errorMessage } = this.state
    const trigger = (
      <Button
        animated="vertical"
        color="blue"
        onClick={() => this.setState({ open: true })}
      >
        <Button.Content hidden>Share</Button.Content>
        <Button.Content visible>
          <Icon name="plus square outline" />
        </Button.Content>
      </Button>
    )

    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={this.handleModalClose}
        open={open}
        size="tiny"
      >
        <Modal.Header>
          <Icon name="cloud upload" /> Share a Photo
        </Modal.Header>
        <Modal.Content>
          <Dimmer active={loading} inverted>
            <Loader inverted>Uploading</Loader>
          </Dimmer>
          <Message
            hidden={!errorMessage}
            negative
            header="Error"
            content={errorMessage}
          />
          <Form onSubmit={this.handleSubmit}>
            {file ? (
              <Item.Group>
                <Item>
                  <Item.Image
                    src={URL.createObjectURL(file)}
                    size="small"
                    label={{
                      as: 'a',
                      color: 'grey',
                      corner: 'left',
                      icon: 'delete',
                      circular: true,
                      onClick: this.handleImageDelete
                    }}
                  />
                  <Item.Content>
                    <Item.Description>
                      <TextArea
                        name="caption"
                        rows="4"
                        placeholder="Enter a caption."
                        defaultValue={caption}
                        onChange={this.handleChange}
                      />
                    </Item.Description>
                    <Item.Extra>
                      <Button primary type="submit" floated="right">
                        Share
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            ) : (
              <Form.Field>
                <label>Choose a photo</label>
                <Input
                  type="file"
                  accept="image/*"
                  ref={this.fileInput}
                  onChange={this.handleFileChange}
                />
              </Form.Field>
            )}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UploadModal
