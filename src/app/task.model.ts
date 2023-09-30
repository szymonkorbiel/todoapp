export class Task {
  constructor(
    public id: number,
    public description: string,
    public status: 'todo' | 'doing' | 'done' = 'todo'
  ) {}
}
