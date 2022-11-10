// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;


// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.get("/", function (req, res) {
  res.send("<h1>Hola! estas en Home</h1>");
});

server.post("/posts", function (req, res) {
  
  if (!req.body.author) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'No se ha especificado un autor'
    }
    res.json(error);
  } else if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'No se ha especificado un titulo'
    }
    res.json(error);
  } else if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'No se ha especificado el contenido'
    }
    res.json(error);
  } else {
    const Post = {
      id: posts.length + 1,
      author: req.body.author,
      title: req.body.title,
      contents: req.body.contents,
    };
    posts.push(Post);
    res.json(Post);
  }
});

server.post("/posts/author/:author", (req, res) => {
  if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'No se ha especificado un titulo'
    };
    res.json(error);
  } else if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'No se ha especificado el contenido'
    };
    res.json(error);
  } else {
    const Post = {
      id: posts.length + 1,
      author: req.params.author,
      title: req.body.title,
      contents: req.body.contents,
    };
    posts.push(Post);
    res.json(Post);
  }
});

server.get("/posts", (req, res) => {
  if (req.query.term) {
    const term = req.query.term;
    let result = posts.filter((p) => {
      return p.title.includes(term) || p.contents.includes(term);
    });
    res.json(result);
  } else {
    res.json(posts);
  }
});

server.get("/posts/:author", (req, res) => {
  const author = req.params.author;
  let postByAuthor = posts.filter((p) => {
    return p.author === author;
  });
  if (postByAuthor.length > 0) res.json(postByAuthor);
  else {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: "No existe ningun post del autor indicado",
    };
    res.json(error);
  }
});

server.get("/posts/:author/:title", (req, res) => {
  const author = req.params.author;
  const title = req.params.title;
  let postByAuthorAndTitle = posts.filter((p) => {
    return p.author === author && p.title === title;
  });
  if (postByAuthorAndTitle.length > 0) res.json(postByAuthorAndTitle);
  else {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: "No existe ningun post con dicho titulo y autor indicado",
    };
    res.json(error);
  }
});

server.put("/posts", (req, res) => {
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'Falta el parametro ID'
    };
    res.json(error);
  } else if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'Falta el parametro title'
    };
    res.json(error);
  } else if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'Falta el parametro contents'
    };
    res.json(error);
  } else {
    // let id = req.body.id;
    // let title = req.body.title;
    // let contents = req.body.contents;

    let postToModify = posts.find((p) => p.id === req.body.id);
    if (!postToModify) {
      res.status(STATUS_USER_ERROR);
      const error = {
        error: "El ID no corresponde a un post existente",
      };
      res.json(error);
    } else {
      postToModify.title = req.body.title;
      postToModify.contents = req.body.contents;
      res.json(postToModify);
    }
  }
});

server.delete('/posts', (req, res) => {
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    const error = {
      error: 'Falta el parametro ID'
    };
    res.json(error)
  } else {
    let id = req.body.id;
    let postToDelete = posts.find((p) => p.id === id);
    if (!postToDelete) {
      res.status(STATUS_USER_ERROR);
      const error = {
        error: 'El ID no corresponde a un post existente'
      };
      res.json(error);
    } else {
      const index = posts.indexOf(postToDelete);
      posts.splice(index, 1);

      const success = {
        success: true
      };
      res.send(success);
    }
  }
});

server.delete('/author', (req, res) => {
  let {author} = req.body;
  const author_found = posts.find(p => p.author === author);
  if (!author || !author_found) {
    res.status(STATUS_USER_ERROR).json({error:'No existe el autor indicado'})
  }
  // deletedPosts = posts.filter(p => p.author === author);
  // posts = posts.filter(p => p.author !== author);
  // res.json(deletedPosts);

  let deletedPosts = [];
  posts.filter(p => {
    if (p.author !== author) return true;
    else deletedPosts.push(p)
  });
  res.json(deletedPosts);
});


module.exports = { posts, server };
