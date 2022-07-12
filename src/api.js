const listtasks = () => {
    return fetch('/.netlify/functions/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        return response.json();
    });
};

const create = (task) => {
    return fetch('/.netlify/functions/createTask', {
        body: JSON.stringify(task),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        return response.json();
    });
};

const update = (todoId, data) => {
    return fetch(`/.netlify/functions/updateTask/${todoId}`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        return response.json();
    });
};

const erase = (todoId) => {
    return fetch('/.netlify/functions/erase/', `${todoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        return response.json();
    });
};

const apis = {create,listtasks,update,erase}
export default apis
