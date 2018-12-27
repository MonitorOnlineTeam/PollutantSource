import { queryalloverdatalist,queryreportlist } from '../services/api';
import { Model } from '../dvapack';

export default Model.extend({
    namespace: 'analysisdata',
    state: {
        overdatalist: [],
        reportlist:null
    },
    effects: {
        * queryalloverdatalist({
            payload,
        }, { call, update }) {
            const overdatalist = yield call(queryalloverdatalist, payload);
            yield update({ overdatalist });
        },
        * queryreportlist({
            payload,
        }, { call, update }) {
            const reportlist = yield call(queryreportlist, payload);
            yield update({ reportlist });
        }
    }
});
