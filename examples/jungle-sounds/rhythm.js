

const MetroCell = G({},{
    port:['click_'],
    _start(){
        this.interrupt = false;
        this.turn();
        console.log("Start")
    },

    _stop(){
        this.interrupt=true;
    },

    turn(){
        console.log("Click")
        this.lining.sinks.click.handle("Click");

        window.setTimeout(()=>{
            if(!this.interrupt) this.turn();
        },60000/this.tempo);
    },

    interrupt:false,
    _tempo:200
})


const Appregiator = G({
        intervals:G([0,2,4,5,7,9,11,12],{
            r(obj){
                return obj.filter((x)=>{return 0.5 < Math.random()})
            }
        })
    },{

    __octave:4,
    __root:0,

    i:0,

    __progress(){
        this.i = (this.i+1);
    },

    _chord(label){
        this.root=Number(label);
    },

    note__(obj){
        return this.octave*12 + this.root + obj.intervals[this.i%obj.intervals.length];
    }
})
