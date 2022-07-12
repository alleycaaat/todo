const Fauna = require('faunadb');
const q = Fauna.query;

const client = new Fauna.Client({
    secret: process.env.REACT_APP_FAUNA_SECRET,
    domain: 'db.us.fauna.com',
});

exports.handler = async (req, res) => {
    return client
        .query(q.Paginate(q.Match(q.Ref('Notes/all_notes'))))
        .then((response) => {
            const todos = response.data;
            const getAllData = todos.map((ref) => {
                console.log(getAllData,' GET ALL DATA HERE');
                return q.Get(ref);
            });

            return client.query(getAllData).then((response) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                };
            });
        })
        .catch((error) => {
            console.log('error', error);

            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
