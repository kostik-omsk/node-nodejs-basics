export class FSError extends Error {
  constructor(message = 'FS operation failed') {
    super(message);
    this.name = 'FSError';
  }
}
