
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as UserService from '@/services/UserService';
import apiCliente from '@/services/ApiClient';

vi.mock('@/services/ApiClient');

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all users', async () => {
    const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
    apiCliente.get.mockResolvedValue({ data: mockUsers });

    const result = await UserService.getAllUsers();

    expect(apiCliente.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual(mockUsers);
  });

  it('should update user roles', async () => {
    const userId = 1;
    const roles = ['ADMIN'];
    const mockResponse = { id: userId, roles };

    apiCliente.put.mockResolvedValue({ data: mockResponse });

    const result = await UserService.updateUserRoles(userId, roles);

    expect(apiCliente.put).toHaveBeenCalledWith(`/users/${userId}/roles`, { roles });
    expect(result).toEqual(mockResponse);
  });

  it('should delete a user', async () => {
    const userId = 3;
    const mockResponse = { message: 'User deleted' };

    apiCliente.delete.mockResolvedValue({ data: mockResponse });

    const result = await UserService.deleteUser(userId);

    expect(apiCliente.delete).toHaveBeenCalledWith(`/users/${userId}`);
    expect(result).toEqual(mockResponse);
  });
});