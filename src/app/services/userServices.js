import httpService from "./httpService";
import localStorageSevice from "./localStorageService";

const userEndPoint = "user/";

const userServices = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    patch: async (payload) => {
        const { data } = await httpService.patch(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    getOnlineUser: async () => {
        const { data } = await httpService.get(
            userEndPoint + localStorageSevice.getUserId()
        );
        return data;
    }
};
export default userServices;
