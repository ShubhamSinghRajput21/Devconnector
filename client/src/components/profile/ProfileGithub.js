import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "ba4f5c67f731faf99c93",
      clientSecret: "ae120d216be0673098754e0a3c5d1b2c53d1a96d",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.props;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myRef) {
          this.setState({
            repos: data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map((repo) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" traget="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.Forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3>Latest Github Repositories</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
