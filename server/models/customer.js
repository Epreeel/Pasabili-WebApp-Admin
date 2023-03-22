class Customer {
    constructor(customer_id, email, password, firstname, lastname, address, verified, status) {
      this.customer_id = customer_id;
      this.email = email;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
      this.address = address;
      this.verified = verified
      this.status = status;
    }
  
    static fromSnapshot(snapshot) {
      const customer = new Customer();
      customer.customer_id = snapshot.get("customer_id");
      customer.email = snapshot.get("email");
      customer.password = snapshot.get("password");
      customer.firstname = snapshot.get("firstname");
      customer.lastname = snapshot.get("lastname");
      customer.address = snapshot.get("address");
      customer.verified = snapshot.get("verified");
      customer.status = snapshot.get("status");
      return customer;
    }
  
  }
  
  module.exports = Customer;
  