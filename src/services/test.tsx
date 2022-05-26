/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

describe('api', () => {
  it('should redirect to login when status code is 401', async () => {
    const response = api.interceptors.response as any;

    expect(response.handlers[0].fulfilled({ data: 'test' })).toStrictEqual({
      data: 'test',
    });
    expect(
      response.handlers[0].rejected({
        response: { status: 401 },
      }),
    ).rejects.toMatchObject({});
  });

  it('should reject when status code is 404', async () => {
    const response = api.interceptors.response as any;

    expect(
      response.handlers[0].rejected({
        response: { status: 404 },
      }),
    ).rejects.toMatchObject({});
  });

  it('should reject when status code is 401 and the route is different from /', async () => {
    const response = api.interceptors.response as any;

    global.window = Object.create(window);
    const url = 'http://localhost:3000';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '/login',
      },
    });

    expect(
      response.handlers[0].rejected({
        response: { status: 401, message: 'test' },
      }),
    ).rejects.toMatchObject({});
  });
});