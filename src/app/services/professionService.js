import httpService from "./httpService";

const professionEndPoint = "/profession";

const professionServices = {
    get: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};

export default professionServices;
