
function mtof(note){
    return 440*Math.pow(2, (note - 50) / 12)
}

/*
    A device that turns key inputs an
*/
const Instrument = L({
    driver:G({
        poly:12,
        envelope:"ADSR"
    },{
        port:['freq_', 'amp_'],

        __key(keyin){
            return keyin
        },

        r(obj, arg){
            console.log("Instrument Resolve");
            this.lining.sinks.freq.handle(mtof(arg.note));
            this.lining.sinks.amp.handle(arg.note);
        },
    }),
    voice:L([
        OscillatorCell
    ],{
        x:'use audio',

        p(){
            this.aud = this.context.createChannelMerger();
        },

        port:['_freq', '_amp', 'aud_'],
        link:[
            '*.aud+->*.aud', // link forward in the chain, through audio
            '_.freq->osc.freq',
            '_.amp->osc.amp',
            'osc.aud->_.aud'
        ]
    })
},{

    x:'use audio',
    port:[
        '_key',
    ],

    link:[
        '_.key->driver.key',
        'driver.freq->voice.freq',
        'driver.amp->voice.amp'
    ]
})
