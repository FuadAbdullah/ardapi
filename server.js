// Import Koa
const Koa = require("koa");
const app = new Koa();
const morgan = require("koa-morgan");
const router = require("./routes");

// Morgan to log HTTP requests
app.use(morgan("combined", {}));

// Middleware to handle errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { error: err.message };
  }
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ardapi is running on port ${port}`);
});
