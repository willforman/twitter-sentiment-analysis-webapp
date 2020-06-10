import React, { Component } from 'react';

class GithubLink extends Component {
    render() {
        const cssStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            marginBottom: "100px"
        };
        return ( 
            <a 
            href="https://github.com/willforman/Twitter-Sentiment-Analysis-WebApp"
            >
              <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" 
              width="40" height="40"
              style={cssStyle}
              alt="GitHub Logo"
               />
            </a>
        );
    }
}
 
export default GithubLink;