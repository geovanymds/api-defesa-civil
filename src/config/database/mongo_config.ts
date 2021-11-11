export const uri =
  process.env.ENVIROMENT === "DOCKER"
    ? <string>process.env.DB_URI
    : <string>process.env.DB_URI_ATLAS;

export const config = {
  db: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
