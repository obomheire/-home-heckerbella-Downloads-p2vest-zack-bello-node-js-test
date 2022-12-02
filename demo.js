class Dashboard {
  constructor(_num) {
    this.num = _num;
  }

  static staticFunc() {
    console.log("staticFunc " + this.num);
  }

  memberFunc1() {
    console.log("memberFunc1 " + this.num);
  }

    memberFunc2 = () => console.log("memberFunc2 " + this.num);
    
}

const test = new Dashboard(20000)

// console.log(test.memberFunc2());
console.log(Dashboard.staticFunc(10));
// console.log(staticFunc(2000));
