import httpService from "./httpService";

const userEndPoint = "/user";

const userServices = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    }
};
export default userServices;
