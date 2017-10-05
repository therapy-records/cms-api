# Therapy Records API docs


## Misc
#### Health check
- GET `api/health-check`
  - returns 200 with 'OK' string
  
## News
#### Articles that are or can be live right now
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
  - expects an object containing at least:
  ```
  {
    title: 'my title',
    bodyMain: '<p>amazing article</p>'
  }
  ```
  See (news schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.


## News Queue
#### Articles that will be posted in the future
- GET `api/news/queue`
  - returns 200 with an array of objects

- POST `api/news/queue`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    title: 'my title',
    bodyMain: '<p>amazing article</p>',
    scheduledTime: '2017-10-04T20:53:00+00:00'
  }
  ```
  See (news schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.


## News Article Queue
#### Articles that will be posted in the future
- DELETE `api/news/queue/:id`
  - returns 200 with a success message

- PUT `api/news/queue/:id`
  - returns 200 with saved article object
  - expects an object containing at least:
  ```
  {
    title: 'my title',
    bodyMain: '<p>amazing article</p>',
    scheduledTime: '2017-10-04T20:53:00+00:00'
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
    mainImageUrl: 'me.com/profile.png',
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
    mainImageUrl: 'me.com/profile.png',
    externalLink: 'google.com/an-article'
  }
  ```
  See (press schema)(https://github.com/therapy-records/cms-api/blob/master/server/models/press.model.js) for optional fields.

