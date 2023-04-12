class Transaction {

    constructor(data, uid) {
      this.transaction = uid;
      if (data) {
        this.transaction_number = data.transaction_number;
        this.itinerant_id = data.itinerant_id;
        this.customer_id = data.customer_id;
        this.pickup_address = data.pickup_address;
        this.dropoff_address = data.dropoff_address;
        this.amount = data.amount;
        this.quantity = data.quantity;
        this.product_name = data.product_name;
        this.status = data.status;
        this.payment_method = data.payment_method;
        this.createdAt = data.createdAt;
      }
    }
  
  
    static fromSnapshot(snapshot, transaction) {
      this.transaction = transaction;
      this.transaction_number = snapshot.transaction_number.stringValue;
      this.itinerant_id = snapshot.itinerant_id.referenceValue;
      this.customer_id = snapshot.customer_id.referenceValue;
      this.pickup_address = new GeoPoint(
        snapshot.pickup_address.geoPointValue.latitude,
        snapshot.pickup_address.geoPointValue.longitude
      );
      this.dropoff_address = new GeoPoint(
        snapshot.dropoff_address.geoPointValue.latitude,
        snapshot.dropoff_address.geoPointValue.longitude
      );
      this.amount = snapshot.amount.decimalValue;
      this.quantity = snapshot.quantity.integerValue;
      this.product_name = snapshot.product_name.stringValue;
      this.status = snapshot.status.stringValue;
      this.payment_method = snapshot.payment_method.stringValue;
      this.createdAt = snapshot.createdAt.timeStampValue;
    }
  
  }
  
  module.exports = Transaction;
  