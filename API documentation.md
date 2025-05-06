The backend will be available at `http://127.0.0.1:5002` and `http://localhost:5002/api/posts`.

### API Documentation

The API documentation is available at `http://127.0.0.1:5002/api/docs`. The Swagger documentation defines the following endpoints:

#### User API

- **Register User**

  ```http
  POST /register
  ```

  **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

  **Responses:**
  - **201 Created:** User registered successfully
  - **400 Bad Request:** Invalid input

- **Login**

  ```http
  POST /login
  ```

  **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

  **Responses:**
  - **200 OK:** Login successful with `access_token`
  - **401 Unauthorized:** Invalid username or password

#### Post API

- **Get Posts**

  ```http
  GET /api/posts
  ```

  **Query Parameters:**
  - `sort` (optional): Field to sort by (`title`, `content`, `author`, `date`)
  - `direction` (optional): Sort direction (`asc`, `desc`)
  - `page` (optional): Page number
  - `per_page` (optional): Number of posts per page

  **Responses:**
  - **200 OK:** Returns all posts

- **Add Post**

  ```http
  POST /api/posts
  ```

  **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string",
    "date": "YYYY-MM-DD"
  }
  ```

  **Responses:**
  - **201 Created:** Post created successfully
  - **400 Bad Request:** Invalid input

- **Update Post**

  ```http
  PUT /api/posts/{id}
  ```

  **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string",
    "date": "YYYY-MM-DD"
  }
  ```

  **Responses:**
  - **200 OK:** Post updated successfully
  - **404 Not Found:** Post not found

- **Delete Post**

  ```http
  DELETE /api/posts/{id}
  ```

  **Responses:**
  - **200 OK:** Post deleted successfully
  - **404 Not Found:** Post not found

- **Search Posts**

  ```http
  GET /api/posts/search
  ```

  **Query Parameters:**
  - `title` (optional): Search term for title
  - `content` (optional): Search term for content
  - `author` (optional): Search term for author
  - `date` (optional): Search term for date

  **Responses:**
  - **200 OK:** Returns filtered posts

### Security

Some endpoints require authentication via a Bearer token. Include the token in the `Authorization` header of your requests:

```
Authorization: Bearer <your_access_token>
``` 

