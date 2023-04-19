class Verification {

    constructor(data, uid) {
      this.verification_id = uid;
      if (data) {
        this.custId = data.custId;
        this.introduction = data.introduction;
        this.image = data.image;
        this.createdAt = data.createdAt;
        this.customerDetails = {};
      }
    }
  
  
    static fromSnapshot(snapshot, verification_id) {
      this.verification_id = verification_id;
      this.custId = snapshot.custId.stringValue;
      this.introduction = snapshot.introduction.stringValue;
      this.image = snapshot.image.stringValue;
      this.createdAt = snapshot.createdAt.timeStampValue;
      this.customerDetails = {};
    }
  
  }
  
  module.exports = Verification;
  