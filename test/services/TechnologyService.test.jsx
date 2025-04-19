
import TechnologyService from "@/services/TechnologyService";
import apiCliente from "@/services/ApiClient";

vi.mock("@/services/ApiClient", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("TechnologyService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new technology", async () => {
    const input = { name: "Solar Panel", efficiency: 90 };
    const mockResponse = { id: 1, ...input };

    apiCliente.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await TechnologyService.createTechnology(input);
    expect(apiCliente.post).toHaveBeenCalledWith("/technologies", input);
    expect(result).toEqual(mockResponse);
  });

  it("should get all technologies", async () => {
    const mockData = [
      { id: 1, name: "Wind Turbine" },
      { id: 2, name: "Hydro Plant" },
    ];

    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await TechnologyService.getAllTechnologies();
    expect(apiCliente.get).toHaveBeenCalledWith("/technologies");
    expect(result).toEqual(mockData);
  });
});
