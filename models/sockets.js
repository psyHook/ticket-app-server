const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    // Crear instancia de nuesto ticketlist
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      // Escuchar evento: mensaje-to-server
      socket.on("request-ticket", ( data, callback ) => {
        const newTicket = this.ticketList.createTicker();
        callback( newTicket )
      });

      socket.on('next-ticket-to-work', ( { agent, desktop }, callback) => {
        const yourTicket = this.ticketList.assignTicket( agent, desktop);
        callback( yourTicket )
      })
    });
  }
}

module.exports = Sockets;
