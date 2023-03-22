class Itinerant {
    constructor(itinerant_id, email, password, firstname, lastname, address, verified, status) {
      this.itinerant_id = itinerant_id;
      this.email = email;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
      this.address = address;
      this.verified = verified
      this.status = status;
    }

  
    static fromSnapshot(snapshot) {
      const itinerant = new Itinerant();
      itinerant.itinerant_id = snapshot.get("itinerant_id");
      itinerant.email = snapshot.get("email");
      itinerant.password = snapshot.get("password");
      itinerant.firstname = snapshot.get("firstname");
      itinerant.lastname = snapshot.get("lastname");
      itinerant.address = snapshot.get("address");
      itinerant.verified = snapshot.get("verified");
      itinerant.status = snapshot.get("status");
      return itinerant;
    }
  
  }
  
  module.exports = Itinerant;
  