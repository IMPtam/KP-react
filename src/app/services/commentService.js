import httpService from "./httpService";

const commentEndPoint = "comment/";

const commentServices = {
    createComments: async (payload) => {
        const { data } = await httpService.put(
            commentEndPoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComments: async (commentId) => {
        console.log("commentService-", commentId);
        const { data } = await httpService.delete(commentEndPoint + commentId);
        console.log("commentService-", data);
        return data;
    }
};

export default commentServices;
