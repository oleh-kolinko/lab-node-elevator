
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.passengers = [];
    this.waitingList = [];
    this.direction = 'up';
  }

  start() {
    this.intervalID = setInterval(()=>{
      this.update();
    },1000);
  }

  stop() {
    clearInterval(this.intervalID);
    console.log('Elevator stoped');
   }

  update() {
    this.log();

    this.waitingList.forEach((person)=>{
      if(person.originFloor === this.floor){
        this._passengersEnter(person);
      }
    });

    this.passengers.forEach((person)=>{
      if(person.destinationFloor === this.floor){
        this._passengersLeave(person);
      }
    });


    if(!this.requests.length){
      this.stop();
    }

    if(this.direction === 'up'){
      this.direction = 'down';
      this.requests.forEach(req => {
        if(req > this.floor){
          this.direction = 'up';
        }
      });
    }else {
    this.direction = 'down';
    this.requests.forEach(req => {
      if(req > this.floor){
        this.direction = 'up';
      }
    });
    }



    if(this.direction === 'up'){
      this.floorUp();
    }else{
      this.floorDown();
    }

  }

  _passengersEnter(person) {

    this.passengers.push(person);
    this.requests.push(person.destinationFloor);

    //Delete person form waitingList
    let i = this.waitingList.indexOf(person);
    if(i > -1 ){
      console.log(`${person.name} has enter the elevator`);
      this.waitingList.splice(i,1);
    }else console.error('No such person in waitingList');

    //Remove request of entered person
    i = this.requests.indexOf(this.floor);
    this.requests.splice(i,1);
  }

  _passengersLeave(person) {

    //Delete person form passengers
    let i = this.passengers.indexOf(person);
    if(i > -1 ){
      console.log(`${person.name} has left the elevator`);
      this.passengers.splice(i,1);
    }else console.error('No such person in passengers');

    //Remove request of left person
    i = this.requests.indexOf(this.floor);
    this.requests.splice(i,1);
  }

  floorUp() {
    if(this.floor < this.MAXFLOOR){
      this.floor ++;
    }else{
      console.log('Reached max floor can\'t go up ');
    }
  }

  floorDown() {
    if(this.floor > 0){
      this.floor --;
    }else{
      console.log('Reached floor 0 can\'t go down ');
    }
  }
  call(person) {
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction : ${this.direction}   |   Current floor : ${this.floor} `);
  }
}

module.exports = Elevator;
