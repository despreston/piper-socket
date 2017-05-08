/**
 * @param {Object} io Instance of socket io that has been connected to server
 * @param {string} type The type of event
 * @param {string} to the socketio room to send the event to
 * @param {string} payload
 */
class Event {

  constructor (io, type, to, payload) {
    if (!to || typeof to !== 'string') {
      throw "'to' should be a string.";
    }

    if (!payload || typeof payload !== 'string') {
      throw "'payload' should be a string.";
    }

    if (!type || typeof type !== 'string') {
      throw "'type' should be a string.";
    }

    this.io = io;
    this.type = type;
    this.to = to;
    this.payload = payload;
  }

  send () {
    this.io.sockets.in(this.to).emit(this.type, this.payload);
  }

}

module.exports = io => (...args) => new Event(io, ...args);