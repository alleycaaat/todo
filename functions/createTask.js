const Fauna = require('faunadb');
const q = Fauna.query;

const client = new Fauna.Client({
    secret: process.env.REACT_APP_FAUNA_SECRET,
    domain: 'db.us.fauna.com',
});

exports.handler = async (req, res) => {
    const data = JSON.parse(req.body);
    console.log('CREATING NEW TASK',data)
    const task = {
        data: data
    }

    return client
        .query(q.Create(q.Ref('notes/'),task))
        
        .then((response) => {
            console.log('success', response);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('error', error);

            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
}; 
