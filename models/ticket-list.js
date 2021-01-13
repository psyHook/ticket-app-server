const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastNumber = 0;

    this.pending = [];
    this.assigned = [];
  }

  // Mostrar ultimo ticket
  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  // 3 ticket que se veran en las card y 10 en el historial
  get last13() {
    return this.assigned.slice(0, 13);
  }

  // Logica para crear nuevo ticket
  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  // Asignar el ticker a un usuario
  assignTicket(agent, desktop) {

    // Validar si pendientes esta vacio
    if (this.pending.length === 0) {
      return null;
    }

    // Siguiente ticket
    const nextTicket = this.pending.shift();

    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.assigned.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
