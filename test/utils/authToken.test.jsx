import { describe, it, expect, vi, beforeEach } from "vitest";
import { setToken, getToken, removeToken, isAuthenticated } from "../../src/utils/TokenUtils";

describe("authToken utilities", () => {
  beforeEach(() => {
   
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should set the token in localStorage", () => {
    setToken("my-token");
    expect(localStorage.getItem("token")).toBe("my-token");
  });

  it("should get the token from localStorage", () => {
    localStorage.setItem("token", "stored-token");
    const token = getToken();
    expect(token).toBe("stored-token");
  });

  it("should remove the token from localStorage", () => {
    localStorage.setItem("token", "to-be-removed");
    removeToken();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("should return true if token exists", () => {
    localStorage.setItem("token", "auth-token");
    expect(isAuthenticated()).toBe(true);
  });

  it("should return false if token does not exist", () => {
    localStorage.removeItem("token");
    expect(isAuthenticated()).toBe(false);
  });
});
