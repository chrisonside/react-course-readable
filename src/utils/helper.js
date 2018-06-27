  // Note - I'm not going to use these as a helper file - just keeping a note of them for easy use in my code. 
  // No point having them as a helper file, as I'd want to do stuff inside (rather than just console log data)

  getCategories() {
    API.getCategories().then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  getAllPosts() {
    API.getAllPosts().then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  getPostByCategory(category) {
    API.getPostByCategory(category).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  getPostById(id) {
    API.getPostById(id).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  getAllCommentsForPost(id) {
    API.getAllCommentsForPost(id).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  getCommentById(id) {
    API.getCommentById(id).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  addPost(title, body, author, category) {
    API.addPost(title, body, author, category).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  addComment(body, author, parentId) {
    API.addComment(body, author, parentId).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  voteOnPost(id, option) {
    API.voteOnPost(id, option).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  voteOnComment(id, option) {
    API.voteOnComment(id, option).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  editPost(id, title, body) {
    API.editPost(id, title, body).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  editComment(id, timestamp, body) {
    API.editComment(id, timestamp, body).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

  deletePost(id) {
    API.deletePost(id).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }

   deleteComment(id) {
    API.deleteComment(id).then((data) => {
      console.log(data)
    }).catch(error => {
      this.setState({ errorMessage: 'Sorry, there is a problem retrieving your data G. Please try again later.' });
    })
  }
  