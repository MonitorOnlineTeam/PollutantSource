import { queryalloverdatalist } from '../services/api';
import { Model } from '../dvapack';

export default Model.extend({
    namespace: 'overdata',
    state: {
        overdatalist: [],
    },
    effects: {
        * queryalloverdatalist({
            payload,
        }, { call, update, put, take }) {
            const overdatalist = yield call(queryalloverdatalist, payload);
            yield update({ overdatalist });
        }
    }
});
