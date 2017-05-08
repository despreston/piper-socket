/**
 * @param io Object Instance of socket io that has been connected to server
 * @param to String the socketio room to send the event to
 * @param payload String
 */
class Event {

  constructor (io, to, payload) {
    if (!to || typeof to !== 'string') {
      throw "'to' should be a string.";
    }

    if (!payload || typeof payload !== 'string') {
      throw "'payload' should be a string.";
    }

    this.io = io;
    this.to = to;
    this.payload = payload;
  }

  send () {
    this.io.sockets.in(this.to).emit('event', this.payload);
  }

}

module.exports = io => (...args) => new Event(io, ...args);