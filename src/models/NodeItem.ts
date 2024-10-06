export class NodeItem {
  id: string;
  name: string;
  children?: NodeItem[];

  constructor(id: string, name: string, children?: NodeItem[]) {
    this.id = id;
    this.name = name;
    this.children = children;
  }
}
