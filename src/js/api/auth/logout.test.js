import { logout } from "./logout";
import * as storage from "../../storage/index.js";

// Mocking the storage module
jest.mock("../../storage/index.js", () => ({
    remove: jest.fn(),
}));

describe("Logout Functionality", () => {
    // Resetting mock functions before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case to validate token and profile removal during logout
    it("clears the token and profile from browser storage", () => {
        // Invoking the logout function
        logout();

        // Checking if the remove function was called twice
        expect(storage.remove).toHaveBeenCalledTimes(2);

        // Verifying removal of token and profile
        expect(storage.remove).toHaveBeenCalledWith("token");
        expect(storage.remove).toHaveBeenCalledWith("profile");
    });
});
