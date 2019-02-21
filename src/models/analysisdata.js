import { queryalloverdatalist, queryreportlist, GetDocumentationList } from '../services/api';
import { Model } from '../dvapack';

export default Model.extend({
    namespace: 'analysisdata',
    state: {
        overdatalist: [],
        reportlist: null,
        documentationList: [],
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
        },
        * GetDocumentationList({
            payload,
        }, { call, update }) {
            const documentationList = yield call(GetDocumentationList, payload);
            if (documentationList !== null) {
                if (documentationList.length !== 0) {
                    yield update({ documentationList });
                }
            }
        }
    }
});
