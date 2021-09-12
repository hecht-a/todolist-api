import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    state: schema.boolean(),
    category: schema.number(),
    owner: schema.number(),
    start: schema.string(),
    end: schema.string(),
    description: schema.string.optional({ trim: true }),
  });

  public messages = {};
}
