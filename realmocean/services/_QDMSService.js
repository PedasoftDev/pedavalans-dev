



const url = '';


class QDMSTestService extends RealmoceanService {
    async init() {
        const schedule = this.services.get('schedule-service');
        const qdms = this.services.get('qdms-service');

        const token = await qdms.getToken(url, 'qdms', 'qdms24');


        const authPack = {
            url: '',
            token
        }

        schedule.addJob('*/2 * * * * *', async () => {
           // const users = await qdms.getUsers(authPack);
          //  console.log(token);
        })

    }
}

QDMSTestService.Name = 'test-qdms-service';

module.exports = QDMSTestService;