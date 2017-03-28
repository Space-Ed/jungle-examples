// Start off by initializing a new context.


var AudioSetup = AudioContextCell.X({
    metro:MetroCell,
    osc1:OscillatorCell,
    aprg:Appregiator,
    converter:G({},{
        r(obj, note){
            return 440*Math.pow(2, (note - 50) / 12);
        },
    }),
},{
    port:['_tstop', '_tstart', '_nnote'],

    link:[
        '_.tstop->*.stop',
        '_.tstart->*.start',

        '_.nnote->aprg.chord',
        'aprg.note->converter',
        'converter->*.freq',

        'metro.click->aprg.progress',
        'metro.click->osc1.toggle',

        'osc1.aud->dest'
    ]
})
