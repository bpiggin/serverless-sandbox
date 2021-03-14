import { Entity } from "dynamodb-toolbox";
import Table from "./client";
import { v4 as uuidv4 } from "uuid";

interface InnerObject {
  anotherField: string;
  yetAnother: string;
}

interface Object {
  uuid: string;
  object: InnerObject;
  array: string[];
  number: number;
  boolean: boolean;
  string: string;
}

const objectEntity = new Entity<Object>({
  name: "object",
  attributes: {
    pk: {
      type: "string",
      partitionKey: true,
      hidden: true,
      default: ({ uuid }: Object) => `OBJECT#${uuid}`,
    },
    sk: {
      type: "string",
      sortKey: true,
      hidden: true,
      default: () => `$SK`,
    },
    GSI1PK: {
      type: "string",
      hidden: true,
      default: ({ string }: Object) => `PK#${string}`,
    },
    GSI1SK: {
      type: "string",
      hidden: true,
      default: ({ uuid }: Object) => `SK#${uuid}`,
    },
    uuid: { type: "string", required: true },
    object: { type: "map", required: true },
    array: { type: "list", required: true },
    number: { type: "number", required: true },
    boolean: { type: "boolean", required: true },
    string: { type: "string", required: true },
  },
  table: Table,
});

class ObjectManager {
  private entity: Entity<Object>;

  constructor(entity: Entity<Object>) {
    this.entity = entity;
  }

  public async create(obj: Omit<Object, "uuid">): Promise<Object> {
    const objToCreate = {
      uuid: uuidv4(),
      ...obj,
    };
    await this.entity.put(objToCreate);
    return objToCreate;
  }

  public async get(uuid: string): Promise<Object> {
    const user = (await this.entity.get({ uuid })).Item;
    if (!user) {
      throw new Error(`User not found for id: ${uuid}`);
    }
    return user;
  }

  public async update(
    uuid: string,
    updatedFields: Partial<Object>
  ): Promise<Object> {
    const updateObject = { uuid, ...updatedFields };
    const updatedObject = (
      await this.entity.update(updateObject, { returnValues: "ALL_NEW" })
    ).Attributes as Object;
    return updatedObject;
  }
}

export default new ObjectManager(objectEntity);
