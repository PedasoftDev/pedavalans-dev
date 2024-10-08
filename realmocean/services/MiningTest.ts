

const csv = 
`Activity,Costs,Resource,case:concept:name,case:creator,concept:name,org:resource,time:timestamp
register request,50,Pete,3,Fluxicon Nitro,register request,Pete,2010-12-30 14:32:00+01:00
examine casually,400,Mike,3,Fluxicon Nitro,examine casually,Mike,2010-12-30 15:06:00+01:00
check ticket,100,Ellen,3,Fluxicon Nitro,check ticket,Ellen,2010-12-30 16:34:00+01:00
decide,200,Sara,3,Fluxicon Nitro,decide,Sara,2011-01-06 09:18:00+01:00
reinitiate request,200,Sara,3,Fluxicon Nitro,reinitiate request,Sara,2011-01-06 12:18:00+01:00
examine thoroughly,400,Sean,3,Fluxicon Nitro,examine thoroughly,Sean,2011-01-06 13:06:00+01:00
check ticket,100,Pete,3,Fluxicon Nitro,check ticket,Pete,2011-01-08 11:43:00+01:00
decide,200,Sara,3,Fluxicon Nitro,decide,Sara,2011-01-09 09:55:00+01:00
pay compensation,200,Ellen,3,Fluxicon Nitro,pay compensation,Ellen,2011-01-15 10:45:00+01:00
register request,50,Mike,2,Fluxicon Nitro,register request,Mike,2010-12-30 11:32:00+01:00
check ticket,100,Mike,2,Fluxicon Nitro,check ticket,Mike,2010-12-30 12:12:00+01:00
examine casually,400,Sean,2,Fluxicon Nitro,examine casually,Sean,2010-12-30 14:16:00+01:00
decide,200,Sara,2,Fluxicon Nitro,decide,Sara,2011-01-05 11:22:00+01:00
pay compensation,200,Ellen,2,Fluxicon Nitro,pay compensation,Ellen,2011-01-08 12:05:00+01:00
register request,50,Pete,1,Fluxicon Nitro,register request,Pete,2010-12-30 11:02:00+01:00
examine thoroughly,400,Sue,1,Fluxicon Nitro,examine thoroughly,Sue,2010-12-31 10:06:00+01:00
check ticket,100,Mike,1,Fluxicon Nitro,check ticket,Mike,2011-01-05 15:12:00+01:00
decide,200,Sara,1,Fluxicon Nitro,decide,Sara,2011-01-06 11:18:00+01:00
reject request,200,Pete,1,Fluxicon Nitro,reject request,Pete,2011-01-07 14:24:00+01:00
register request,50,Mike,6,Fluxicon Nitro,register request,Mike,2011-01-06 15:02:00+01:00
examine casually,400,Ellen,6,Fluxicon Nitro,examine casually,Ellen,2011-01-06 16:06:00+01:00
check ticket,100,Mike,6,Fluxicon Nitro,check ticket,Mike,2011-01-07 16:22:00+01:00
decide,200,Sara,6,Fluxicon Nitro,decide,Sara,2011-01-07 16:52:00+01:00
pay compensation,200,Mike,6,Fluxicon Nitro,pay compensation,Mike,2011-01-16 11:47:00+01:00
register request,50,Ellen,5,Fluxicon Nitro,register request,Ellen,2011-01-06 09:02:00+01:00
examine casually,400,Mike,5,Fluxicon Nitro,examine casually,Mike,2011-01-07 10:16:00+01:00
check ticket,100,Pete,5,Fluxicon Nitro,check ticket,Pete,2011-01-08 11:22:00+01:00
decide,200,Sara,5,Fluxicon Nitro,decide,Sara,2011-01-10 13:28:00+01:00
reinitiate request,200,Sara,5,Fluxicon Nitro,reinitiate request,Sara,2011-01-11 16:18:00+01:00
check ticket,100,Ellen,5,Fluxicon Nitro,check ticket,Ellen,2011-01-14 14:33:00+01:00
examine casually,400,Mike,5,Fluxicon Nitro,examine casually,Mike,2011-01-16 15:50:00+01:00
decide,200,Sara,5,Fluxicon Nitro,decide,Sara,2011-01-19 11:18:00+01:00
reinitiate request,200,Sara,5,Fluxicon Nitro,reinitiate request,Sara,2011-01-20 12:48:00+01:00
examine casually,400,Sue,5,Fluxicon Nitro,examine casually,Sue,2011-01-21 09:06:00+01:00
check ticket,100,Pete,5,Fluxicon Nitro,check ticket,Pete,2011-01-21 11:34:00+01:00
decide,200,Sara,5,Fluxicon Nitro,decide,Sara,2011-01-23 13:12:00+01:00
reject request,200,Mike,5,Fluxicon Nitro,reject request,Mike,2011-01-24 14:56:00+01:00
register request,50,Pete,4,Fluxicon Nitro,register request,Pete,2011-01-06 15:02:00+01:00
check ticket,100,Mike,4,Fluxicon Nitro,check ticket,Mike,2011-01-07 12:06:00+01:00
examine thoroughly,400,Sean,4,Fluxicon Nitro,examine thoroughly,Sean,2011-01-08 14:43:00+01:00
decide,200,Sara,4,Fluxicon Nitro,decide,Sara,2011-01-09 12:02:00+01:00
reject request,200,Ellen,4,Fluxicon Nitro,reject request,Ellen,2011-01-12 15:44:00+01:00`

 class ConfigService extends RealmoceanService {

    public async init() {
        console.log('mining test');
        //var someEncodedString = Buffer.from(csv, 'utf-8').toString();
        //const mining  = this.miningService.get('mining-service');
        const logId = await this.miningService.loadCsv(csv.trim());
       
       

       
        console.log( await this.miningService.getMedianCaseDuration(logId))

        
    }
    public  get uid(): string {
        return 'com.celmino.service.mining-test';
    }
    
}


module.exports = ConfigService;