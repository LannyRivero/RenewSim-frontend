
import SimulationService from "@/services/SimulationService";
import apiCliente from "@/services/ApiClient";

vi.mock("@/services/ApiClient", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("SimulationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should simulate a new simulation", async () => {
    const mockData = { energy: 123 };
    apiCliente.post.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.simulate(mockData);
    expect(apiCliente.post).toHaveBeenCalledWith("/simulation", mockData);
    expect(result).toEqual(mockData);
  });

  it("should get user simulations", async () => {
    const mockData = [{ id: 1 }];
    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.getUserSimulations();
    expect(apiCliente.get).toHaveBeenCalledWith("/simulation/user");
    expect(result).toEqual(mockData);
  });

  it("should get simulation history", async () => {
    const mockData = [{ id: 1, type: "solar" }];
    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.getSimulationHistory();
    expect(apiCliente.get).toHaveBeenCalledWith("/simulation/history");
    expect(result).toEqual(mockData);
  });

  it("should delete all user simulations", async () => {
    apiCliente.delete.mockResolvedValueOnce({ data: "Deleted" });

    const result = await SimulationService.deleteUserSimulations();
    expect(apiCliente.delete).toHaveBeenCalledWith("/simulation/user");
    expect(result).toBe("Deleted");
  });

  it("should delete a simulation by ID", async () => {
    apiCliente.delete.mockResolvedValueOnce({ data: "Deleted" });

    const result = await SimulationService.deleteSimulationById(42);
    expect(apiCliente.delete).toHaveBeenCalledWith("/simulation/42");
    expect(result).toBe("Deleted");
  });

  it("should get technologies for a specific simulation", async () => {
    const mockData = [{ name: "Solar" }];
    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.getTechnologiesForSimulation(10);
    expect(apiCliente.get).toHaveBeenCalledWith("/simulation/10/technologies");
    expect(result).toEqual(mockData);
  });

  it("should get all global technologies", async () => {
    const mockData = [{ name: "Hydro" }];
    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.getAllTechnologies();
    expect(apiCliente.get).toHaveBeenCalledWith("/simulation/technologies/global");
    expect(result).toEqual(mockData);
  });

  it("should get normalized technologies", async () => {
    const mockData = [{ name: "Wind" }];
    apiCliente.get.mockResolvedValueOnce({ data: mockData });

    const result = await SimulationService.getNormalizedTechnologies();
    expect(apiCliente.get).toHaveBeenCalledWith("/simulation/normalized-technologies");
    expect(result).toEqual(mockData);
  });
});
