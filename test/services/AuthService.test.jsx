import { loginUser, registerUser, logoutUser } from '@/services/AuthService';
import apiCliente from '@/services/ApiClient';
import * as TokenUtils from '@/utils/TokenUtils';

vi.mock('@/services/ApiClient', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('@/utils/TokenUtils', () => ({
  setToken: vi.fn(),
  removeToken: vi.fn(),
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loginUser sets token and returns data', async () => {
    const credentials = { username: 'test', password: '1234' };
    const mockData = { token: 'abc123', username: 'test' };
    apiCliente.post.mockResolvedValueOnce({ data: mockData });

    const result = await loginUser(credentials);

    expect(apiCliente.post).toHaveBeenCalledWith('/auth/login', credentials);
    expect(TokenUtils.setToken).toHaveBeenCalledWith('abc123');
    expect(result).toEqual(mockData);
  });

  it('registerUser posts user data and returns response', async () => {
    const userData = { username: 'new', password: 'test' };
    const mockResponse = { id: 1, username: 'new' };
    apiCliente.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await registerUser(userData);

    expect(apiCliente.post).toHaveBeenCalledWith('/auth/register', userData);
    expect(result).toEqual(mockResponse);
  });

  it('logoutUser removes token and redirects to login', () => {
    delete window.location;
    window.location = { href: '' };

    logoutUser();

    expect(TokenUtils.removeToken).toHaveBeenCalled();
    expect(window.location.href).toBe('/login');
  });
});
