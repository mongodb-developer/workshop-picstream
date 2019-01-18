import React, { Component } from 'react'

import { Segment, Form, Message, Grid, Header } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      userInput: { ...prevState.userInput, [name]: value }
    }))
  }

  render() {
    const {
      errorMessage,
      userInput: { email, password }
    } = this.state

    const { loginUser } = this.props

    return (
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" textAlign="center">
            Log-in to your account
          </Header>
          <Form
            size="large"
            onSubmit={() => {
              loginUser(email, password).catch(err => {
                this.setState({ errorMessage: err.message })
              })
            }}
          >
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                required
                placeholder="E-mail Address"
                defaultValue={email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                required
                placeholder="Password"
                defaultValue={password}
                onChange={this.handleChange}
              />
              <Message
                hidden={!errorMessage}
                negative
                header="Login Failed"
                content={errorMessage}
              />
              <Form.Button type="submit" primary fluid size="large">
                Log In
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
