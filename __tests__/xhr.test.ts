/**
 * XHR Layer Tests
 * Tests for successful API requests and error handling
 */

import xhr, { XHRError } from "../services/api/xhr";
import { logServerError, normalizeError } from "../services/err/error";

// Mock fetch
global.fetch = jest.fn();

describe("XHR Layer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Successful API Request", () => {
    it("should make a successful GET request", async () => {
      const mockData = { id: 1, name: "Test Property" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => mockData,
      });

      const result = await xhr.get("/api/properties/1");

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/properties/1"),
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("should make a successful POST request", async () => {
      const mockData = { success: true };
      const requestData = { name: "Test" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => mockData,
      });

      const result = await xhr.post("/api/properties", requestData);

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/properties"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(requestData),
        })
      );
    });
  });

  describe("Error Handling", () => {
    it("should normalize 4xx errors correctly", async () => {
      const errorResponse = { message: "Not found", details: {} };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => errorResponse,
      });

      try {
        await xhr.get("/api/properties/999");
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.status).toBe(404);
        expect(error.message).toBe("Not found");
        expect(error.details).toBeDefined();
        expect(error.raw).toBeDefined();
      }
    });

    it("should normalize 5xx errors correctly", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({}),
      });

      try {
        await xhr.get("/api/properties");
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.status).toBe(500);
        expect(error.message).toBe("خطای سرور رخ داد");
        expect(error).toHaveProperty("raw");
      }
    });

    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      try {
        await xhr.get("/api/properties");
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.status).toBe(0);
        expect(error.message).toBe("خطا در اتصال به سرور");
      }
    });

    it("should log errors using error logging system", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({ message: "Bad request" }),
      });

      try {
        await xhr.get("/api/properties");
      } catch (error: any) {
        const errorLog = logServerError(error, {
          endpoint: "/api/properties",
          method: "GET",
        });

        expect(errorLog).toHaveProperty("timestamp");
        expect(errorLog).toHaveProperty("endpoint");
        expect(errorLog).toHaveProperty("statusCode");
        expect(errorLog.statusCode).toBe(400);
      }

      consoleSpy.mockRestore();
    });
  });

  describe("Error Normalization", () => {
    it("should normalize XHRError correctly", () => {
      const error: XHRError = {
        status: 404,
        message: "Not found",
        details: null,
        raw: {},
      };

      const normalized = normalizeError(error);
      expect(normalized).toEqual(error);
    });

    it("should normalize Error objects", () => {
      const error = new Error("Test error");
      const normalized = normalizeError(error);

      expect(normalized.status).toBe(0);
      expect(normalized.message).toBe("Test error");
    });
  });
});
