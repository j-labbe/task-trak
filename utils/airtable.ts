import Airtable from 'airtable';

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (rec) => {
    const data = JSON.parse(rec.fields.data);
    const dbId = rec.id;
    return {...data, dbId: dbId}
};

const minifyRecords = (recs) => (recs.map((rec) => {
    return getMinifiedRecord(rec)
}));

export { table, getMinifiedRecord, minifyRecords };