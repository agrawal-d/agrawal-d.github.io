import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import config from './config'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiEndpoint: config.apiEndpoint,
      username: config.username,
      profile: null,
      loading: true,
      repositories: null
    }

    axios.get(`${this.state.apiEndpoint}/users/${this.state.username}`).then((response => {
      this.setState({
        profile: response.data,
      })
    })).then(() => { return axios.get(this.state.profile.avatar_url, { responseType: 'blob' }) }).then((response) => {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          loading: false,
          avatar: reader.result

        })
      }
      reader.readAsDataURL(response.data);

    })
      .then(() => {
        return axios.get(this.state.profile.repos_url)
      })
      .then((response) => {
        this.setState({
          repositories: response.data
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
  }

  render() {
    if (this.state.error) {
      return (
        <Container className="main">
          <Row>
            <Col className="text-center">
              <Alert variant="warning">
                Error Connecting to github api.
                  <p>{this.state.error.response.data.message || "No additional info available"}</p>
              </Alert>

            </Col>
          </Row>
        </Container>

      )
    }
    if (this.state.loading) {

      return (
        <Container className="main">
          <Row>
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </Container>
      )
    } else {
      if (this.state.repositories) {
        var repos = this.state.repositories;
        var repoContainer = [];
        for (var element of repos) {
          var tmp = (
            <Col md="4" className="repo-col">
              <Card key={element.id} className="repo-card">
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>
                    {element.description || "No descreption is available for this repository."}
                    <br/>
                    <a href={element.html_url}>
                      Check it out...
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card></Col>

          )
          repoContainer.push(tmp);
        }
        console.log("OOF")
      } else {
        repoContainer = (<Col className="text-center">
          <Spinner animation="border" role="status"></Spinner>
        </Col>)
      }
      return (
        <Container className="main">
          <Row>
            <Col md="4">
              <Image src={this.state.avatar} alt="Profile" className="profile-pic" rounded />
            </Col>
            <Col>
              <h1>Hi, I am {this.state.profile.name}.</h1>
              <p>Welcome to my website. It is just a wrapper for Github API calls. You can find my repositories and other stuff here.</p>
              <hr />
              <a href={this.state.profile.url}>
                <Button>Head to my Github Profile</Button>&nbsp;

              </a>
              <a href="mailto:agrawal.divyanshu@outlook.com">
                <Button variant="success">Email Me</Button>
              </a>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h2>My Repositories</h2>
              <br/>
              <Row>
                {repoContainer}
              </Row>
            </Col>
          </Row>
        </Container>
      )
    }

  }
}


function App() {
  return (
    <Content config={config} />
  );
}

export default App;
