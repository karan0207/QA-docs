const { test, expect, request } = require('@playwright/test');

test.describe('API Testing', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET /posts', async () => {
    const response = await apiContext.get('/posts');
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('GET /posts/1', async () => {
    const response = await apiContext.get('/posts/1');
    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
  });

  test('POST /posts', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const response = await apiContext.post('/posts', {
      data: newPost,
    });

    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post.title).toBe(newPost.title);
    expect(post.body).toBe(newPost.body);
    expect(post.userId).toBe(newPost.userId);
  });

  test('PUT /posts/1', async () => {
    const updatedPost = {
      id: 1,
      title: 'foo updated',
      body: 'bar updated',
      userId: 1,
    };

    const response = await apiContext.put('/posts/1', {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
    expect(post.userId).toBe(updatedPost.userId);
  });

  test('DELETE /posts/1', async () => {
    const response = await apiContext.delete('/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
