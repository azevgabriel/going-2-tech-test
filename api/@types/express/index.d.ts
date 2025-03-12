declare global {
  namespace e {
    interface Request {
      user?: {
        email: string;
      };
    }
  }
}
