# Therapy Records API docs


## Misc
#### Health check
- GET `api/health-check`
  - returns 200 with 'OK' string
  
## News
#### Articles that are live
- GET `api/news`
  - returns 200 with an array of objects

- POST `api/news`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    title: 'my title',
    bodyMain: '<p>amazing article</p>'
  }
  ```

  See (news schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.


## News Article
#### Single articles that are live right now
- GET `api/news/:id`
  - returns 200 with an object

- DELETE `api/news/:id`
  - returns 200 with a success message

- PUT `api/news/:id`
  - returns 200 with saved article object
  - expects an object, example below
  ```
  {
    title: 'my title',
    sections: [
      {
        copy: 'hello world',
        videoEmbed: '<iframe />'
        images:  [
          { url: 'test.com/test.jpg' }
        ]
      }
    ]
  }
  ```
  See (news schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.


## Collaborators
- GET `api/collaborators`
  - returns 200 with an array of objects

- POST `api/collaborators`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    name: 'my title',
    role: 'tea boy',
    avatarUrl: 'me.com/profile.png'
  }
  ```

  See (collaborators schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/collaborators.model.js) for optional fields.


## Collaborators - single
#### Single collaborator
- GET `api/collaborators/:id`
  - returns 200 with an object

- DELETE `api/collaborators/:id`
  - returns 200 with a success message

- PUT `api/collaborators/:id`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    name: 'my title',
    role: 'tea boy',
    avatarUrl: 'me.com/profile.png'
  }
  ```
  See (collaborators schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/collaborators.model.js) for optional fields.


## Press
- GET `api/press`
  - returns 200 with an array of objects

- POST `api/press`
  - returns 200 with the saved object
  - expects an object containing at least:
  ```
  {
    author: 'my title',
    copy: '<p>fantastic performance...</p>',
    imageUrl: 'me.com/profile.png',
    externalLink: 'google.com/an-article'
  }
  ```

  See (press schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/press.model.js) for optional fields.


## Press - single
#### Single press article/release
- GET `api/press/:id`
  - returns 200 with an object

- DELETE `api/press/:id`
  - returns 200 with a success message

- PUT `api/press/:id`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    author: 'my title',
    copy: '<p>fantastic performance...</p>',
    imageUrl: 'me.com/profile.png',
    externalLink: 'google.com/an-article'
  }
  ```
  See (press schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/press.model.js) for optional fields.


## Journalism
- GET `api/journalism`
  - returns 200 with an array of objects

- POST `api/journalism`
  - returns 200 with the saved object
  - expects an object containing at least:
  ```
  {
    title: 'My title',
    copy: '<p>fantastic review...</p>',
    imageUrl: 'me.com/profile.png',
    releaseDate: Mon Apr 02 2018 11:34:54 GMT+0100 (BST),
    externalLink: 'google.com/an-article'
  }
  ```

  See (otehr-work schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/journalism.model.js) for optional fields.


## Journalism - single
#### Single journalism article
- GET `api/journalism/:id`
  - returns 200 with an object

- DELETE `api/journalism/:id`
  - returns 200 with a success message

- PUT `api/journalism/:id`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    title: 'My title',
    copy: '<p>fantastic review...</p>',
    imageUrl: 'me.com/profile.png',
    releaseDate: Mon Apr 02 2018 11:34:54 GMT+0100 (BST),
    externalLink: 'google.com/an-article'
  }
  ```
  See (otehr-work schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/journalism.model.js) for optional fields.

