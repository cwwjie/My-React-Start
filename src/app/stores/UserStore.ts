import { observable, action } from 'mobx';

export class UserStore {
  
    readonly id: number;
    @observable public text: string;
    @observable public completed: boolean;
  
    constructor(text: string, completed: boolean = false) {
      this.id = UserStore.generateId();
      this.text = text;
      this.completed = completed;
    };
  
    static nextId = 1;
    static generateId() {
      return this.nextId++;
    }
  
    @action
    edit = (data: string): void => {
      this.text = data;
    }
  }

export default UserStore;
