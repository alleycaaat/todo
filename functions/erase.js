const Fauna = require('faunadb');
const q = Fauna.query;

const client = new Fauna.Client({
    secret: process.env.REACT_APP_FAUNA_SECRET,
    domain: 'db.us.fauna.com',
});

exports.handler = async (req, res) => {
    const body = JSON.stringify(req.path);
    const id = body.id;
    return client.query(
        q
            .Delete(q.Ref(q.Collection(`Notes/${id}`)))
            .then((response) => {
                console.log('success', response);
                return {
                    codeStatus: 200,
                    body: JSON.stringify(response),
                };
            })
            .catch((error) => {
                console.log('error', error);

                return {
                    statusCode: 400,
                    body: JSON.stringify(error),
                };
            })
    );
};
