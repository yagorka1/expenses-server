import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const currencySchema = new Schema({
    code: {type: String, unique: true, required: true},
    id:  {type: String, unique: true, required: true},
    name:  {type: String, unique: true, required: true},
});

export const CurrencySchema = mongoose.model('currencies', currencySchema);
