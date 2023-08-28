abstract class CustomError extends Error {
  abstract statusCode: number;
}

export default CustomError;
