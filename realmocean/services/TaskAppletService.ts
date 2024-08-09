import { MyTestClass } from "./_Test";


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

class TaskAppletService extends RealmoceanService {
    public  get uid(): string {
        return 'com.celmino.service.task-applet';
    }
    
      get displayName(): string {
        return 'Task Applet Service'
      }
    
      get theme(): string {
        return "#18BFFF";
      }
    
      get icon(): string {
        return "/images/services/task-applet.png";
      }

    async init() {
       
    }



}


module.exports = TaskAppletService;