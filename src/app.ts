import { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";

import indexRouter from "./routes";

const app = express();

config();

console.log({ nodeEnv: process.env.NODE_ENV });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", indexRouter);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send({ status: "Running", message: "Hello from Wallet Service API" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).json({
    status: "Not Found",
    message: `${req.method} - ${req.originalUrl} not found`,
  });
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
