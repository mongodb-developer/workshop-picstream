import React, { Component } from 'react'
import {
  Modal,
  Form,
  Input,
  Icon,
  Button,
  Item,
  TextArea
} from 'semantic-ui-react'

class UploadModal extends Component {
  constructor(props) {
    super(props)

    this.fileInput = React.createRef()
    this.handleFileUpload = props.handleFileUpload

    this.state = {
      open: false,
      file: null,
      caption: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { file, caption } = this.state
    this.handleFileUpload(file, caption)
    this.handleModelClose()
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

  handleModelClose = () =>
    this.setState({ open: false, file: null, caption: '' })

  render() {
    const { file, caption } = this.state
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
        trigger={trigger}
        onClose={this.handleModelClose}
        open={this.state.open}
        size="tiny"
      >
        <Modal.Header>
          <Icon name="cloud upload" /> Share a Photo
        </Modal.Header>
        <Modal.Content>
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
