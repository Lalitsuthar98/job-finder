const validate = (schema) => (req, res, next) => {

    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    });
    if (!result.success) {

        console.log(result.error);

        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.issues
        });
    }

    next();
};

export default validate;