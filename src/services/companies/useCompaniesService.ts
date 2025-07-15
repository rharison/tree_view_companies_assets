import type { Asset } from "@commons/types/assets";
import type { Company } from "@commons/types/companies";
import type { Location } from "@commons/types/locations";
import { useHttpClientFactory } from "../useHttpClientFactory";

const BASE_PATH = "/companies";

export const useCompaniesService = () => {
  const { fetch } = useHttpClientFactory();

  async function getCompanies() {
    return await fetch<Company[]>(BASE_PATH);
  }

  async function getLocationsByCompanieId(companyId: string) {
    return await fetch<Location[]>(`${BASE_PATH}/${companyId}/locations`);
  }

  async function getAssetsByCompanieId(companyId: string) {
    return await fetch<Asset[]>(`${BASE_PATH}/${companyId}/assets`);
  }

  return {
    getCompanies,
    getLocationsByCompanieId,
    getAssetsByCompanieId,
  };
};
