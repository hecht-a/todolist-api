import Route from "@ioc:Adonis/Core/Route";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.get("health", async ({ response }) => {
  const report = await HealthCheck.getReport();

  return report.healthy ? response.ok(report) : response.badRequest(report);
});

Route.post("register", "UsersController.store");
Route.post("login", "UsersController.create");
Route.get("me", "UsersController.index");

Route.group(() => {
  Route.post("/", "CategoriesController.store");
  Route.get("/:id", "CategoriesController.get").where("id", /\d+/);
  Route.get("/all", "CategoriesController.index");
  Route.delete("/:id", "CategoriesController.delete");
}).prefix("/category");

Route.group(() => {
  Route.post("/", "ItemsController.store");
  Route.get("/", "ItemsController.get")
  Route.get("/:category", "ItemsController.index");
  Route.put("/:id", "ItemsController.update")
  Route.delete("/:id", "ItemsController.delete")
}).prefix("/item")
