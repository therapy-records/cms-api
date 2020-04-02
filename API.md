# Therapy Records API docs

## **GraphQL API**

[GraphQL Schema](https://github.com/therapy-records/cms-api/blob/master/config/graphql/schema.js)

### Press Queries

#### Get all Press

```js
{
  press {
    _id,
    author,
    title,
    excerpt,
    releaseDate
  }
}
```

#### Get single Press

```js
query($id: ID!) {
  pressArticle(_id: $id) {
    _id,
    author,
    title,
    excerpt,
    externalLink,
    releaseDate
  }
}
```

### Press Mutations

#### Create Press

```js
mutation($input: PressInput) {
  createPress(input: $input) {
    author,
    title,
    excerpt,
    externalLink,
    releaseDate
  }
}
```

#### Edit Press

```js
mutation($id: ID!, $input: PressInput) {
  editPress(_id: $id, input: $input) {
    _id,
    author,
    title,
    excerpt,
    externalLink,
    releaseDate
  }
}
```

#### Delete Press

```js
mutation($id: ID!) {
  deletePress(_id: $id) {
    _id
  }
}
```

### Collaborators Queries

#### Get all Collaborators

```js
{
  collaborators {
    _id,
    name,
    avatarUrl
  }
}
```

#### Get single Collaborator

```js
query($id: ID!) {
  collaborator(_id: $id) {
    _id,
    name,
    role,
    about,
    avatarUrl,
    collabOn,
    urls {
      website,
      facebook,
      instagram,
      twitter,
      soundcloud,
      bandcamp,
      bio,
      email,
      phone
    }
  }
}
```

### Collaborator Mutations

#### Create Collaborator

```js
mutation($input: CollaboratorInput) {
  createCollaborator(input: $input) {
    name,
    avatarUrl,
    collabOn,
    role,
    about
  }
}
```

#### Edit Collaborator

```js
mutation($id: ID!, $input: CollaboratorInput) {
  editCollaborator(_id: $id, input: $input) {
    _id,
    name,
    avatarUrl,
    collabOn,
    role,
    about
  }
}
```

#### Delete Collaborator

```js
mutation($id: ID!) {
  deleteCollaborator(_id: $id) {
    _id
  }
}
```


### Gigs Queries

#### Get all Gigs

```js
{
  gigs {
    _id,
    title,
    location,
    venue,
    date,
    ticketsUrl
  }
}
```

#### Get single Gig

```js
query($id: ID!) {
  gig(_id: $id) {
    _id,
    title,
    location,
    venue,
    date,
    ticketsUrl
  }
}
```

### Gigs Mutations

#### Create Gig

```js
mutation($input: GigInput) {
  createGig(input: $input) {
    title,
    location,
    date,
    venue,
    ticketsUrl
  }
}
```

#### Edit Gig

```js
mutation($id: ID!, $input: GigInput) {
  editGig(_id: $id, input: $input) {
    _id,
    title,
    location,
    date,
    venue,
    ticketsUrl
  }
}
```

#### Delete Gig

```js
mutation($id: ID!) {
  deleteGig(_id: $id) {
    _id
  }
}
```

## **REST API**

### **Health check**

- GET `public/health-check`
  - returns 200 with 'OK' string
  
## **News**

- GET `api/news`
  - returns 200 with an array of objects

- POST `api/news`
  - returns 200 with saved article object
  - expects an object containing at least:
  
  ```js
  {
    title: 'my title',
    bodyMain: '<p>amazing article</p>'
  }
  ```

  See [news schema](https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.

## **News Articles**

- GET `api/news/:id`
  - returns 200 with an object

- DELETE `api/news/:id`
  - returns 200 with a success message

- PUT `api/news/:id`
  - returns 200 with saved article object
  - expects an object, example below

  ```js
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

  See [news schema](https://github.com/therapy-records/cms-api/blob/master/server/models/newsSchema.js) for optional fields.

## **Journalism**

- GET `api/journalism`
  - returns 200 with an array of objects

- POST `api/journalism`
  - returns 200 with the saved object
  - expects an object containing at least:

  ```js
  {
    title: 'My title',
    copy: '<p>fantastic review...</p>',
    imageUrl: 'me.com/profile.png',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)',
    externalLink: 'google.com/an-article'
  }
  ```

  See [journalism schema](https://github.com/therapy-records/cms-api/blob/master/server/models/journalism.model.js) for optional fields.

## **Journalism - single**

### **Single journalism article**

- GET `api/journalism/:id`
  - returns 200 with an object

- DELETE `api/journalism/:id`
  - returns 200 with a success message

- PUT `api/journalism/:id`
  - returns 200 with saved article object
  - expects an object containing at least:

  ```js
  {
    title: 'My title',
    copy: '<p>fantastic review...</p>',
    imageUrl: 'me.com/profile.png',
    releaseDate: 'Mon Apr 02 2018 11:34:54 GMT+0100 (BST)',
    externalLink: 'google.com/an-article'
  }
  ```

  See [journalism schema](https://github.com/therapy-records/cms-api/blob/master/server/models/journalism.model.js) for optional fields.
