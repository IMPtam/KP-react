import httpService from "./httpService";

const qualityEndPoint = "/quality";

const qualityServices = {
    get: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityServices;
