const currencyModel = require("../models/currencyRate");

const createRate = (request, response) => {
    let currencyRate = new currencyModel(request.body);

    currencyRate.save()
        .then(data => {
            response.send(`Post request succeeded!`);
        }).catch(err => {
            response.send(err);
        });
};
const getRate = (request, response) => {
    console.log(`Id: ${request.params.id}`);
    currencyModel.findById(request.params.id)
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

const getRates = (request, response) => {
    currencyModel.find()
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
const updateRate = (request, response) => {
    console.log(`Id: ${request.params.id}`);
    if (!request.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = request.params.id;

    currencyModel.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
const deleteRate = (request, response) => {
    const id = request.params.id;

    currencyModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                response.status(404).send({
                    message: `Cannot delete item with id=${id}. Maybe item was not found!`
                });
            } else {
                response.send({
                    message: "Deleted successfully!"
                });
            }
        })
        .catch(err => {
            response.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
};
module.exports = { createRate, getRate, getRates, updateRate, deleteRate };