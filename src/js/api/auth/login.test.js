import { login } from "./login";
import * as storage from "../../storage/index";

// Mocking the storage module
jest.mock("../../storage/index");

// Mocking the global fetch function
const token = "12345";
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: token }),
    })
);

describe("login function", () => {
    // Clearing storage before each test
    beforeEach(() => {
        storage.remove();
    });

    // Test case to check if the access token is stored correctly
    it("should successfully store the access token in localStorage", async () => {
        // Calling the login function with dummy email and password
        await login("test@fake-email.com", "password");

        // Expecting the save function of storage module to be called with token
        expect(storage.save).toHaveBeenCalledWith("token", token);
    });
});
