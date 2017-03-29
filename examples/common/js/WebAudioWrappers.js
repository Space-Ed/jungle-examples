
const {G, L, Util} = Jungle;


const OscillatorCell = G({
        freq:G({},{
            __freq:440,
            r(){
                return this.freq;
            }
        })
    },{
    x:'use audio',
    p(){
        this.node = this.context.createOscillator();
        this.aud = this.context.createGain();
        this.node.connect(this.aud);
        this.aud.gain.value = 0;
        this.node.type = "sawtooth";
        this.node.start(this.context.currentTime);
        this.node.frequency.value = 220;
    },

    r(obj){
        this.node.frequency.value = obj.freq
    },

    _toggle(){
        if(this.on){
            this.on = false;
            this.aud.gain.value = 0;
        }else{
            this.on = true;
            this.aud.gain.value = 0.5;
        }
    },

    __start(time){
        this.on = true;
        this.aud.gain.value = 0.5
    },

    _stop(){
        this.on = false;
        this.aud.gain.value = 0;
    },

    aud_:undefined,
    on:false,
    node:undefined,

})


const AudioContextCell = L({
        dest:G(undefined,{
            x:'use audio',
            p(){
                this.node = this.context.destination;
            },
            node:undefined
        })
    },{
    x:'audio',
    p(){
        this.context = new AudioContext();
    },

    lf(source, sink, srclabel, sinklabel){
        let srcAudioLabel, sinkAudioLabel;
        if(srclabel == '$'){
            srcAudioLabel = 'node';
        }else if(srclabel.match('aud')){
            srcAudioLabel = srclabel;
        }

        if(sinklabel == '$'){
            sinkAudioLabel = 'node';
        }else if(sinklabel.match('aud')){
            sinkAudioLabel = sinklabel;
        }

        if(srcAudioLabel && sinkAudioLabel){
            source[srcAudioLabel].connect(sink[sinkAudioLabel]);
        }
    },

    context:undefined
})
