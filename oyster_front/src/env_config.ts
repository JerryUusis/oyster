const HOST = () => {
  switch (import.meta.env.mode) {
    case "development":
      return "localhost";
    case "ci":
      return "127.0.0.1";
    case "production":
      return "production-host";
    default:
      return "localhost";
  }
};

export { HOST };
