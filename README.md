# Minify

Minify is a simple URL shortening service built using Node.js and PostgreSQL. It provides three endpoints - for shortening, redirecting, and retrieving statistics for shortened URLs. The service is implemented using the NestJS framework.

## Endpoints

### 1. Shorten URL

**Endpoint**: `POST /`

This endpoint allows you to shorten a URL. You can make a POST request to this endpoint with a JSON payload containing the URL you want to shorten.

**Request:**

```json
POST / HTTP/1.1
Content-Type: application/json

{
  "url": "https://www.example.com/very-long-url-you-want-to-shorten"
}
```

**Response:**

The response will be the shortened URL, which you can use to redirect to the original URL.

### 2. Redirect to Original URL

**Endpoint**: `GET /:shortCode`

This endpoint is used to redirect to the original URL associated with a short code. When you access this endpoint with the short code, it will redirect you to the original URL.

**Request:**

```
GET /abc123
```

- `abc123` in the URL is the short code generated for a specific original URL.

### 3. Get URL Statistics

**Endpoint**: `GET /stats/:shortCode`

This endpoint allows you to retrieve statistics about a shortened URL. When you access this endpoint with the short code, it will return details about the original URL, such as the number of times it has been accessed, creation date, and other relevant information.

**Request:**

```
GET /stats/abc123
```

- `abc123` in the URL is the short code for which you want to retrieve statistics.
