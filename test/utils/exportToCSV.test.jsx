import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { exportToCSV } from "../../src/utils/ExportCSV";
import toast from "react-hot-toast";


vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
    success: vi.fn(),
    error: vi.fn(),
}));

describe("exportToCSV", () => {
    let createElementSpy;
    let clickMock;
    let appendChildMock;
    let removeChildMock;
    let createObjectURLSpy;

    beforeEach(() => {

        vi.clearAllMocks();


        global.URL.createObjectURL = vi.fn(() => "blob:http://example.com");
        global.URL.revokeObjectURL = vi.fn();


        clickMock = vi.fn();
        appendChildMock = vi.fn();
        removeChildMock = vi.fn();

        createElementSpy = vi.spyOn(document, "createElement").mockReturnValue({
            setAttribute: vi.fn(),
            click: clickMock,
            href: "",
        });

        vi.spyOn(document.body, "appendChild").mockImplementation(appendChildMock);
        vi.spyOn(document.body, "removeChild").mockImplementation(removeChildMock);
    });

    afterEach(() => {

        vi.restoreAllMocks();
    });

    it("shows error toast if data is empty", () => {
        exportToCSV([], "test.csv");
        expect(toast.error).toHaveBeenCalledWith("No hay datos para exportar");
    });

    it("creates and triggers download link with correct filename", () => {
        const data = [{ name: "John", age: 30 }, { name: "Jane", age: 25 }];

        exportToCSV(data, "users.csv");

        expect(createElementSpy).toHaveBeenCalledWith("a");
        expect(appendChildMock).toHaveBeenCalled();
        expect(clickMock).toHaveBeenCalled();
        expect(removeChildMock).toHaveBeenCalled();
        expect(global.URL.createObjectURL).toHaveBeenCalled();

        expect(toast.success).toHaveBeenCalledWith("📄 Archivo CSV descargado con éxito");
    });

    it("adds .csv extension if missing", () => {
        const data = [{ name: "John", age: 30 }];
        const setAttributeMock = vi.fn();

        createElementSpy.mockReturnValue({
            setAttribute: setAttributeMock,
            click: clickMock,
            href: "",
        });

        exportToCSV(data, "filenameWithoutExtension");

        expect(setAttributeMock).toHaveBeenCalledWith("download", "filenameWithoutExtension.csv");
    });
});

