import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const { token } = req.header;
        if (token) {
            // jsonwebtoken.verify(token, (err, payload) => {
            //     if (err) {
            //         // throw
            //     }
            //     next();
            // });
        }
        throw new Error("Shya,////");
    } catch (error) {
        next(error);
    }
};
