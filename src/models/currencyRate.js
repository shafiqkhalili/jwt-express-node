let mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var CurrentRateSchema = mongoose.Schema(
    {
        currency: { type: String, required: true },
        rate: { type: String, required: true }
    });
CurrentRateSchema.plugin(AutoIncrement, { inc_field: "id" });
let currencyModel = mongoose.model("currencyRateSchema", CurrentRateSchema);

module.exports = currencyModel;