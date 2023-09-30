import { Task } from "./task.model";

export class Feature {
    constructor(
        public id: number,
        public name: string,
        public tasks?: Task[]
    ) {
        this.tasks = this.tasks || [];
    }
}
